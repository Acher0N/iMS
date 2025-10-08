/**
 * Environment Configuration
 * Contains environment-specific settings and constants
 */

// Environment variables with defaults
export const ENV = {
  // Firebase Configuration
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || "",
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  FIREBASE_DATABASE_URL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  FIREBASE_MESSAGING_SENDER_ID:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || "",
  FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",

  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || "iMS - Invoice Management System",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  APP_ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || "development",

  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.ims.com",
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,

  // Offline Engine Configuration
  OFFLINE_ENABLED: import.meta.env.VITE_OFFLINE_ENABLED === "true",
  SYNC_INTERVAL: parseInt(import.meta.env.VITE_SYNC_INTERVAL) || 30000,
  CACHE_DURATION: parseInt(import.meta.env.VITE_CACHE_DURATION) || 86400000, // 24 hours

  // ZATCA Configuration
  ZATCA_ENABLED: import.meta.env.VITE_ZATCA_ENABLED === "true",
  ZATCA_ENVIRONMENT: import.meta.env.VITE_ZATCA_ENVIRONMENT || "sandbox",
  ZATCA_API_URL:
    import.meta.env.VITE_ZATCA_API_URL || "https://gw-fatoora.zatca.gov.sa",

  // Development flags
  USE_FIREBASE_EMULATOR: import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true",
  ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS === "true",
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === "true",
};

// Validate required environment variables
const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
];

export const validateEnvironment = () => {
  const missing = requiredEnvVars.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing);
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  console.log("✅ Environment validation passed");
  return true;
};

export default ENV;
