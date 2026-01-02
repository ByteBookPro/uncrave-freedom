// Database types for UnCrave app

export type ContentLanguage = 'en' | 'de' | 'zh' | 'hi';
export type ModuleType = 'STORY_VIDEO' | 'ANIMATED_SLIDES' | 'COACH_VIDEO' | 'GUIDED_PRACTICE' | 'CHECKPOINT' | 'CRAVING_TOOL';
export type PracticeType = 'BREATHING' | 'URGE_SURFING' | 'TRIGGER_SCAN' | 'THOUGHT_REFRAME' | 'VISUALIZATION' | 'BODY_SCAN' | 'MICRO_COMMITMENT' | 'TAP_QUIZ';
export type AssetType = 'VIDEO' | 'AUDIO' | 'LOTTIE' | 'IMAGE' | 'CAPTIONS';

export interface CourseDay {
  id: string;
  day_number: number;
  title: string;
  subtitle: string | null;
  language: ContentLanguage;
  min_duration_seconds: number;
  max_duration_seconds: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DayModule {
  id: string;
  day_id: string;
  order_index: number;
  type: ModuleType;
  title: string;
  description: string | null;
  estimated_seconds: number;
  gating_required: boolean;
  config_json: Record<string, unknown>;
  created_at: string;
}

export interface ModuleAsset {
  id: string;
  module_id: string;
  asset_type: AssetType;
  url: string;
  language: ContentLanguage;
  captions_url: string | null;
  poster_url: string | null;
  lottie_key: string | null;
  transcript: string | null;
  created_at: string;
}

export interface Practice {
  id: string;
  day_id: string | null;
  order_index: number;
  practice_type: PracticeType;
  title: string;
  description: string | null;
  config_json: Record<string, unknown>;
  estimated_seconds: number;
  required: boolean;
  unlock_after_day: number;
  always_available: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  language: ContentLanguage;
  cigarettes_per_day: number | null;
  years_smoking: number | null;
  quit_date: string | null;
  subscription_status: string;
  subscription_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  day_id: string;
  module_id: string | null;
  seconds_watched: number;
  total_active_seconds: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserDayCompletion {
  id: string;
  user_id: string;
  day_id: string;
  completed_at: string;
  total_duration_seconds: number;
}

export interface UserPracticeLog {
  id: string;
  user_id: string;
  practice_id: string;
  duration_seconds: number;
  intensity_before: number | null;
  intensity_after: number | null;
  metadata_json: Record<string, unknown>;
  completed_at: string;
}

export interface CravingLog {
  id: string;
  user_id: string;
  intensity: number;
  trigger_tag: string | null;
  context_tag: string | null;
  coping_used: string | null;
  overcame: boolean;
  created_at: string;
}

export interface AppEvent {
  id: string;
  user_id: string | null;
  event_type: string;
  payload_json: Record<string, unknown>;
  created_at: string;
}

export interface Broadcast {
  id: string;
  title: string;
  body: string;
  segment_json: Record<string, unknown>;
  sent_at: string | null;
  created_at: string;
}

// Common trigger tags
export const TRIGGER_TAGS = [
  'stress',
  'coffee',
  'after_meal',
  'commute',
  'boredom',
  'social',
  'alcohol',
  'work_break',
  'morning',
  'evening',
  'anxiety',
  'celebration'
] as const;

// Context tags
export const CONTEXT_TAGS = [
  'home',
  'work',
  'car',
  'outdoors',
  'restaurant',
  'bar',
  'friend_house',
  'walking'
] as const;

// Common smoking thoughts for reframe exercise
export const SMOKING_THOUGHTS = [
  { id: 1, thought: "I need one to relax", reframe: "Cigarettes actually increase stress hormones. Deep breathing provides real relaxation." },
  { id: 2, thought: "Just one won't hurt", reframe: "One cigarette restarts the addiction cycle. I've worked too hard to go back." },
  { id: 3, thought: "I can't concentrate without it", reframe: "Nicotine withdrawal feels like lack of focus. True concentration returns within days." },
  { id: 4, thought: "Smoking is my reward", reframe: "I deserve real rewards - health, energy, money. Cigarettes are a punishment, not a prize." },
  { id: 5, thought: "I'll gain weight if I quit", reframe: "Any weight gain is temporary and far less harmful than smoking. I can manage both." },
  { id: 6, thought: "It helps me deal with stress", reframe: "Smoking causes stress by creating withdrawal cycles. I'm learning better coping tools." },
  { id: 7, thought: "I'll lose my social connections", reframe: "Real friends support my health. Smoke breaks aren't real connection." },
  { id: 8, thought: "I've smoked too long to quit", reframe: "It's never too late. My body begins healing within 20 minutes of my last cigarette." }
] as const;

// Visualization options
export const VISUALIZATION_OPTIONS = [
  { id: 'future_breathing', label: 'Future me breathing easily', description: 'See yourself taking deep, clean breaths with healthy lungs' },
  { id: 'family_pride', label: 'Family pride', description: 'Picture your loved ones proud of your smoke-free life' },
  { id: 'morning_energy', label: 'Morning energy', description: 'Wake up refreshed, energetic, and ready for the day' }
] as const;

// Micro-commitment options
export const COMMITMENT_OPTIONS = [
  { id: 'after_meal', plan: 'After meals: drink water + 2-min breathing' },
  { id: 'coffee', plan: 'With coffee: delay 10 minutes + urge surfing' },
  { id: 'stress', plan: 'Stressful moment: 5-5-5 breathing + walk' },
  { id: 'social', plan: 'Social situations: excuse myself + quick body scan' },
  { id: 'boredom', plan: 'Bored: engage hands + visualization' },
  { id: 'morning', plan: 'Morning routine: breathing first, then routine' }
] as const;
