import settingsFallback from "./fallback/settings.json";
import languagesFallback from "./fallback/languages.json";
import menuItemsFallback from "./fallback/menu_items.json";
import pagesFallback from "./fallback/pages.json";
import blogPostsFallback from "./fallback/blog_posts.json";
import projectsFallback from "./fallback/projects.json";

const TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

export type FallbackData = Record<string, unknown>[];

const fallbackDataMap: Record<string, FallbackData> = {
  settings: settingsFallback,
  languages: languagesFallback,
  menu_items: menuItemsFallback,
  pages: pagesFallback,
  blog_posts: blogPostsFallback,
  projects: projectsFallback,
};

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Query timeout after ${ms}ms`)), ms),
    ),
  ]);
}

function isRetryableError(error: unknown): boolean {
  if (!error) return false;
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("timeout") ||
    message.includes("network") ||
    message.includes("fetch failed") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ETIMEDOUT")
  );
}

export async function resilientQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: unknown }>,
  fallbackKey: string,
  defaultValue: T,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await withTimeout(queryFn(), TIMEOUT_MS);

      if (result.error) {
        lastError = result.error;

        if (!isRetryableError(result.error) || attempt === MAX_RETRIES) {
          break;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 500 * (attempt + 1)),
        );
        continue;
      }

      if (result.data !== null) {
        return result.data as T;
      }

      lastError = new Error("No data returned");
      break;
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error) || attempt === MAX_RETRIES) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }

  console.warn(
    `Supabase query failed after ${MAX_RETRIES + 1} attempts, using fallback:`,
    lastError,
  );

  const fallback = fallbackDataMap[fallbackKey];
  if (fallback) {
    return fallback as T;
  }

  return defaultValue;
}

export async function resilientQueryArray<T>(
  queryFn: () => Promise<{ data: T[] | null; error: unknown }>,
  fallbackKey: string,
  defaultValue: T[] = [],
): Promise<T[]> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await withTimeout(queryFn(), TIMEOUT_MS);

      if (result.error) {
        lastError = result.error;

        if (!isRetryableError(result.error) || attempt === MAX_RETRIES) {
          break;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 500 * (attempt + 1)),
        );
        continue;
      }

      if (result.data !== null && Array.isArray(result.data)) {
        return result.data as T[];
      }

      lastError = new Error("No data returned");
      break;
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error) || attempt === MAX_RETRIES) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }

  console.warn(
    `Supabase query failed after ${MAX_RETRIES + 1} attempts, using fallback:`,
    lastError,
  );

  const fallback = fallbackDataMap[fallbackKey];
  if (fallback) {
    return fallback as T[];
  }

  return defaultValue;
}

export async function resilientQuerySingle<T>(
  queryFn: () => Promise<{ data: T | null; error: unknown }>,
  fallbackKey: string,
  defaultValue: T | null = null,
): Promise<T | null> {
  const fallback = fallbackDataMap[fallbackKey];
  const fallbackSingle = fallback?.[0] as T | undefined;

  return resilientQuery(queryFn, fallbackKey, fallbackSingle ?? defaultValue);
}
