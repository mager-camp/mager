// src/features/course-management/components/CourseHeader.jsx
import React from "react";

export default function CourseHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3240] tracking-tight">Manajemen Kursus</h2>
      </div>
      <button
        type="button"
        className="bg-[#4a7ca3] hover:bg-[#3b6383] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
      >
        <span className="text-base">+</span> Add Kursus
      </button>
    </div>
  );
}