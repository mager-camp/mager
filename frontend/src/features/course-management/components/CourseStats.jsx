// src/features/course-management/components/CourseStats.jsx
import React from "react";

// Import semua aset gambar lokal dari folder src/assets/
import obstacleImg from "../../../assets/obstacle.png";
import anggarImg from "../../../assets/anggar.png";
import tembakImg from "../../../assets/tembak.png";
import renangImg from "../../../assets/renang.png";
import lariImg from "../../../assets/lari.png";

export default function CourseStats({ activeType, onChangeType, totalBiasa, totalPremium }) {
  // Data statis kategori olahraga dengan pembaruan kode warna kustom sesuai request abang
  const categoriesData = [
    { name: "Obstacle", count: 20, trend: "120 bulan ini", isPositive: true, color: "text-[#199454]", img: obstacleImg },
    { name: "Anggar", count: 20, trend: "120 bulan ini", isPositive: true, color: "text-[#644FB7]", img: anggarImg },
    { name: "Tembak", count: 20, trend: "9 bulan ini", isPositive: false, color: "text-[#E64950]", img: tembakImg },
    { name: "Renang", count: 120, trend: "120 bulan ini", isPositive: false, color: "text-[#3C7CC5]", img: renangImg },
    { name: "Lari", count: 20, trend: "120 bulan ini", isPositive: true, color: "text-[#F88841]", img: lariImg },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
      
      {/* 1. CARD UTAMA: TOTAL KURSUS */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] md:col-span-4 flex flex-col justify-between min-h-[175px]">
        <div>
          <h4 className="text-[11px] font-bold text-slate-400 tracking-wide mb-3">Total Kursus</h4>
          
          {/* Slider Tab Selector */}
          <div className="bg-slate-100 p-0.5 rounded-xl flex gap-1 w-full">
            <button
              type="button"
              onClick={() => onChangeType("Biasa")}
              className={`flex-1 text-center py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all ${
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
              className={`flex-1 text-center py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all ${
                activeType === "Premium"
                  ? "bg-[#4a7ca3] text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Kursus Premium
            </button>
          </div>
        </div>

        {/* Pembungkus Angka Stat di Tengah Card Utama */}
        <div className="mt-3 text-center flex flex-col items-center justify-center">
          {/* ⚙️ PERUBAHAN: 
              - text-[#133957]: Mengubah warna teks angka menjadi warna baru request abang.
              - font-bold: Menurunkan ketebalan teks (sebelumnya font-black / font-extrabold).
          */}
          <h2 className="text-[90px] font-bold text-[#133957] tracking-tight leading-none my-2">
            {activeType === "Biasa" ? totalBiasa : totalPremium}
          </h2>
          <p className="text-[10px] text-[#00cd3c] font-bold mt-0.5 flex items-center justify-center gap-0.5 w-full">
            <span className="text-[8px]">↗</span> .120 bulan ini
          </p>
        </div>
      </div>

      {/* 2. AREA KATEGORI OLAHRAGA */}
      <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categoriesData.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[82px] relative overflow-hidden"
          >
            {/* Bagian Atas: Label Nama Kategori (Warna Dinamis Sesuai Request) */}
            <span className={`text-xs font-bold ${cat.color} tracking-wide`}>
              {cat.name}
            </span>
            
            {/* Bagian Bawah: Angka Status & Tren Data */}
            <div className="mt-3 z-10">
              <h3 className={`text-3xl font-black ${cat.color} tracking-tight leading-none`}>
                {cat.count}
              </h3>
              <p className={`text-[10px] font-bold mt-1 flex items-center gap-0.5 ${cat.isPositive ? "text-[#00cd3c]" : "text-[#ff4d4d]"}`}>
                <span className="text-[8px] font-bold">{cat.isPositive ? "↗" : "↘"}</span> .{cat.trend}
              </p>
            </div>

            {/* Aset Gambar dengan Ukuran Besar & Jarak Padding Manis dari Pojok */}
            <div className="absolute right-3 bottom-3 w-20 h-20 flex items-center justify-center opacity-90 pointer-events-none">
              <img
                src={cat.img}
                alt={`Icon ${cat.name}`}
                className="w-full h-full object-contain object-right-bottom"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}