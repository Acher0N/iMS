import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./Theme.reducer";
import ProductsReducer from "./Products.reducer";
// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"], // Only persist the theme reducer
};

const rootReducer = combineReducers({
  theme: themeReducer,
  Products: ProductsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
