// src/features/course-management/components/CourseStats.jsx
import React, { useState } from "react";

export default function CourseStats() {
  const [activeTab, setActiveTab] = useState("biasa");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 mb-10">
      {/* Total Kursus (Lebar lebih besar) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-4 flex flex-col justify-between">
        <div>
          <p className="text-sm font-bold text-slate-700">Total Kursus</p>
          {/* Toggle Switch */}
          <div className="flex bg-slate-100 p-1 rounded-lg mt-3 w-fit">
            <button
              onClick={() => setActiveTab("biasa")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "biasa" ? "bg-[#4a7ca3] text-white shadow-sm" : "text-slate-500"
              }`}
            >
              Kursus Biasa
            </button>
            <button
              onClick={() => setActiveTab("premium")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "premium" ? "bg-[#4a7ca3] text-white shadow-sm" : "text-slate-500"
              }`}
            >
              Kursus Premium
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-6xl font-black text-[#1e3240] tracking-tight">659</h3>
          <p className="text-xs text-green-500 font-semibold mt-2 flex items-center gap-1">
            ↗ +120 bulan ini
          </p>
        </div>
      </div>

      {/* Grid Kanan untuk Sub-Kategori Sukan */}
      <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {/* Obstacle */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-green-600">Obstacle</p>
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-extrabold text-slate-800">20</h4>
            <p className="text-[11px] text-green-500 font-medium mt-1">↗ +120 bulan ini</p>
          </div>
        </div>

        {/* Anggar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-indigo-600">Anggar</p>
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-extrabold text-slate-800">20</h4>
            <p className="text-[11px] text-indigo-500 font-medium mt-1">↗ +120 bulan ini</p>
          </div>
        </div>

        {/* Tembak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-red-500">Tembak</p>
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-extrabold text-slate-800">20</h4>
            <p className="text-[11px] text-red-500 font-medium mt-1">↘ -9 bulan ini</p>
          </div>
        </div>

        {/* Renang */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-blue-500">Renang</p>
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-extrabold text-slate-800">120</h4>
            <p className="text-[11px] text-red-500 font-medium mt-1">↘ -12 bulan ini</p>
          </div>
        </div>

        {/* Lari */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-amber-500">Lari</p>
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-extrabold text-slate-800">20</h4>
            <p className="text-[11px] text-green-500 font-medium mt-1">↗ +120 bulan ini</p>
          </div>
        </div>
      </div>
    </div>
  );
}