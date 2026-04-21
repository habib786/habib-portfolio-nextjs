"use client";

import { Box, Skeleton } from "@mui/material";

export function LoadingFallback() {
  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center"
      sx={{
        gap: 4,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "radial-gradient(ellipse at center, rgba(30,30,40,1) 0%, rgba(10,10,15,1) 100%)"
            : "radial-gradient(ellipse at center, rgba(252,252,255,1) 0%, rgba(245,245,250,1) 100%)",
        "@keyframes habibPulse": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.25 },
          "50%": { transform: "scale(1.05)", opacity: 0.55 },
        },
        "@keyframes habibShimmer": {
          "0%": { transform: "translateX(-80%)" },
          "100%": { transform: "translateX(80%)" },
        },
      }}
    >
      <Box sx={{ position: "relative", width: 80, height: 80 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid",
            borderColor: "primary.main",
            opacity: 0.3,
            animation: "habibPulse 2s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "primary.main",
            opacity: 0.5,
            animation: "habibPulse 2s ease-in-out infinite 0.3s",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 16,
            bgcolor: "primary.main",
            borderRadius: "50%",
            opacity: 0.8,
            animation: "habibPulse 2s ease-in-out infinite 0.6s",
          }}
        />
      </Box>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Skeleton
          variant="text"
          width={220}
          height={34}
          sx={{
            bgcolor: "rgba(120, 120, 120, 0.12)",
            borderRadius: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255, 0.08), transparent)",
            animation: "habibShimmer 2s ease-in-out infinite",
          }}
        />
      </Box>
    </Box>
  );
}
