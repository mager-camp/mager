// src/features/admin-management/components/EditUserProfile.jsx
import { useEffect, useState, useRef } from "react";
import { Eye, EyeOff, Camera, ChevronDown } from "lucide-react";

export default function EditUserProfile({
  user,
  onBack,
  onSave,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    accountType: "Biasa",
    password: "",
    profilePicture: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // 🎯 STATE & REF DROPDOWN CUSTOM (STATUS AKUN)
  // ==========================================
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const accountOptions = ["Premium", "Biasa"];

  useEffect(() => {
    setPreviewImage(user?.profilePicture || user?.avatarUrl || null);

    setFormData({
      fullName: user?.fullName || user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      accountType: user?.isPremium ? "Premium" : "Biasa",
      password: "",
      profilePicture: user?.profilePicture || user?.avatarUrl || null,
    });
  }, [user]);

  // Efek untuk menutup dropdown otomatis saat klik di luar area dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({
        ...prev,
        profilePicture: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSelectAccountType = (value) => {
    setFormData((prev) => ({
      ...prev,
      accountType: value,
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      accountType: formData.accountType,
      isPremium: formData.accountType === "Premium",
      profilePicture: formData.profilePicture,
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    onSave && onSave(payload);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800">
      <h1 className="text-3xl font-bold text-[#1e3240] mb-8">
        Edit Profile User
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 overflow-visible">
        <form onSubmit={handleSubmit} className="space-y-8 overflow-visible">
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28">
              <div className="w-full h-full bg-[#10b981]/10 rounded-full flex items-center justify-center border-2 border-slate-200 overflow-hidden shadow-inner bg-slate-100">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-400 flex items-center justify-center text-white text-3xl font-bold">
                    {(formData.fullName || "U").slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              <label className="absolute bottom-1 right-1 bg-[#4a7ca3] hover:bg-[#3b6688] text-white p-2 rounded-full cursor-pointer shadow-md transition-all border border-white">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 overflow-visible">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4a7ca3] uppercase tracking-wide">
                Nama Lengkap
              </label>

              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    fullName: event.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-semibold text-[#1e3240] focus:outline-none focus:border-[#4a7ca3] focus:ring-1 focus:ring-[#4a7ca3] transition-all bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4a7ca3] uppercase tracking-wide">
                Email
              </label>

              <input
                type="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-semibold text-[#1e3240] focus:outline-none focus:border-[#4a7ca3] focus:ring-1 focus:ring-[#4a7ca3] transition-all bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4a7ca3] uppercase tracking-wide">
                Nomor Telpon
              </label>

              <input
                type="text"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    phone: event.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-semibold text-[#1e3240] focus:outline-none focus:border-[#4a7ca3] focus:ring-1 focus:ring-[#4a7ca3] transition-all bg-white"
              />
            </div>

            {/* =========================================================================
                ✨ DROPDOWN CUSTOM: STATUS AKUN (PREMIUM / BIASA)
               ========================================================================= */}
            <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
              <label className="text-xs font-bold text-[#4a7ca3] uppercase tracking-wide">
                Status Akun
              </label>

              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-300 font-semibold text-[#1e3240] bg-white text-left focus:outline-none focus:border-[#4a7ca3] focus:ring-1 focus:ring-[#4a7ca3] transition-all"
              >
                <span>{formData.accountType}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Box Floating Menu Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 animate-scale-up">
                  {accountOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectAccountType(option)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                        formData.accountType === option
                          ? "text-[#4a7ca3] bg-slate-50"
                          : "text-slate-600 hover:bg-slate-50/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-bold text-[#4a7ca3] uppercase tracking-wide">
                Password Baru
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  minLength={8}
                  placeholder="Kosongkan jika tidak diubah"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      password: event.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 font-semibold text-[#1e3240] pr-12 focus:outline-none focus:border-[#4a7ca3] focus:ring-1 focus:ring-[#4a7ca3] transition-all bg-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sisa 2 Tombol Utama Aktif */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-44 py-3 bg-[#ff6b57] hover:bg-[#e05643] text-white font-bold rounded-xl shadow-sm transition-all text-center text-sm"
            >
              Kembali
            </button>

            <button
              type="submit"
              className="w-full sm:w-44 py-3 bg-[#5cb85c] hover:bg-[#4cae4c] text-white font-bold rounded-xl shadow-sm transition-all text-center text-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}