/**
 * Application Constants
 * General application-wide constants
 */

// Application metadata
export const APP_INFO = {
  NAME: "iMS - Invoice Management System",
  VERSION: "1.0.0",
  DESCRIPTION: "Comprehensive offline-first invoice management system",
  AUTHOR: "iMS Development Team",
  COPYRIGHT: "© 2024 iMS. All rights reserved.",
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "ims_auth_token",
  USER_PREFERENCES: "ims_user_preferences",
  OFFLINE_QUEUE: "ims_offline_queue",
  SYNC_QUEUE: "ims_sync_queue",
  ERROR_HISTORY: "ims_error_history",
  FAILED_SYNCS: "ims_failed_syncs",
  THEME_SETTINGS: "ims_theme_settings",
  LANGUAGE_SETTINGS: "ims_language_settings",
  CACHE_DATA: "ims_cache_data",
  TEMP_DATA: "ims_temp_data",
};

// Database table names
export const DB_TABLES = {
  INVOICES: "invoices",
  CUSTOMERS: "customers",
  SUPPLIERS: "suppliers",
  PRODUCTS: "products",
  INVENTORY: "inventory",
  PURCHASES: "purchases",
  SALES: "sales",
  PAYMENTS: "payments",
  USERS: "users",
  SETTINGS: "settings",
  AUDIT_LOGS: "audit_logs",
  SYNC_LOGS: "sync_logs",
};

// Status constants
export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  DELETED: "deleted",
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

// Invoice status
export const INVOICE_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  SENT: "sent",
  VIEWED: "viewed",
  PAID: "paid",
  PARTIALLY_PAID: "partially_paid",
  OVERDUE: "overdue",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};

// Payment status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
};

// Payment methods
export const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  BANK_TRANSFER: "bank_transfer",
  CHEQUE: "cheque",
  CREDIT: "credit",
  DIGITAL_WALLET: "digital_wallet",
  CRYPTO: "crypto",
};

// Tax types
export const TAX_TYPES = {
  VAT: "vat",
  SALES_TAX: "sales_tax",
  EXCISE_TAX: "excise_tax",
  WITHHOLDING_TAX: "withholding_tax",
  CUSTOM_DUTY: "custom_duty",
};

// Units of measurement
export const UNITS = {
  PIECE: "pcs",
  KILOGRAM: "kg",
  GRAM: "g",
  LITER: "l",
  MILLILITER: "ml",
  METER: "m",
  CENTIMETER: "cm",
  SQUARE_METER: "sqm",
  CUBIC_METER: "cbm",
  BOX: "box",
  PACK: "pack",
  DOZEN: "dozen",
  CASE: "case",
  PALLET: "pallet",
};

// User roles
export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  ACCOUNTANT: "accountant",
  CASHIER: "cashier",
  SALES_REP: "sales_rep",
  INVENTORY_MANAGER: "inventory_manager",
  VIEWER: "viewer",
};

// Permissions
export const PERMISSIONS = {
  // Invoice permissions
  CREATE_INVOICE: "create_invoice",
  READ_INVOICE: "read_invoice",
  UPDATE_INVOICE: "update_invoice",
  DELETE_INVOICE: "delete_invoice",
  APPROVE_INVOICE: "approve_invoice",

  // Customer permissions
  CREATE_CUSTOMER: "create_customer",
  READ_CUSTOMER: "read_customer",
  UPDATE_CUSTOMER: "update_customer",
  DELETE_CUSTOMER: "delete_customer",

  // Product permissions
  CREATE_PRODUCT: "create_product",
  READ_PRODUCT: "read_product",
  UPDATE_PRODUCT: "update_product",
  DELETE_PRODUCT: "delete_product",

  // Inventory permissions
  READ_INVENTORY: "read_inventory",
  UPDATE_INVENTORY: "update_inventory",
  MANAGE_STOCK: "manage_stock",

  // Reports permissions
  VIEW_REPORTS: "view_reports",
  EXPORT_REPORTS: "export_reports",

  // Settings permissions
  MANAGE_USERS: "manage_users",
  MANAGE_SETTINGS: "manage_settings",
  MANAGE_TAXES: "manage_taxes",

  // System permissions
  ACCESS_DEV_TOOLS: "access_dev_tools",
  VIEW_AUDIT_LOGS: "view_audit_logs",
  MANAGE_BACKUPS: "manage_backups",
};

