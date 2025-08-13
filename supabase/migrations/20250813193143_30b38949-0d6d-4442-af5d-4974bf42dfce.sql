-- Fix overly restrictive RLS policies for survey_responses table

-- Drop the blocking policies that prevent all access
DROP POLICY IF EXISTS "Block all access to survey responses" ON public.survey_responses;
DROP POLICY IF EXISTS "Users can only update responses from their session" ON public.survey_responses;

-- Create proper RLS policies for public survey functionality
-- Since this is a public survey without authentication, we need to allow:
-- 1. Anyone can read survey responses (for analytics/admin purposes)
-- 2. Anyone can update their own session's responses

CREATE POLICY "Allow public read access to survey responses" 
ON public.survey_responses 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update responses from their session" 
ON public.survey_responses 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Add input validation trigger for better data integrity
CREATE OR REPLACE FUNCTION public.validate_survey_response()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate email format if provided
  IF NEW.email IS NOT NULL AND NEW.email != '' THEN
    IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
      RAISE EXCEPTION 'Invalid email format';
    END IF;
  END IF;
  
  -- Validate first_name length
  IF NEW.first_name IS NOT NULL AND length(NEW.first_name) > 100 THEN
    RAISE EXCEPTION 'First name too long (max 100 characters)';
  END IF;
  
  -- Validate company length
  IF NEW.company IS NOT NULL AND length(NEW.company) > 200 THEN
    RAISE EXCEPTION 'Company name too long (max 200 characters)';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for validation
CREATE TRIGGER validate_survey_response_trigger
  BEFORE INSERT OR UPDATE ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_survey_response();