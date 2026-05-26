import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, CalendarCheck } from "lucide-react";
import { programSchema } from "../constants/programSchema";
import { JENIS_LATIHAN_OPTIONS, INTENSITY_OPTIONS } from "../constants/calendarData";

// Helper: today as "YYYY-MM-DD" for input default
function todayISO() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

const INTENSITY_ACTIVE   = "bg-[var(--calendar-bg)] text-white";
const INTENSITY_INACTIVE = "bg-[var(--calendar-bg)] text-[var(--calendar-bg)]0 hover:bg-gray-100";

export default function AddProgramPanel({ onAddEvent }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      date:         todayISO(),
      time:         "09:00",
      jenisLatihan: "",
      intensity:    "MED",
      targetFokus:  "",
    },
  });

  const selectedIntensity = watch("intensity");

  function onSubmit(data) {
    onAddEvent(data);
    reset({
      date:         todayISO(),
      time:         "09:00",
      jenisLatihan: "",
      intensity:    "MED",
      targetFokus:  "",
    });
  }

  return (
    <div className="bg-[var(--calendar-bg)] rounded-xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex-shrink-0">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
          <Plus size={16} />
          TAMBAH PROGRAM
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 bg-white p-6 flex flex-col gap-3 overflow-y-auto"
      >
        {/* Tanggal & Waktu */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-[var(--calendar-bg)]0 uppercase tracking-wider mb-1">
              Tanggal
            </label>
            <input
              type="date"
              {...register("date")}
              className={`w-full border rounded px-2.5 py-2 text-xs font-semibold text-white bg-[var(--calendar-bg)] focus:outline-none focus:ring-1 focus:ring-[var(--calendar-bg)] ${
                errors.date ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.date && (
              <p className="text-[10px] text-red-500 mt-0.5">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[var(--calendar-bg)]0 uppercase tracking-wider mb-1">
              Waktu
            </label>
            <input
              type="time"
              {...register("time")}
              className={`w-full border rounded px-2.5 py-2 text-xs font-semibold text-white bg-[var(--calendar-bg)] focus:outline-none focus:ring-1 focus:ring-[var(--calendar-bg)] ${
                errors.time ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.time && (
              <p className="text-[10px] text-red-500 mt-0.5">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Jenis Latihan */}
        <div>
          <label className="block text-[10px] font-bold text-[var(--calendar-bg)] uppercase tracking-wider mb-1">
            Jenis Latihan
          </label>
          <select
            {...register("jenisLatihan")}
            className={`w-full border rounded px-2.5 py-2 text-xs font-semibold text-white bg-[var(--calendar-bg)] focus:outline-none focus:ring-1 focus:ring-[var(--calendar-bg)] ${
              errors.jenisLatihan ? "border-red-400" : "border-gray-200"
            }`}
          >
            <option value="">-- Pilih jenis --</option>
            {JENIS_LATIHAN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.jenisLatihan && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors.jenisLatihan.message}</p>
          )}
        </div>

        {/* Program Intensity — controlled via setValue karena bukan native input */}
        <div>
          <label className="block text-[10px] font-bold text-[var(--calendar-bg)] uppercase tracking-wider mb-1">
            Program Intensity
          </label>
          {/* hidden input buat register ke RHF */}
          <input type="hidden" {...register("intensity")} />
          <div className="flex rounded overflow-hidden border border-gray-200">
            {INTENSITY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setValue("intensity", opt, { shouldValidate: true })}
                className={`flex-1 py-2 text-xs font-bold transition-colors ${
                  selectedIntensity === opt ? INTENSITY_ACTIVE : INTENSITY_INACTIVE
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.intensity && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors.intensity.message}</p>
          )}
        </div>

        {/* Target & Fokus */}
        <div className="flex-1 flex flex-col">
          <label className="block text-[10px] font-bold text-[var(--calendar-bg)] uppercase tracking-wider mb-1">
            Target & Fokus
          </label>
          <textarea
            {...register("targetFokus")}
            placeholder="E.g., Maintain sub 1:10 pace for first 100m. Focus on quick transitions."
            className="flex-1 min-h-[80px] w-full border border-gray-200 rounded px-3 py-2 text-xs text-#80AED1 bg-[#789EC32E] resize-none placeholder:text-#80AED1 focus:outline-none focus:ring-1 focus:ring-[var(--calendar-bg)]"
          />
          {errors.targetFokus && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors.targetFokus.message}</p>
          )}
        </div>

        {/* Success feedback */}
        {isSubmitSuccessful && (
          <p className="text-[11px] text-green-600 font-semibold text-center">
            ✓ Jadwal berhasil ditambahkan!
          </p>
        )}

      </form>

       {/* Footer */}
    <div className="px-5 py-4 flex-shrink-0 bg-[var(--calendar-bg)]">
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full flex items-center justify-center gap-2 bg-[#ED8936] hover:bg-[#DD6B20] active:scale-95 transition-all text-white font-bold text-sm py-2.5 rounded"
      >
        <CalendarCheck size={16} />
        TAMBAH JADWAL
      </button>
    </div>
    </div>
  );
}