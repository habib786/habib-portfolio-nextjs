"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "./AnimatedLogo";
import { Menu, X } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import {
  IconButton,
  Box,
  Toolbar,
  AppBar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { createClient } from "@/lib/supabase/client";
import { getLocalizedHref } from "@/lib/utils";
import { hasLocale, locales } from "@/app/[lang]/dictionaries";
import type { MenuItem } from "@/lib/types";
import LanguageSelector from "./LanguageSelector";

async function getMenuFromSupabase(supabase: any, language?: string) {
  try {
    let query = supabase
      .from("menu_items")
      .select("*")
      .order("order", { ascending: true });

    if (language) {
      query = query.eq("language", language.trim());
    }

    const { data, error } = await query;
    if (error) {
      console.error("Database query error:", error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error("Supabase catch error:", e);
    return [];
  }
}

async function getSocialLinks(supabase: any) {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("key, value")
      .in("key", ["social_linkedin", "social_github"]);

    if (error) {
      console.error("Error fetching social links:", error);
      return { linkedin: "https://linkedin.com", github: "https://github.com" };
    }

    const links: Record<string, string> = {};
    data?.forEach((item: any) => {
      links[item.key] = item.value;
    });

    return {
      linkedin: links["social_linkedin"] || "https://linkedin.com",
      github: links["social_github"] || "https://github.com",
    };
  } catch (e) {
    console.error("Social links fetch error:", e);
    return { linkedin: "https://linkedin.com", github: "https://github.com" };
  }
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  });
  const pathname = usePathname();

  const supabase = useMemo(() => createClient(), []);
  const fallbackLocale = locales[0] ?? "en-CA";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const segments = pathname.split("/").filter(Boolean);
        const currentLanguage = hasLocale(segments[0] ?? "")
          ? segments[0]
          : fallbackLocale;

        if (!supabase) {
          console.warn("Supabase client missing");
          return;
        }

        const [menuData, social] = await Promise.all([
          getMenuFromSupabase(supabase, currentLanguage),
          getSocialLinks(supabase),
        ]);

        setSocialLinks(social);

        let finalMenuData = menuData;

        if (
          (!finalMenuData || finalMenuData.length === 0) &&
          currentLanguage !== "en-CA"
        ) {
          finalMenuData = await getMenuFromSupabase(supabase, fallbackLocale);
        }

        if (!finalMenuData || finalMenuData.length === 0) {
          const minimalItems = [
            { title: "Home", url: "/" },
            { title: "Projects", url: "/projects" },
            { title: "Contact", url: "/contact#contact-form" },
          ].map((item, i) => ({
            id: `minimal-${i}`,
            title: item.title,
            url: item.url,
            order: i,
            language: currentLanguage,
            created_at: "",
            updated_at: "",
            icon: null,
            parent_id: null,
            is_external: false,
          }));
          setNavItems(minimalItems);
        } else {
          setNavItems(flattenMenu(finalMenuData));
        }
      } catch (error) {
        console.error("Critical Navbar Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [pathname, supabase, fallbackLocale]);

  // Helper function to flatten hierarchical menu
  const flattenMenu = (items: any[]): MenuItem[] => {
    const result: MenuItem[] = [];
    items.forEach((item) => {
      result.push({ ...item });
      if (item.children && Array.isArray(item.children)) {
        result.push(...flattenMenu(item.children));
      }
    });
    return result;
  };

  // Filter out only root-level menu items for main navigation
  const rootNavItems = navItems.filter((item) => !item.parent_id);

  const rootNavWithHref = useMemo(() => {
    return rootNavItems.map((item) => {
      const href = getLocalizedHref(item.url, pathname);
      const isActive = pathname === href;
      return { ...item, href, isActive };
    });
  }, [rootNavItems, pathname]);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "primary.main",
        backgroundImage: "linear-gradient(to right, #106A5A, #0d594b)",
        boxShadow: 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ height: 72, display: "flex", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "auto", md: "25%" },
              minWidth: { md: 220 },
            }}
          >
            <Link
              href={getLocalizedHref("/", pathname)}
              onClick={closeMenu}
              style={{ textDecoration: "none" }}
            >
              <Box sx={{ color: "secondary.main" }}>
                <AnimatedLogo />
              </Box>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              minHeight: 40,
              minWidth: 520,
            }}
          >
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 80,
                      height: 16,
                      bgcolor: "rgba(255,255,255,0.1)",
                      borderRadius: 1,
                    }}
                  />
                ))
              : rootNavWithHref.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: item.isActive ? "secondary.main" : "white",
                        opacity: item.isActive ? 1 : 0.8,
                        whiteSpace: "nowrap",
                        "&:hover": { color: "secondary.main", opacity: 1 },
                        transition: "all 0.2s",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -4,
                          insetInlineStart: 0,
                          width: item.isActive ? "100%" : "0%",
                          height: 2,
                          bgcolor: "secondary.main",
                          transition: "width 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ))}
          </Box>

          {/* Right side actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "auto", md: "25%" },
              minWidth: { md: 260 },
              justifyContent: "flex-end",
              gap: 1.5,
            }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <LanguageSelector />
            </Box>
            <IconButton
              component={Link}
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "black",
                  transform: "rotate(10deg)",
                },
                transition: "all 0.3s",
                width: 36,
                height: 36,
              }}
            >
              <FaLinkedin size={18} />
            </IconButton>

            <IconButton
              component={Link}
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "black",
                  transform: "rotate(-10deg)",
                },
                transition: "all 0.3s",
                width: 36,
                height: 36,
              }}
            >
              <FaGithub size={18} />
            </IconButton>

            {/* Mobile menu button */}
            <IconButton
              sx={{ display: { md: "none" }, color: "white" }}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={closeMenu}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "primary.main",
              backgroundImage: "linear-gradient(to bottom, #106A5A, #0d594b)",
              color: "white",
              pt: 8,
            },
          },
        }}
      >
        <List sx={{ px: 2, pb: 4 }}>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <ListItem key={i}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 40,
                      bgcolor: "rgba(255,255,255,0.1)",
                      borderRadius: 1,
                    }}
                  />
                </ListItem>
              ))
            : rootNavItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={getLocalizedHref(item.url, pathname)}
                    onClick={closeMenu}
                    sx={{
                      bgcolor:
                        pathname === getLocalizedHref(item.url, pathname)
                          ? "rgba(255,255,255,0.1)"
                          : "transparent",
                      borderRadius: 1,
                      mb: 1,
                      "&:hover": { bgcolor: "rgba(250, 204, 21, 0.1)" },
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      sx={{
                        "& .MuiTypography-root": {
                          fontWeight: 700,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color:
                            pathname === getLocalizedHref(item.url, pathname)
                              ? "secondary.main"
                              : "white",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          <Box sx={{ px: 2, mt: 2 }}>
            <LanguageSelector />
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
}
