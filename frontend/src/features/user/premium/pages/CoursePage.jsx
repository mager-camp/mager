import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  BookOpen,
  Lock,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useCourseDetail } from "../hooks/usePremium";
import { useState } from "react";
import { getYouTubeEmbedUrl } from "@/utils/youtube";

function CourseHero({ image, title, introVideoUrl }) {
  const [playing, setPlaying] = useState(false);

  const embedUrl = introVideoUrl ? getYouTubeEmbedUrl(introVideoUrl) : null;

  return (
    <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] rounded overflow-hidden shrink-0">
      {playing && embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <>
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
            onClick={() => embedUrl && setPlaying(true)}
          >
            <div
              className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${embedUrl ? "bg-[#ED8936]/90" : "bg-gray-500/60"}`}
            >
              <PlayCircle size={42} className="text-white" />
            </div>
            {!embedUrl && (
              <p className="absolute bottom-4 text-white/60 text-xs font-bold">
                Video intro belum tersedia
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ModulRow({ modul, index, onLihatModul }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 rounded border ${
        modul.locked
          ? "border-[var(--border,#e2e8f0)] bg-[var(--bg-card,#f8fafc)]"
          : "border-[#2B6CB0]/30 bg-[#EBF8FF]"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
            modul.locked
              ? "bg-gray-200 text-gray-500"
              : "bg-[#2B6CB0] text-white"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p
            className={`text-sm font-bold leading-tight truncate ${
              modul.locked
                ? "text-[var(--text-secondary,#64748b)]"
                : "text-[#1A365D]"
            }`}
          >
            {modul.title}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">
            {modul.durasi ?? `${modul.subModules?.length ?? 0} pelajaran`}
          </p>
        </div>
      </div>

      {modul.locked ? (
        <Lock size={15} className="shrink-0 text-gray-400" />
      ) : (
        <button
          onClick={() => onLihatModul(modul)}
          className="shrink-0 cursor-pointer flex items-center gap-1 text-[10px] font-black text-[#2B6CB0] hover:text-[#ED8936] transition-colors ml-3"
        >
          LIHAT MODUL
          <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}

export default function CoursePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, isError } = useCourseDetail(slug);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-sm text-gray-400">Memuat kursus...</p>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg font-bold">Kursus tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-[#2B6CB0] cursor-pointer underline"
        >
          Kembali
        </button>
      </div>
    );
  }

  const firstUnlocked = course.modules.find((m) => !m.locked);

  return (
    <div className="p-10 md:p-12 flex flex-col gap-5 overflow-y-auto h-full">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer gap-1.5 text-sm font-bold text-[var(--text-secondary,#64748b)] hover:text-[#2B6CB0] transition-colors self-start"
      >
        <ArrowLeft size={16} />
        Detail Kursus
      </button>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-black px-2.5 py-1 rounded bg-[#ED8936] text-white tracking-wider">
          GRATIS
        </span>
        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
          <BookOpen size={12} />
          {course.modules.length} MODUL
        </span>
        {course.totalDurasi && (
          <>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
              <Clock size={12} />
              {course.totalDurasi}
            </span>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-black text-[var(--text-dashboard)] uppercase leading-tight">
          {course.title}
        </h1>
        {firstUnlocked && (
          <button
            onClick={() =>
              navigate(
                `/user/premium/course/${course.id}/modul/${firstUnlocked.id}`,
              )
            }
            className="cursor-pointer px-5 py-2.5 rounded bg-[#ED8936] hover:bg-[#DD6B20] active:scale-[0.98] transition-all text-white text-xs font-black tracking-wider shadow"
          >
            MULAI KURSUS
          </button>
        )}
      </div>

      <CourseHero
        image={course.thumbnailUrl ?? "/placeholder.webp"}
        title={course.title}
        introVideoUrl={course.introVideoUrl}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        {/* LEFT */}
        <div className="flex flex-col gap-5">
          {course.about && (
            <div className="bg-[var(--bg-card,#EBF8FF)] rounded p-5">
              <h2 className="text-base font-black text-[#ED8936] tracking-wider mb-3">
                TENTANG KURSUS INI
              </h2>
              <p className="text-sm text-[var(--text-secondary,#4a5568)] leading-relaxed whitespace-pre-line">
                {course.about}
              </p>

              {course.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  {course.highlights.map((h) => (
                    <div key={h.id} className="bg-white/60 rounded p-3">
                      <p className="text-[10px] font-black text-[#1A365D] tracking-wider mb-1">
                        {h.title}
                      </p>
                      <p className="text-xs text-gray-500 leading-snug">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-black text-[var(--text-dashboard)]">
                {course.modules.length} MODUL TERSEDIA
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {course.modules.map((m, i) => (
                <ModulRow
                  key={m.id}
                  modul={m}
                  index={i}
                  onLihatModul={(mod) =>
                    navigate(
                      `/user/premium/course/${course.id}/modul/${mod.id}`,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Instructor */}
        {course.instructor && (
          <div className="bg-gradient-to-b from-[#1A365D] to-[#2B6CB0] rounded p-5 flex flex-col items-center text-center gap-4 h-fit">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20 bg-white/10 shrink-0">
              <img
                src={
                  course.instructor.user.profilePicture ?? "/placeholder.webp"
                }
                alt={course.instructor.user.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-black text-[#ED8936] tracking-wider mb-1 uppercase">
                {course.instructor.user.fullName}
              </p>
              {course.instructor.bio && (
                <p className="text-[11px] text-blue-200 leading-relaxed">
                  {course.instructor.bio}
                </p>
              )}
            </div>
            {course.instructor.badges.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {course.instructor.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[11px] font-black px-2.5 py-1 rounded bg-white/10 text-white border border-white/20"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
