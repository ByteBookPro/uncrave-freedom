ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS reasons_to_quit text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS price_per_pack numeric,
  ADD COLUMN IF NOT EXISTS cigarettes_per_pack integer DEFAULT 20,
  ADD COLUMN IF NOT EXISTS current_day integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS onboarded boolean DEFAULT false;