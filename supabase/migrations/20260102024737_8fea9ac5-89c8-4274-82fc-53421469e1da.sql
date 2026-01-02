
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
