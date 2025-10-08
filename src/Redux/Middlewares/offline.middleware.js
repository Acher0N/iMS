/**
 * Offline Middleware
 * Handles offline state detection and queuing of actions
 */

import { setOnlineStatus } from "../Features/App/app.reducer";

// Action types that should be queued when offline
const QUEUEABLE_ACTION_TYPES = [
  "SAVE_INVOICE",
  "UPDATE_CUSTOMER",
  "CREATE_PRODUCT",
  "UPDATE_INVENTORY",
  "SYNC_DATA",
];

// Actions that should not be processed when offline
const ONLINE_ONLY_ACTIONS = ["EXPORT_TO_ZATCA", "SEND_EMAIL", "CLOUD_BACKUP"];

let offlineQueue = [];

/**
 * Offline Middleware
 * Manages offline/online state and queues actions when offline
 */
export const offlineMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const isOnline = navigator.onLine;

  // Update online status if it changed
  if (state.app.status.isOnline !== isOnline) {
    store.dispatch(setOnlineStatus(isOnline));
  }

  // Handle online-only actions
  if (
    !isOnline &&
    ONLINE_ONLY_ACTIONS.some((type) => action.type.includes(type))
  ) {
    console.warn(`Action ${action.type} requires internet connection`);
    return next({
      type: "SET_ERROR",
      payload: {
        message: "This action requires an internet connection",
        code: "OFFLINE_ERROR",
        action: action.type,
      },
    });
  }

  // Handle queueable actions when offline
  if (
    !isOnline &&
    QUEUEABLE_ACTION_TYPES.some((type) => action.type.includes(type))
  ) {
    console.log(`Queueing action for later: ${action.type}`);

    // Add to offline queue
    offlineQueue.push({
      action,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    });

    // Store in localStorage for persistence
    try {
      localStorage.setItem("ims_offline_queue", JSON.stringify(offlineQueue));
    } catch (error) {
      console.error("Failed to persist offline queue:", error);
    }

    // Return a pending action
    return next({
      type: action.type + "_QUEUED",
      payload: {
        originalAction: action,
        queuedAt: new Date().toISOString(),
      },
    });
  }

  // Process queue when coming back online
  if (isOnline && offlineQueue.length > 0) {
    console.log(`Processing ${offlineQueue.length} queued actions`);

    // Process each queued action
    const queue = [...offlineQueue];
    offlineQueue = [];

    queue.forEach(({ action, id }) => {
      try {
        console.log(`Processing queued action: ${action.type}`);
        store.dispatch({
          ...action,
          type: action.type + "_FROM_QUEUE",
          meta: { queueId: id },
        });
      } catch (error) {
        console.error(`Failed to process queued action ${action.type}:`, error);
      }
    });

    // Clear localStorage
    try {
      localStorage.removeItem("ims_offline_queue");
    } catch (error) {
      console.error("Failed to clear offline queue from storage:", error);
    }
  }

  return next(action);
};

/**
 * Initialize offline middleware
 * Load any existing queue from localStorage
 */
export const initializeOfflineMiddleware = () => {
  try {
    const savedQueue = localStorage.getItem("ims_offline_queue");
    if (savedQueue) {
      offlineQueue = JSON.parse(savedQueue);
      console.log(`Loaded ${offlineQueue.length} actions from offline queue`);
    }
  } catch (error) {
    console.error("Failed to load offline queue from storage:", error);
    offlineQueue = [];
  }
};

/**
 * Get current offline queue
 */
export const getOfflineQueue = () => [...offlineQueue];

/**
 * Clear offline queue
 */
export const clearOfflineQueue = () => {
  offlineQueue = [];
  try {
    localStorage.removeItem("ims_offline_queue");
  } catch (error) {
    console.error("Failed to clear offline queue from storage:", error);
  }
};

/**
 * Add action to queue manually
 */
export const addToOfflineQueue = (action) => {
  offlineQueue.push({
    action,
    timestamp: new Date().toISOString(),
    id: Date.now().toString(),
  });

  try {
    localStorage.setItem("ims_offline_queue", JSON.stringify(offlineQueue));
  } catch (error) {
    console.error("Failed to persist offline queue:", error);
  }
};

/**
 * Remove action from queue
 */
export const removeFromOfflineQueue = (queueId) => {
  offlineQueue = offlineQueue.filter((item) => item.id !== queueId);

  try {
    localStorage.setItem("ims_offline_queue", JSON.stringify(offlineQueue));
  } catch (error) {
    console.error("Failed to update offline queue in storage:", error);
  }
};

export default offlineMiddleware;
