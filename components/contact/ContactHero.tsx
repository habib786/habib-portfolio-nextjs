"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AnimatedSquigglyLine from "@/components/animations/AnimatedSquigglyLine";
import AnimatedWaveSeparator from "@/components/shared/AnimatedWaveSeparator";
import WavyHeroBackground from "@/components/shared/WavyHeroBackground";

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
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <WavyHeroBackground />
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
                      width={340}
                      height={420}
                      className="object-cover object-top w-full h-full"
                      priority
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
