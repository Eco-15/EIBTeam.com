/*
  # Setup Supabase Authentication Admin Support

  1. Database Functions
    - Function to handle new user registration
    - Function to assign default roles
    - Function to create user profiles automatically

  2. Authentication Triggers
    - Trigger on auth.users for new user creation
    - Automatic role assignment based on email
    - Profile creation for new users

  3. Admin Role Support
    - Automatic admin role for specified email
    - Default agent role for other users
    - Proper user profile creation
*/

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create user role record
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (
    NEW.id,
    CASE 
      WHEN NEW.email = 'Eliyahucohen101@gmail.com' THEN 'admin'
      ELSE 'agent'
    END,
    NEW.id
  );

  -- Create agent profile
  INSERT INTO public.agent_profiles (
    user_id,
    first_name,
    last_name,
    status
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'User'),
    'active'
  );

  -- Update user invitation if exists
  UPDATE public.user_invitations
  SET 
    accepted_at = NOW(),
    is_active = true
  WHERE email = NEW.email AND accepted_at IS NULL;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_roles.user_id = get_user_role.user_id;
  
  RETURN COALESCE(user_role, 'agent');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to use functions instead of direct queries
DROP POLICY IF EXISTS "Users can view own role only" ON public.user_roles;
CREATE POLICY "Users can view own role only"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Update other tables to use admin function
DROP POLICY IF EXISTS "All authenticated users can read/manage announcements" ON public.announcements;
CREATE POLICY "All authenticated users can read announcements"
  ON public.announcements
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage announcements"
  ON public.announcements
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "All authenticated users can read/manage schedule events" ON public.schedule_events;
CREATE POLICY "All authenticated users can read schedule events"
  ON public.schedule_events
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage schedule events"
  ON public.schedule_events
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can view invitations by email" ON public.user_invitations;
CREATE POLICY "Users can view invitations by email"
  ON public.user_invitations
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Admins can manage invitations"
  ON public.user_invitations
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role(uuid) TO authenticated;