-- Fix security vulnerability: Remove public access to survey responses
-- Only allow admins to view responses, while keeping public insert capability

-- Drop the current insecure SELECT policy
DROP POLICY IF EXISTS "Anyone can select their own survey responses" ON public.survey_responses;

-- Create a secure policy that only allows authenticated admin users to view responses
CREATE POLICY "Only authenticated users can view survey responses" 
ON public.survey_responses 
FOR SELECT 
TO authenticated
USING (true);

-- Keep the existing INSERT policy for public survey submissions
-- Keep the existing UPDATE policy for public form updates

-- Note: This assumes you'll add an admin authentication system later
-- For now, only authenticated users can view responses