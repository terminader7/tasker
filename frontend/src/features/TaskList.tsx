import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TaskItem from "../components/TaskItem";
import { deleteTask, getTasks, updateTask } from "../api/taskService";
import { useContext, useEffect, useState } from "react";
import { Task } from "../types/task";
import Typography from "@mui/material/Typography";
import TaskCreator from "./TaskCreator";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../contexts/projectContext";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, setProjectId } = useContext(ProjectContext);

  useEffect(() => {
    setProjectId(projectId);

    const fetchTasks = async () => {
      if (!projectId) return;

      try {
        const data = await getTasks(parseInt(projectId));
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleDelete = async (id: Task["id"]) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      enqueueSnackbar("Task deleted", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting task", error);
      enqueueSnackbar("Failed to delete task", {
        variant: "error",
      });
    }
  };

  const handleUpdate = async (id: Task["id"], updatedData: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(id, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
      enqueueSnackbar("Task updated successfully", { variant: "success" });
    } catch (error) {
      console.error("Error updating Task", error);
      enqueueSnackbar("Failed to update task", { variant: "error" });
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      console.log("Updated tasks after adding new task:", updatedTasks);
      return updatedTasks;
    });
  };

  const project = projects.find(
    (proj) => proj.id === parseInt(projectId || "")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TaskCreator onTaskCreated={handleTaskCreated} />
      {project?.title && <Typography variant="h4">{project.title}</Typography>}
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={task.id}
            >
              <ListItem>
                <TaskItem
                  task={task}
                  onDelete={() => handleDelete(task.id)}
                  handleUpdate={handleUpdate}
                />
              </ListItem>
            </Box>
          ))
        ) : (
          <ListItem>
            <Typography>No tasks available</Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default TaskList;
