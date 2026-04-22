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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted && resolvedTheme ? resolvedTheme : initialTheme;
  const currentTheme = activeTheme === "dark" ? darkTheme : lightTheme;

  return (
    <StyledEngineProvider injectFirst>
      <AppRouterCacheProvider options={{ key: "mui" }}>
        <MuiThemeProvider theme={currentTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </AppRouterCacheProvider>
    </StyledEngineProvider>
  );
}
