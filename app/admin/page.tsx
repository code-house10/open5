"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface StatCard {
    title: string;
    count: number;
    icon: string;
    color: string;
    href: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<StatCard[]>([
        { title: "سلايدر الهيرو", count: 0, icon: "fas fa-images", color: "#e74c3c", href: "/admin/hero-slides" },
        { title: "الخدمات", count: 0, icon: "fas fa-cogs", color: "#3498db", href: "/admin/services" },
        { title: "معرض الأعمال", count: 0, icon: "fas fa-briefcase", color: "#1abc9c", href: "/admin/portfolio" },
        { title: "فريق العمل", count: 0, icon: "fas fa-users", color: "#9b59b6", href: "/admin/team" },
        { title: "آراء العملاء", count: 0, icon: "fas fa-star", color: "#f39c12", href: "/admin/testimonials" },
        { title: "المدونة", count: 0, icon: "fas fa-newspaper", color: "#e67e22", href: "/admin/blog" },
        { title: "الأسئلة الشائعة", count: 0, icon: "fas fa-question-circle", color: "#27ae60", href: "/admin/faq" },
    ]);

    useEffect(() => {
        const fetchCounts = async () => {
            const tables = ["hero_slides", "services", "portfolio", "team_members", "testimonials", "blog_posts", "faq"];
            const newStats = [...stats];

            for (let i = 0; i < tables.length; i++) {
                const { count } = await supabase
                    .from(tables[i])
                    .select("*", { count: "exact", head: true });
                newStats[i].count = count || 0;
            }

            setStats(newStats);
        };
        fetchCounts();
    }, []);

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                    لوحة التحكم
                </h1>
                <p style={{ color: "#666", marginTop: "5px" }}>
                    مرحباً بك في لوحة إدارة ترانزيت لوجستيكس
                </p>
            </div>

            {/* Stats Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px",
                }}
            >
                {stats.map((stat, index) => (
                    <a
                        key={index}
                        href={stat.href}
                        style={{
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "25px",
                            textDecoration: "none",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            display: "block",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>{stat.title}</p>
                                <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a2e", margin: "5px 0 0" }}>
                                    {stat.count}
                                </h2>
                            </div>
                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "12px",
                                    background: `${stat.color}15`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <i className={stat.icon} style={{ fontSize: "24px", color: stat.color }}></i>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Quick Actions */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "25px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
            >
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px" }}>
                    إجراءات سريعة
                </h3>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                    <a
                        href="/admin/hero-slides"
                        style={{
                            padding: "12px 24px",
                            background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                            color: "#fff",
                            borderRadius: "10px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: 600,
                        }}
                    >
                        <i className="fas fa-plus me-2"></i>
                        إضافة سلايد جديد
                    </a>
                    <a
                        href="/admin/services"
                        style={{
                            padding: "12px 24px",
                            background: "linear-gradient(135deg, #3498db, #2980b9)",
                            color: "#fff",
                            borderRadius: "10px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: 600,
                        }}
                    >
                        <i className="fas fa-plus me-2"></i>
                        إضافة خدمة
                    </a>
                    <a
                        href="/"
                        target="_blank"
                        style={{
                            padding: "12px 24px",
                            background: "#f5f6fa",
                            color: "#1a1a2e",
                            borderRadius: "10px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: 600,
                        }}
                    >
                        <i className="fas fa-external-link-alt me-2"></i>
                        عرض الموقع
                    </a>
                </div>
            </div>
        </div>
    );
}
