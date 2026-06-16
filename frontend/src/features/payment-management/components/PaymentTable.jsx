// src/features/payment-management/components/PaymentTable.jsx
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PaymentTable({ transactions, currentFilter, onFilterChange }) {
  // State untuk mengontrol alur kemunculan pop-up unduh rekap
  const [showDownloadModal, setShowDownloadModal] = useState(false); // Pop-up 1: Pilihan Format
  const [showSuccessModal, setShowSuccessModal] = useState(false);   // Pop-up 2: Notifikasi Sukses
  const [selectedMonth, setSelectedMonth] = useState("Januari");

  // ==========================================
  // FUNCTION 1: DOWNLOAD CSV (REAL DOWNLOAD)
  // ==========================================
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    // Header kolom tabel sesuai manajemen pembayaran
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
      // Inisialisasi dokumen dalam posisi Landscape agar muat tabel pembayaran yang lebar
      const doc = new jsPDF({ orientation: "landscape" });

      // Judul Laporan PDF
      doc.setFontSize(16);
      doc.text("REKAP DATA RIWAYAT TRANSAKSI PEMBAYARAN", 14, 15);
      doc.setFontSize(11);
      doc.text(`Periode Bulan: ${selectedMonth} 2026 | Status Filter: ${currentFilter}`, 14, 22);

      // Judul Kolom (Header)
      const tableHeaders = [["ID TX", "NAMA USER", "EMAIL", "PAKET", "METODE", "HARGA", "STATUS", "WAKTU TANGGAL"]];

      // Petakan data dari array transaksi bawaan React
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

      // Buat struktur tabel minimalis rapi ke dalam PDF
      autoTable(doc, {
        head: tableHeaders,
        body: tableRows,
        startY: 28,
        theme: "striped",
        headStyles: { fillColor: [74, 124, 163] }, // Warna biru dongker #4a7ca3 sesuai branding dashboardmu
        styles: { fontSize: 9 }
      });

      // Simpan/Unduh otomatis di browser
      doc.save(`Rekap_Pembayaran_${selectedMonth}_2026.pdf`);
    } catch (error) {
      console.error("Gagal men-generate PDF transaksi:", error);
    }
  };

  // Handler utama pemicu klik format dari dalam pop-up
  const handleDownloadAction = (format) => {
    if (format === "CSV") {
      exportToCSV();
    } else if (format === "PDF") {
      exportToPDF();
    }

    // Alur penutupan: Tutup jendela opsi, lalu buka notifikasi sukses
    setShowDownloadModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-[#1e3240]">Riwayat Transaksi</h3>
        
        <div className="flex items-center gap-3">
          {/* Dropdown Pemilah Status Terkoneksi ke State */}
          <select
            value={currentFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs focus:outline-none cursor-pointer shadow-xs"
          >
            <option value="Semua">Semua</option>
            <option value="Sukses">Sukses</option>
            <option value="Pending">Pending</option>
            <option value="Gagal">Gagal</option>
          </select>

          {/* Tombol pemicu pop-up pilihan format */}
          <button 
            type="button"
            onClick={() => setShowDownloadModal(true)}
            className="bg-[#4a7ca3]/10 hover:bg-[#4a7ca3]/20 text-[#4a7ca3] px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Unduh Rekap (PDF/CSV)
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


      {/* =========================================================================
          POP-UP 1: PILIHAN BULAN & FORMAT REKAP PEMBAYARAN
         ========================================================================= */}
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
                className="flex-1 bg-[#4682b4] hover:bg-[#36648b] text-white font-bold py-3 rounded-xl text-sm tracking-wide shadow-xs transition-all"
              >
                PDF
              </button>
              <button
                type="button"
                onClick={() => handleDownloadAction("CSV")}
                className="flex-1 bg-[#4682b4] hover:bg-[#36648b] text-white font-bold py-3 rounded-xl text-sm tracking-wide shadow-xs transition-all"
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


      {/* =========================================================================
          POP-UP 2: NOTIFIKASI SUKSES DOWNLOAD PEMBAYARAN
         ========================================================================= */}
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