"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Share2, Bookmark, Heart, MessageCircle } from "lucide-react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getLocalizedHref } from "@/lib/utils";

interface BlogPostContentProps {
  post: {
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
    authorBio: string;
    authorImage: string;
  };
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [commentCount] = useState(15);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Stack spacing={5}>
        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <IconButton
            onClick={handleShare}
            aria-label="Share"
            sx={{
              border: "1px solid var(--border)",
              borderRadius: "5px",
              "&:hover": { bgcolor: "var(--primary)", color: "white" },
              transition: "all 0.3s",
            }}
          >
            <Share2 size={18} />
          </IconButton>
          <IconButton
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label="Bookmark"
            sx={{
              border: "1px solid var(--border)",
              borderRadius: "5px",
              color: isBookmarked ? "var(--primary)" : "inherit",
              "&:hover": { bgcolor: "var(--primary)", color: "white" },
              transition: "all 0.3s",
            }}
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </IconButton>
        </Box>

        {/* Featured Image */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "5px",
            overflow: "hidden",
            height: { xs: 240, md: 400 },
            boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
          }}
        >
          {post.featuredImage &&
          !post.featuredImage.startsWith("/api/placeholder") ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #106A5A 0%, #0d594b 40%, #FACC15 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "5rem",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.15)",
                  textTransform: "uppercase",
                }}
              >
                {post.title.charAt(0)}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Markdown Content */}
        <Box
          sx={{
            "& h1": {
              fontSize: { xs: "1.8rem", md: "2.25rem" },
              fontWeight: 900,
              mt: 5,
              mb: 2,
              color: "var(--foreground)",
              borderBottom: "2px solid var(--primary)",
              pb: 1,
            },
            "& h2": {
              fontSize: { xs: "1.4rem", md: "1.75rem" },
              fontWeight: 800,
              mt: 4,
              mb: 2,
              color: "var(--foreground)",
            },
            "& h3": {
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              fontWeight: 700,
              mt: 3,
              mb: 1.5,
              color: "var(--foreground)",
            },
            "& p": {
              lineHeight: 1.9,
              mb: 2,
              color: "var(--muted-foreground)",
              fontSize: "1.05rem",
            },
            "& ul, & ol": {
              pl: 3,
              mb: 2,
              "& li": {
                mb: 0.75,
                color: "var(--muted-foreground)",
                lineHeight: 1.8,
              },
            },
            "& blockquote": {
              borderLeft: "4px solid var(--primary)",
              pl: 3,
              py: 1,
              my: 3,
              bgcolor: "rgba(16,106,90,0.04)",
              borderRadius: "0 5px 5px 0",
              fontStyle: "italic",
            },
            "& a": {
              color: "var(--primary)",
              textDecoration: "underline",
              "&:hover": { opacity: 0.8 },
            },
            "& code": {
              bgcolor: "rgba(16,106,90,0.08)",
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              fontSize: "0.88em",
              fontFamily: "monospace",
              color: "var(--primary)",
            },
            "& pre code": {
              bgcolor: "transparent",
              px: 0,
              py: 0,
              color: "inherit",
            },
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ borderRadius: "5px", marginBottom: "16px" }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </Box>

        {/* Tags */}
        <Box sx={{ pt: 4, borderTop: "1px solid var(--border)" }}>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              color: "var(--primary)",
              mb: 2,
              display: "block",
            }}
          >
            Tags
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                component={Link}
                href={getLocalizedHref(
                  `/blog?tag=${tag.toLowerCase()}`,
                  pathname,
                )}
                clickable
                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "var(--primary)",
                    color: "white",
                    borderColor: "var(--primary)",
                  },
                  transition: "all 0.3s",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Author Bio */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "5px",
            border: "1px solid var(--border)",
            bgcolor: "rgba(16,106,90,0.03)",
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              flexShrink: 0,
              borderRadius: "50%",
              bgcolor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 900,
              fontSize: "1.5rem",
            }}
          >
            {post.author.charAt(0)}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              About {post.author}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.8 }}
            >
              {post.authorBio}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                href={getLocalizedHref("/about", pathname)}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "5px",
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "var(--primary)", color: "white" },
                }}
              >
                View Profile
              </Button>
              <Button
                component={Link}
                href={getLocalizedHref("/contact", pathname)}
                variant="text"
                size="small"
                sx={{
                  borderRadius: "5px",
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                Contact
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Engagement Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: { xs: 2.5, md: 4 },
            borderRadius: "5px",
            border: "1px solid var(--border)",
            bgcolor: "white",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={3}>
            <Box
              component="button"
              onClick={handleLike}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isLiked ? "#ef4444" : "var(--muted-foreground)",
                fontWeight: 600,
                transition: "color 0.2s",
                "&:hover": { color: "#ef4444" },
              }}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {likeCount}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "var(--muted-foreground)",
              }}
            >
              <MessageCircle size={20} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {commentCount} comments
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Share2 size={16} />}
              onClick={handleShare}
              size="small"
              sx={{
                borderRadius: "5px",
                borderColor: "var(--border)",
                color: "var(--foreground)",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                },
              }}
            >
              Share
            </Button>
            <Button
              variant="outlined"
              startIcon={
                <Bookmark
                  size={16}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              }
              onClick={() => setIsBookmarked(!isBookmarked)}
              size="small"
              sx={{
                borderRadius: "5px",
                borderColor: isBookmarked ? "var(--primary)" : "var(--border)",
                color: isBookmarked ? "var(--primary)" : "var(--foreground)",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                },
              }}
            >
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </Stack>
        </Box>

        {/* Navigation */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box
            component={Link}
            href={getLocalizedHref("/blog", pathname)}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: "5px",
              border: "1px solid var(--border)",
              textDecoration: "none",
              color: "var(--foreground)",
              transition: "all 0.3s",
              "&:hover": {
                borderColor: "var(--primary)",
                boxShadow: "0 10px 30px rgba(16,106,90,0.1)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "var(--muted-foreground)",
                display: "block",
                mb: 0.5,
              }}
            >
              ← Back to Blog
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>View all articles</Typography>
          </Box>
          <Box
            component={Link}
            href={getLocalizedHref("/blog", pathname)}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: "5px",
              border: "1px solid var(--border)",
              textDecoration: "none",
              color: "var(--foreground)",
              textAlign: "right",
              transition: "all 0.3s",
              "&:hover": {
                borderColor: "var(--primary)",
                boxShadow: "0 10px 30px rgba(16,106,90,0.1)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "var(--muted-foreground)",
                display: "block",
                mb: 0.5,
              }}
            >
              Next Article →
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>
              The Future of AI in Web Development
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </motion.article>
  );
}
