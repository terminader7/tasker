// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Light mode, but this could easily be changed to 'dark' if preferred
    primary: {
      main: "#1E88E5", // Soft blue for primary actions
      contrastText: "#FFFFFF", // Ensures text is readable on primary color
    },
    secondary: {
      main: "#FF6F61", // Soft red accent for secondary actions
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F4F6F8", // Light gray background to keep it easy on the eyes
      paper: "#FFFFFF", // White background for cards and modals
    },
    text: {
      primary: "#2C3E50", // Dark slate color for primary text
      secondary: "#7F8C8D", // Gray for secondary or placeholder text
    },
    success: {
      main: "#4CAF50", // Green for success indicators
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFC107", // Yellow for warning indicators
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E53935", // Red for error messages
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#29B6F6", // Cyan for informational messages
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif", // Modern, clean fonts for headings and body text
    h1: {
      fontFamily: "'Roboto Slab', 'Arial', sans-serif", // Serif font for a polished, bold heading style
      fontSize: "2rem",
      fontWeight: 700,
      color: "#2C3E50",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#2C3E50",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#2C3E50",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#2C3E50",
    },
    body1: {
      fontSize: "1rem",
      fontFamily: "'Poppins', 'Arial', sans-serif",
      color: "#34495E", // Slightly muted dark color for main body text
    },
    body2: {
      fontSize: "0.875rem",
      color: "#7F8C8D", // Lighter for secondary text
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      textTransform: "capitalize", // Less all-caps to keep it friendly and readable
    },
    subtitle1: {
      fontSize: "1rem",
      color: "#2C3E50",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Slightly rounded corners for buttons, cards, and inputs
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px", // Larger padding for better UX
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#1E88E5", // Matches the primary color
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for a soft, modern look
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
