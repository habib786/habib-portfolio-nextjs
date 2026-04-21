import { MetadataRoute } from "next";
import { locales } from "./[lang]/dictionaries";
import { getBlogPosts, getProjects } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

type UrlEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "weekly"
    | "monthly"
    | "always"
    | "hourly"
    | "daily"
    | "yearly"
    | "never";
  priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://habibfarooq.com";

  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/experience",
    "/projects",
    "/services",
  ];

  const staticUrls = [] as UrlEntry[];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      const langPrefix = `/${locale}`;
      const url = `${baseUrl}${langPrefix}${route}`;
      staticUrls.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  const dynamicUrls = [] as UrlEntry[];

  for (const locale of locales) {
    const blogPosts = await getBlogPosts(locale);
    for (const post of blogPosts) {
      if (post.slug) {
        const langPrefix = `/${locale}`;
        dynamicUrls.push({
          url: `${baseUrl}${langPrefix}/blog/${post.slug}`,
          lastModified: post.updated_at || post.published_at || new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }

    const projects = await getProjects(locale);
    for (const project of projects) {
      if (project.slug) {
        const langPrefix = `/${locale}`;
        dynamicUrls.push({
          url: `${baseUrl}${langPrefix}/projects/${project.slug}`,
          lastModified: project.updated_at || new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return [...staticUrls, ...dynamicUrls] as MetadataRoute.Sitemap;
}
