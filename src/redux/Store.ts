import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index.reducer"; // Import your combined reducers

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"], // Only persist specific reducers
};

// Create a persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);

// Export RootState and AppDispatch types for use throughout the app
export type RootState = ReturnType<typeof rootReducer>; // <-- Ensure this is exported
export type AppDispatch = typeof store.dispatch; // <-- Ensure this is exported

export default store;
