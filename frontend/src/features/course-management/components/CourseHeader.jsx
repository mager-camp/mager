// src/features/course-management/components/CourseHeader.jsx
import React from "react";

export default function CourseHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3240] tracking-tight">Manajemen Kursus</h2>
      </div>
      {/* Tombol "+ Add Kursus" sudah berhasil dihapus dari sini agar tampilan layout pas dan bersih */}
    </div>
  );
}