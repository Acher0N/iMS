/**
 * Route Constants
 * Application routing paths and navigation constants
 */

// Auth routes
export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  RECOVER_ACCOUNT: "/recover-account",
  VERIFY_ACCOUNT: "/verify-account",
  RESET_PASSWORD: "/reset-password",
  LOGOUT: "/logout",
};

// PWA and Offline routes
export const PWA_ROUTES = {
  OFFLINE: "/offline",
  SYNC: "/sync",
  INSTALL: "/install",
  UPDATE: "/update",
};

// Main application routes
export const APP_ROUTES = {
  // Dashboard
  DASHBOARD: "/dashboard",
  HOME: "/",

  // Point of Sale
  POS: "/pos",
  POS_CHECKOUT: "/pos/checkout",
  POS_RECEIPT: "/pos/receipt",

  // Inventory Management
  INVENTORY: "/inventory",
  PRODUCTS: "/inventory/products",
  PRODUCT_DETAILS: "/inventory/products/:id",
  PRODUCT_CREATE: "/inventory/products/create",
  PRODUCT_EDIT: "/inventory/products/:id/edit",
  CATEGORIES: "/inventory/categories",
  CATEGORY_DETAILS: "/inventory/categories/:id",
  STOCK_MANAGEMENT: "/inventory/stock",
  STOCK_ADJUSTMENT: "/inventory/stock/adjustment",
  STOCK_TRANSFER: "/inventory/stock/transfer",

  // Sales Management
  SALES: "/sales",
  INVOICES: "/sales/invoices",
  INVOICE_DETAILS: "/sales/invoices/:id",
  INVOICE_CREATE: "/sales/invoices/create",
  INVOICE_EDIT: "/sales/invoices/:id/edit",
  INVOICE_PREVIEW: "/sales/invoices/:id/preview",
  RECEIPTS: "/sales/receipts",
  RECEIPT_DETAILS: "/sales/receipts/:id",
  RETURNS: "/sales/returns",
  RETURN_DETAILS: "/sales/returns/:id",

  // Purchase Management
  PURCHASE: "/purchase",
  PURCHASE_ORDERS: "/purchase/orders",
  PURCHASE_ORDER_DETAILS: "/purchase/orders/:id",
  PURCHASE_ORDER_CREATE: "/purchase/orders/create",
  PURCHASE_ORDER_EDIT: "/purchase/orders/:id/edit",
  RECEIVING: "/purchase/receiving",
  RECEIVING_DETAILS: "/purchase/receiving/:id",
  PURCHASE_RETURNS: "/purchase/returns",
  PURCHASE_RETURN_DETAILS: "/purchase/returns/:id",

  // Customer Management (Buyers)
  BUYERS: "/buyers",
  CUSTOMER_LIST: "/buyers/list",
  CUSTOMER_DETAILS: "/buyers/:id",
  CUSTOMER_CREATE: "/buyers/create",
  CUSTOMER_EDIT: "/buyers/:id/edit",
  CUSTOMER_GROUPS: "/buyers/groups",
  CUSTOMER_GROUP_DETAILS: "/buyers/groups/:id",

  // Supplier Management
  SUPPLIERS: "/suppliers",
  SUPPLIER_LIST: "/suppliers/list",
  SUPPLIER_DETAILS: "/suppliers/:id",
  SUPPLIER_CREATE: "/suppliers/create",
  SUPPLIER_EDIT: "/suppliers/:id/edit",
  SUPPLIER_CATEGORIES: "/suppliers/categories",
  SUPPLIER_CATEGORY_DETAILS: "/suppliers/categories/:id",

  // Reports
  REPORTS: "/reports",
  SALES_REPORTS: "/reports/sales",
  INVENTORY_REPORTS: "/reports/inventory",
  TAX_REPORTS: "/reports/tax",
  FINANCIAL_REPORTS: "/reports/financial",
  CUSTOMER_REPORTS: "/reports/customers",
  PRODUCT_REPORTS: "/reports/products",
  PROFIT_LOSS: "/reports/profit-loss",
  BALANCE_SHEET: "/reports/balance-sheet",
  CASH_FLOW: "/reports/cash-flow",

  // Settings
  SETTINGS: "/settings",
  GENERAL_SETTINGS: "/settings/general",
  USER_MANAGEMENT: "/settings/users",
  USER_DETAILS: "/settings/users/:id",
  USER_CREATE: "/settings/users/create",
  USER_EDIT: "/settings/users/:id/edit",
  COMPANY_INFO: "/settings/company",
  TAX_SETTINGS: "/settings/taxes",
  ZATCA_SETTINGS: "/settings/zatca",
  PAYMENT_METHODS: "/settings/payment-methods",
  EMAIL_TEMPLATES: "/settings/email-templates",
  NOTIFICATION_SETTINGS: "/settings/notifications",
  BACKUP_RESTORE: "/settings/backup-restore",
  SYSTEM_LOGS: "/settings/system-logs",

  // Developer Tools (restricted access)
  DEV: "/dev",
  DEV_CONSOLE: "/dev/console",
  DEV_LOGS: "/dev/logs",
  DEV_DATABASE: "/dev/database",
  DEV_API: "/dev/api",
  DEV_CACHE: "/dev/cache",
  DEV_SYNC: "/dev/sync",
  DEV_TESTING: "/dev/testing",
};

