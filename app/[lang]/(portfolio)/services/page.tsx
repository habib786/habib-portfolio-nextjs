import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
  Card,
} from "@mui/material";
import { createClient } from "@/lib/supabase/server";
import { cleanValue, getLocalizedHref } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import WavyHeroBackground from "@/components/shared/WavyHeroBackground";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import AnimatedSquigglyLine from "@/components/animations/AnimatedSquigglyLine";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceCard from "@/components/services/ServiceCard";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const pathname = `/${lang}/services`;

  // Fetch profile image from settings if available
  let profileImage =
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60";
  const supabase = await createClient();

  let services = [];
  if (supabase) {
    const { data } = await supabase
      .from("portfolio_services")
      .select("*")
      .eq("language", lang)
      .order("order_index", { ascending: true });

    if (data && data.length > 0) {
      services = data;
    } else {
      // Fallback to en-CA
      const { data: fallbackData } = await supabase
        .from("portfolio_services")
        .select("*")
        .eq("language", "en-CA")
        .order("order_index", { ascending: true });
      if (fallbackData) services = fallbackData;
    }

    // Get profile image from settings
    const { data: settingsData } = await supabase.from("settings").select("*");
    if (settingsData) {
      const settings: any = {};
      settingsData.forEach((item) => {
        if (item.key && item.value) {
          settings[item.key] = item.value;
        }
      });
      if (
        settings.profile_image &&
        typeof settings.profile_image === "string" &&
        settings.profile_image.trim()
      ) {
        profileImage = cleanValue(settings.profile_image);
      }
    }
  }

  const defaultServices = [
    {
      number_id: "01",
      title: "Full-Stack Web Development",
      description:
        "Building scalable, high-performance web applications using modern technologies like React, Next.js, and Node.js.",
      features: [
        "Custom Web Applications",
        "API Integration",
        "Cloud Deployment",
        "Performance Optimization",
      ],
    },
    {
      number_id: "02",
      title: "Mobile App Development",
      description:
        "Crafting cross-platform mobile experiences that feel native and perform beautifully on both iOS and Android.",
      features: [
        "Cross-platform Apps",
        "Intuitive UI/UX",
        "App Store Submission",
        "Offline Functionality",
      ],
    },
    {
      number_id: "03",
      title: "UI/UX Design",
      description:
        "Designing user-centric interfaces that are not only visually stunning but also highly functional and intuitive.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Interactive Design",
      ],
    },
    {
      number_id: "04",
      title: "Cloud Solutions",
      description:
        "Architecting robust cloud-native applications and managing infrastructure for maximum reliability.",
      features: [
        "Serverless Architecture",
        "Database Migration",
        "CI/CD Pipelines",
        "Security Audits",
      ],
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 15 }}>
      {/* ── Hero Section ── */}
      <ServicesHero profileImage={profileImage} />

      {/* ── Services Detail Section ── */}
      <Container
        maxWidth="lg"
        sx={{ mt: -10, position: "relative", zIndex: 2 }}
      >
        <Grid container spacing={4}>
          {displayServices.map((service, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <ScrollReveal
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.1}
              >
                <ServiceCard
                  id={service.number_id || `0${index + 1}`}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  showQuoteButton={true}
                  index={index}
                  lang={lang}
                />
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Contact CTA ── */}
      <Container maxWidth="md" sx={{ mt: 15 }}>
        <ScrollReveal direction="up">
          <Box
            sx={{
              p: { xs: 5, md: 8 },
              bgcolor: "primary.main",
              borderRadius: 2,
              color: "white",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%)",
              }}
            />

            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
              Ready to start your next project?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 6, opacity: 0.9, fontWeight: 400 }}
            >
              Let's create something exceptional together. I'm currently
              available for new projects and collaborations.
            </Typography>
            <Link
              href={getLocalizedHref("/contact#contact-form", pathname)}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: 1,
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "black",
                  textDecoration: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Contact Me Now
              </Button>
            </Link>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}
