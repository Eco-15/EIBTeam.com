/*
  # Create contact form tables

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `city` (text, required)
      - `state` (text, required)
      - `product_interest` (text, optional)
      - `hear_about` (text, optional)
      - `comments` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `team_applications`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `city` (text, required)
      - `state` (text, required)
      - `experience` (text, optional)
      - `hear_about` (text, optional)
      - `description` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Allow public insert access for form submissions
    - Allow public select access for insert().select() operations
    - Allow admin full access for management
*/

-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  product_interest text,
  hear_about text,
  comments text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team_applications table
CREATE TABLE IF NOT EXISTS team_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  experience text,
  hear_about text,
  description text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_applications ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_consultation_requests_email ON consultation_requests(email);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests(created_at);

CREATE INDEX IF NOT EXISTS idx_team_applications_email ON team_applications(email);
CREATE INDEX IF NOT EXISTS idx_team_applications_status ON team_applications(status);
CREATE INDEX IF NOT EXISTS idx_team_applications_created_at ON team_applications(created_at);

-- Add status constraints
ALTER TABLE consultation_requests ADD CONSTRAINT consultation_requests_status_check 
  CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled'));

ALTER TABLE team_applications ADD CONSTRAINT team_applications_status_check 
  CHECK (status IN ('pending', 'reviewing', 'interviewed', 'hired', 'rejected'));

-- RLS Policies for consultation_requests
CREATE POLICY "Anyone can insert consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can select consultation requests"
  ON consultation_requests
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can view all consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update consultation requests"
  ON consultation_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Service role can manage consultation requests"
  ON consultation_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for team_applications
CREATE POLICY "Anyone can insert team applications"
  ON team_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can select team applications"
  ON team_applications
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can view all team applications"
  ON team_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update team applications"
  ON team_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Service role can manage team applications"
  ON team_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create updated_at triggers
CREATE TRIGGER update_consultation_requests_updated_at
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_applications_updated_at
  BEFORE UPDATE ON team_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();