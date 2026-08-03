export interface ResourceItem {
  name: string;
  description: string;
  url: string;
  category?: string;
  icon?: string;
  recommended?: boolean;
}

export interface DirectJob {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  experienceLevel: string;
  description: string;
  salary?: string;
  contactEmail: string;
  createdAt: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter: string;
  submittedAt: number;
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
  answer: string;
  topic?: string;
}

export interface TechnicalRole {
  id: string;
  name: string;
  description?: string;
  categories: {
    title: string;
    questions: TechnicalQuestion[];
  }[];
}