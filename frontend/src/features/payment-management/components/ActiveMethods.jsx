// src/features/payment-management/components/ActiveMethods.jsx
import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react"; 

export default function ActiveMethods({ methods, onAddMethod, onUpdateMethod }) {
  // Mengontrol kemunculan modal dan penentuan step sukses
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessStep, setIsSuccessStep] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // State untuk mendeteksi apakah sedang EDIT atau TAMBAH BARU
  const [editingMethod, setEditingMethod] = useState(null);

  // State form fields
  const [jenisPembayaran, setJenisPembayaran] = useState("Bank");
  const [metodePembayaran, setMetodePembayaran] = useState("BCA");
  const [nomorRekening, setNomorRekening] = useState("");

  // Efek untuk mengisi data form secara otomatis ketika tombol pensil edit ditekan
  useEffect(() => {
    if (editingMethod) {
      const isBank = editingMethod.title === "Virtual Account" || editingMethod.title === "Bank";
      setJenisPembayaran(isBank ? "Bank" : "E-Wallet");
      
      // Mengambil teks metode dari deskripsi (ex: "BCA (123)" diambil "BCA")
      const rawBank = editingMethod.description.split(" ")[0];
      setMetodePembayaran(rawBank || "BCA");

      // Mengambil nomor di dalam kurung jika ada
      const matchNo = editingMethod.description.match(/\(([^)]+)\)/);
      setNomorRekening(matchNo ? matchNo[1] : "");
    } else {
      // Default jika tambah baru
      setJenisPembayaran("Bank");
      setMetodePembayaran("BCA");
      setNomorRekening("");
    }
  }, [editingMethod]);

  // Handler pergantian jenis pembayaran agar default dropdown-nya sinkron
  const handleJenisChange = (e) => {
    const val = e.target.value;
    setJenisPembayaran(val);
    setMetodePembayaran(val === "Bank" ? "BCA" : "Dana");
  };

  const handleSimpanForm = (e) => {
    e.preventDefault();
    
    if (editingMethod) {
      // 1. Aksi JIKA EDIT DATA KARTU YANG SUDAH ADA
      onUpdateMethod({
        id: editingMethod.id,
        jenis: jenisPembayaran,
        bank: metodePembayaran,
        nomor: nomorRekening
      });
      setSuccessMessage("Metode pembayaran sudah berhasil diubah");
    } else {
      // 2. Aksi JIKA TAMBAH INTEGRASI BARU
      onAddMethod({
        jenis: jenisPembayaran,
        bank: metodePembayaran,
        nomor: nomorRekening
      });
      setSuccessMessage("Metode pembayaran sudah berhasil ditambahkan");
    }

    // Alihkan isi pop-up langsung ke layar sukses (Gambar Kedua)
    setIsSuccessStep(true);
  };

  const handleTutupSemuaModal = () => {
    setNomorRekening("");
    setEditingMethod(null);
    setIsSuccessStep(false);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-8 relative">
      <h3 className="text-lg font-bold text-[#1e3240] mb-1">Metode Pembayaran Aktif</h3>
      <p className="text-xs text-slate-400 font-medium mb-4">Konfigurasi saluran pembayaran untuk user anda</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* LOOPING DAN RENDER KARTU METODE PEMBAYARAN */}
        {methods.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start transition-all animate-fade-in">
            <div>
              <h4 className="font-bold text-slate-700 text-sm">{item.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
              <span className="inline-block mt-3 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">AKTIF</span>
            </div>
            {/* KLIK TOMBOL PENSIL UNTUK EDIT */}
            <button 
              type="button" 
              onClick={() => {
                setEditingMethod(item);
                setIsModalOpen(true);
              }}
              className="text-slate-400 hover:text-[#4a7ca3] p-1 hover:bg-slate-50 rounded transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Card Tambah Integrasi Baru */}
        <div 
          onClick={() => {
            setEditingMethod(null);
            setIsModalOpen(true);
          }}
          className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 transition-colors bg-slate-50/50 min-h-[116px]"
        >
          <span className="text-xl text-slate-400 font-bold">+</span>
          <span className="text-xs font-semibold text-slate-500 mt-1">Integrasi Baru</span>
        </div>
      </div>


      {/* =========================================================================
          SISTEM MODAL INTERAKTIF (FORM GAMBAR 1 ATAU NOTIFIKASI SUKSES GAMBAR 2)
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all">
          
          {!isSuccessStep ? (
            /* POP-UP GAMBAR 1: FORM EDIT / TAMBAH DATA METODE PEMBAYARAN */
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 w-full max-w-[450px] mx-4 animate-scale-up">
              <h4 className="text-lg font-bold text-[#1a314b] text-center mb-8 tracking-wide">
                {editingMethod ? "Ubah Metode Pembayaran" : "Tambahkan Metode Pembayaran"}
              </h4>

              <form onSubmit={handleSimpanForm}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#1a314b] mb-2">Jenis Pembayaran</label>
                    <div className="relative">
                      <select
                        value={jenisPembayaran}
                        onChange={handleJenisChange}
                        className="w-full bg-white border border-[#1a314b]/30 rounded-xl px-4 py-3 text-xs font-semibold text-[#1a314b] appearance-none focus:outline-none"
                      >
                        <option value="Bank">Bank</option>
                        <option value="E-Wallet">E-Wallet</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#1a314b]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#1a314b] mb-2">Metode Pembayaran</label>
                    <div className="relative">
                      <select
                        value={metodePembayaran}
                        onChange={(e) => setMetodePembayaran(e.target.value)}
                        className="w-full bg-white border border-[#1a314b]/30 rounded-xl px-4 py-3 text-xs font-semibold text-[#1a314b] appearance-none focus:outline-none"
                      >
                        {jenisPembayaran === "Bank" ? (
                          <>
                            <option value="BCA">BCA</option>
                            <option value="Mandiri">Mandiri</option>
                            <option value="BNI">BNI</option>
                          </>
                        ) : (
                          <>
                            <option value="Dana">Dana</option>
                            <option value="OVO">OVO</option>
                            <option value="GoPay">GoPay</option>
                          </>
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#1a314b]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mb-8">
                  <label className="text-xs font-bold text-[#1a314b] mb-2">Masukkan Nomor</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 1234567890"
                    value={nomorRekening}
                    onChange={(e) => setNomorRekening(e.target.value)}
                    className="w-full bg-white border border-[#1a314b]/30 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={handleTutupSemuaModal} className="bg-[#ff6b52] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-colors hover:bg-[#e0563e]">
                    Kembali
                  </button>
                  <button type="submit" className="bg-[#5cb85c] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-colors hover:bg-[#4cae4c]">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* POP-UP GAMBAR 2: NOTIFIKASI INFORMASI SUKSES DISIMPAN/DIUBAH */
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 w-full max-w-[400px] mx-4 flex flex-col items-center text-center animate-scale-up">
              
              {/* Centang Hijau */}
              <div className="w-20 h-20 bg-white border-4 border-[#00c853] rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#00c853]" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              {/* Teks Deskripsi Sukses Dinamis */}
              <h4 className="text-xl font-bold text-[#1a314b] mb-8 leading-relaxed max-w-[280px]">
                {successMessage}
              </h4>

              {/* Tombol Kembali Menutup Modal */}
              <button
                type="button"
                onClick={handleTutupSemuaModal}
                className="w-32 bg-[#ff6b52] hover:bg-[#e0563e] text-white py-2.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                Kembali
              </button>

            </div>
          )}

        </div>
      )}
    </div>
  );
}