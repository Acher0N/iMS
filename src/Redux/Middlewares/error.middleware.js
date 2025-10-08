/**
 * Error Middleware
 * Handles error logging, reporting, and user notification
 */

import { setError } from "../Features/App/app.reducer";

// Error severity levels
const ERROR_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};

// Error categories
const ERROR_CATEGORIES = {
  NETWORK: "network",
  AUTHENTICATION: "authentication",
  VALIDATION: "validation",
  SYNC: "sync",
  STORAGE: "storage",
  SYSTEM: "system",
  USER: "user",
};

// Errors that should be reported to external service
const REPORTABLE_ERRORS = [ERROR_LEVELS.HIGH, ERROR_LEVELS.CRITICAL];

// Error storage for analytics
let errorHistory = [];
const MAX_ERROR_HISTORY = 50;

/**
 * Error Middleware
 * Processes all errors and handles logging, reporting, and notifications
 */
export const errorMiddleware = (store) => (next) => (action) => {
  try {
    const result = next(action);

    // Handle rejected async actions
    if (action.type.endsWith("/rejected")) {
      handleError(action, store);
    }

    // Handle explicit error actions
    if (action.type === "SET_ERROR" || action.type.includes("ERROR")) {
      handleError(action, store);
    }

    return result;
  } catch (error) {
    // Handle synchronous errors
    const errorAction = {
      type: "SYNC_ERROR",
      payload: error.message,
      meta: {
        originalAction: action,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      },
    };

    handleError(errorAction, store);

    // Re-throw to maintain error propagation
    throw error;
  }
};

/**
 * Handle error processing
 */
const handleError = (action, store) => {
  const error = createErrorObject(action);

  // Log error
  logError(error);

  // Store in history
  addToErrorHistory(error);

  // Update store with user-friendly error
  const userError = createUserFriendlyError(error);
  store.dispatch(setError(userError));

  // Report critical errors
  if (REPORTABLE_ERRORS.includes(error.level)) {
    reportError(error);
  }

  // Handle specific error types
  handleSpecificErrors(error, store);
};

/**
 * Create standardized error object
 */
const createErrorObject = (action) => {
  const timestamp = new Date().toISOString();
  const userAgent = navigator.userAgent;
  const url = window.location.href;

  let error = {
    id: `error_${Date.now()}`,
    timestamp,
    userAgent,
    url,
    type: action.type,
    level: ERROR_LEVELS.MEDIUM,
    category: ERROR_CATEGORIES.SYSTEM,
    handled: false,
  };

  // Extract error details based on action structure
  if (action.payload) {
    if (typeof action.payload === "string") {
      error.message = action.payload;
    } else if (action.payload.message) {
      error = { ...error, ...action.payload };
    }
  }

  // Determine error category and level
  error.category = determineErrorCategory(action.type, error.message);
  error.level = determineErrorLevel(action.type, error.category);

  // Add stack trace if available
  if (action.meta && action.meta.stack) {
    error.stack = action.meta.stack;
  }

  // Add original action for debugging
  if (action.meta && action.meta.originalAction) {
    error.originalAction = action.meta.originalAction.type;
  }

  return error;
};

/**
 * Determine error category based on action type and message
 */
const determineErrorCategory = (actionType, message = "") => {
  const lowerType = actionType.toLowerCase();
  const lowerMessage = message.toLowerCase();

  if (lowerType.includes("auth") || lowerMessage.includes("authentication")) {
    return ERROR_CATEGORIES.AUTHENTICATION;
  }

  if (
    lowerType.includes("network") ||
    lowerMessage.includes("network") ||
    lowerMessage.includes("fetch") ||
    lowerMessage.includes("timeout")
  ) {
    return ERROR_CATEGORIES.NETWORK;
  }

  if (
    lowerType.includes("validation") ||
    lowerMessage.includes("invalid") ||
    lowerMessage.includes("required")
  ) {
    return ERROR_CATEGORIES.VALIDATION;
  }

  if (lowerType.includes("sync") || lowerMessage.includes("sync")) {
    return ERROR_CATEGORIES.SYNC;
  }

  if (
    lowerMessage.includes("storage") ||
    lowerMessage.includes("quota") ||
    lowerMessage.includes("indexeddb")
  ) {
    return ERROR_CATEGORIES.STORAGE;
  }

  if (lowerType.includes("user") || lowerMessage.includes("user")) {
    return ERROR_CATEGORIES.USER;
  }

  return ERROR_CATEGORIES.SYSTEM;
};

