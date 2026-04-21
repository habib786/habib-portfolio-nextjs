"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Rating,
  Typography,
  Card,
  Avatar,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SectionHeading from "../ui/SectionHeading";

const defaultTestimonials: any[] = [
  {
    id: 1,
    client_name: "Ahmad Al-Rashid",
    company: "TechCorp",
    role: "CEO",
    content: "Outstanding work and professionalism.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-4158eb5e3a27?w=200",
  },
  {
    id: 2,
    client_name: "Sarah Chen",
    company: "Design Studio",
    role: "Creative Director",
    content: "Habib delivered a beautiful design ahead of schedule.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    id: 3,
    client_name: "Marcus Johnson",
    company: "Startup Labs",
    role: "Founder",
    content: "Exceptional quality and attention to detail.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutTestimonials() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax layers
  const bgBlobY = useTransform(scrollYProgress, [0, 1], [-50, 80]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -20]);

  useEffect(() => {
    async function fetchData(lang: string) {
      const supabase = createClient();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("portfolio_testimonials")
        .select("*")
        .eq("is_active", true)
        .eq("language", lang)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data || [];
    }

    async function loadTestimonials() {
      try {
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : "en-CA";

        let data = await fetchData(currentLanguage);

        // Fallback to en-CA
        if (data.length === 0 && currentLanguage !== "en-CA") {
          data = await fetchData("en-CA");
        }

        if (data && data.length > 0) {
          setTestimonials(
            data.map((item: any) => ({
              name: item.name,
              role: item.role || "Client",
              text: item.quote || "",
              avatar: item.avatar_url || "https://i.pravatar.cc/150",
            })),
          );
        }
      } catch (error: any) {
        // Log the error but don't break the component - it will keep 'defaultTestimonials'
        console.warn(
          'Testimonials load skipped. Run SQL to add "language" column to portfolio_testimonials table if missing.',
        );
        console.error("DB Error:", error?.message || error);
      }
    }

    loadTestimonials();
  }, [pathname]);

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
      {/* Floating teal orb */}
      <motion.div
        style={{ y: bgBlobY }}
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,106,90,0.05) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Quote marks floating decoration */}
      <motion.div
        style={{ y: bgBlobY }}
        aria-hidden
        className="absolute top-16 left-8 text-[8rem] leading-none select-none pointer-events-none"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 0.05, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <Typography
          sx={{
            fontSize: { xs: "5rem", md: "10rem" },
            fontWeight: 900,
            color: "#106A5A",
            lineHeight: 1,
          }}
        >
          "
        </Typography>
      </motion.div>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionHeading
          title="PEOPLE TALK ABOUT ME"
          subtitle="I am very grateful for my past and current clients who have entrusted me with their projects. Here are some of the things they have to say about me."
          align="center"
          variant="h3"
          sx={{ mb: 10 }}
        />

        {/* Cards with stagger + parallax wrapper */}
        <motion.div style={{ y: cardsY }}>
          <Grid container spacing={4}>
            {testimonials.map((t, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: { duration: 0.25 },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      textAlign: "center",
                      borderRadius: 2,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                      bgcolor: "#fcfcfc",
                      border: "1px solid rgba(0,0,0,0.05)",
                      transition: "box-shadow 0.3s, border-color 0.3s",
                      "&:hover": {
                        borderColor: "rgba(16,106,90,0.25)",
                        boxShadow: "0 12px 40px rgba(16,106,90,0.1)",
                      },
                    }}
                  >
                    {/* Avatar with halo ring */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 0.2,
                        type: "spring",
                        stiffness: 180,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          mb: 3,
                        }}
                      >
                        {/* Pulsing ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.5, 0.15, 0.5],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            delay: index * 0.5,
                          }}
                          style={{
                            position: "absolute",
                            inset: -6,
                            borderRadius: "50%",
                            border: "2px solid #FACC15",
                            pointerEvents: "none",
                          }}
                        />
                        <Avatar
                          src={t.avatar}
                          sx={{
                            width: 80,
                            height: 80,
                            border: "4px solid #FACC15",
                          }}
                        />
                      </Box>
                    </motion.div>

                    {/* Quote text fade-in */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.35 }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          mb: 4,
                          fontStyle: "italic",
                          lineHeight: 1.8,
                        }}
                      >
                        &ldquo;{t.text}&rdquo;
                      </Typography>
                    </motion.div>

                    {/* Name + role */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          mb: 0.5,
                          textTransform: "uppercase",
                        }}
                      >
                        {t.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 600,
                          letterSpacing: 1,
                        }}
                      >
                        {t.role}
                      </Typography>

                      {/* Star rating */}
                      <Box
                        sx={{
                          mt: 1.5,
                          display: "flex",
                          justifyContent: "center",
                          gap: 0.5,
                        }}
                      >
                        {[...Array(5)].map((_, si) => (
                          <motion.span
                            key={si}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.15 + 0.55 + si * 0.06,
                            }}
                            style={{ color: "#FACC15", fontSize: "1rem" }}
                          >
                            ★
                          </motion.span>
                        ))}
                      </Box>
                    </motion.div>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
