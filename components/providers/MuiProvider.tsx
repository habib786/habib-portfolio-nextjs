"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "next-themes";
import { lightTheme, darkTheme } from "@/lib/mui-theme";

import { StyledEngineProvider } from "@mui/material/styles";

export function MuiProvider({
  children,
  initialTheme = "light",
}: {
  children: React.ReactNode;
  initialTheme?: "light" | "dark";
}) {
  // Use initialTheme for stable hydration, next-themes will update it if needed
  const currentTheme = initialTheme === "dark" ? darkTheme : lightTheme;

  return (
    <StyledEngineProvider injectFirst>
      <AppRouterCacheProvider options={{ key: "mui", prepend: true }}>
        <MuiThemeProvider theme={currentTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </AppRouterCacheProvider>
    </StyledEngineProvider>
  );
}
