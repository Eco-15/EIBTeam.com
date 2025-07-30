/*
  # Update schedule events table policies for admin functionality

  1. Security Updates
    - Update RLS policies to allow admins to manage all schedule events
    - Ensure proper access control for different user roles
  
  2. Policy Changes
    - Allow admins to create, read, update, and delete events
    - Allow regular users to read active events
*/

-- Drop existing policies to recreate them with proper admin access
DROP POLICY IF EXISTS "All authenticated users can read schedule events" ON schedule_events;
DROP POLICY IF EXISTS "Authenticated users can manage schedule events" ON schedule_events;
DROP POLICY IF EXISTS "Everyone can read active schedule events" ON schedule_events;
DROP POLICY IF EXISTS "Service role can manage schedule events" ON schedule_events;

-- Create new policies with proper admin access
CREATE POLICY "Users can read active schedule events"
  ON schedule_events
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage all schedule events"
  ON schedule_events
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Service role can manage schedule events"
  ON schedule_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);