"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Counter from "@/components/animations/Counter";
import AnimatedWaveSeparator from "@/components/shared/AnimatedWaveSeparator";
import WavyHeroBackground from "@/components/shared/WavyHeroBackground";
import { getLocalizedHref } from "@/lib/utils";
const MB = motion(Box);
export default function HeroSection({
  dict,
  profile,
}: {
  dict?: any;
  profile?: any;
}) {
  const p = usePathname();
  const d = {
    name: "HABIB",
    role: "Full Stack Web Developer",
    experience: "7+",
    projects: "70+",
    clients: "30+",
    image:
      "https://xvwxwrrqopcyzsnrwxbf.supabase.co/storage/v1/object/public/habib-portfolio-bucket/habib_professional_suit.webp",
  };
  const f = profile || d;
  const r = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s } = useScroll({
    target: r,
    offset: ["start start", "end start"],
  });
  const yt = useTransform(s, [0, 1], [0, 200]);
  const yi = useTransform(s, [0, 1], [0, -100]);
  const ys = useTransform(s, [0, 1], [0, 150]);
  const o = useTransform(s, [0, 0.8], [1, 0]);
  const sc = useTransform(s, [0, 1], [1, 0.9]);
  const yp = useTransform(s, [0, 1], [0, 150]);
  return (
    <Box
      component="section"
      ref={r}
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: "primary.main",
        backgroundImage: "linear-gradient(135deg,#106A5A 0%,#0d594b 100%)",
        py: { xs: 8, md: 0 },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        isolation: "isolate",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          insetInlineEnd: "5%",
          width: 300,
          height: 300,
          bgcolor: "secondary.main",
          filter: "blur(150px)",
          opacity: 0.15,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          insetInlineStart: "5%",
          width: 400,
          height: 400,
          bgcolor: "secondary.main",
          filter: "blur(150px)",
          opacity: 0.1,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <motion.div
        style={{
          y: yp,
          zIndex: 0,
          insetInlineStart: 0,
          insetInlineEnd: 0,
          position: "absolute",
          inset: 0,
        }}
        className="pointer-events-none"
      >
        <WavyHeroBackground />
      </motion.div>
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 10, width: "100%" }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div style={{ y: yt, opacity: o }}>
              <Typography
                variant="subtitle1"
                component="span"
                sx={{
                  color: "secondary.main",
                  fontWeight: 600,
                  mb: 1,
                  display: "inline-block",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {dict?.hero?.greeting || "Hey, my name is"}
              </Typography>
              <Box sx={{ position: "relative", width: "fit-content" }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
                    lineHeight: 1,
                    textTransform: "uppercase",
                    mb: 2,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,.1))",
                    zIndex: 2,
                  }}
                >
                  {f.name}
                </Typography>
                <div
                  style={{
                    height: 24,
                    position: "absolute",
                    bottom: -16,
                    insetInlineStart: 0,
                    insetInlineEnd: 0,
                    width: "100.5%",
                    zIndex: 1,
                  }}
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
                      stroke="#FACC15"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.path
                      d="M6 17 L14 7 L22 21 L32 11 Q64 29 114 13"
                      stroke="#FACC15"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity=".6"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.6,
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </div>
              </Box>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2, alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "secondary.main",
                    borderRadius: "50%",
                    boxShadow: "0 0 15px #FACC15",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: "#BBEAD0",
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontSize: { xs: ".8rem", md: "1rem" },
                  }}
                >
                  {f.role}
                </Typography>
              </Stack>
              <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  href={getLocalizedHref("/projects", p)}
                  sx={{
                    bgcolor: "secondary.main",
                    color: "black",
                    "&:hover": { bgcolor: "secondary.light" },
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                  }}
                >
                  {dict?.hero?.viewProjects || "VIEW PROJECTS"}
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  href={getLocalizedHref("/contact#contact-form", p)}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,.1)" },
                    px: 4,
                  }}
                >
                  {dict?.hero?.letsTalk || "LET'S TALK"}
                </Button>
              </Box>
            </motion.div>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 280, md: 380 },
                height: { xs: 340, md: 460 },
              }}
            >
              <MB
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                sx={{
                  position: "absolute",
                  top: "-10%",
                  left: "-10%",
                  right: "-10%",
                  bottom: "-10%",
                  border: "1px dashed rgba(250,204,21,.4)",
                  borderRadius: "10%",
                  zIndex: 0,
                }}
              />
              <motion.div
                style={{ y: yi, scale: sc }}
                className="relative w-full h-full z-10"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotateX: [0, 5, 0],
                    rotateY: [0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotateX: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotateY: {
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="w-full h-full rounded-[5px] bg-gradient-to-b from-yellow-400 to-yellow-500 overflow-hidden flex items-end justify-center shadow-[0_30px_60px_rgba(0,0,0,.5)] border-[8px] border-white/20"
                >
                  <Image
                    src={f.image}
                    alt={f.name}
                    width={380}
                    height={460}
                    priority
                    sizes="(max-width: 900px) 280px, 380px"
                    className="object-cover object-top w-full h-full"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background:
                        "linear-gradient(to top,rgba(16,106,90,.6),transparent)",
                    }}
                  />
                </motion.div>
              </motion.div>
              <MB
                animate={{ x: [0, 15, 0], y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: "100%",
                  height: "100%",
                  border: "2px solid rgba(250,204,21,.5)",
                  borderRadius: 2,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <motion.div style={{ y: ys, opacity: o }}>
              <Stack
                direction={{ xs: "row", md: "column" }}
                spacing={{ xs: 3, md: 6 }}
                sx={{
                  justifyContent: "center",
                  alignItems: { xs: "center", md: "flex-end" },
                }}
              >
                {[
                  {
                    l: dict?.hero?.stats?.experience || "Experience",
                    v: f.experience,
                  },
                  {
                    l: dict?.hero?.stats?.projects || "Projects",
                    v: f.projects,
                  },
                  { l: dict?.hero?.stats?.clients || "Clients", v: f.clients },
                ].map((s, i) => (
                  <Box
                    key={s.l}
                    sx={{
                      textAlign: { xs: "center", md: "right" },
                      color: "white",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="h4"
                      sx={{
                        color: "secondary.main",
                        fontWeight: 600,
                        display: "block",
                        mb: 0.5,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontSize: ".7rem",
                      }}
                    >
                      {s.l}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "2rem", md: "3rem" },
                      }}
                    >
                      <Counter value={s.v} />
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <AnimatedWaveSeparator />
    </Box>
  );
}
