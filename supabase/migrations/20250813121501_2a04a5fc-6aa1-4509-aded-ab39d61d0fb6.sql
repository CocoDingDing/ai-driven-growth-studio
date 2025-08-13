-- Fix critical privacy issue: Remove SELECT access to customer survey data
-- This survey system is designed for anonymous public submissions only
-- Personal data should not be accessible to any regular users

-- Drop the current SELECT policy that allows authenticated users to view all responses
DROP POLICY IF EXISTS "Only authenticated users can view survey responses" ON public.survey_responses;

-- Do not create any new SELECT policy for regular users
-- Only database administrators will be able to view survey responses through the dashboard
-- This protects customer personal information (names, emails, companies) from unauthorized access

-- Note: The INSERT policy remains for public anonymous submissions
-- The UPDATE policy with WITH CHECK (false) prevents any modifications for security