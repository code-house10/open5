import { supabase, HeroSlide, Service, TeamMember, Testimonial, FAQ, ContactInfo, SiteSettings } from './supabase';

// Portfolio type
export interface Portfolio {
    id: string;
    title: string;
    category: string;
    description: string | null;
    image_url: string | null;
    order_index: number;
    active: boolean;
    created_at: string;
}

// Blog Post type
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image_url: string | null;
    author: string;
    published: boolean;
    published_at: string | null;
    created_at: string;
}

// Counter Stats type
export interface CounterStat {
    id: string;
    icon: string;
    count: number;
    suffix: string;
    label: string;
    order_index: number;
    active: boolean;
    created_at: string;
}

// About Section type
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

// Default fallback data
const defaultHeroSlides = [
    {
        id: '1',
        title: 'شريكك الأمثل في نقل الأثاث بأمان',
        subtitle: 'نقل الأثاث بأمان',
        description: 'نقدم خدمات نقل العفش المتكاملة في القاهرة والجيزة، مع فريق محترف ومعدات حديثة.',
        badge_text: 'خدمات نقل احترافية',
        badge_color: '#e74c3c',
        cta_text: 'احصل على عرض سعر',
        cta_link: 'tel:+201012345678',
        whatsapp_text: 'واتساب',
        image_url: '/assets/img/banner/truck.png',
        bg_image_url: '/assets/img/banner/banner.jpg',
        order_index: 0,
        active: true,
        created_at: new Date().toISOString()
    }
];

const defaultServices = [
    { id: '1', title: 'نقل العفش', description: 'نقل آمن وسريع لجميع أنواع الأثاث باستخدام سيارات مجهزة', image_url: '/assets/img/service/service01.jpg', order_index: 0, active: true, created_at: new Date().toISOString() },
    { id: '2', title: 'تغليف الأثاث', description: 'تغليف احترافي بمواد عالية الجودة لحماية الأثاث', image_url: '/assets/img/service/service02.jpg', order_index: 1, active: true, created_at: new Date().toISOString() },
    { id: '3', title: 'فك وتركيب', description: 'فك وتركيب جميع أنواع الأثاث بأيدي فنيين متخصصين', image_url: '/assets/img/service/service03.jpg', order_index: 2, active: true, created_at: new Date().toISOString() },
    { id: '4', title: 'ونش رفع العفش', description: 'خدمة الونش الهيدروليكي لرفع الأثاث للأدوار العالية', image_url: '/assets/img/service/service01.jpg', order_index: 3, active: true, created_at: new Date().toISOString() },
];

const defaultTeamMembers = [
    { id: '1', name: 'أحمد محمد', position: 'مدير العمليات', image_url: '/assets/img/team/team01.jpg', facebook_url: null, twitter_url: null, instagram_url: null, order_index: 0, active: true, created_at: new Date().toISOString() },
    { id: '2', name: 'محمد علي', position: 'مشرف الفنيين', image_url: '/assets/img/team/team02.jpg', facebook_url: null, twitter_url: null, instagram_url: null, order_index: 1, active: true, created_at: new Date().toISOString() },
    { id: '3', name: 'خالد حسن', position: 'رئيس فريق النقل', image_url: '/assets/img/team/team03.jpg', facebook_url: null, twitter_url: null, instagram_url: null, order_index: 2, active: true, created_at: new Date().toISOString() },
];

const defaultTestimonials = [
    { id: '1', client_name: 'أحمد محمد', client_position: 'مدينة نصر، القاهرة', content: 'خدمة ممتازة وفريق محترف جداً. نقلوا عفشي بأمان تام والأسعار كانت منافسة جداً. أنصح الجميع بالتعامل معهم.', image_url: '/assets/img/testimonial/testimonial-profile.jpg', rating: 5, active: true, created_at: new Date().toISOString() },
    { id: '2', client_name: 'سارة علي', client_position: 'المعادي، القاهرة', content: 'تجربة رائعة من البداية للنهاية. الفريق ملتزم بالمواعيد والتغليف كان ممتاز. سأتعامل معهم مرة أخرى بالتأكيد.', image_url: '/assets/img/testimonial/testimonial-profile.jpg', rating: 5, active: true, created_at: new Date().toISOString() },
];

