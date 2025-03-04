import { useEffect, useState } from "react";
import { createTask } from "../api/taskService";
import { TaskStatus, NewTask, Task } from "../types/task";
import { useSnackbar } from "notistack";
import { Project } from "../types/project";
import TaskForm from "../components/TaskForm";
import TaskCreatorButton from "../components/TaskCreatorButton";
import { getProjects } from "../api/projectService";
import { Collapse } from "@mui/material";

const TaskCreator = ({
  onTaskCreated,
}: {
  onTaskCreated: (task: Task) => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchProjects();
  }, []);

  const [task, setTask] = useState<NewTask>({
    title: "",
    description: "",
    dueDate: null,
    status: TaskStatus.TODO,
    createdAt: new Date(),
    updatedAt: new Date(),
    project: null,
  });

  const handleCreateTask = async () => {
    try {
      const newTask = await createTask(task);
      onTaskCreated(newTask);
      setTask({
        title: "",
        description: "",
        dueDate: null,
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
        project: null,
      });
      setShowForm(false);
      enqueueSnackbar("Task created!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to create task", {
        variant: "error",
      });
      console.error("Error creating task", error);
    }
  };

  const isTaskValid = Boolean(task.title) && task.status !== null;

  return (
    <>
      <TaskCreatorButton showForm={showForm} setShowForm={setShowForm} />
      <Collapse in={showForm} timeout="auto" unmountOnExit>
        <TaskForm
          task={task}
          setTask={setTask}
          projects={projects}
          handleCreateTask={handleCreateTask}
          isTaskValid={isTaskValid}
        />
      </Collapse>
    </>
  );
};

export default TaskCreator;
