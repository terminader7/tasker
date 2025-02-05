// src/App.tsx
import { Box } from "@mui/material";
import TaskList from "./features/TaskList";
import { BrowserRouter as Router } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ProjectNavigation from "./features/ProjectNavigation";

const App = () => {
  const theme = useTheme();
  return (
    // <Router>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <ProjectNavigation />
      <TaskList />
    </Box>
    // </Router>
  );
};

export default App;
