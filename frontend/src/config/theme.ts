import { createTheme } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00897B", // Deep teal for primary actions
      light: lighten("#00897B", 0.6), // Lighter teal for hover effects
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F57C00", // Deep indigo for contrast
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#ECEFF1", // Soft cool gray background
      paper: "#CFD8DC", // Slightly darker gray for contrast
    },
    text: {
      primary: "#263238", // Deep navy for strong readability
      secondary: "#546E7A", // Slate gray for secondary text
    },
    success: {
      main: "#43A047", // Muted green for success messages
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FB8C00", // Warm amber for warnings
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E53935", // Classic red for errors
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#039BE5", // Bright but not overpowering cyan for info
      contrastText: "#FFFFFF",
    },
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Merriweather', 'Arial', serif",
      fontSize: "2rem",
      fontWeight: 700,
      color: "#263238",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#263238",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#263238",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#263238",
    },
    body1: {
      fontSize: "1rem",
      fontFamily: "'Poppins', 'Arial', sans-serif",
      color: "#37474F",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#546E7A",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      textTransform: "capitalize",
    },
    subtitle1: {
      fontSize: "1rem",
      color: "#263238",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10, // Slightly more rounded for a softer feel
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#263238",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 16px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#00897B",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
