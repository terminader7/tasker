import styled from "styled-components";
import Box from "@mui/material/Box";

const ListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "600px",
  padding: "16px",
  gap: "16px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  boxShadow: theme.shadows[3],
  overflowY: "auto",
  maxHeight: "70vh",
}));
