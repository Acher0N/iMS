/**
 * Material-UI Theme Configuration
 * Comprehensive theme setup for iMS application
 */

import { createTheme } from "@mui/material/styles";
import { lightPalette } from "./palette/light";
import { darkPalette } from "./palette/dark";
import { customPalette, customPaletteDark } from "./palette/custom";

// Typography configuration
const createTypography = (palette) => ({
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

  // Font sizes
  h1: {
    fontSize: "2.125rem",
    fontWeight: 300,
    lineHeight: 1.167,
    letterSpacing: "-0.01562em",
    color: palette.text.primary,
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: "-0.00833em",
    color: palette.text.primary,
  },
  h3: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.167,
    letterSpacing: "0em",
    color: palette.text.primary,
  },
  h4: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.235,
    letterSpacing: "0.00735em",
    color: palette.text.primary,
  },
  h5: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.334,
    letterSpacing: "0em",
    color: palette.text.primary,
  },
  h6: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
    color: palette.text.primary,
  },

  // Body text
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
    color: palette.text.primary,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
    color: palette.text.secondary,
  },

  // Specialized text
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.00938em",
    color: palette.text.primary,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: "0.00714em",
    color: palette.text.secondary,
  },

  // UI elements
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "none", // Remove uppercase transform
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    color: palette.text.secondary,
  },
  overline: {
    fontSize: "0.625rem",
    fontWeight: 600,
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    textTransform: "uppercase",
    color: palette.text.secondary,
  },
});

// Component overrides
const createComponents = (palette) => ({
  // AppBar customization
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
        backgroundColor: palette.background.paper,
        color: palette.text.primary,
      },
    },
  },

  // Paper customization
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        border: `1px solid ${palette.divider}`,
      },
      elevation1: {
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
      },
      elevation4: {
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
      },
    },
  },

  // Card customization
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
        border: `1px solid ${palette.divider}`,
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
        },
      },
    },
  },

  // Button customization
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
        fontWeight: 500,
        padding: "8px 16px",
      },
      containedPrimary: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
        },
      },
    },
  },

  // TextField customization
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      size: "small",
    },
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
        },
      },
    },
  },

  // DataGrid customization
  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: `1px solid ${palette.divider}`,
        borderRadius: 8,
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor:
            palette.mode === "dark"
              ? palette.custom?.dataGrid?.headerBackgroundDark || "#2c2c2c"
              : palette.custom?.dataGrid?.headerBackground || "#f5f5f5",
          borderBottom: `2px solid ${palette.divider}`,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${palette.divider}`,
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: palette.action.hover,
        },
      },
    },
  },

  // Drawer customization
  MuiDrawer: {
    styleOverrides: {
      paper: {
        border: "none",
        boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.12)",
      },
    },
  },

  // List customization
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        margin: "2px 8px",
        "&.Mui-selected": {
          backgroundColor: palette.action.selected,
          "&:hover": {
            backgroundColor: palette.action.selected,
          },
        },
      },
    },
  },

  // Chip customization
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },

  // Table customization
  MuiTableHead: {
    styleOverrides: {
      root: {
        "& .MuiTableCell-head": {
          backgroundColor:
            palette.mode === "dark"
              ? palette.custom?.dataGrid?.headerBackgroundDark || "#2c2c2c"
              : palette.custom?.dataGrid?.headerBackground || "#f5f5f5",
          fontWeight: 600,
          color: palette.text.primary,
        },
      },
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor: palette.action.hover,
        },
        "&.Mui-selected": {
          backgroundColor: palette.action.selected,
        },
      },
    },
  },

  // Dialog customization
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
      },
    },
  },

  // Tabs customization
  MuiTabs: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${palette.divider}`,
      },
      indicator: {
        height: 3,
        borderRadius: 1.5,
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        minHeight: 48,
      },
    },
  },
});

// Spacing configuration
const spacing = 8;

// Shape configuration
const shape = {
  borderRadius: 8,
};

// Shadow configuration
const shadows = [
  "none",
  "0px 1px 3px rgba(0, 0, 0, 0.12)",
  "0px 2px 4px rgba(0, 0, 0, 0.12)",
  "0px 3px 6px rgba(0, 0, 0, 0.12)",
  "0px 4px 8px rgba(0, 0, 0, 0.12)",
  "0px 6px 12px rgba(0, 0, 0, 0.12)",
  "0px 8px 16px rgba(0, 0, 0, 0.12)",
  "0px 12px 24px rgba(0, 0, 0, 0.12)",
  "0px 16px 32px rgba(0, 0, 0, 0.12)",
  "0px 24px 48px rgba(0, 0, 0, 0.12)",
  ...Array(15).fill("0px 24px 48px rgba(0, 0, 0, 0.12)"), // Fill remaining indices
];

// Create theme function
export const createCustomTheme = (mode = "light", paletteType = "default") => {
  // Select palette based on mode and type
  let palette;

  switch (paletteType) {
    case "custom":
      palette = mode === "dark" ? customPaletteDark : customPalette;
      break;
    case "default":
    default:
      palette = mode === "dark" ? darkPalette : lightPalette;
      break;
  }

  return createTheme({
    palette,
    typography: createTypography(palette),
    components: createComponents(palette),
    spacing,
    shape,
    shadows,

    // Custom theme additions
    mixins: {
      toolbar: {
        minHeight: 56,
        "@media (min-width:0px) and (orientation: landscape)": {
          minHeight: 48,
        },
        "@media (min-width:600px)": {
          minHeight: 64,
        },
      },
    },

    // Z-index configuration
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },

    // Transitions
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
  });
};

// Pre-configured themes
export const lightTheme = createCustomTheme("light", "default");
export const darkTheme = createCustomTheme("dark", "default");
export const customLightTheme = createCustomTheme("light", "custom");
export const customDarkTheme = createCustomTheme("dark", "custom");

// Default theme export
export default lightTheme;
