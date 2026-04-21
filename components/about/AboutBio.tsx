"use client";

import React, { useRef, useEffect } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Counter from "../animations/Counter";

const infoItems = [
  { label: "CITY", value: "URBAN CITY" },
  { label: "EMAIL", value: "CONTACT@HABIB.COM" },
  { label: "DEGREE", value: "MS CS BS" },
  { label: "ADDRESS", value: "PUNJAB, PK" },
  { label: "NATIONALITY", value: "PAKISTAN" },
  { label: "FREELANCE", value: "AVAILABLE" },
];

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

import SectionHeading from "../ui/SectionHeading";

export default function AboutBio() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <Box
      component="section"
      ref={containerRef}
      sx={{
        py: 12,
        bgcolor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating decorative blobs */}
      <motion.div
        style={{ y: blobY1, scale: blobScale }}
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,106,90,0.08) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: blobY2, scale: blobScale }}
        className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionHeading
          title="HABIB"
          subtitle="FULL-STACK DEVELOPER"
          variant="h3"
          sx={{ mb: 4 }}
        />

        {/* Bio paragraphs */}
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1 }}
            >
              <Typography
                variant="body1"
                sx={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.8, mb: 3 }}
              >
                Full Stack Web Developer with <Counter value="7+" /> years of
                experience in the industry. I am a highly motivated and
                determined individual who is always looking for new challenges.
                I have a strong background in web development, and I am always
                looking for new ways to improve my skills. I am a team player
                and I am always willing to help others.
              </Typography>
            </motion.div>

            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.22 }}
            >
              <Typography
                variant="body1"
                sx={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.8, mb: 4 }}
              >
                I have experience working with a variety of technologies,
                including React, Next.js, TypeScript, Python, and more. I am
                also experienced in working with databases, such as PostgreSQL
                and MongoDB.
              </Typography>
            </motion.div>
          </Grid>

          {/* Stats column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={slideRight}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderLeft: "4px solid #106A5A",
                      bgcolor: "rgba(16,106,90,0.04)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        color: "#106A5A",
                        lineHeight: 1,
                      }}
                    >
                      <Counter value={stat.value} />
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(0,0,0,0.55)",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </motion.div>
          </Grid>
        </Grid>

        {/* Info grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Grid container spacing={3} sx={{ mt: 6 }}>
            {infoItems.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.label}>
                <motion.div variants={itemVariants} custom={i}>
                  <Box
                    sx={{
                      bgcolor: "#fafafa",
                      borderRadius: 2,
                      p: 3,
                      border: "1px solid rgba(0,0,0,0.06)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "white",
                        borderColor: "#106A5A",
                        boxShadow: "0 8px 24px rgba(16,106,90,0.12)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#106A5A",
                        letterSpacing: 1.5,
                        display: "block",
                        mb: 1.5,
                        fontSize: "0.7rem",
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0,0,0,0.85)",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      {item.label === "AGE" ? (
                        <Counter value={item.value} />
                      ) : (
                        item.value
                      )}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
