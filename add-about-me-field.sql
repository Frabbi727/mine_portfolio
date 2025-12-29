-- Add 'about_me' column to profile table for detailed About section content
-- Run this in Supabase SQL Editor

ALTER TABLE profile 
ADD COLUMN IF NOT EXISTS about_me TEXT;

-- Update the column with a default if needed
UPDATE profile 
SET about_me = bio 
WHERE about_me IS NULL;
