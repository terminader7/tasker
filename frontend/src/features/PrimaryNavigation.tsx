import { Box, Typography } from "@mui/material";
import InlineContainer from "../components/InlineContainer";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useContext, useState } from "react";
import ProjectCreator from "./ProjectCreator";
import { Project } from "../types/project";
import PinnedProjectList from "./PinnedProjectList";
import { ProjectContext } from "../contexts/projectContext";

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
        backgroundColor: "primary.main",
        height: "100vh",
        width: "15rem",
        paddingLeft: "1rem",
      }}
    >
      <Typography
        sx={{
          color: "primary.contrastText",
          fontSize: "1.5rem",
          fontWeight: 600,
          marginTop: "1rem",
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
      <InlineContainer
        onClick={handleOpen}
        sx={{
          "&:hover": {
            backgroundColor: "primary.light",
            cursor: "pointer",
            transition: "0.3s",
          },
        }}
      >
        <AddBoxIcon sx={{ fontSize: "1rem", color: "secondary.main" }} />
        <Typography sx={{ color: "secondary.main", fontWeight: 600 }}>
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
      <PinnedProjectList />
    </Box>
  );
};

export default PrimaryNavigation;
