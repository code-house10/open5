import type { Metadata } from "next";
import Script from "next/script";
import "./rtl.css";

export const metadata: Metadata = {
  title: "شركة نقل عفش القاهرة والجيزة | خدمات نقل الأثاث المتكاملة",
  description: "خدمات نقل العفش في مناطق القاهرة والجيزة - مع خدمات التغليف وفك وتركيب العفش والونش الهيدروليكي لرفع العفش - وسيارات نقل عفش مجهزة وحديثة",
  keywords: "نقل عفش, نقل اثاث, ونش رفع, فك وتركيب, القاهرة, الجيزة, تغليف عفش",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/fevicon.svg" />

        {/* Google Fonts - Cairo for Arabic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Theme CSS */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/fontawsome/css/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/odometer.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        {children}

        {/* Theme JS */}
        <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap-scroll-trigger.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap-split-text.js" strategy="afterInteractive" />
        <Script src="/assets/js/simple-parallax.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.appear.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.odometer.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ajax-form.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.nice-select.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/script.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
