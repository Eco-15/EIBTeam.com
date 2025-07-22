/*
  # Admin User Management System

  1. New Tables
    - `user_invitations` - Track user invitations and onboarding status
  
  2. Security
    - Enable RLS on user_invitations table
    - Add policies for admin-only access to manage invitations
    - Add policies for users to view their own invitation status

  3. Functions
    - Add function to handle user creation and profile setup
*/

-- Create user invitations table
CREATE TABLE IF NOT EXISTS user_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  role text DEFAULT 'agent' CHECK (role IN ('admin', 'agent', 'manager')),
  temporary_password text NOT NULL,
  invited_by uuid REFERENCES auth.users(id),
  invited_at timestamptz DEFAULT now(),
  accepted_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_invitations ENABLE ROW LEVEL SECURITY;

-- Policies for user_invitations
CREATE POLICY "Admins can manage all invitations"
  ON user_invitations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

CREATE POLICY "Users can view own invitation"
  ON user_invitations
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

-- Add updated_at trigger
CREATE TRIGGER update_user_invitations_updated_at
  BEFORE UPDATE ON user_invitations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_invitations_email ON user_invitations(email);
CREATE INDEX IF NOT EXISTS idx_user_invitations_invited_by ON user_invitations(invited_by);