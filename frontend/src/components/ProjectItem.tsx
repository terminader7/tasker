import { Typography } from "@mui/material";
import { Project } from "../types/project";
import { useNavigate } from "react-router-dom";
import InlineContainer from "./InlineContainer";
import IconContainer from "./IconContainer";

const ProjectItem = ({
  project,
  icon,
}: {
  project: Project;
  icon: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${project.id}`);
  };

  return (
    <InlineContainer
      sx={{
        borderRadius: "0.5rem",
        cursor: "pointer",
        width: "100%",
        "&:hover": {
          backgroundColor: "primary.light",
          color: "primary.main",
        },
        transition: "0.2s",
      }}
      onClick={handleClick}
    >
      <IconContainer>{icon}</IconContainer>
      <Typography
        variant="body1"
        color="inherit"
        sx={{
          borderBottom: "1px solid",
          width: "100%",
        }}
      >
        {project.title}
      </Typography>
    </InlineContainer>
  );
};

export default ProjectItem;
