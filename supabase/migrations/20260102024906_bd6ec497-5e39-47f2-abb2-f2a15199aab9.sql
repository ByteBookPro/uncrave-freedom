
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
