import { Task } from "./task";

export interface Project {
  id: number;
  title: string;
  description?: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date | null;
  isPinned: boolean;
  isClosed: boolean;
}

export type NewProject = Omit<Project, "id">;
