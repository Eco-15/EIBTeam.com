/*
  # Auto-assign agent role to new users

  1. New Function
    - `auto_assign_agent_role()` - Automatically assigns 'agent' role to new users
  
  2. Trigger
    - Triggers after user creation in auth.users
    - Automatically creates user_roles entry with 'agent' role
  
  3. Security
    - Uses SECURITY DEFINER to bypass RLS for automatic role assignment
    - Only creates role if one doesn't already exist
*/

-- Create function to automatically assign agent role to new users
CREATE OR REPLACE FUNCTION auto_assign_agent_role()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert default agent role for new user
  INSERT INTO public.user_roles (user_id, role, assigned_at)
  VALUES (NEW.id, 'agent', now())
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically assign agent role when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION auto_assign_agent_role();