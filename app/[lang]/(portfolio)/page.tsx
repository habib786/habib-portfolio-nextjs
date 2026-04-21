import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import HeroSection from "@/components/home/HeroSection";
import TechStackSection from "@/components/home/TechStackSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ExperienceEducationSection from "@/components/experience/ExperienceEducationSection";
import ServicesSection from "@/components/home/ServicesSection";
import ClientsSection from "@/components/home/ClientsSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Box } from "@mui/material";

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

  return (
    <div className="flex flex-col min-h-screen bg-transparent font-sans overflow-hidden relative">
      {/* We can pass dict to sections if we want to localize them */}
      <HeroSection dict={dict} />

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
