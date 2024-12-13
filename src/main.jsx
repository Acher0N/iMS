import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // If you're using redux-persist
import { createRoot } from "react-dom/client";
import store, { persistor } from "./redux/Store";
import ThemeConfig from "./theme/Theme.jsx";
import "./scss/index.scss";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Wrap your app with Provider and pass store */}
    <PersistGate loading={null} persistor={persistor}>
      {/* Optional, if using redux-persist */}
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </PersistGate>
  </Provider>
);
