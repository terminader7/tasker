import { Box, Collapse, ListItem, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Project } from "../types/project";
import { deleteProject, getProjects } from "../api/projectService";
import ProjectItem from "../components/ProjectItem";
import { useSnackbar } from "notistack";
import { ProjectContext } from "../contexts/projectContext";
import InlineContainer from "../components/InlineContainer";
import ArrowIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import IconContainer from "../components/IconContainer";

const PinnedProjectList = () => {
  const { projects, setProjects } = useContext(ProjectContext);
  const { enqueueSnackbar } = useSnackbar();
  const [showPinned, setShowPinned] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchProjects();
  }, [setProjects]);

  const handleDelete = async (id: Project["id"]) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
      enqueueSnackbar("Project deleted", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting project", error);
      enqueueSnackbar("Failed to delete project", {
        variant: "error",
      });
    }
  };

  const pinnedProjects = projects.filter((project) => project.isPinned);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <InlineContainer
        sx={{
          borderRadius: "0.5rem",
          cursor: pinnedProjects.length > 0 ? "pointer" : "default",
          "&:hover": {
            backgroundColor: "primary.light",
            color: "primary.main",
          },
          transition: "0.2s",
        }}
        onClick={() => {
          if (pinnedProjects.length > 0) {
            setShowPinned(!showPinned);
          }
        }}
      >
        <IconContainer
          sx={{
            color: "inherit",
            transform:
              showPinned && pinnedProjects.length > 0
                ? "rotate(180deg)"
                : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <ArrowIcon fontSize="medium" />
        </IconContainer>
        <Typography color="inherit">Pinned Projects</Typography>
      </InlineContainer>
      <Collapse in={showPinned} timeout="auto" unmountOnExit>
        <Box>
          {projects.length > 0 &&
            pinnedProjects.map((project: Project) => (
              <ListItem key={project.id}>
                <ProjectItem
                  project={project}
                  onDelete={() => handleDelete(project.id)}
                />
              </ListItem>
            ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default PinnedProjectList;
