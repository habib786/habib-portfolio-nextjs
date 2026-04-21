"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedSquigglyLineProps {
  color?: string;
  width?: string;
  delay?: number;
}

export default function AnimatedSquigglyLine({
  color = "#FACC15",
  width = "100.5%",
  delay = 0.3,
}: AnimatedSquigglyLineProps) {
  return (
    <div
      style={{ height: 24, position: "absolute", bottom: -16, left: 0, width }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 30"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M2 20 L10 10 L18 24 L28 14 Q60 32 118 16"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeInOut" }}
        />
        <motion.path
          d="M6 17 L14 7 L22 21 L32 11 Q64 29 114 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
