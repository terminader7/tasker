import { Icon, Typography } from "@mui/material";
import { Project } from "../types/project";
import { useNavigate } from "react-router-dom";
import PinnedIcon from "@mui/icons-material/PushPinRounded";
import InlineContainer from "./InlineContainer";

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
      <Icon>
        <PinnedIcon fontSize="small" />
      </Icon>
      <Typography
        variant="body1"
        fontWeight={500}
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
