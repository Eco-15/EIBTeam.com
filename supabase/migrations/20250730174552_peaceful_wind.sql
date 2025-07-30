/*
  # Create admin user role for system administration

  1. New Tables
    - Updates to existing user_roles table to ensure admin functionality
  
  2. Security
    - Ensure admin role policies are properly configured
    - Add admin user for testing (optional)
  
  3. Admin User Creation
    - Creates an admin user for initial system setup
    - Password should be changed immediately after first login
*/

-- Ensure the admin role exists in the check constraint
DO $$
BEGIN
  -- The constraint should already exist, but let's make sure admin is included
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'user_roles_role_check' 
    AND check_clause LIKE '%admin%'
  ) THEN
    ALTER TABLE user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
    ALTER TABLE user_roles ADD CONSTRAINT user_roles_role_check 
    CHECK (role = ANY (ARRAY['admin'::text, 'agent'::text, 'manager'::text]));
  END IF;
END $$;

-- Create admin user in auth.users (this would typically be done through Supabase Auth)
-- For development purposes, we'll create a user role entry
-- Note: The actual user creation should be done through Supabase Auth API

-- Insert admin role for a test user (replace with actual admin user ID)
-- This is a placeholder - in production, you would:
-- 1. Create the user through Supabase Auth
-- 2. Get their user ID
-- 3. Insert the role record

-- Example admin role insertion (uncomment and modify with real user ID)
/*
INSERT INTO user_roles (user_id, role, assigned_by, assigned_at)
VALUES (
  'your-admin-user-id-here',  -- Replace with actual admin user ID from auth.users
  'admin',
  'your-admin-user-id-here',  -- Self-assigned for initial admin
  now()
) ON CONFLICT (user_id) DO UPDATE SET
  role = EXCLUDED.role,
  assigned_at = EXCLUDED.assigned_at;
*/

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION is_admin(uuid) TO authenticated;