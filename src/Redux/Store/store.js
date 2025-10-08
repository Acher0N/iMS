/**
 * Redux Store Configuration
 * Main store setup with persistence and middleware
 */

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// Import reducers
import authReducer from "../Features/Auth/auth.reducer";
import appReducer from "../Features/App/app.reducer";
import cartReducer from "../Features/Cart/cart.reducer";
import navReducer from "../Features/Nav/nav.reducer";

// Import custom middlewares
import { offlineMiddleware } from "../Middlewares/offline.middleware";
import { syncMiddleware } from "../Middlewares/sync.middleware";
import { errorMiddleware } from "../Middlewares/error.middleware";

// Root reducer configuration
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  cart: cartReducer,
  nav: navReducer,
});

// Persistence configuration
const persistConfig = {
  key: "ims-root",
  version: 1,
  storage,
  whitelist: ["auth", "app"], // Only persist auth and app state
  blacklist: ["cart"], // Don't persist cart (handle separately)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: {
          // Add extra services here if needed
        },
      },
    }).concat([offlineMiddleware, syncMiddleware, errorMiddleware]),
  devTools:
    import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEV_TOOLS === "true",
});

// Create persistor
export const persistor = persistStore(store);

// Export types for TypeScript (if needed in future)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Hot module replacement for development
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept(
    [
      "../Features/Auth/auth.reducer.js",
      "../Features/App/app.reducer.js",
      "../Features/Cart/cart.reducer.js",
      "../Features/Nav/nav.reducer.js",
    ],
    () => {
      const newRootReducer = combineReducers({
        auth: authReducer,
        app: appReducer,
        cart: cartReducer,
        nav: navReducer,
      });
      store.replaceReducer(persistReducer(persistConfig, newRootReducer));
    }
  );
}

export default store;
