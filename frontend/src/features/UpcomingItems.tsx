import { Typography } from "@mui/material";
import InlineContainer from "../components/InlineContainer";
import UpcomingCalendarIcon from "@mui/icons-material/EventRounded";
import IconContainer from "../components/IconContainer";

const UpcomingItems = () => {
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
        <UpcomingCalendarIcon fontSize="small" />
      </IconContainer>
      <Typography
        variant="body1"
        fontWeight={500}
        color="inherit"
        sx={{
          width: "100%",
        }}
      >
        Upcoming
      </Typography>
    </InlineContainer>
  );
};

export default UpcomingItems;
