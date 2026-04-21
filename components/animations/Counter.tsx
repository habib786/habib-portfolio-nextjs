"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface CounterProps {
  value: string;
  duration?: number;
}

export default function Counter({ value, duration = 2 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parse numeric part and suffix
  const numericMatch = value.match(/(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, "");

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => setDisplayValue(Math.round(value)),
      });
      return controls.stop;
    }
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
