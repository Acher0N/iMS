import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./reducers/index.reducer"; // Import persistedReducer
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in non-production environments
});

// Export RootState and AppDispatch types for use throughout the app
export type RootState = ReturnType<typeof store.getState>; // Use store.getState to get RootState
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
