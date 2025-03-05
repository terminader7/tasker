import { Box, Collapse, ListItem, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Project } from "../types/project";
import { getProjects } from "../api/projectService";
import ProjectItem from "../components/ProjectItem";
import { projectContext } from "../contexts/projectContext";
import InlineContainer from "../components/InlineContainer";
import ArrowIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import IconContainer from "../components/IconContainer";
import CloseIcon from "@mui/icons-material/Block";

const ClosedProjectList = () => {
  const { projects, setProjects } = useContext(projectContext);
  const [showClosed, setShowClosed] = useState(false);

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

  const closedProjects = projects.filter((project) => project.isClosed);

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
          cursor: closedProjects.length > 0 ? "pointer" : "default",
          "&:hover": {
            backgroundColor: "primary.light",
            color: "primary.main",
          },
          transition: "0.2s",
        }}
        onClick={() => {
          if (closedProjects.length > 0) {
            setShowClosed(!showClosed);
          }
        }}
      >
        <IconContainer
          sx={{
            color: "inherit",
            transform:
              showClosed && closedProjects.length > 0
                ? "rotate(180deg)"
                : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <ArrowIcon fontSize="medium" />
        </IconContainer>
        <Typography color="inherit">Closed Projects</Typography>
      </InlineContainer>
      <Collapse in={showClosed} timeout="auto" unmountOnExit>
        <Box>
          {projects.length > 0 &&
            closedProjects.map((project: Project) => (
              <ListItem key={project.id}>
                <ProjectItem
                  project={project}
                  icon={<CloseIcon fontSize="small" />}
                />
              </ListItem>
            ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ClosedProjectList;
