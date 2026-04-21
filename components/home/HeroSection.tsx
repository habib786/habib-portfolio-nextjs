"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  Skeleton,
} from "@mui/material";
import Counter from "@/components/animations/Counter";
import AnimatedWaveSeparator from "@/components/shared/AnimatedWaveSeparator";
import { getLocalizedHref, cleanValue } from "@/lib/utils";

const MotionBox = motion.create(Box);

export default function HeroSection({ dict }: { dict?: any }) {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "en-CA";

  const [profile, setProfile] = useState({
    name: "HABIB",
    role: "Full Stack Web Developer",
    experience: "7+",
    projects: "70+",
    clients: "30+",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yStats = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const yPattern = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = createClient();
        if (!supabase) return;

        const { data } = await supabase.from("settings").select("*");
        if (data) {
          const settings: any = {};
          data.forEach((item) => {
            settings[item.key] = item.value;
          });

          const getVal = (key: string) =>
            settings[`${key}_${lang}`] !== undefined
              ? settings[`${key}_${lang}`]
              : settings[key];

          const profileName = getVal("profile_name");
          if (profileName) {
            setProfile((prev) => ({
              ...prev,
              name: cleanValue(profileName),
              role: cleanValue(getVal("profile_role")) || prev.role,
              experience:
                cleanValue(getVal("stat_experience")) || prev.experience,
              projects: cleanValue(getVal("stat_projects")) || prev.projects,
              clients: cleanValue(getVal("stat_clients")) || prev.clients,
              image: cleanValue(getVal("profile_image")) || prev.image,
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [lang]);

  return loading ? (
    <Box
      component="section"
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: "primary.main",
        backgroundImage: "linear-gradient(135deg, #106A5A 0%, #0d594b 100%)",
        py: { xs: 8, md: 0 },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        isolation: "isolate",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 10, width: "100%" }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Skeleton
              variant="text"
              width="30%"
              height={20}
              sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={80}
              sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }}
            />
            <Skeleton
              variant="text"
              width="60%"
              height={40}
              sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 4 }}
            />
            <Stack direction="row" spacing={2}>
              <Skeleton
                variant="rectangular"
                width={140}
                height={48}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={120}
                height={48}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1 }}
              />
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Skeleton
              variant="rectangular"
              width={380}
              height={460}
              sx={{ bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack
              direction={{ xs: "row", md: "column" }}
              spacing={{ xs: 3, md: 6 }}
              sx={{
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-end" },
              }}
            >
              <Skeleton
                variant="text"
                width={80}
                height={60}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Skeleton
                variant="text"
                width={80}
                height={60}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Skeleton
                variant="text"
                width={80}
                height={60}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  ) : (
    <Box
      component="section"
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: "primary.main",
        backgroundImage: "linear-gradient(135deg, #106A5A 0%, #0d594b 100%)",
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
          y: yPattern,
          zIndex: 0,
          insetInlineStart: 0,
          insetInlineEnd: 0,
        }}
        className="absolute inset-0 opacity-10 pointer-events-none w-full h-full"
      >
        <svg
          viewBox="0 0 1440 400"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="white"
            strokeWidth="1"
            d="M0,150 C200,200 400,100 600,150 C800,200 1000,100 1200,150 C1400,200 1440,150 1440,150"
          />
          <path
            fill="none"
            stroke="white"
            strokeWidth="1"
            d="M0,200 C300,280 500,120 800,200 C1100,280 1300,120 1440,200"
          />
          <path
            fill="none"
            stroke="white"
            strokeWidth="2"
            d="M0,250 C400,350 600,150 1000,250 C1200,300 1300,200 1440,250"
          />
        </svg>
      </motion.div>

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 10, width: "100%" }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          {/* Left Text */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div style={{ y: yText, opacity }}>
              <Typography
                variant="subtitle1"
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
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    zIndex: 2,
                  }}
                >
                  {profile.name}
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
                      opacity="0.6"
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
                  sx={{
                    color: "#BBEAD0",
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  {profile.role}
                </Typography>
              </Stack>

              <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  href={getLocalizedHref("/projects", pathname)}
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
                  href={getLocalizedHref("/contact#contact-form", pathname)}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                    px: 4,
                  }}
                >
                  {dict?.hero?.letsTalk || "LET'S TALK"}
                </Button>
              </Box>
            </motion.div>
          </Grid>

          {/* Center Image */}
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
              {/* Backglow / Orbiting circle */}
              <MotionBox
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                sx={{
                  position: "absolute",
                  top: "-10%",
                  left: "-10%",
                  right: "-10%",
                  bottom: "-10%",
                  border: "1px dashed rgba(250, 204, 21, 0.4)",
                  borderRadius: "10%",
                  zIndex: 0,
                }}
              />

              <motion.div
                style={{ y: yImage, scale }}
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
                  className="w-full h-full rounded-[5px] bg-gradient-to-b from-yellow-400 to-yellow-500 overflow-hidden flex items-end justify-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-[8px] border-white/20"
                >
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    priority
                    sizes="(max-width: 900px) 280px, 380px"
                    className="object-cover object-top"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background:
                        "linear-gradient(to top, rgba(16, 106, 90, 0.6), transparent)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Decorative Frame - Animating */}
              <MotionBox
                animate={{
                  x: [0, 15, 0],
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
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
                  border: "2px solid rgba(250, 204, 21, 0.5)",
                  borderRadius: 2,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Grid>

          {/* Right Stats */}
          <Grid size={{ xs: 12, md: 3 }}>
            <motion.div style={{ y: yStats, opacity }}>
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
                    label: dict?.hero?.stats?.experience || "Experience",
                    value: profile.experience,
                  },
                  {
                    label: dict?.hero?.stats?.projects || "Projects",
                    value: profile.projects,
                  },
                  {
                    label: dict?.hero?.stats?.clients || "Clients",
                    value: profile.clients,
                  },
                ].map((stat, i) => (
                  <Box
                    key={stat.label}
                    sx={{
                      textAlign: { xs: "center", md: "right" },
                      color: "white",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "secondary.main",
                        fontWeight: 600,
                        display: "block",
                        mb: 0.5,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontSize: "0.7rem",
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "2rem", md: "3rem" },
                      }}
                    >
                      <Counter value={stat.value} />
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
