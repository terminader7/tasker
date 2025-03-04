import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getProjects } from "../api/projectService";
import { projectContext } from "../contexts/projectContext";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import GridIcon from "@mui/icons-material/GridOn";
import ProjectGrid from "./ProjectGrid";
import InlineContainer from "../components/InlineContainer";

const ProjectsOverview = () => {
  const { projects, setProjects, filteredProjects, searchQuery } =
    useContext(projectContext);
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
        width: "100%",
      }}
    >
      <InlineContainer gap=".5rem">
        <Typography variant="h6">My Projects</Typography>
        <Tooltip
          title={showAsList ? "Go to Grid View" : "Go to List View"}
          placement="top"
          arrow
        >
          <IconButton
            sx={{
              "&:hover": { color: "secondary.main", cursor: "pointer" },
              transition: ".2s",
            }}
            onClick={() => setShowAsList(!showAsList)}
          >
            {showAsList ? (
              <ListIcon fontSize="medium" />
            ) : (
              <GridIcon fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>
      </InlineContainer>
      <ProjectGrid
        projects={searchQuery.length ? filteredProjects : projects}
        showAsList={showAsList}
      />
    </Box>
  );
};

export default ProjectsOverview;
