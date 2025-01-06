import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TaskItem from "./TaskItem";
import { deleteTask, getTasks } from "../api/taskService";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import Typography from "@mui/material/Typography";
import TaskCreator from "./TaskCreator";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <List
        sx={{
          backgroundColor: "green",
        }}
      >
        <ListItem
          sx={{
            display: "flex",
            width: "100%",
            gap: "5rem",
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task: Task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={() => handleDelete(task.id)}
              />
            ))
          ) : (
            <ListItem>
              <Typography>No tasks available</Typography>
            </ListItem>
          )}
        </ListItem>
      </List>
      <TaskCreator onTaskCreated={handleTaskCreated} />
    </Box>
  );
};

export default TaskList;
