"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

interface Portfolio {
    id: string;
    title: string;
    category: string;
    description: string | null;
    image_url: string | null;
    order_index: number;
    active: boolean;
    created_at: string;
}

export default function PortfolioPage() {
    const [items, setItems] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "نقل عفش",
        description: "",
        image_url: "",
        order_index: 0,
        active: true,
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from("portfolio").select("*").order("order_index");
        if (data) setItems(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            await supabase.from("portfolio").update(formData).eq("id", editingItem.id);
        } else {
            await supabase.from("portfolio").insert([formData]);
        }
        setShowModal(false);
        resetForm();
        fetchItems();
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
            await supabase.from("portfolio").delete().eq("id", id);
            fetchItems();
        }
    };

    const handleEdit = (item: Portfolio) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            category: item.category,
            description: item.description || "",
            image_url: item.image_url || "",
            order_index: item.order_index,
            active: item.active,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingItem(null);
        setFormData({
            title: "",
            category: "نقل عفش",
            description: "",
            image_url: "",
            order_index: items.length,
            active: true,
        });
    };

    const inputStyle = { width: "100%", padding: "12px 15px", border: "1px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", marginBottom: "15px" };
    const labelStyle: React.CSSProperties = { display: "block", marginBottom: "8px", fontWeight: 600, color: "#333", fontSize: "14px" };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>معرض الأعمال</h1>
                    <p style={{ color: "#666", marginTop: "5px" }}>إدارة مشاريع وأعمال الشركة</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    style={{
                        padding: "12px 24px",
                        background: "linear-gradient(135deg, #1abc9c, #16a085)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    <i className="fas fa-plus me-2"></i>إضافة مشروع
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#1abc9c" }}></i>
                </div>
            ) : items.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "60px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <i className="fas fa-images fa-3x" style={{ color: "#ddd", marginBottom: "20px" }}></i>
                    <p style={{ color: "#888" }}>لا توجد مشاريع بعد. أضف أول مشروع!</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                    {items.map((item) => (
                        <div key={item.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <div
                                style={{
                                    height: "180px",
                                    background: item.image_url ? `url(${item.image_url}) center/cover` : "#f5f6fa",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                {!item.image_url && <i className="fas fa-image fa-3x" style={{ color: "#ddd" }}></i>}
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        padding: "5px 12px",
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        background: "rgba(26,188,156,0.9)",
                                        color: "#fff",
                                    }}
                                >
                                    {item.category}
                                </span>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "10px" }}>{item.title}</h3>
                                {item.description && (
                                    <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>{item.description.substring(0, 60)}...</p>
                                )}
                                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}>
                                    <span
                                        style={{
                                            padding: "5px 12px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            background: item.active ? "#d4edda" : "#f8d7da",
                                            color: item.active ? "#155724" : "#721c24",
                                        }}
                                    >
                                        {item.active ? "نشط" : "معطل"}
                                    </span>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button onClick={() => handleEdit(item)} style={{ padding: "8px 16px", background: "#3498db", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} style={{ padding: "8px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
                        style={{ background: "#fff", borderRadius: "20px", width: "90%", maxWidth: "500px", maxHeight: "90vh", overflow: "auto", padding: "30px" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{editingItem ? "تعديل المشروع" : "إضافة مشروع"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label style={labelStyle}>عنوان المشروع</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={inputStyle} required />
                            </div>
                            <div>
                                <label style={labelStyle}>التصنيف</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    style={inputStyle}
                                >
                                    <option value="نقل عفش">نقل عفش</option>
                                    <option value="نقل مكاتب">نقل مكاتب</option>
                                    <option value="نقل مصانع">نقل مصانع</option>
                                    <option value="نقل فيلات">نقل فيلات</option>
                                    <option value="تغليف">تغليف</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>الوصف (اختياري)</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, minHeight: "80px" }} />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={labelStyle}>صورة المشروع</label>
                                <ImageUpload currentImage={formData.image_url} onUpload={(url) => setFormData({ ...formData, image_url: url })} onRemove={() => setFormData({ ...formData, image_url: "" })} folder="portfolio" />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                <input type="checkbox" id="active" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} style={{ width: "20px", height: "20px" }} />
                                <label htmlFor="active" style={{ fontWeight: 600 }}>نشط</label>
                            </div>
                            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "12px 30px", background: "#f5f6fa", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>إلغاء</button>
                                <button type="submit" style={{ padding: "12px 30px", background: "linear-gradient(135deg, #1abc9c, #16a085)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>{editingItem ? "حفظ" : "إضافة"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
