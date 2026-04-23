"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Code, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getLocalizedHref } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";

const defaultProjects = [
  {
    id: "1",
    title: "AI-Powered Resume Builder",
    description:
      "An intelligent resume builder that uses AI to optimize content and design for ATS systems.",
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "Tailwind CSS",
      "Supabase",
    ],
    github_url: "https://github.com/habibfarooq/resume-builder",
    live_url: "https://resume.habibfarooq.com",
    cover_image: null,
    category: "AI",
    slug: "ai-resume-builder",
  },
  {
    id: "2",
    title: "E-Commerce Analytics Dashboard",
    description:
      "Real-time analytics dashboard for e-commerce businesses with predictive insights.",
    technologies: ["React", "Node.js", "PostgreSQL", "D3.js", "Redis"],
    github_url: "https://github.com/habibfarooq/ecommerce-analytics",
    live_url: "https://analytics.demo.com",
    cover_image: null,
    category: "Analytics",
    slug: "ecommerce-analytics",
  },
  {
    id: "3",
    title: "Health & Fitness Tracker",
    description:
      "Comprehensive fitness tracking app with workout plans, nutrition logging, and progress analytics.",
    technologies: [
      "React Native",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Chart.js",
    ],
    github_url: "https://github.com/habibfarooq/fitness-tracker",
    live_url: "https://fitness.habibfarooq.com",
    cover_image: null,
    category: "Mobile",
    slug: "fitness-tracker",
  },
  {
    id: "4",
    title: "Real Estate Management System",
    description:
      "Property management platform with virtual tours, tenant management, and financial tracking.",
    technologies: ["Next.js", "Python", "PostgreSQL", "Stripe", "AWS"],
    github_url: "https://github.com/habibfarooq/real-estate-system",
    live_url: "https://realestate.demo.com",
    cover_image: null,
    category: "SaaS",
    slug: "real-estate-system",
  },
];

export default function FeaturedProjects() {
  const pathname = usePathname();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const theme = useTheme();

  useEffect(() => {
    async function fetchData(lang: string) {
      const supabase = createClient();
      if (!supabase) return [];

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .eq("language", lang)
        .order("order_index", { ascending: true })
        .limit(4);

      if (error) throw error;
      return data || [];
    }

    async function fetchProjects() {
      try {
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : "en-CA";

        let data = await fetchData(currentLanguage);

        // Fallback to en-CA
        if (data.length === 0 && currentLanguage !== "en-CA") {
          data = await fetchData("en-CA");
        }

        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching featured projects:", err);
      }
    }
    fetchProjects();
  }, [pathname]);

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      {/* Projects Grid */}
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, md: 6 }} key={project.id}>
            <Card
              component="div"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                borderRadius: 1,
                bgcolor: "background.paper",
                backgroundImage:
                  "linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid",
                borderColor:
                  hoveredProject === project.id
                    ? "rgba(16,106,90,0.4)"
                    : "divider",
                boxShadow:
                  hoveredProject === project.id
                    ? "0 30px 60px rgba(16,106,90,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
                    : "0 10px 30px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)",
                transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                transform:
                  hoveredProject === project.id
                    ? "translateY(-10px) scale(1.02)"
                    : "none",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "radial-gradient(circle, rgba(16, 106, 90, 0.08) 0%, transparent 50%)",
                  opacity: hoveredProject === project.id ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  zIndex: 0,
                  pointerEvents: "none",
                },
              }}
            >
              {/* Project Image Placeholder */}
              <Box
                sx={{
                  height: 200,
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  background:
                    hoveredProject === project.id
                      ? "linear-gradient(135deg, #106A5A 0%, #1a8e79 100%)"
                      : "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 900,
                    fontSize: "5rem",
                    color:
                      hoveredProject === project.id
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.05)",
                  }}
                >
                  {project.title.charAt(0)}
                </Typography>

                {/* Info Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    insetInlineStart: 0,
                    insetInlineEnd: 0,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(4px)",
                    opacity: hoveredProject === project.id ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{ color: "white" }}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Star size={16} />
                      <Typography variant="caption">—</Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Eye size={16} />
                      <Typography variant="caption">—</Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    {project.github_url && (
                      <IconButton
                        size="small"
                        component="a"
                        href={project.github_url}
                        target="_blank"
                        aria-label="View source code"
                        sx={{
                          color: "white",
                          bgcolor: "rgba(255,255,255,0.2)",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                        }}
                      >
                        <Code size={16} />
                      </IconButton>
                    )}
                    {project.live_url && (
                      <IconButton
                        size="small"
                        component="a"
                        href={project.live_url}
                        target="_blank"
                        aria-label="View live project"
                        sx={{
                          color: "white",
                          bgcolor: "rgba(255,255,255,0.2)",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                        }}
                      >
                        <ExternalLink size={16} />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              </Box>

              {/* Card Content */}
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color:
                        hoveredProject === project.id
                          ? "primary.main"
                          : "text.primary",
                      transition: "color 0.2s",
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}
                  >
                    {project.category && (
                      <Chip
                        label={project.category}
                        size="small"
                        color="primary"
                        sx={{ fontSize: 10, bgcolor: "primary.50" }}
                      />
                    )}
                  </Stack>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, minHeight: 40 }}
                >
                  {project.description}
                </Typography>

                <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
                  {(project.technologies || [])
                    .slice(0, 4)
                    .map((tech: string) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 10, height: 20 }}
                      />
                    ))}
                  {(project.technologies || []).length > 4 && (
                    <Chip
                      label={`+${(project.technologies || []).length - 4}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20 }}
                    />
                  )}
                </Stack>
              </CardContent>

              {/* Card Actions */}
              <CardActions
                sx={{ p: 3, pt: 0, justifyContent: "space-between" }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  component={Link}
                  href={getLocalizedHref(
                    `/projects/${project.slug || project.id}`,
                    pathname,
                  )}
                >
                  View Details
                </Button>
                <Stack direction="row" spacing={1}>
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outline" size="sm">
                        <Code size={16} style={{ marginInlineEnd: 8 }} />
                        Code
                      </Button>
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="sm">
                        <ExternalLink
                          size={16}
                          style={{ marginInlineEnd: 8 }}
                        />
                        Live
                      </Button>
                    </a>
                  )}
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View All Button */}
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Button
          variant="outline"
          size="lg"
          component={Link}
          href={getLocalizedHref("/projects", pathname)}
        >
          View All Projects
          <ExternalLink size={20} style={{ marginInlineStart: 12 }} />
        </Button>
      </Box>
    </Box>
  );
}
