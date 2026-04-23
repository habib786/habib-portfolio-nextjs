import { createClient, createAnonClient } from "./server";
import type { Database } from "../types";
import {
  resilientQueryArray,
  resilientQuerySingle,
  resilientQuery,
} from "./resilient";

type Tables = Database["public"]["Tables"];

const getSupabaseClient = async () => {
  try {
    return await createClient();
  } catch (error) {
    console.warn("Failed to create Supabase client:", error);
    return null;
  }
};

const getAnonSupabaseClient = () => {
  return createAnonClient();
};

// Pages queries
export async function getPages(language?: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("pages")
    .select("*")
    .eq("is_published", true)
    .order("order", { ascending: true });

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "pages" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching pages:", error);
    }
    return [];
  }

  return data || [];
}

export async function getPageBySlug(slug: string, language?: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;

  let query = supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true);

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error } = await query.single();

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "pages" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching page:", error);
    }
    return null;
  }

  return data;
}

// Menu queries
export async function getMenu(language?: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("menu_items")
    .select("*")
    .order("order", { ascending: true });

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "menu_items" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching menu:", error);
    }
    return [];
  }

  // Organize menu items hierarchically
  const menuItems = data || [];
  const itemMap = new Map<
    string,
    Tables["menu_items"]["Row"] & { children: any[] }
  >();
  const rootItems: (Tables["menu_items"]["Row"] & { children: any[] })[] = [];

  // First pass: create map
  menuItems.forEach((item) => {
    itemMap.set(item.id, { ...item, children: [] });
  });

  // Second pass: build hierarchy
  menuItems.forEach((item) => {
    const menuItem = itemMap.get(item.id)!;
    if (item.parent_id && itemMap.has(item.parent_id)) {
      const parent = itemMap.get(item.parent_id)!;
      parent.children.push(menuItem);
    } else {
      rootItems.push(menuItem);
    }
  });

  // Sort children by order
  const sortItems = (
    items: (Tables["menu_items"]["Row"] & { children: any[] })[],
  ) => {
    items.sort((a, b) => a.order - b.order);
    items.forEach((item) => {
      if (item.children.length > 0) {
        sortItems(item.children);
      }
    });
  };

  sortItems(rootItems);
  return rootItems;
}

// Languages queries
export async function getLanguages(activeOnly = true) {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];

  let query = supabase.from("languages").select("*").order("code");

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "languages" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching languages:", JSON.stringify(error));
    }
    return [];
  }

  return data || [];
}

export async function getDefaultLanguage() {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("languages")
    .select("*")
    .eq("is_default", true)
    .single();

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "languages" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else if (error.code !== "PGRST116") {
      // PGRST116 is the code for 0 rows returned, which is fine if no default language is set yet
      console.error("Error fetching default language:", JSON.stringify(error));
    }
    return null;
  }

  return data;
}

// Settings queries
export async function getSettings(lang?: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return {};

  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "settings" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching settings:", error);
    }
    return {};
  }

  if (!data || data.length === 0) {
    return {};
  }

  // Convert array to object
  const settingsObj: Record<string, any> = {};
  data.forEach((setting) => {
    settingsObj[setting.key] = setting.value;
  });

  // If language is provided, override base keys with translated versions if they exist
  if (lang) {
    data.forEach((setting) => {
      if (setting.key.endsWith(`_${lang}`)) {
        const baseKey = setting.key.replace(`_${lang}`, "");
        settingsObj[baseKey] = setting.value;
      }
    });
  }

  return settingsObj;
}

export async function getSetting(key: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "settings" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching setting:", error);
    }
    return null;
  }

  return data?.value;
}

// Blog posts queries
export async function getBlogPosts(language?: string, limit?: number) {
  const supabase = getAnonSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (language) {
    query = query.eq("language", language);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "blog_posts" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching blog posts:", error);
    }
    return [];
  }

  return data;
}

