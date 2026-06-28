
-- Create app_role enum for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create language enum
CREATE TYPE public.content_language AS ENUM ('en', 'de', 'zh', 'hi');

-- Create module type enum
CREATE TYPE public.module_type AS ENUM ('STORY_VIDEO', 'ANIMATED_SLIDES', 'COACH_VIDEO', 'GUIDED_PRACTICE', 'CHECKPOINT', 'CRAVING_TOOL');

-- Create practice type enum
CREATE TYPE public.practice_type AS ENUM ('BREATHING', 'URGE_SURFING', 'TRIGGER_SCAN', 'THOUGHT_REFRAME', 'VISUALIZATION', 'BODY_SCAN', 'MICRO_COMMITMENT', 'TAP_QUIZ');

-- Create asset type enum
CREATE TYPE public.asset_type AS ENUM ('VIDEO', 'AUDIO', 'LOTTIE', 'IMAGE', 'CAPTIONS');

-- Course days table
CREATE TABLE public.course_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  language public.content_language NOT NULL DEFAULT 'en',
  min_duration_seconds INTEGER NOT NULL DEFAULT 900,
  max_duration_seconds INTEGER NOT NULL DEFAULT 1200,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Day modules table
CREATE TABLE public.day_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id UUID NOT NULL REFERENCES public.course_days(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  type public.module_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  estimated_seconds INTEGER NOT NULL DEFAULT 180,
  gating_required BOOLEAN NOT NULL DEFAULT true,
  config_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(day_id, order_index)
);

-- Module assets table
CREATE TABLE public.module_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.day_modules(id) ON DELETE CASCADE,
  asset_type public.asset_type NOT NULL,
  url TEXT NOT NULL,
  language public.content_language NOT NULL DEFAULT 'en',
  captions_url TEXT,
  poster_url TEXT,
  lottie_key TEXT,
  transcript TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Practices table
CREATE TABLE public.practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id UUID REFERENCES public.course_days(id) ON DELETE SET NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  practice_type public.practice_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  config_json JSONB NOT NULL DEFAULT '{}',
  estimated_seconds INTEGER NOT NULL DEFAULT 180,
  required BOOLEAN NOT NULL DEFAULT false,
  unlock_after_day INTEGER DEFAULT 0,
  always_available BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  language public.content_language NOT NULL DEFAULT 'en',
  cigarettes_per_day INTEGER,
  years_smoking INTEGER,
  quit_date DATE,
  subscription_status TEXT DEFAULT 'free',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User roles table (for admin access)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- User progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_id UUID NOT NULL REFERENCES public.course_days(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.day_modules(id) ON DELETE SET NULL,
  seconds_watched INTEGER NOT NULL DEFAULT 0,
  total_active_seconds INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, day_id, module_id)
);

-- User day completion tracking
CREATE TABLE public.user_day_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_id UUID NOT NULL REFERENCES public.course_days(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total_duration_seconds INTEGER NOT NULL,
  UNIQUE(user_id, day_id)
);

-- User practice logs table
CREATE TABLE public.user_practice_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  practice_id UUID NOT NULL REFERENCES public.practices(id) ON DELETE CASCADE,
  duration_seconds INTEGER NOT NULL,
  intensity_before INTEGER CHECK (intensity_before >= 0 AND intensity_before <= 10),
  intensity_after INTEGER CHECK (intensity_after >= 0 AND intensity_after <= 10),
  metadata_json JSONB DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Craving logs table
CREATE TABLE public.craving_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  intensity INTEGER NOT NULL CHECK (intensity >= 1 AND intensity <= 10),
  trigger_tag TEXT,
  context_tag TEXT,
  coping_used TEXT,
  overcame BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Events table for analytics
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  payload_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Broadcasts table for admin messaging
CREATE TABLE public.broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  segment_json JSONB DEFAULT '{}',
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User broadcast reads
CREATE TABLE public.user_broadcast_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  broadcast_id UUID NOT NULL REFERENCES public.broadcasts(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, broadcast_id)
);

