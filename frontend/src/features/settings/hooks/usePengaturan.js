import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DEFAULT_PROFILE } from "../constants/pengaturanData";

const profileSchema = z.object({
  namaLengkap: z.string().min(2, "Nama minimal 2 karakter"),
  email:       z.string().email("Email tidak valid"),
  noTelepon:   z.string().min(8, "No. telepon tidak valid"),
});

export function usePengaturan() {
  const [isEditing, setIsEditing]   = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [saved, setSaved]           = useState(false);
  const fileInputRef                = useRef(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: DEFAULT_PROFILE,
  });

  function handleEdit() {
    setIsEditing(true);
    setSaved(false);
  }

  function handleSave(data) {
    // Simulasi save — di sini nanti bisa hit API
    console.log("Saved:", data);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleFotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFotoPreview(url);
  }

  return {
    form,
    isEditing,
    fotoPreview,
    saved,
    fileInputRef,
    handleEdit,
    handleSave,
    handleFotoChange,
  };
}