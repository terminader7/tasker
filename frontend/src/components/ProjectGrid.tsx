import { Typography, Grid2 } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { Project } from "../types/project";

interface ProjectGridProps {
  projects: Project[];
  showAsList: boolean;
}

const ProjectGrid = ({ projects, showAsList }: ProjectGridProps) => {
  if (projects.length === 0)
    return <Typography>No Projects Available</Typography>;

  return (
    <Grid2 container spacing={2} columns={16}>
      {projects.map((project) => (
        <Grid2
          key={project.id}
          size={showAsList ? 16 : { xs: 16, sm: 8, md: 4 }}
          sx={{
            width: "50%",
          }}
        >
          <ProjectCard project={project} showAsList={showAsList} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ProjectGrid;
