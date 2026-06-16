// src/features/course-management/index.jsx
import React, { useState } from "react";
import CourseHeader from "./components/CourseHeader";
import CourseStats from "./components/CourseStats";
import CourseTable from "./components/CourseTable";

export default function CourseManagementFeature() {
  // Data dummy master kursus
  const [allCourses] = useState([
    { id: 1, user: "Zaenal Fahri Nugroho", name: "Latihan Lari Rutin SMKN 1 ....", category: "Lari", type: "Premium", created: "Kamis, 12/07/2026", updated: "Sabtu, 14/07/2026", status: "Aktif" },
    { id: 2, user: "Sari Dewi Putri", name: "Kursus Anggar Tingkat Dasar", category: "Anggar", type: "Biasa", created: "Senin, 15/07/2026", updated: "Rabu, 17/07/2026", status: "Aktif" },
    { id: 3, user: "Budi Santoso", name: "Pelatihan Renang Kecepatan", category: "Renang", type: "Premium", created: "Selasa, 16/07/2026", updated: "Kamis, 18/07/2026", status: "Aktif" },
    { id: 4, user: "Dewi Lestari", name: "Latihan Nembak Profesional", category: "Nembak", type: "Biasa", created: "Rabu, 17/07/2026", updated: "Jumat, 19/07/2026", status: "Selesai" },
    { id: 5, user: "Agus Prasetyo", name: "Kursus Obstacle Challenge", category: "Obstacle", type: "Premium", created: "Kamis, 18/07/2026", updated: "Sabtu, 20/07/2026", status: "Aktif" },
    { id: 6, user: "Rina Marlina", name: "Pelatihan Lari Jarak Jauh", category: "Lari", type: "Biasa", created: "Jumat, 19/07/2026", updated: "Minggu, 21/07/2026", status: "Selesai" }
  ]);

  // State untuk memilah tab Kursus (Biasa / Premium)
  const [activeCourseType, setActiveCourseType] = useState("Biasa");

  // State BARU untuk memilah status (Semua / Aktif / Selesai)
  const [statusFilter, setStatusFilter] = useState("Semua");

  // Logika filter bertingkat (Tipe Tab DAN Status Dropdown)
  const filteredCourses = allCourses.filter((course) => {
    // 1. Cocokkan tipe tab (Biasa / Premium)
    const matchType = course.type.toLowerCase() === activeCourseType.toLowerCase();
    
    // 2. Cocokkan dengan dropdown status (Semua / Aktif / Selesai)
    const matchStatus = statusFilter === "Semua" || course.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchType && matchStatus;
  });

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <CourseHeader />
        
        <CourseStats 
          activeType={activeCourseType} 
          onChangeType={setActiveCourseType}
          totalBiasa={659}
          totalPremium={341}
        />
        
        {/* Oper state filter status ke komponen tabel */}
        <CourseTable 
          courses={filteredCourses} 
          currentStatusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          activeTypeLabel={activeCourseType}
        />
      </div>
    </main>
  );
}