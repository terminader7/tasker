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
        borderRadius: "0.5rem",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "primary.light",
        },
        transition: "0.2s",
      }}
      onClick={handleClick}
    >
      <Typography variant="body1" fontWeight={"bold"} color="common.white">
        {project.title}
      </Typography>
    </Box>
  );
};

export default ProjectItem;
