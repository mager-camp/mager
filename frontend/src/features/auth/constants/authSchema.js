import { z } from "zod";

export const loginSchema = z.object({
  email:    z.string().email("Alamat email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
});

export const registerSchema = z.object({
  namaLengkap:      z.string().min(2, "Nama minimal 2 karakter"),
  email:            z.string().email("Alamat email tidak valid"),
  noTelepon:        z.string().min(8, "No. telepon tidak valid"),
  password:         z.string().min(6, "Kata sandi minimal 6 karakter"),
  konfirmasiPassword: z.string(),
  setuju:           z.boolean().refine((v) => v === true, "Anda harus menyetujui syarat & ketentuan"),
}).refine((d) => d.password === d.konfirmasiPassword, {
  message: "Kata sandi tidak cocok",
  path: ["konfirmasiPassword"],
});