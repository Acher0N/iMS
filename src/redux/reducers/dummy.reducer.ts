import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DummyState {
  message: string;
}

const initialState: DummyState = {
  message: "Hello, Redux!",
};

const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = dummySlice.actions;
export default dummySlice.reducer;
