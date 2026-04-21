import type { MappedProject } from "@/lib/types";

export function mapProject(raw: Record<string, unknown> | null): MappedProject {
  if (!raw) {
    return {
      id: 0,
      title: "Untitled",
      slug: "",
      excerpt: "",
      content: "",
      thumbnail: "",
      category: "",
      technologies: [],
      liveUrl: "",
      repoUrl: "",
      featured: false,
      tags: [],
      createdAt: new Date().toISOString(),
      views: 0,
    };
  }

  const tags = Array.isArray(raw.tags) ? (raw.tags as string[]) : [];
  const createdAt = (raw.created_at as string) || new Date().toISOString();

  return {
    id: (raw.id as number | string) ?? 0,
    title: (raw.title as string) ?? "Untitled",
    slug: (raw.slug as string) ?? "",
    excerpt: (raw.excerpt as string) ?? (raw.description as string) ?? "",
    content: (raw.content as string) ?? "",
    thumbnail: (raw.thumbnail as string) ?? (raw.cover_image as string) ?? "",
    category: (raw.category as string) ?? "",
    technologies: (raw.technologies as string[]) ?? [],
    liveUrl: (raw.live_url as string) ?? (raw.liveUrl as string) ?? "",
    repoUrl: (raw.repo_url as string) ?? (raw.github_url as string) ?? "",
    featured: Boolean(raw.featured),
    tags,
    createdAt,
    views: Number(raw.views ?? 0),
  };
}
