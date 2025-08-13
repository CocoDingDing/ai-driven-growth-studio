-- CRITICAL FIX: Add SELECT policy to prevent unauthorized access to customer data
-- The table currently has no SELECT policy, making sensitive customer data publicly readable

-- Add a restrictive SELECT policy that blocks all public access to customer data
-- Only database administrators should be able to view survey responses containing
-- customer emails, names, and company information
CREATE POLICY "Block all access to survey responses" 
ON public.survey_responses 
FOR SELECT 
TO public
USING (false);

-- This policy ensures that:
-- 1. Anonymous users cannot read customer data
-- 2. Authenticated users cannot read customer data  
-- 3. Only database admins with bypassrls can access the data for legitimate business purposes
-- 4. Customer privacy is fully protected while maintaining survey submission functionality