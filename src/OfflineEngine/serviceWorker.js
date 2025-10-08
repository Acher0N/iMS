/**
 * Service Worker Manager
 * Handles service worker registration and management
 */

let registration = null;

/**
 * Register service worker
 * @param {Object} config - Service worker configuration
 * @returns {Promise<boolean>} - Registration success status
 */
export const registerServiceWorker = async (config = {}) => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker not supported");
  }

  try {
    const { scope = "/", updateViaCache = "imports" } = config;

    // In development, check if Vite PWA service worker is available
    if (import.meta.env.DEV) {
      // Check if there's already a service worker from Vite PWA
      const existingRegistration =
        await navigator.serviceWorker.getRegistration();
      if (existingRegistration) {
        console.log("✅ Using Vite PWA service worker in development");
        registration = existingRegistration;
        return true;
      } else {
        console.log("🔧 Development mode: No service worker available yet");
        return true;
      }
    }

    registration = await navigator.serviceWorker.register("/sw.js", {
      scope,
      updateViaCache,
    });

    console.log("✅ Service Worker registered successfully");

    // Handle updates
    registration.addEventListener("updatefound", handleUpdateFound);

    // Check for existing service worker
    if (navigator.serviceWorker.controller) {
      console.log("Service Worker is controlling the page");
    }

    return true;
  } catch (error) {
    console.error("❌ Service Worker registration failed:", error);
    throw error;
  }
};

/**
 * Unregister service worker
 * @returns {Promise<boolean>} - Unregistration success status
 */
export const unregisterServiceWorker = async () => {
  if (!registration) {
    return true;
  }

  try {
    const result = await registration.unregister();
    registration = null;
    console.log("✅ Service Worker unregistered");
    return result;
  } catch (error) {
    console.error("❌ Service Worker unregistration failed:", error);
    throw error;
  }
};

/**
 * Handle service worker updates
 */
const handleUpdateFound = () => {
  const newWorker = registration.installing;

  if (!newWorker) return;

  console.log("🔄 New service worker found, installing...");

  newWorker.addEventListener("statechange", () => {
    if (newWorker.state === "installed") {
      if (navigator.serviceWorker.controller) {
        // Update available
        console.log("🆕 New content available, please refresh");
        window.dispatchEvent(new CustomEvent("sw-update-available"));
      } else {
        // First install
        console.log("✅ Content cached for offline use");
        window.dispatchEvent(new CustomEvent("sw-content-cached"));
      }
    }
  });
};

/**
 * Get service worker registration
 * @returns {ServiceWorkerRegistration|null}
 */
export const getRegistration = () => registration;

/**
 * Check if service worker is registered
 * @returns {boolean}
 */
export const isRegistered = () => !!registration;

export default {
  registerServiceWorker,
  unregisterServiceWorker,
  getRegistration,
  isRegistered,
};
