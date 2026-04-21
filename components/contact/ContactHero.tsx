"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Container, Typography, Grid } from "@mui/material";
import AnimatedSquigglyLine from "@/components/animations/AnimatedSquigglyLine";
import AnimatedWaveSeparator from "@/components/shared/AnimatedWaveSeparator";

export default function ContactHero({
  profileImage,
}: {
  profileImage: string;
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container ? { current: container } : undefined,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Box
      ref={setContainer}
      id="contact-hero"
      sx={{
        bgcolor: "var(--primary)",
        position: "relative",
        pt: { xs: 12, md: 20 },
        pb: { xs: 20, md: 35 }, // Increased padding for wave
        color: "white",
      }}
    >
      {/* Wavy SVG Background Decor - Now wrapped in overflow:hidden Box */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            animate={{ x: [-50, 50], y: [-20, 20], rotate: [0, 2, 0] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            d="M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V1000H0V600Z"
            fill="white"
            fillOpacity="0.05"
          />
          <motion.path
            animate={{ x: [50, -50], y: [20, -20], rotate: [0, -2, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            d="M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V1000H-100V700Z"
            fill="white"
            fillOpacity="0.03"
          />
          <motion.path
            animate={{ x: [-100, 100] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            d="M0 200 Q 360 400 720 200 T 1440 200"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="20 20"
            opacity="0.2"
          />
          <motion.path
            animate={{ x: [100, -100] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            d="M0 300 Q 360 500 720 300 T 1440 300"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="10 10"
            opacity="0.1"
          />
        </svg>
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          sx={{ alignItems: "center" }}
          spacing={{ xs: 6, md: 4 }}
        >
          {/* Left: Animated Title */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
                    lineHeight: 1,
                    textTransform: "uppercase",
                    mb: 2,
                    textShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    fontFamily: "inherit",
                  }}
                >
                  CONTACT
                  <br />
                  ME
                </Typography>
                <AnimatedSquigglyLine width="100%" delay={0.3} />
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 4,
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "1.15rem",
                    lineHeight: 1.7,
                    maxWidth: 560,
                  }}
                >
                  Whether you have a project in mind, want to discuss a
                  collaboration, or just want to say hi, I'm always open to new
                  connections.
                </Typography>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right: Portrait — Arch/Shield Shape to differentiate it from others */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              position: "relative",
            }}
          >
            <motion.div
              style={{
                y: yImage,
                scale: scaleImage,
                opacity: opacityHero,
                position: "relative",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
                style={{ position: "relative", width: 340, height: 420 }}
              >
                <motion.div
                  animate={{ rotate: [-1, 1, -1], y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Background Yellow Offset */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -15,
                      right: -15,
                      width: "100%",
                      height: "100%",
                      bgcolor: "#FACC15",
                      borderRadius: "160px 160px 20px 20px",
                      zIndex: 0,
                    }}
                  />
                  {/* Image Container */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                      overflow: "hidden",
                      borderRadius: "160px 160px 20px 20px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      border: "4px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Image
                      src={profileImage}
                      alt="Habib"
                      fill
                      priority
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </Box>
                </motion.div>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Wave Decor - Animated Layered Waves */}
      <AnimatedWaveSeparator />
    </Box>
  );
}
