// src/App.tsx
import { Box, Typography } from "@mui/material";
import TaskItem from "./components/TaskItem";

const TaskApp = () => {
  return (
    <Box>
      <Typography variant="h1">Welcome to the Task Manager</Typography>
      <TaskItem />
    </Box>
  );
};

export default TaskApp;
