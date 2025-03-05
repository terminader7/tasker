import { Box, Typography } from "@mui/material";
import ProjectsOverview from "../components/ProjectsOverview";
import PageContainer from "../components/PageContainer";

const HomePage = () => {
  return (
    <PageContainer>
      <Box>
        <Typography variant="h2">Today</Typography>
      </Box>
      <Box>
        <Typography variant="h2">Upcoming</Typography>
      </Box>
      <ProjectsOverview />
    </PageContainer>
  );
};

export default HomePage;
