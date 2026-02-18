export interface ResourceItem {
  name: string;
  description: string;
  url: string;
  category?: string;
  icon?: string;
  recommended?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface AdviceItem {
  id: string;
  title: string;
  icon: string;
  content: string[];
  color: string;
}

export interface TechnicalQuestion {
  question: string;
  topic?: string;
}

export interface TechnicalRole {
  id: string;
  name: string;
  categories: {
    title: string;
    questions: TechnicalQuestion[];
  }[];
}