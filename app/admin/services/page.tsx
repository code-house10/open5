"use client";

import { useEffect, useState } from "react";
import { supabase, Service } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_url: "",
        order_index: 0,
        active: true,
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await supabase.from("services").select("*").order("order_index");
        if (data) setServices(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            await supabase.from("services").update(formData).eq("id", editingService.id);
        } else {
            await supabase.from("services").insert([formData]);
        }
        setShowModal(false);
        resetForm();
        fetchServices();
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
            await supabase.from("services").delete().eq("id", id);
            fetchServices();
        }
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            image_url: service.image_url || "",
            order_index: service.order_index,
            active: service.active,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingService(null);
        setFormData({ title: "", description: "", image_url: "", order_index: services.length, active: true });
    };

    const inputStyle = { width: "100%", padding: "12px 15px", border: "1px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", marginBottom: "15px" };
    const labelStyle = { display: "block", marginBottom: "8px", fontWeight: 600, color: "#333", fontSize: "14px" };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>الخدمات</h1>
                    <p style={{ color: "#666", marginTop: "5px" }}>إدارة خدمات الشركة</p>
                </div>
                <button onClick={() => { resetForm(); setShowModal(true); }} style={{ padding: "12px 24px", background: "linear-gradient(135deg, #3498db, #2980b9)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                    <i className="fas fa-plus me-2"></i>إضافة خدمة
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}><i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#3498db" }}></i></div>
            ) : services.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "60px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <i className="fas fa-cogs fa-3x" style={{ color: "#ddd", marginBottom: "20px" }}></i>
                    <p style={{ color: "#888" }}>لا توجد خدمات بعد. أضف أول خدمة!</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                    {services.map((service) => (
                        <div key={service.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <div style={{ height: "160px", background: service.image_url ? `url(${service.image_url}) center/cover` : "#f5f6fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {!service.image_url && <i className="fas fa-image fa-3x" style={{ color: "#ddd" }}></i>}
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "10px" }}>{service.title}</h3>
                                <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>{service.description.substring(0, 80)}...</p>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ padding: "5px 12px", borderRadius: "20px", fontSize: "12px", background: service.active ? "#d4edda" : "#f8d7da", color: service.active ? "#155724" : "#721c24" }}>{service.active ? "نشط" : "معطل"}</span>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button onClick={() => handleEdit(service)} style={{ padding: "8px 16px", background: "#3498db", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDelete(service.id)} style={{ padding: "8px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }} onClick={() => setShowModal(false)}>
                    <div style={{ background: "#fff", borderRadius: "20px", width: "90%", maxWidth: "500px", maxHeight: "90vh", overflow: "auto", padding: "30px" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{editingService ? "تعديل الخدمة" : "إضافة خدمة"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div><label style={labelStyle}>اسم الخدمة</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={inputStyle} required /></div>
                            <div><label style={labelStyle}>الوصف</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, minHeight: "100px" }} required /></div>
                            <div style={{ marginBottom: "20px" }}><label style={labelStyle}>صورة الخدمة</label><ImageUpload currentImage={formData.image_url} onUpload={(url) => setFormData({ ...formData, image_url: url })} onRemove={() => setFormData({ ...formData, image_url: "" })} folder="services" /></div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}><input type="checkbox" id="active" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} style={{ width: "20px", height: "20px" }} /><label htmlFor="active" style={{ fontWeight: 600 }}>نشط</label></div>
                            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "12px 30px", background: "#f5f6fa", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>إلغاء</button>
                                <button type="submit" style={{ padding: "12px 30px", background: "linear-gradient(135deg, #3498db, #2980b9)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>{editingService ? "حفظ" : "إضافة"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
