/**
 * Simple in-memory rate limiting for API routes
 * For production, consider using Redis or Upstash for distributed rate limiting
 */

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitStore>();

export interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests allowed in the time window
}

/**
 * Rate limit checker
 * Returns true if request should be allowed, false if rate limited
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {
    interval: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per minute
  }
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const key = identifier;
  
  // Get or create rate limit entry
  let entry = store.get(key);
  
  // Reset if time window has passed
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + options.interval,
    };
    store.set(key, entry);
  }
  
  // Check if under limit
  if (entry.count < options.maxRequests) {
    entry.count++;
    return {
      success: true,
      remaining: options.maxRequests - entry.count,
      reset: entry.resetTime,
    };
  }
  
  // Rate limited
  return {
    success: false,
    remaining: 0,
    reset: entry.resetTime,
  };
}

/**
 * Get client identifier from request (IP address)
 */
export function getClientIdentifier(req: Request): string {
  // Try to get real IP from various headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // Fallback
  return 'unknown';
}

/**
 * Clean up old entries periodically
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
