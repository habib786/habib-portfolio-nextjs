"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Box } from "@mui/material";

interface Client {
  name: string;
  icon: string;
  logo_type: string;
  color_class: string;
}

interface ClientsMarqueeProps {
  clients: Client[];
}

export default function ClientsMarquee({ clients }: ClientsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef({ left: 0, top: 0, width: 1, height: 1 });
  const [isHovered, setIsHovered] = useState(false);

  // Removed heavy Framer Motion scroll tracking for performance

  // Removed heavy Framer Motion mouse tracking for performance

  // Double the clients array to create a seamless loop
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-20 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-20 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        <Box
          className="flex items-center gap-12 md:gap-24 w-max"
          sx={{
            animation: "marqueeScroll 50s linear infinite",
            willChange: "transform",
            "&:hover": { animationPlayState: "paused" },
            "@keyframes marqueeScroll": {
              "0%": { transform: "translateX(0%)" },
              "100%": { transform: "translateX(-33.33%)" },
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className={`flex items-center gap-4 md:gap-6 font-black ${client.color_class} tracking-tight opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 group px-8 py-4 rounded-full hover:bg-gray-100/30 active:scale-95 hover:scale-110 hover:rotate-1`}
              aria-hidden={index >= clients.length ? "true" : "false"}
            >
              {client.logo_type === "text" && (
                <>
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 border-2 border-current rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-[0_20px_40px_-10px_rgba(16,106,90,0.3)] group-hover:rotate-6"
                  >
                    <span className="font-black text-sm md:text-base">
                      {client.icon?.charAt(0) || client.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-extrabold text-2xl md:text-4xl uppercase whitespace-nowrap tracking-tighter drop-shadow-sm group-hover:drop-shadow-md">
                    {client.name}
                  </span>
                </>
              )}
              {client.logo_type === "image" && (
                <Image
                  src={client.icon}
                  alt={client.name}
                  width={80}
                  height={80}
                  className="h-12 md:h-20 object-contain transition-all duration-500 group-hover:drop-shadow-2xl group-hover:scale-110"
                />
              )}
            </div>
          ))}
        </Box>
      </div>

      {/* Decorative background text for extra parallax depth */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-100/50 text-[12rem] font-black pointer-events-none select-none z-0 whitespace-nowrap hidden md:block"
        aria-hidden="true"
      >
        TRUSTED BY GLOBAL BRANDS
      </div>
    </div>
  );
}
