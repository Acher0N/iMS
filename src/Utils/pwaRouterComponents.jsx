/**
 * PWA Router Components
 * React components for PWA-optimized routing
 */

import React from "react";

/**
 * Offline fallback component factory
 * Creates offline-capable route components
 */
export const createOfflineFallback = (ComponentName) => {
  return ({ isOffline, ...props }) => {
    if (isOffline) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "#f5f5f5",
            borderRadius: "8px",
            margin: "1rem",
          }}
        >
          <h3>📴 {ComponentName} - Offline Mode</h3>
          <p>This page is running in offline mode with cached data.</p>
          <p>Connect to the internet to access the latest information.</p>
        </div>
      );
    }
    return null;
  };
};

export default {
  createOfflineFallback,
};
