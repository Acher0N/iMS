// reducers/index.reducer.ts
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./UI/Theme.Reducer"; // Import the themeReducer

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"], // Only persist the theme reducer
};

const rootReducer = combineReducers({
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
