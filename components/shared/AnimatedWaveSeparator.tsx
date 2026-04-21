"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";

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
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "200%",
          height: "100%",
          left: 0,
          right: "auto",
          display: "flex",
          flexDirection: "row",
          direction: "ltr",
        }}
      >
        {/* Wave Layer 1 (Back) */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.3,
            display: "flex",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ width: "50.1%", height: "100%", display: "block" }}
          >
            <path d="M0,60 C300,100 900,20 1200,60 V120 H0 Z" fill={color} />
          </svg>
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              width: "50.1%",
              height: "100%",
              display: "block",
              marginLeft: "-0.1%",
            }}
          >
            <path d="M0,60 C300,100 900,20 1200,60 V120 H0 Z" fill={color} />
          </svg>
        </motion.div>

        {/* Wave Layer 2 (Middle) */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "90%",
            opacity: 0.5,
            display: "flex",
          }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ width: "50.1%", height: "100%", display: "block" }}
          >
            <path d="M0,60 C400,20 800,100 1200,60 V120 H0 Z" fill={color} />
          </svg>
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              width: "50.1%",
              height: "100%",
              display: "block",
              marginLeft: "-0.1%",
            }}
          >
            <path d="M0,60 C400,20 800,100 1200,60 V120 H0 Z" fill={color} />
          </svg>
        </motion.div>

        {/* Wave Layer 3 (Front - Solid) */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80%",
            display: "flex",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ width: "50.1%", height: "100%", display: "block" }}
          >
            <path d="M0,60 C300,10 900,110 1200,60 V120 H0 Z" fill={color} />
          </svg>
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              width: "50.1%",
              height: "100%",
              display: "block",
              marginLeft: "-0.1%",
            }}
          >
            <path d="M0,60 C300,10 900,110 1200,60 V120 H0 Z" fill={color} />
          </svg>
        </motion.div>
      </Box>
    </Box>
  );
}
