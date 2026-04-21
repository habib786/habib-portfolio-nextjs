"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        lerp: 0.05,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
