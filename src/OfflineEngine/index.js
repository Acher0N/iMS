/**
 * Offline Engine
 * Main initialization and configuration interface for offline capabilities
 */

import {
  registerServiceWorker,
  unregisterServiceWorker,
} from "./serviceWorker";
import { initializeDatabase, closeDatabase } from "./database";
import { startSyncManager, stopSyncManager } from "./syncManager";
import { initializeCacheManager } from "./cacheManager";
import {
  setupOfflineEventListeners,
  removeOfflineEventListeners,
} from "./eventListeners";

// Default configuration
const DEFAULT_CONFIG = {
  // Service Worker settings
  serviceWorker: {
    enabled: true,
    scope: "/",
    updateViaCache: "imports",
  },

  // Database settings
  database: {
    name: "iMS_OfflineDB",
    version: 1,
    storeName: "offline_data",
    keyPath: "id",
  },

  // Sync settings
  sync: {
    enabled: true,
    interval: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 5000, // 5 seconds
    backgroundSync: true,
  },

  // Cache settings
  cache: {
    enabled: true,
    maxAge: 86400000, // 24 hours
    maxSize: 100 * 1024 * 1024, // 100MB
    strategy: "networkFirst", // 'cacheFirst' | 'networkFirst' | 'staleWhileRevalidate'
  },

  // Network settings
  network: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // Debug settings
  debug: {
    enabled: import.meta.env.DEV,
    logLevel: "info", // 'error' | 'warn' | 'info' | 'debug'
  },
};

// Offline Engine state
let isInitialized = false;
let currentConfig = null;
let offlineStatus = {
  enabled: false,
  serviceWorkerRegistered: false,
  databaseReady: false,
  syncManagerActive: false,
  cacheManagerActive: false,
  lastSync: null,
  networkStatus: navigator.onLine,
};

/**
 * Initialize Offline Engine
 * @param {Object} config - Configuration options
 * @returns {Promise<boolean>} - Success status
 */
export const initialize = async (config = {}) => {
  try {
    // Merge with default configuration
    currentConfig = { ...DEFAULT_CONFIG, ...config };

    if (currentConfig.debug.enabled) {
      console.group("🔧 Initializing Offline Engine");
      console.log("Configuration:", currentConfig);
    }

    // Check browser support
    if (!checkBrowserSupport()) {
      throw new Error("Browser does not support required offline features");
    }

    // Initialize components in sequence
    await initializeComponents();

    // Set up event listeners
    setupOfflineEventListeners(offlineStatus, currentConfig);

    // Update status
    isInitialized = true;
    offlineStatus.enabled = true;

    if (currentConfig.debug.enabled) {
      console.log("✅ Offline Engine initialized successfully");
      console.log("Status:", offlineStatus);
      console.groupEnd();
    }

    // Dispatch initialization event
    window.dispatchEvent(
      new CustomEvent("offlineEngineInitialized", {
        detail: { status: offlineStatus, config: currentConfig },
      })
    );

    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Offline Engine:", error);

    // Clean up partial initialization
    await cleanup();

    throw error;
  }
};

/**
 * Initialize all components
 */
const initializeComponents = async () => {
  // 1. Initialize database
  if (currentConfig.database) {
    await initializeDatabase(currentConfig.database);
    offlineStatus.databaseReady = true;
    log("Database initialized");
  }

  // 2. Initialize cache manager
  if (currentConfig.cache.enabled) {
    await initializeCacheManager(currentConfig.cache);
    offlineStatus.cacheManagerActive = true;
    log("Cache manager initialized");
  }

  // 3. Register service worker
  if (currentConfig.serviceWorker.enabled) {
    try {
      await registerServiceWorker(currentConfig.serviceWorker);
      offlineStatus.serviceWorkerRegistered = true;
      log("Service worker registered");
    } catch (error) {
      console.warn(
        "⚠️ Service Worker registration failed, continuing without it:",
        error.message
      );
      offlineStatus.serviceWorkerRegistered = false;
    }
  }

  // 4. Start sync manager
  if (currentConfig.sync.enabled) {
    await startSyncManager(currentConfig.sync);
    offlineStatus.syncManagerActive = true;
    log("Sync manager started");
  }
};

/**
 * Disable Offline Engine
 * @returns {Promise<boolean>} - Success status
 */
export const disable = async () => {
  try {
    if (currentConfig?.debug?.enabled) {
      console.group("🔧 Disabling Offline Engine");
    }

    await cleanup();

    // Update status
    isInitialized = false;
    offlineStatus.enabled = false;

    if (currentConfig?.debug?.enabled) {
      console.log("✅ Offline Engine disabled successfully");
      console.groupEnd();
    }

    // Dispatch disable event
    window.dispatchEvent(
      new CustomEvent("offlineEngineDisabled", {
        detail: { status: offlineStatus },
      })
    );

    return true;
  } catch (error) {
    console.error("❌ Failed to disable Offline Engine:", error);
    throw error;
  }
};

