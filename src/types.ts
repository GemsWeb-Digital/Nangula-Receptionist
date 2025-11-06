export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export interface MathChallengeData {
  sessionId: string;
  question: string;
}
