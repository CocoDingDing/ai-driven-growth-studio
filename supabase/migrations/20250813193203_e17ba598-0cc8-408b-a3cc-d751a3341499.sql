-- Fix security warning: Function Search Path Mutable
-- Update the validation function to use SECURITY DEFINER with proper search_path

CREATE OR REPLACE FUNCTION public.validate_survey_response()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;