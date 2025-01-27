import { Box, Typography } from "@mui/material";
import { Project } from "../types/project";

const ProjectItem = ({ project }: { project: Project }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "primary.light",
        borderRadius: "0.5rem",
      }}
    >
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        {project.title}
      </Typography>
      {project.description && <Typography>{project.description}</Typography>}
    </Box>
  );
};

export default ProjectItem;
