import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TaskItem from "./TaskItem";
import { deleteTask, getTasks } from "../api/taskService";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import Typography from "@mui/material/Typography";
import TaskCreator from "./TaskCreator";
import { Box } from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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
    } catch (error) {
      console.error("Error deleting task", error);
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
        alignItems: "center",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ListItem
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
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
