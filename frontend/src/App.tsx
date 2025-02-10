// src/App.tsx
import { Box } from "@mui/material";
import TaskList from "./features/TaskList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ProjectNavigation from "./features/ProjectNavigation";
import { ProjectProvider } from "./contexts/projectContext";

const App = () => {
  const theme = useTheme();

  return (
    <Router>
      <ProjectProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          {/* CHANGE TO SIDE BAR  */}
          <ProjectNavigation />
          <Routes>
            <Route path={"/:projectId"} element={<TaskList />} />
          </Routes>
        </Box>
      </ProjectProvider>
    </Router>
  );
};

export default App;
