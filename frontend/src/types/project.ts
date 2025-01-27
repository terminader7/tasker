import { Task } from "./task";

export interface Project {
  id: number;
  title: string;
  description?: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export type NewProject = Omit<Project, "id" | "tasks">;
