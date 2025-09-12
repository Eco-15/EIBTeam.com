/*
  # Add date of birth to agent profiles

  1. Changes
    - Add `date_of_birth` column to `agent_profiles` table
    - Column is optional (nullable) to maintain compatibility with existing records

  2. Security
    - No changes to existing RLS policies needed
    - New column inherits existing security model
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agent_profiles' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE agent_profiles ADD COLUMN date_of_birth date;
  END IF;
END $$;