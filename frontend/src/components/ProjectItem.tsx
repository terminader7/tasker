import { Box, Button, Typography } from "@mui/material";
import { Project } from "../types/project";
import { useNavigate } from "react-router-dom";

const ProjectItem = ({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: () => void;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${project.id}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "primary.light",
        borderRadius: "0.5rem",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
        transition: "0.3",
      }}
      onClick={handleClick}
    >
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        {project.title}
      </Typography>
      {project.description && <Typography>{project.description}</Typography>}

      <Button variant="contained" color="primary" onClick={onDelete}>
        Delete Project
      </Button>
    </Box>
  );
};

export default ProjectItem;
