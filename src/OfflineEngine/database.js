/**
 * Database Manager
 * Handles IndexedDB operations for offline storage
 */

import Dexie from "dexie";

let db = null;

/**
 * Initialize database
 * @param {Object} config - Database configuration
 * @returns {Promise<boolean>} - Initialization success status
 */
export const initializeDatabase = async (config = {}) => {
  try {
    const { name = "iMS_OfflineDB", version = 1 } = config;

    // Create Dexie database instance
    db = new Dexie(name);

    // Define database schema
    db.version(version).stores({
      // Core business entities
      customers:
        "++id, name, email, phone, vatNumber, status, createdAt, updatedAt, syncStatus",
      suppliers:
        "++id, name, email, phone, vatNumber, status, createdAt, updatedAt, syncStatus",
      products:
        "++id, name, sku, barcode, price, cost, category, unit, status, createdAt, updatedAt, syncStatus",
      invoices:
        "++id, number, customerId, date, dueDate, status, total, tax, discount, createdAt, updatedAt, syncStatus",
      receipts:
        "++id, number, invoiceId, paymentMethod, amount, date, status, createdAt, updatedAt, syncStatus",
      purchases:
        "++id, number, supplierId, date, status, total, tax, createdAt, updatedAt, syncStatus",

      // Inventory and stock
      inventory: "++id, productId, quantity, location, lastUpdated, syncStatus",
      stockMovements:
        "++id, productId, type, quantity, reference, date, createdAt, syncStatus",

      // System tables
      settings: "++id, key, value, category, updatedAt",
      syncQueue:
        "++id, table, operation, data, timestamp, attempts, lastAttempt, error",
      auditLogs:
        "++id, table, recordId, action, oldData, newData, userId, timestamp",

      // Cache tables
      cache: "++id, key, data, expiresAt, createdAt",
      offlineQueue: "++id, action, data, timestamp, attempts, lastAttempt",
    });

    // Open database
    await db.open();

    console.log("✅ Database initialized successfully");

    // Set up hooks for automatic sync queue management
    setupDatabaseHooks();

    return true;
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
};

/**
 * Close database connection
 * @returns {Promise<void>}
 */
export const closeDatabase = async () => {
  if (db) {
    await db.close();
    db = null;
    console.log("✅ Database connection closed");
  }
};

/**
 * Get database instance
 * @returns {Dexie|null}
 */
export const getDatabase = () => db;

/**
 * Clear all database data
 * @returns {Promise<boolean>}
 */
export const clearDatabase = async () => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  try {
    // Get all table names
    const tableNames = db.tables.map((table) => table.name);

    // Clear all tables
    await Promise.all(tableNames.map((tableName) => db[tableName].clear()));

    console.log("✅ Database cleared successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to clear database:", error);
    throw error;
  }
};

/**
 * Get database statistics
 * @returns {Promise<Object>}
 */
export const getDatabaseStats = async () => {
  if (!db) {
    return null;
  }

  try {
    const stats = {};

    // Get count for each table
    for (const table of db.tables) {
      stats[table.name] = await table.count();
    }

    // Get database size estimation
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      stats.storageUsed = estimate.usage;
      stats.storageQuota = estimate.quota;
      stats.storageUsedPercent = (estimate.usage / estimate.quota) * 100;
    }

    return stats;
  } catch (error) {
    console.error("Failed to get database stats:", error);
    return null;
  }
};

/**
 * Add item to sync queue
 * @param {string} table - Table name
 * @param {string} operation - Operation type (CREATE, UPDATE, DELETE)
 * @param {Object} data - Data to sync
 * @returns {Promise<number>} - Queue item ID
 */
export const addToSyncQueue = async (table, operation, data) => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const queueItem = {
    table,
    operation,
    data,
    timestamp: new Date().toISOString(),
    attempts: 0,
    lastAttempt: null,
    error: null,
  };

  return await db.syncQueue.add(queueItem);
};

/**
 * Get sync queue items
 * @param {number} limit - Maximum number of items to return
 * @returns {Promise<Array>} - Queue items
 */
export const getSyncQueue = async (limit = 100) => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  return await db.syncQueue.orderBy("timestamp").limit(limit).toArray();
};

/**
 * Remove item from sync queue
 * @param {number} id - Queue item ID
 * @returns {Promise<void>}
 */
export const removeFromSyncQueue = async (id) => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  await db.syncQueue.delete(id);
};

/**
 * Update sync queue item
 * @param {number} id - Queue item ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<void>}
 */
export const updateSyncQueueItem = async (id, updates) => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  await db.syncQueue.update(id, {
    ...updates,
    lastAttempt: new Date().toISOString(),
  });
};

/**
 * Set up database hooks for automatic operations
 */
const setupDatabaseHooks = () => {
  // Hook for creating audit logs
  const auditableTables = [
    "customers",
    "suppliers",
    "products",
    "invoices",
    "receipts",
    "purchases",
  ];

  auditableTables.forEach((tableName) => {
    const table = db[tableName];

    // Hook for creates
    table.hook("creating", (primKey, obj, trans) => {
      obj.createdAt = new Date().toISOString();
      obj.updatedAt = new Date().toISOString();
      obj.syncStatus = "pending";
    });

    // Hook for updates
    table.hook("updating", (modifications, primKey, obj, trans) => {
      modifications.updatedAt = new Date().toISOString();
      if (!modifications.syncStatus) {
        modifications.syncStatus = "pending";
      }
    });

    // Hook for deletes
    table.hook("deleting", (primKey, obj, trans) => {
      // Add to sync queue for deletion
      addToSyncQueue(tableName, "DELETE", { id: primKey });
    });
  });
};

/**
 * Cache data with expiration
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in milliseconds
 * @returns {Promise<number>} - Cache item ID
 */
export const cacheData = async (key, data, ttl = 86400000) => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const expiresAt = new Date(Date.now() + ttl).toISOString();

  // Remove existing cache entry
  await db.cache.where("key").equals(key).delete();

  // Add new cache entry
  return await db.cache.add({
    key,
    data,
    expiresAt,
    createdAt: new Date().toISOString(),
  });
};

/**
 * Get cached data
 * @param {string} key - Cache key
 * @returns {Promise<any|null>} - Cached data or null if not found/expired
 */
export const getCachedData = async (key) => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const cacheItem = await db.cache.where("key").equals(key).first();

  if (!cacheItem) {
    return null;
  }

  // Check if expired
  if (new Date(cacheItem.expiresAt) < new Date()) {
    // Remove expired item
    await db.cache.delete(cacheItem.id);
    return null;
  }

  return cacheItem.data;
};

/**
 * Clear expired cache items
 * @returns {Promise<number>} - Number of items cleared
 */
export const clearExpiredCache = async () => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const now = new Date().toISOString();
  const expiredItems = await db.cache.where("expiresAt").below(now).toArray();

  if (expiredItems.length > 0) {
    await db.cache.where("expiresAt").below(now).delete();
    console.log(`🧹 Cleared ${expiredItems.length} expired cache items`);
  }

  return expiredItems.length;
};

export default {
  initializeDatabase,
  closeDatabase,
  getDatabase,
  clearDatabase,
  getDatabaseStats,
  addToSyncQueue,
  getSyncQueue,
  removeFromSyncQueue,
  updateSyncQueueItem,
  cacheData,
  getCachedData,
  clearExpiredCache,
};
