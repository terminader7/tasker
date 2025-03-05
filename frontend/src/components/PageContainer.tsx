import { Box, styled } from "@mui/material";

interface PageContainerProps {
  padding?: string;
  gap?: string;
  marginLeft?: string;
}

const PageContainer = styled(Box)<PageContainerProps>(
  ({ theme, padding, gap, marginLeft }) => ({
    display: "flex",
    flexDirection: "column",
    padding: padding || theme.spacing(4),
    width: "100%",
    marginLeft: marginLeft || "20%",
    gap: gap || "4rem",

    [theme.breakpoints.down("md")]: {
      marginLeft: "10%",
    },

    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      padding: theme.spacing(2),
    },
  })
);

export default PageContainer;
