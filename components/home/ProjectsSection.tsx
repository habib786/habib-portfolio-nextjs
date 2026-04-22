"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { Button } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { getLocalizedHref } from "@/lib/utils";

const defaultDict = {
  projects: {
    exploreProject: "EXPLORE PROJECT →",
  },
};

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "Sales Al Jomaih",
    category: "WEB APP",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 2,
    title: "Brand Identity",
    category: "DESIGN",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Choco Delivery",
    category: "UI/UX DESIGN",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "Tours Platform",
    category: "WEB APP",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    className: "md:col-span-1 md:row-span-1",
  },
];

async function getDictionary(locale: string) {
  const dicts: Record<string, any> = {
    "en-CA": () =>
      import("@/app/[lang]/dictionaries/en-CA.json").then(
        (module) => module.default,
      ),
    "fr-CA": () =>
      import("@/app/[lang]/dictionaries/fr-CA.json").then(
        (module) => module.default,
      ),
    "ar-SA": () =>
      import("@/app/[lang]/dictionaries/ar-SA.json").then(
        (module) => module.default,
      ),
    "ur-PK": () =>
      import("@/app/[lang]/dictionaries/ur-PK.json").then(
        (module) => module.default,
      ),
    "tr-TR": () =>
      import("@/app/[lang]/dictionaries/tr-TR.json").then(
        (module) => module.default,
      ),
  };
  const loader = dicts[locale];
  if (loader) {
    return loader();
  }
  return dicts["en-CA"]();
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const lang = (params?.lang as string) || "en-CA";
  const [dict, setDict] = useState(defaultDict);
  const pathname = usePathname();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress: sp } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const xBg = useTransform(sp, [0, 1], [-100, 100]);

  const defaultProjects = [
    {
      id: 1,
      title: "Sales Al Jomaih",
      category: "WEB APP",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      className: "md:col-span-1 md:row-span-2",
    },
    {
      id: 2,
      title: "Brand Identity",
      category: "DESIGN",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      title: "Choco Delivery",
      category: "UI/UX DESIGN",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      title: "Tours Platform",
      category: "WEB APP",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  useEffect(() => {
    setMounted(true);

    async function fetchData(locale: string) {
      const supabase = createClient();
      if (!supabase) return [];

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("language", locale)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data || [];
    }

    async function fetchProjects() {
      try {
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : "en-CA";

        let data = await fetchData(currentLanguage);

        if (data.length === 0 && currentLanguage !== "en-CA") {
          data = await fetchData("en-CA");
        }

        if (data && data.length > 0) {
          setProjects(
            data.map((p) => ({
              id: p.id,
              title: p.title,
              category: p.category,
              image: p.cover_image,
              className: p.grid_class || "md:col-span-1 md:row-span-1",
            })),
          );
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();

    getDictionary(lang)
      .then(setDict)
      .catch(() => setDict(defaultDict));
  }, [pathname, lang]);

  if (!mounted) {
    return (
      <Box
        component="section"
        ref={containerRef}
        sx={{ py: 12, minHeight: "100vh", bgcolor: "background.default" }}
      />
    );
  }

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  if (loading) {
    return (
      <Box
        component="section"
        sx={{
          py: 12,
          bgcolor: "background.default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <SectionHeading title="MY LATEST PROJECTS" subtitle="" />
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={4}>
                <SkeletonCard />
                <SkeletonCard />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={4} sx={{ mt: { md: 12 } }}>
                <SkeletonCard />
                <SkeletonCard />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      ref={containerRef}
      sx={{
        py: 12,
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Parallax Text */}
      <motion.div
        style={{ x: xBg }}
        className="absolute top-1/2 inset-inline-start-0 text-[10rem] md:text-[15rem] font-bold text-gray-50 dark:text-gray-900/10 pointer-events-none whitespace-nowrap z-0 select-none"
      >
        PORTFOLIO WORKS
      </motion.div>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionHeading
          title="MY LATEST PROJECTS"
          subtitle="We have continually aimed to set new standards in software development, delivering custom web applications and mobile solutions that solve complex business challenges."
        />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              {displayProjects[0] && (
                <ProjectCard
                  project={displayProjects[0]}
                  index={0}
                  pathname={pathname}
                  dict={dict}
                />
              )}
              {displayProjects[2] && (
                <ProjectCard
                  project={displayProjects[2]}
                  index={2}
                  pathname={pathname}
                  dict={dict}
                />
              )}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4} sx={{ mt: { md: 12 } }}>
              {displayProjects[1] && (
                <ProjectCard
                  project={displayProjects[1]}
                  index={1}
                  pathname={pathname}
                  dict={dict}
                />
              )}
              {displayProjects[3] && (
                <ProjectCard
                  project={displayProjects[3]}
                  index={3}
                  pathname={pathname}
                  dict={dict}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ProjectCard({
  project,
  index,
  pathname,
  dict,
}: {
  project: any;
  index: number;
  pathname: string;
  dict?: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Internal image parallax
  const yImage = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const buttonLabel = dict?.projects?.exploreProject || "EXPLORE PROJECT →";

  return (
    <motion.div
      ref={cardRef}
      style={{ position: "relative" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        sx={{
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
          bgcolor: "background.paper",
          backgroundImage:
            "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
          "&:hover": {
            transform: "translateY(-10px) scale(1.02)",
            boxShadow:
              "0 30px 60px rgba(16,106,90,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
            borderColor: "rgba(16,106,90,0.4)",
          },
          "&:hover .project-overlay": {
            opacity: 1,
            backdropFilter: "blur(10px)",
          },
          "&:hover img": { scale: "1.1" },
          transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <Box
          sx={{
            aspectRatio: "4/3",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div style={{ y: yImage }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full transition-transform duration-700 ease-out"
            />
          </motion.div>
          <Box
            className="project-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(9, 9, 11, 0.95) 0%, rgba(16, 106, 90, 0.7) 40%, transparent 100%)",
              backdropFilter: "blur(0px)",
              opacity: 0,
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: 5,
            }}
          >
            <Chip
              label={project.category}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: 800,
                borderRadius: 1,
                mb: 2,
                alignSelf: "flex-start",
                fontSize: "0.65rem",
                letterSpacing: 1.5,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
            <Typography
              variant="h4"
              component="h3"
              sx={{
                color: "white",
                fontWeight: 900,
                mb: 3,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {project.title}
            </Typography>
            <Button
              variant="default"
              component={Link}
              href={getLocalizedHref("/projects", pathname)}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "black",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
                alignSelf: "flex-start",
                px: 5,
                py: 1.5,
                fontWeight: 800,
                borderRadius: 1,
              }}
            >
              {buttonLabel}
            </Button>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <Card
      sx={{
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ aspectRatio: "4/3", width: "100%" }}
      />
    </Card>
  );
}
