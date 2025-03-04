import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getProjects } from "../api/projectService";
import { ProjectContext } from "../contexts/projectContext";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import GridIcon from "@mui/icons-material/GridOn";
import ProjectGrid from "./ProjectGrid";
import InlineContainer from "../components/InlineContainer";

const ProjectsOverview = () => {
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
        width: "100%",
      }}
    >
      {/* Header & View Toggle */}
      <InlineContainer gap=".5rem">
        <Typography variant="h6">My Projects</Typography>
        <Tooltip
          title={showAsList ? "Change to Grid View" : "Change to List View"}
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

      {/* Project Display */}
      <ProjectGrid projects={projects} showAsList={showAsList} />
    </Box>
  );
};

export default ProjectsOverview;
