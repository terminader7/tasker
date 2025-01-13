import { Box, Typography } from "@mui/material";
import RightArrowIcon from "@mui/icons-material/ArrowForwardIos";
import InlineContainer from "./InlineContainer";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import ProjectCreator from "../features/ProjectCreator";

const PrimaryNavigation = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        backgroundColor: "primary.main",
        height: "100vh",
        width: "15rem",
        paddingLeft: "1rem",
      }}
    >
      <Typography
        sx={{
          color: "primary.contrastText",
          fontSize: "1.5rem",
          fontWeight: 600,
          marginTop: "1rem",
        }}
      >
        Tasker
      </Typography>
      <InlineContainer
        onClick={() => setShowForm(!showForm)}
        sx={{
          "&:hover": {
            backgroundColor: "primary.light",
            cursor: "pointer",
            transition: "0.3s",
          },
        }}
      >
        <AddBoxIcon sx={{ fontSize: "1rem", color: "secondary.main" }} />
        <Typography sx={{ color: "secondary.main", fontWeight: 600 }}>
          Create Project
        </Typography>
      </InlineContainer>
      {showForm && <ProjectCreator />}
      <InlineContainer
        sx={{
          "&:hover": {
            backgroundColor: "primary.light",
            cursor: "pointer",
            transition: "0.3s",
          },
        }}
      >
        <RightArrowIcon sx={{ fontSize: "1rem" }} />
        <Typography>My Projects</Typography>
      </InlineContainer>
      <InlineContainer
        sx={{
          "&:hover": {
            backgroundColor: "primary.light",
            cursor: "pointer",
            transition: "0.3s",
          },
        }}
      >
        <RightArrowIcon sx={{ fontSize: "1rem" }} />
        <Typography>My Projects</Typography>
      </InlineContainer>
    </Box>
  );
};

export default PrimaryNavigation;
