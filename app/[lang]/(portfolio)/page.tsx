import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getDictionary, hasLocale } from "../dictionaries";
import HeroSection from "@/components/home/HeroSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Box } from "@mui/material";
import { getProfileData } from "@/lib/supabase/queries";

const TechStackSection = dynamic(
  () => import("@/components/home/TechStackSection"),
  { loading: () => <Box sx={{ h: 200 }} /> }
);
const ProjectsSection = dynamic(
  () => import("@/components/home/ProjectsSection"),
  { loading: () => <Box sx={{ h: 400 }} /> }
);
const ExperienceEducationSection = dynamic(
  () => import("@/components/experience/ExperienceEducationSection"),
  { loading: () => <Box sx={{ h: 300 }} /> }
);
const ServicesSection = dynamic(
  () => import("@/components/home/ServicesSection"),
  { loading: () => <Box sx={{ h: 200 }} /> }
);
const ClientsSection = dynamic(
  () => import("@/components/home/ClientsSection"),
  { loading: () => <Box sx={{ h: 150 }} /> }
);

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const profile = await getProfileData(lang);

  return (
    <div className="flex flex-col min-h-screen bg-transparent font-sans overflow-hidden relative">
      <HeroSection dict={dict} profile={profile} />

      <ScrollReveal>
        <TechStackSection />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <ProjectsSection />
      </ScrollReveal>

      <Box sx={{ py: { xs: 8, md: 15 } }}>
        <ExperienceEducationSection />
      </Box>

      <ScrollReveal direction="up">
        <ServicesSection lang={lang} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <ClientsSection lang={lang} />
      </ScrollReveal>
    </div>
  );
}
