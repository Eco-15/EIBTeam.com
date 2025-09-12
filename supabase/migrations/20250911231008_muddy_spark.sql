/*
  # Allow anonymous users to create consultation requests

  1. Security Changes
    - Add policy to allow anonymous (unauthenticated) users to insert consultation requests
    - This enables the public contact form to work without requiring user authentication

  2. Policy Details
    - Allows INSERT operations for anonymous users (anon role)
    - Only affects the consultation_requests table
    - Maintains existing policies for other operations
*/

-- Allow anonymous users to insert consultation requests
CREATE POLICY "Anonymous users can create consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);