// API routes
export const API_ROUTES = {
  BASE: "/api/v1",

  // Auth endpoints
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout",
    REFRESH: "/api/v1/auth/refresh",
    REGISTER: "/api/v1/auth/register",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    VERIFY_EMAIL: "/api/v1/auth/verify-email",
    PROFILE: "/api/v1/auth/profile",
  },

  // Resource endpoints
  CUSTOMERS: "/api/v1/customers",
  SUPPLIERS: "/api/v1/suppliers",
  PRODUCTS: "/api/v1/products",
  INVOICES: "/api/v1/invoices",
  RECEIPTS: "/api/v1/receipts",
  PURCHASES: "/api/v1/purchases",
  INVENTORY: "/api/v1/inventory",
  PAYMENTS: "/api/v1/payments",
  USERS: "/api/v1/users",

  // Reports endpoints
  REPORTS: {
    SALES: "/api/v1/reports/sales",
    INVENTORY: "/api/v1/reports/inventory",
    TAX: "/api/v1/reports/tax",
    FINANCIAL: "/api/v1/reports/financial",
    CUSTOMERS: "/api/v1/reports/customers",
    PRODUCTS: "/api/v1/reports/products",
  },

  // Settings endpoints
  SETTINGS: {
    COMPANY: "/api/v1/settings/company",
    TAXES: "/api/v1/settings/taxes",
    ZATCA: "/api/v1/settings/zatca",
    EMAIL: "/api/v1/settings/email",
    NOTIFICATIONS: "/api/v1/settings/notifications",
  },

  // File endpoints
  FILES: {
    UPLOAD: "/api/v1/files/upload",
    DOWNLOAD: "/api/v1/files/download",
    DELETE: "/api/v1/files/delete",
  },

  // Export endpoints
  EXPORTS: {
    INVOICES: "/api/v1/exports/invoices",
    CUSTOMERS: "/api/v1/exports/customers",
    PRODUCTS: "/api/v1/exports/products",
    REPORTS: "/api/v1/exports/reports",
  },

  // ZATCA endpoints
  ZATCA: {
    VALIDATE: "/api/v1/zatca/validate",
    SUBMIT: "/api/v1/zatca/submit",
    STATUS: "/api/v1/zatca/status",
  },

  // Sync endpoints
  SYNC: {
    STATUS: "/api/v1/sync/status",
    FORCE: "/api/v1/sync/force",
    HISTORY: "/api/v1/sync/history",
  },
};

// External routes
export const EXTERNAL_ROUTES = {
  ZATCA_PORTAL: "https://gw-fatoora.zatca.gov.sa",
  ZATCA_SANDBOX: "https://gw-fatoora-sandbox.zatca.gov.sa",
  HELP_CENTER: "/help",
  DOCUMENTATION: "/docs",
  SUPPORT: "/support",
  CONTACT: "/contact",
};

// Route parameters
export const ROUTE_PARAMS = {
  ID: ":id",
  CUSTOMER_ID: ":customerId",
  SUPPLIER_ID: ":supplierId",
  PRODUCT_ID: ":productId",
  INVOICE_ID: ":invoiceId",
  ORDER_ID: ":orderId",
  USER_ID: ":userId",
  CATEGORY_ID: ":categoryId",
  TAB: ":tab",
  PAGE: ":page",
};

// Query parameters
export const QUERY_PARAMS = {
  PAGE: "page",
  LIMIT: "limit",
  SORT: "sort",
  ORDER: "order",
  FILTER: "filter",
  SEARCH: "search",
  STATUS: "status",
  DATE_FROM: "dateFrom",
  DATE_TO: "dateTo",
  CUSTOMER: "customer",
  SUPPLIER: "supplier",
  PRODUCT: "product",
  CATEGORY: "category",
  PAYMENT_METHOD: "paymentMethod",
  EXPORT_FORMAT: "format",
};

