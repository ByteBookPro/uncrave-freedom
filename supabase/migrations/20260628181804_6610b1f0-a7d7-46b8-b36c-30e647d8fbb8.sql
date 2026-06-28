ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_voice_preference_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_voice_preference_check
  CHECK (voice_preference IN ('calm_female','energetic_male','alloy','echo','fable','onyx','nova','shimmer'));