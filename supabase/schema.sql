-- Transit Logistics Supabase Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Hero Slides Table
-- =============================================
CREATE TABLE IF NOT EXISTS hero_slides (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    description TEXT NOT NULL,
    badge_text TEXT DEFAULT '',
    badge_color TEXT DEFAULT '#e74c3c',
    cta_text TEXT DEFAULT 'احصل على عرض سعر',
    cta_link TEXT DEFAULT 'tel:+201012345678',
    whatsapp_text TEXT DEFAULT 'واتساب',
    image_url TEXT,
    bg_image_url TEXT,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Services Table
-- =============================================
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    icon TEXT DEFAULT 'fas fa-truck',
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Team Members Table
-- =============================================
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    image_url TEXT,
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    whatsapp_url TEXT,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Testimonials Table
-- =============================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_position TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    rating INTEGER DEFAULT 5 CHECK (
        rating >= 1
        AND rating <= 5
    ),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- FAQ Table
-- =============================================
CREATE TABLE IF NOT EXISTS faq (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- About Section Table (single row)
-- =============================================
CREATE TABLE IF NOT EXISTS about_section (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT DEFAULT 'من نحن',
    subtitle TEXT DEFAULT 'شركة متخصصة في نقل العفش',
    description TEXT NOT NULL,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    years_experience INTEGER DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Contact Info Table (single row)
-- =============================================
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    phone TEXT NOT NULL,
    phone2 TEXT,
    whatsapp TEXT,
    email TEXT,
    address TEXT,
    working_hours TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    tiktok_url TEXT,
    map_embed TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Site Settings Table (single row)
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    site_name TEXT DEFAULT 'ترانزيت لوجستيكس',
    site_name_ar TEXT DEFAULT 'ترانزيت لوجستيكس',
    logo_url TEXT,
    favicon_url TEXT,
    meta_description TEXT,
    primary_color TEXT DEFAULT '#e74c3c',
    secondary_color TEXT DEFAULT '#1a1a2e',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Portfolio/Projects Table
-- =============================================
CREATE TABLE IF NOT EXISTS portfolio (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'نقل عفش',
    description TEXT,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Blog Posts Table
-- =============================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    author TEXT DEFAULT 'المدير',
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Counter Stats Table
-- =============================================
CREATE TABLE IF NOT EXISTS counter_stats (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    icon TEXT DEFAULT 'fas fa-check',
    count INTEGER NOT NULL,
    suffix TEXT DEFAULT '+',
    label TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Enable Row Level Security (RLS)
-- =============================================
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;

ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

ALTER TABLE counter_stats ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Create policies for public read access
-- =============================================
CREATE POLICY "Allow public read access" ON hero_slides FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON services FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON team_members FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON testimonials FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON faq FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON about_section FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON contact_info FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON site_settings FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON portfolio FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON blog_posts FOR
SELECT USING (true);

CREATE POLICY "Allow public read access" ON counter_stats FOR
SELECT USING (true);

-- Allow all operations for authenticated users (admin)
CREATE POLICY "Allow all for anon" ON hero_slides FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON services FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON team_members FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON testimonials FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON faq FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON about_section FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON contact_info FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON site_settings FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON portfolio FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON blog_posts FOR ALL USING (true);

CREATE POLICY "Allow all for anon" ON counter_stats FOR ALL USING (true);

-- =============================================
-- Insert default data
-- =============================================

-- Default Contact Info
INSERT INTO
    contact_info (
        phone,
        whatsapp,
        email,
        address,
        working_hours
    )
VALUES (
        '01012345678',
        '01012345678',
        'info@naql-afsh.com',
        'القاهرة والجيزة، مصر',
        '24/7'
    ) ON CONFLICT DO NOTHING;

-- Default Site Settings
INSERT INTO
    site_settings (
        site_name,
        site_name_ar,
        meta_description
    )
VALUES (
        'Transit Logistics',
        'ترانزيت لوجستيكس',
        'شركة متخصصة في نقل الأثاث والعفش بجميع مناطق القاهرة والجيزة'
    ) ON CONFLICT DO NOTHING;

-- Default About Section
INSERT INTO about_section (title, subtitle, description, years_experience, features)
VALUES (
    'من نحن',
    'شركة متخصصة في نقل العفش منذ عام 2014',
    'نحن شركة متخصصة في نقل الأثاث والعفش بجميع مناطق القاهرة والجيزة. نمتلك فريقاً محترفاً من الفنيين المدربين، بالإضافة إلى أسطول من سيارات النقل المجهزة بأحدث التقنيات.',
    10,
    '["تتبع مباشر", "دعم 24/7", "تغليف احترافي", "فريق محترف"]'::jsonb
)
ON CONFLICT DO NOTHING;

-- Default Counter Stats
INSERT INTO
    counter_stats (
        icon,
        count,
        suffix,
        label,
        order_index
    )
VALUES (
        'counter01.svg',
        5000,
        '+',
        'عملية نقل ناجحة',
        0
    ),
    (
        'counter02.svg',
        50,
        '',
        'عامل محترف',
        1
    ),
    (
        'counter03.svg',
        10,
        '+',
        'سنوات خبرة',
        2
    ),
    (
        'counter04.svg',
        100,
        '%',
        'رضا العملاء',
        3
    ) ON CONFLICT DO NOTHING;

-- =============================================
-- Create Storage Bucket for Images
-- =============================================
-- Run this in the Supabase Dashboard under Storage
-- Create a bucket named 'images' with public access