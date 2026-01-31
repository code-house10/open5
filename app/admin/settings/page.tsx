"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

interface SiteSettings {
    id: string;
    site_name: string;
    site_name_ar: string;
    logo_url: string | null;
    favicon_url: string | null;
    meta_description: string;
    primary_color: string;
    secondary_color: string;
}

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<SiteSettings>>({
        site_name: "",
        site_name_ar: "",
        logo_url: "",
        favicon_url: "",
        meta_description: "",
        primary_color: "#e74c3c",
        secondary_color: "#1a1a2e",
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const { data } = await supabase.from("site_settings").select("*").limit(1).single();
        if (data) {
            setFormData(data);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const { id, ...dataToSave } = formData as SiteSettings;

        if (id) {
            await supabase.from("site_settings").update(dataToSave).eq("id", id);
        } else {
            await supabase.from("site_settings").insert([dataToSave]);
        }

        setSaving(false);
        alert("تم حفظ الإعدادات بنجاح!");
    };

    const inputStyle = {
        width: "100%",
        padding: "12px 15px",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        fontSize: "14px",
        marginBottom: "15px",
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        marginBottom: "8px",
        fontWeight: 600,
        color: "#333",
        fontSize: "14px",
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#e74c3c" }}></i>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                    إعدادات الموقع
                </h1>
                <p style={{ color: "#666", marginTop: "5px" }}>تخصيص مظهر الموقع والبيانات الأساسية</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    {/* Site Identity */}
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                            <i className="fas fa-globe me-2" style={{ color: "#3498db" }}></i>
                            هوية الموقع
                        </h3>
                        <div>
                            <label style={labelStyle}>اسم الموقع (إنجليزي)</label>
                            <input
                                type="text"
                                value={formData.site_name || ""}
                                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                                style={inputStyle}
                                placeholder="Transit Logistics"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>اسم الموقع (عربي)</label>
                            <input
                                type="text"
                                value={formData.site_name_ar || ""}
                                onChange={(e) => setFormData({ ...formData, site_name_ar: e.target.value })}
                                style={inputStyle}
                                placeholder="ترانزيت لوجستيكس"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>وصف الموقع (للسيو)</label>
                            <textarea
                                value={formData.meta_description || ""}
                                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                style={{ ...inputStyle, minHeight: "100px" }}
                                placeholder="شركة متخصصة في نقل الأثاث..."
                            />
                        </div>
                    </div>

                    {/* Logo & Favicon */}
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                            <i className="fas fa-image me-2" style={{ color: "#9b59b6" }}></i>
                            الشعار والأيقونة
                        </h3>
                        <div style={{ marginBottom: "25px" }}>
                            <label style={labelStyle}>شعار الموقع</label>
                            <ImageUpload
                                currentImage={formData.logo_url || null}
                                onUpload={(url) => setFormData({ ...formData, logo_url: url })}
                                onRemove={() => setFormData({ ...formData, logo_url: "" })}
                                folder="settings"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>أيقونة الموقع (Favicon)</label>
                            <ImageUpload
                                currentImage={formData.favicon_url || null}
                                onUpload={(url) => setFormData({ ...formData, favicon_url: url })}
                                onRemove={() => setFormData({ ...formData, favicon_url: "" })}
                                folder="settings"
                            />
                        </div>
                    </div>
                </div>

                {/* Colors */}
                <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginTop: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                        <i className="fas fa-palette me-2" style={{ color: "#e74c3c" }}></i>
                        ألوان الموقع
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div>
                            <label style={labelStyle}>اللون الأساسي</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input
                                    type="color"
                                    value={formData.primary_color || "#e74c3c"}
                                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                                    style={{ width: "60px", height: "45px", padding: "5px", border: "1px solid #ddd", borderRadius: "8px" }}
                                />
                                <input
                                    type="text"
                                    value={formData.primary_color || "#e74c3c"}
                                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                                    style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>اللون الثانوي</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input
                                    type="color"
                                    value={formData.secondary_color || "#1a1a2e"}
                                    onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                                    style={{ width: "60px", height: "45px", padding: "5px", border: "1px solid #ddd", borderRadius: "8px" }}
                                />
                                <input
                                    type="text"
                                    value={formData.secondary_color || "#1a1a2e"}
                                    onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                                    style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "20px", padding: "15px", borderRadius: "10px", background: `linear-gradient(135deg, ${formData.primary_color}, ${formData.secondary_color})` }}>
                        <p style={{ color: "#fff", margin: 0, textAlign: "center" }}>معاينة الألوان</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        marginTop: "30px",
                        padding: "15px 40px",
                        background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: saving ? "wait" : "pointer",
                        fontSize: "16px",
                        fontWeight: 600,
                        opacity: saving ? 0.7 : 1,
                    }}
                >
                    {saving ? (
                        <><i className="fas fa-spinner fa-spin me-2"></i>جاري الحفظ...</>
                    ) : (
                        <><i className="fas fa-save me-2"></i>حفظ الإعدادات</>
                    )}
                </button>
            </form>
        </div>
    );
}
