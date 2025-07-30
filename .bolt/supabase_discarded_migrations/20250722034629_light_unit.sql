/*
  # Create Admin User Account

  1. New User Creation
    - Creates admin user with email Eliyahucohen101@gmail.com
    - Sets password to EIBTeam123
    - Assigns admin role
    - Creates complete user profile

  2. Security
    - Admin role assignment
    - Complete profile setup
    - Invitation record for tracking
*/

-- Create the admin user using Supabase Auth Admin API equivalent
-- Note: This would typically be done through the Supabase dashboard or Admin API
-- For now, we'll create the supporting records assuming the auth user exists

-- Insert admin role record
INSERT INTO user_roles (
  user_id,
  role,
  assigned_by,
  assigned_at
) VALUES (
  '00000000-0000-0000-0000-000000000001', -- Placeholder UUID, will be updated when real user is created
  'admin',
  '00000000-0000-0000-0000-000000000001',
  now()
) ON CONFLICT (user_id) DO UPDATE SET
  role = 'admin',
  assigned_by = '00000000-0000-0000-0000-000000000001',
  assigned_at = now();

-- Insert agent profile
INSERT INTO agent_profiles (
  user_id,
  first_name,
  last_name,
  status
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Admin',
  'User',
  'active'
) ON CONFLICT (user_id) DO UPDATE SET
  first_name = 'Admin',
  last_name = 'User',
  status = 'active';

-- Insert invitation record
INSERT INTO user_invitations (
  email,
  first_name,
  last_name,
  role,
  temporary_password,
  invited_by,
  accepted_at,
  is_active
) VALUES (
  'Eliyahucohen101@gmail.com',
  'Admin',
  'User',
  'admin',
  'EIBTeam123',
  '00000000-0000-0000-0000-000000000001',
  now(),
  true
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  temporary_password = 'EIBTeam123',
  accepted_at = now(),
  is_active = true;