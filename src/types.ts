export type UserRole = 'admin' | 'manager' | 'member';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectStatus = 'active' | 'archived' | 'completed';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  xp: number;
  badges: string[];
  streak: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  members: string[];
  status: ProjectStatus;
  createdAt: any; // Firestore Timestamp
  updatedAt: any;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: any;
  labels: string[];
  sequence: number;
  createdAt: any;
  updatedAt: any;
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: any;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: string;
  content: string;
  timestamp: any;
}
