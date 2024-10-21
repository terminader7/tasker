// src/App.tsx
import { Box, Typography } from "@mui/material";
import TaskList from "./components/TaskList";

const TaskApp = () => {
  return (
    <Box>
      <Typography variant="h1">Welcome to the Task Manager</Typography>
      <TaskList />
    </Box>
  );
};

export default TaskApp;
