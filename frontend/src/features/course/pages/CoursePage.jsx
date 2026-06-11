import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  BookOpen,
  Lock,
  ChevronRight,
  Award,
  Clock,
  Users,
} from "lucide-react";
import { KURSUS_DETAIL } from "../constants/courseData";

// ─── Hero thumbnail with play button ────────────────────────────────────────
function CourseHero({ image, title }) {
  return (
    <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] rounded overflow-hidden group cursor-pointer shrink-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#ED8936]/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <PlayCircle size={42} className="text-white" />
        </div>
      </div>
    </div>
  );
}

// ─── Single modul row ────────────────────────────────────────────────────────
function ModulRow({ modul, index, onLihatModul }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 rounded border ${
        modul.locked
          ? "border-[var(--border,#e2e8f0)] bg-[var(--bg-card,#f8fafc)]"
          : "border-[#2B6CB0]/30 bg-[#EBF8FF]"
      }`}
    >
      {/* left: number + info */}
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
            {modul.durasi}
          </p>
        </div>
      </div>

      {/* right: lock or lihat modul button */}
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

// ─── Main CoursePage ─────────────────────────────────────────────────────────
export default function FreeCoursePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const kursus = KURSUS_DETAIL[slug];

  if (!kursus) {
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

  const handleLihatModul = (modul) => {
    navigate(`/user/premium/kursus/${slug}/modul/${modul.id}`);
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-5 overflow-y-auto h-full">
      {/* ── Back button ── */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer gap-1.5 text-sm font-bold text-[var(--text-secondary,#64748b)] hover:text-[#2B6CB0] transition-colors self-start"
      >
        <ArrowLeft size={16} />
        Detail Kursus
      </button>

      {/* ── Badges ── */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-black px-2.5 py-1 rounded bg-[#ED8936] text-white tracking-wider">
          {kursus.badge}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
          <BookOpen size={12} />
          {kursus.totalModul} MODUL
        </span>
        <span className="text-gray-300">•</span>
        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
          <Clock size={12} />
          {kursus.totalDurasi}
        </span>
      </div>

      {/* ── Title + CTA ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-black text-[var(--text-dashboard)] uppercase leading-tight">
          {kursus.title}
        </h1>
        <button
          onClick={() => handleLihatModul(kursus.modul[0])}
          className="cursor-pointer px-5 py-2.5 rounded bg-[#ED8936] hover:bg-[#DD6B20] active:scale-[0.98] transition-all text-white text-xs font-black tracking-wider shadow"
        >
          MULAI KURSUS
        </button>
      </div>

      {/* ── Hero video thumbnail ── */}
      <CourseHero image={kursus.image} title={kursus.title} />

      {/* ── Main 2-col layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        {/* LEFT col */}
        <div className="flex flex-col gap-5">
          {/* Tentang Kursus */}
          <div className="bg-[var(--bg-card,#EBF8FF)] rounded p-5">
            <h2 className="text-base font-black text-[#ED8936] tracking-wider mb-3">
              TENTANG KURSUS INI
            </h2>
            <div className="text-sm text-[var(--text-secondary,#4a5568)] leading-relaxed whitespace-pre-line">
              {kursus.tentang}
            </div>

            {/* highlights */}
            {kursus.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {kursus.highlights.map((h) => (
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

          {/* Daftar Modul */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-black text-[var(--text-dashboard)]">
                {kursus.totalKelas} KELAS TERSEDIA
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {kursus.modul.map((m, i) => (
                <ModulRow
                  key={m.id}
                  modul={m}
                  index={i}
                  onLihatModul={handleLihatModul}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT col — Pelatih */}
        <div className="bg-gradient-to-b from-[#1A365D] to-[#2B6CB0] rounded p-5 flex flex-col items-center text-center gap-4 h-fit">
          {/* foto */}
          <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20 bg-white/10 shrink-0">
            <img
              src={kursus.pelatih.foto}
              alt={kursus.pelatih.nama}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'><circle cx='12' cy='8' r='4'/><path d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/></svg></div>`;
              }}
            />
          </div>

          <div>
            <p className="text-xs font-black text-[#ED8936] tracking-wider mb-1">
              {kursus.pelatih.nama}
            </p>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              {kursus.pelatih.bio}
            </p>
          </div>

          {/* badges */}
          <div className="flex items-center gap-2">
            {kursus.pelatih.badges.map((b) => (
              <span
                key={b}
                className="text-[11px] font-black px-2.5 py-1 rounded bg-white/10 text-white border border-white/20"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
