"use client";

import { useEffect, useState } from "react";
import { supabase, TeamMember } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState({
        name: "", position: "", image_url: "", facebook_url: "", twitter_url: "", instagram_url: "", order_index: 0, active: true,
    });

    useEffect(() => { fetchMembers(); }, []);

    const fetchMembers = async () => {
        const { data } = await supabase.from("team_members").select("*").order("order_index");
        if (data) setMembers(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMember) {
            await supabase.from("team_members").update(formData).eq("id", editingMember.id);
        } else {
            await supabase.from("team_members").insert([formData]);
        }
        setShowModal(false);
        resetForm();
        fetchMembers();
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذا العضو؟")) {
            await supabase.from("team_members").delete().eq("id", id);
            fetchMembers();
        }
    };

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member);
        setFormData({
            name: member.name, position: member.position, image_url: member.image_url || "",
            facebook_url: member.facebook_url || "", twitter_url: member.twitter_url || "", instagram_url: member.instagram_url || "",
            order_index: member.order_index, active: member.active,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingMember(null);
        setFormData({ name: "", position: "", image_url: "", facebook_url: "", twitter_url: "", instagram_url: "", order_index: members.length, active: true });
    };

    const inputStyle = { width: "100%", padding: "12px 15px", border: "1px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", marginBottom: "15px" };
    const labelStyle = { display: "block", marginBottom: "8px", fontWeight: 600, color: "#333", fontSize: "14px" };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>فريق العمل</h1>
                    <p style={{ color: "#666", marginTop: "5px" }}>إدارة أعضاء الفريق</p>
                </div>
                <button onClick={() => { resetForm(); setShowModal(true); }} style={{ padding: "12px 24px", background: "linear-gradient(135deg, #9b59b6, #8e44ad)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                    <i className="fas fa-plus me-2"></i>إضافة عضو
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}><i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#9b59b6" }}></i></div>
            ) : members.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "60px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <i className="fas fa-users fa-3x" style={{ color: "#ddd", marginBottom: "20px" }}></i>
                    <p style={{ color: "#888" }}>لا يوجد أعضاء بعد. أضف أول عضو!</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                    {members.map((member) => (
                        <div key={member.id} style={{ background: "#fff", borderRadius: "16px", padding: "25px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <div style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "0 auto 15px", background: member.image_url ? `url(${member.image_url}) center/cover` : "#f5f6fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {!member.image_url && <i className="fas fa-user fa-2x" style={{ color: "#ddd" }}></i>}
                            </div>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a2e", marginBottom: "5px" }}>{member.name}</h3>
                            <p style={{ color: "#888", fontSize: "13px", marginBottom: "15px" }}>{member.position}</p>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                <button onClick={() => handleEdit(member)} style={{ padding: "8px 16px", background: "#3498db", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-edit"></i></button>
                                <button onClick={() => handleDelete(member.id)} style={{ padding: "8px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }} onClick={() => setShowModal(false)}>
                    <div style={{ background: "#fff", borderRadius: "20px", width: "90%", maxWidth: "500px", maxHeight: "90vh", overflow: "auto", padding: "30px" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{editingMember ? "تعديل العضو" : "إضافة عضو"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div><label style={labelStyle}>الاسم</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} required /></div>
                            <div><label style={labelStyle}>المنصب</label><input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} style={inputStyle} required /></div>
                            <div style={{ marginBottom: "20px" }}><label style={labelStyle}>الصورة الشخصية</label><ImageUpload currentImage={formData.image_url} onUpload={(url) => setFormData({ ...formData, image_url: url })} onRemove={() => setFormData({ ...formData, image_url: "" })} folder="team" /></div>
                            <div><label style={labelStyle}>رابط فيسبوك</label><input type="url" value={formData.facebook_url} onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })} style={inputStyle} /></div>
                            <div><label style={labelStyle}>رابط انستغرام</label><input type="url" value={formData.instagram_url} onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })} style={inputStyle} /></div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}><input type="checkbox" id="active" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} style={{ width: "20px", height: "20px" }} /><label htmlFor="active" style={{ fontWeight: 600 }}>نشط</label></div>
                            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "12px 30px", background: "#f5f6fa", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>إلغاء</button>
                                <button type="submit" style={{ padding: "12px 30px", background: "linear-gradient(135deg, #9b59b6, #8e44ad)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>{editingMember ? "حفظ" : "إضافة"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
