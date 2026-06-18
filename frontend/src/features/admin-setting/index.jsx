// src/features/admin-setting/index.jsx
import { useEffect, useState } from "react";
import AdminSettingsForm from "./components/AdminSettingsForm";
import { getAdminProfile, updateAdminProfile } from "@/services/adminSettingsService";

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

export default function AdminSettingFeature() {
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAdminProfile();
      setAdminData(response.data);
    } catch (err) {
      setError(getErrorMessage(err, "Gagal memuat data pengaturan admin."));
      setAdminData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleSaveSettings = async (updatedFields) => {
    try {
      setIsSaving(true);
      const response = await updateAdminProfile(updatedFields);
      setAdminData(response.data);
      alert("Pengaturan akun berhasil disimpan ke backend.");
    } catch (err) {
      alert(getErrorMessage(err, "Gagal memperbarui pengaturan admin."));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc] text-[#4a7ca3] font-bold">
        Memuat Pengaturan...
      </div>
    );
  }

  if (error && !adminData) {
    return (
      <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm font-semibold">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <AdminSettingsForm
          adminData={adminData}
          onSave={handleSaveSettings}
          isLoading={isSaving}
        />

        <p className="text-center text-slate-400 text-xs mt-12 mb-4 font-medium">
          Mager © 2023. All Rights Reserved
        </p>
      </div>
    </main>
  );
}
