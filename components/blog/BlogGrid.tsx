"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  Eye,
  Search as SearchIcon,
  Filter,
} from "lucide-react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Grid,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { formatDate, getLocalizedHref } from "@/lib/utils";

const sortOptions = ["Newest", "Popular", "Trending"];

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
  views: number;
  readTime: number;
  category: string;
}

export default function BlogGrid({ blogPosts }: { blogPosts: BlogPost[] }) {
  const theme = useTheme();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = useMemo(() => {
    const dynamic = Array.from(
      new Set(blogPosts.map((post) => post.category).filter(Boolean)),
    );
    return ["All", ...dynamic];
  }, [blogPosts]);

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "Newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "Popular":
          return b.views - a.views;
        case "Trending":
          const aDays = Math.max(
            1,
            (Date.now() - new Date(a.publishedAt).getTime()) /
              (1000 * 60 * 60 * 24),
          );
          const bDays = Math.max(
            1,
            (Date.now() - new Date(b.publishedAt).getTime()) /
              (1000 * 60 * 60 * 24),
          );
          return b.views / bDays - a.views / aDays;
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {/* Search and Filter Bar */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <form onSubmit={handleSearch} style={{ width: "100%" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        px: 3,
                        fontWeight: "bold",
                      }}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[2],
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                  },
                  transition: "box-shadow 0.3s ease",
                },
              },
            }}
          />
        </form>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Categories */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                color={selectedCategory === category ? "primary" : "default"}
                variant={selectedCategory === category ? "filled" : "outlined"}
                sx={{
                  borderRadius: 2,
                  fontWeight: selectedCategory === category ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              />
            ))}
          </Box>

          {/* Sort Options */}
          <Select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            size="small"
            IconComponent={Filter}
            sx={{
              borderRadius: 2,
              bgcolor: "background.paper",
              minWidth: 160,
              boxShadow: theme.shadows[1],
              "& .MuiSelect-select": { py: 1, px: 2 },
              "& .lucide": {
                mr: 1,
                ml: 1,
                width: 16,
                height: 16,
                color: "text.secondary",
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option} value={option}>
                Sort: {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Results Info */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "text.secondary",
          typography: "body2",
        }}
      >
        <Typography variant="body2">
          Showing {filteredPosts.length > 0 ? startIndex + 1 : 0}-
          {Math.min(startIndex + postsPerPage, filteredPosts.length)} of{" "}
          {filteredPosts.length} articles
        </Typography>
        {searchQuery && (
          <Typography variant="body2">
            Search results for:{" "}
            <Box component="span" sx={{ fontWeight: 600 }}>
              "{searchQuery}"
            </Box>
          </Typography>
        )}
      </Box>

      {/* Blog Posts Grid */}
      <Grid container spacing={4}>
        {paginatedPosts.map((post, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              style={{ height: "100%" }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  bgcolor: "white",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    boxShadow: "0 30px 60px rgba(16,106,90,0.12)",
                    transform: "translateY(-10px)",
                    "& .post-image": {
                      transform: "scale(1.08)",
                    },
                  },
                }}
              >
                <Box sx={{ position: "relative", height: 240, p: 1.5 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "18px 18px 0 0",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={post.featuredImage}
                      alt={post.title}
                      className="post-image"
                      sx={{
                        height: "100%",
                        transition: "transform 0.6s ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                        display: "flex",
                        alignItems: "flex-end",
                        p: 2,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2.5}
                        sx={{ color: "white" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Eye size={14} />
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 700 }}
                          >
                            {post.views.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Clock size={14} />
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 700 }}
                          >
                            {post.readTime}m
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                    pt: 1,
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{
                        bgcolor: "var(--primary)",
                        color: "white",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        height: 20,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    component={Link}
                    href={getLocalizedHref(`/blog/${post.slug}`, pathname)}
                    sx={{
                      fontWeight: 900,
                      mb: 2,
                      textDecoration: "none",
                      color: "text.primary",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      transition: "color 0.2s",
                      fontSize: "1.4rem",
                      lineHeight: 1.2,
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      flexGrow: 1,
                      lineHeight: 1.7,
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "text.secondary",
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50% 50% 0 0",
                          bgcolor: "#FACC15",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "black",
                          fontWeight: 900,
                          fontSize: "0.6rem",
                          border: "1px solid white",
                        }}
                      >
                        {post.author.charAt(0)}
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {post.author}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "text.secondary",
                        opacity: 0.6,
                      }}
                    >
                      <Calendar size={12} />
                      <Typography variant="caption">
                        {formatDate(post.publishedAt)}
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    component={Link}
                    href={getLocalizedHref(`/blog/${post.slug}`, pathname)}
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={
                      <Box component="span" sx={{ fontSize: "1.2rem" }}>
                        →
                      </Box>
                    }
                    sx={{
                      mt: "auto",
                      justifyContent: "center",
                      textTransform: "uppercase",
                      fontWeight: 900,
                      py: 1.5,
                      borderRadius: "12px",
                      letterSpacing: 2,
                      fontSize: "0.75rem",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "black",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            size="large"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 3,
              borderRadius: "50%",
              bgcolor: "action.hover",
              mb: 3,
            }}
          >
            <SearchIcon size={32} style={{ opacity: 0.5 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            No articles found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your search or filter to find what you're looking for.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
