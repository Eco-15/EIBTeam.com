/*
  # Update announcements table policies for admin functionality

  1. Security Updates
    - Update RLS policies to allow admins to manage all announcements
    - Ensure proper access control for different user roles
  
  2. Policy Changes
    - Allow admins to create, read, update, and delete announcements
    - Allow regular users to read active announcements
*/

-- Drop existing policies to recreate them with proper admin access
DROP POLICY IF EXISTS "All authenticated users can read announcements" ON announcements;
DROP POLICY IF EXISTS "Authenticated users can manage announcements" ON announcements;
DROP POLICY IF EXISTS "Everyone can read active announcements" ON announcements;
DROP POLICY IF EXISTS "Service role can manage announcements" ON announcements;

-- Create new policies with proper admin access
CREATE POLICY "Users can read active announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admins can manage all announcements"
  ON announcements
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Service role can manage announcements"
  ON announcements
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);