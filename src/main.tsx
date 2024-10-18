import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import the Provider
import { PersistGate } from "redux-persist/integration/react"; // If you're using redux-persist
import store, { persistor } from "./redux/Store";
import App from "./App.tsx";
import "./scss/index.scss";
import ThemeConfig from "./theme/Theme.tsx";
import Signature from "./assets/Signature.ts";
Signature({ type: "1" });

createRoot(document.getElementById("root")!).render(
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
