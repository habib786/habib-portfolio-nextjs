import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000,
  maxRequests: 10,
};

export function createRateLimitMiddleware(
  config: Partial<RateLimitConfig> = {},
) {
  const { windowMs, maxRequests } = { ...DEFAULT_CONFIG, ...config };

  return (request: NextRequest) => {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const key = ip;
    const now = Date.now();

    let entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs };
      store.set(key, entry);
    }

    entry.count++;

    if (entry.count > maxRequests) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    return null;
  };
}

export function cleanExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}

setInterval(cleanExpiredEntries, 60 * 1000);
