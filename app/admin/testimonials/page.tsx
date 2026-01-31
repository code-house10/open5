"use client";

import { useEffect, useState } from "react";
import { supabase, Testimonial } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState({
        client_name: "", client_position: "", content: "", image_url: "", rating: 5, active: true,
    });

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
        if (data) setTestimonials(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            await supabase.from("testimonials").update(formData).eq("id", editing.id);
        } else {
            await supabase.from("testimonials").insert([formData]);
        }
        setShowModal(false);
        resetForm();
        fetchData();
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذا التقييم؟")) {
            await supabase.from("testimonials").delete().eq("id", id);
            fetchData();
        }
    };

    const handleEdit = (item: Testimonial) => {
        setEditing(item);
        setFormData({
            client_name: item.client_name, client_position: item.client_position, content: item.content,
            image_url: item.image_url || "", rating: item.rating, active: item.active,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ client_name: "", client_position: "", content: "", image_url: "", rating: 5, active: true });
    };

    const inputStyle = { width: "100%", padding: "12px 15px", border: "1px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", marginBottom: "15px" };
    const labelStyle = { display: "block", marginBottom: "8px", fontWeight: 600, color: "#333", fontSize: "14px" };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>آراء العملاء</h1>
                    <p style={{ color: "#666", marginTop: "5px" }}>إدارة تقييمات وآراء العملاء</p>
                </div>
                <button onClick={() => { resetForm(); setShowModal(true); }} style={{ padding: "12px 24px", background: "linear-gradient(135deg, #f39c12, #e67e22)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                    <i className="fas fa-plus me-2"></i>إضافة تقييم
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}><i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#f39c12" }}></i></div>
            ) : testimonials.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "60px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <i className="fas fa-star fa-3x" style={{ color: "#ddd", marginBottom: "20px" }}></i>
                    <p style={{ color: "#888" }}>لا توجد تقييمات بعد. أضف أول تقييم!</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                    {testimonials.map((item) => (
                        <div key={item.id} style={{ background: "#fff", borderRadius: "16px", padding: "25px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: item.image_url ? `url(${item.image_url}) center/cover` : "#f5f6fa", flexShrink: 0 }}></div>
                                <div>
                                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{item.client_name}</h3>
                                    <p style={{ color: "#888", fontSize: "13px", margin: "3px 0 0" }}>{item.client_position}</p>
                                </div>
                            </div>
                            <div style={{ color: "#f39c12", marginBottom: "10px" }}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</div>
                            <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px", lineHeight: 1.6 }}>"{item.content}"</p>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                <button onClick={() => handleEdit(item)} style={{ padding: "8px 16px", background: "#3498db", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-edit"></i></button>
                                <button onClick={() => handleDelete(item.id)} style={{ padding: "8px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }} onClick={() => setShowModal(false)}>
                    <div style={{ background: "#fff", borderRadius: "20px", width: "90%", maxWidth: "500px", maxHeight: "90vh", overflow: "auto", padding: "30px" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{editing ? "تعديل التقييم" : "إضافة تقييم"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div><label style={labelStyle}>اسم العميل</label><input type="text" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} style={inputStyle} required /></div>
                            <div><label style={labelStyle}>المنصب/الشركة</label><input type="text" value={formData.client_position} onChange={(e) => setFormData({ ...formData, client_position: e.target.value })} style={inputStyle} /></div>
                            <div><label style={labelStyle}>التقييم</label><textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} style={{ ...inputStyle, minHeight: "100px" }} required /></div>
                            <div><label style={labelStyle}>عدد النجوم</label><select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} style={inputStyle}>{[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} نجوم</option>)}</select></div>
                            <div style={{ marginBottom: "20px" }}><label style={labelStyle}>صورة العميل</label><ImageUpload currentImage={formData.image_url} onUpload={(url) => setFormData({ ...formData, image_url: url })} onRemove={() => setFormData({ ...formData, image_url: "" })} folder="testimonials" /></div>
                            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "12px 30px", background: "#f5f6fa", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>إلغاء</button>
                                <button type="submit" style={{ padding: "12px 30px", background: "linear-gradient(135deg, #f39c12, #e67e22)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>{editing ? "حفظ" : "إضافة"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
