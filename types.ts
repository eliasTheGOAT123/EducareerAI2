export enum ToolType {
  DASHBOARD = 'DASHBOARD',
  STUDY_BUDDY = 'STUDY_BUDDY',
  QUIZ_MASTER = 'QUIZ_MASTER',
  RESUME_REVIEW = 'RESUME_REVIEW',
  MOCK_INTERVIEW = 'MOCK_INTERVIEW',
}

export type Language = 'en' | 'ar';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}