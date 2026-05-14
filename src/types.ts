export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  dateDisplay: string;
  priority: Priority;
  dueDate?: string;
  completedAt?: string;
};

export type NavView =
  | 'home'
  | 'tasks'
  | 'completed'
  | 'pending'
  | 'calendar'
  | 'notes'
  | 'focus'
  | 'statistics'
  | 'settings'
  | 'logout';

export type User = {
  id: string;
  name: string;
  email: string;
  title: string;
  avatar?: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

export type FocusSession = {
  id: string;
  startTime: string;
  duration: number; // in minutes
  type: 'work' | 'break';
};

export type Note = {
  id: string;
  text: string;
  color: 'pink' | 'lavender' | 'sky';
};

export type AppTheme = 'normal' | 'girlish' | 'gaming';
export type Language = 'english' | 'hindi' | 'hinglish';


