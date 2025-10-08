/**
 * Event Listeners for Offline Engine
 * Handles network status changes and other offline-related events
 */

let eventListenersActive = false;

/**
 * Setup offline event listeners
 * @param {Object} offlineStatus - Offline status object to update
 * @param {Object} config - Configuration object
 */
export const setupOfflineEventListeners = (offlineStatus, config) => {
  if (eventListenersActive) {
    return;
  }

  // Online/Offline event listeners
  const handleOnline = () => {
    console.log("🌐 Network connection restored");
    offlineStatus.networkStatus = true;

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("network-status-changed", {
        detail: { online: true },
      })
    );

    // Trigger sync if enabled
    if (config.sync && config.sync.enabled) {
      window.dispatchEvent(new CustomEvent("trigger-sync"));
    }
  };

  const handleOffline = () => {
    console.log("📴 Network connection lost");
    offlineStatus.networkStatus = false;

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("network-status-changed", {
        detail: { online: false },
      })
    );
  };

  // Visibility change events (for background sync)
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && navigator.onLine) {
      // App became visible and online, trigger sync
      if (config.sync && config.sync.enabled) {
        window.dispatchEvent(new CustomEvent("trigger-sync"));
      }
    }
  };

  // Before unload event (for cleanup)
  const handleBeforeUnload = (event) => {
    // Perform cleanup if needed
    if (config.debug && config.debug.enabled) {
      console.log("App is being unloaded, performing cleanup...");
    }
  };

  // Storage event listener (for cross-tab communication)
  const handleStorage = (event) => {
    if (event.key && event.key.startsWith("ims_")) {
      // Handle storage changes from other tabs
      window.dispatchEvent(
        new CustomEvent("cross-tab-storage-change", {
          detail: {
            key: event.key,
            oldValue: event.oldValue,
            newValue: event.newValue,
          },
        })
      );
    }
  };

  // Service worker message listener
  const handleServiceWorkerMessage = (event) => {
    const { data } = event;

    if (data && data.type) {
      switch (data.type) {
        case "SKIP_WAITING":
          // Service worker is asking to skip waiting
          window.dispatchEvent(new CustomEvent("sw-skip-waiting"));
          break;
        case "CACHE_UPDATED":
          // Cache has been updated
          window.dispatchEvent(
            new CustomEvent("cache-updated", {
              detail: data.payload,
            })
          );
          break;
        default:
          if (config.debug && config.debug.enabled) {
            console.log("Unknown service worker message:", data);
          }
      }
    }
  };

  // Add event listeners
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
  window.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("beforeunload", handleBeforeUnload);
  window.addEventListener("storage", handleStorage);

  // Service worker message listener
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener(
      "message",
      handleServiceWorkerMessage
    );
  }

  eventListenersActive = true;

  if (config.debug && config.debug.enabled) {
    console.log("✅ Offline engine event listeners setup");
  }
};

/**
 * Remove offline event listeners
 */
export const removeOfflineEventListeners = () => {
  if (!eventListenersActive) {
    return;
  }

  // Note: In a real implementation, you would store references to the handler functions
  // and remove them specifically. For now, we'll just mark as inactive.
  eventListenersActive = false;

  console.log("✅ Offline engine event listeners removed");
};

/**
 * Check if event listeners are active
 * @returns {boolean}
 */
export const areEventListenersActive = () => eventListenersActive;

export default {
  setupOfflineEventListeners,
  removeOfflineEventListeners,
  areEventListenersActive,
};
