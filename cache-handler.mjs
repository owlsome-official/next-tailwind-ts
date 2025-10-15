import { CacheHandler } from "@fortedigital/nextjs-cache-handler";
import createCompositeHandler from "@fortedigital/nextjs-cache-handler/composite";
import createLruHandler from "@fortedigital/nextjs-cache-handler/local-lru";
import createRedisHandler from "@fortedigital/nextjs-cache-handler/redis-strings";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { createClient } from "redis";

/*
NOTE: description of process.env in this file
- REDIS_URL: Redis URL (e.g. "redis://localhost:6379/0")
- REDIS_KEY_PREFIX: Redis key prefix (default: "nextjs:")
- NEXT_PHASE: a Next.js environment variable, actual Next.js phase
- NEXT_PRIVATE_DEBUG_CACHE: a Next.js environment variable if true, enable debug mode (e.g. true)
*/

CacheHandler.onCreation(() => {
  console.info({
    event: "cache-handler",
    action: "onCreation",
  });

  // Important - It's recommended to use global scope to ensure only one Redis connection is made
  // This ensures only one instance get created
  if (global.cacheHandlerConfig) {
    return global.cacheHandlerConfig;
  }

  // Important - It's recommended to use global scope to ensure only one Redis connection is made
  // This ensures new instances are not created in a race condition
  if (global.cacheHandlerConfigPromise) {
    return global.cacheHandlerConfigPromise;
  }

  // You may need to ignore Redis locally, remove this block otherwise
  if (process.env.NODE_ENV === "development" || !process.env.REDIS_URL) {
    const lruCache = createLruHandler();
    console.info({
      event: "cache-handler",
      action: "Using LRU cache only",
    });
    return { handlers: [lruCache] };
  }

  // Main promise initializing the handler
  global.cacheHandlerConfigPromise = (async () => {
    let redisClient = null;

    if (PHASE_PRODUCTION_BUILD !== process.env.NEXT_PHASE) {
      const settings = {
        url: process.env.REDIS_URL,
        pingInterval: 10000,
      };
      console.info({
        event: "cache-handler",
        config: settings,
        action: "Connecting to Redis",
      });

      try {
        redisClient = createClient(settings);
        redisClient.on("error", (e) => {
          if (typeof process.env.NEXT_PRIVATE_DEBUG_CACHE !== "undefined") {
            console.warn("Redis error", e);
          }
          global.cacheHandlerConfig = null;
          global.cacheHandlerConfigPromise = null;
        });
      } catch (error) {
        console.warn("Failed to create Redis client:", error);
      }
    }

    if (redisClient) {
      try {
        await redisClient.connect();
        console.info({
          event: "cache-handler",
          action: "Redis client connected",
        });
      } catch (error) {
        console.warn("Failed to connect Redis client:", error);
        await redisClient
          .close()
          .catch((e) =>
            console.warn(
              "Failed to quit the Redis client after failing to connect.",
              e,
            ),
          );
      }
    }

    const lruCache = createLruHandler();

    if (!redisClient?.isReady) {
      console.error("Failed to initialize caching layer.");
      global.cacheHandlerConfigPromise = null;
      global.cacheHandlerConfig = { handlers: [lruCache] };
      console.info({
        event: "cache-handler",
        action: "Using LRU cache only, due to Redis client not ready",
      });
      return global.cacheHandlerConfig;
    }

    const redisCacheHandler = createRedisHandler({
      client: redisClient,
      keyPrefix: process.env.REDIS_KEY_PREFIX ?? "nextjs:",
    });

    global.cacheHandlerConfigPromise = null;

    // This example uses composite handler to switch from Redis to LRU cache if tags contains `memory-cache` tag.
    // You can skip composite and use Redis or LRU only.
    global.cacheHandlerConfig = {
      handlers: [
        createCompositeHandler({
          handlers: [lruCache, redisCacheHandler],
          setStrategy: (ctx) => (ctx?.tags.includes("memory-cache") ? 0 : 1), // You can adjust strategy for deciding which cache should the composite use
        }),
      ],
    };

    console.info({
      event: "cache-handler",
      action: "Using Redis cache and LRU cache",
    });
    return global.cacheHandlerConfig;
  })();

  return global.cacheHandlerConfigPromise;
});

export default CacheHandler;
