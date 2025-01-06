// src/App.tsx
import { Box, Typography } from "@mui/material";
import TaskList from "./features/TaskList";
import { useTheme } from "@mui/material/styles";

const TaskApp = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" textAlign="center">
        Welcome to the Task Manager
      </Typography>
      <TaskList />
    </Box>
  );
};

export default TaskApp;
