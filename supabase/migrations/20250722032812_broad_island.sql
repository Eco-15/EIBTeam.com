/*
  # Admin System and Announcements

  1. New Tables
    - `user_roles` - Stores user role assignments (admin, agent, etc.)
    - `announcements` - Global announcements created by admins
    - `schedule_events` - Admin-managed schedule events

  2. Security
    - Enable RLS on all new tables
    - Add policies for admin-only operations
    - Add policies for all users to read announcements and schedule

  3. Admin Features
    - Role-based access control
    - Announcement management
    - Schedule management
*/

-- Create user roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'agent',
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_roles_role_check CHECK (role IN ('admin', 'agent', 'manager'))
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  priority text DEFAULT 'medium',
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  target_audience text DEFAULT 'all',
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT announcements_priority_check CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  CONSTRAINT announcements_target_check CHECK (target_audience IN ('all', 'agents', 'managers'))
);

-- Create schedule events table
CREATE TABLE IF NOT EXISTS schedule_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text NOT NULL,
  day_of_week text NOT NULL,
  start_time time NOT NULL,
  end_time time,
  timezone text DEFAULT 'CST',
  zoom_link text,
  passcode text,
  is_recurring boolean DEFAULT true,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT schedule_events_day_check CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  CONSTRAINT schedule_events_type_check CHECK (event_type IN ('meeting', 'training', 'call', 'bom', 'hierarchy', 'sales'))
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;

-- User Roles Policies
CREATE POLICY "Users can view own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Announcements Policies
CREATE POLICY "Everyone can read active announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admins can manage announcements"
  ON announcements
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Schedule Events Policies
CREATE POLICY "Everyone can read active schedule events"
  ON schedule_events
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage schedule events"
  ON schedule_events
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedule_events_updated_at
    BEFORE UPDATE ON schedule_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert admin role for the specified user
-- Note: This will need to be run after the user exists in auth.users
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Try to find the user by email
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'Eliyahucohen101@gmail.com';
    
    -- If user exists, assign admin role
    IF admin_user_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role, assigned_by)
        VALUES (admin_user_id, 'admin', admin_user_id)
        ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
    END IF;
END $$;

-- Insert default schedule events
INSERT INTO schedule_events (title, description, event_type, day_of_week, start_time, timezone, zoom_link, passcode, created_by) VALUES
('EIB Hierarchy Call', 'Weekly hierarchy call for team updates and announcements', 'hierarchy', 'Monday', '21:00:00', 'CST', 'https://us02web.zoom.us/j/86232767445?pwd=cW5EOG4yTjE5SEhHKzh6WFVqMElCUT09', '013145', (SELECT id FROM auth.users WHERE email = 'Eliyahucohen101@gmail.com' LIMIT 1)),
('BOM', 'Business Opportunity Meeting', 'bom', 'Wednesday', '19:00:00', 'CST', NULL, NULL, (SELECT id FROM auth.users WHERE email = 'Eliyahucohen101@gmail.com' LIMIT 1)),
('EIB Sales Call', 'Weekly sales training and strategy call', 'sales', 'Friday', '12:00:00', 'CST', 'https://us02web.zoom.us/j/82582694921?pwd=0Bur6DbLWieEqLHcHIWw6zEU2G71xS.1', '226744', (SELECT id FROM auth.users WHERE email = 'Eliyahucohen101@gmail.com' LIMIT 1)),
('BOM', 'Business Opportunity Meeting', 'bom', 'Saturday', '07:00:00', 'CST', NULL, NULL, (SELECT id FROM auth.users WHERE email = 'Eliyahucohen101@gmail.com' LIMIT 1))
ON CONFLICT DO NOTHING;

-- Insert sample announcements
INSERT INTO announcements (title, message, priority, author_id, author_name, target_audience) VALUES
('Welcome to EIB Team Portal', 'Welcome to the new EIB Team agent portal! Here you can track your progress, access training materials, and stay connected with the team.', 'high', (SELECT id FROM auth.users WHERE email = 'Eliyahucohen101@gmail.com' LIMIT 1), 'Admin', 'all'),
('New Training Modules Available', 'We have added new training modules to help you succeed. Check out the Training section to get started!', 'medium', (SELECT id FROM auth.users WHERE email = 'Eliyahucohen101@gmail.com' LIMIT 1), 'Admin', 'agents')
ON CONFLICT DO NOTHING;