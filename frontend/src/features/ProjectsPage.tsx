import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProjects, updateProject } from "../api/projectService";
import { Project } from "../types/project";
import { useSnackbar } from "notistack";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const { enqueueSnackbar } = useSnackbar();

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
              <ListItem key={project.id}>
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
                    onClick={() =>
                      handleUpdate(project.id, { isPinned: !project.isPinned })
                    }
                  >
                    {project?.isPinned ? "Unpin Project" : "Pin Project"}
                  </Button>
                </Box>
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
