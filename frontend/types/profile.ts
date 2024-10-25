export type Tab = 'posts' | 'achievements';

export interface Achievement {
  rank: string;
  progress: number;
  required: number;
  description: string;
}

// Define and export the User interface
export interface User {
  id: string;
  name: string;
  bio: string;
}