/**
 * Determine error level based on type and category
 */
const determineErrorLevel = (actionType, category) => {
  const lowerType = actionType.toLowerCase();

  // Critical errors
  if (
    lowerType.includes("critical") ||
    lowerType.includes("fatal") ||
    category === ERROR_CATEGORIES.AUTHENTICATION
  ) {
    return ERROR_LEVELS.CRITICAL;
  }

  // High priority errors
  if (
    lowerType.includes("error") ||
    category === ERROR_CATEGORIES.NETWORK ||
    category === ERROR_CATEGORIES.STORAGE
  ) {
    return ERROR_LEVELS.HIGH;
  }

  // Medium priority errors
  if (
    category === ERROR_CATEGORIES.SYNC ||
    category === ERROR_CATEGORIES.SYSTEM
  ) {
    return ERROR_LEVELS.MEDIUM;
  }

  // Low priority errors
  return ERROR_LEVELS.LOW;
};

/**
 * Create user-friendly error message
 */
const createUserFriendlyError = (error) => {
  const friendlyMessages = {
    [ERROR_CATEGORIES.NETWORK]:
      "Network connection error. Please check your internet connection.",
    [ERROR_CATEGORIES.AUTHENTICATION]:
      "Authentication failed. Please sign in again.",
    [ERROR_CATEGORIES.VALIDATION]: "Please check your input and try again.",
    [ERROR_CATEGORIES.SYNC]:
      "Data synchronization failed. Your changes will be saved locally.",
    [ERROR_CATEGORIES.STORAGE]:
      "Storage quota exceeded. Please free up some space.",
    [ERROR_CATEGORIES.SYSTEM]:
      "An unexpected error occurred. Please try again.",
    [ERROR_CATEGORIES.USER]: "Invalid operation. Please check your input.",
  };

  return {
    id: error.id,
    message:
      friendlyMessages[error.category] || error.message || "An error occurred",
    category: error.category,
    level: error.level,
    timestamp: error.timestamp,
    dismissible: error.level !== ERROR_LEVELS.CRITICAL,
    actions: getErrorActions(error.category),
  };
};

/**
 * Get available actions for error category
 */
const getErrorActions = (category) => {
  switch (category) {
    case ERROR_CATEGORIES.NETWORK:
      return [
        { label: "Retry", action: "RETRY_ACTION" },
        { label: "Work Offline", action: "ENABLE_OFFLINE_MODE" },
      ];

    case ERROR_CATEGORIES.AUTHENTICATION:
      return [
        { label: "Sign In", action: "NAVIGATE_TO_LOGIN" },
        { label: "Recover Account", action: "NAVIGATE_TO_RECOVERY" },
      ];

    case ERROR_CATEGORIES.SYNC:
      return [
        { label: "Retry Sync", action: "FORCE_SYNC" },
        { label: "View Queue", action: "SHOW_SYNC_QUEUE" },
      ];

    case ERROR_CATEGORIES.STORAGE:
      return [
        { label: "Clear Cache", action: "CLEAR_CACHE" },
        { label: "Export Data", action: "EXPORT_DATA" },
      ];

    default:
      return [{ label: "Dismiss", action: "DISMISS_ERROR" }];
  }
};

/**
 * Log error to console with formatting
 */
const logError = (error) => {
  const logLevel = {
    [ERROR_LEVELS.LOW]: "info",
    [ERROR_LEVELS.MEDIUM]: "warn",
    [ERROR_LEVELS.HIGH]: "error",
    [ERROR_LEVELS.CRITICAL]: "error",
  };

  const method = logLevel[error.level] || "error";

  console.group(`🚨 ${error.level.toUpperCase()} ERROR - ${error.category}`);
  console[method]("Message:", error.message);
  console[method]("Type:", error.type);
  console[method]("Timestamp:", error.timestamp);
  console[method]("URL:", error.url);

  if (error.originalAction) {
    console[method]("Original Action:", error.originalAction);
  }

  if (error.stack) {
    console[method]("Stack:", error.stack);
  }

  console.groupEnd();
};

