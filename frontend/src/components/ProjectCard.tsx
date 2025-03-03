import { Box, Button, Typography } from "@mui/material";
import IconContainer from "./IconContainer";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import { Project } from "../types/project";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { ProjectContext } from "../contexts/projectContext";
import { deleteProject, updateProject } from "../api/projectService";
import PinIcon from "@mui/icons-material/PushPinRounded";

const ProjectCard = ({ project }: { project: Project }) => {
  const { projects, setProjects } = useContext(ProjectContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (
    id: Project["id"],
    updatedData: Partial<Project>
  ) => {
    try {
      const updatedProject = await updateProject(id, updatedData);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? { ...project, ...updatedProject } : project
        )
      );
      enqueueSnackbar("Project updated successfully", { variant: "success" });
    } catch (error) {
      console.error("Error updating Task", error);
      enqueueSnackbar("Failed to update task", { variant: "error" });
    }
  };

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
  return (
    <Box
      sx={{
        border: "1px solid black",
      }}
    >
      <Typography
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "primary.light",
          },
          transition: ".2s",
        }}
      >
        {project?.title}
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "error.main" }}
        onClick={() => handleDelete(project.id)}
      >
        <IconContainer>
          <DeleteIcon fontSize="small" />
        </IconContainer>
        Delete Project
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          handleUpdate(project.id, { isPinned: !project.isPinned })
        }
      >
        <IconContainer>
          <PinIcon fontSize="small" />
        </IconContainer>
        {project?.isPinned ? "Unpin Project" : "Pin Project"}
      </Button>
    </Box>
  );
};

export default ProjectCard;