const defaultFAQs = [
    { id: '1', question: 'ما هي المناطق التي تغطيها خدماتكم؟', answer: 'نغطي جميع مناطق القاهرة والجيزة، بما في ذلك مدينة نصر، المعادي، الدقي، المهندسين، الهرم، 6 أكتوبر، والتجمع الخامس.', order_index: 0, active: true, created_at: new Date().toISOString() },
    { id: '2', question: 'هل تقدمون خدمة الونش لرفع العفش؟', answer: 'نعم، نوفر خدمة الونش الهيدروليكي لرفع وإنزال الأثاث من وإلى الأدوار العالية بأمان تام.', order_index: 1, active: true, created_at: new Date().toISOString() },
    { id: '3', question: 'كيف يمكنني الحصول على عرض سعر؟', answer: 'يمكنك الاتصال بنا على الرقم 01012345678 أو التواصل عبر الواتساب للحصول على عرض سعر مجاني.', order_index: 2, active: true, created_at: new Date().toISOString() },
];

const defaultContactInfo: ContactInfo = {
    id: '1',
    phone: '01012345678',
    whatsapp: '01012345678',
    email: 'info@naql-afsh.com',
    address: 'القاهرة والجيزة، مصر',
    working_hours: '24/7',
    facebook_url: '#',
    instagram_url: '#',
    twitter_url: '#',
    created_at: new Date().toISOString()
};

const defaultSiteSettings: SiteSettings = {
    id: '1',
    site_name: 'Transit Logistics',
    site_name_ar: 'ترانزيت لوجستيكس',
    logo_url: '/assets/img/logo/truck-icon.png',
    favicon_url: null,
    meta_description: 'شركة متخصصة في نقل الأثاث والعفش بجميع مناطق القاهرة والجيزة',
    created_at: new Date().toISOString()
};

const defaultPortfolio: Portfolio[] = [
    { id: '1', title: 'نقل شقة كاملة', category: 'نقل عفش', description: null, image_url: '/assets/img/portfolio/portfolio-01.jpg', order_index: 0, active: true, created_at: new Date().toISOString() },
    { id: '2', title: 'نقل مكتب', category: 'نقل عفش', description: null, image_url: '/assets/img/portfolio/portfolio-02.jpg', order_index: 1, active: true, created_at: new Date().toISOString() },
    { id: '3', title: 'نقل فيلا', category: 'نقل عفش', description: null, image_url: '/assets/img/portfolio/portfolio-03.jpg', order_index: 2, active: true, created_at: new Date().toISOString() },
    { id: '4', title: 'نقل مصنع', category: 'نقل عفش', description: null, image_url: '/assets/img/portfolio/portfolio-04.jpg', order_index: 3, active: true, created_at: new Date().toISOString() },
    { id: '5', title: 'نقل معرض', category: 'نقل عفش', description: null, image_url: '/assets/img/portfolio/portfolio-05.jpg', order_index: 4, active: true, created_at: new Date().toISOString() },
];

const defaultCounterStats: CounterStat[] = [
    { id: '1', icon: 'counter01.svg', count: 5000, suffix: '+', label: 'عملية نقل ناجحة', order_index: 0, active: true, created_at: new Date().toISOString() },
    { id: '2', icon: 'counter02.svg', count: 50, suffix: '', label: 'عامل محترف', order_index: 1, active: true, created_at: new Date().toISOString() },
    { id: '3', icon: 'counter03.svg', count: 10, suffix: '+', label: 'سنوات خبرة', order_index: 2, active: true, created_at: new Date().toISOString() },
    { id: '4', icon: 'counter04.svg', count: 100, suffix: '%', label: 'رضا العملاء', order_index: 3, active: true, created_at: new Date().toISOString() },
];

// Check if Supabase is configured
const isSupabaseConfigured = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return url && key && !url.includes('your_') && !key.includes('your_');
};

