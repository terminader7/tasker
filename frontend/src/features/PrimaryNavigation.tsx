import { Box, Typography, styled } from "@mui/material";
import InlineContainer from "../components/InlineContainer";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useContext, useState } from "react";
import ProjectCreator from "./ProjectCreator";
import { Project } from "../types/project";
import PinnedProjectList from "./PinnedProjectList";
import { projectContext } from "../contexts/projectContext";
import SearchBar from "./SearchBar";
import UpcomingItems from "./UpcomingItems";
import TodayItems from "./TodayItems";
import IconContainer from "../components/IconContainer";
import TaskerIcon from "@mui/icons-material/AssignmentRounded";
import ProjectIcon from "@mui/icons-material/AccountTreeRounded";
import ClosedProjectList from "./ClosedProjectList";

const PrimaryNavigationContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  left: 0,
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
  padding: theme.spacing(2),

  [theme.breakpoints.up("md")]: {
    width: "20%",
  },
  [theme.breakpoints.down("md")]: {
    width: "15%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "10%",
    padding: ".5rem",
  },
}));

const PrimaryNavigation = () => {
  const [showForm, setShowForm] = useState(false);
  const { setProjects } = useContext(projectContext);

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
    <PrimaryNavigationContainer>
      <InlineContainer
        sx={{
          width: "100%",
          marginTop: "1rem",
          borderRadius: ".5rem",
          ":hover": {
            cursor: "pointer",
            backgroundColor: "primary.light",
            color: "primary.main",
            transition: "0.3s",
          },
        }}
      >
        <IconContainer>
          <TaskerIcon
            fontSize="medium"
            sx={{
              color: "inherit",
            }}
          />
        </IconContainer>
        <Typography
          sx={{
            color: "inherit",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Tasker
        </Typography>
      </InlineContainer>
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
        <InlineContainer>
          <IconContainer>
            <ProjectIcon fontSize="small" />
          </IconContainer>
          <Typography
            variant="body1"
            sx={{
              cursor: "default",
            }}
          >
            My Projects
          </Typography>
        </InlineContainer>
        <PinnedProjectList />
        <ClosedProjectList />
      </Box>
    </PrimaryNavigationContainer>
  );
};

export default PrimaryNavigation;
