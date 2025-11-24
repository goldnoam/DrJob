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
