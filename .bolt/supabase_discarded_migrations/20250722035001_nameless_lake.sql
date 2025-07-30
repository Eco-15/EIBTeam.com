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

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT := 'agent';
  user_first_name TEXT;
  user_last_name TEXT;
BEGIN
  -- Check if this is the admin email
  IF NEW.email = 'Eliyahucohen101@gmail.com' THEN
    user_role := 'admin';
    user_first_name := 'Admin';
    user_last_name := 'User';
  ELSE
    -- Extract names from user metadata if available
    user_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1));
    user_last_name := COALESCE(NEW.raw_user_meta_data->>'last_name', 'User');
  END IF;

  -- Insert user role
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (NEW.id, user_role, NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Create agent profile for all users
  INSERT INTO public.agent_profiles (
    user_id, 
    first_name, 
    last_name, 
    status,
    hire_date
  )
  VALUES (
    NEW.id, 
    user_first_name, 
    user_last_name, 
    'active',
    CURRENT_DATE
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- Update user invitation if exists
  UPDATE public.user_invitations 
  SET 
    accepted_at = NOW(),
    is_active = true
  WHERE email = NEW.email 
    AND accepted_at IS NULL;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
  user_email TEXT;
BEGIN
  -- First check by role in user_roles table
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_roles.user_id = is_admin.user_id
  LIMIT 1;

  IF user_role = 'admin' THEN
    RETURN TRUE;
  END IF;

  -- Fallback: check by email in auth.users
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = is_admin.user_id;

  IF user_email = 'Eliyahucohen101@gmail.com' THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
  user_email TEXT;
BEGIN
  -- First check by role in user_roles table
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_roles.user_id = get_user_role.user_id
  LIMIT 1;

  IF user_role IS NOT NULL THEN
    RETURN user_role;
  END IF;

  -- Fallback: check by email in auth.users
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = get_user_role.user_id;

  IF user_email = 'Eliyahucohen101@gmail.com' THEN
    RETURN 'admin';
  END IF;

  RETURN 'agent';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to assign role to user
CREATE OR REPLACE FUNCTION public.assign_user_role(target_user_id UUID, new_role TEXT, assigner_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if assigner is admin
  IF NOT public.is_admin(assigner_id) THEN
    RETURN FALSE;
  END IF;

  -- Insert or update user role
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (target_user_id, new_role, assigner_id)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    role = EXCLUDED.role,
    assigned_by = EXCLUDED.assigned_by,
    updated_at = NOW();

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies to use the new functions

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own role only" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "All authenticated users can read announcements" ON public.announcements;
DROP POLICY IF EXISTS "Admins can manage announcements" ON public.announcements;
DROP POLICY IF EXISTS "All authenticated users can read schedule events" ON public.schedule_events;
DROP POLICY IF EXISTS "Admins can manage schedule events" ON public.schedule_events;

-- Create new policies using functions
CREATE POLICY "Users can view own role only" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "All authenticated users can read announcements" ON public.announcements
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage announcements" ON public.announcements
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "All authenticated users can read schedule events" ON public.schedule_events
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage schedule events" ON public.schedule_events
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Create policy for user_invitations
CREATE POLICY "Users can view invitations by email" ON public.user_invitations
  FOR SELECT TO authenticated
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage invitations" ON public.user_invitations
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Ensure the admin user exists in user_roles if they're already in auth.users
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Get admin user ID if exists
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'Eliyahucohen101@gmail.com'
  LIMIT 1;

  -- If admin user exists, ensure they have admin role
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role, assigned_by)
    VALUES (admin_user_id, 'admin', admin_user_id)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      role = 'admin',
      updated_at = NOW();

    -- Ensure admin has agent profile
    INSERT INTO public.agent_profiles (
      user_id, 
      first_name, 
      last_name, 
      status,
      hire_date
    )
    VALUES (
      admin_user_id, 
      'Admin', 
      'User', 
      'active',
      CURRENT_DATE
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;