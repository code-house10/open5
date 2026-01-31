import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    badge_text: string;
    badge_color: string;
    cta_text: string;
    cta_link: string;
    whatsapp_text: string;
    image_url: string | null;
    bg_image_url: string | null;
    order_index: number;
    active: boolean;
    created_at: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    order_index: number;
    active: boolean;
    created_at: string;
}

export interface AboutSection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string | null;
    features: string[];
    years_experience: number;
    created_at: string;
}

export interface TeamMember {
    id: string;
    name: string;
    position: string;
    image_url: string | null;
    facebook_url: string | null;
    twitter_url: string | null;
    instagram_url: string | null;
    order_index: number;
    active: boolean;
    created_at: string;
}

export interface Testimonial {
    id: string;
    client_name: string;
    client_position: string;
    content: string;
    image_url: string | null;
    rating: number;
    active: boolean;
    created_at: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    order_index: number;
    active: boolean;
    created_at: string;
}

export interface ContactInfo {
    id: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    working_hours: string;
    facebook_url: string | null;
    instagram_url: string | null;
    twitter_url: string | null;
    created_at: string;
}

export interface SiteSettings {
    id: string;
    logo_url: string | null;
    site_name: string;
    site_name_ar: string;
    meta_description: string;
    favicon_url: string | null;
    created_at: string;
}
