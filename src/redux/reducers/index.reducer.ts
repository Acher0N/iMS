import { combineReducers } from "redux";
import dummyReducer from "./dummy.reducer";
import themeReducer from "./UI/Theme.Reducer";

// Combine reducers and explicitly define the RootState type
const rootReducer = combineReducers({
  dummy: dummyReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