/**
 * Add error to history for analytics
 */
const addToErrorHistory = (error) => {
  errorHistory.unshift(error);

  // Limit history size
  if (errorHistory.length > MAX_ERROR_HISTORY) {
    errorHistory = errorHistory.slice(0, MAX_ERROR_HISTORY);
  }

  // Store in localStorage for persistence
  try {
    localStorage.setItem("ims_error_history", JSON.stringify(errorHistory));
  } catch (storageError) {
    console.warn("Failed to persist error history:", storageError);
  }
};

/**
 * Report error to external service
 */
const reportError = async (error) => {
  try {
    // In production, you would send this to your error reporting service
    // For development, we'll just log it
    console.warn("Reporting error to external service:", error);

    // Example: Send to Sentry, LogRocket, or custom endpoint
    // await fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(error)
    // });
  } catch (reportingError) {
    console.error("Failed to report error:", reportingError);
  }
};

/**
 * Handle specific error types
 */
const handleSpecificErrors = (error, store) => {
  switch (error.category) {
    case ERROR_CATEGORIES.AUTHENTICATION:
      // Automatically redirect to login for auth errors
      if (error.level === ERROR_LEVELS.CRITICAL) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      break;

    case ERROR_CATEGORIES.STORAGE:
      // Try to free up space
      if (error.message && error.message.includes("quota")) {
        clearOldCacheData();
      }
      break;

    case ERROR_CATEGORIES.NETWORK:
      // Enable offline mode
      store.dispatch({ type: "ENABLE_OFFLINE_MODE" });
      break;
  }
};

/**
 * Clear old cache data to free up space
 */
const clearOldCacheData = () => {
  try {
    // Clear old items from various caches
    const caches = ["ims_cache", "ims_images", "ims_temp"];
    caches.forEach((cacheName) => {
      localStorage.removeItem(cacheName);
    });

    console.log("Cleared old cache data to free up storage");
  } catch (error) {
    console.error("Failed to clear cache data:", error);
  }
};

/**
 * Get error statistics
 */
export const getErrorStatistics = () => {
  const now = new Date();
  const last24Hours = errorHistory.filter(
    (error) => new Date(now - new Date(error.timestamp)) < 24 * 60 * 60 * 1000
  );

  const byCategory = errorHistory.reduce((acc, error) => {
    acc[error.category] = (acc[error.category] || 0) + 1;
    return acc;
  }, {});

  const byLevel = errorHistory.reduce((acc, error) => {
    acc[error.level] = (acc[error.level] || 0) + 1;
    return acc;
  }, {});

  return {
    total: errorHistory.length,
    last24Hours: last24Hours.length,
    byCategory,
    byLevel,
    mostRecent: errorHistory[0],
  };
};

/**
 * Clear error history
 */
export const clearErrorHistory = () => {
  errorHistory = [];
  try {
    localStorage.removeItem("ims_error_history");
  } catch (error) {
    console.warn("Failed to clear error history from storage:", error);
  }
};

/**
 * Initialize error middleware
 */
export const initializeErrorMiddleware = () => {
  // Load error history from localStorage
  try {
    const savedHistory = localStorage.getItem("ims_error_history");
    if (savedHistory) {
      errorHistory = JSON.parse(savedHistory);
      console.log(`Loaded ${errorHistory.length} errors from history`);
    }
  } catch (error) {
    console.warn("Failed to load error history:", error);
    errorHistory = [];
  }

  // Set up global error handlers
  window.addEventListener("error", (event) => {
    const errorAction = {
      type: "GLOBAL_ERROR",
      payload: {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
      meta: {
        stack: event.error ? event.error.stack : null,
      },
    };

    // You might want to dispatch this to your store if available
    console.error("Global error caught:", errorAction);
  });

  window.addEventListener("unhandledrejection", (event) => {
    const errorAction = {
      type: "UNHANDLED_PROMISE_REJECTION",
      payload: {
        message: event.reason
          ? event.reason.message
          : "Unhandled promise rejection",
      },
      meta: {
        reason: event.reason,
      },
    };

    console.error("Unhandled promise rejection:", errorAction);
  });

  console.log("Error middleware initialized");
};

export default errorMiddleware;
