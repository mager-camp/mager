// src/features/course-management/components/CourseTable.jsx
import React, { useState, useRef, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function CourseTable({ courses, currentStatusFilter, onStatusFilterChange, activeTypeLabel }) {
  const [showDownloadModal, setShowDownloadModal] = useState(false); // Pop-up 1
  const [showSuccessModal, setShowSuccessModal] = useState(false);   // Pop-up 2
  const [selectedMonth, setSelectedMonth] = useState("Januari");

  // State kustom untuk mengontrol buka/tutup menu dropdown filter status
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown otomatis jika pengguna mengklik di luar area komponen
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Opsi penapis status kursus
  const filterOptions = ["Semua", "Aktif", "Selesai"];

  // ==========================================
  // FUNCTION 1: DOWNLOAD CSV (SUDAH BISA)
  // ==========================================
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "User,Nama Kursus,Jenis Kursus,Tipe Kursus,Dibuat,Update,Status\n";

    courses.forEach((course) => {
      const row = [
        `"${course.user}"`,
        `"${course.name}"`,
        `"${course.category}"`,
        `"${course.type}"`,
        `"${course.created}"`,
        `"${course.updated}"`,
        `"${course.status}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Kursus_${activeTypeLabel}_${selectedMonth}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // FUNCTION 2: DOWNLOAD PDF (VERSI BARU - ANTI CRASH)
  // ==========================================
  const exportToPDF = () => {
    try {
      // 1. Inisialisasi jsPDF dengan posisi Landscape agar muat tabel lebar
      const doc = new jsPDF({ orientation: "landscape" });

      // 2. Judul Laporan di dalam File PDF
      doc.setFontSize(16);
      doc.text(`REKAP DATA INFORMASI KURSUS - ${activeTypeLabel.toUpperCase()}`, 14, 15);
      doc.setFontSize(11);
      doc.text(`Periode Bulan: ${selectedMonth} 2026 | Status Filter: ${currentStatusFilter}`, 14, 22);

      // 3. Siapkan Judul Kolom (Header)
      const tableHeaders = [["USER", "NAMA KURSUS", "JENIS KURSUS", "TIPE KURSUS", "DIBUAT", "UPDATE", "STATUS"]];

      // 4. Petakan langsung data dari State Array React (Aman dari manipulasi DOM HTML)
      const tableRows = courses.map((course) => [
        course.user,
        course.name,
        course.category,
        course.type,
        course.created,
        course.updated,
        course.status
      ]);

      // 5. Gambar tabelnya ke dalam dokumen PDF dengan style minimalis rapi
      autoTable(doc, {
        head: tableHeaders,
        body: tableRows,
        startY: 28,
        theme: "striped",
        headStyles: { fillColor: [74, 124, 163] }, // Warna biru dongker #4a7ca3 sesuai tema dashboardmu
        styles: { fontSize: 9 }
      });

      // 6. Unduh otomatis ke komputer browser
      doc.save(`Rekap_Kursus_${activeTypeLabel}_${selectedMonth}_2026.pdf`);
    } catch (error) {
      console.error("Gagal men-generate PDF:", error);
    }
  };

  // Handler utama pemicu format download dari pop-up
  const handleDownloadAction = (format) => {
    if (format === "CSV") {
      exportToCSV();
    } else if (format === "PDF") {
      exportToPDF();
    }

    // Alur penutupan pop-up: Tutup Pop-up 1, buka Pop-up Sukses 2
    setShowDownloadModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#1e3240]">Detail Informasi Kursus</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            Menampilkan kategori kursus tipe: <span className="text-[#4a7ca3] font-bold">{activeTypeLabel}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          
          {/* 🛠️ DROPDOWN KUSTOM MANAJEMEN KURSUS DENGAN ICON SLIDERS & CHEVRON */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpenFilter(!isOpenFilter)}
              className="bg-white border border-[#749BC2]/60 hover:border-[#749BC2] text-[#749BC2] font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors min-w-[110px] justify-between"
            >
              <div className="flex items-center gap-2">
                {/* Icon Pengaturan / Sliders Kiri */}
                <svg 
                  className="w-3.5 h-3.5 text-[#749BC2]" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span>{currentStatusFilter}</span>
              </div>
              
              {/* Icon Anak Panah / Chevron Kanan */}
              <svg 
                className={`w-3.5 h-3.5 text-[#749BC2] transition-transform duration-200 ${isOpenFilter ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Popover List Menu Dropdown */}
            {isOpenFilter && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-lg z-30 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onStatusFilterChange(option);
                      setIsOpenFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
                      currentStatusFilter === option 
                        ? "bg-[#749BC2]/10 text-[#749BC2]" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ⚙️ TOMBOL REKAP DENGAN ICON UNDUH DOKUMEN BARU */}
          <button 
            type="button"
            onClick={() => setShowDownloadModal(true)}
            className="bg-[#749BC2] hover:bg-[#5f87ad] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-2"
          >
            {/* SVG Icon Unduh Dokumen (Style Tailwind / Heroicons) */}
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            Unduh Rekap(PDF/CSV)
          </button>
        </div>
      </div>

      {/* TABEL DATA KURSUS */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider">
              <th className="py-4 px-2">USER</th>
              <th className="py-4">NAMA KURSUS</th>
              <th className="py-4">JENIS KURSUS</th>
              <th className="py-4">TIPE KURSUS</th>
              <th className="py-4">DIBUAT</th>
              <th className="py-4">UPDATE</th>
              <th className="py-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {courses.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-xs font-medium text-slate-400">
                  Tidak ada kursus dengan status "{currentStatusFilter}" ditemukan.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="text-xs text-slate-600 hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-2 flex items-center gap-3">
                    <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-[10px]">
                      {course.user.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-700">{course.user}</span>
                  </td>
                  <td className="py-4 font-medium text-slate-600 max-w-[200px] truncate">{course.name}</td>
                  <td className="py-4 font-semibold text-slate-700">{course.category}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                      course.type === 'Premium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {course.type}
                    </span>
                  </td>
                  <td className="py-4 text-[11px] text-slate-500 font-medium">{course.created}</td>
                  <td className="py-4 text-[11px] text-slate-500 font-medium">{course.updated}</td>
                  <td className="py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      course.status === "Aktif" ? "bg-green-50 text-green-600 border border-green-200" : "bg-orange-50 text-orange-600 border border-orange-200"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* POP-UP 1: FORM FILTER BULAN & FORMAT DOWNLOAD */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl flex flex-col items-center">
            <h3 className="text-[#102d42] font-bold text-lg text-center mb-6">Unduh Rekap Kursus</h3>
            
            <div className="w-full relative mb-8">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-white border border-[#1e3c54] text-[#1e3c54] font-medium px-4 py-3 rounded-xl text-sm focus:outline-none appearance-none cursor-pointer pr-10"
              >
                <option value="Januari">Januari</option>
                <option value="Februari">Februari</option>
                <option value="Maret">Maret</option>
                <option value="April">April</option>
                <option value="Mei">Mei</option>
                <option value="Juni">Juni</option>
                <option value="Juli">Juli</option>
                <option value="Agustus">Agustus</option>
                <option value="September">September</option>
                <option value="Oktober">Oktober</option>
                <option value="November">November</option>
                <option value="Desember">Desember</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#1e3c54]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex gap-4 w-full mb-6">
              <button
                type="button"
                onClick={() => handleDownloadAction("PDF")}
                className="flex-1 bg-[#749BC2] hover:bg-[#5f87ad] text-white font-bold py-3 rounded-xl text-sm tracking-wide shadow-xs transition-all"
              >
                PDF
              </button>
              <button
                type="button"
                onClick={() => handleDownloadAction("CSV")}
                className="flex-1 bg-[#749BC2] hover:bg-[#5f87ad] text-white font-bold py-3 rounded-xl text-sm tracking-wide shadow-xs transition-all"
              >
                CSV
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowDownloadModal(false)}
              className="w-full bg-[#ff6347] hover:bg-[#e05338] text-white font-bold py-3 rounded-xl text-sm transition-all"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      {/* POP-UP 2: NOTIFIKASI SUKSES DOWNLOAD KURSUS */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl flex flex-col items-center text-center">
              
              <div className="w-16 h-16 border-4 border-[#00cd3c] rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-9 h-9 text-[#00cd3c]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-[#102d42] font-bold text-lg leading-snug px-4 mb-8">
                File laporan sudah berhasil<br />di download
              </h3>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#ff6347] hover:bg-[#e05338] text-white font-bold py-3 rounded-xl text-sm transition-all max-w-[180px]"
              >
                Kembali
              </button>
            </div>
          </div>
        )}
    </div>
  );
}