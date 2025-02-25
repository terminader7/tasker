import { Box, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { Project } from "../types/project";
import { deleteProject, getProjects } from "../api/projectService";
import ProjectItem from "../components/ProjectItem";
import { useSnackbar } from "notistack";

interface ProjectListProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const PinnedProjectList = ({ projects, setProjects }: ProjectListProps) => {
  const { enqueueSnackbar } = useSnackbar();

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
  }, []);

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
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      {projects.length > 0 ? (
        projects.map(
          (project: Project) =>
            project.isPinned && (
              <ListItem key={project.id}>
                <ProjectItem
                  project={project}
                  onDelete={() => handleDelete(project.id)}
                />
              </ListItem>
            )
        )
      ) : (
        <ListItem>
          <Typography>No projects available</Typography>
        </ListItem>
      )}
    </Box>
  );
};

export default PinnedProjectList;
