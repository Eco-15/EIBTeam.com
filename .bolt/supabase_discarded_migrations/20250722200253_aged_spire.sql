/*
  # Create Admin User Account

  1. Admin User Setup
    - Create user invitation record for admin
    - Set up admin role assignment
    - Create agent profile for admin user
  
  2. Admin Privileges
    - Full access to user management
    - Announcement creation and management
    - Calendar and schedule management
    - All dashboard admin features
*/

-- Create admin user invitation record
INSERT INTO user_invitations (
  email,
  first_name,
  last_name,
  role,
  temporary_password,
  invited_by,
  is_active
) VALUES (
  'Eliyahucohen101@gmail.com',
  'Admin',
  'User',
  'admin',
  'EIBTeam123',
  '00000000-0000-0000-0000-000000000000', -- System user
  true
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  temporary_password = 'EIBTeam123',
  is_active = true;

-- Function to create admin user in auth.users if not exists
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Check if admin user already exists in auth.users
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'Eliyahucohen101@gmail.com';
  
  -- If user doesn't exist, we'll create placeholder records
  -- The actual auth user will be created when they first sign up
  IF admin_user_id IS NULL THEN
    -- Create a placeholder UUID for the admin user
    admin_user_id := '11111111-1111-1111-1111-111111111111';
    
    -- Create user role record
    INSERT INTO user_roles (
      user_id,
      role,
      assigned_by
    ) VALUES (
      admin_user_id,
      'admin',
      '00000000-0000-0000-0000-000000000000'
    ) ON CONFLICT (user_id) DO UPDATE SET
      role = 'admin';
    
    -- Create agent profile
    INSERT INTO agent_profiles (
      user_id,
      first_name,
      last_name,
      status
    ) VALUES (
      admin_user_id,
      'Admin',
      'User',
      'active'
    ) ON CONFLICT (user_id) DO UPDATE SET
      first_name = 'Admin',
      last_name = 'User',
      status = 'active';
  END IF;
END;
$$;

-- Execute the function
SELECT create_admin_user();

-- Drop the function as it's no longer needed
DROP FUNCTION create_admin_user();