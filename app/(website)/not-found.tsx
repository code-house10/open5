"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-4">404 - Page Not Found</p>
        <a
          href="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
        >
          العودة للرئيسية
        </a>
      </div>
    </div>
  )
}
