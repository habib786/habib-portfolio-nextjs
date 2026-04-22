"use client";

import { Box } from "@mui/material";
import { motion, type Variants } from "framer-motion";

type WavyHeroBackgroundProps = {
  animated?: boolean;
};

export default function WavyHeroBackground({
  animated = true,
}: WavyHeroBackgroundProps) {
  const waveVariants: Variants = {
    animate: (i: number) => ({
      d: [
        `M0 ${150 + i * 40} C ${360 + (i % 2 === 0 ? 100 : -100)} ${50 + i * 40} ${1080 + (i % 2 === 0 ? -100 : 100)} ${250 + i * 40} 1440 ${150 + i * 40}`,
        `M0 ${150 + i * 40} C ${360 + (i % 2 === 0 ? -100 : 100)} ${250 + i * 40} ${1080 + (i % 2 === 0 ? 100 : -100)} ${50 + i * 40} 1440 ${150 + i * 40}`,
        `M0 ${150 + i * 40} C ${360 + (i % 2 === 0 ? 100 : -100)} ${50 + i * 40} ${1080 + (i % 2 === 0 ? -100 : 100)} ${250 + i * 40} 1440 ${150 + i * 40}`,
      ],
      transition: {
        duration: 12 + i * 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        opacity: 0.2, // Slightly increased for visibility
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            custom={i}
            variants={animated ? waveVariants : {}}
            animate={animated ? "animate" : undefined}
            d={`M0 ${150 + i * 40} C 360 ${100 + i * 40} 1080 ${200 + i * 40} 1440 ${150 + i * 40}`}
            stroke="white"
            strokeWidth={0.5 + i * 0.3}
            opacity={0.4 - i * 0.05}
          />
        ))}

        {/* Floating gradient-filled waves at bottom */}
        <motion.path
          animate={
            animated
              ? {
                  d: [
                    "M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V800H0V600Z",
                    "M0 600C400 700 800 500 1200 600C1400 650 1440 600 1440 600V800H0V600Z",
                    "M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V800H0V600Z",
                  ],
                }
              : {}
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          d="M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V800H0V600Z"
          fill="white"
          fillOpacity="0.08"
        />
        <motion.path
          animate={
            animated
              ? {
                  d: [
                    "M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V800H-100V700Z",
                    "M-100 700C300 850 800 550 1300 700C1500 760 1600 700 1600 700V800H-100V700Z",
                    "M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V800H-100V700Z",
                  ],
                }
              : {}
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          d="M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V800H-100V700Z"
          fill="white"
          fillOpacity="0.05"
        />
      </svg>
    </Box>
  );
}
