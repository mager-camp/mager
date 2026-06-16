// src/features/admin-management/components/EditUserProfile.jsx
import { useEffect, useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";

export default function EditUserProfile({
  user,
  onBack,
  onSave,
  onDeactivateClick,
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

  const isInactive = user?.status === "deleted";

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

      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4a7ca3] uppercase tracking-wide">
                Status Akun
              </label>

              <select
                value={formData.accountType}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    accountType: event.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-semibold text-[#1e3240] focus:outline-none focus:border-[#4a7ca3] focus:ring-1 focus:ring-[#4a7ca3] transition-all bg-white"
              >
                <option value="Premium">Premium</option>
                <option value="Biasa">Biasa</option>
              </select>
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

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-44 py-3 bg-[#ff6b57] hover:bg-[#e05643] text-white font-bold rounded-xl shadow-sm transition-all text-center text-sm"
            >
              Kembali
            </button>

            <button
              type="button"
              onClick={onDeactivateClick}
              disabled={isInactive}
              className="w-full sm:w-44 py-3 bg-[#fff0f0] text-[#e05353] border border-[#fca3a3] font-bold rounded-xl shadow-sm hover:bg-[#ffe5e5] transition-all text-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Nonaktifkan Akun
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