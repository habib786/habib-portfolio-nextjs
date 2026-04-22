"use client";

import { Box } from "@mui/material";

type WavyHeroBackgroundProps = {
  animated?: boolean;
};

export default function WavyHeroBackground({
  animated = true,
}: WavyHeroBackgroundProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        opacity: 0.2,
        pointerEvents: "none",
        zIndex: 0,
        "& svg": { width: "100%", height: "100%" },
        "& .wave-path": animated
          ? {
              transformOrigin: "center",
              animation: "waveFloat 14s ease-in-out infinite alternate",
              willChange: "transform",
            }
          : {},
        "@keyframes waveFloat": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(18px)" },
        },
        "& .wave-path:nth-of-type(2)": { animationDelay: "-3s", animationDuration: "17s" },
        "& .wave-path:nth-of-type(3)": { animationDelay: "-6s", animationDuration: "20s" },
        "& .wave-path:nth-of-type(4)": { animationDelay: "-9s", animationDuration: "23s" },
        "& .wave-path:nth-of-type(5)": { animationDelay: "-12s", animationDuration: "26s" },
        "& .wave-fill-1": animated
          ? {
              animation: "waveFillFloat 15s ease-in-out infinite alternate",
              willChange: "transform",
            }
          : {},
        "& .wave-fill-2": animated
          ? {
              animation: "waveFillFloat 20s ease-in-out infinite alternate-reverse",
              willChange: "transform",
            }
          : {},
        "@keyframes waveFillFloat": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(20px)" },
        },
      }}
    >
      <svg
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            className="wave-path"
            d={`M0 ${150 + i * 40} C 360 ${100 + i * 40} 1080 ${200 + i * 40} 1440 ${150 + i * 40}`}
            stroke="white"
            strokeWidth={0.5 + i * 0.3}
            opacity={0.4 - i * 0.05}
          />
        ))}
        <path
          className="wave-fill-1"
          d="M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V800H0V600Z"
          fill="white"
          fillOpacity="0.08"
        />
        <path
          className="wave-fill-2"
          d="M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V800H-100V700Z"
          fill="white"
          fillOpacity="0.05"
        />
      </svg>
    </Box>
  );
}
