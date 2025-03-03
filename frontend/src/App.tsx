// src/App.tsx
import { Box } from "@mui/material";
import TaskList from "./features/TaskList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import PrimaryNavigation from "./features/PrimaryNavigation";
import { ProjectProvider } from "./contexts/projectContext";
import HomePage from "./features/HomePage";

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
          <PrimaryNavigation />
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/:projectId"} element={<TaskList />} />
          </Routes>
        </Box>
      </ProjectProvider>
    </Router>
  );
};

export default App;
