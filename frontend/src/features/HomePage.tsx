import {
  Box,
  IconButton,
  Grid2,
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
        padding: "2rem",
        width: "100%",
        marginLeft: "20%",
      }}
    >
      <InlineContainer gap=".5rem">
        <Typography variant="h6">My Projects</Typography>
        <Tooltip
          title={showAsList ? "Change to Grid View" : "Change to List View"}
          placement="top"
          arrow
        >
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
      <Grid2 container spacing={2} columns={16}>
        {projects.length > 0 ? (
          projects.map((project: Project) => {
            return showAsList ? (
              <Grid2 size={16} key={project.id}>
                <ProjectCard project={project} />
              </Grid2>
            ) : (
              <Grid2 size={{ xs: 16, sm: 8, md: 4 }}>
                <ProjectCard project={project} />
              </Grid2>
            );
          })
        ) : (
          <Typography>No Projects Available</Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default HomePage;
