"use client";

import { useEffect, useState } from "react";
import { getLandingPageData } from "@/lib/data-fetcher";
import type { HeroSlide, Service, TeamMember, Testimonial, FAQ, ContactInfo, SiteSettings } from "@/lib/supabase";
import type { Portfolio, CounterStat } from "@/lib/data-fetcher";

interface LandingData {
  heroSlides: HeroSlide[];
  services: Service[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  contactInfo: ContactInfo;
  siteSettings: SiteSettings;
  portfolio: Portfolio[];
  counterStats: CounterStat[];
}

export default function Home() {
  const [data, setData] = useState<LandingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
    getLandingPageData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || !data) return;

    // Hide preloader if it exists
    const preloader = document.querySelector('.fullpage_loader');
    if (preloader) {
      (preloader as HTMLElement).style.display = 'none';
    }

    // Initialize Hero Swiper
    if (typeof window !== "undefined" && (window as any).Swiper) {
      new (window as any).Swiper('.hero-swiper', {
        loop: true,
        speed: 800,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      // Portfolio Slider
      new (window as any).Swiper('.portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        },
      });

      // Testimonial Slider
      new (window as any).Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.testimonial-nav .next',
          prevEl: '.testimonial-nav .prev',
        },
      });
    }

    // Mobile menu toggle
    const openBtn = document.getElementById('openMobileMenu');
    const closeBtn = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('smartMobileMenu');

    const openHandler = () => mobileMenu?.classList.add('active');
    const closeHandler = () => mobileMenu?.classList.remove('active');

    openBtn?.addEventListener('click', openHandler);
    closeBtn?.addEventListener('click', closeHandler);

    return () => {
      openBtn?.removeEventListener('click', openHandler);
      closeBtn?.removeEventListener('click', closeHandler);
    };
  }, [loading, data]);

  if (loading || !data) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <img src="/assets/img/logo/truck-icon.png" alt="Loading" style={{ height: '80px', animation: 'pulse 1.5s infinite' }} />
        <p style={{ color: '#fff', fontSize: '18px' }}>جاري التحميل...</p>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(0.95); }
          }
        `}</style>
      </div>
    );
  }

  const { heroSlides, services, teamMembers, testimonials, faqs, contactInfo, portfolio, counterStats } = data;

  return (
    <>
      {/* Smart Header - Desktop */}
      <header className="smart-header d-none d-xl-block" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1050
      }}>
        {/* Top Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          padding: '10px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-center flex-row-reverse">
              <div className="d-flex align-items-center gap-4">
                <a href={`tel:+2${contactInfo.phone}`} className="d-flex align-items-center gap-2 text-white text-decoration-none">
                  <i className="fa-solid fa-phone" style={{ color: '#f39c12' }}></i>
                  <span>{contactInfo.phone}</span>
                </a>
                <a href={`mailto:${contactInfo.email}`} className="d-flex align-items-center gap-2 text-white text-decoration-none">
                  <i className="fa-solid fa-envelope" style={{ color: '#f39c12' }}></i>
                  <span>{contactInfo.email}</span>
                </a>
                <span className="d-flex align-items-center gap-2 text-white">
                  <i className="fa-solid fa-location-dot" style={{ color: '#f39c12' }}></i>
                  <span>{contactInfo.address}</span>
                </span>
              </div>
              <div className="d-flex align-items-center gap-3">
                {contactInfo.facebook_url && <a href={contactInfo.facebook_url} className="text-white" style={{ fontSize: '16px' }}><i className="fab fa-facebook-f"></i></a>}
                <a href={`https://wa.me/2${contactInfo.whatsapp}`} className="text-white" style={{ fontSize: '16px' }}><i className="fab fa-whatsapp"></i></a>
                {contactInfo.instagram_url && <a href={contactInfo.instagram_url} className="text-white" style={{ fontSize: '16px' }}><i className="fab fa-instagram"></i></a>}
              </div>
            </div>
          </div>
        </div>
        {/* Main Header */}
        <div style={{
          background: '#fff',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          padding: '8px 0'
        }}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              {/* Logo */}
              <a href="#" className="d-flex align-items-center text-decoration-none gap-2">
                <img src="/assets/img/logo/truck-icon.png" alt="ترانزيت لوجستيكس" style={{ height: '70px' }} />
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e' }}>ترانزيت</div>
                  <div style={{ fontSize: '12px', color: '#e74c3c', fontWeight: 600 }}>لوجستيكس</div>
                </div>
              </a>
              {/* Navigation */}
              <nav className="d-flex align-items-center gap-2">
                {['الرئيسية', 'خدماتنا', 'من نحن', 'أعمالنا', 'فريقنا', 'آراء العملاء', 'الأسئلة الشائعة', 'اتصل بنا'].map((item, i) => (
                  <a
                    key={i}
                    href={i === 0 ? '#' : `#${['services', 'about', 'portfolio', 'team', 'testimonials', 'faq', 'contact'][i - 1] || ''}`}
                    style={{
                      color: '#1a1a2e',
                      fontWeight: 600,
                      padding: '10px 14px',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      fontSize: '15px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              {/* CTA Buttons */}
              <div className="d-flex align-items-center gap-2">
                <a href={`https://wa.me/2${contactInfo.whatsapp}`} className="btn rounded-pill text-white d-flex align-items-center gap-2" style={{ background: '#25D366', padding: '10px 20px', fontSize: '14px' }}>
                  <i className="fab fa-whatsapp"></i>
                  واتساب
                </a>
                <a href={`tel:+2${contactInfo.phone}`} className="btn rounded-pill text-white d-flex align-items-center gap-2" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)', padding: '10px 20px', fontSize: '14px' }}>
                  <i className="fa-solid fa-phone"></i>
                  اتصل الآن
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Smart Header - Mobile */}
      <header className="mobile-smart-header d-block d-xl-none" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        background: '#fff',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        padding: '8px 0'
      }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <a href="#" className="d-flex align-items-center text-decoration-none gap-2">
              <img src="/assets/img/logo/truck-icon.png" alt="ترانزيت لوجستيكس" style={{ height: '55px' }} />
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>ترانزيت</div>
                <div style={{ fontSize: '9px', color: '#e74c3c', fontWeight: 600 }}>لوجستيكس</div>
              </div>
            </a>
            <div className="d-flex align-items-center gap-2">
              <a href={`https://wa.me/2${contactInfo.whatsapp}`} style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href={`tel:+2${contactInfo.phone}`} style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #e74c3c, #c0392b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                <i className="fa-solid fa-phone"></i>
              </a>
              <button id="openMobileMenu" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px' }}>
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className="smart-mobile-menu" id="smartMobileMenu">
        <div className="menu-header">
          <div className="d-flex align-items-center gap-2">
            <img src="/assets/img/logo/truck-icon.png" alt="ترانزيت لوجستيكس" style={{ height: '50px' }} />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>ترانزيت</div>
              <div style={{ fontSize: '10px', color: '#f39c12', fontWeight: 600 }}>لوجستيكس</div>
            </div>
          </div>
          <button className="close-btn" id="closeMobileMenu">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="menu-links">
          <a href="#" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>الرئيسية</a>
          <a href="#services" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>خدماتنا</a>
          <a href="#about" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>من نحن</a>
          <a href="#portfolio" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>أعمالنا</a>
          <a href="#team" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>فريقنا</a>
          <a href="#testimonials" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>آراء العملاء</a>
          <a href="#faq" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>الأسئلة الشائعة</a>
          <a href="#contact" onClick={() => { document.getElementById('smartMobileMenu')?.classList.remove('active'); }}>اتصل بنا</a>
        </div>
        <div className="menu-footer">
          <div className="contact-item">
            <i className="fa-solid fa-phone"></i>
            <a href={`tel:+2${contactInfo.phone}`} className="text-white text-decoration-none">{contactInfo.phone}</a>
          </div>
          <div className="contact-item">
            <i className="fa-solid fa-envelope"></i>
            <a href={`mailto:${contactInfo.email}`} className="text-white text-decoration-none">{contactInfo.email}</a>
          </div>
          <div className="contact-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>{contactInfo.address}</span>
          </div>
          <div className="d-flex gap-3 mt-4">
            {contactInfo.facebook_url && <a href={contactInfo.facebook_url} className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>}
            <a href={`https://wa.me/2${contactInfo.whatsapp}`} className="text-white"><i className="fab fa-whatsapp fa-lg"></i></a>
            {contactInfo.instagram_url && <a href={contactInfo.instagram_url} className="text-white"><i className="fab fa-instagram fa-lg"></i></a>}
          </div>
        </div>
      </div>

      {/* Header Spacing */}
      <div className="header-spacing"></div>

      <main>
        {/* Hero Carousel Section */}
        <section className="hero-carousel-section position-relative overflow-hidden">
          <div className="swiper hero-swiper" style={{ height: '100vh', minHeight: '700px' }}>
            <div className="swiper-wrapper">
              {heroSlides.map((slide, index) => (
                <div key={slide.id || index} className="swiper-slide">
                  <div className="hero-slide position-relative d-flex align-items-center" style={{
                    backgroundImage: `linear-gradient(135deg, rgba(26,26,46,0.9) 0%, rgba(22,33,62,0.85) 100%), url(${slide.bg_image_url || '/assets/img/banner/banner.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%'
                  }}>
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-lg-7">
                          <div className="hero-content" style={{ animation: 'fadeInUp 1s ease-out' }}>
                            {slide.badge_text && (
                              <span style={{
                                display: 'inline-block',
                                background: `linear-gradient(135deg, ${slide.badge_color}, ${slide.badge_color}dd)`,
                                color: '#fff',
                                padding: '8px 20px',
                                borderRadius: '30px',
                                fontSize: '14px',
                                fontWeight: 600,
                                marginBottom: '20px'
                              }}>
                                <i className="fas fa-truck me-2"></i>{slide.badge_text}
                              </span>
                            )}
                            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '20px' }}>
                              {slide.title.split('\n').map((line, i) => (
                                <span key={i}>{i === 1 ? <><br /><span style={{ color: '#f39c12' }}>{line}</span></> : line}</span>
                              ))}
                            </h1>
                            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '30px', maxWidth: '500px' }}>
                              {slide.description}
                            </p>
                            <div>
                              <a href={slide.cta_link || `tel:+2${contactInfo.phone}`} className="btn me-2" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)', color: '#fff', padding: '15px 30px', borderRadius: '50px', fontSize: '16px', fontWeight: 600 }}>
                                <i className="fas fa-phone me-2"></i>{slide.cta_text || 'احصل على عرض سعر'}
                              </a>
                              <a href={`https://wa.me/2${contactInfo.whatsapp}`} className="btn" style={{ background: '#25D366', color: '#fff', padding: '15px 30px', borderRadius: '50px', fontSize: '16px', fontWeight: 600 }}>
                                <i className="fab fa-whatsapp me-2"></i>{slide.whatsapp_text || 'واتساب'}
                              </a>
                            </div>
                          </div>
                        </div>
                        {slide.image_url && (
                          <div className="col-lg-5 d-none d-lg-block">
                            <img src={slide.image_url} alt={slide.title} style={{ maxWidth: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="ep-service-section pt-120">
          <div className="container position-relative">
            <div className="row">
              <div className="section-title text-center pb-60">
                <h6 className="subtitle d-inline-flex align-items-center">خدماتنا</h6>
                <h2 className="title heading-two split-text right">حلول نقل العفش الشاملة</h2>
              </div>
            </div>
            <div className="row g-4">
              {services.map((service, i) => (
                <div key={service.id || i} className="col-lg-3 col-md-6">
                  <div className="service-item hover-effect bg-one rounded-10">
                    <a href="#" className="d-block w-100">
                      <div className="img overlay-shape rounded-10 overflow-hidden">
                        <img src={service.image_url || `/assets/img/service/service0${(i % 3) + 1}.jpg`} className="card-img-top" alt={service.title} />
                      </div>
                    </a>
                    <div className="text">
                      <h3 className="heading-four service-title pb-20"><a href="#">{service.title}</a></h3>
                      <p className="pb-30">{service.description}</p>
                      <a href={`tel:+2${contactInfo.phone}`} className="theme-btn rounded-pill d-inline-flex align-items-center">اطلب الخدمة<i className="fas fa-chevron-right"></i></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="ep-about-section pt-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-6 col-lg-9 mx-auto">
                <div className="about-img position-relative">
                  <div className="img reveal zoom-out rounded-20 overlay-shape overflow-hidden">
                    <img src="/assets/img/about/about01.jpg" className="rounded-20 img-fluid w-100" alt="فريق نقل العفش" />
                  </div>
                  <div className="shape position-absolute">
                    <img src="/assets/img/about/shape01.svg" alt="shape" />
                    <h5 className="heading-five experiance text-white position-absolute">+10 سنوات خبرة</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-9 mx-auto">
                <div className="about-content pt-4 pt-xl-0">
                  <div className="section-title pb-30">
                    <h6 className="subtitle d-inline-flex align-items-center">من نحن</h6>
                    <h2 className="heading-two title split-text right">شركة متخصصة في نقل العفش منذ عام 2014</h2>
                  </div>
                  <p className="about-text ps-3">نحن شركة متخصصة في نقل الأثاث والعفش بجميع مناطق القاهرة والجيزة. نمتلك فريقاً محترفاً من الفنيين المدربين، بالإضافة إلى أسطول من سيارات النقل المجهزة بأحدث التقنيات.</p>
                  <div className="tracking-info pb-30 mb-40">
                    <div className="row pt-40 gy-3">
                      <div className="col-xl-6 col-md-6 tracking d-flex align-items-center gap-3">
                        <div className="icon rounded-pill d-flex justify-content-center align-items-center flex-shrink-0">
                          <img src="/assets/img/about/realtime.svg" alt="تتبع" />
                        </div>
                        <h4 className="heading-four title">تتبع مباشر</h4>
                      </div>
                      <div className="col-xl-6 col-md-6 support d-flex align-items-center gap-3">
                        <div className="icon rounded-pill d-flex justify-content-center align-items-center flex-shrink-0">
                          <img src="/assets/img/about/support.svg" alt="دعم" />
                        </div>
                        <h4 className="heading-four title">دعم 24/7</h4>
                      </div>
                    </div>
                  </div>
                  <a href={`tel:+2${contactInfo.phone}`} className="theme-btn style2 rounded-pill text-uppercase">اتصل الآن<i className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Process Section */}
        <section id="process" className="ep-work-process-section py-120 mt-120 bg-one rounded-30 content">
          <div className="container">
            <div className="row">
              <div className="section-title text-center pb-60">
                <h6 className="subtitle d-inline-flex align-items-center">آلية العمل</h6>
                <h2 className="heading-two title split-text right">كيف نعمل</h2>
              </div>
            </div>
            <div className="row g-4">
              {[
                { num: 1, img: 'work01.jpg', title: 'احصل على عرض سعر', desc: 'قدم تفاصيل عفشك وسنعطيك عرض سعر شفاف' },
                { num: 2, img: 'work02.jpg', title: 'احجز موعد النقل', desc: 'أكد طلبك وحدد موعد النقل المناسب لك' },
                { num: 3, img: 'work03.jpg', title: 'التوصيل والدعم', desc: 'فريقنا يضمن وصول عفشك بأمان وفي الوقت المحدد' },
              ].map((step, i) => (
                <div key={i} className="col-lg-4 col-sm-6 mx-auto mx-lg-0 process-label fade-up">
                  <div className="process-item hover-effect text-center position-relative">
                    <div className="image position-relative mx-auto">
                      <div className="overlay-shape rounded-pill overflow-hidden">
                        <img src={`/assets/img/work/${step.img}`} className="rounded-pill img-fluid w-100" alt={step.title} />
                      </div>
                      <h3 className="heading-three number position-absolute rounded-pill d-flex align-items-center justify-content-center top-50 translate-middle-y">{step.num}</h3>
                    </div>
                    <div className="text pt-30 px-xl-5">
                      <h3 className="heading-three pb-20">{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="ep-team-section pt-120 content">
          <div className="container">
            <div className="row">
              <div className="section-title text-center pb-60">
                <h6 className="subtitle d-inline-flex align-items-center">فريق العمل المحترف</h6>
                <div className="heading-two split-text right">تعرف على فريقنا</div>
              </div>
            </div>
            <div className="row g-4">
              {teamMembers.map((member, i) => (
                <div key={member.id || i} className="col-lg-4 col-md-6 mx-auto mx-lg-0 fade-up">
                  <div className="team-item hover-effect">
                    <div className="image mb-3 mb-lg-0 rounded-20 overflow-hidden position-relative">
                      <a href="#" className="d-block w-100">
                        <div className="overlay-shape overflow-hidden">
                          <img src={member.image_url || `/assets/img/team/team0${(i % 3) + 1}.jpg`} className="img-fluid w-100 rounded-20" alt={member.name} />
                        </div>
                      </a>
                      <div className="team-icon position-absolute d-flex justify-content-between align-items-center flex-column">
                        <div className="social-icon">
                          <ul className="list-unstyled d-flex flex-column gap-3">
                            <li><a href={`https://wa.me/2${contactInfo.whatsapp}`} className="icon-secondary rounded-pill d-flex align-items-center justify-content-center"><i className="fab fa-whatsapp"></i></a></li>
                            {member.facebook_url && <li><a href={member.facebook_url} className="rounded-pill d-flex align-items-center justify-content-center"><i className="fa-brands fa-facebook-f"></i></a></li>}
                            {member.instagram_url && <li><a href={member.instagram_url} className="icon-secondary rounded-pill d-flex align-items-center justify-content-center"><i className="fa-brands fa-instagram"></i></a></li>}
                          </ul>
                        </div>
                        <button className="link-icon border-0 rounded-pill d-flex justify-content-center align-items-center">
                          <i className="fa-solid fa-link text-white"></i>
                        </button>
                      </div>
                      <div className="overlay position-absolute">
                        <p className="designation rounded-6 d-inline-block">{member.position}</p>
                        <a href="#" className="d-block w-100">
                          <h4 className="name heading-four rounded-6">{member.name}</h4>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Counter Section */}
        <section className="ep-counter-section pt-120">
          <div className="container">
            <div className="counter-body bg-two rounded-30 d-flex flex-wrap justify-content-between align-items-center">
              {counterStats.map((stat, i) => (
                <div key={stat.id || i} className="counter-item d-flex gap-3 justify-content-xxl-center justify-content-start align-items-start position-relative">
                  <div className="icon"><img src={`/assets/img/counter/${stat.icon}`} alt={stat.label} /></div>
                  <div className="text">
                    <h2 className="heading-two d-flex align-items-center"><span className="odometer" data-count={stat.count}></span>{stat.suffix}</h2>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="ep-portfolio-section pt-120">
          <div className="container-fluid">
            <div className="row">
              <div className="section-title text-center pb-60">
                <h6 className="subtitle d-inline-flex align-items-center">أعمالنا السابقة</h6>
                <h2 className="heading-two split-text right">استكشف أعمالنا</h2>
              </div>
            </div>
            <div className="swiper portfolio-slider">
              <div className="swiper-wrapper">
                {portfolio.map((project, i) => (
                  <div key={project.id || i} className="swiper-slide">
                    <div className="image position-relative overflow-hidden rounded-20">
                      <a href="#" className="d-block w-100">
                        <img src={project.image_url || `/assets/img/portfolio/portfolio-0${(i % 5) + 1}.jpg`} className="img-fluid w-100" alt={project.title} />
                        <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end">
                          <div className="text-wrapper position-relative">
                            <div className="text-object">
                              <p>{project.category}</p>
                              <h5 className="heading-five">{project.title}</h5>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose" className="ep-why-choose-us-section mt-120 py-120 position-relative z-1">
          <div className="shape-one position-absolute start-0 bottom-0">
            <img src="/assets/img/why-choose-us/shape.svg" alt="shape" />
          </div>
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="section-title text-start pb-30">
                  <h6 className="subtitle d-inline-flex text-white align-items-center">لماذا تختارنا</h6>
                  <h2 className="heading-two text-light split-text right">مميزات خدماتنا</h2>
                </div>
                <p className="text-white-50">نقدم خدمة استثنائية مع التزام كامل برضا العملاء واستخدام أحدث التقنيات.</p>
                <div className="custom-progressbar pt-40">
                  {[
                    { label: 'جودة الخدمة', value: 95 },
                    { label: 'رضا العملاء', value: 98 },
                    { label: 'الالتزام بالمواعيد', value: 90 },
                  ].map((item, i) => (
                    <div key={i} className="progress-item">
                      <label className="text-white pb-2">{item.label}</label>
                      <div className="progress" role="progressbar" aria-valuenow={item.value} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar" style={{ width: `${item.value}%` }}><span className="num">{item.value}%</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="call-us d-flex align-items-center gap-3 pt-5">
                  <div className="icon d-flex align-items-center justify-content-center rounded-pill">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="text">
                    <p className="text-white-50">اتصل مجاناً!</p>
                    <a href={`tel:+2${contactInfo.phone}`} className="text-white fw-medium">{contactInfo.phone}</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="tranzit-contact-form rounded-20">
                  <h3 className="heading-three text-white mb-4">احصل على عرض سعر مجاني</h3>
                  <form action="#">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="input-group black">
                          <input type="text" className="form-control shadow-none rounded-pill" placeholder="الاسم الكامل" />
                          <span className="icon position-absolute top-50 translate-middle-y"><i className="fa-solid fa-user"></i></span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input type="tel" className="form-control shadow-none rounded-pill" placeholder="رقم الهاتف" />
                          <span className="icon position-absolute top-50 translate-middle-y"><i className="fa-solid fa-phone"></i></span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input type="text" className="form-control shadow-none rounded-pill" placeholder="العنوان الحالي" />
                          <span className="icon position-absolute top-50 translate-middle-y"><i className="fa-solid fa-location-dot"></i></span>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-group">
                          <input type="text" className="form-control shadow-none rounded-pill" placeholder="العنوان الجديد" />
                          <span className="icon position-absolute top-50 translate-middle-y"><i className="fa-solid fa-map-marker-alt"></i></span>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button type="submit" className="theme-btn hover-effect-btn style2 text-uppercase w-100 border-0 rounded-pill d-flex align-items-center gap-2 text-center justify-content-center">
                          إرسال الطلب
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="ep-testimonial-section overflow-hidden">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-image position-relative">
                <img src="/assets/img/testimonial/testimonial-left.jpg" className="imageParallax img-fluid w-100" alt="آراء العملاء" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="testimonial-content position-relative py-120">
                <div className="section-title pb-60">
                  <h6 className="subtitle d-inline-flex text-white align-items-center">آراء العملاء</h6>
                  <h2 className="heading-two text-white split-text right">ماذا يقول عملاؤنا</h2>
                </div>
                <div className="quote position-absolute">
                  <img src="/assets/img/testimonial/shape.svg" alt="quote" />
                </div>
                <div className="swiper testimonial-slider">
                  <div className="swiper-wrapper">
                    {testimonials.map((item, i) => (
                      <div key={item.id || i} className="swiper-slide">
                        <div className="testimonial-item">
                          <p>{item.content}</p>
                          <div className="client-info d-flex gap-3 pt-40 flex-wrap">
                            <div className="profile rounded-10 overflow-hidden">
                              <img src={item.image_url || '/assets/img/testimonial/testimonial-profile.jpg'} className="img-fluid w-100 object-fit-cover" alt={item.client_name} />
                            </div>
                            <div>
                              <h4 className="heading-six name text-white">{item.client_name}</h4>
                              <p className="designation">{item.client_position}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="testimonial-nav gap-3 d-flex position-absolute align-items-center justify-content-end">
                  <div className="prev hover-effect-btn-2 left d-flex align-items-center justify-content-center rounded-pill"><i className="fa-solid fa-arrow-left"></i></div>
                  <div className="next hover-effect-btn-2 d-flex align-items-center justify-content-center rounded-pill"><i className="fa-solid fa-arrow-right"></i></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="ep-blog-section pt-120 content">
          <div className="container position-relative">
            <div className="d-flex pb-60 gap-3 justify-content-between align-items-end flex-wrap">
              <div className="section-title text-start">
                <h6 className="subtitle d-inline-flex align-items-center">أخبار ومقالات</h6>
                <h2 className="heading-two split-text right">آخر الأخبار والنصائح</h2>
              </div>
            </div>
            <div className="row g-4">
              {[
                { img: 'blog01.jpg', date: '10', month: 'يناير 2024', title: 'نصائح مهمة قبل نقل العفش' },
                { img: 'blog02.jpg', date: '15', month: 'يناير 2024', title: 'كيف تحمي أثاثك أثناء النقل' },
                { img: 'blog03.jpg', date: '20', month: 'يناير 2024', title: 'أفضل طرق تغليف الأثاث' },
              ].map((post, i) => (
                <div key={i} className="col-lg-4 col-md-6 fade-up">
                  <div className="blog-item hover-effect rounded-20 overflow-hidden">
                    <div className="blog-img">
                      <a href="#" className="position-relative d-block w-100">
                        <div className="overlay-shape reveal zoom-out overflow-hidden">
                          <img src={`/assets/img/blog/${post.img}`} className="card-img-top img-fluid w-100" alt={post.title} />
                        </div>
                        <div className="news-date position-absolute">
                          <img src="/assets/img/blog/shape.svg" alt="shape" />
                          <div className="date text-center position-absolute">
                            <h3 className="heading-three date">{post.date}</h3>
                            <p className="p2">{post.month}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="blog-text">
                      <div className="blog-meta d-flex align-items-center gap-4 mb-4">
                        <div className="d-flex gap-2 align-items-center">
                          <i className="fa-solid fa-user"></i>
                          <p className="p2">بواسطة المدير</p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                          <i className="fa-solid fa-comments"></i>
                          <p className="p2">تعليقات (5)</p>
                        </div>
                      </div>
                      <h4 className="heading-four blog-title pb-30">
                        <a href="#">{post.title}</a>
                      </h4>
                      <a href="#" className="theme-btn style2 d-inline-flex text-uppercase align-items-center gap-2 justify-content-center rounded-pill hover-effect-btn">
                        اقرأ المزيد
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="ep-faq-section pt-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-6 col-lg-8 mx-auto mx-xl-0 align-self-center">
                <div className="section-title pb-30">
                  <h6 className="subtitle d-inline-flex align-items-center">الأسئلة الشائعة</h6>
                  <h2 className="heading-two split-text right">إجابات على أسئلتكم</h2>
                </div>
                <div className="faq-main secondary-bg rounded-20">
                  <p>نحن ملتزمون بتقديم خدمة عملاء ممتازة طوال عملية النقل.</p>
                  <div className="faq-body pt-40">
                    <div className="accordion" id="accordionExample">
                      {faqs.map((faq, i) => (
                        <div key={faq.id || i} className="accordion-item rounded-6">
                          <h2 className="accordion-header">
                            <button className={`accordion-button ${i !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded={i === 0 ? 'true' : 'false'}>
                              <span className="heading-six">{faq.question}</span>
                            </button>
                          </h2>
                          <div id={`collapse${i}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-8 mx-auto mx-xl-0">
                <div className="faq-image position-relative">
                  <div className="item item-one hover-effect">
                    <div className="image position-relative">
                      <div className="rounded-20 overlay-shape overflow-hidden reveal up">
                        <img src="/assets/img/faq/faq01.jpg" className="img-fluid rounded-20 w-100" alt="faq" />
                      </div>
                      <div className="text text-center rounded-10 position-absolute">
                        <h2 className="heading-two text-white"><span className="odometer" data-count="2"></span><span className="heading-three text-white">M</span></h2>
                        <p className="text-white">قطعة أثاث تم نقلها</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pt-120 pb-60">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="section-title text-center pb-60">
                  <h6 className="subtitle d-inline-flex align-items-center">تواصل معنا</h6>
                  <h2 className="heading-two split-text right">نحن في خدمتكم دائماً</h2>
                </div>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="contact-info-item text-center p-4 rounded-20 bg-one h-100">
                  <div className="icon mb-3 d-inline-flex align-items-center justify-content-center rounded-pill" style={{ width: '80px', height: '80px', background: 'var(--secondary-color)' }}>
                    <i className="fa-solid fa-phone text-white" style={{ fontSize: '28px' }}></i>
                  </div>
                  <h4 className="heading-four mb-2">اتصل بنا</h4>
                  <a href={`tel:+2${contactInfo.phone}`} className="d-block">{contactInfo.phone}</a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="contact-info-item text-center p-4 rounded-20 bg-one h-100">
                  <div className="icon mb-3 d-inline-flex align-items-center justify-content-center rounded-pill" style={{ width: '80px', height: '80px', background: 'var(--secondary-color)' }}>
                    <i className="fa-brands fa-whatsapp text-white" style={{ fontSize: '28px' }}></i>
                  </div>
                  <h4 className="heading-four mb-2">واتساب</h4>
                  <a href={`https://wa.me/2${contactInfo.whatsapp}`} className="d-block">{contactInfo.whatsapp}</a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="contact-info-item text-center p-4 rounded-20 bg-one h-100">
                  <div className="icon mb-3 d-inline-flex align-items-center justify-content-center rounded-pill" style={{ width: '80px', height: '80px', background: 'var(--secondary-color)' }}>
                    <i className="fa-solid fa-location-dot text-white" style={{ fontSize: '28px' }}></i>
                  </div>
                  <h4 className="heading-four mb-2">موقعنا</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Back to Top */}
      <button className="scroll-to-top position-fixed">
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* Footer */}
      <footer className="ep-footer-section">
        <div className="footer-top">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6 col-md-6">
                <h2 className="heading-two text-light text-center text-md-start">اشترك في نشرتنا الإخبارية</h2>
              </div>
              <div className="col-lg-5 col-md-6 ms-auto align-self-center">
                <form action="#">
                  <div className="input-group position-relative mx-auto ms-lg-auto me-lg-0">
                    <input type="email" className="form-control shadow-none rounded-pill" placeholder="البريد الإلكتروني" />
                    <button className="theme-btn border-0 rounded-pill position-absolute top-0 end-0">اشتراك<i className="fa-solid fa-paper-plane ms-2"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer-main">
            <div className="row g-4">
              <div className="col-xxl-3 col-xl-3 col-lg-4 col-sm-6">
                <div className="footer-widget">
                  <div className="logo pb-4">
                    <img src="/assets/img/logo/logo2.svg" alt="شركة نقل عفش" />
                  </div>
                  <p>شركة متخصصة في نقل الأثاث والعفش بجميع مناطق القاهرة والجيزة مع خدمات التغليف والفك والتركيب.</p>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-6 ms-auto">
                <div className="footer-widget">
                  <h4 className="footer-widget-title heading-four text-white pb-30">روابط سريعة</h4>
                  <ul className="list-unstyled important-link">
                    <li><a href="#">الرئيسية</a></li>
                    <li><a href="#services">خدماتنا</a></li>
                    <li><a href="#about">من نحن</a></li>
                    <li><a href="#contact">اتصل بنا</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-3 col-lg-3 col-sm-6 ms-auto">
                <div className="footer-widget">
                  <h4 className="footer-widget-title heading-four text-white pb-30">خدماتنا</h4>
                  <ul className="list-unstyled important-link">
                    {services.slice(0, 4).map((s, i) => (
                      <li key={i}><a href="#services">{s.title}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-6">
                <div className="footer-widget">
                  <h4 className="footer-widget-title heading-four text-white pb-30">تواصل معنا</h4>
                  <ul className="list-unstyled contact-info">
                    <li><div className="icon"><i className="fa-solid fa-location-dot"></i></div><a href="#">{contactInfo.address}</a></li>
                    <li><div className="icon"><i className="fa-solid fa-envelope"></i></div><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
                    <li><div className="icon"><i className="fa-solid fa-phone"></i></div><a href={`tel:+2${contactInfo.phone}`}>{contactInfo.phone}</a></li>
                  </ul>
                  <div className="social-icon pt-40">
                    <ul className="d-flex list-unstyled gap-2">
                      {contactInfo.facebook_url && <li><a href={contactInfo.facebook_url} className="rounded-pill d-flex align-items-center justify-content-center"><i className="fa-brands fa-facebook-f"></i></a></li>}
                      <li><a href={`https://wa.me/2${contactInfo.whatsapp}`} className="rounded-pill d-flex align-items-center justify-content-center"><i className="fa-brands fa-whatsapp"></i></a></li>
                      {contactInfo.instagram_url && <li><a href={contactInfo.instagram_url} className="rounded-pill d-flex align-items-center justify-content-center"><i className="fab fa-instagram"></i></a></li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row g-2">
              <div className="col-md-6">
                <div className="footer-copyright text-center text-lg-start">
                  <p>جميع الحقوق محفوظة © 2024 <span>شركة نقل العفش</span></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="footer-menu">
                  <ul className="list-unstyled d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
                    <li><a href="#">الشروط والأحكام</a></li>
                    <li><a href="#">سياسة الخصوصية</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href={`https://wa.me/2${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"
        style={{ position: 'fixed', bottom: '20px', left: '20px', background: '#25D366', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: 1000 }}>
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </>
  );
}
