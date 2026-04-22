"use client";

import { useEffect, useState } from "react";

type UseProfileImageOptions = {
  defaultImage?: string;
};

const FALLBACK_IMAGE =
  "https://xvwxwrrqopcyzsnrwxbf.supabase.co/storage/v1/object/public/habib-portfolio-bucket/habib_professional_suit.webp";

const sanitizeImageUrl = (url: string | null | undefined): string => {
  if (!url || typeof url !== "string") return FALLBACK_IMAGE;
  const cleaned = url.replace(/^["']+|["']+$/g, "").trim();
  if (!cleaned) return FALLBACK_IMAGE;
  if (cleaned.startsWith("/") || cleaned.startsWith("http")) return cleaned;
  return FALLBACK_IMAGE;
};

export function useProfileImage(options: UseProfileImageOptions = {}) {
  const { defaultImage = FALLBACK_IMAGE } = options;
  const [profileImage, setProfileImage] = useState(defaultImage);

  useEffect(() => {
    async function fetchProfileImage() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        if (!supabase) return;

        const { data } = await supabase.from("settings").select("*");
        if (!data) return;

        const profileImg = data.find(
          (item: any) => item.key === "profile_image",
        )?.value;
        if (typeof profileImg === "string" && profileImg.trim()) {
          const cleanedUrl = profileImg.replace(/^["']+|["']+$/g, "").trim();
          if (cleanedUrl.startsWith("/") || cleanedUrl.startsWith("http")) {
            setProfileImage(cleanedUrl);
          }
        }
      } catch {
        // Keep default image on any fetch / load failure.
      }
    }

    fetchProfileImage();
  }, []);

  return profileImage;
}
