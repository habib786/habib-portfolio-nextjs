import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";

const getAnonKey = () =>
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const getUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL;

export const createClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl === "https://your-project-ref.supabase.co"
  ) {
    console.warn("Missing or invalid Supabase environment variables");
    return null;
  }

  try {
    const cookieStore = await cookies();

    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Ignore errors from Server Components
          }
        },
      },
    });
  } catch (error) {
    console.warn("Failed to create server client with cookies:", error);
    return null;
  }
};

const validateEnv = () => {
  const url = getUrl();
  const key = getAnonKey();
  if (!url || !key || url === "https://your-project-ref.supabase.co") {
    console.warn("Missing or invalid Supabase environment variables");
    return null;
  }
  return { url, key };
};

export const createAnonClient = () => {
  const env = validateEnv();
  if (!env) return null;
  return createSupabaseJsClient(env.url, env.key);
};
