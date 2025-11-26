// Tipos do RespiraComigo - Versão Expandida

export type EmotionalLevel = 'low' | 'moderate' | 'high' | 'severe';

export interface UserProfile {
  id: string;
  name?: string;
  age?: number;
  ageGroup: 'child' | 'teen' | 'adult' | 'senior';
  accessibilityMode: {
    visualImpairment: boolean;
    colorBlind: boolean;
    largeText: boolean;
    voiceGuidance: boolean;
    reducedStimuli: boolean;
    highContrast: boolean;
  };
  preferences: {
    soundAmbient: boolean;
    musicTherapy: boolean;
    voiceGender: 'neutral' | 'feminine' | 'masculine';
    language: string;
    notifications: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  };
}

export interface QuizResponse {
  anxietyLevel: EmotionalLevel;
  depressionLevel: EmotionalLevel;
  selfEsteemLevel: EmotionalLevel;
  panicTriggers: string[];
  dailyRoutine: string;
  recentEvents: string;
  copingStyle: ('music' | 'silence' | 'movement' | 'breathing' | 'talking')[];
  sleepQuality: EmotionalLevel;
  socialSupport: EmotionalLevel;
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 'very-bad' | 'bad' | 'neutral' | 'good' | 'very-good';
  emotions: string[];
  triggers: string[];
  thoughts: string;
  achievements: string;
  energyLevel: number; // 1-10
  sadness?: number;
  anxiety?: number;
  irritation?: number;
  discouragement?: number;
  tiredness?: number;
}

export interface CrisisSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  breathingPattern: string;
  duration: number;
  stabilized: boolean;
  techniques: string[];
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
    holdAfter?: number;
  };
  duration: number; // minutes
  difficulty: 'easy' | 'medium' | 'advanced';
  benefits: string[];
}

export interface TherapyTechnique {
  id: string;
  name: string;
  category: 'grounding' | 'relaxation' | 'affirmation' | 'selfcare';
  description: string;
  steps: string[];
  duration: number;
  difficulty: 'easy' | 'medium' | 'advanced';
}

export interface DailyMessage {
  id: string;
  message: string;
  category: 'motivation' | 'selfcare' | 'affirmation' | 'reminder';
  personalizedFor: EmotionalLevel;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
}

export interface CalmingImage {
  id: string;
  title: string;
  description: string;
  category: 'birds' | 'butterflies' | 'forest' | 'flowers' | 'mountains' | 'sky' | 'waterfall' | 'nature';
  imageUrl: string;
  tags: string[];
}

export interface ImmersiveVideo {
  id: string;
  title: string;
  description: string;
  category: 'ocean' | 'rain' | 'wind' | 'river' | 'fireplace' | 'nature';
  videoUrl: string;
  duration: number; // minutes
  has3DAudio: boolean;
  tags: string[];
}

export interface RelaxationPlaylist {
  id: string;
  title: string;
  description: string;
  category: 'rain' | 'ocean' | 'wind' | 'forest' | 'white-noise' | 'pink-noise' | 'fireplace' | 'instrumental';
  audioUrl: string;
  duration: number; // hours
  loopable: boolean;
  has3DAudio: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  suggestedActions?: {
    type: 'video' | 'music' | 'breathing' | 'image';
    id: string;
    label: string;
  }[];
}

export interface MicroActivity {
  id: string;
  title: string;
  description: string;
  duration: number; // seconds
  category: 'movement' | 'hydration' | 'breathing' | 'sensory';
  icon: string;
}

export interface GuidedSession {
  id: string;
  title: string;
  type: 'grounding' | 'breathing' | 'affirmation' | 'relaxation' | 'welcome';
  audioScript: string[];
  duration: number;
  voiceGuidance: boolean;
}
