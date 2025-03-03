import {
  Box,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getProjects } from "../api/projectService";
import { Project } from "../types/project";
import { ProjectContext } from "../contexts/projectContext";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import GridIcon from "@mui/icons-material/GridOn";
import ProjectCard from "../components/ProjectCard";
import InlineContainer from "../components/InlineContainer";
import Grid2 from "@mui/material/Grid2";

const HomePage = () => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [showAsList, setShowAsList] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, [setProjects]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InlineContainer gap=".5rem">
        <Typography variant="h6">My Projects</Typography>
        <Tooltip title="Change List View" placement="top" arrow>
          <IconButton
            sx={{
              "&:hover": {
                color: "secondary.main",
                cursor: "pointer",
              },
              transition: ".2s",
            }}
            onClick={() => {
              setShowAsList(!showAsList);
            }}
          >
            {showAsList ? (
              <ListIcon fontSize="medium" />
            ) : (
              <GridIcon fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>
      </InlineContainer>
      <List>
        {projects.length > 0 ? (
          projects.map((project: Project) => {
            return showAsList ? (
              <ListItem key={project.id}>
                <ProjectCard project={project} />
              </ListItem>
            ) : (
              <Grid2 container spacing={2} key={project.id}>
                <Grid2 size={4}>
                  <ProjectCard project={project} />
                </Grid2>
              </Grid2>
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

export default HomePage;
