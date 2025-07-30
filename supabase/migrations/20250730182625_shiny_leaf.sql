/*
  # Fix user invitations RLS policies

  1. Policy Updates
    - Drop existing problematic policies on user_invitations table
    - Create new simplified policies that don't reference users table incorrectly
    - Ensure admins can manage all invitations
    - Allow users to view their own invitation by email

  2. Security
    - Maintain RLS protection
    - Fix permission denied errors for admin users
*/

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Admins can manage all invitations" ON user_invitations;
DROP POLICY IF EXISTS "Service role can manage invitations" ON user_invitations;
DROP POLICY IF EXISTS "Users can view own invitation by email" ON user_invitations;

-- Create new simplified policies
CREATE POLICY "Admins can manage all invitations"
  ON user_invitations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  );

-- Allow service role full access
CREATE POLICY "Service role can manage invitations"
  ON user_invitations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow users to view invitations sent to their email
CREATE POLICY "Users can view own invitation by email"
  ON user_invitations
  FOR SELECT
  TO authenticated
  USING (
    email = (
      SELECT raw_user_meta_data->>'email' 
      FROM auth.users 
      WHERE id = auth.uid()
    )
  );