-- Enable RLS on all tables
ALTER TABLE public.course_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.day_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_day_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_practice_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craving_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_broadcast_reads ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies

-- Course days: Everyone can read published, admins can do everything
CREATE POLICY "Anyone can view published course days"
ON public.course_days FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage course days"
ON public.course_days FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Day modules: Everyone can read
CREATE POLICY "Anyone can view day modules"
ON public.day_modules FOR SELECT
USING (true);

CREATE POLICY "Admins can manage day modules"
ON public.day_modules FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Module assets: Everyone can read
CREATE POLICY "Anyone can view module assets"
ON public.module_assets FOR SELECT
USING (true);

CREATE POLICY "Admins can manage module assets"
ON public.module_assets FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Practices: Everyone can read
CREATE POLICY "Anyone can view practices"
ON public.practices FOR SELECT
USING (true);

CREATE POLICY "Admins can manage practices"
ON public.practices FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Profiles: Users can manage their own
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- User roles: Only admins can manage
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- User progress: Users can manage their own
CREATE POLICY "Users can manage own progress"
ON public.user_progress FOR ALL
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress"
ON public.user_progress FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- User day completions: Users can manage their own
CREATE POLICY "Users can manage own day completions"
ON public.user_day_completions FOR ALL
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all day completions"
ON public.user_day_completions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- User practice logs: Users can manage their own
CREATE POLICY "Users can manage own practice logs"
ON public.user_practice_logs FOR ALL
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all practice logs"
ON public.user_practice_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Craving logs: Users can manage their own
CREATE POLICY "Users can manage own craving logs"
ON public.craving_logs FOR ALL
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all craving logs"
ON public.craving_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Events: Users can insert their own, admins can view all
CREATE POLICY "Users can insert own events"
ON public.events FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all events"
ON public.events FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Broadcasts: Everyone can read, admins can manage
CREATE POLICY "Anyone can view broadcasts"
ON public.broadcasts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage broadcasts"
ON public.broadcasts FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- User broadcast reads: Users can manage their own
CREATE POLICY "Users can manage own broadcast reads"
ON public.user_broadcast_reads FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- Create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_course_days_updated_at
  BEFORE UPDATE ON public.course_days
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Fix function search path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Seed the 10 days of course content
INSERT INTO public.course_days (day_number, title, subtitle, min_duration_seconds, max_duration_seconds, is_published) VALUES
(1, 'Understanding Your Habit', 'Discover the science behind your smoking habit', 900, 1200, true),
(2, 'The Addiction Myth', 'Break free from the nicotine trap', 900, 1200, true),
(3, 'Triggers & Patterns', 'Identify what makes you reach for a cigarette', 900, 1200, true),
(4, 'Reframing Your Thoughts', 'Transform the way you think about smoking', 900, 1200, true),
(5, 'Building New Habits', 'Replace smoking with healthy alternatives', 900, 1200, true),
(6, 'Managing Stress', 'Discover better ways to cope with stress', 900, 1200, true),
(7, 'Social Situations', 'Navigate social pressure with confidence', 900, 1200, true),
(8, 'The Final Smoke', 'Prepare for your last cigarette', 900, 1200, true),
(9, 'Day One Smoke-Free', 'Your first full day of freedom', 900, 1200, true),
(10, 'Living Smoke-Free', 'Embrace your new identity', 900, 1200, true);

