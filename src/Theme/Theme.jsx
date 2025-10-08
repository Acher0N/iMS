/**
 * Theme Provider Component
 * Provides Material-UI theme context to the application
 */

import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import {
  createCustomTheme,
  lightTheme,
  darkTheme,
  customLightTheme,
  customDarkTheme,
} from "./Theme.config";

/**
 * Theme Provider Component
 * Wraps the app with Material-UI theme context
 */
const ThemeProvider = ({ children }) => {
  // Get theme settings from Redux store
  const { mode, palette } = useSelector((state) => state.app.theme);

  // Select appropriate theme based on settings
  const getTheme = () => {
    switch (palette) {
      case "custom":
        return mode === "dark" ? customDarkTheme : customLightTheme;
      case "default":
      default:
        return mode === "dark" ? darkTheme : lightTheme;
    }
  };

  const theme = getTheme();

  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline provides consistent CSS reset and baseline styles */}
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
