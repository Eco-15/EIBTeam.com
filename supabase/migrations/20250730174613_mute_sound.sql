/*
  # Update user invitations table policies for admin functionality

  1. Security Updates
    - Update RLS policies to allow admins to manage all user invitations
    - Ensure proper access control for invitation management
  
  2. Policy Changes
    - Allow admins to create, read, update, and delete invitations
    - Allow users to view their own invitations
*/

-- Drop existing policies to recreate them with proper admin access
DROP POLICY IF EXISTS "Authenticated users can manage invitations" ON user_invitations;
DROP POLICY IF EXISTS "Service role can manage invitations" ON user_invitations;
DROP POLICY IF EXISTS "Users can view invitations by email" ON user_invitations;
DROP POLICY IF EXISTS "Users can view own invitation" ON user_invitations;

-- Create new policies with proper admin access
CREATE POLICY "Admins can manage all invitations"
  ON user_invitations
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Users can view own invitation by email"
  ON user_invitations
  FOR SELECT
  TO authenticated
  USING (
    email = (
      SELECT email FROM auth.users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage invitations"
  ON user_invitations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);