import React, { useMemo } from "react";
import { Bounce, Slide, Zoom } from "react-toastify";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { usePalette } from "./Palette";
import { ToastContainer } from "react-toastify";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const custom_font_size = 0.75;

const ThemeConfig = ({ children }) => {
  const { mode, direction } = useSelector((state) => state.theme); // Get theme mode and direction from Redux

  // Create RTL cache
  const cacheRtl = createCache({
    key: direction === "rtl" ? "muirtl" : "mui",
    stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [prefixer],
  });

  function Rtl(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
  }

  // Get palette based on the current mode
  const palette = usePalette(mode);

  // Create theme based on the selected palette and direction
  const theme = useMemo(
    () =>
      createTheme({
        palette,
        typography: {
          fontSize: custom_font_size * 16,
        },
        direction, // Add direction to the theme
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
    [palette, direction] // Include direction in dependency array
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Rtl>{children}</Rtl>
      <ToastContainer
        position="top-center"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={direction === "rtl"} // Dynamically set ToastContainer RTL
        limit={5}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
        transition={Zoom}
      />
    </ThemeProvider>
  );
};

export default ThemeConfig;
