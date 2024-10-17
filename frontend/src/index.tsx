// src/index.tsx
import { useState } from "react";
import ReactDOM from "react-dom/client";
import TaskApp from "./App";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import getThemeOptions from "./config/theme";

const Index = () => {
  const [primaryColor, setPrimaryColor] = useState("#1976d2");
  const [secondaryColor, setSecondaryColor] = useState("#dc004e");

  const theme = createTheme(getThemeOptions(primaryColor, secondaryColor));
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        disableWindowBlurListener
        anchorOrigin={{
          vertical: "top",
          horizontal: isMobile ? "center" : "right",
        }}
        style={{
          marginTop: isMobile ? "0" : "90px",
        }}
      >
        <TaskApp />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(<Index />);
