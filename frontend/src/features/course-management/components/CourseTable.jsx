// src/features/course-management/components/CourseTable.jsx
import React from "react";

export default function CourseTable({ courses }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-[#1e3240]">Detail Informasi Kursus</h3>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 focus:outline-none">
            <option>Semua</option>
            <option>Aktif</option>
            <option>Selesai</option>
          </select>
          <button className="bg-[#4a7ca3]/10 text-[#4a7ca3] hover:bg-[#4a7ca3]/20 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
            Unduh Rekap (PDF/CSV)
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-4 text-center w-16">User</th>
              <th className="py-4 px-4">Nama Kursus</th>
              <th className="py-4 px-4">Jenis Kursus</th>
              <th className="py-4 px-4">Tipe Kursus</th>
              <th className="py-4 px-4">Dibuat</th>
              <th className="py-4 px-4">Update</th>
              <th className="py-4 px-4 text-center">Status</th>
              <th className="py-4 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-50">
            {courses.map((course, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 text-center">
                  <div className="w-9 h-9 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center font-bold text-sm mx-auto">
                    👤
                  </div>
                </td>
                <td className="py-4 px-4 font-semibold text-[#1e3240] max-w-[220px] truncate">
                  {course.title}
                </td>
                <td className="py-4 px-4 text-slate-500">{course.category}</td>
                <td className="py-4 px-4 font-medium text-slate-600">{course.type}</td>
                <td className="py-4 px-4 text-xs text-slate-500">
                  <div className="font-semibold text-slate-700">{course.createdDate}</div>
                  <div>{course.createdTime}</div>
                </td>
                <td className="py-4 px-4 text-xs text-slate-500">
                  <div className="font-semibold text-slate-700">{course.updatedDate}</div>
                  <div>{course.updatedTime}</div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    course.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <button className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2">
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
        <span>Menampilkan 1 dari 120 Daftar Kursus</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">&lt; Sebelumnya</button>
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">Selanjutnya &gt;</button>
        </div>
      </div>
    </div>
  );
}