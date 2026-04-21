"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import { Clock, Eye, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ProjectHeroProps {
  project: {
    title: string;
    category: string;
    excerpt: string;
    technologies: string[];
    thumbnail?: string;
    createdAt: string;
    views: number;
  };
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container ? { current: container } : undefined,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Box
      component="section"
      ref={setContainer}
      sx={{
        bgcolor: "var(--primary)",
        position: "relative",
        pt: { xs: 12, md: 18 },
        pb: { xs: 22, md: 30 },
        overflow: "hidden",
        color: "white",
      }}
    >
      <motion.div
        style={{
          y: yBg,
          opacity: 0.1,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V1000H0V600Z"
            fill="white"
            fillOpacity="0.05"
          />
          <path
            d="M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V1000H-100V700Z"
            fill="white"
            fillOpacity="0.03"
          />
        </svg>
      </motion.div>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div style={{ y: yContent, opacity: opacityFade }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
          >
            <Chip
              label={project.category}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
              }}
            />
          </Stack>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "4rem" },
              maxWidth: 900,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: 4, fontWeight: 400, opacity: 0.9, maxWidth: 800 }}
          >
            {project.excerpt}
          </Typography>

          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 3 }}>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "white",
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
