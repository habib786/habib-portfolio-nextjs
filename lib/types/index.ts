// Database types matching the Supabase schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      languages: {
        Row: {
          code: string;
          name: string;
          is_default: boolean;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          code: string;
          name: string;
          is_default?: boolean;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          code?: string;
          name?: string;
          is_default?: boolean;
          is_active?: boolean;
          created_at?: string;
        };
      };
      pages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: Json;
          meta_title: string | null;
          meta_description: string | null;
          is_published: boolean;
          language: string;
          created_at: string;
          updated_at: string;
          order: number | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          language: string;
          created_at?: string;
          updated_at?: string;
          order?: number | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          language?: string;
          created_at?: string;
          updated_at?: string;
          order?: number | null;
        };
      };
      menu_items: {
        Row: {
          id: string;
          title: string;
          url: string;
          icon: string | null;
          order: number;
          parent_id: string | null;
          is_external: boolean;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          url: string;
          icon?: string | null;
          order: number;
          parent_id?: string | null;
          is_external?: boolean;
          language: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          url?: string;
          icon?: string | null;
          order?: number;
          parent_id?: string | null;
          is_external?: boolean;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          author: string | null;
          published_at: string | null;
          is_published: boolean;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          author?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          language: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image?: string | null;
          author?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          content: string | null;
          cover_image: string | null;
          technologies: string[] | null;
          github_url: string | null;
          live_url: string | null;
          featured: boolean;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          content?: string | null;
          cover_image?: string | null;
          technologies?: string[] | null;
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          language: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          content?: string | null;
          cover_image?: string | null;
          technologies?: string[] | null;
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Legacy types for backward compatibility
export type Project = Database['public']['Tables']['projects']['Row'] & {
  // Additional properties if needed
};

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'] & {
  // Additional properties if needed
};

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'other';
  proficiency: number; // 1-100
  icon?: string;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  location: string;
  technologies: string[];
  order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description?: string;
  location: string;
  order: number;
}

// Helper types
export type Page = Database['public']['Tables']['pages']['Row'];
export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
export type Language = Database['public']['Tables']['languages']['Row'];
export type Setting = Database['public']['Tables']['settings']['Row'];