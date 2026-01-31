"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
    currentImage: string | null;
    onUpload: (url: string) => void;
    onRemove: () => void;
    bucket?: string;
    folder?: string;
}

export default function ImageUpload({
    currentImage,
    onUpload,
    onRemove,
    bucket = "images",
    folder = "uploads",
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // Create unique filename
            const fileExt = file.name.split(".").pop();
            const fileName = `${folder}/${Date.now()}.${fileExt}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(fileName, file);

            if (error) throw error;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(fileName);

            setPreview(urlData.publicUrl);
            onUpload(urlData.publicUrl);
        } catch (error: unknown) {
            console.error("Upload error:", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            alert(`حدث خطأ أثناء رفع الصورة:\n${errorMessage}`);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onRemove();
    };

    return (
        <div
            style={{
                border: "2px dashed #ddd",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                background: "#fafafa",
            }}
        >
            {preview ? (
                <div style={{ position: "relative" }}>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            borderRadius: "8px",
                            objectFit: "cover",
                        }}
                    />
                    <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
                        <label
                            style={{
                                padding: "8px 20px",
                                background: "#3498db",
                                color: "#fff",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            <i className="fas fa-sync-alt me-2"></i>
                            تغيير
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                style={{ display: "none" }}
                            />
                        </label>
                        <button
                            onClick={handleRemove}
                            style={{
                                padding: "8px 20px",
                                background: "#e74c3c",
                                color: "#fff",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            <i className="fas fa-trash me-2"></i>
                            حذف
                        </button>
                    </div>
                </div>
            ) : (
                <label
                    style={{
                        display: "block",
                        cursor: uploading ? "wait" : "pointer",
                        padding: "30px",
                    }}
                >
                    <i
                        className="fas fa-cloud-upload-alt"
                        style={{ fontSize: "48px", color: "#bbb", marginBottom: "15px", display: "block" }}
                    ></i>
                    <p style={{ color: "#888", margin: 0 }}>
                        {uploading ? "جاري الرفع..." : "اضغط لرفع صورة"}
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        style={{ display: "none" }}
                    />
                </label>
            )}
        </div>
    );
}
