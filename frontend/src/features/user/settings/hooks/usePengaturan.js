import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePassword } from "@/services/profileService";
import { getProfile, updateProfile } from "@/services/profileService";
import { useFeedback } from "@/hooks/useFeedback";

const profileSchema = z.object({
  namaLengkap: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  noTelepon: z
    .string()
    .regex(/^62\d{8,13}$/, "Nomor telepon harus diawali 62 dan >=8 karakter"),
});

export function usePengaturan() {
  const [isEditing, setIsEditing] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      namaLengkap: "",
      email: "",
      noTelepon: "",
    },
  });
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const { showSuccess, showError } = useFeedback();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        const profile = response.data;
        setProfileData(profile);
        form.reset({
          namaLengkap: profile.fullName || "",
          email: profile.email || "",
          noTelepon: profile.phone || "",
        });

        setFotoPreview(profile.profilePicture || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  function handleEdit() {
    setIsEditing(true);
    setSaved(false);
  }

  async function handleSave(data) {
    try {
      await updateProfile({
        fullName: data.namaLengkap,
        email: data.email,
        phone: data.noTelepon,
      });

      setIsEditing(false);

      showSuccess("Profil berhasil diperbarui");
    } catch (error) {
      showError(error?.response?.data?.message || "Gagal memperbarui profil");
    }
  }

  function handleCancel() {
  if (!profileData) return;

  form.reset({
    namaLengkap: profileData.fullName || "",
    email: profileData.email || "",
    noTelepon: profileData.phone || "",
  });

  setFotoPreview(profileData.profilePicture || null);

  setIsEditing(false);
}

  function handleFotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFotoPreview(url);
  }

  const handleChangePassword = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      setOpenPasswordModal(false);

      showSuccess("Password berhasil diperbarui");
    } catch (error) {
      showError(error?.response?.data?.message || "Gagal mengubah password");
    }
  };

  return {
    form,
    loading,
    isEditing,
    fotoPreview,
    fileInputRef,
    handleEdit,
    handleCancel,
    handleSave,
    handleFotoChange,

    openPasswordModal,
    setOpenPasswordModal,
    handleChangePassword,
  };
}
