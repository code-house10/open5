"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/admin/ImageUpload";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image_url: string | null;
    author: string;
    published: boolean;
    published_at: string | null;
    created_at: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image_url: "",
        author: "المدير",
        published: false,
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
        if (data) setPosts(data);
        setLoading(false);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s\u0621-\u064A]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 50);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData = {
            ...formData,
            slug: formData.slug || generateSlug(formData.title),
            published_at: formData.published ? new Date().toISOString() : null,
        };

        if (editingPost) {
            await supabase.from("blog_posts").update(postData).eq("id", editingPost.id);
        } else {
            await supabase.from("blog_posts").insert([postData]);
        }
        setShowModal(false);
        resetForm();
        fetchPosts();
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذا المقال؟")) {
            await supabase.from("blog_posts").delete().eq("id", id);
            fetchPosts();
        }
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content,
            image_url: post.image_url || "",
            author: post.author,
            published: post.published,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingPost(null);
        setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            image_url: "",
            author: "المدير",
            published: false,
        });
    };

    const inputStyle = { width: "100%", padding: "12px 15px", border: "1px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", marginBottom: "15px" };
    const labelStyle: React.CSSProperties = { display: "block", marginBottom: "8px", fontWeight: 600, color: "#333", fontSize: "14px" };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>المدونة</h1>
                    <p style={{ color: "#666", marginTop: "5px" }}>إدارة مقالات ونصائح الموقع</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    style={{
                        padding: "12px 24px",
                        background: "linear-gradient(135deg, #9b59b6, #8e44ad)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    <i className="fas fa-plus me-2"></i>إضافة مقال
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#9b59b6" }}></i>
                </div>
            ) : posts.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "60px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <i className="fas fa-newspaper fa-3x" style={{ color: "#ddd", marginBottom: "20px" }}></i>
                    <p style={{ color: "#888" }}>لا توجد مقالات بعد. أضف أول مقال!</p>
                </div>
            ) : (
                <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#f8f9fa" }}>
                                <th style={{ padding: "15px", textAlign: "right", fontWeight: 600, color: "#1a1a2e" }}>المقال</th>
                                <th style={{ padding: "15px", textAlign: "center", fontWeight: 600, color: "#1a1a2e" }}>الكاتب</th>
                                <th style={{ padding: "15px", textAlign: "center", fontWeight: 600, color: "#1a1a2e" }}>الحالة</th>
                                <th style={{ padding: "15px", textAlign: "center", fontWeight: 600, color: "#1a1a2e" }}>التاريخ</th>
                                <th style={{ padding: "15px", textAlign: "center", fontWeight: 600, color: "#1a1a2e" }}>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "15px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                            <div
                                                style={{
                                                    width: "60px",
                                                    height: "45px",
                                                    borderRadius: "8px",
                                                    background: post.image_url ? `url(${post.image_url}) center/cover` : "#f0f0f0",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {!post.image_url && <i className="fas fa-image" style={{ color: "#ccc" }}></i>}
                                            </div>
                                            <div>
                                                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#1a1a2e" }}>{post.title}</h4>
                                                {post.excerpt && <p style={{ margin: "5px 0 0", fontSize: "13px", color: "#888" }}>{post.excerpt.substring(0, 50)}...</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: "15px", textAlign: "center" }}>
                                        <span style={{ fontSize: "14px", color: "#666" }}>{post.author}</span>
                                    </td>
                                    <td style={{ padding: "15px", textAlign: "center" }}>
                                        <span
                                            style={{
                                                padding: "5px 12px",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                background: post.published ? "#d4edda" : "#fff3cd",
                                                color: post.published ? "#155724" : "#856404",
                                            }}
                                        >
                                            {post.published ? "منشور" : "مسودة"}
                                        </span>
                                    </td>
                                    <td style={{ padding: "15px", textAlign: "center", fontSize: "14px", color: "#666" }}>
                                        {formatDate(post.created_at)}
                                    </td>
                                    <td style={{ padding: "15px", textAlign: "center" }}>
                                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                            <button onClick={() => handleEdit(post)} style={{ padding: "8px 16px", background: "#3498db", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button onClick={() => handleDelete(post.id)} style={{ padding: "8px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        style={{ background: "#fff", borderRadius: "20px", width: "90%", maxWidth: "700px", maxHeight: "90vh", overflow: "auto", padding: "30px" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{editingPost ? "تعديل المقال" : "إضافة مقال جديد"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <div style={{ gridColumn: "span 2" }}>
                                    <label style={labelStyle}>عنوان المقال</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => {
                                            setFormData({ ...formData, title: e.target.value });
                                            if (!editingPost) {
                                                setFormData(prev => ({ ...prev, title: e.target.value, slug: generateSlug(e.target.value) }));
                                            }
                                        }}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>الرابط (slug)</label>
                                    <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>الكاتب</label>
                                    <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>ملخص المقال</label>
                                <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} style={{ ...inputStyle, minHeight: "60px" }} placeholder="وصف قصير للمقال..." />
                            </div>
                            <div>
                                <label style={labelStyle}>محتوى المقال</label>
                                <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} style={{ ...inputStyle, minHeight: "200px" }} required />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={labelStyle}>صورة المقال</label>
                                <ImageUpload currentImage={formData.image_url} onUpload={(url) => setFormData({ ...formData, image_url: url })} onRemove={() => setFormData({ ...formData, image_url: "" })} folder="blog" />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                <input type="checkbox" id="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} style={{ width: "20px", height: "20px" }} />
                                <label htmlFor="published" style={{ fontWeight: 600 }}>نشر المقال</label>
                            </div>
                            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "12px 30px", background: "#f5f6fa", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>إلغاء</button>
                                <button type="submit" style={{ padding: "12px 30px", background: "linear-gradient(135deg, #9b59b6, #8e44ad)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>{editingPost ? "حفظ" : "إضافة"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