// Navigation breadcrumb labels
export const BREADCRUMB_LABELS = {
  [APP_ROUTES.DASHBOARD]: "Dashboard",
  [APP_ROUTES.POS]: "Point of Sale",
  [APP_ROUTES.INVENTORY]: "Inventory",
  [APP_ROUTES.PRODUCTS]: "Products",
  [APP_ROUTES.CATEGORIES]: "Categories",
  [APP_ROUTES.SALES]: "Sales",
  [APP_ROUTES.INVOICES]: "Invoices",
  [APP_ROUTES.RECEIPTS]: "Receipts",
  [APP_ROUTES.RETURNS]: "Returns",
  [APP_ROUTES.PURCHASE]: "Purchase",
  [APP_ROUTES.PURCHASE_ORDERS]: "Purchase Orders",
  [APP_ROUTES.RECEIVING]: "Receiving",
  [APP_ROUTES.BUYERS]: "Customers",
  [APP_ROUTES.SUPPLIERS]: "Suppliers",
  [APP_ROUTES.REPORTS]: "Reports",
  [APP_ROUTES.SETTINGS]: "Settings",
  [APP_ROUTES.DEV]: "Developer Tools",
};

// Route groups for access control
export const ROUTE_GROUPS = {
  PUBLIC: [
    AUTH_ROUTES.LOGIN,
    AUTH_ROUTES.SIGNUP,
    AUTH_ROUTES.RECOVER_ACCOUNT,
    AUTH_ROUTES.VERIFY_ACCOUNT,
    AUTH_ROUTES.RESET_PASSWORD,
  ],
  PROTECTED: [
    APP_ROUTES.DASHBOARD,
    APP_ROUTES.POS,
    APP_ROUTES.INVENTORY,
    APP_ROUTES.SALES,
    APP_ROUTES.PURCHASE,
    APP_ROUTES.BUYERS,
    APP_ROUTES.SUPPLIERS,
    APP_ROUTES.REPORTS,
    APP_ROUTES.SETTINGS,
  ],
  ADMIN_ONLY: [
    APP_ROUTES.USER_MANAGEMENT,
    APP_ROUTES.SYSTEM_LOGS,
    APP_ROUTES.BACKUP_RESTORE,
  ],
  DEV_ONLY: [
    APP_ROUTES.DEV,
    APP_ROUTES.DEV_CONSOLE,
    APP_ROUTES.DEV_LOGS,
    APP_ROUTES.DEV_DATABASE,
    APP_ROUTES.DEV_API,
    APP_ROUTES.DEV_CACHE,
    APP_ROUTES.DEV_SYNC,
    APP_ROUTES.DEV_TESTING,
  ],
};

// Route metadata for navigation
export const ROUTE_META = {
  [APP_ROUTES.DASHBOARD]: {
    title: "Dashboard",
    icon: "Dashboard",
    description: "Main dashboard overview",
    requiresAuth: true,
    permissions: [],
  },
  [APP_ROUTES.POS]: {
    title: "Point of Sale",
    icon: "PointOfSale",
    description: "Point of sale system",
    requiresAuth: true,
    permissions: ["CREATE_INVOICE", "READ_PRODUCT"],
  },
  [APP_ROUTES.INVENTORY]: {
    title: "Inventory",
    icon: "Inventory",
    description: "Inventory management",
    requiresAuth: true,
    permissions: ["READ_INVENTORY"],
  },
  [APP_ROUTES.SALES]: {
    title: "Sales",
    icon: "Sell",
    description: "Sales management",
    requiresAuth: true,
    permissions: ["READ_INVOICE"],
  },
  [APP_ROUTES.PURCHASE]: {
    title: "Purchase",
    icon: "ShoppingCart",
    description: "Purchase management",
    requiresAuth: true,
    permissions: ["READ_PURCHASE"],
  },
  [APP_ROUTES.BUYERS]: {
    title: "Customers",
    icon: "People",
    description: "Customer management",
    requiresAuth: true,
    permissions: ["READ_CUSTOMER"],
  },
  [APP_ROUTES.SUPPLIERS]: {
    title: "Suppliers",
    icon: "Business",
    description: "Supplier management",
    requiresAuth: true,
    permissions: ["READ_SUPPLIER"],
  },
  [APP_ROUTES.REPORTS]: {
    title: "Reports",
    icon: "Assessment",
    description: "Reports and analytics",
    requiresAuth: true,
    permissions: ["VIEW_REPORTS"],
  },
  [APP_ROUTES.SETTINGS]: {
    title: "Settings",
    icon: "Settings",
    description: "Application settings",
    requiresAuth: true,
    permissions: ["MANAGE_SETTINGS"],
  },
  [APP_ROUTES.DEV]: {
    title: "Developer Tools",
    icon: "Code",
    description: "Developer tools and utilities",
    requiresAuth: true,
    permissions: ["ACCESS_DEV_TOOLS"],
  },
};

export default {
  AUTH_ROUTES,
  APP_ROUTES,
  API_ROUTES,
  EXTERNAL_ROUTES,
  ROUTE_PARAMS,
  QUERY_PARAMS,
  BREADCRUMB_LABELS,
  ROUTE_GROUPS,
  ROUTE_META,
};
