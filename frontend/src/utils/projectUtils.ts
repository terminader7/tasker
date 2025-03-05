import { Project } from "../types/project";
import { Task, TaskStatus } from "../types/task";

export const getProjectTasksCompleted = (projects: Project[]) => {
  return projects.map((project) => {
    project.tasks.reduce((taskCompleteCount, task: Task) => {
      return task.status === TaskStatus.DONE
        ? taskCompleteCount + 1
        : taskCompleteCount;
    }, 0);
  });
};
