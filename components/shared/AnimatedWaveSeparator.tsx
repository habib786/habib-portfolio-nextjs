"use client";

import React from "react";
import { Box } from "@mui/material";

interface AnimatedWaveSeparatorProps {
  color?: string;
  height?: number | object;
  backgroundColor?: string;
}

export default function AnimatedWaveSeparator({
  color = "var(--background)",
  height = { xs: 80, md: 120 },
  backgroundColor = "transparent",
}: AnimatedWaveSeparatorProps) {
  const waveStyle = (
    dur: string,
    dir: "normal" | "reverse",
    opacity: number,
    h: string
  ) => ({
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    width: "200%",
    height: h,
    opacity,
    display: "flex",
    animation: `waveMarch ${dur} linear infinite ${dir === "reverse" ? "reverse" : "normal"}`,
    willChange: "transform",
  });

  return (
    <Box
      className="wave-separator"
      sx={{
        position: "absolute",
        bottom: -1,
        left: 0,
        right: 0,
        width: "100%",
        height: height,
        overflow: "hidden",
        lineHeight: 0,
        zIndex: 2,
        bgcolor: backgroundColor,
        direction: "ltr !important",
        "@keyframes waveMarch": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: "100%", direction: "ltr" }}>
        {/* Wave Layer 1 */}
        <Box sx={waveStyle("25s", "normal", 0.3, "100%")}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "50.1%", height: "100%", display: "block" }}>
            <path d="M0,60 C300,100 900,20 1200,60 V120 H0 Z" fill={color} />
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "50.1%", height: "100%", display: "block", marginLeft: "-0.1%" }}>
            <path d="M0,60 C300,100 900,20 1200,60 V120 H0 Z" fill={color} />
          </svg>
        </Box>

        {/* Wave Layer 2 */}
        <Box sx={waveStyle("20s", "reverse", 0.5, "90%")}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "50.1%", height: "100%", display: "block" }}>
            <path d="M0,60 C400,20 800,100 1200,60 V120 H0 Z" fill={color} />
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "50.1%", height: "100%", display: "block", marginLeft: "-0.1%" }}>
            <path d="M0,60 C400,20 800,100 1200,60 V120 H0 Z" fill={color} />
          </svg>
        </Box>

        {/* Wave Layer 3 */}
        <Box sx={waveStyle("15s", "normal", 1, "80%")}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "50.1%", height: "100%", display: "block" }}>
            <path d="M0,60 C300,10 900,110 1200,60 V120 H0 Z" fill={color} />
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "50.1%", height: "100%", display: "block", marginLeft: "-0.1%" }}>
            <path d="M0,60 C300,10 900,110 1200,60 V120 H0 Z" fill={color} />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
