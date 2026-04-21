"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "next-themes";
import { lightTheme, darkTheme } from "@/lib/mui-theme";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return "dark";
    if (stored === "light") return "light";
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
  } catch {}
  return "light";
}

export function MuiProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(() =>
    typeof window !== "undefined" ? getInitialTheme() : "light",
  );
  const [clientMounted, setClientMounted] = React.useState(false);

  React.useEffect(() => {
    setClientMounted(true);
  }, []);

  const currentTheme =
    (clientMounted ? resolvedTheme : mounted) === "dark"
      ? darkTheme
      : lightTheme;

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
