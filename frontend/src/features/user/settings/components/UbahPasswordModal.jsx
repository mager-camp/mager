import { X, Lock } from "lucide-react";
import { useState } from "react";

export default function UbahPasswordModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError(
        "Konfirmasi password tidak cocok"
      );
      return;
    }

    if (
      formData.newPassword.length < 8
    ) {
      setError(
        "Password minimal 8 karakter"
      );
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white rounded-sm shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2">
            <Lock
              size={18}
              className="text-[#ED8936]"
            />
            <h2 className="font-bold text-gray-900">
              Ubah Password
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Password Saat Ini
            </label>

            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password Baru
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Password Baru
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-[#ED8936] text-white hover:bg-[#DD6B20]"
            >
              {loading
                ? "Menyimpan..."
                : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}