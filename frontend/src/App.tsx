// src/App.tsx
import { Box, Typography } from "@mui/material";
import TaskBox from "./components/TaskBox"; // Example of a component you may use

const TaskApp = () => {
  return (
    <Box>
      <Typography variant="h1">Welcome to the Task Manager</Typography>
      <TaskBox />
    </Box>
  );
};

export default TaskApp;
