// src/App.tsx
import { Box, Typography } from "@mui/material";
import TaskList from "./features/TaskList";
import { useTheme } from "@mui/material/styles";
import PrimaryNavigation from "./components/PrimaryNavigation";

const TaskApp = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <PrimaryNavigation />
      <TaskList />
    </Box>
  );
};

export default TaskApp;
