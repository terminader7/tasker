import { Box, Typography } from "@mui/material";
import InlineContainer from "../components/InlineContainer";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useContext, useState } from "react";
import ProjectCreator from "./ProjectCreator";
import { Project } from "../types/project";
import PinnedProjectList from "./PinnedProjectList";
import { ProjectContext } from "../contexts/projectContext";
import SearchBar from "./SearchBar";
import UpcomingItems from "./UpcomingItems";
import TodayItems from "./TodayItems";

const PrimaryNavigation = () => {
  const [showForm, setShowForm] = useState(false);
  const { setProjects } = useContext(ProjectContext);

  const handleProjectCreated = (newProject: Project) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleOpen = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        backgroundColor: "background.paper",
        height: "100vh",
        width: "20%",
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          width: "100%",
          fontWeight: 600,
          marginTop: "1rem",
          borderRadius: ".5rem",
          ":hover": {
            cursor: "pointer",
            backgroundColor: "primary.light",
            transition: "0.3s",
          },
        }}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Tasker
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          marginTop: "1rem",
        }}
      >
        <InlineContainer
          onClick={handleOpen}
          sx={{
            borderRadius: ".5rem",
            "&:hover": {
              backgroundColor: "primary.light",
              cursor: "pointer",
              transition: "0.2s",
            },
          }}
        >
          <AddBoxIcon sx={{ fontSize: "1rem", color: "primary.main" }} />
          <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
            Create Project
          </Typography>
        </InlineContainer>
        {showForm && (
          <ProjectCreator
            open={showForm}
            onClose={handleClose}
            onProjectCreated={handleProjectCreated}
          />
        )}
        <SearchBar />
        <TodayItems />
        <UpcomingItems />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          marginTop: "3rem",
        }}
      >
        <Typography variant="body1">My Projects</Typography>
        <PinnedProjectList />
      </Box>
    </Box>
  );
};

export default PrimaryNavigation;
