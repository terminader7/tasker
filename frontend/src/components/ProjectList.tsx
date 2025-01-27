import { Box, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { Project } from "../types/project";
import { getProjects } from "../api/projectService";
import ProjectItem from "./ProjectItem";

interface ProjectListProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const ProjectList = ({ projects, setProjects }: ProjectListProps) => {
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
        projects.map((project: Project) => (
          <ListItem>
            <ProjectItem key={project.id} project={project} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <Typography>No projects available</Typography>
        </ListItem>
      )}
    </Box>
  );
};

export default ProjectList;
