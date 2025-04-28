export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface Mark {
  id: string;
  subject: string;
  testName: string;
  score: number;
  maxScore: number;
  date: string; // ISO string
}

export type AppPage = 'dashboard' | 'tasks' | 'calendar' | 'marks';