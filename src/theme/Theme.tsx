import React, { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { toggleMode } from "../redux/reducers/UI/Theme.Reducer";
import { usePalette } from "./Palette";

const ThemeConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = useSelector((state: RootState) => state.theme.mode); // Get theme mode from Redux
  const dispatch = useDispatch<AppDispatch>();

  // Get palette based on the current mode
  const palette = usePalette(mode);

  // Create theme based on the selected palette
  const theme = useMemo(() => createTheme({ palette }), [palette]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <button onClick={() => dispatch(toggleMode())}>Toggle Theme</button>{" "}
      {/* Button to toggle theme */}
    </ThemeProvider>
  );
};

export default ThemeConfig;
