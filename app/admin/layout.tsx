import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";
import "./admin.css";

export const metadata: Metadata = {
  title: "لوحة الإدارة | ترانزيت لوجستيكس",
  description: "لوحة إدارة محتوى الموقع",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <Sidebar />
        <main className="admin-content">{children}</main>
      </body>
    </html>
  );
}
