"use client";

import { useEffect, useState } from "react";
import { supabase, FAQ } from "@/lib/supabase";

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<FAQ | null>(null);
    const [formData, setFormData] = useState({ question: "", answer: "", order_index: 0, active: true });

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        const { data } = await supabase.from("faq").select("*").order("order_index");
        if (data) setFaqs(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            await supabase.from("faq").update(formData).eq("id", editing.id);
        } else {
            await supabase.from("faq").insert([formData]);
        }
        setShowModal(false);
        resetForm();
        fetchData();
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذا السؤال؟")) {
            await supabase.from("faq").delete().eq("id", id);
            fetchData();
        }
    };

    const handleEdit = (item: FAQ) => {
        setEditing(item);
        setFormData({ question: item.question, answer: item.answer, order_index: item.order_index, active: item.active });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ question: "", answer: "", order_index: faqs.length, active: true });
    };

    const inputStyle = { width: "100%", padding: "12px 15px", border: "1px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", marginBottom: "15px" };
    const labelStyle = { display: "block", marginBottom: "8px", fontWeight: 600, color: "#333", fontSize: "14px" };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>الأسئلة الشائعة</h1>
                    <p style={{ color: "#666", marginTop: "5px" }}>إدارة الأسئلة المتكررة</p>
                </div>
                <button onClick={() => { resetForm(); setShowModal(true); }} style={{ padding: "12px 24px", background: "linear-gradient(135deg, #1abc9c, #16a085)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                    <i className="fas fa-plus me-2"></i>إضافة سؤال
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}><i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#1abc9c" }}></i></div>
            ) : faqs.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "60px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <i className="fas fa-question-circle fa-3x" style={{ color: "#ddd", marginBottom: "20px" }}></i>
                    <p style={{ color: "#888" }}>لا توجد أسئلة بعد. أضف أول سؤال!</p>
                </div>
            ) : (
                <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    {faqs.map((faq, index) => (
                        <div key={faq.id} style={{ padding: "20px 25px", borderBottom: index < faqs.length - 1 ? "1px solid #eee" : "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>{faq.question}</h3>
                                    <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                                </div>
                                <div style={{ display: "flex", gap: "8px", marginRight: "15px" }}>
                                    <button onClick={() => handleEdit(faq)} style={{ padding: "8px 16px", background: "#3498db", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(faq.id)} style={{ padding: "8px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-trash"></i></button>
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
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{editing ? "تعديل السؤال" : "إضافة سؤال"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div><label style={labelStyle}>السؤال</label><input type="text" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} style={inputStyle} required /></div>
                            <div><label style={labelStyle}>الإجابة</label><textarea value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} style={{ ...inputStyle, minHeight: "120px" }} required /></div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}><input type="checkbox" id="active" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} style={{ width: "20px", height: "20px" }} /><label htmlFor="active" style={{ fontWeight: 600 }}>نشط</label></div>
                            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "12px 30px", background: "#f5f6fa", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>إلغاء</button>
                                <button type="submit" style={{ padding: "12px 30px", background: "linear-gradient(135deg, #1abc9c, #16a085)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>{editing ? "حفظ" : "إضافة"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
