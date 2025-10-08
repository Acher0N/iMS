/**
 * Application Redux Slice
 * Manages global app state including theme, language, and settings
 */

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  // Theme settings
  theme: {
    mode: "light", // 'light' | 'dark'
    palette: "default", // 'default' | 'custom' | future palettes
    primaryColor: "#1976d2",
    secondaryColor: "#dc004e",
  },

  // Language and localization
  language: {
    current: "en", // 'en' | 'ar' | other languages
    direction: "ltr", // 'ltr' | 'rtl'
    dateFormat: "DD/MM/YYYY",
    numberFormat: "en-US",
    currency: "SAR",
  },

  // App settings
  settings: {
    offline: {
      enabled: true,
      syncInterval: 30000, // 30 seconds
      autoSync: true,
    },
    notifications: {
      enabled: true,
      sound: true,
      desktop: true,
      email: true,
    },
    security: {
      sessionTimeout: 3600000, // 1 hour
      twoFactorEnabled: false,
      autoLock: true,
      autoLockTime: 900000, // 15 minutes
    },
    display: {
      density: "comfortable", // 'compact' | 'comfortable' | 'spacious'
      animation: true,
      transitions: true,
      pageSize: 25,
    },
    zatca: {
      enabled: true,
      environment: "sandbox", // 'sandbox' | 'production'
      phase: 1, // 1 | 2
    },
  },

  // App status
  status: {
    isOnline: navigator.onLine,
    lastSync: null,
    syncInProgress: false,
    updateAvailable: false,
    maintenance: false,
  },

  // Loading states
  loading: {
    global: false,
    sync: false,
    theme: false,
  },

  // Error handling
  error: null,

  // App metadata
  version: "1.0.0",
  buildDate: new Date().toISOString(),
  environment: import.meta.env.MODE,
};

// App slice
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Theme actions
    setThemeMode: (state, action) => {
      state.theme.mode = action.payload;
    },
    setThemePalette: (state, action) => {
      state.theme.palette = action.payload;
    },
    updateThemeColors: (state, action) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    toggleTheme: (state) => {
      state.theme.mode = state.theme.mode === "light" ? "dark" : "light";
    },

    // Language actions
    setLanguage: (state, action) => {
      const { language, direction } = action.payload;
      state.language.current = language;
      state.language.direction =
        direction || (language === "ar" ? "rtl" : "ltr");
    },
    updateLanguageSettings: (state, action) => {
      state.language = { ...state.language, ...action.payload };
    },

    // Settings actions
    updateOfflineSettings: (state, action) => {
      state.settings.offline = { ...state.settings.offline, ...action.payload };
    },
    updateNotificationSettings: (state, action) => {
      state.settings.notifications = {
        ...state.settings.notifications,
        ...action.payload,
      };
    },
    updateSecuritySettings: (state, action) => {
      state.settings.security = {
        ...state.settings.security,
        ...action.payload,
      };
    },
    updateDisplaySettings: (state, action) => {
      state.settings.display = { ...state.settings.display, ...action.payload };
    },
    updateZatcaSettings: (state, action) => {
      state.settings.zatca = { ...state.settings.zatca, ...action.payload };
    },

    // Status actions
    setOnlineStatus: (state, action) => {
      state.status.isOnline = action.payload;
    },
    setSyncStatus: (state, action) => {
      state.status.syncInProgress = action.payload;
      if (!action.payload && state.status.lastSync === null) {
        state.status.lastSync = new Date().toISOString();
      }
    },
    updateLastSync: (state) => {
      state.status.lastSync = new Date().toISOString();
    },
    setUpdateAvailable: (state, action) => {
      state.status.updateAvailable = action.payload;
    },
    setMaintenanceMode: (state, action) => {
      state.status.maintenance = action.payload;
    },

    // Loading actions
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setSyncLoading: (state, action) => {
      state.loading.sync = action.payload;
    },
    setThemeLoading: (state, action) => {
      state.loading.theme = action.payload;
    },

    // Error actions
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Reset actions
    resetSettings: (state) => {
      state.settings = initialState.settings;
    },
    resetTheme: (state) => {
      state.theme = initialState.theme;
    },
    resetApp: () => {
      return initialState;
    },
  },
});

export const {
  // Theme actions
  setThemeMode,
  setThemePalette,
  updateThemeColors,
  toggleTheme,

  // Language actions
  setLanguage,
  updateLanguageSettings,

  // Settings actions
  updateOfflineSettings,
  updateNotificationSettings,
  updateSecuritySettings,
  updateDisplaySettings,
  updateZatcaSettings,

  // Status actions
  setOnlineStatus,
  setSyncStatus,
  updateLastSync,
  setUpdateAvailable,
  setMaintenanceMode,

  // Loading actions
  setGlobalLoading,
  setSyncLoading,
  setThemeLoading,

  // Error actions
  setError,
  clearError,

  // Reset actions
  resetSettings,
  resetTheme,
  resetApp,
} = appSlice.actions;

export default appSlice.reducer;
