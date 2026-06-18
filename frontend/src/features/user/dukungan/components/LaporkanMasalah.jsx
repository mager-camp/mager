import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Headset } from "lucide-react";
import { JENIS_MASALAH_OPTIONS } from "../constants/dukunganData";
import api from "@/lib/api";
import { useFeedback } from "@/hooks/useFeedback";


const schema = z.object({
  jenisMasalah: z.string().min(1, "Pilih jenis masalah"),
  subjek:       z.string().min(3, "Subjek minimal 3 karakter"),
  deskripsi:    z.string().min(10, "Deskripsi minimal 10 karakter"),
});

export default function LaporkanMasalah() {
  const [submitted,   setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { showSuccess, showError } = useFeedback();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { jenisMasalah: "", subjek: "", deskripsi: "" },
  });

  async function onSubmit(data) {
    setSubmitError(null);
    try {
      await api.post("/support", data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
      showSuccess("Laporan berhasil dikirim! Tim kami akan segera meninjau.");
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ?? "Gagal mengirim laporan. Coba lagi."
      );
    }
  }

  return (
    <div className="bg-[#D9E7F5] rounded-sm border border-gray-100 shadow-sm p-6 flex flex-col lg:h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 flex-shrink-0">
        <Headset size={20} className="text-[var(--text-dashboard)]" />
        <h2 className="text-xl font-black text-[var(--text-dashboard)]">Laporkan Masalah</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
        {/* Jenis Masalah */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Jenis Masalah
          </label>
          <select
            {...register("jenisMasalah")}
            className={`w-full border rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] ${
              errors.jenisMasalah ? "border-red-400" : "border-border"
            }`}
          >
            <option value="">-- Pilih --</option>
            {JENIS_MASALAH_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.jenisMasalah && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors.jenisMasalah.message}</p>
          )}
        </div>

        {/* Subjek */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Subjek
          </label>
          <input
            type="text"
            placeholder="Ringkasan singkat mengenai masalah ini"
            {...register("subjek")}
            className={`w-full border rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] ${
              errors.subjek ? "border-red-400" : "border-border"
            }`}
          />
          {errors.subjek && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors.subjek.message}</p>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex-1 flex flex-col">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Deskripsi Masalah
          </label>
          <textarea
            placeholder="Berikan penjelasan yang mendetail..."
            {...register("deskripsi")}
            className={`flex-1 min-h-[100px] w-full border rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 placeholder:text-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] ${
              errors.deskripsi ? "border-red-400" : "border-border"
            }`}
          />
          {errors.deskripsi && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors.deskripsi.message}</p>
          )}
        </div>

        {/* Error */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-md px-3 py-2.5">
            <p className="text-xs text-red-600 font-semibold">{submitError}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#ED8936] hover:bg-[#DD6B20] disabled:opacity-60 active:scale-95 transition-all text-white text-xs font-black rounded-md tracking-wider"
        >
          <Send size={14} />
          {isSubmitting ? "Mengirim..." : "KIRIM LAPORAN"}
        </button>
      </form>
    </div>
  );
}