import { Box, Typography } from "@mui/material";
import ProjectsOverview from "../components/ProjectsOverview";
import PageContainer from "../components/PageContainer";
import TodayCalendarIcon from "@mui/icons-material/CalendarMonthRounded";
import UpcomingCalendarIcon from "@mui/icons-material/EventRounded";
import InlineContainer from "../components/InlineContainer";
import IconContainer from "../components/IconContainer";

const HomePage = () => {
  return (
    <PageContainer>
      <Box>
        <InlineContainer>
          <IconContainer>
            <TodayCalendarIcon fontSize="medium" />
          </IconContainer>
          <Typography variant="h2">Today</Typography>
        </InlineContainer>
      </Box>
      <Box>
        <InlineContainer>
          <IconContainer>
            <UpcomingCalendarIcon fontSize="medium" />
          </IconContainer>
          <Typography variant="h2">Upcoming</Typography>
        </InlineContainer>
      </Box>
      <ProjectsOverview />
    </PageContainer>
  );
};

export default HomePage;
