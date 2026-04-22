import { Metadata } from "next";
import { getSettings, getBlogPosts } from "@/lib/supabase/queries";
import BlogPageClient from "./BlogPageClient";

const FALLBACK_IMAGE =
  "https://xvwxwrrqopcyzsnrwxbf.supabase.co/storage/v1/object/public/habib-portfolio-bucket/habib_professional_suit.webp";

const sanitizeImageUrl = (url: string | null | undefined): string => {
  if (!url || typeof url !== "string") return FALLBACK_IMAGE;
  const cleaned = url.replace(/^["']+|["']+$/g, "").trim();
  if (!cleaned) return FALLBACK_IMAGE;
  if (cleaned.startsWith("/") || cleaned.startsWith("http")) return cleaned;
  return FALLBACK_IMAGE;
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const settings = await getSettings(lang);
  const blogMetaTitle = settings?.blog_meta_title ?? null;
  const blogMetaDesc = settings?.blog_meta_description ?? null;
  return {
    title: typeof blogMetaTitle === "string" ? blogMetaTitle : "Blog",
    description:
      typeof blogMetaDesc === "string"
        ? blogMetaDesc
        : "Read my thoughts on web development, programming, and technology.",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const rawPosts = await getBlogPosts(lang);

  const blogPosts = rawPosts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    featuredImage: sanitizeImageUrl(post.cover_image),
    author: post.author || "Habib Farooq",
    tags: Array.isArray(post.tags) ? post.tags : [],
    published: Boolean(post.is_published),
    publishedAt: post.published_at || post.created_at,
    views: Number(post.views || 0),
    readTime: Number(post.read_time || 6),
    category: post.category || "General",
  }));

  const popularPosts = [...blogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((p) => ({ id: p.id, title: p.title, slug: p.slug, views: p.views }));

  const tagCount = new Map<string, number>();
  const categoryCount = new Map<string, number>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
    const category = post.category;
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
  });

  const palette = [
    "#3b82f6",
    "#a855f7",
    "#ef4444",
    "#22c55e",
    "#eab308",
    "#6366f1",
  ];
  const popularTags = Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const categories = Array.from(categoryCount.entries()).map(
    ([name, count], index) => ({
      name,
      count,
      color: palette[index % palette.length],
    }),
  );

  return (
    <BlogPageClient
      blogPosts={blogPosts}
      popularPosts={popularPosts}
      popularTags={popularTags}
      categories={categories}
    />
  );
}