// Date formats
export const DATE_FORMATS = {
  ISO: "YYYY-MM-DD",
  US: "MM/DD/YYYY",
  EU: "DD/MM/YYYY",
  UK: "DD/MM/YYYY",
  FULL: "YYYY-MM-DD HH:mm:ss",
  TIME: "HH:mm:ss",
  DATETIME: "DD/MM/YYYY HH:mm",
  DISPLAY: "MMM DD, YYYY",
  LONG: "MMMM DD, YYYY",
};

// Number formats
export const NUMBER_FORMATS = {
  DECIMAL_PLACES: 2,
  THOUSANDS_SEPARATOR: ",",
  DECIMAL_SEPARATOR: ".",
  CURRENCY_SYMBOL: "SAR",
  CURRENCY_POSITION: "after", // 'before' | 'after'
};

// Validation rules
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[1-9][\d\s\-\(\)]{7,15}$/,
  VAT_NUMBER: /^[0-9]{15}$/, // Saudi VAT format
  COMMERCIAL_REGISTRATION: /^[0-9]{10}$/, // Saudi CR format
  IBAN: /^SA[0-9]{22}$/, // Saudi IBAN format
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
};

// File types
export const FILE_TYPES = {
  IMAGES: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  DOCUMENTS: ["pdf", "doc", "docx", "xls", "xlsx", "csv", "txt"],
  EXPORTS: ["pdf", "xlsx", "csv", "json", "xml"],
};

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  EXPORT: 50 * 1024 * 1024, // 50MB
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 500,
};

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 seconds
  FILE_UPLOAD: 120000, // 2 minutes
  SYNC_OPERATION: 60000, // 1 minute
  SESSION_WARNING: 300000, // 5 minutes before expiry
  AUTO_SAVE: 30000, // 30 seconds
};

// Retry configurations
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  INITIAL_DELAY: 1000, // 1 second
  MAX_DELAY: 10000, // 10 seconds
  BACKOFF_FACTOR: 2,
};

// Feature flags
export const FEATURES = {
  OFFLINE_MODE: true,
  REAL_TIME_SYNC: true,
  MULTI_LANGUAGE: true,
  DARK_MODE: true,
  EXPORT_REPORTS: true,
  EMAIL_NOTIFICATIONS: true,
  SMS_NOTIFICATIONS: false,
  ZATCA_INTEGRATION: true,
  MULTI_CURRENCY: false,
  ADVANCED_ANALYTICS: true,
  AUDIT_LOGS: true,
  TWO_FACTOR_AUTH: true,
  API_ACCESS: false,
  MOBILE_APP: false,
};

// Default values
export const DEFAULTS = {
  LANGUAGE: "en",
  CURRENCY: "SAR",
  TAX_RATE: 15, // 15% VAT for Saudi Arabia
  DATE_FORMAT: "DD/MM/YYYY",
  NUMBER_FORMAT: "en-US",
  THEME_MODE: "light",
  THEME_PALETTE: "default",
  PAGE_SIZE: 25,
  SESSION_TIMEOUT: 3600000, // 1 hour
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
  SYNC_INTERVAL: 30000, // 30 seconds
};

export default {
  APP_INFO,
  STORAGE_KEYS,
  DB_TABLES,
  STATUS,
  INVOICE_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  TAX_TYPES,
  UNITS,
  USER_ROLES,
  PERMISSIONS,
  DATE_FORMATS,
  NUMBER_FORMATS,
  VALIDATION,
  FILE_TYPES,
  FILE_SIZE_LIMITS,
  PAGINATION,
  TIMEOUTS,
  RETRY_CONFIG,
  FEATURES,
  DEFAULTS,
};
