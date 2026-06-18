import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, CalendarCheck, Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { programSchema } from "../constants/programSchema";
import {
  JENIS_LATIHAN_OPTIONS,
  INTENSITY_OPTIONS,
} from "../constants/calendarData";
import { formatDate } from "../utils/dateUtils";

const DEFAULT_VALUES = {
  dateRange: { from: new Date(), to: new Date() },
  startTime: "09:00",
  endTime: "11:00",
  jenisLatihan: "",
  intensity: "MEDIUM",
  targetFokus: "",
  alarmEnabled: false,
  alarmMinutes: 30, // menit sebelum mulai
};

const DAY_PICKER_CLASS_NAMES = {
  months: "w-full",
  caption: "relative py-2 text-center",
  caption_label: "font-bold text-base flex justify-center items-center",
  table: "w-full border-collapse",
  head_row: "flex",
  row: "flex w-full mt-1",
  head_cell: "text-center text-xs text-gray-400 font-semibold",
  cell: "relative text-center p-0",
  day: "h-10 w-20 rounded-xl hover:bg-blue-50 transition font-medium",
  day_selected: "bg-[#2B6CB0] text-white hover:bg-[#2B6CB0]",
  day_range_start: "bg-[#2B6CB0] text-white rounded-xl",
  day_range_end: "bg-[#2B6CB0] text-white rounded-xl",
  day_range_middle: "bg-blue-100 text-[#2B6CB0]",
  day_today: "border-2 border-[#2B6CB0]",
};

const ALARM_OPTIONS = [
  { label: "15 menit sebelum", value: 15 },
  { label: "30 menit sebelum", value: 30 },
  { label: "1 jam sebelum", value: 60 },
  { label: "2 jam sebelum", value: 120 },
];

