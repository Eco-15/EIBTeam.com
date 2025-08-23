/*
  # Update Supabase Auth Settings for Production Domain

  1. Configuration Updates
    - Update site URL to production domain
    - Configure redirect URLs for email verification
    - Set up proper authentication flow

  2. Security
    - Ensure proper domain validation
    - Configure allowed redirect URLs
*/

-- This migration file documents the required Supabase dashboard configuration changes
-- These settings must be updated in the Supabase dashboard manually:

-- 1. Go to Authentication > Settings in your Supabase dashboard
-- 2. Update the following settings:

-- Site URL: https://eibagency.com
-- Additional Redirect URLs:
--   - https://eibagency.com/agent-login
--   - https://eibagency.com/dashboard
--   - https://eibagency.com/admin/dashboard

-- 3. Email Templates:
-- Update all email templates to use https://eibagency.com as the base URL

-- 4. URL Configuration:
-- Ensure all confirmation and recovery URLs point to https://eibagency.com

-- Note: These changes must be made in the Supabase dashboard as they cannot be
-- applied via SQL migrations. This file serves as documentation of required changes.