-- Insert modules for Day 1 (18 min total = 1080 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'STORY_VIDEO', 'Welcome to Your Journey', 'Meet others who have successfully quit and understand what lies ahead', 210, true, '{"videoType": "story"}'),
  (2, 'ANIMATED_SLIDES', 'How Smoking Hijacked Your Brain', 'Understanding the dopamine trap and why willpower alone fails', 300, true, '{"slides": 10}'),
  (3, 'GUIDED_PRACTICE', 'Breathing Foundation', 'Learn the core breathing technique you''ll use throughout the program', 180, true, '{"practiceType": "BREATHING", "inhaleSec": 4, "holdSec": 4, "exhaleSec": 6, "cycles": 6}'),
  (4, 'COACH_VIDEO', 'The Truth About Nicotine', 'Your coach explains what nicotine really does to your body', 240, true, '{"videoType": "coach"}'),
  (5, 'GUIDED_PRACTICE', 'Urge Surfing Introduction', 'Experience your first urge surfing session', 150, true, '{"practiceType": "URGE_SURFING", "duration": 150}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 1;

-- Insert modules for Day 2 (17 min total = 1020 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'STORY_VIDEO', 'Sarah''s Story', 'How a 20-year smoker broke free in 10 days', 240, true, '{"videoType": "story"}'),
  (2, 'ANIMATED_SLIDES', 'The Nicotine Trap Exposed', 'Why nicotine creates an illusion of pleasure', 300, true, '{"slides": 10}'),
  (3, 'GUIDED_PRACTICE', 'Deep Breathing Practice', 'Extended breathing session for stress relief', 240, true, '{"practiceType": "BREATHING", "inhaleSec": 5, "holdSec": 5, "exhaleSec": 7, "cycles": 8}'),
  (4, 'CHECKPOINT', 'Knowledge Check', 'Test your understanding of the addiction myth', 90, true, '{"questions": 5}'),
  (5, 'GUIDED_PRACTICE', 'Body Scan Basics', 'Learn to notice sensations in your body', 150, true, '{"practiceType": "BODY_SCAN", "regions": 5}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 2;

-- Insert modules for Day 3 (18 min total = 1080 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'ANIMATED_SLIDES', 'Mapping Your Triggers', 'Understand the situations that make you smoke', 300, true, '{"slides": 12}'),
  (2, 'GUIDED_PRACTICE', 'Trigger Identification', 'Identify your personal trigger patterns', 180, true, '{"practiceType": "TRIGGER_SCAN"}'),
  (3, 'COACH_VIDEO', 'Breaking the Chain', 'How to interrupt the trigger-response cycle', 240, true, '{"videoType": "coach"}'),
  (4, 'GUIDED_PRACTICE', 'Extended Urge Surfing', 'Ride the wave with confidence', 210, true, '{"practiceType": "URGE_SURFING", "duration": 210}'),
  (5, 'GUIDED_PRACTICE', 'Calming Breath Reset', 'Quick breathing technique for trigger moments', 150, true, '{"practiceType": "BREATHING", "inhaleSec": 4, "holdSec": 2, "exhaleSec": 6, "cycles": 5}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 3;

-- Insert modules for Day 4 (17 min total = 1020 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'STORY_VIDEO', 'Michael''s Breakthrough', 'How reframing changed everything', 240, true, '{"videoType": "story"}'),
  (2, 'ANIMATED_SLIDES', 'The Psychology of Craving', 'Understanding thought patterns that keep you hooked', 270, true, '{"slides": 9}'),
  (3, 'GUIDED_PRACTICE', 'Thought Reframing', 'Transform negative thoughts about quitting', 240, true, '{"practiceType": "THOUGHT_REFRAME"}'),
  (4, 'COACH_VIDEO', 'Your New Mindset', 'Building mental strength for the journey ahead', 180, true, '{"videoType": "coach"}'),
  (5, 'GUIDED_PRACTICE', 'Visualization Practice', 'See your smoke-free future clearly', 180, true, '{"practiceType": "VISUALIZATION"}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 4;

-- Insert modules for Day 5 (18 min total = 1080 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'ANIMATED_SLIDES', 'Building Your Toolkit', 'Healthy alternatives to smoking', 300, true, '{"slides": 12}'),
  (2, 'GUIDED_PRACTICE', 'Quick Breathing Reset', 'A 2-minute technique for any moment', 120, true, '{"practiceType": "BREATHING", "inhaleSec": 4, "holdSec": 4, "exhaleSec": 4, "cycles": 6}'),
  (3, 'COACH_VIDEO', 'Replacing the Ritual', 'New habits for old trigger moments', 270, true, '{"videoType": "coach"}'),
  (4, 'GUIDED_PRACTICE', 'Full Body Scan', 'Complete body awareness practice', 240, true, '{"practiceType": "BODY_SCAN", "regions": 8}'),
  (5, 'GUIDED_PRACTICE', 'Micro-Commitment', 'Make your first commitment to change', 150, true, '{"practiceType": "MICRO_COMMITMENT"}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 5;

-- Insert modules for Day 6 (17 min total = 1020 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'STORY_VIDEO', 'Stress Without Smoke', 'Real stories of managing stress smoke-free', 210, true, '{"videoType": "story"}'),
  (2, 'ANIMATED_SLIDES', 'The Stress-Smoking Myth', 'Why cigarettes actually increase stress', 270, true, '{"slides": 9}'),
  (3, 'GUIDED_PRACTICE', 'Extended Breathing Session', 'Deep relaxation for stress relief', 300, true, '{"practiceType": "BREATHING", "inhaleSec": 5, "holdSec": 7, "exhaleSec": 8, "cycles": 8}'),
  (4, 'CHECKPOINT', 'Stress Management Quiz', 'Check your stress coping knowledge', 90, true, '{"questions": 4}'),
  (5, 'GUIDED_PRACTICE', 'Calming Visualization', 'Find your peaceful place', 210, true, '{"practiceType": "VISUALIZATION"}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 6;

-- Insert modules for Day 7 (18 min total = 1080 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'ANIMATED_SLIDES', 'Social Confidence', 'How to handle social smoking situations', 300, true, '{"slides": 10}'),
  (2, 'GUIDED_PRACTICE', 'Trigger Scan: Social', 'Identify your social smoking triggers', 180, true, '{"practiceType": "TRIGGER_SCAN"}'),
  (3, 'COACH_VIDEO', 'What to Say', 'Scripts for declining cigarettes gracefully', 240, true, '{"videoType": "coach"}'),
  (4, 'GUIDED_PRACTICE', 'Thought Reframe: Social', 'Reframe thoughts about social smoking', 210, true, '{"practiceType": "THOUGHT_REFRAME"}'),
  (5, 'GUIDED_PRACTICE', 'Confidence Visualization', 'See yourself succeeding in social situations', 180, true, '{"practiceType": "VISUALIZATION"}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 7;

-- Insert modules for Day 8 (17 min total = 1020 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'STORY_VIDEO', 'The Last Cigarette', 'Stories of saying goodbye to smoking', 270, true, '{"videoType": "story"}'),
  (2, 'ANIMATED_SLIDES', 'Preparing for Freedom', 'What to expect on your quit day', 270, true, '{"slides": 9}'),
  (3, 'GUIDED_PRACTICE', 'Full Urge Surfing', 'Complete urge surfing for tomorrow', 300, true, '{"practiceType": "URGE_SURFING", "duration": 300}'),
  (4, 'COACH_VIDEO', 'Your Quit Day Plan', 'Step-by-step guide for tomorrow', 180, true, '{"videoType": "coach"}'),
  (5, 'GUIDED_PRACTICE', 'Final Commitment', 'Seal your commitment to quit', 90, true, '{"practiceType": "MICRO_COMMITMENT"}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 8;

-- Insert modules for Day 9 (18 min total = 1080 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'COACH_VIDEO', 'Welcome to Day One', 'Celebrate your first smoke-free day', 180, true, '{"videoType": "coach"}'),
  (2, 'ANIMATED_SLIDES', 'Your Body is Healing', 'What''s happening in your body right now', 270, true, '{"slides": 9}'),
  (3, 'GUIDED_PRACTICE', 'Morning Breathing Ritual', 'Start your smoke-free day right', 240, true, '{"practiceType": "BREATHING", "inhaleSec": 5, "holdSec": 5, "exhaleSec": 7, "cycles": 8}'),
  (4, 'GUIDED_PRACTICE', 'Craving Emergency', 'Intensive urge surfing for strong cravings', 240, true, '{"practiceType": "URGE_SURFING", "duration": 240}'),
  (5, 'GUIDED_PRACTICE', 'Celebration Visualization', 'Celebrate your success with visualization', 180, true, '{"practiceType": "VISUALIZATION"}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 9;

-- Insert modules for Day 10 (17 min total = 1020 sec)
INSERT INTO public.day_modules (day_id, order_index, type, title, description, estimated_seconds, gating_required, config_json)
SELECT 
  cd.id,
  m.order_index,
  m.type::public.module_type,
  m.title,
  m.description,
  m.estimated_seconds,
  m.gating_required,
  m.config_json::jsonb
FROM public.course_days cd
CROSS JOIN (VALUES
  (1, 'STORY_VIDEO', 'Life After Smoking', 'Success stories from our graduates', 240, true, '{"videoType": "story"}'),
  (2, 'ANIMATED_SLIDES', 'Your New Identity', 'Embracing life as a non-smoker', 270, true, '{"slides": 9}'),
  (3, 'GUIDED_PRACTICE', 'Complete Body Scan', 'Full body awareness celebration', 300, true, '{"practiceType": "BODY_SCAN", "regions": 10}'),
  (4, 'COACH_VIDEO', 'Staying Smoke-Free', 'Long-term strategies for success', 210, true, '{"videoType": "coach"}'),
  (5, 'GUIDED_PRACTICE', 'Future Self Visualization', 'See your healthy, smoke-free future', 180, true, '{"practiceType": "VISUALIZATION"}')
) AS m(order_index, type, title, description, estimated_seconds, gating_required, config_json)
WHERE cd.day_number = 10;

-- Insert practice packs for the Practice tab
INSERT INTO public.practices (practice_type, title, description, config_json, estimated_seconds, unlock_after_day, always_available) VALUES
-- Always available practices
('BREATHING', '5-5-5 Breathing', 'A calming 3-minute breathing exercise', '{"inhaleSec": 5, "holdSec": 5, "exhaleSec": 5, "cycles": 8}', 180, 0, true),
('URGE_SURFING', 'Urge Surfing', 'Ride the wave of craving until it passes', '{"duration": 240}', 240, 0, true),

-- Unlocked after specific days
('TRIGGER_SCAN', 'Trigger Scan', 'Identify and understand your triggers', '{}', 180, 3, false),
('THOUGHT_REFRAME', 'Thought Reframing', 'Transform negative thoughts about quitting', '{}', 240, 4, false),
('VISUALIZATION', 'Smoke-Free Visualization', 'Picture your healthy future', '{}', 210, 4, false),
('BODY_SCAN', 'Full Body Scan', 'Complete body awareness practice', '{"regions": 10}', 360, 5, false),
('MICRO_COMMITMENT', 'Daily Commitment', 'Reinforce your commitment to quit', '{}', 90, 5, false),

-- Emergency combo
('URGE_SURFING', 'Craving Emergency', 'Intensive combo for strong cravings: breathing + urge surfing + reframe', '{"combo": true, "duration": 480}', 480, 0, true);
-- Add voice_preference column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN voice_preference text DEFAULT 'calm_female' 
CHECK (voice_preference IN ('calm_female', 'energetic_male'));-- Add triggers column to profiles table for storing user's personal triggers
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS triggers text[] DEFAULT '{}';

-- Add alternative_responses column for storing user's chosen alternatives per trigger
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS trigger_alternatives jsonb DEFAULT '{}';ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS reasons_to_quit text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS price_per_pack numeric,
  ADD COLUMN IF NOT EXISTS cigarettes_per_pack integer DEFAULT 20,
  ADD COLUMN IF NOT EXISTS current_day integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS onboarded boolean DEFAULT false;ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_voice_preference_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_voice_preference_check
  CHECK (voice_preference IN ('calm_female','energetic_male','alloy','echo','fable','onyx','nova','shimmer'));