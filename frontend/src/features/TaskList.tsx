import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TaskItem from "../components/TaskItem";
import { deleteTask, getTasks } from "../api/taskService";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import Typography from "@mui/material/Typography";
import TaskCreator from "./TaskCreator";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

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

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const filteredTasks = projectId
    ? tasks.filter((task) => task.project?.id === parseInt(projectId))
    : tasks;

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
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <ListItem>
              <TaskItem
                key={task.id}
                task={task}
                onDelete={() => handleDelete(task.id)}
              />
            </ListItem>
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
