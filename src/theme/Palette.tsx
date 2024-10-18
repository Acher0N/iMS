import { PaletteMode } from "@mui/material";
// import { createTheme } from "@mui/material/styles";

// Light palette
const lightPalette = {
  mode: "light" as PaletteMode,
  primary: {
    main: "#1976d2",
  },
  secondary: {
    main: "#dc004e",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
};

// Dark palette
const darkPalette = {
  mode: "dark" as PaletteMode,
  primary: {
    main: "#90caf9",
  },
  secondary: {
    main: "#f48fb1",
  },
  background: {
    default: "#121212",
    paper: "#1d1d1d",
  },
};

// Hook or function to get palette based on mode
export const usePalette = (mode: PaletteMode) => {
  return mode === "light" ? lightPalette : darkPalette;
};
