"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

interface AboutSection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string | null;
    features: string[];
    years_experience: number;
}

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<AboutSection>>({
        title: "من نحن",
        subtitle: "",
        description: "",
        image_url: "",
        features: [],
        years_experience: 10,
    });
    const [newFeature, setNewFeature] = useState("");

    useEffect(() => {
        fetchAboutSection();
    }, []);

    const fetchAboutSection = async () => {
        const { data } = await supabase.from("about_section").select("*").limit(1).single();
        if (data) {
            setFormData({
                ...data,
                features: Array.isArray(data.features) ? data.features : [],
            });
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const { id, ...dataToSave } = formData as AboutSection;

        if (id) {
            await supabase.from("about_section").update(dataToSave).eq("id", id);
        } else {
            await supabase.from("about_section").insert([dataToSave]);
        }

        setSaving(false);
        alert("تم حفظ البيانات بنجاح!");
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData({
                ...formData,
                features: [...(formData.features || []), newFeature.trim()],
            });
            setNewFeature("");
        }
    };

    const removeFeature = (index: number) => {
        const updated = [...(formData.features || [])];
        updated.splice(index, 1);
        setFormData({ ...formData, features: updated });
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
                    قسم من نحن
                </h1>
                <p style={{ color: "#666", marginTop: "5px" }}>تعديل محتوى قسم "من نحن" في الصفحة الرئيسية</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
                    {/* Main Content */}
                    <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                            <i className="fas fa-edit me-2" style={{ color: "#3498db" }}></i>
                            المحتوى الرئيسي
                        </h3>
                        <div>
                            <label style={labelStyle}>العنوان</label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                style={inputStyle}
                                placeholder="من نحن"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>العنوان الفرعي</label>
                            <input
                                type="text"
                                value={formData.subtitle || ""}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                style={inputStyle}
                                placeholder="شركة متخصصة في نقل العفش منذ عام 2014"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>الوصف</label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                style={{ ...inputStyle, minHeight: "150px" }}
                                placeholder="نحن شركة متخصصة في نقل الأثاث..."
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>سنوات الخبرة</label>
                            <input
                                type="number"
                                value={formData.years_experience || 10}
                                onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                                style={inputStyle}
                                min={1}
                            />
                        </div>
                    </div>

                    {/* Image & Features */}
                    <div>
                        <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                                <i className="fas fa-image me-2" style={{ color: "#9b59b6" }}></i>
                                صورة القسم
                            </h3>
                            <ImageUpload
                                currentImage={formData.image_url || null}
                                onUpload={(url) => setFormData({ ...formData, image_url: url })}
                                onRemove={() => setFormData({ ...formData, image_url: "" })}
                                folder="about"
                            />
                        </div>

                        <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                                <i className="fas fa-check-circle me-2" style={{ color: "#27ae60" }}></i>
                                المميزات
                            </h3>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                                <input
                                    type="text"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                                    placeholder="أضف ميزة جديدة"
                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    style={{
                                        padding: "12px 20px",
                                        background: "#27ae60",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {(formData.features || []).map((feature, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "10px 15px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        <span><i className="fas fa-check text-success me-2"></i>{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#e74c3c",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                        <><i className="fas fa-save me-2"></i>حفظ التغييرات</>
                    )}
                </button>
            </form>
        </div>
    );
}
