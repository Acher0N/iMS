import React, { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../redux/reducers/Theme.reducer";
import { usePalette } from "./Palette";

const custom_font_size = 0.75;

const ThemeConfig = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode); // Get theme mode from Redux
  const dispatch = useDispatch();

  // Get palette based on the current mode
  const palette = usePalette(mode);

  // Create theme based on the selected palette
  const theme = useMemo(
    () =>
      createTheme({
        palette,
        typography: {
          fontSize: custom_font_size * 16,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none", // Disable uppercase for buttons
                borderRadius: 5, // Rounded buttons
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                padding: "16px", // Default padding for Paper component
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
              },
            },
          },
        },
      }),
    [palette]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      {/* <button onClick={() => dispatch(toggleMode())}>Toggle Theme</button> */}
    </ThemeProvider>
  );
};

export default ThemeConfig;
