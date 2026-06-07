import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, CalendarCheck } from "lucide-react";
import { programSchema } from "../constants/programSchema";
import {
  JENIS_LATIHAN_OPTIONS,
  INTENSITY_OPTIONS,
} from "../constants/calendarData";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Controller } from "react-hook-form";
import { useState } from "react";

// Helper: today as "YYYY-MM-DD" for input default

const INTENSITY_ACTIVE = "bg-[var(--text-dashboard)] text-white";
const INTENSITY_INACTIVE =
  "bg-[var(--background)] text-[var(--text-primary)] hover:bg-gray-100";

export default function AddProgramPanel({ onAddEvent }) {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: new Date(),
      },

      startTime: "09:00",
      endTime: "11:00",

      jenisLatihan: "",
      intensity: "MED",
      targetFokus: "",
    },
  });
  const dateRange = watch("dateRange");
  const selectedIntensity = watch("intensity");
  function onSubmit(data) {
    onAddEvent(data);
    reset({
      dateRange: {
        from: new Date(),
        to: new Date(),
      },

      startTime: "09:00",
      endTime: "11:00",

      jenisLatihan: "",
      intensity: "MED",
      targetFokus: "",
    });
  }

  return (
    <div className="bg-[var(--text-dashboard)] rounded-xl flex flex-col h-full overflow-hidden">
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
        className="flex-1 bg-[var(--calendar-bg)] p-6 flex flex-col gap-3 overflow-y-auto"
      >
        {/* Tanggal & Waktu */}
        <div className="flex flex-col gap-3">
          {/* DATE RANGE */}
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider mb-2">
              Rentang Tanggal
            </label>

            <button
              type="button"
              onClick={() => setIsDateModalOpen(true)}
              className="
    w-full
    flex items-center justify-between
    border border-gray-200
    rounded
    px-3 py-2
    bg-white
    text-xs font-semibold
  "
            >
              <span>
                {dateRange?.from
                  ? dateRange?.to &&
                    dateRange.from.getTime() !== dateRange.to.getTime()
                    ? `${dateRange.from.toLocaleDateString("id-ID")} - ${dateRange.to.toLocaleDateString("id-ID")}`
                    : dateRange.from.toLocaleDateString("id-ID")
                  : "Pilih rentang tanggal"}
              </span>

              <CalendarCheck
                size={14}
                className="text-[var(--text-dashboard)]"
              />
            </button>
          </div>

          {/* TIME RANGE */}
          <div>
            <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider mb-1">
              Rentang Waktu
            </label>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="time"
                {...register("startTime")}
                className="w-full border border-gray-200 rounded px-2.5 py-2 text-xs font-semibold bg-[var(--background)]"
              />

              <input
                type="time"
                {...register("endTime")}
                className="w-full border border-gray-200 rounded px-2.5 py-2 text-xs font-semibold bg-[var(--background)]"
              />
            </div>
          </div>
        </div>

        {/* Jenis Latihan */}
        <div>
          <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider mb-1">
            Jenis Latihan
          </label>
          <select
            {...register("jenisLatihan")}
            className={`w-full border rounded px-2.5 py-2 text-xs font-semibold text-[var(--text-primary)] bg-[var(--background)] focus:outline-none focus:ring-1 focus:ring-[var(--calendar-bg)] ${
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
            <p className="text-[10px] text-red-500 mt-0.5">
              {errors.jenisLatihan.message}
            </p>
          )}
        </div>

        {/* Program Intensity — controlled via setValue karena bukan native input */}
        <div>
          <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider mb-1">
            Program Intensity
          </label>
          {/* hidden input buat register ke RHF */}
          <input type="hidden" {...register("intensity")} />
          <div className="flex rounded overflow-hidden border border-gray-200">
            {INTENSITY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  setValue("intensity", opt, { shouldValidate: true })
                }
                className={`flex-1 py-2 text-xs font-bold transition-colors ${
                  selectedIntensity === opt
                    ? INTENSITY_ACTIVE
                    : INTENSITY_INACTIVE
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.intensity && (
            <p className="text-[10px] text-red-500 mt-0.5">
              {errors.intensity.message}
            </p>
          )}
        </div>

        {/* Target & Fokus */}
        <div className="flex-1 flex flex-col">
          <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider mb-1">
            Target & Fokus
          </label>
          <textarea
            {...register("targetFokus")}
            placeholder="E.g., Maintain sub 1:10 pace for first 100m. Focus on quick transitions."
            className="flex-1 min-h-[80px] w-full border border-gray-200 rounded px-3 py-2 text-xs text-#80AED1 bg-[var(--background)] resize-none placeholder:text-#80AED1 focus:outline-none focus:ring-1 focus:ring-[var(--calendar-bg)]"
          />
          {errors.targetFokus && (
            <p className="text-[10px] text-red-500 mt-0.5">
              {errors.targetFokus.message}
            </p>
          )}
        </div>
      </form>

      {/* Footer */}
      <div className="px-5 py-4 flex-shrink-0 bg-[var(--text-dashboard)]">
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full flex items-center justify-center gap-2 bg-[#ED8936] hover:bg-[#DD6B20] active:scale-95 transition-all text-white font-bold text-sm py-2.5 rounded"
        >
          <CalendarCheck size={16} />
          TAMBAH JADWAL
        </button>
      </div>
      {isDateModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="
        absolute inset-0
        bg-slate-900/40
        backdrop-blur-sm
      "
            onClick={() => setIsDateModalOpen(false)}
          />

          {/* Modal */}
          <div
            className="
        relative
        bg-white
        rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        p-6
        w-[380px]
        max-w-[95vw]
      "
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Pilih Tanggal
                </h3>

                <p className="text-xs text-gray-500">
                  Tentukan rentang program latihan
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDateModalOpen(false)}
                className="
            h-8 w-8
            rounded-full
            hover:bg-gray-100
          "
              >
                ✕
              </button>
            </div>

            {/* Range Preview */}
            <div
              className="
          mb-4
          p-3
          rounded-xl
          border
          bg-slate-50
        "
            >
              <div className="text-[10px] uppercase font-bold text-gray-500">
                Rentang Dipilih
              </div>

              <div className="mt-1 text-sm font-semibold text-gray-800">
                {dateRange?.from
                  ? dateRange.from.toLocaleDateString("id-ID")
                  : "--"}

                {"  →  "}

                {dateRange?.to
                  ? dateRange.to.toLocaleDateString("id-ID")
                  : "--"}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  const from = new Date();

                  const to = new Date();
                  to.setDate(to.getDate() + 6);

                  setValue("dateRange", { from, to });
                }}
                className="
            px-3 py-1.5
            text-xs font-semibold
            rounded-lg
            border
            hover:bg-gray-50
          "
              >
                7 Hari
              </button>

              <button
                type="button"
                onClick={() => {
                  const from = new Date();

                  const to = new Date();
                  to.setDate(to.getDate() + 13);

                  setValue("dateRange", { from, to });
                }}
                className="
            px-3 py-1.5
            text-xs font-semibold
            rounded-lg
            border
            hover:bg-gray-50
          "
              >
                14 Hari
              </button>

              <button
                type="button"
                onClick={() => {
                  const from = new Date();

                  const to = new Date();
                  to.setDate(to.getDate() + 29);

                  setValue("dateRange", { from, to });
                }}
                className="
            px-3 py-1.5
            text-xs font-semibold
            rounded-lg
            border
            hover:bg-gray-50
          "
              >
                30 Hari
              </button>
            </div>

            {/* Calendar */}
            <div className="w-full">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={(range) => setValue("dateRange", range)}
                showOutsideDays
                fixedWeeks
                classNames={{
                  months: "w-full",
                  caption: "relative py-2 text-center",

                  caption_label:
                    "font-bold text-base flex justify-center items-center",

                  table: "w-full border-collapse",

                  head_row: "flex",

                  row: "flex w-full mt-1",

                  head_cell:
                    "text-center text-xs text-gray-400 font-semibold",

                  cell: "relative text-center p-0 ",

                  day: "h-10 w-20 rounded-xl hover:bg-blue-50 transition font-medium",

                  day_selected: "bg-[#2B6CB0] text-white hover:bg-[#2B6CB0]",

                  day_range_start: "bg-[#2B6CB0] text-white rounded-xl",

                  day_range_end: "bg-[#2B6CB0] text-white rounded-xl",

                  day_range_middle: "bg-blue-100 text-[#2B6CB0]",

                  day_today: "border-2 border-[#2B6CB0]",
                }}
              />
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-between">
              <button
                type="button"
                onClick={() =>
                  setValue("dateRange", {
                    from: undefined,
                    to: undefined,
                  })
                }
                className="
            px-4 py-2
            rounded-lg
            border
            text-sm
            font-medium
            hover:bg-gray-50
          "
              >
                Reset
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsDateModalOpen(false)}
                  className="
              px-4 py-2
              rounded-lg
              border
              text-sm
              font-medium
            "
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() => setIsDateModalOpen(false)}
                  className="
              px-4 py-2
              rounded-lg
              bg-[#2B6CB0]
              text-white
              text-sm
              font-semibold
            "
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
