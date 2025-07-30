/*
  # Create Admin User Account

  1. Admin User Setup
    - Creates admin user with specified credentials
    - Assigns admin role in user_roles table
    - Creates agent profile for completeness
    - Sets up proper permissions

  2. Security
    - Admin role assignment
    - Proper user metadata
    - Email confirmation bypassed for immediate access
*/

-- First, we need to create the user using Supabase Auth Admin API
-- This will be handled in the application code since we can't directly create auth users in SQL

-- Create the user role record for the admin user
-- Note: The user_id will need to be updated once the auth user is created
INSERT INTO user_roles (user_id, role, assigned_by) 
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Placeholder, will be updated
  'admin',
  '00000000-0000-0000-0000-000000000000'
) ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Create agent profile for the admin user (optional but for completeness)
INSERT INTO agent_profiles (user_id, first_name, last_name, status)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Placeholder, will be updated
  'Admin',
  'User',
  'active'
) ON CONFLICT (user_id) DO UPDATE SET 
  first_name = 'Admin',
  last_name = 'User',
  status = 'active';

-- Create user invitation record for tracking
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
  '00000000-0000-0000-0000-000000000000',
  now(),
  true
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  temporary_password = 'EIBTeam123',
  accepted_at = now(),
  is_active = true;