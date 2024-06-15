export interface Question {
    id: string;
    text: string;
    type: 'single-choice' | 'multiple-choice' | 'short-answer' | 'long-answer';
    options?: string[];
  }
  
  export interface Test {
    id: string;
    title: string;
    questions: Question[];
    timeLimit?: number;
  }
  