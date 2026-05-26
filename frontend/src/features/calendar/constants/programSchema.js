import { z } from "zod";

export const programSchema = z.object({
  date: z.string().min(1, "Tanggal wajib diisi"),
  time: z.string().min(1, "Waktu wajib diisi"),
  jenisLatihan: z.string().min(1, "Jenis latihan wajib dipilih"),
  intensity: z.enum(["LOW", "MED", "HIGH"], {
    errorMap: () => ({ message: "Pilih intensitas" }),
  }),
  targetFokus: z.string().max(300, "Maks 300 karakter").optional(),
});