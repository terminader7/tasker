import { Box, styled, Typography } from "@mui/material";
import ProjectsOverview from "../components/ProjectsOverview";

const HomePageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  width: "100%",
  marginLeft: "20%",
  gap: "4rem",
}));

const HomePage = () => {
  return (
    <HomePageContainer>
      <Box>
        <Typography variant="h2">Today</Typography>
      </Box>
      <Box>
        <Typography variant="h2">Upcoming</Typography>
      </Box>
      <ProjectsOverview />
    </HomePageContainer>
  );
};

export default HomePage;
