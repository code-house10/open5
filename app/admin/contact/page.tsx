"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ContactInfo {
    id: string;
    phone: string;
    phone2: string | null;
    whatsapp: string;
    email: string;
    address: string;
    working_hours: string;
    facebook_url: string | null;
    instagram_url: string | null;
    twitter_url: string | null;
    tiktok_url: string | null;
    map_embed: string | null;
}

export default function ContactPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<ContactInfo>>({
        phone: "",
        phone2: "",
        whatsapp: "",
        email: "",
        address: "",
        working_hours: "",
        facebook_url: "",
        instagram_url: "",
        twitter_url: "",
        tiktok_url: "",
        map_embed: "",
    });

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const fetchContactInfo = async () => {
        const { data } = await supabase.from("contact_info").select("*").limit(1).single();
        if (data) {
            setFormData(data);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const { id, ...dataToSave } = formData as ContactInfo;

        if (id) {
            await supabase.from("contact_info").update(dataToSave).eq("id", id);
        } else {
            await supabase.from("contact_info").insert([dataToSave]);
        }

        setSaving(false);
        alert("تم حفظ معلومات التواصل بنجاح!");
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
                    معلومات التواصل
                </h1>
                <p style={{ color: "#666", marginTop: "5px" }}>إدارة بيانات التواصل وروابط السوشيال ميديا</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                        <i className="fas fa-phone me-2" style={{ color: "#e74c3c" }}></i>
                        أرقام الهاتف
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div>
                            <label style={labelStyle}>رقم الهاتف الرئيسي</label>
                            <input
                                type="tel"
                                value={formData.phone || ""}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={inputStyle}
                                placeholder="01012345678"
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>رقم هاتف إضافي</label>
                            <input
                                type="tel"
                                value={formData.phone2 || ""}
                                onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                                style={inputStyle}
                                placeholder="01234567890"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>رقم الواتساب</label>
                            <input
                                type="tel"
                                value={formData.whatsapp || ""}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                style={inputStyle}
                                placeholder="01012345678"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={formData.email || ""}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={inputStyle}
                                placeholder="info@example.com"
                            />
                        </div>
                    </div>
                </div>

                <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                        <i className="fas fa-map-marker-alt me-2" style={{ color: "#3498db" }}></i>
                        العنوان وساعات العمل
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div>
                            <label style={labelStyle}>العنوان</label>
                            <input
                                type="text"
                                value={formData.address || ""}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                style={inputStyle}
                                placeholder="القاهرة، مصر"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>ساعات العمل</label>
                            <input
                                type="text"
                                value={formData.working_hours || ""}
                                onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                                style={inputStyle}
                                placeholder="24/7"
                            />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>كود خريطة جوجل (iframe)</label>
                        <textarea
                            value={formData.map_embed || ""}
                            onChange={(e) => setFormData({ ...formData, map_embed: e.target.value })}
                            style={{ ...inputStyle, minHeight: "100px" }}
                            placeholder="<iframe src='...'></iframe>"
                        />
                    </div>
                </div>

                <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                        <i className="fas fa-share-alt me-2" style={{ color: "#9b59b6" }}></i>
                        روابط السوشيال ميديا
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div>
                            <label style={labelStyle}><i className="fab fa-facebook me-2"></i>فيسبوك</label>
                            <input
                                type="url"
                                value={formData.facebook_url || ""}
                                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                                style={inputStyle}
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div>
                            <label style={labelStyle}><i className="fab fa-instagram me-2"></i>انستغرام</label>
                            <input
                                type="url"
                                value={formData.instagram_url || ""}
                                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                                style={inputStyle}
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label style={labelStyle}><i className="fab fa-twitter me-2"></i>تويتر</label>
                            <input
                                type="url"
                                value={formData.twitter_url || ""}
                                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                                style={inputStyle}
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div>
                            <label style={labelStyle}><i className="fab fa-tiktok me-2"></i>تيك توك</label>
                            <input
                                type="url"
                                value={formData.tiktok_url || ""}
                                onChange={(e) => setFormData({ ...formData, tiktok_url: e.target.value })}
                                style={inputStyle}
                                placeholder="https://tiktok.com/..."
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    style={{
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
