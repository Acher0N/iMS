/**
 * PWA-Optimized Router Utilities
 * Handles offline routing and navigation for PWA capabilities
 */

import { useState, useEffect } from "react";

/**
 * Custom hook for PWA-aware routing
 * Handles offline navigation and route caching
 */
export const usePWARouter = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [cachedRoutes, setCachedRoutes] = useState(new Set());

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Pre-cache critical routes
    const criticalRoutes = [
      "/#/login",
      "/#/signin",
      "/#/signup",
      "/#/dashboard",
      "/#/invoices",
      "/#/offline",
    ];

    // Cache routes in service worker
    if ("serviceWorker" in navigator && "caches" in window) {
      caches.open("pwa-routes-v1").then((cache) => {
        criticalRoutes.forEach((route) => {
          cache
            .add(route)
            .catch((err) =>
              console.warn(`Failed to cache route ${route}:`, err)
            );
        });
        setCachedRoutes(new Set(criticalRoutes));
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /**
   * Navigate with offline awareness
   * @param {string} path - Route path to navigate to
   * @param {Function} navigate - React Router navigate function
   */
  const navigateOfflineAware = (path, navigate) => {
    if (isOffline && !cachedRoutes.has(path)) {
      // Redirect to offline page if route not cached
      navigate("/offline", { state: { intendedPath: path } });
      return;
    }
    navigate(path);
  };

  /**
   * Check if a route is available offline
   * @param {string} path - Route path to check
   * @returns {boolean} - Whether route is available offline
   */
  const isRouteAvailableOffline = (path) => {
    return cachedRoutes.has(path);
  };

  return {
    isOffline,
    cachedRoutes,
    navigateOfflineAware,
    isRouteAvailableOffline,
  };
};

/**
 * Route preloader for PWA optimization
 * Pre-loads critical routes and their dependencies
 */
export class PWARoutePreloader {
  constructor() {
    this.preloadedRoutes = new Set();
    this.routeDependencies = new Map();
  }

  /**
   * Register route dependencies
   * @param {string} route - Route path
   * @param {Array} dependencies - Array of module paths to preload
   */
  registerDependencies(route, dependencies) {
    this.routeDependencies.set(route, dependencies);
  }

  /**
   * Preload a route and its dependencies
   * @param {string} route - Route path to preload
   */
  async preloadRoute(route) {
    if (this.preloadedRoutes.has(route)) {
      return;
    }

    try {
      const dependencies = this.routeDependencies.get(route) || [];

      // Preload route dependencies
      await Promise.all(
        dependencies.map((dep) => import(/* @vite-ignore */ dep))
      );

      this.preloadedRoutes.add(route);
      console.log(`✅ Route preloaded: ${route}`);
    } catch (error) {
      console.warn(`⚠️ Failed to preload route ${route}:`, error);
    }
  }

  /**
   * Preload critical routes on app start
   */
  async preloadCriticalRoutes() {
    const criticalRoutes = [
      "/dashboard",
      "/invoices",
      "/customers",
      "/products",
    ];

    await Promise.all(criticalRoutes.map((route) => this.preloadRoute(route)));
  }
}

/**
 * Re-export JSX components from separate file
 */
export { createOfflineFallback } from "./pwaRouterComponents.jsx";

/**
 * Route configuration for PWA optimization
 */
export const PWA_ROUTE_CONFIG = {
  // Routes that work fully offline
  OFFLINE_CAPABLE: [
    "/dashboard",
    "/invoices",
    "/customers",
    "/products",
    "/reports",
    "/settings",
  ],

  // Routes that need network connection
  ONLINE_ONLY: ["/sync", "/backup", "/export", "/analytics"],

  // Critical routes to preload
  CRITICAL: ["/login", "/dashboard", "/invoices"],

  // Routes with heavy dependencies to lazy load
  LAZY_LOAD: ["/reports", "/analytics", "/settings", "/help"],
};

export default {
  usePWARouter,
  PWARoutePreloader,
  createOfflineFallback,
  PWA_ROUTE_CONFIG,
};
