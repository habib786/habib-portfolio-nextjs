import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Container, Grid } from "@mui/material";
import ProjectContent from "@/components/projects/ProjectContent";
import ProjectSidebar from "@/components/projects/ProjectSidebar";
import ProjectHero from "@/components/projects/ProjectHero";
import { getProjectBySlug, getProjects } from "@/lib/supabase/queries";
import { MappedProject, RelatedProject } from "@/lib/types";
import { mapProject } from "@/lib/projects/mapProject";

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const rawProject = await getProjectBySlug(slug, lang);

  if (!rawProject) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const project = mapProject(rawProject);
  const ogImageUrl = project.thumbnail || "/opengraph-image";

  return {
    title: project.title,
    description: project.excerpt,
    keywords: project.tags,
    openGraph: {
      type: "website",
      title: project.title,
      description: project.excerpt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@habibfarooq",
      creator: "@habibfarooq",
      title: project.title,
      description: project.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  const rawProject = await getProjectBySlug(slug, lang);

  if (!rawProject) {
    notFound();
  }

  const project = mapProject(rawProject);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://habibfarooq.com";
  const projectUrl = `${baseUrl}/${lang}/projects/${project.slug}`;
  const imageUrl = project.thumbnail
    ? project.thumbnail.startsWith("http")
      ? project.thumbnail
      : `${baseUrl}${project.thumbnail.startsWith("/") ? "" : "/"}${project.thumbnail}`
    : `${baseUrl}/opengraph-image`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    url: projectUrl,
    image: [imageUrl],
    keywords: project.tags,
  };
  const relatedRaw = await getProjects(lang, false);
  const related: RelatedProject[] = (relatedRaw || [])
    .filter((item): item is Record<string, unknown> => item?.slug !== slug)
    .slice(0, 3)
    .map((item): RelatedProject => mapProject(item as Record<string, unknown>));

  return (
    <Box
      sx={{
        bgcolor: "var(--background)",
        minHeight: "100vh",
        pb: { xs: 10, md: 20 },
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectHero project={project} />

      <Container
        maxWidth="xl"
        sx={{ mt: { xs: -8, md: -12 }, position: "relative", zIndex: 10 }}
      >
        <Box
          sx={{
            bgcolor: "var(--background)",
            p: { xs: 4, md: 8 },
            borderRadius: "5px",
            boxShadow: "0 60px 120px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            backgroundImage:
              "linear-gradient(to bottom right, rgba(255,255,255,1), rgba(248,250,252,1))",
          }}
        >
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <ProjectContent project={project} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <ProjectSidebar project={project} relatedProjects={related} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
