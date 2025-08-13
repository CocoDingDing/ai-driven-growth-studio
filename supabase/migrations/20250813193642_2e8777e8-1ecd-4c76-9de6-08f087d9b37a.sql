-- Fix critical security vulnerability: Remove public read access to survey responses
-- Implement session-based access controls to prevent data theft

-- Drop the dangerous public read policy
DROP POLICY IF EXISTS "Allow public read access to survey responses" ON public.survey_responses;

-- Create session-based read policy - users can only read their own session's responses
CREATE POLICY "Users can read their own session responses" 
ON public.survey_responses 
FOR SELECT 
USING (session_id = current_setting('request.session_id', true)::uuid);

-- Update insert policy to be more restrictive - ensure session_id matches
DROP POLICY IF EXISTS "Anyone can insert survey responses" ON public.survey_responses;
CREATE POLICY "Users can insert their own session responses" 
ON public.survey_responses 
FOR INSERT 
WITH CHECK (session_id = current_setting('request.session_id', true)::uuid);

-- Update the update policy to use the same session-based check
DROP POLICY IF EXISTS "Users can update responses from their session" ON public.survey_responses;
CREATE POLICY "Users can update their own session responses" 
ON public.survey_responses 
FOR UPDATE 
USING (session_id = current_setting('request.session_id', true)::uuid)
WITH CHECK (session_id = current_setting('request.session_id', true)::uuid);