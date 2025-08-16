/*
  # Add referrer field to team applications

  1. Changes
    - Add `referred_by` column to `team_applications` table
    - Column allows storing the name of the person who recommended the applicant
    - Optional field with text data type

  2. Security
    - No changes to existing RLS policies needed
    - Field is optional and doesn't affect security model
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_applications' AND column_name = 'referred_by'
  ) THEN
    ALTER TABLE team_applications ADD COLUMN referred_by text;
  END IF;
END $$;