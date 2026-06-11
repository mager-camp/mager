import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, PlayCircle, Dumbbell, CheckCircle, Clock } from "lucide-react";
import { KURSUS_DETAIL } from "../constants/courseData";

// ─── Type badge ─────────────────────────────────────────────────────────────
function TypeBadge({ type }) {
  if (type === "drill") {
    return (
      <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-[#ED8936]/10 text-[#ED8936] border border-[#ED8936]/20 tracking-wider shrink-0">
        <Dumbbell size={9} />
        DRILL
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-[#2B6CB0]/10 text-[#2B6CB0] border border-[#2B6CB0]/20 tracking-wider shrink-0">
      <PlayCircle size={9} />
      VIDEO
    </span>
  );
}

// ─── Single sub-modul row ─────────────────────────────────────────────────────
function SubModulRow({ sub, index, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg text-left transition-all group ${
        isActive
          ? "bg-gradient-to-r from-[#2B6CB0] to-[#1A4A7A] shadow-md"
          : "bg-[var(--bg-card,#f8fafc)] hover:bg-[#EBF8FF] border border-[var(--border,#e2e8f0)]"
      }`}
    >
      {/* index / play icon */}
      <div
        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black ${
          isActive
            ? "bg-white/20 text-white"
            : "bg-[#2B6CB0]/10 text-[#2B6CB0] group-hover:bg-[#2B6CB0] group-hover:text-white transition-colors"
        }`}
      >
        {isActive ? (
          <PlayCircle size={16} className="text-white" />
        ) : (
          <span>{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-bold leading-tight ${
            isActive ? "text-white" : "text-[var(--text-dashboard)]"
          }`}
        >
          {sub.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`flex items-center gap-1 text-[11px] ${
              isActive ? "text-blue-200" : "text-gray-400"
            }`}
          >
            <Clock size={10} />
            {sub.durasi}
          </span>
        </div>
      </div>

      {/* type badge */}
      {!isActive && <TypeBadge type={sub.type} />}
      {isActive && (
        <span className="text-[9px] font-black text-blue-200 tracking-wider shrink-0">
          SEDANG DIPUTAR
        </span>
      )}
    </button>
  );
}

// ─── Main ModulPage ───────────────────────────────────────────────────────────
export default function FreeModulPage() {
  const { slug, modulId } = useParams();
  const navigate = useNavigate();

  const kursus = KURSUS_DETAIL[slug];
  const modul = kursus?.modul.find((m) => String(m.id) === String(modulId));

  if (!kursus || !modul) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg font-bold">Modul tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-[#2B6CB0] cursor-pointer underline"
        >
          Kembali
        </button>
      </div>
    );
  }

  // first sub is "active" / playing by default
  const activeSubId = modul.subModul[0]?.id;

  return (
    <div className="p-4 md:p-6 flex flex-col gap-5 overflow-y-auto h-full">
      {/* ── Back ── */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold cursor-pointer text-[var(--text-secondary,#64748b)] hover:text-[#2B6CB0] transition-colors self-start"
      >
        <ArrowLeft size={16} />
        Kembali ke Kursus
      </button>

      {/* ── Course breadcrumb ── */}
      <div>
        <p className="text-[11px] font-black text-[#ED8936] tracking-widest uppercase mb-1">
          {kursus.kategori} · {kursus.title}
        </p>
        <h1 className="text-xl md:text-2xl font-black text-[var(--text-dashboard)] leading-tight">
          {modul.title}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {modul.subModul.length} Pelajaran · {modul.durasi}
        </p>
      </div>

      {/* ── Video placeholder ── */}
      <div className="relative w-full aspect-video rounded overflow-hidden bg-[#0f1923] flex items-center justify-center shadow-lg">
        <img
          src={kursus.image}
          alt={modul.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#ED8936] flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
            <PlayCircle size={34} className="text-white" />
          </div>
          <p className="text-white text-sm font-bold opacity-80">
            {modul.subModul[0]?.title}
          </p>
        </div>

        {/* top-left label */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="text-[10px] font-black px-2.5 py-1 rounded bg-[#ED8936] text-white tracking-wider">
            MODUL {String(modulId).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Sub-modul list ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-[var(--text-dashboard)] tracking-wide uppercase">
            Daftar Pelajaran
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <CheckCircle size={12} className="text-green-500" />
            0 / {modul.subModul.length} selesai
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {modul.subModul.map((sub, i) => (
            <SubModulRow
              key={sub.id}
              sub={sub}
              index={i}
              isActive={sub.id === activeSubId}
              onClick={() => {
                // hook up your video player logic here
                console.log("Play:", sub.title);
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Next modul CTA (if not last) ── */}
      {(() => {
        const currentIdx = kursus.modul.findIndex((m) => String(m.id) === String(modulId));
        const nextModul = kursus.modul[currentIdx + 1];
        if (!nextModul || nextModul.locked) return null;
        return (
          <div className="mt-2 p-4 rounded-lg bg-gradient-to-r from-[#2B6CB0] to-[#1A4A7A] flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black text-blue-200 tracking-widest uppercase mb-0.5">
                Modul Berikutnya
              </p>
              <p className="text-sm font-bold text-white">{nextModul.title}</p>
            </div>
            <button
              onClick={() =>
                navigate(`user/premium/kursus/${slug}/modul/${nextModul.id}`)
              }
              className="shrink-0 px-4 py-2 rounded bg-[#ED8936] hover:bg-[#DD6B20] text-white text-xs font-black tracking-wider transition-colors"
            >
              LANJUT
            </button>
          </div>
        );
      })()}
    </div>
  );
}