import { useState } from "react";
import { GraduationCap, Plus, Pencil, Trash2 } from "lucide-react";
import { usePremiumCourses } from "../hooks/useCourse";
import CourseFormModal   from "./CourseFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

function KursusCard({ item, onEdit, onDelete }) {
  return (
    <div className="relative w-[250px] h-[350px] shrink-0 rounded shadow-lg overflow-hidden group">
      <img
        src={item.thumbnailUrl ?? "/placeholder.webp"}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2B6CB0] via-[#2B6CB0]/80 to-transparent" />

      {/* Module count badge */}
      {item.modules?.length > 0 && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-md">
          <GraduationCap size={11} />
          {item.modules.length} Modul
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 md:p-4 flex flex-col justify-end min-h-[240px]">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#1A365D] text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded">
            {item.activity?.name ?? "—"}
          </span>
          <span className="bg-white text-[#ED8936] text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded flex items-center gap-1">
            <GraduationCap size={8} />
            {item.type.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col flex-1">
          <div>
            <h3 className="text-lg md:text-xl font-black text-white leading-tight">{item.title}</h3>
            {item.description && (
              <p className="text-[11px] md:text-xs text-blue-100 mt-2 leading-relaxed line-clamp-3">
                {item.description}
              </p>
            )}
          </div>

          {/* Edit & Hapus buttons */}
          <div className="mt-auto grid grid-cols-2 gap-2">
            <button
              onClick={() => onEdit(item)}
              className="py-2 rounded bg-white/20 hover:bg-white/30 text-white text-[10px] font-black tracking-wider flex items-center justify-center gap-1 transition-colors"
            >
              <Pencil size={11} /> EDIT
            </button>
            <button
              onClick={() => onDelete(item)}
              className="py-2 rounded bg-red-500/80 hover:bg-red-600 text-white text-[10px] font-black tracking-wider flex items-center justify-center gap-1 transition-colors"
            >
              <Trash2 size={11} /> HAPUS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KursusCardSkeleton() {
  return (
    <div className="relative w-[250px] h-[350px] shrink-0 rounded shadow-lg overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex flex-col gap-3 min-h-[240px] justify-end">
        <div className="w-12 h-4 rounded bg-gray-300" />
        <div className="flex flex-col gap-2">
          <div className="w-4/5 h-5 rounded bg-gray-300" />
          <div className="w-3/5 h-5 rounded bg-gray-300" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-3 rounded bg-gray-300" />
          <div className="w-4/5 h-3 rounded bg-gray-300" />
        </div>
        <div className="w-full h-8 rounded bg-gray-300 mt-auto" />
      </div>
    </div>
  );
}

// Card khusus tombol Add
function AddCourseCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-[250px] h-[350px] shrink-0 rounded border-2 border-dashed border-gray-300 hover:border-[#2B6CB0] hover:bg-blue-50/50 flex flex-col items-center justify-center gap-3 transition-colors group"
    >
      <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-300 group-hover:border-[#2B6CB0] flex items-center justify-center transition-colors">
        <Plus size={20} className="text-gray-400 group-hover:text-[#2B6CB0]" />
      </div>
      <p className="text-sm font-black text-gray-400 group-hover:text-[#2B6CB0] tracking-wider uppercase transition-colors">
        Add Modul Baru
      </p>
    </button>
  );
}

export default function CoursePremium() {
  const { data: courses = [], isLoading } = usePremiumCourses();

  const [editCourse,   setEditCourse]   = useState(null); // null = closed, course = edit mode
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [showCreate,   setShowCreate]   = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap size={26} className="text-[#ED8936]" />
          <div>
            <h2 className="text-xl font-bold text-[var(--text-dashboard)]">Daftar Modul PREMIUM</h2>
            <p className="text-sm text-text-primary">Kelola kursus dan modul latihan bertipe PREMIUM.</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 3 }).map((_, i) => <KursusCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {courses.map((item) => (
            <KursusCard
              key={item.id}
              item={item}
              onEdit={setEditCourse}
              onDelete={setDeleteCourse}
            />
          ))}
          <AddCourseCard onClick={() => setShowCreate(true)} />
        </div>
      )}

      {/* Modals */}
      {showCreate && (
        <CourseFormModal onClose={() => setShowCreate(false)} />
      )}
      {editCourse && (
        <CourseFormModal course={editCourse} onClose={() => setEditCourse(null)} />
      )}
      {deleteCourse && (
        <DeleteConfirmModal course={deleteCourse} onClose={() => setDeleteCourse(null)} />
      )}
    </div>
  );
}