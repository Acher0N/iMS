/**
 * Sync Middleware
 * Handles data synchronization between local storage and Firebase
 */

import { setSyncStatus, updateLastSync } from "../Features/App/app.reducer";

// Sync configuration
const SYNC_CONFIG = {
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  BATCH_SIZE: 10,
  SYNC_INTERVAL: 30000, // 30 seconds
};

// Actions that trigger sync
const SYNC_TRIGGER_ACTIONS = [
  "SAVE_INVOICE",
  "UPDATE_CUSTOMER",
  "CREATE_PRODUCT",
  "UPDATE_INVENTORY",
  "DELETE_RECORD",
];

// Sync status tracking
let syncInProgress = false;
let syncQueue = [];
let syncTimer = null;

/**
 * Sync Middleware
 * Manages data synchronization with Firebase
 */
export const syncMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Check if action should trigger sync
  const shouldSync = SYNC_TRIGGER_ACTIONS.some((type) =>
    action.type.includes(type)
  );

  if (shouldSync && navigator.onLine) {
    queueForSync(action, store);
  }

  return result;
};

/**
 * Queue action for synchronization
 */
const queueForSync = (action, store) => {
  const syncItem = {
    id: Date.now().toString(),
    action,
    timestamp: new Date().toISOString(),
    attempts: 0,
    priority: getSyncPriority(action.type),
  };

  syncQueue.push(syncItem);

  // Sort queue by priority (higher priority first)
  syncQueue.sort((a, b) => b.priority - a.priority);

  // Schedule sync if not already in progress
  if (!syncInProgress) {
    schedulSync(store);
  }
};

/**
 * Get sync priority for action type
 */
const getSyncPriority = (actionType) => {
  if (actionType.includes("DELETE")) return 10;
  if (actionType.includes("CREATE")) return 8;
  if (actionType.includes("UPDATE")) return 6;
  if (actionType.includes("SAVE")) return 4;
  return 2;
};

/**
 * Schedule sync operation
 */
const schedulSync = (store) => {
  if (syncTimer) {
    clearTimeout(syncTimer);
  }

  syncTimer = setTimeout(() => {
    processSyncQueue(store);
  }, 100); // Small delay to batch multiple actions
};

/**
 * Process sync queue
 */
const processSyncQueue = async (store) => {
  if (syncInProgress || syncQueue.length === 0 || !navigator.onLine) {
    return;
  }

  syncInProgress = true;
  store.dispatch(setSyncStatus(true));

  console.log(`Starting sync process with ${syncQueue.length} items`);

  try {
    // Process queue in batches
    const batches = chunkArray(syncQueue, SYNC_CONFIG.BATCH_SIZE);

    for (const batch of batches) {
      await processSyncBatch(batch, store);
    }

    // Clear successful items from queue
    syncQueue = syncQueue.filter(
      (item) => item.attempts >= SYNC_CONFIG.RETRY_ATTEMPTS
    );

    console.log("Sync process completed successfully");
    store.dispatch(updateLastSync());
  } catch (error) {
    console.error("Sync process failed:", error);

    // Increment attempt count for failed items
    syncQueue.forEach((item) => {
      item.attempts += 1;
      item.lastError = error.message;
      item.lastAttempt = new Date().toISOString();
    });

    // Schedule retry for failed items
    scheduleRetry(store);
  } finally {
    syncInProgress = false;
    store.dispatch(setSyncStatus(false));
  }
};

/**
 * Process a batch of sync items
 */
const processSyncBatch = async (batch, store) => {
  const promises = batch.map((item) => syncSingleItem(item, store));

  try {
    await Promise.allSettled(promises);
  } catch (error) {
    console.error("Batch sync failed:", error);
    throw error;
  }
};

/**
 * Sync single item
 */
const syncSingleItem = async (item, store) => {
  try {
    console.log(`Syncing action: ${item.action.type}`);

    // Here you would implement actual Firebase sync logic
    // For now, we'll simulate the sync process

    const syncResult = await simulateFirebaseSync(item.action);

    if (syncResult.success) {
      console.log(`Successfully synced: ${item.action.type}`);
      item.synced = true;
      item.syncedAt = new Date().toISOString();
    } else {
      throw new Error(syncResult.error || "Sync failed");
    }
  } catch (error) {
    console.error(`Failed to sync item ${item.id}:`, error);
    item.attempts += 1;
    item.lastError = error.message;
    item.lastAttempt = new Date().toISOString();

    if (item.attempts >= SYNC_CONFIG.RETRY_ATTEMPTS) {
      console.error(`Max retry attempts reached for item ${item.id}`);
      // You might want to store failed items for manual retry
      storFailedSync(item);
    }

    throw error;
  }
};

/**
 * Simulate Firebase sync (replace with actual implementation)
 */
const simulateFirebaseSync = async (action) => {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 100 + Math.random() * 200)
  );

  // Simulate occasional failure
  if (Math.random() < 0.1) {
    return { success: false, error: "Network timeout" };
  }

  return { success: true };
};

/**
 * Schedule retry for failed syncs
 */
const scheduleRetry = (store) => {
  const retryDelay = SYNC_CONFIG.RETRY_DELAY * Math.pow(2, 1); // Exponential backoff

  setTimeout(() => {
    if (navigator.onLine && syncQueue.length > 0) {
      console.log("Retrying sync for failed items");
      processSyncQueue(store);
    }
  }, retryDelay);
};

/**
 * Store failed sync for later processing
 */
const storFailedSync = (item) => {
  try {
    const failedSyncs = JSON.parse(
      localStorage.getItem("ims_failed_syncs") || "[]"
    );
    failedSyncs.push(item);
    localStorage.setItem("ims_failed_syncs", JSON.stringify(failedSyncs));
  } catch (error) {
    console.error("Failed to store failed sync:", error);
  }
};

/**
 * Utility function to chunk array into smaller arrays
 */
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Force sync all pending items
 */
export const forcSync = (store) => {
  if (navigator.onLine) {
    processSyncQueue(store);
  } else {
    console.warn("Cannot force sync while offline");
  }
};

/**
 * Get sync queue status
 */
export const getSyncStatus = () => ({
  inProgress: syncInProgress,
  queueLength: syncQueue.length,
  queue: syncQueue.map((item) => ({
    id: item.id,
    actionType: item.action.type,
    attempts: item.attempts,
    priority: item.priority,
    timestamp: item.timestamp,
  })),
});

/**
 * Clear sync queue
 */
export const clearSyncQueue = () => {
  syncQueue = [];
  if (syncTimer) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
};

/**
 * Initialize sync middleware
 */
export const initializSyncMiddleware = (store) => {
  // Set up periodic sync
  setInterval(() => {
    if (navigator.onLine && !syncInProgress && syncQueue.length > 0) {
      console.log("Periodic sync triggered");
      processSyncQueue(store);
    }
  }, SYNC_CONFIG.SYNC_INTERVAL);

  // Listen for online event
  window.addEventListener("online", () => {
    console.log("Network connection restored, processing sync queue");
    if (syncQueue.length > 0) {
      processSyncQueue(store);
    }
  });

  console.log("Sync middleware initialized");
};

export default syncMiddleware;
