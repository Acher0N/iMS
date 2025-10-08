/**
 * Application Entry Point
 * Main entry point for the iMS React application
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Import Vite PWA register function
import { registerSW } from "virtual:pwa-register";

// Initialize error tracking for production
if (import.meta.env.PROD) {
  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);
    // Here you would send to your error tracking service
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    // Here you would send to your error tracking service
  });
}

// Create root and render app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register PWA service worker
const updateSW = registerSW({
  onNeedRefresh() {
    console.log("🔄 PWA update available");
  },
  onOfflineReady() {
    console.log("✅ PWA ready to work offline");
  },
});
