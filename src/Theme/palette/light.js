/**
 * Light Mode Color Palette
 * Material-UI light theme color definitions
 */

export const lightPalette = {
  mode: "light",

  // Primary color scheme
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#ffffff",
  },

  // Secondary color scheme
  secondary: {
    main: "#dc004e",
    light: "#ff5983",
    dark: "#9a0036",
    contrastText: "#ffffff",
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
    main: "#ff9800",
    light: "#ffb74d",
    dark: "#f57c00",
    contrastText: "#000000",
  },

  // Info color scheme
  info: {
    main: "#2196f3",
    light: "#64b5f6",
    dark: "#1976d2",
    contrastText: "#ffffff",
  },

  // Success color scheme
  success: {
    main: "#4caf50",
    light: "#81c784",
    dark: "#388e3c",
    contrastText: "#ffffff",
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
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },

  // Divider colors
  divider: "rgba(0, 0, 0, 0.12)",

  // Background colors
  background: {
    default: "#fafafa",
    paper: "#ffffff",
  },

  // Action colors
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    selected: "rgba(0, 0, 0, 0.08)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    focus: "rgba(0, 0, 0, 0.12)",
  },

  // Custom colors for iMS
  custom: {
    // Invoice status colors
    invoice: {
      draft: "#9e9e9e",
      pending: "#ff9800",
      paid: "#4caf50",
      overdue: "#f44336",
      cancelled: "#795548",
    },

    // Payment status colors
    payment: {
      pending: "#ff9800",
      completed: "#4caf50",
      failed: "#f44336",
      refunded: "#9c27b0",
    },

    // Inventory status colors
    inventory: {
      inStock: "#4caf50",
      lowStock: "#ff9800",
      outOfStock: "#f44336",
      discontinued: "#795548",
    },

    // Chart colors
    chart: {
      primary: "#1976d2",
      secondary: "#dc004e",
      tertiary: "#ff9800",
      quaternary: "#4caf50",
      quinary: "#9c27b0",
      senary: "#00bcd4",
    },

    // Sidebar colors
    sidebar: {
      background: "#ffffff",
      text: "rgba(0, 0, 0, 0.87)",
      textSecondary: "rgba(0, 0, 0, 0.6)",
      active: "rgba(25, 118, 210, 0.08)",
      hover: "rgba(0, 0, 0, 0.04)",
      border: "rgba(0, 0, 0, 0.12)",
    },

    // Data grid colors
    dataGrid: {
      headerBackground: "#f5f5f5",
      headerText: "rgba(0, 0, 0, 0.87)",
      rowEven: "#ffffff",
      rowOdd: "#fafafa",
      selectedRow: "rgba(25, 118, 210, 0.08)",
      hoveredRow: "rgba(0, 0, 0, 0.04)",
      border: "rgba(0, 0, 0, 0.12)",
    },

    // KSA themed colors
    ksa: {
      green: "#006c35",
      white: "#ffffff",
      gold: "#ffd700",
    },
  },
};

export default lightPalette;
