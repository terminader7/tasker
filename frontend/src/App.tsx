// src/App.tsx
import { Box, Typography } from "@mui/material";
import TaskList from "./components/TaskList";
import TaskCreator from "./components/TaskCreator";
import { useTheme } from "@mui/material/styles";

const TaskApp = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1">Welcome to the Task Manager</Typography>
      <TaskList />
      <TaskCreator />
    </Box>
  );
};

export default TaskApp;
