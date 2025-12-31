export interface UserProfile {
  id: string;
  name: string;
  cigarettesPerDay: number;
  yearsOfSmoking: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  triggers: string[];
  reasonsToQuit: string[];
  quitDate?: Date;
  currentDay: number;
  completedDays: number[];
  createdAt: Date;
}

export interface DayContent {
  day: number;
  title: string;
  subtitle: string;
  duration: string;
  objective: string;
  isLocked: boolean;
  isCompleted: boolean;
  modules: DayModule[];
}

export interface DayModule {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'text' | 'exercise' | 'reflection';
  duration: string;
  content?: string;
  isCompleted: boolean;
}

export interface ProgressStats {
  daysSmokesFree: number;
  cigarettesAvoided: number;
  moneySaved: number;
  lifeRegained: string; // in hours/days
  healthMilestones: HealthMilestone[];
}

export interface HealthMilestone {
  id: string;
  time: string; // e.g., "20 minutes", "24 hours"
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
}

export interface JournalEntry {
  id: string;
  date: Date;
  day: number;
  type: 'reason' | 'trigger' | 'goodbye' | 'reflection' | 'achievement';
  content: string;
}

export interface CravingLog {
  id: string;
  timestamp: Date;
  intensity: 1 | 2 | 3 | 4 | 5;
  trigger?: string;
  copingUsed?: string;
  overcame: boolean;
}
