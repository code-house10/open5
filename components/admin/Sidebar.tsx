"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
    { href: "/admin", icon: "fas fa-home", label: "لوحة التحكم" },
    { href: "/admin/hero-slides", icon: "fas fa-images", label: "سلايدر الهيرو" },
    { href: "/admin/services", icon: "fas fa-cogs", label: "الخدمات" },
    { href: "/admin/about", icon: "fas fa-info-circle", label: "من نحن" },
    { href: "/admin/portfolio", icon: "fas fa-briefcase", label: "معرض الأعمال" },
    { href: "/admin/team", icon: "fas fa-users", label: "فريق العمل" },
    { href: "/admin/testimonials", icon: "fas fa-star", label: "آراء العملاء" },
    { href: "/admin/blog", icon: "fas fa-newspaper", label: "المدونة" },
    { href: "/admin/faq", icon: "fas fa-question-circle", label: "الأسئلة الشائعة" },
    { href: "/admin/contact", icon: "fas fa-phone", label: "معلومات التواصل" },
    { href: "/admin/settings", icon: "fas fa-sliders-h", label: "الإعدادات" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            style={{
                width: collapsed ? "70px" : "260px",
                minHeight: "100vh",
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
                transition: "width 0.3s ease",
                position: "fixed",
                right: 0,
                top: 0,
                zIndex: 1000,
                boxShadow: "-4px 0 15px rgba(0,0,0,0.1)",
            }}
        >
            {/* Logo */}
            <div
                style={{
                    padding: "20px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between",
                }}
            >
                {!collapsed && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                            src="/assets/img/logo/truck-icon.png"
                            alt="Logo"
                            style={{ height: "40px" }}
                        />
                        <div>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>
                                ترانزيت
                            </div>
                            <div style={{ color: "#e74c3c", fontSize: "11px", fontWeight: 600 }}>
                                لوحة الإدارة
                            </div>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    <i className={`fas fa-${collapsed ? "chevron-left" : "chevron-right"}`}></i>
                </button>
            </div>

            {/* Navigation */}
            <nav style={{ padding: "20px 10px" }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: collapsed ? "12px" : "12px 16px",
                                marginBottom: "5px",
                                borderRadius: "10px",
                                color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                                textDecoration: "none",
                                background: isActive
                                    ? "linear-gradient(135deg, #e74c3c, #c0392b)"
                                    : "transparent",
                                transition: "all 0.3s ease",
                                justifyContent: collapsed ? "center" : "flex-start",
                            }}
                        >
                            <i
                                className={item.icon}
                                style={{ fontSize: "18px", width: "20px", textAlign: "center" }}
                            ></i>
                            {!collapsed && <span style={{ fontSize: "14px" }}>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        left: "20px",
                        padding: "15px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "10px",
                        textAlign: "center",
                    }}
                >
                    <Link
                        href="/"
                        target="_blank"
                        style={{
                            color: "rgba(255,255,255,0.7)",
                            textDecoration: "none",
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                        }}
                    >
                        <i className="fas fa-external-link-alt"></i>
                        عرض الموقع
                    </Link>
                </div>
            )}
        </aside>
    );
}
