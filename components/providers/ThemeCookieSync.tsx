"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/**
 * Synchronizes the current theme from next-themes into a cookie.
 * This allows the server to read the theme on the next request
 * and prevent theme flashing during SSR.
 */
export function ThemeCookieSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Determine the actual theme (handle 'system' value)
    const currentTheme = theme === "system" ? resolvedTheme : theme;

    if (currentTheme) {
      // Set cookie with 1 year expiry
      document.cookie = `theme=${currentTheme}; path=/; max-age=31536000; SameSite=Lax`;

      // Also update document element classes for immediate feedback if needed
      // (next-themes usually handles this, but good for safety)
      const isDark = currentTheme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = currentTheme;
    }
  }, [theme, resolvedTheme]);

  return null;
}
