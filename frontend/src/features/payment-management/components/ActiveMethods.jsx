// src/features/payment-management/components/ActiveMethods.jsx
import React, { useState, useEffect, useRef } from "react";
import { Pencil, Landmark, CreditCard, ChevronDown } from "lucide-react"; 

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

  // State untuk mengontrol buka/tutup dropdown custom di dalam modal
  const [isJenisOpen, setIsJenisOpen] = useState(false);
  const [isMetodeOpen, setIsMetodeOpen] = useState(false);

  // Ref untuk mendeteksi klik di luar dropdown agar menutup otomatis
  const jenisRef = useRef(null);
  const metodeRef = useRef(null);

  // Efek untuk mengisi data form secara otomatis ketika tombol pensil edit ditekan
  useEffect(() => {
    if (editingMethod) {
      const isBank = editingMethod.title === "Virtual Account" || editingMethod.title === "Bank";
      setJenisPembayaran(isBank ? "Bank" : "E-Wallet");
      
      const rawBank = editingMethod.description.split(" ")[0];
      setMetodePembayaran(rawBank || "BCA");

      const matchNo = editingMethod.description.match(/\(([^)]+)\)/);
      setNomorRekening(matchNo ? matchNo[1] : "");
    } else {
      setJenisPembayaran("Bank");
      setMetodePembayaran("BCA");
      setNomorRekening("");
    }
  }, [editingMethod]);

  // Menutup dropdown custom saat klik di luar area menu dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (jenisRef.current && !jenisRef.current.contains(event.target)) {
        setIsJenisOpen(false);
      }
      if (metodeRef.current && !metodeRef.current.contains(event.target)) {
        setIsMetodeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler ganti jenis pembayaran custom
  const handleSelectJenis = (value) => {
    setJenisPembayaran(value);
    setMetodePembayaran(value === "Bank" ? "BCA" : "Dana");
    setIsJenisOpen(false);
  };

  const handleSimpanForm = (e) => {
    e.preventDefault();
    
    if (editingMethod) {
      onUpdateMethod({
        id: editingMethod.id,
        jenis: jenisPembayaran,
        bank: metodePembayaran,
        nomor: nomorRekening
      });
      setSuccessMessage("Metode pembayaran sudah berhasil diubah");
    } else {
      onAddMethod({
        id: Date.now().toString(),
        jenis: jenisPembayaran,
        bank: metodePembayaran,
        nomor: nomorRekening
      });
      setSuccessMessage("Metode pembayaran sudah berhasil ditambahkan");
    }

    setIsSuccessStep(true);
  };

  const handleTutupSemuaModal = () => {
    setNomorRekening("");
    setEditingMethod(null);
    setIsSuccessStep(false);
    setIsModalOpen(false);
    setIsJenisOpen(false);
    setIsMetodeOpen(false);
  };

  return (
    <div className="mt-8 relative">
      <h3 className="text-lg font-bold text-[#1e3240] mb-1">Metode Pembayaran Aktif</h3>
      <p className="text-xs text-slate-400 font-medium mb-4">Konfigurasi saluran pembayaran untuk user anda</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* LOOPING DAN RENDER KARTU METODE PEMBAYARAN */}
        {methods.map((item) => {
          const isVirtualAccount = 
            item.title.toLowerCase().includes("virtual") || 
            item.title.toLowerCase().includes("bank");
          
          const iconContainerBg = isVirtualAccount ? "bg-[#eef3f9]" : "bg-[#eaf4e8]";
          const iconColor = isVirtualAccount ? "text-[#4a90e2]" : "text-[#2e9d45]";
          const IconUtama = isVirtualAccount ? Landmark : CreditCard;

          return (
            <div 
              key={item.id} 
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative flex items-center gap-4 transition-all animate-fade-in min-h-[116px]"
            >
              <div className={`${iconContainerBg} ${iconColor} w-16 h-16 rounded-xl flex items-center justify-center shrink-0`}>
                <IconUtama className="w-8 h-8" />
              </div>

              <div className="pr-8">
                <h4 className="font-bold text-slate-700 text-sm leading-tight">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                <span className="inline-block mt-2 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  AKTIF
                </span>
              </div>
              
              <button 
                type="button" 
                onClick={() => {
                  setEditingMethod(item);
                  setIsModalOpen(true);
                }}
                className="absolute top-4 right-5 flex flex-col items-center text-slate-400 hover:text-[#4a7ca3] transition-colors focus:outline-none"
              >
                <Pencil className="w-4 h-4" />
                <div className="w-4 h-[1px] bg-current mt-[2px] opacity-60" />
              </button>
            </div>
          );
        })}

        {/* Card Tambah Integrasi Baru */}
        <div 
          onClick={() => {
            setEditingMethod(null);
            setIsModalOpen(true);
          }}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 transition-colors bg-slate-50/50 min-h-[116px]"
        >
          <span className="text-xl text-slate-400 font-bold">+</span>
          <span className="text-xs font-semibold text-slate-500 mt-1">Integrasi Baru</span>
        </div>
      </div>


      {/* =========================================================================
          SISTEM MODAL INTERAKTIF DENGAN DROPDOWN CUSTOM
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all">
          
          {!isSuccessStep ? (
            /* POP-UP FORM EDIT / TAMBAH DATA METODE PEMBAYARAN */
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 w-full max-w-[450px] mx-4 animate-scale-up overflow-visible">
              <h4 className="text-lg font-bold text-[#1a314b] text-center mb-8 tracking-wide">
                {editingMethod ? "Ubah Metode Pembayaran" : "Tambahkan Metode Pembayaran"}
              </h4>

              <form onSubmit={handleSimpanForm} className="overflow-visible">
                <div className="grid grid-cols-2 gap-4 mb-6 overflow-visible">
                  
                  {/* DROPDOWN CUSTOM 1: JENIS PEMBAYARAN */}
                  <div className="flex flex-col relative" ref={jenisRef}>
                    <label className="text-xs font-bold text-[#1a314b] mb-2">Jenis Pembayaran</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsJenisOpen(!isJenisOpen);
                        setIsMetodeOpen(false);
                      }}
                      className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none shadow-xs hover:bg-slate-50 transition-colors"
                    >
                      <span>{jenisPembayaran}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isJenisOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Menu Item Dropdown Floating */}
                    {isJenisOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-50 animate-scale-up">
                        <button
                          type="button"
                          onClick={() => handleSelectJenis("Bank")}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${jenisPembayaran === "Bank" ? "text-[#4a7ca3] bg-slate-50" : "text-slate-600 hover:bg-slate-50/80"}`}
                        >
                          Bank
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectJenis("E-Wallet")}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${jenisPembayaran === "E-Wallet" ? "text-[#4a7ca3] bg-slate-50" : "text-slate-600 hover:bg-slate-50/80"}`}
                        >
                          E-Wallet
                        </button>
                      </div>
                    )}
                  </div>

                  {/* DROPDOWN CUSTOM 2: METODE PEMBAYARAN */}
                  <div className="flex flex-col relative" ref={metodeRef}>
                    <label className="text-xs font-bold text-[#1a314b] mb-2">Metode Pembayaran</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMetodeOpen(!isMetodeOpen);
                        setIsJenisOpen(false);
                      }}
                      className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none shadow-xs hover:bg-slate-50 transition-colors"
                    >
                      <span>{metodePembayaran}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isMetodeOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Menu Item Dropdown Floating */}
                    {isMetodeOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-50 animate-scale-up max-h-[160px] overflow-y-auto">
                        {jenisPembayaran === "Bank" ? (
                          <>
                            {["BCA", "Mandiri", "BNI"].map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => { setMetodePembayaran(bank); setIsMetodeOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${metodePembayaran === bank ? "text-[#4a7ca3] bg-slate-50" : "text-slate-600 hover:bg-slate-50/80"}`}
                              >
                                {bank}
                              </button>
                            ))}
                          </>
                        ) : (
                          <>
                            {["Dana", "OVO", "GoPay"].map((wallet) => (
                              <button
                                key={wallet}
                                type="button"
                                onClick={() => { setMetodePembayaran(wallet); setIsMetodeOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${metodePembayaran === wallet ? "text-[#4a7ca3] bg-slate-50" : "text-slate-600 hover:bg-slate-50/80"}`}
                              >
                                {wallet}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    )}
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
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none shadow-xs"
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
            /* POP-UP NOTIFIKASI INFORMASI SUKSES DISIMPAN/DIUBAH */
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 w-full max-w-[400px] mx-4 flex flex-col items-center text-center animate-scale-up">
              <div className="w-20 h-20 bg-white border-4 border-[#00c853] rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#00c853]" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              <h4 className="text-xl font-bold text-[#1a314b] mb-8 leading-relaxed max-w-[280px]">
                {successMessage}
              </h4>

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