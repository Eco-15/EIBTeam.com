/*
  # Fix RLS policies for anonymous access

  1. Security Changes
    - Drop existing conflicting policies for consultation_requests and team_applications
    - Create new policies that explicitly allow anonymous users to insert data
    - Ensure policies are properly configured for public form submissions

  2. Tables Affected
    - consultation_requests: Allow anonymous INSERT operations
    - team_applications: Allow anonymous INSERT operations
*/

-- Drop existing policies that might be conflicting
DROP POLICY IF EXISTS "Anonymous users can create consultation requests" ON consultation_requests;
DROP POLICY IF EXISTS "Anyone can insert consultation requests" ON consultation_requests;
DROP POLICY IF EXISTS "Anyone can insert team applications" ON team_applications;

-- Create new policies for consultation_requests
CREATE POLICY "Allow anonymous consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated consultation requests"
  ON consultation_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create new policies for team_applications  
CREATE POLICY "Allow anonymous team applications"
  ON team_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated team applications"
  ON team_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ensure RLS is enabled on both tables
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_applications ENABLE ROW LEVEL SECURITY;