export async function getBlogPostBySlug(slug: string, language?: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true);

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error } = await query.single();

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "blog_posts" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching blog post:", error);
    }
    return null;
  }

  return data;
}

// Projects queries
export async function getProjects(language?: string, featuredOnly = false) {
  const supabase = getAnonSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (language) {
    query = query.eq("language", language);
  }

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "projects" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching projects:", error);
    }
    return [];
  }

  return data;
}

export async function getProjectBySlug(slug: string, language?: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;

  let query = supabase.from("projects").select("*").eq("slug", slug);

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error } = await query.single();

  if (error) {
    if (error.code === "PGRST205") {
      console.error(
        'Error: Table "projects" not found in Supabase. Please run the migration script in SUPABASE_SETUP.md',
      );
    } else {
      console.error("Error fetching project:", error);
    }
    return null;
  }

  return data;
}

// Contact messages queries
export async function getContactMessages(limit?: number) {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }

  return data;
}

export async function getProfileData(lang?: string) {
  const settings = await getSettings(lang);

  const getVal = (key: string) => {
    if (lang) {
      const langKey = `${key}_${lang}`;
      if (settings[langKey] !== undefined) return settings[langKey];
    }
    return settings[key];
  };

  const sanitizeImageUrl = (url: string | null | undefined) => {
    if (!url || typeof url !== "string")
      return "https://xvwxwrrqopcyzsnrwxbf.supabase.co/storage/v1/object/public/habib-portfolio-bucket/habib_professional_suit.webp";
    const cleaned = url.replace(/^["']+|["']+$/g, "").trim();
    if (!cleaned)
      return "https://xvwxwrrqopcyzsnrwxbf.supabase.co/storage/v1/object/public/habib-portfolio-bucket/habib_professional_suit.webp";
    if (cleaned.startsWith("/") || cleaned.startsWith("http")) return cleaned;
    return "https://xvwxwrrqopcyzsnrwxbf.supabase.co/storage/v1/object/public/habib-portfolio-bucket/habib_professional_suit.webp";
  };

  const sanitize = (val: any, fallback: string) => {
    if (!val || typeof val !== "string") return fallback;
    const cleaned = val.replace(/^["']+|["']+$/g, "").trim();
    return cleaned || fallback;
  };


  return {
    name: sanitize(getVal("profile_name"), "HABIB"),
    role: sanitize(getVal("profile_role"), "Full Stack Web Developer"),
    experience: sanitize(getVal("stat_experience"), "7+"),
    projects: sanitize(getVal("stat_projects"), "70+"),
    clients: sanitize(getVal("stat_clients"), "30+"),
    image: sanitizeImageUrl(getVal("profile_image")),
  };
}

// Site metadata
export async function getSiteMetadata(lang?: string) {
  try {
    const [settings, defaultLanguage] = await Promise.all([
      getSettings(lang),
      getDefaultLanguage(),
    ]);

    const siteUrl = (
      settings?.site_url ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://habibfarooq.com"
    ).trim();
    const contactEmail = (
      settings?.contact_email || "contact@habibfarooq.com"
    ).trim();

    return {
      title: settings?.site_title || "Habib",
      description: settings?.site_description || "Personal portfolio and blog",
      url: siteUrl,
      contactEmail: contactEmail,
      defaultLanguage: (defaultLanguage?.code || "en").trim(),
      keywords: settings?.seo_keywords
        ? typeof settings.seo_keywords === "string"
          ? JSON.parse(settings.seo_keywords)
          : settings.seo_keywords
        : [
            "Full Stack Developer",
            "AI Engineer",
            "React",
            "Next.js",
            "TypeScript",
            "Python",
            "Machine Learning",
          ],
      languages: await getLanguages(true),
    };
  } catch (error) {
    console.error("Error fetching site metadata:", error);
    return {
      title: "Habib",
      description: "Personal portfolio and blog",
      url: "https://habibfarooq.com",
      contactEmail: "contact@habibfarooq.com",
      defaultLanguage: "en",
      languages: [],
    };
  }
}
