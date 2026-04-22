"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothXTranslate = useSpring(xTranslate, {
    stiffness: 100,
    damping: 30,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateRect = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    }
  }, []);

  useEffect(() => {
    updateRect();
    const observer = new ResizeObserver(updateRect);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateRect]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = rectRef.current;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const itemX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  });
  const itemY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 100,
    damping: 30,
  });

  // Double the clients array to create a seamless loop
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-20 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-20 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

      <motion.div
        style={{ x: smoothXTranslate }}
        className="flex flex-col gap-4 relative z-10"
      >
        <motion.div
          className="flex items-center gap-12 md:gap-24 w-max"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedClients.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              style={{
                x: itemX,
                y: itemY,
              }}
              className={`flex items-center gap-4 md:gap-6 font-black ${client.color_class} tracking-tight opacity-20 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0 group px-8 py-4 rounded-full hover:bg-gray-100/30 active:scale-95`}
              whileHover={{
                scale: 1.2,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.2, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: (index % clients.length) * 0.05,
              }}
            >
              {client.logo_type === "text" && (
                <>
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 border-2 border-current rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-[0_20px_40px_-10px_rgba(16,106,90,0.3)]"
                    whileHover={{ rotate: [-5, 5, -5, 5, 0] }}
                  >
                    <span className="font-black text-sm md:text-base">
                      {client.icon?.charAt(0) || client.name.charAt(0)}
                    </span>
                  </motion.div>
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative background text for extra parallax depth */}
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-100/50 text-[12rem] font-black pointer-events-none select-none z-0 whitespace-nowrap hidden md:block"
      >
        TRUSTED BY GLOBAL BRANDS
      </motion.div>
    </div>
  );
}
