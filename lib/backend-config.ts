/**
 * Backend Configuration
 * Contains configuration variables for backend services
 * For the static site, caching is enabled by default
 */

// Hardcoded variable to disable caching in the backend (false = caching enabled by default for static site)
export const DISABLE_CACHE = false;

// Alternative configuration object approach
export const BACKEND_CONFIG = {
  cache: {
    enabled: !DISABLE_CACHE, // Invert the disable flag to get enable flag
    ttl: 3600, // Time to live in seconds (default: 1 hour)
  },
  // Other backend configurations can be added here
} as const;