import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "light", // Default to light mode
    direction: "ltr",
  },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    toggleLang: (state) => {
      state.direction = state.direction === "ltr" ? "rtl" : "ltr";
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleMode, toggleLang, setMode } = themeSlice.actions;
export default themeSlice.reducer;
