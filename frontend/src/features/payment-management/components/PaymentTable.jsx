// src/features/payment-management/components/PaymentTable.jsx
import React, { useState, useRef, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PaymentTable({ transactions, currentFilter, onFilterChange }) {
  // State untuk mengontrol alur kemunculan pop-up unduh rekap
  const [showDownloadModal, setShowDownloadModal] = useState(false); // Pop-up 1: Pilihan Format
  const [showSuccessModal, setShowSuccessModal] = useState(false);   // Pop-up 2: Notifikasi Sukses
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

  // Opsi penapis status transaksi
  const filterOptions = ["Semua", "Sukses", "Pending", "Gagal"];

  // ==========================================
  // FUNCTION 1: DOWNLOAD CSV (REAL DOWNLOAD)
  // ==========================================
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID Transaksi,Nama User,Email,Paket Pembelian,Metode,Harga,Status Pembelian,Tanggal,Waktu\n";

    transactions.forEach((tx) => {
      const row = [
        `"${tx.id}"`,
        `"${tx.name}"`,
        `"${tx.email}"`,
        `"${tx.package}"`,
        `"${tx.method}"`,
        `"${tx.price}"`,
        `"${tx.status}"`,
        `"${tx.date}"`,
        `"${tx.time}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Pembayaran_${selectedMonth}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // FUNCTION 2: DOWNLOAD PDF (ANTI-CRASH)
  // ==========================================
  const exportToPDF = () => {
    try {
      const doc = new jsPDF({ orientation: "landscape" });

      doc.setFontSize(16);
      doc.text("REKAP DATA RIWAYAT TRANSAKSI PEMBAYARAN", 14, 15);
      doc.setFontSize(11);
      doc.text(`Periode Bulan: ${selectedMonth} 2026 | Status Filter: ${currentFilter}`, 14, 22);

      const tableHeaders = [["ID TX", "NAMA USER", "EMAIL", "PAKET", "METODE", "HARGA", "STATUS", "WAKTU TANGGAL"]];

      const tableRows = transactions.map((tx) => [
        tx.id,
        tx.name,
        tx.email,
        tx.package,
        tx.method,
        tx.price,
        tx.status,
        `${tx.date} (${tx.time})`
      ]);

      autoTable(doc, {
        head: tableHeaders,
        body: tableRows,
        startY: 28,
        theme: "striped",
        headStyles: { fillColor: [74, 124, 163] },
        styles: { fontSize: 9 }
      });

      doc.save(`Rekap_Pembayaran_${selectedMonth}_2026.pdf`);
    } catch (error) {
      console.error("Gagal men-generate PDF transaksi:", error);
    }
  };

  const handleDownloadAction = (format) => {
    if (format === "CSV") {
      exportToCSV();
    } else if (format === "PDF") {
      exportToPDF();
    }
    setShowDownloadModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-[#1e3240]">Riwayat Transaksi</h3>
        
        <div className="flex items-center gap-3">
          
          {/* 🛠️ DROPDOWN KUSTOM KANAN-KIRI BER-ICON SESUAI GAMBAR BARU */}
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
                <span>{currentFilter}</span>
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

            {/* List Pilihan Menu Dropdown saat Aktif */}
            {isOpenFilter && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-lg z-30 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onFilterChange(option);
                      setIsOpenFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
                      currentFilter === option 
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

          {/* ⚙️ TOMBOL REKAP DENGAN ICON UNDUH DOKUMEN */}
          <button 
            type="button"
            onClick={() => setShowDownloadModal(true)}
            className="bg-[#749BC2] hover:bg-[#5f87ad] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-2"
          >
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

      {/* RENDER DATA TABEL UTAMA */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider">
              <th className="py-3">ID TRANSAKSI</th>
              <th className="py-3">NAMA USER</th>
              <th className="py-3">PAKET PEMBELIAN</th>
              <th className="py-3">METODE</th>
              <th className="py-3">HARGA</th>
              <th className="py-3">STATUS PEMBELIAN</th>
              <th className="py-3">TANGGAL PEMBELIAN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-xs font-medium text-slate-400">
                  Tidak ada transaksi dengan status ini.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="text-xs text-slate-600 hover:bg-slate-50/50">
                  <td className="py-4 font-medium text-slate-400">{tx.id}</td>
                  <td className="py-4">
                    <div className="font-bold text-slate-700">{tx.name}</div>
                    <div className="text-[10px] text-slate-400">{tx.email}</div>
                  </td>
                  <td className="py-4 font-medium">{tx.package}</td>
                  <td className="py-4 font-bold text-slate-700">{tx.method}</td>
                  <td className="py-4 font-bold text-slate-700">{tx.price}</td>
                  <td className="py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        tx.status === "Sukses"
                          ? "bg-green-50 text-green-600"
                          : tx.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="font-medium text-slate-700">{tx.date}</div>
                    <div className="text-[10px] text-slate-400">{tx.time}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* POP-UP 1: PILIHAN BULAN & FORMAT REKAP PEMBAYARAN */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl flex flex-col items-center">
            <h3 className="text-[#102d42] font-bold text-lg text-center mb-6">
              Unduh Rekap Pembayaran
            </h3>
            
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

      {/* POP-UP 2: NOTIFIKASI SUKSES DOWNLOAD PEMBAYARAN */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl flex flex-col items-center text-center">
            
            <div className="w-16 h-16 border-4 border-[#00cd3c] rounded-full flex items-center justify-center mb-6">
              <svg className="w-9 h-9 text-[#00cd3c]" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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