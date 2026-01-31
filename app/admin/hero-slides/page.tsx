"use client";

import { useEffect, useState } from "react";
import { supabase, HeroSlide } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

export default function HeroSlidesPage() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        badge_text: "",
        badge_color: "#e74c3c",
        cta_text: "احصل على عرض سعر",
        cta_link: "tel:+201012345678",
        whatsapp_text: "واتساب",
        image_url: "",
        bg_image_url: "",
        order_index: 0,
        active: true,
    });

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        const { data, error } = await supabase
            .from("hero_slides")
            .select("*")
            .order("order_index");

        if (data) setSlides(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingSlide) {
            await supabase
                .from("hero_slides")
                .update(formData)
                .eq("id", editingSlide.id);
        } else {
            await supabase.from("hero_slides").insert([formData]);
        }

        setShowModal(false);
        resetForm();
        fetchSlides();
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذا السلايد؟")) {
            await supabase.from("hero_slides").delete().eq("id", id);
            fetchSlides();
        }
    };

    const handleEdit = (slide: HeroSlide) => {
        setEditingSlide(slide);
        setFormData({
            title: slide.title,
            subtitle: slide.subtitle,
            description: slide.description,
            badge_text: slide.badge_text,
            badge_color: slide.badge_color,
            cta_text: slide.cta_text,
            cta_link: slide.cta_link,
            whatsapp_text: slide.whatsapp_text,
            image_url: slide.image_url || "",
            bg_image_url: slide.bg_image_url || "",
            order_index: slide.order_index,
            active: slide.active,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingSlide(null);
        setFormData({
            title: "",
            subtitle: "",
            description: "",
            badge_text: "",
            badge_color: "#e74c3c",
            cta_text: "احصل على عرض سعر",
            cta_link: "tel:+201012345678",
            whatsapp_text: "واتساب",
            image_url: "",
            bg_image_url: "",
            order_index: slides.length,
            active: true,
        });
    };

    const inputStyle = {
        width: "100%",
        padding: "12px 15px",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        fontSize: "14px",
        marginBottom: "15px",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        fontWeight: 600,
        color: "#333",
        fontSize: "14px",
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                        سلايدر الهيرو
                    </h1>
                    <p style={{ color: "#666", marginTop: "5px" }}>إدارة شرائح العرض الرئيسية</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    style={{
                        padding: "12px 24px",
                        background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    <i className="fas fa-plus me-2"></i>
                    إضافة سلايد
                </button>
            </div>

            {/* Slides Grid */}
            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#e74c3c" }}></i>
                </div>
            ) : slides.length === 0 ? (
                <div style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "60px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                    <i className="fas fa-images fa-3x" style={{ color: "#ddd", marginBottom: "20px" }}></i>
                    <p style={{ color: "#888" }}>لا توجد شرائح بعد. أضف أول سلايد!</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            style={{
                                background: "#fff",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                            }}
                        >
                            <div
                                style={{
                                    height: "150px",
                                    background: slide.bg_image_url
                                        ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.bg_image_url}) center/cover`
                                        : slide.badge_color,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    textAlign: "center",
                                    padding: "20px",
                                }}
                            >
                                {slide.title}
                            </div>
                            <div style={{ padding: "20px" }}>
                                <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
                                    {slide.description.substring(0, 100)}...
                                </p>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}>
                                    <span
                                        style={{
                                            padding: "5px 12px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            background: slide.active ? "#d4edda" : "#f8d7da",
                                            color: slide.active ? "#155724" : "#721c24",
                                        }}
                                    >
                                        {slide.active ? "نشط" : "معطل"}
                                    </span>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                            onClick={() => handleEdit(slide)}
                                            style={{
                                                padding: "8px 16px",
                                                background: "#3498db",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(slide.id)}
                                            style={{
                                                padding: "8px 16px",
                                                background: "#e74c3c",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "20px",
                            width: "90%",
                            maxWidth: "700px",
                            maxHeight: "90vh",
                            overflow: "auto",
                            padding: "30px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                                {editingSlide ? "تعديل السلايد" : "إضافة سلايد جديد"}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <div>
                                    <label style={labelStyle}>العنوان الرئيسي</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>العنوان الفرعي</label>
                                    <input
                                        type="text"
                                        value={formData.subtitle}
                                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>الوصف</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                                    required
                                />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <div>
                                    <label style={labelStyle}>نص البادج</label>
                                    <input
                                        type="text"
                                        value={formData.badge_text}
                                        onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>لون البادج</label>
                                    <input
                                        type="color"
                                        value={formData.badge_color}
                                        onChange={(e) => setFormData({ ...formData, badge_color: e.target.value })}
                                        style={{ ...inputStyle, height: "45px", padding: "5px" }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <div>
                                    <label style={labelStyle}>نص الزر</label>
                                    <input
                                        type="text"
                                        value={formData.cta_text}
                                        onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>رابط الزر</label>
                                    <input
                                        type="text"
                                        value={formData.cta_link}
                                        onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={labelStyle}>صورة الخلفية</label>
                                <ImageUpload
                                    currentImage={formData.bg_image_url}
                                    onUpload={(url) => setFormData({ ...formData, bg_image_url: url })}
                                    onRemove={() => setFormData({ ...formData, bg_image_url: "" })}
                                    folder="hero-slides"
                                />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    style={{ width: "20px", height: "20px" }}
                                />
                                <label htmlFor="active" style={{ fontWeight: 600, color: "#333" }}>نشط</label>
                            </div>

                            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        padding: "12px 30px",
                                        background: "#f5f6fa",
                                        color: "#333",
                                        border: "none",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: "12px 30px",
                                        background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {editingSlide ? "حفظ التعديلات" : "إضافة"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
