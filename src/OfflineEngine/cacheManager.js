/**
 * Cache Manager
 * Handles application caching strategies and cache management
 */

let cacheConfig = null;

/**
 * Initialize cache manager
 * @param {Object} config - Cache configuration
 * @returns {Promise<boolean>} - Success status
 */
export const initializeCacheManager = async (config = {}) => {
  try {
    cacheConfig = {
      maxAge: 86400000, // 24 hours
      maxSize: 100 * 1024 * 1024, // 100MB
      strategy: "networkFirst",
      ...config,
    };

    // Check cache API support
    if (!("caches" in window)) {
      console.warn("Cache API not supported");
      return false;
    }

    // Clean up old caches periodically
    await cleanupOldCaches();

    console.log("✅ Cache manager initialized");
    return true;
  } catch (error) {
    console.error("❌ Cache manager initialization failed:", error);
    throw error;
  }
};

/**
 * Cache response
 * @param {string} url - Request URL
 * @param {Response} response - Response to cache
 * @returns {Promise<boolean>} - Success status
 */
export const cacheResponse = async (url, response) => {
  try {
    if (!cacheConfig) {
      return false;
    }

    const cache = await caches.open("ims-cache-v1");
    await cache.put(url, response.clone());

    return true;
  } catch (error) {
    console.error("Failed to cache response:", error);
    return false;
  }
};

/**
 * Get cached response
 * @param {string} url - Request URL
 * @returns {Promise<Response|null>} - Cached response or null
 */
export const getCachedResponse = async (url) => {
  try {
    if (!cacheConfig) {
      return null;
    }

    const cache = await caches.open("ims-cache-v1");
    const response = await cache.match(url);

    if (response) {
      // Check if cache is still valid
      const cacheTime = response.headers.get("ims-cache-time");
      if (cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        if (age > cacheConfig.maxAge) {
          // Cache expired, remove it
          await cache.delete(url);
          return null;
        }
      }
    }

    return response;
  } catch (error) {
    console.error("Failed to get cached response:", error);
    return null;
  }
};

/**
 * Network first cache strategy
 * @param {string} url - Request URL
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} - Response
 */
export const networkFirst = async (url, options = {}) => {
  try {
    // Try network first
    const response = await fetch(url, options);

    if (response.ok) {
      // Cache successful response
      const responseWithCacheTime = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...response.headers,
          "ims-cache-time": Date.now().toString(),
        },
      });

      await cacheResponse(url, responseWithCacheTime);
    }

    return response;
  } catch (error) {
    // Network failed, try cache
    console.log("Network failed, trying cache for:", url);
    const cachedResponse = await getCachedResponse(url);

    if (cachedResponse) {
      console.log("Serving from cache:", url);
      return cachedResponse;
    }

    throw error;
  }
};

/**
 * Cache first strategy
 * @param {string} url - Request URL
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} - Response
 */
export const cacheFirst = async (url, options = {}) => {
  // Try cache first
  const cachedResponse = await getCachedResponse(url);

  if (cachedResponse) {
    console.log("Serving from cache:", url);
    return cachedResponse;
  }

  // Cache miss, try network
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      await cacheResponse(url, response);
    }

    return response;
  } catch (error) {
    console.error("Network and cache both failed for:", url);
    throw error;
  }
};

/**
 * Stale while revalidate strategy
 * @param {string} url - Request URL
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} - Response
 */
export const staleWhileRevalidate = async (url, options = {}) => {
  // Get cached response immediately
  const cachedResponse = getCachedResponse(url);

  // Start network request in background
  const networkResponse = fetch(url, options)
    .then((response) => {
      if (response.ok) {
        cacheResponse(url, response);
      }
      return response;
    })
    .catch((error) => {
      console.error("Background fetch failed:", error);
    });

  // Return cached response if available, otherwise wait for network
  const cached = await cachedResponse;
  if (cached) {
    console.log("Serving stale cache for:", url);
    return cached;
  }

  return await networkResponse;
};

/**
 * Smart fetch with configured cache strategy
 * @param {string} url - Request URL
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} - Response
 */
export const smartFetch = async (url, options = {}) => {
  if (!cacheConfig) {
    return fetch(url, options);
  }

  switch (cacheConfig.strategy) {
    case "cacheFirst":
      return cacheFirst(url, options);
    case "networkFirst":
      return networkFirst(url, options);
    case "staleWhileRevalidate":
      return staleWhileRevalidate(url, options);
    default:
      return networkFirst(url, options);
  }
};

/**
 * Clean up old caches
 * @returns {Promise<void>}
 */
const cleanupOldCaches = async () => {
  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(
      (name) => name.startsWith("ims-cache-") && name !== "ims-cache-v1"
    );

    await Promise.all(oldCaches.map((cacheName) => caches.delete(cacheName)));

    if (oldCaches.length > 0) {
      console.log(`🧹 Cleaned up ${oldCaches.length} old caches`);
    }
  } catch (error) {
    console.error("Failed to cleanup old caches:", error);
  }
};

/**
 * Clear all caches
 * @returns {Promise<boolean>} - Success status
 */
export const clearAllCaches = async () => {
  try {
    const cacheNames = await caches.keys();
    const imsCaches = cacheNames.filter((name) => name.startsWith("ims-"));

    await Promise.all(imsCaches.map((cacheName) => caches.delete(cacheName)));

    console.log(`🧹 Cleared ${imsCaches.length} caches`);
    return true;
  } catch (error) {
    console.error("Failed to clear caches:", error);
    return false;
  }
};

/**
 * Get cache statistics
 * @returns {Promise<Object>} - Cache statistics
 */
export const getCacheStats = async () => {
  try {
    const cacheNames = await caches.keys();
    const imsCaches = cacheNames.filter((name) => name.startsWith("ims-"));

    const stats = {
      totalCaches: imsCaches.length,
      cacheNames: imsCaches,
      totalEntries: 0,
    };

    // Count entries in each cache
    for (const cacheName of imsCaches) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      stats.totalEntries += keys.length;
    }

    return stats;
  } catch (error) {
    console.error("Failed to get cache stats:", error);
    return null;
  }
};

export default {
  initializeCacheManager,
  cacheResponse,
  getCachedResponse,
  networkFirst,
  cacheFirst,
  staleWhileRevalidate,
  smartFetch,
  clearAllCaches,
  getCacheStats,
};
