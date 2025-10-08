/**
 * Main Application Component
 * Root component that sets up routing, providers, and global app structure
 */

import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/Store/store";

// Theme Provider
import ThemeProvider from "./Theme/Theme.jsx";

// Components and Pages
import SignIn from "./Pages/Login/Signin.jsx";
import SignUp from "./Pages/Login/Signup.jsx";
import OfflinePage from "./Pages/Offline/OfflinePage.jsx";

// PWA Router utilities
import { usePWARouter, PWARoutePreloader } from "./Utils/pwaRouter.js";

// Constants
import { AUTH_ROUTES, APP_ROUTES } from "./constants/routes";

// Loading component
const LoadingScreen = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.2rem",
      color: "#666",
    }}
  >
    Loading iMS...
  </div>
);

// Temporary Dashboard component (will be replaced with actual dashboard)
const Dashboard = () => (
  <div
    style={{
      padding: "2rem",
      textAlign: "center",
    }}
  >
    <h1>Welcome to iMS Dashboard</h1>
    <p>Invoice Management System is loading...</p>
    <p>
      This is a placeholder - the actual dashboard will be implemented next.
    </p>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // For now, just render children - auth protection will be added later
  return children;
};

function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Network status listeners for PWA offline capabilities
    const handleOnline = () => {
      setIsOffline(false);
      console.log("🌐 Network connection restored");
    };

    const handleOffline = () => {
      setIsOffline(true);
      console.log("📴 Network connection lost - App running in offline mode");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initialize Offline Engine when app loads
    const initializeOfflineEngine = async () => {
      try {
        // Dynamic import to avoid loading offline engine in main bundle
        const { default: OfflineEngine } = await import("./OfflineEngine");

        // Always initialize offline engine for PWA capabilities
        await OfflineEngine.initialize({
          debug: { enabled: import.meta.env.DEV },
          offlineMode: isOffline,
        });
        console.log("✅ Offline Engine initialized");
        setIsAppReady(true);
      } catch (error) {
        console.warn("⚠️ Failed to initialize Offline Engine:", error.message);
        // App should continue working even if offline engine fails
        setIsAppReady(true);
      }
    };

    initializeOfflineEngine();

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Show loading screen while app initializes
  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeProvider>
          {/* Offline Status Indicator */}
          {isOffline && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                background: "#ff9800",
                color: "white",
                padding: "8px",
                textAlign: "center",
                zIndex: 9999,
                fontSize: "14px",
              }}
            >
              📴 You're offline - App running in offline mode
            </div>
          )}

          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path={AUTH_ROUTES.LOGIN} element={<SignIn />} />
              <Route path={AUTH_ROUTES.SIGNIN} element={<SignIn />} />
              <Route path={AUTH_ROUTES.SIGNUP} element={<SignUp />} />

              {/* Protected Routes */}
              <Route
                path={APP_ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Dashboard isOffline={isOffline} />
                  </ProtectedRoute>
                }
              />

              {/* Offline fallback route */}
              <Route path="/offline" element={<OfflinePage />} />

              {/* Default redirect */}
              <Route
                path="/"
                element={<Navigate to={AUTH_ROUTES.SIGNIN} replace />}
              />

              {/* Catch all route - PWA aware fallback */}
              <Route
                path="*"
                element={
                  isOffline ? (
                    <OfflinePage />
                  ) : (
                    <Navigate to={AUTH_ROUTES.SIGNIN} replace />
                  )
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
