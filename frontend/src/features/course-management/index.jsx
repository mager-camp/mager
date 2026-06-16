// src/features/course-management/index.jsx
import React, { useState } from "react";
import CourseHeader from "./components/CourseHeader";
import CourseStats from "./components/CourseStats";
import CourseTable from "./components/CourseTable";

export default function CourseManagementFeature() {
  const [courses] = useState([
    { title: "Latihan Lari Rutin SMKN 1 ...", category: "Lari", type: "Premium", createdDate: "Kamis, 12/07/2026", createdTime: "12.00 WIB", updatedDate: "Sabtu, 14/07/2026", updatedTime: "12.00 WIB", status: "Aktif" },
    { title: "Kursus Anggar Tingkat Dasar", category: "Anggar", type: "Biasa", createdDate: "Senin, 15/07/2026", createdTime: "09.00 WIB", updatedDate: "Rabu, 17/07/2026", updatedTime: "12.00 WIB", status: "Aktif" },
    { title: "Pelatihan Renang Kecepatan", category: "Renang", type: "Premium", createdDate: "Selasa, 16/07/2026", createdTime: "13.00 WIB", updatedDate: "Kamis, 18/07/2026", updatedTime: "15.00 WIB", status: "Aktif" },
    { title: "Latihan Nembak Profesional", category: "Nembak", type: "Biasa", createdDate: "Rabu, 17/07/2026", createdTime: "10.00 WIB", updatedDate: "Jumat, 19/07/2026", updatedTime: "12.00 WIB", status: "Selesai" },
    { title: "Kursus Obstacle Challenge", category: "Obstacle", type: "Premium", createdDate: "Kamis, 18/07/2026", createdTime: "08.00 WIB", updatedDate: "Sabtu, 20/07/2026", updatedTime: "10.00 WIB", status: "Aktif" },
    { title: "Pelatihan Lari Jarak Jauh", category: "Lari", type: "Biasa", createdDate: "Jumat, 19/07/2026", createdTime: "07.00 WIB", updatedDate: "Minggu, 21/07/2026", updatedTime: "09.00 WIB", status: "Aktif" },
  ]);

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <CourseHeader />
        <CourseStats />
        <CourseTable courses={courses} />
      </div>
    </main>
  );
}