-- Add triggers column to profiles table for storing user's personal triggers
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS triggers text[] DEFAULT '{}';

-- Add alternative_responses column for storing user's chosen alternatives per trigger
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS trigger_alternatives jsonb DEFAULT '{}';