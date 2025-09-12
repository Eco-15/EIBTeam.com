/*
  # Reset Static Announcement and Schedule Data

  1. Data Cleanup
    - Deactivate all existing announcements
    - Deactivate all existing schedule events
  
  2. Purpose
    - Remove all static/demo data
    - Make system fully dynamic based on admin-created content
    - Ensure clean slate for production use
*/

-- Deactivate all existing announcements
UPDATE public.announcements
SET is_active = FALSE
WHERE is_active = TRUE;

-- Deactivate all existing schedule events  
UPDATE public.schedule_events
SET is_active = FALSE
WHERE is_active = TRUE;

-- Optional: If you want to completely remove the data instead of just deactivating
-- DELETE FROM public.announcements;
-- DELETE FROM public.schedule_events;