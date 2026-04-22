"use client";

import React, { useRef, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Counter from "../animations/Counter";
import AnimatedSquigglyLine from "@/components/animations/AnimatedSquigglyLine";
import AnimatedWaveSeparator from "@/components/shared/AnimatedWaveSeparator";
import WavyHeroBackground from "@/components/shared/WavyHeroBackground";

/**
 * Visual layer stack (z-order, back → front):
 *  [0] Large yellow circle — centred behind photo, larger than card width, pokes above & sides
 *  [1] Decorative offset ring — drifts down on scroll (slower)
 *  [2] Portrait photo rect — moves up fastest (classic foreground parallax)
 */
export default function AboutHero({ profileImage }: { profileImage: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opTitle = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yLines = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yCircle = useTransform(scrollYProgress, [0, 1], [0, -35]); // slowest
  const yRing = useTransform(scrollYProgress, [0, 1], [0, 28]); // drifts down
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, -110]); // fastest
  const scImg = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <Box
      component="section"
      ref={containerRef}
      sx={{
        bgcolor: "#106A5A",
        backgroundImage: "linear-gradient(135deg, #106A5A 0%, #0d594b 100%)",
        color: "white",
        pt: { xs: 10, md: 14 },
        pb: { xs: 6, md: 6 },
        position: "relative",
        overflow: "hidden",
        minHeight: { md: "72vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Soft glow blobs ── */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          right: "8%",
          width: 340,
          height: 340,
          bgcolor: "#FACC15",
          filter: "blur(160px)",
          opacity: 0.07,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-5%",
          left: "3%",
          width: 260,
          height: 260,
          bgcolor: "#FACC15",
          filter: "blur(120px)",
          opacity: 0.05,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        style={{ y: yLines, position: "absolute", inset: 0 }}
        className="pointer-events-none"
      >
        <WavyHeroBackground />
      </motion.div>

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 8, md: 4 },
          }}
        >
          {/* ══ Heading ══ */}
          <motion.div style={{ y: yTitle, opacity: opTitle }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3.5rem", md: "5.5rem" },
                  fontWeight: 900,
                  mb: 2,
                  lineHeight: 1,
                  textTransform: "uppercase",
                  textShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                ABOUT ME
              </Typography>
              <AnimatedSquigglyLine width="100%" delay={0.4} />
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 500,
                  maxWidth: 340,
                  lineHeight: 1.75,
                  letterSpacing: 0.4,
                }}
              >
                Full Stack Developer · <Counter value="7+" /> Years · Building
                the future, one line of code at a time.
              </Typography>
            </motion.div>
          </motion.div>

          {/* ══ Picture Stack ══ */}
          <Box
            sx={{
              position: "relative",
              width: { xs: 270, md: 320 },
              height: { xs: 340, md: 400 },
              flexShrink: 0,
              overflow: "visible",
            }}
          >
            {/* ── Layer 0: Yellow circle centred behind the photo ── */}
            <motion.div
              style={
                {
                  y: yCircle,
                  zIndex: 0,
                  position: "absolute",
                  top: -110,
                  left: "50%",
                  x: "-50%",
                  width: 260,
                  height: 260,
                } as any
              }
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
              }}
            >
              {/* Floating pulse animation on the circle */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#FACC15",
                  boxShadow: "0 8px 60px rgba(250,204,21,0.35)",
                }}
              />
            </motion.div>

            {/* ── Layer 1: Decorative offset border ring ── */}
            <motion.div
              style={
                {
                  y: yRing,
                  position: "absolute",
                  top: 16,
                  right: -16,
                  width: "82%",
                  height: "86%",
                  border: "2px solid rgba(250,204,21,0.38)",
                  borderRadius: "14px",
                  zIndex: 1,
                  pointerEvents: "none",
                } as any
              }
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            />

            {/* ── Layer 2: Portrait photo (front) ── */}
            <motion.div
              style={
                {
                  y: yPhoto,
                  scale: scImg,
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                } as any
              }
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full"
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 28px 70px rgba(0,0,0,0.42)",
                    border: "3px solid rgba(255,255,255,0.14)",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
                    },
                  }}
                >
                  <Image
                    src={profileImage}
                    alt="Habib"
                    fill
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    sizes="(max-width: 768px) 270px, 320px"
                    priority
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "30%",
                      background:
                        "linear-gradient(to top, rgba(16,106,90,0.28), transparent)",
                      zIndex: 1,
                    }}
                  />
                </Box>
              </motion.div>
            </motion.div>
          </Box>
        </Box>
      </Container>
      <AnimatedWaveSeparator />
    </Box>
  );
}
