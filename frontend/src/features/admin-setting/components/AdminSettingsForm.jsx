// src/features/admin-setting/components/AdminSettingsForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { User, Lock, ArrowRight } from "lucide-react";

export default function AdminSettingsForm({ adminData, onSave, isLoading }) {
  // Ref untuk menembak input file tersembunyi
  const fileInputRef = useRef(null);

  // State lokal untuk pratinjau gambar (Live Preview)
  const [imagePreview, setImagePreview] = useState(
    adminData?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
  );
  
  // State lokal untuk preferensi notifikasi
  const [notif, setNotif] = useState({
    email: adminData?.notif_email ?? true,
    sistem: adminData?.notif_sistem ?? true,
    laporan: adminData?.notif_laporan ?? false,
  });

  // State lokal untuk form profil
  const [profile, setProfile] = useState({
    nama: adminData?.nama || "Budi Santoso",
    email: adminData?.email || "admin@gmail.com",
  });

  useEffect(() => {
    setImagePreview(
      adminData?.avatarUrl ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
    );
    setNotif({
      email: adminData?.notif_email ?? true,
      sistem: adminData?.notif_sistem ?? true,
      laporan: adminData?.notif_laporan ?? false,
    });
    setProfile({
      nama: adminData?.nama || "Budi Santoso",
      email: adminData?.email || "admin@gmail.com",
    });
  }, [adminData]);

  const toggleNotif = (key) => {
    setNotif((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLER KETIKA USER MEMILIH FOTO DARI DEVICE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // MEMANCING INPUT FILE KETIKA TOMBOL DIKLIK
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Satukan semua data, termasuk file gambar yang dipilih jika ada
    onSave({
      ...profile,
      avatarUrl: imagePreview,
      notif_email: notif.email,
      notif_sistem: notif.sistem,
      notif_laporan: notif.laporan,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-h-screen bg-[#f8fafc] p-1">
      {/* INPUT FILE TERSEMBUNYI */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*" // Hanya menerima file gambar
        className="hidden" 
      />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#1e3240]">PENGATURAN AKUN</h1>
        <div className="flex gap-3">
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2.5 bg-[#4a7ca3] text-white rounded-xl font-bold text-sm hover:bg-[#3b6383] shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: PROFIL & KEAMANAN (8 Kolom) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* CARD 1: PROFIL ADMIN */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-1 bg-[#1e3240] rounded-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#1e3240] tracking-tight">PROFIL ADMIN</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Foto Profil Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-40 h-48 bg-slate-200 rounded-2xl overflow-hidden border-4 border-white shadow-sm">
                  <img 
                    src={imagePreview} 
                    alt="Admin Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={triggerFileInput} // Klik di sini akan otomatis buka window file browser device
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e3240] text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
                >
                  PERBARUI FOTO
                </button>
              </div>

              {/* Form Input Section */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="nama"
                    value={profile.nama}
                    onChange={handleChange}
                    className="w-full bg-[#f1f5f9] border-none rounded-xl px-5 py-3.5 text-sm font-bold text-[#1e3240] focus:ring-2 focus:ring-[#4a7ca3]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full bg-[#f1f5f9] border-none rounded-xl px-5 py-3.5 text-sm font-bold text-[#1e3240] focus:ring-2 focus:ring-[#4a7ca3]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: PROTOKOL KEAMANAN */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-1 bg-[#1e3240] rounded-md">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#1e3240] tracking-tight">PROTOKOL KEAMANAN</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Passcode Terkini</label>
                <input 
                  type="password" 
                  defaultValue="********"
                  disabled
                  className="w-full bg-[#f1f5f9] border-none rounded-xl px-5 py-3.5 text-sm font-bold text-slate-400"
                />
              </div>
              <button type="button" onClick={() => alert("Fitur ganti password hubungi super admin")} className="flex items-center gap-2 text-[#4a7ca3] font-bold text-sm hover:underline">
                <ArrowRight className="w-4 h-4" /> PERMINTAAN PERUBAHAN KUNCI
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: NOTIFIKASI (4 Kolom) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1e3240] mb-8 tracking-tight">Notifikasi</h2>
            
            <div className="space-y-8">
              {/* Notif Email */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1e3240]">Email</h4>
                  <p className="text-[11px] text-slate-400">Update rutin di kirimkan</p>
                </div>
                <Switch active={notif.email} onClick={() => toggleNotif('email')} />
              </div>

              {/* Notif Sistem */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1e3240]">Sistem</h4>
                  <p className="text-[11px] text-slate-400">Notifikasi sistem yang masuk</p>
                </div>
                <Switch active={notif.sistem} onClick={() => toggleNotif('sistem')} />
              </div>

              {/* Notif Laporan */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1e3240]">Laporan</h4>
                  <p className="text-[11px] text-slate-400">Laporan per hari/bulan</p>
                </div>
                <Switch active={notif.laporan} onClick={() => toggleNotif('laporan')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function Switch({ active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${active ? 'bg-[#4a7ca3]' : 'bg-slate-300'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
  )
}