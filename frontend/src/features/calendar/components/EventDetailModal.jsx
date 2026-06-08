import {
  X,
  Clock,
  ArrowRight,
  Trash2,
  Pencil,
  CalendarCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  INTENSITY_OPTIONS,
  JENIS_LATIHAN_OPTIONS,
} from "../constants/calendarData";

const INTENSITY_LABEL = { LIGHT: "Ringan", MEDIUM: "Sedang", HEAVY: "Berat" };
const STATUS_LABEL = {
  scheduled: "Terjadwal",
  active: "Sedang Berlangsung",
  completed: "Selesai",
  skipped: "Dilewati",
};
const STATUS_COLOR = {
  scheduled: "text-blue-600 bg-blue-50",
  active: "text-orange-600 bg-orange-50",
  completed: "text-green-600 bg-green-50",
  skipped: "text-gray-500 bg-gray-100",
};

function ViewMode({ event, onClose, onDelete, onEditClick, onStatusChange }) {
  const status = event.status ?? "pending";
  const dateObj = new Date(event.date);
  const dateLabel = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const isCompleted = event.status === "completed";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-[480px] max-w-[95vw] overflow-hidden">
        {/* Top bar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400">
              Info detail Jadwal pribadi
            </span>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
          >
            <X size={14} />
          </button>
        </div>

        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-gray-500">
              Jadwal {dateLabel}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${STATUS_COLOR[status]}`}
            >
              <Clock size={10} />
              {STATUS_LABEL[status]}
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-800">{event.title}</h2>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Waktu & Jenis */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded px-4 py-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Waktu
              </p>
              <p className="text-sm font-bold text-gray-800">
                {event.startTime} - {event.endTime} WIB
              </p>
            </div>
            <div className="bg-gray-50 rounded px-4 py-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Jenis Latihan
              </p>
              <p className="text-sm font-bold text-gray-800">{event.title}</p>
            </div>
          </div>

          {/* Intensitas */}
          {event.intensity && (
            <div className="bg-gray-50 rounded px-4 py-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Intensitas
              </p>
              <p className="text-sm font-bold text-gray-800 capitalize">
                {INTENSITY_LABEL[event.intensity] ?? event.intensity}
              </p>
            </div>
          )}

          {/* Catatan */}
          {event.notes && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Catatan
              </p>
              <div className="bg-gray-50 rounded px-4 py-3">
                <p className="text-sm text-gray-700">{event.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex flex-col gap-2">
          {event.status === "completed" ? (
            <div className="w-full flex items-center justify-center gap-2 bg-[#7e7e7e] text-white font-bold text-sm py-3 rounded">
              <CalendarCheck size={16} />
              Latihan Selesai
            </div>
          ) : (
            <>
              {event.status === "active" ? (
                <button
                  onClick={() => onStatusChange(event.id, "completed")}
                  className="w-full flex items-center justify-center gap-2 bg-[#38A169] hover:bg-[#2F855A] text-white font-bold text-sm py-3 rounded transition-colors"
                >
                  <CalendarCheck size={16} />
                  Selesai
                </button>
              ) : (
                <button
                  onClick={() => onStatusChange(event.id, "active")}
                  className="w-full flex items-center justify-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-bold text-sm py-3 rounded transition-colors"
                >
                  Mulai Latihan <ArrowRight size={16} />
                </button>
              )}

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onDelete?.(event)}
                  className="flex items-center justify-center gap-1.5 border-2 border-red-200 text-red-500 hover:bg-red-50 font-bold text-xs py-2.5 rounded transition-colors"
                >
                  <Trash2 size={13} />
                  Hapus
                </button>

                <button
                  onClick={onEditClick}
                  className="flex items-center justify-center gap-1.5 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-xs py-2.5 rounded transition-colors"
                >
                  <Pencil size={13} />
                  Edit Jadwal
                </button>

                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-xs py-2.5 rounded transition-colors"
                >
                  Kembali
                  <ArrowRight size={13} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EditMode({ event, onClose, onBack, onSave }) {
  const defaultActivity =
    JENIS_LATIHAN_OPTIONS.find(
      (o) => o.label.toLowerCase() === event.title?.toLowerCase(),
    ) ?? JENIS_LATIHAN_OPTIONS[0];

  const [selectedActivity, setSelectedActivity] = useState(defaultActivity);
  const [startTime, setStartTime] = useState(event.startTime.replace(".", ":"));
  const [endTime, setEndTime] = useState(event.endTime.replace(".", ":"));
  const [intensity, setIntensity] = useState(event.intensity ?? "MEDIUM");
  const [notes, setNotes] = useState(event.notes ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSave() {
    setIsSubmitting(true);
    await onSave(event.id, {
      activityId: selectedActivity.activityId,
      startTime,
      endTime,
      intensity,
      notes,
    });
    setIsSubmitting(false);
  }

  return (
    <>
      {/* Top bar — sama persis kayak ViewMode */}
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400">
            Edit Jadwal Pribadi
          </span>
        </div>
        <button
          onClick={onClose}
          className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
        >
          <X size={14} />
        </button>
      </div>

      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-500 mb-3">
          Jadwal{" "}
          {new Date(event.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="text-2xl font-black text-gray-800">{event.title}</h2>
      </div>

      {/* Body — pakai blok bg-gray-50 rounded kayak ViewMode */}
      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Jenis Latihan */}
        <div className="bg-gray-50 rounded px-4 py-3">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Jenis Latihan
          </label>
          <select
            value={selectedActivity.activityId}
            onChange={(e) => {
              const found = JENIS_LATIHAN_OPTIONS.find(
                (o) => o.activityId === e.target.value,
              );
              setSelectedActivity(found);
            }}
            className="w-full bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer"
          >
            {JENIS_LATIHAN_OPTIONS.map((opt) => (
              <option key={opt.activityId} value={opt.activityId}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Waktu */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded px-4 py-3">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Mulai
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-800 focus:outline-none"
            />
          </div>
          <div className="bg-gray-50 rounded px-4 py-3">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Selesai
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Intensitas */}
        <div className="bg-gray-50 rounded px-4 py-3">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Intensitas
          </label>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer"
          >
            {INTENSITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {INTENSITY_LABEL[opt]}
              </option>
            ))}
          </select>
        </div>

        {/* Catatan */}
        <div className="bg-gray-50 rounded px-4 py-3">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Catatan
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Tambahkan catatan latihan..."
            className="w-full bg-transparent text-sm text-gray-700 resize-none focus:outline-none placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Footer — sama persis kayak ViewMode */}
      <div className="px-5 pb-5 flex flex-col gap-2">
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] disabled:opacity-60 text-white font-bold text-sm py-3 rounded transition-colors"
        >
          <CalendarCheck size={16} />
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm py-2.5 rounded transition-colors"
        >
          Batal
        </button>
      </div>
    </>
  );
}

export default function EventDetailModal({
  event,
  onClose,
  onDelete,
  onUpdate,
  onStatusChange,
}) {
  const [mode, setMode] = useState("view");

  useEffect(() => {
    setMode("view");
  }, [event?.id]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-[480px] max-w-[95vw] overflow-hidden">
        {mode === "view" ? (
          <ViewMode
            event={event}
            onClose={onClose}
            onDelete={onDelete}
            onEditClick={() => setMode("edit")}
            onStatusChange={onStatusChange}
          />
        ) : (
          <EditMode
            event={event}
            onClose={onClose}
            onBack={() => setMode("view")}
            onSave={async (id, payload) => {
              await onUpdate(id, payload);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}
