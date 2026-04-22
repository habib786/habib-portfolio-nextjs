import { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ExperienceEducationSection from "@/components/experience/ExperienceEducationSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { createClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/supabase/queries";
import { cleanValue } from "@/lib/utils";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const settings = await getSettings(lang);
    const contactMetaTitle = settings?.contact_meta_title ?? null;
    const contactMetaDesc = settings?.contact_meta_description ?? null;
    return {
        title: typeof contactMetaTitle === "string" ? contactMetaTitle : "Contact",
        description:
            typeof contactMetaDesc === "string"
                ? contactMetaDesc
                : "Get in touch with Habib Farooq for project inquiries, collaborations, or just to say hello.",
    };
}

import ContactHero from "@/components/contact/ContactHero";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    
    const FALLBACK_IMAGE =
        "https://xvwxwrrqopcyzsnrwxbf.supabase.co/storage/v1/object/public/habib-portfolio-bucket/habib_professional_suit.webp";

    const sanitizeImageUrl = (url: string | null | undefined): string => {
        if (!url || typeof url !== "string") return FALLBACK_IMAGE;
        const cleaned = url.replace(/^["']+|["']+$/g, "").trim();
        if (!cleaned) return FALLBACK_IMAGE;
        if (cleaned.startsWith("/") || cleaned.startsWith("http")) return cleaned;
        return FALLBACK_IMAGE;
    };

    const supabase = await createClient();
    let profileImage = FALLBACK_IMAGE;

    if (supabase) {
        const { data: settingsData } = await supabase.from("settings").select("*");
        if (settingsData) {
            const settings: any = {};
            settingsData.forEach((item: any) => {
                settings[item.key] = item.value;
            });

            profileImage = sanitizeImageUrl(
                settings[`profile_image_${lang}`] || settings["profile_image"]
            );
        }
    }

    return (
        <Box
            sx={{ minHeight: "100vh", pb: 10, bgcolor: "var(--background)" }}
            id="top"
        >
            {/* Hero Section */}
            <ContactHero profileImage={profileImage} />

            {/* Contact Form Section */}
            <Container
                maxWidth="lg"
                id="contact-form"
                sx={{ scrollMarginTop: "100px", mt: { xs: 10, md: 20 } }}
            >
                <Grid container spacing={8} sx={{ alignItems: "stretch" }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ mb: 6 }}>
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                                Let's Build Something <br />
                                <span style={{ color: "#106A5A" }}>Amazing Together</span>
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 4, fontSize: "1.1rem" }}
                            >
                                Have a specific inquiry or just want to chat? Fill out the form,
                                and I'll get back to you within 24 hours.
                            </Typography>
                        </Box>
                        <ContactInfo />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            id="form-container"
                            sx={{
                                p: { xs: 3, md: 5 },
                                bgcolor: "background.paper",
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                            }}
                        >
                            <ContactForm />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Experience Timeline Section */}
            <Box sx={{ py: { xs: 8, md: 12 } }}>
                <ExperienceEducationSection />
            </Box>
        </Box>
    );
}
