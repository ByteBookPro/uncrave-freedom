-- Add voice_preference column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN voice_preference text DEFAULT 'calm_female' 
CHECK (voice_preference IN ('calm_female', 'energetic_male'));