// Fetch Hero Slides
export async function getHeroSlides(): Promise<HeroSlide[]> {
    if (!isSupabaseConfigured()) return defaultHeroSlides as HeroSlide[];

    try {
        const { data, error } = await supabase
            .from('hero_slides')
            .select('*')
            .eq('active', true)
            .order('order_index');

        if (error || !data || data.length === 0) return defaultHeroSlides as HeroSlide[];
        return data;
    } catch {
        return defaultHeroSlides as HeroSlide[];
    }
}

// Fetch Services
export async function getServices(): Promise<Service[]> {
    if (!isSupabaseConfigured()) return defaultServices as Service[];

    try {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('active', true)
            .order('order_index');

        if (error || !data || data.length === 0) return defaultServices as Service[];
        return data;
    } catch {
        return defaultServices as Service[];
    }
}

// Fetch Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
    if (!isSupabaseConfigured()) return defaultTeamMembers as TeamMember[];

    try {
        const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .eq('active', true)
            .order('order_index');

        if (error || !data || data.length === 0) return defaultTeamMembers as TeamMember[];
        return data;
    } catch {
        return defaultTeamMembers as TeamMember[];
    }
}

// Fetch Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
    if (!isSupabaseConfigured()) return defaultTestimonials as Testimonial[];

    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('active', true);

        if (error || !data || data.length === 0) return defaultTestimonials as Testimonial[];
        return data;
    } catch {
        return defaultTestimonials as Testimonial[];
    }
}

// Fetch FAQs
export async function getFAQs(): Promise<FAQ[]> {
    if (!isSupabaseConfigured()) return defaultFAQs as FAQ[];

    try {
        const { data, error } = await supabase
            .from('faq')
            .select('*')
            .eq('active', true)
            .order('order_index');

        if (error || !data || data.length === 0) return defaultFAQs as FAQ[];
        return data;
    } catch {
        return defaultFAQs as FAQ[];
    }
}

// Fetch Contact Info
export async function getContactInfo(): Promise<ContactInfo> {
    if (!isSupabaseConfigured()) return defaultContactInfo;

    try {
        const { data, error } = await supabase
            .from('contact_info')
            .select('*')
            .limit(1)
            .single();

        if (error || !data) return defaultContactInfo;
        return data;
    } catch {
        return defaultContactInfo;
    }
}

// Fetch Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
    if (!isSupabaseConfigured()) return defaultSiteSettings;

    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .limit(1)
            .single();

        if (error || !data) return defaultSiteSettings;
        return data;
    } catch {
        return defaultSiteSettings;
    }
}

// Fetch Portfolio
export async function getPortfolio(): Promise<Portfolio[]> {
    if (!isSupabaseConfigured()) return defaultPortfolio;

    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('active', true)
            .order('order_index');

        if (error || !data || data.length === 0) return defaultPortfolio;
        return data;
    } catch {
        return defaultPortfolio;
    }
}

// Fetch Counter Stats
export async function getCounterStats(): Promise<CounterStat[]> {
    if (!isSupabaseConfigured()) return defaultCounterStats;

    try {
        const { data, error } = await supabase
            .from('counter_stats')
            .select('*')
            .eq('active', true)
            .order('order_index');

        if (error || !data || data.length === 0) return defaultCounterStats;
        return data;
    } catch {
        return defaultCounterStats;
    }
}

// Fetch all landing page data at once
export async function getLandingPageData() {
    const [heroSlides, services, teamMembers, testimonials, faqs, contactInfo, siteSettings, portfolio, counterStats] = await Promise.all([
        getHeroSlides(),
        getServices(),
        getTeamMembers(),
        getTestimonials(),
        getFAQs(),
        getContactInfo(),
        getSiteSettings(),
        getPortfolio(),
        getCounterStats(),
    ]);

    return {
        heroSlides,
        services,
        teamMembers,
        testimonials,
        faqs,
        contactInfo,
        siteSettings,
        portfolio,
        counterStats,
    };
}
