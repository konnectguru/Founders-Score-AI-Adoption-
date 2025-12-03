export type Step = 'landing' | 'contact' | 'quiz' | 'results';

export interface UserContact {
  name: string;
  email: string;
  phone?: string;
}

export interface Question {
  id: number;
  text: string;
  type: 'yes_no' | 'multiple_choice' | 'open';
  options?: { label: string; value: string | number }[];
}

export interface QuizState {
  answers: Record<number, any>; // question ID -> value
  contact: UserContact;
}

export interface ScoreResult {
  score: number;
  tier: 'critical' | 'building' | 'ready';
  title: string;
  color: string;
  insights: {
    strength?: string;
    gap?: string;
    focus?: string;
    items: string[];
  };
  nextSteps: {
    title: string;
    desc: string;
    action: string;
  }[];
}