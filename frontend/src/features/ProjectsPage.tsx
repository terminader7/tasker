import { Box, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProjects } from "../api/projectService";
import { Project } from "../types/project";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchTasks();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <List>
        {projects.length > 0 ? (
          projects.map((project: Project) => {
            return (
              <ListItem>
                <Typography key={project.id}>{project?.title}</Typography>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <Typography>No tasks available</Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ProjectsPage;
