/**
 * Custom Color Palette
 * Custom brand-specific color definitions
 */

export const customPalette = {
  mode: "light", // Base mode for custom palette

  // Primary color scheme - Custom brand colors
  primary: {
    main: "#2E7D5E", // Custom green
    light: "#5EADA1",
    dark: "#1D5A42",
    contrastText: "#ffffff",
  },

  // Secondary color scheme - Accent color
  secondary: {
    main: "#FF6B35", // Custom orange
    light: "#FF8F65",
    dark: "#CC4A1E",
    contrastText: "#ffffff",
  },

  // Tertiary color scheme - Additional accent
  tertiary: {
    main: "#4A90A4", // Custom blue
    light: "#7BB3C7",
    dark: "#326B7D",
    contrastText: "#ffffff",
  },

  // Error color scheme
  error: {
    main: "#E74C3C", // Custom red
    light: "#F1948A",
    dark: "#B03A2E",
    contrastText: "#ffffff",
  },

  // Warning color scheme
  warning: {
    main: "#F39C12", // Custom yellow/orange
    light: "#F7DC6F",
    dark: "#D68910",
    contrastText: "#000000",
  },

  // Info color scheme
  info: {
    main: "#3498DB", // Custom blue
    light: "#85C1E9",
    dark: "#2874A6",
    contrastText: "#ffffff",
  },

  // Success color scheme
  success: {
    main: "#27AE60", // Custom green
    light: "#82E0AA",
    dark: "#1E8449",
    contrastText: "#ffffff",
  },

  // Grey color scheme - Custom neutral colors
  grey: {
    50: "#F8F9FA",
    100: "#F1F2F6",
    200: "#E9ECEF",
    300: "#DEE2E6",
    400: "#CED4DA",
    500: "#ADB5BD",
    600: "#6C757D",
    700: "#495057",
    800: "#343A40",
    900: "#212529",
  },

  // Text colors
  text: {
    primary: "#212529",
    secondary: "#6C757D",
    disabled: "#ADB5BD",
  },

  // Divider colors
  divider: "#DEE2E6",

  // Background colors
  background: {
    default: "#F8F9FA",
    paper: "#ffffff",
  },

  // Action colors
  action: {
    active: "#495057",
    hover: "rgba(52, 58, 64, 0.04)",
    selected: "rgba(52, 58, 64, 0.08)",
    disabled: "rgba(173, 181, 189, 0.6)",
    disabledBackground: "rgba(173, 181, 189, 0.12)",
    focus: "rgba(52, 58, 64, 0.12)",
  },

  // Custom business-specific colors
  custom: {
    // Invoice status colors - Custom brand approach
    invoice: {
      draft: "#95A5A6", // Neutral grey
      pending: "#F39C12", // Warning orange
      paid: "#27AE60", // Success green
      overdue: "#E74C3C", // Error red
      cancelled: "#7F8C8D", // Muted grey
      processing: "#3498DB", // Info blue
      refunded: "#9B59B6", // Purple
    },

    // Payment method colors
    payment: {
      cash: "#2ECC71",
      card: "#3498DB",
      bank: "#9B59B6",
      cheque: "#F39C12",
      credit: "#E67E22",
      pending: "#F39C12",
      completed: "#27AE60",
      failed: "#E74C3C",
      refunded: "#9B59B6",
    },

    // Inventory status colors
    inventory: {
      inStock: "#27AE60",
      lowStock: "#F39C12",
      outOfStock: "#E74C3C",
      discontinued: "#7F8C8D",
      onOrder: "#3498DB",
      reserved: "#9B59B6",
    },

    // Priority levels
    priority: {
      low: "#95A5A6",
      medium: "#F39C12",
      high: "#E67E22",
      critical: "#E74C3C",
    },

    // Chart colors - Custom brand palette
    chart: [
      "#2E7D5E", // Primary green
      "#FF6B35", // Secondary orange
      "#4A90A4", // Tertiary blue
      "#E74C3C", // Error red
      "#F39C12", // Warning orange
      "#27AE60", // Success green
      "#9B59B6", // Purple
      "#E67E22", // Carrot orange
      "#16A085", // Turquoise
      "#34495E", // Dark blue grey
    ],

    // Sidebar colors
    sidebar: {
      background: "#FFFFFF",
      backgroundDark: "#2C3E50",
      text: "#2C3E50",
      textDark: "#ECF0F1",
      textSecondary: "#7F8C8D",
      textSecondaryDark: "#BDC3C7",
      active: "rgba(46, 125, 94, 0.1)",
      activeDark: "rgba(52, 152, 219, 0.2)",
      hover: "rgba(46, 125, 94, 0.05)",
      hoverDark: "rgba(255, 255, 255, 0.1)",
      border: "#ECF0F1",
      borderDark: "#34495E",
    },

    // Data grid colors
    dataGrid: {
      headerBackground: "#F8F9FA",
      headerBackgroundDark: "#34495E",
      headerText: "#2C3E50",
      headerTextDark: "#ECF0F1",
      rowEven: "#FFFFFF",
      rowEvenDark: "#2C3E50",
      rowOdd: "#F8F9FA",
      rowOddDark: "#34495E",
      selectedRow: "rgba(46, 125, 94, 0.1)",
      selectedRowDark: "rgba(52, 152, 219, 0.2)",
      hoveredRow: "rgba(46, 125, 94, 0.05)",
      hoveredRowDark: "rgba(255, 255, 255, 0.1)",
      border: "#DEE2E6",
      borderDark: "#495057",
    },

    // KSA/Saudi themed colors
    ksa: {
      green: "#006C35", // Saudi flag green
      white: "#FFFFFF",
      gold: "#FFD700",
      desert: "#C19A6B",
      sand: "#F4E4BC",
    },

    // ZATCA specific colors
    zatca: {
      primary: "#006C35",
      secondary: "#FFD700",
      success: "#28A745",
      warning: "#FFC107",
      error: "#DC3545",
      info: "#17A2B8",
    },

    // Status indicators
    status: {
      online: "#28A745",
      offline: "#6C757D",
      syncing: "#17A2B8",
      error: "#DC3545",
      warning: "#FFC107",
    },

    // Notification colors
    notification: {
      info: "#17A2B8",
      success: "#28A745",
      warning: "#FFC107",
      error: "#DC3545",
    },
  },
};

// Dark mode variant of custom palette
export const customPaletteDark = {
  ...customPalette,
  mode: "dark",

  // Adjusted primary colors for dark mode
  primary: {
    main: "#5EADA1", // Lighter version of custom green
    light: "#8BC8C0",
    dark: "#2E7D5E",
    contrastText: "#000000",
  },

  // Adjusted secondary colors for dark mode
  secondary: {
    main: "#FF8F65", // Lighter version of custom orange
    light: "#FFB195",
    dark: "#FF6B35",
    contrastText: "#000000",
  },

  // Dark mode text colors
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },

  // Dark mode divider
  divider: "rgba(255, 255, 255, 0.12)",

  // Dark mode backgrounds
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },

  // Dark mode actions
  action: {
    active: "#FFFFFF",
    hover: "rgba(255, 255, 255, 0.08)",
    selected: "rgba(255, 255, 255, 0.16)",
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    focus: "rgba(255, 255, 255, 0.12)",
  },
};

export default customPalette;
