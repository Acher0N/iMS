/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/idbmsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDBMSState {
  collections: string[];
  selectedCollection: string | null;
  rows: any[];
  jsonInput: string;
}

const initialState: IDBMSState = {
  collections: [],
  selectedCollection: null,
  rows: [],
  jsonInput: "",
};

const idbmsSlice = createSlice({
  name: "idbms",
  initialState,
  reducers: {
    setJsonInput(state, action: PayloadAction<string>) {
      state.jsonInput = action.payload;
    },
    addCollection(state, action: PayloadAction<string>) {
      if (!state.collections.includes(action.payload)) {
        state.collections.push(action.payload);
      }
    },
    setSelectedCollection(state, action: PayloadAction<string | null>) {
      state.selectedCollection = action.payload;
    },
    setRows(state, action: PayloadAction<any[]>) {
      state.rows = action.payload;
    },
    clearJsonInput(state) {
      state.jsonInput = "";
    },
  },
});

export const { setJsonInput, addCollection, setSelectedCollection, setRows, clearJsonInput } = idbmsSlice.actions;

export default idbmsSlice.reducer;
