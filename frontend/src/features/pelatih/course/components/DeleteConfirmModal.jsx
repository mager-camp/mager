import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { useDeleteCourse } from "../hooks/useCourse";

export default function DeleteConfirmModal({ course, onClose }) {
  const deleteMutation = useDeleteCourse();
  const [error, setError] = useState(null);

  async function handleDelete() {
    setError(null);
    try {
      await deleteMutation.mutateAsync(course.id);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message ?? "Gagal menghapus kursus.");
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[400px] max-w-[95vw] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-black text-red-600">Hapus Kursus</h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={24} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-700 text-center leading-relaxed">
            Yakin ingin menghapus kursus <span className="font-bold">"{course.title}"</span>?
            <br />
            <span className="text-xs text-gray-400 mt-1 block">Tindakan ini tidak bisa dibatalkan.</span>
          </p>

          {error && (
            <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600 font-semibold text-center">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm rounded-xl">
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-colors"
          >
            {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}