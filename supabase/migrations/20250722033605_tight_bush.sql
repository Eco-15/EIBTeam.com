/*
  # Fix RLS Infinite Recursion Error

  1. Problem
    - RLS policies on user_roles table are causing infinite recursion
    - Policies are trying to check user roles by querying the same table they're protecting

  2. Solution
    - Drop existing problematic policies
    - Create new policies that use auth.uid() directly without circular references
    - Use simpler policy logic that doesn't depend on role lookups

  3. Security
    - Users can view their own role record
    - Only authenticated users can access their data
    - Admin operations handled separately without circular dependencies
*/

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;

-- Drop existing policies on other tables that reference user_roles
DROP POLICY IF EXISTS "Admins can manage announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can manage schedule events" ON schedule_events;
DROP POLICY IF EXISTS "Admins can manage all invitations" ON user_invitations;

-- Create simple, non-recursive policies for user_roles
CREATE POLICY "Users can view own role record"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage roles"
  ON user_roles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create non-recursive policies for announcements
CREATE POLICY "Everyone can read active announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Service role can manage announcements"
  ON announcements
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create non-recursive policies for schedule_events
CREATE POLICY "Everyone can read active schedule events"
  ON schedule_events
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Service role can manage schedule events"
  ON schedule_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create non-recursive policies for user_invitations
CREATE POLICY "Users can view own invitation"
  ON user_invitations
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "Service role can manage invitations"
  ON user_invitations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);