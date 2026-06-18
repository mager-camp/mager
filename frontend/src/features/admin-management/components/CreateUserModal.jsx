// src/features/admin-management/components/CreateUserModal.jsx
import { useState, useRef } from "react";
import { User, Plus, ChevronDown } from "lucide-react";

export default function CreateUserModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userType: "Biasa",
    phone: "",
    password: "",
    profileImage: null, // Tempat menyimpan data file asli untuk backend
  });

  const [imagePreview, setImagePreview] = useState(null); // Tempat menyimpan URL preview lokal
  const fileInputRef = useRef(null); // Referensi pemicu klik input file

  if (!isOpen) return null;

  // Fungsi menangani perubahan file foto
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Mengisi gambar ke lingkaran avatar
        setFormData((prev) => ({ ...prev, profileImage: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      ...formData,
      profilePicture: imagePreview,
    });
    // Reset seluruh state form dan foto setelah disimpan
    setFormData({ fullName: "", email: "", userType: "Biasa", phone: "", password: "", profileImage: null });
    setImagePreview(null);
  };

  const handleCancel = () => {
    // Reset foto juga kalau admin membatalkan (klik kembali)
    setImagePreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={handleCancel}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Judul Utama */}
        <h2 className="text-2xl font-bold text-[#1e3240] mb-8">Tambah User Baru</h2>

        <form onSubmit={handleSubmit}>
          {/* Grid Layout 2 Kolom dari Atas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* ================= SISI KIRI ================= */}
            <div className="space-y-5">
              {/* Bagian Foto Profil */}
              <div className="flex items-center gap-4 h-[68px]">
                {/* HTML Input File Tersembunyi */}
                <input 
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Lingkaran Avatar */}
                <div className="w-16 h-16 bg-[#7ca3c4]/30 rounded-full flex items-center justify-center text-white flex-shrink-0 overflow-hidden border border-slate-200 shadow-inner">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-[#4a7ca3]" />
                  )}
                </div>

                {/* Tombol Pemicu Unggah */}
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-[#4a7ca3] hover:text-[#4a7ca3] transition-all text-xs font-semibold bg-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {imagePreview ? "Ubah Foto" : "Add Foto"}
                </button>
              </div>

              {/* Input Nama Lengkap */}
              <div className="pt-[2px]"> 
                <label className="block text-sm font-semibold text-[#4a7ca3] mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#4a7ca3] focus:outline-none transition-all text-sm bg-white"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              {/* Dropdown Pengguna */}
              <div>
                <label className="block text-sm font-semibold text-[#4a7ca3] mb-1.5">Pengguna</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#4a7ca3] focus:outline-none transition-all bg-white appearance-none cursor-pointer text-sm"
                    value={formData.userType}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  >
                    <option value="Biasa">Biasa</option>
                    <option value="Premium">Premium</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ================= SISI KANAN ================= */}
            <div className="space-y-5">
              {/* Input Nomor Telpon */}
              <div>
                <label className="block text-sm font-semibold text-[#4a7ca3] mb-1.5">Nomor Telpon</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#4a7ca3] focus:outline-none transition-all text-sm bg-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-sm font-semibold text-[#4a7ca3] mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#4a7ca3] focus:outline-none transition-all text-sm bg-white"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Input Password */}
              <div>
                <label className="block text-sm font-semibold text-[#4a7ca3] mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#4a7ca3] focus:outline-none transition-all text-sm bg-white"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-6 mt-10 max-w-xl mx-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-[#ff6b6b] hover:bg-[#fa5252] text-white font-bold py-3 rounded-2xl shadow-md transition-all active:scale-95 text-sm tracking-wide"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#78c281] hover:bg-[#6ab073] text-white font-bold py-3 rounded-2xl shadow-md transition-all active:scale-95 text-sm tracking-wide"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}