/**
 * Cleanup all components
 */
const cleanup = async () => {
  // Remove event listeners
  removeOfflineEventListeners();

  // Stop sync manager
  if (offlineStatus.syncManagerActive) {
    await stopSyncManager();
    offlineStatus.syncManagerActive = false;
  }

  // Unregister service worker
  if (offlineStatus.serviceWorkerRegistered) {
    await unregisterServiceWorker();
    offlineStatus.serviceWorkerRegistered = false;
  }

  // Close database
  if (offlineStatus.databaseReady) {
    await closeDatabase();
    offlineStatus.databaseReady = false;
  }

  // Clear cache manager
  offlineStatus.cacheManagerActive = false;

  log("Cleanup completed");
};

/**
 * Check browser support for offline features
 * @returns {boolean} - Support status
 */
const checkBrowserSupport = () => {
  const required = {
    serviceWorker: "serviceWorker" in navigator,
    indexedDB: "indexedDB" in window,
    localStorage: "localStorage" in window,
    fetch: "fetch" in window,
    promises: "Promise" in window,
  };

  const unsupported = Object.entries(required)
    .filter(([feature, supported]) => !supported)
    .map(([feature]) => feature);

  if (unsupported.length > 0) {
    console.warn("Unsupported features:", unsupported);
    return false;
  }

  return true;
};

/**
 * Get current offline engine status
 * @returns {Object} - Current status
 */
export const getStatus = () => ({
  ...offlineStatus,
  initialized: isInitialized,
  config: currentConfig,
});

/**
 * Check if offline engine is enabled
 * @returns {boolean} - Enabled status
 */
export const isEnabled = () => isInitialized && offlineStatus.enabled;

/**
 * Force synchronization
 * @returns {Promise<boolean>} - Sync success status
 */
export const forceSync = async () => {
  if (!isEnabled() || !offlineStatus.syncManagerActive) {
    throw new Error(
      "Offline engine not initialized or sync manager not active"
    );
  }

  try {
    // Import sync manager dynamically to avoid circular dependencies
    const { forcSync } = await import("./syncManager");
    const result = await forcSync();

    if (result) {
      offlineStatus.lastSync = new Date().toISOString();
    }

    return result;
  } catch (error) {
    console.error("Force sync failed:", error);
    throw error;
  }
};

/**
 * Clear all offline data
 * @returns {Promise<boolean>} - Success status
 */
export const clearOfflineData = async () => {
  if (!isEnabled()) {
    throw new Error("Offline engine not initialized");
  }

  try {
    // Clear database
    const { clearDatabase } = await import("./database");
    await clearDatabase();

    // Clear caches
    const { clearAllCaches } = await import("./cacheManager");
    await clearAllCaches();

    log("Offline data cleared");
    return true;
  } catch (error) {
    console.error("Failed to clear offline data:", error);
    throw error;
  }
};

/**
 * Update configuration
 * @param {Object} newConfig - New configuration
 * @returns {Promise<boolean>} - Success status
 */
export const updateConfig = async (newConfig) => {
  if (!isEnabled()) {
    throw new Error("Offline engine not initialized");
  }

  try {
    // Merge configurations
    const updatedConfig = { ...currentConfig, ...newConfig };

    // Reinitialize with new config
    await disable();
    await initialize(updatedConfig);

    log("Configuration updated");
    return true;
  } catch (error) {
    console.error("Failed to update configuration:", error);
    throw error;
  }
};

/**
 * Get offline statistics
 * @returns {Object} - Offline statistics
 */
export const getStatistics = async () => {
  if (!isEnabled()) {
    return null;
  }

  try {
    const { getDatabaseStats } = await import("./database");
    const { getCacheStats } = await import("./cacheManager");

    const [dbStats, cacheStats] = await Promise.all([
      getDatabaseStats(),
      getCacheStats(),
    ]);

    return {
      database: dbStats,
      cache: cacheStats,
      status: offlineStatus,
      uptime:
        Date.now() - new Date(offlineStatus.lastSync || Date.now()).getTime(),
    };
  } catch (error) {
    console.error("Failed to get statistics:", error);
    return null;
  }
};

/**
 * Logging utility
 * @param {string} message - Log message
 * @param {string} level - Log level
 */
const log = (message, level = "info") => {
  if (!currentConfig?.debug?.enabled) return;

  const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
  const currentLevel = logLevels[currentConfig.debug.logLevel] || 2;
  const messageLevel = logLevels[level] || 2;

  if (messageLevel <= currentLevel) {
    console[level](`[OfflineEngine] ${message}`);
  }
};

// Export main interface
export default {
  initialize,
  disable,
  isEnabled,
  getStatus,
  forceSync,
  clearOfflineData,
  updateConfig,
  getStatistics,
};

// Export individual components for advanced usage
export { default as ServiceWorker } from "./serviceWorker";
export { default as Database } from "./database";
export { default as SyncManager } from "./syncManager";
export { default as CacheManager } from "./cacheManager";
