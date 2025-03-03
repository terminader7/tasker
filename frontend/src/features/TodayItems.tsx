import { Typography } from "@mui/material";
import InlineContainer from "../components/InlineContainer";
import IconContainer from "../components/IconContainer";
import TodayCalendarIcon from "@mui/icons-material/CalendarMonthRounded";

const TodayItems = () => {
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
    >
      <IconContainer>
        <TodayCalendarIcon fontSize="small" />
      </IconContainer>
      <Typography
        variant="body1"
        fontWeight={500}
        color="inherit"
        sx={{
          width: "100%",
        }}
      >
        Today
      </Typography>
    </InlineContainer>
  );
};

export default TodayItems;
