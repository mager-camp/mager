import { z } from "zod";

export const programSchema = z.object({
  dateRange: z.object({
    from: z.date({
      required_error: "Tanggal mulai wajib diisi",
    }),
    to: z.date({
      required_error: "Tanggal selesai wajib diisi",
    }),
  }),

  startTime: z.string().min(1, "Jam mulai wajib diisi"),
  endTime: z.string().min(1, "Jam selesai wajib diisi"),

  jenisLatihan: z.string().min(1, "Jenis latihan wajib dipilih"),

  intensity: z.enum(["LIGHT", "MEDIUM", "HEAVY"], {
    errorMap: () => ({ message: "Pilih intensitas" }),
  }),

  targetFokus: z.string().max(300).optional(),
});