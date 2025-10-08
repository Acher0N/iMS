/**
 * Dark Mode Color Palette
 * Material-UI dark theme color definitions
 */

export const darkPalette = {
  mode: "dark",

  // Primary color scheme
  primary: {
    main: "#90caf9",
    light: "#e3f2fd",
    dark: "#42a5f5",
    contrastText: "#000000",
  },

  // Secondary color scheme
  secondary: {
    main: "#f48fb1",
    light: "#fce4ec",
    dark: "#e91e63",
    contrastText: "#000000",
  },

  // Error color scheme
  error: {
    main: "#f44336",
    light: "#e57373",
    dark: "#d32f2f",
    contrastText: "#ffffff",
  },

  // Warning color scheme
  warning: {
    main: "#ffa726",
    light: "#ffb74d",
    dark: "#f57c00",
    contrastText: "#000000",
  },

  // Info color scheme
  info: {
    main: "#29b6f6",
    light: "#4fc3f7",
    dark: "#0288d1",
    contrastText: "#000000",
  },

  // Success color scheme
  success: {
    main: "#66bb6a",
    light: "#81c784",
    dark: "#388e3c",
    contrastText: "#000000",
  },

  // Grey color scheme
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Text colors
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },

  // Divider colors
  divider: "rgba(255, 255, 255, 0.12)",

  // Background colors
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },

  // Action colors
  action: {
    active: "#ffffff",
    hover: "rgba(255, 255, 255, 0.08)",
    selected: "rgba(255, 255, 255, 0.16)",
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    focus: "rgba(255, 255, 255, 0.12)",
  },

  // Custom colors for iMS
  custom: {
    // Invoice status colors (darker variants)
    invoice: {
      draft: "#757575",
      pending: "#f57c00",
      paid: "#388e3c",
      overdue: "#d32f2f",
      cancelled: "#5d4037",
    },

    // Payment status colors (darker variants)
    payment: {
      pending: "#f57c00",
      completed: "#388e3c",
      failed: "#d32f2f",
      refunded: "#7b1fa2",
    },

    // Inventory status colors (darker variants)
    inventory: {
      inStock: "#388e3c",
      lowStock: "#f57c00",
      outOfStock: "#d32f2f",
      discontinued: "#5d4037",
    },

    // Chart colors (darker variants)
    chart: {
      primary: "#90caf9",
      secondary: "#f48fb1",
      tertiary: "#ffa726",
      quaternary: "#66bb6a",
      quinary: "#ba68c8",
      senary: "#26c6da",
    },

    // Sidebar colors
    sidebar: {
      background: "#1e1e1e",
      text: "#ffffff",
      textSecondary: "rgba(255, 255, 255, 0.7)",
      active: "rgba(144, 202, 249, 0.16)",
      hover: "rgba(255, 255, 255, 0.08)",
      border: "rgba(255, 255, 255, 0.12)",
    },

    // Data grid colors
    dataGrid: {
      headerBackground: "#2c2c2c",
      headerText: "#ffffff",
      rowEven: "#1e1e1e",
      rowOdd: "#252525",
      selectedRow: "rgba(144, 202, 249, 0.16)",
      hoveredRow: "rgba(255, 255, 255, 0.08)",
      border: "rgba(255, 255, 255, 0.12)",
    },

    // KSA themed colors (adjusted for dark mode)
    ksa: {
      green: "#4caf50",
      white: "#ffffff",
      gold: "#ffc107",
    },
  },
};

export default darkPalette;
