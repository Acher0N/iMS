import React, { useMemo } from "react";
import { Bounce, Slide, Zoom } from "react-toastify";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { usePalette } from "./Palette";
import { ToastContainer } from "react-toastify";
// import { toggleMode } from "../redux/reducers/Theme.reducer";

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
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        limit={5}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="colored"
        theme={theme.palette.mode}
        transition={Zoom}
      />
    </ThemeProvider>
  );
};

export default ThemeConfig;