export default function AddProgramPanel({ onAddEvent }) {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const dateRange = watch("dateRange");
  const selectedIntensity = watch("intensity");
  const alarmEnabled = watch("alarmEnabled");

  async function onSubmit(data) {
    setSubmitError(null);

    const selectedActivity = JENIS_LATIHAN_OPTIONS.find(
      (opt) => opt.value === data.jenisLatihan,
    );
    if (!selectedActivity) return;

    // ── FE validation: tanggal tidak boleh sebelum hari ini ─────────────────
    const fromDate = new Date(data.dateRange.from);
    fromDate.setHours(0, 0, 0, 0);
    if (fromDate < today) {
      setSubmitError("Tidak bisa membuat jadwal di tanggal yang sudah lewat.");
      return;
    }

    const current = new Date(data.dateRange.from);
    const end = new Date(data.dateRange.to);
    const payloads = [];

    while (current <= end) {
      const dateStr = formatDate(current);
      const startAt = new Date(`${dateStr}T${data.startTime}`);
      const endAt = new Date(`${dateStr}T${data.endTime}`);

      // ── FE validation: jam selesai harus setelah jam mulai ───────────────
      if (endAt <= startAt) {
        setSubmitError("Jam selesai harus setelah jam mulai.");
        return;
      }

      // Hitung alarmAt
      let alarmAt = null;
      if (data.alarmEnabled) {
        alarmAt = new Date(startAt.getTime() - data.alarmMinutes * 60 * 1000);
      }

      payloads.push({
        activityId: selectedActivity.activityId,
        scheduledAt: new Date(`${dateStr}T12:00:00`).toISOString(),
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        intensity: data.intensity.toLowerCase(),
        programType: selectedActivity.programType,
        notes: data.targetFokus || undefined,
        alarmEnabled: data.alarmEnabled,
        alarmAt: alarmAt?.toISOString() ?? undefined,
      });

      current.setDate(current.getDate() + 1);
    }

    try {
      await onAddEvent(payloads);
      reset(DEFAULT_VALUES);
    } catch (err) {
      // Error dari BE (overlap, past date, dll) ditampilkan di sini
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "Gagal menambahkan jadwal.";
      setSubmitError(msg);
    }
  }

  function setPresetRange(days) {
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + days - 1);
    setValue("dateRange", { from, to });
  }

  function formatDateRangeLabel(range) {
    if (!range?.from) return "Pilih rentang tanggal";
    if (!range?.to || range.from.getTime() === range.to.getTime()) {
      return range.from.toLocaleDateString("id-ID");
    }
    return `${range.from.toLocaleDateString("id-ID")} - ${range.to.toLocaleDateString("id-ID")}`;
  }

  // Disable tanggal sebelum hari ini di DayPicker
  const disabledDays = { before: today };

  return (
    <div className="bg-[var(--text-dashboard)] rounded flex flex-col h-full overflow-hidden">
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
        {/* Rentang Tanggal */}
        <div>
          <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider mb-2">
            Rentang Tanggal
          </label>
          <button
            type="button"
            onClick={() => setIsDateModalOpen(true)}
            className="w-full flex items-center justify-between border border-gray-200 rounded px-3 py-2 bg-white text-xs font-semibold"
          >
            <span>{formatDateRangeLabel(dateRange)}</span>
            <CalendarCheck size={14} className="text-[var(--text-dashboard)]" />
          </button>
        </div>

        {/* Rentang Waktu */}
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

        {/* Intensity */}
        <div>
          <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider mb-1">
            Program Intensity
          </label>
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
                    ? "bg-[var(--text-dashboard)] text-white"
                    : "bg-[var(--background)] text-[var(--text-primary)] hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Alarm */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[10px] font-bold text-[var(--text-dashboard)] uppercase tracking-wider">
              Pengingat
            </label>
            <button
              type="button"
              onClick={() => setValue("alarmEnabled", !alarmEnabled)}
              className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                alarmEnabled
                  ? "bg-[var(--text-dashboard)] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {alarmEnabled ? <Bell size={10} /> : <BellOff size={10} />}
              {alarmEnabled ? "Aktif" : "Nonaktif"}
            </button>
          </div>
          {alarmEnabled && (
            <select
              {...register("alarmMinutes", { valueAsNumber: true })}
              className="w-full border border-gray-200 rounded px-2.5 py-2 text-xs font-semibold text-[var(--text-primary)] bg-[var(--background)] focus:outline-none"
            >
              {ALARM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
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
            className="flex-1 min-h-[80px] w-full border border-gray-200 rounded px-3 py-2 text-xs bg-[var(--background)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--calendar-bg)]"
          />
        </div>

        {/* Submit error */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded px-3 py-2 text-[11px] text-red-600 font-semibold">
            {submitError}
          </div>
        )}
      </form>

      {/* Footer */}
      <div className="px-5 py-4 flex-shrink-0 bg-[var(--text-dashboard)]">
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#ED8936] hover:bg-[#DD6B20] disabled:opacity-60 active:scale-95 transition-all text-white font-bold text-sm py-2.5 rounded"
        >
          <CalendarCheck size={16} />
          {isSubmitting ? "Menambahkan..." : "TAMBAH JADWAL"}
        </button>
      </div>

      {/* Date Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsDateModalOpen(false)}
          />
          <div className="relative bg-white rounded shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 w-[380px] max-w-[95vw]">
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
                className="h-8 w-8 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 p-3 rounded border bg-slate-50">
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

            <div className="flex gap-2 mb-4">
              {[
                { label: "7 Hari", days: 7 },
                { label: "14 Hari", days: 14 },
                { label: "30 Hari", days: 30 },
              ].map(({ label, days }) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setPresetRange(days)}
                  className="px-3 py-1.5 text-xs font-semibold rounded border hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}
            </div>

            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={(range) => setValue("dateRange", range)}
              disabled={disabledDays}
              showOutsideDays
              fixedWeeks
              classNames={DAY_PICKER_CLASS_NAMES}
            />

            <div className="mt-5 flex justify-between">
              <button
                type="button"
                onClick={() =>
                  setValue("dateRange", { from: undefined, to: undefined })
                }
                className="px-4 py-2 rounded border text-sm font-medium hover:bg-gray-50"
              >
                Reset
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsDateModalOpen(false)}
                  className="px-4 py-2 rounded border text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => setIsDateModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#2B6CB0] text-white text-sm font-semibold"
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
