/**
 * Sync Manager
 * Handles data synchronization between local database and Firebase
 */

import { getDatabase } from "./database";

let syncTimer = null;
let isSyncActive = false;

/**
 * Start sync manager
 * @param {Object} config - Sync configuration
 * @returns {Promise<boolean>} - Success status
 */
export const startSyncManager = async (config = {}) => {
  try {
    const { interval = 30000, enabled = true } = config;

    if (!enabled) {
      console.log("Sync manager disabled by configuration");
      return false;
    }

    // Start periodic sync
    syncTimer = setInterval(() => {
      if (navigator.onLine && !isSyncActive) {
        performSync();
      }
    }, interval);

    console.log("✅ Sync manager started");
    return true;
  } catch (error) {
    console.error("❌ Failed to start sync manager:", error);
    throw error;
  }
};

/**
 * Stop sync manager
 * @returns {Promise<boolean>} - Success status
 */
export const stopSyncManager = async () => {
  try {
    if (syncTimer) {
      clearInterval(syncTimer);
      syncTimer = null;
    }

    isSyncActive = false;
    console.log("✅ Sync manager stopped");
    return true;
  } catch (error) {
    console.error("❌ Failed to stop sync manager:", error);
    throw error;
  }
};

/**
 * Force synchronization
 * @returns {Promise<boolean>} - Success status
 */
export const forcSync = async () => {
  if (!navigator.onLine) {
    throw new Error("Cannot sync while offline");
  }

  return await performSync();
};

/**
 * Perform synchronization
 * @returns {Promise<boolean>} - Success status
 */
const performSync = async () => {
  if (isSyncActive) {
    console.log("Sync already in progress, skipping");
    return false;
  }

  isSyncActive = true;

  try {
    console.log("🔄 Starting sync process");

    const db = getDatabase();
    if (!db) {
      throw new Error("Database not initialized");
    }

    // Get pending sync items
    const syncQueue = await db.syncQueue.orderBy("timestamp").toArray();

    if (syncQueue.length === 0) {
      console.log("No items to sync");
      return true;
    }

    console.log(`Syncing ${syncQueue.length} items`);

    // Process sync queue
    let syncedCount = 0;
    let failedCount = 0;

    for (const item of syncQueue) {
      try {
        await syncItem(item);
        await db.syncQueue.delete(item.id);
        syncedCount++;
      } catch (error) {
        console.error(`Failed to sync item ${item.id}:`, error);

        // Update failed item
        await db.syncQueue.update(item.id, {
          attempts: (item.attempts || 0) + 1,
          lastAttempt: new Date().toISOString(),
          error: error.message,
        });

        failedCount++;

        // Remove items that have failed too many times
        if (item.attempts >= 3) {
          console.error(`Removing item ${item.id} after 3 failed attempts`);
          await db.syncQueue.delete(item.id);
        }
      }
    }

    console.log(
      `✅ Sync completed: ${syncedCount} synced, ${failedCount} failed`
    );

    // Dispatch sync completion event
    window.dispatchEvent(
      new CustomEvent("sync-completed", {
        detail: { syncedCount, failedCount },
      })
    );

    return true;
  } catch (error) {
    console.error("❌ Sync process failed:", error);
    return false;
  } finally {
    isSyncActive = false;
  }
};

/**
 * Sync individual item
 * @param {Object} item - Sync queue item
 * @returns {Promise<void>}
 */
const syncItem = async (item) => {
  // Simulate sync operation for now
  // In a real implementation, this would send data to Firebase

  console.log(`Syncing ${item.operation} on ${item.table}:`, item.data);

  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 100 + Math.random() * 200)
  );

  // Simulate occasional failure
  if (Math.random() < 0.1) {
    throw new Error("Network timeout");
  }

  // Here you would implement actual Firebase operations:
  // - For CREATE: add document to Firestore/Realtime DB
  // - For UPDATE: update document in Firebase
  // - For DELETE: delete document from Firebase

  console.log(`✅ Synced ${item.table} ${item.operation}`);
};

/**
 * Check if sync is active
 * @returns {boolean}
 */
export const isSyncInProgress = () => isSyncActive;

/**
 * Get sync status
 * @returns {Object} - Sync status information
 */
export const getSyncStatus = () => ({
  active: isSyncActive,
  timerActive: !!syncTimer,
  online: navigator.onLine,
});

export default {
  startSyncManager,
  stopSyncManager,
  forcSync,
  isSyncInProgress,
  getSyncStatus,
};
