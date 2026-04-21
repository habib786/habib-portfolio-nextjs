"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import NextLink from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { getLocalizedHref } from "@/lib/utils";
import defaultDict from "@/app/[lang]/dictionaries/en-CA.json";

async function getDictionary(locale: string) {
  const dicts: Record<string, () => Promise<any>> = {
    "en-CA": () =>
      import("@/app/[lang]/dictionaries/en-CA.json").then((m) => m.default),
    "ar-SA": () =>
      import("@/app/[lang]/dictionaries/ar-SA.json").then((m) => m.default),
    "fr-CA": () =>
      import("@/app/[lang]/dictionaries/fr-CA.json").then((m) => m.default),
    "tr-TR": () =>
      import("@/app/[lang]/dictionaries/tr-TR.json").then((m) => m.default),
    "ur-PK": () =>
      import("@/app/[lang]/dictionaries/ur-PK.json").then((m) => m.default),
  };

  const loader = dicts[locale];
  if (loader) return loader();
  return dicts["en-CA"]();
}

const ServiceIcon = ({ type }: { type: string }) => {
  const iconStyles: React.CSSProperties = {
    width: 40,
    height: 40,
    display: "block",
    color: "#10a59a",
    filter: "none",
  };

  switch (type) {
    case "development":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyles}
        >
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      );
    case "design":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyles}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "cloud":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyles}
        >
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyles}
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default function ServicesSection({ lang }: { lang?: string }) {
  const params = useParams();
  const pathname = usePathname();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dict, setDict] = useState<any>(defaultDict);
  const [mounted, setMounted] = useState(false);

  const resolvedLang =
    lang ||
    (params?.lang as string) ||
    pathname.match(/^\/([a-z]{2}-[A-Z]{2})/)?.[1] ||
    "en-CA";

  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient();
      const activeLang = resolvedLang;

      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("portfolio_services")
        .select("*")
        .eq("language", activeLang)
        .order("order_index", { ascending: true });

      if (data && data.length > 0) {
        setServices(data);
      } else if (activeLang !== "en-CA") {
        const { data: fallbackData } = await supabase
          .from("portfolio_services")
          .select("*")
          .eq("language", "en-CA")
          .order("order_index", { ascending: true });
        if (fallbackData) setServices(fallbackData);
      }
      setLoading(false);
    }

    fetchServices();
  }, [resolvedLang]);

  useEffect(() => {
    setMounted(true);
    getDictionary(resolvedLang)
      .then(setDict)
      .catch(() => setDict(defaultDict));
  }, [resolvedLang]);

  if (!mounted) return null;

  const defaultServices = [
    {
      id: "01.",
      iconType: "development",
      title: dict?.services?.defaultServices?.[0]?.title,
      description: dict?.services?.defaultServices?.[0]?.description,
    },
    {
      id: "02.",
      iconType: "design",
      title: dict?.services?.defaultServices?.[1]?.title,
      description: dict?.services?.defaultServices?.[1]?.description,
    },
    {
      id: "03.",
      iconType: "cloud",
      title: dict?.services?.defaultServices?.[2]?.title,
      description: dict?.services?.defaultServices?.[2]?.description,
    },
  ].filter((s) => s.title && s.description);

  const displayServices =
    services.length > 0
      ? services.map((s: any) => ({
          id: s.number_id,
          iconType: s.icon_type || "development",
          title: s.title,
          description: s.description,
        }))
      : defaultServices;

  if (loading) {
    return (
      <Box
        component="section"
        sx={{ py: 15, bgcolor: "background.default", position: "relative" }}
      >
        <Container maxWidth="lg">
          <SectionHeading
            title={dict?.services?.title}
            align="center"
            variant="h3"
          />
          <Grid container spacing={5}>
            {[1, 2, 3].map((i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Card
                  sx={{
                    height: "100%",
                    p: 5,
                    borderRadius: 1,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={72}
                    height={72}
                    sx={{ borderRadius: 1, mb: 4 }}
                  />
                  <Skeleton variant="text" width="30%" height={20} />
                  <Skeleton variant="text" width="80%" height={36} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="90%" />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{ py: 15, bgcolor: "background.default", position: "relative" }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          title={dict?.services?.title}
          align="center"
          variant="h3"
        />

        <Grid container spacing={5}>
          {displayServices.map((service, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: { xs: 4, md: 5 },
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 1,
                  bgcolor: "background.paper",
                  backgroundImage:
                    "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)",
                  transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background:
                      "radial-gradient(circle, rgba(16, 106, 90, 0.1) 0%, transparent 50%)",
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    zIndex: 0,
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow:
                      "0 30px 60px rgba(16,106,90,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
                    borderColor: "rgba(16,106,90,0.3)",
                    "&::before": { opacity: 1 },
                    "& .service-number": {
                      color: "primary.main",
                      opacity: 0.15,
                      transform: "scale(1.1) translate(-10px, -10px)",
                    },
                  },
                }}
              >
                <Typography
                  className="service-number"
                  sx={{
                    position: "absolute",
                    top: 20,
                    insetInlineEnd: 20,
                    color: "divider",
                    fontWeight: 900,
                    fontSize: 80,
                    lineHeight: 1,
                    userSelect: "none",
                    zIndex: 0,
                    transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                    opacity: 0.5,
                  }}
                >
                  {service.id.replace(".", "")}
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: "rgba(16, 106, 90, 0.1)",
                      border: "1px solid rgba(16, 106, 90, 0.2)",
                      borderRadius: 1,
                      mb: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#10a59a",
                      filter: "none",
                      "& svg": { display: "block" },
                    }}
                  >
                    <ServiceIcon type={service.iconType} />
                  </Box>

                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      fontSize: "0.9rem",
                      letterSpacing: 1,
                    }}
                  >
                    {dict?.services?.serviceLabel} {service.id}
                  </Typography>

                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 900,
                      mb: 3,
                      pe: 2,
                      lineHeight: 1.2,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      borderInlineStart: "3px solid",
                      borderColor: "secondary.main",
                      ps: 3,
                      lineHeight: 1.8,
                      fontSize: "0.95rem",
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, textAlign: "center" }}>
          <NextLink
            href={getLocalizedHref("/services", pathname)}
            style={{ textDecoration: "none" }}
          >
            <Button
              component="span"
              variant="outlined"
              size="large"
              sx={{
                px: 6,
                py: 2,
                borderRadius: 1,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontSize: "0.9rem",
                borderWidth: 2,
                textDecoration: "none",
                "&:hover": {
                  borderWidth: 2,
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              {dict?.services?.exploreMore}
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
}
