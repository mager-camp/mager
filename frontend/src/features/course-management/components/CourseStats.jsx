// src/features/course-management/components/CourseStats.jsx
import React from "react";

export default function CourseStats({ activeType, onChangeType, totalBiasa, totalPremium }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
      {/* CARD 1: TOTAL KURSUS DENGAN FILTER TAB PILIHAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm md:col-span-4 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#1e3240] mb-3">Total Kursus</h4>
          
          {/* Pembungkus Tab Pilihan Kursus Biasa vs Premium */}
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 w-full max-w-[260px]">
            <button
              type="button"
              onClick={() => onChangeType("Biasa")}
              className={`flex-1 text-center py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all ${
                activeType === "Biasa"
                  ? "bg-[#4a7ca3] text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Kursus Biasa
            </button>
            <button
              type="button"
              onClick={() => onChangeType("Premium")}
              className={`flex-1 text-center py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all ${
                activeType === "Premium"
                  ? "bg-[#4a7ca3] text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Kursus Premium
            </button>
          </div>
        </div>

        <div className="mt-6">
          {/* Angka berganti dinamis sesuai tab aktif */}
          <h2 className="text-5xl font-black text-[#1e3240] tracking-tight">
            {activeType === "Biasa" ? totalBiasa : totalPremium}
          </h2>
          <p className="text-[11px] font-bold text-green-600 mt-2">▲ +120 bulan ini</p>
        </div>
      </div>

      {/* CARD MINI KATEGORI DETAIL (OBSTACLE, ANGGAR, TEMBAK, RENANG, LARI) */}
      <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-green-600">Obstacle</span>
          <h3 className="text-3xl font-black text-slate-700 mt-3">20</h3>
          <p className="text-[10px] text-green-600 font-bold mt-1">▲ +120 bulan ini</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-purple-600">Anggar</span>
          <h3 className="text-3xl font-black text-slate-700 mt-3">20</h3>
          <p className="text-[10px] text-green-600 font-bold mt-1">▲ +120 bulan ini</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-red-500">Tembak</span>
          <h3 className="text-3xl font-black text-red-500 mt-3">20</h3>
          <p className="text-[10px] text-red-500 font-bold mt-1">▼ -9 bulan ini</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-blue-500">Renang</span>
          <h3 className="text-3xl font-black text-blue-600 mt-3">120</h3>
          <p className="text-[10px] text-red-500 font-bold mt-1">▼ -12 bulan ini</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-orange-500">Lari</span>
          <h3 className="text-3xl font-black text-slate-700 mt-3">20</h3>
          <p className="text-[10px] text-green-600 font-bold mt-1">▲ +120 bulan ini</p>
        </div>
      </div>
    </div>
  );
}