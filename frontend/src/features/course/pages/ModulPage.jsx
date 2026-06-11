import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  Dumbbell,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useCourseDetail, useCompleteModule } from "../hooks/useCourses";
import { useState, useEffect } from "react";
import { getYouTubeEmbedUrl } from '@/utils/youtube';

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

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-bold leading-tight ${isActive ? "text-white" : "text-[var(--text-dashboard)]"}`}
        >
          {sub.title}
        </p>
        {sub.durasi && (
          <span
            className={`flex items-center gap-1 text-[11px] mt-1 ${isActive ? "text-blue-200" : "text-gray-400"}`}
          >
            <Clock size={10} />
            {sub.durasi}
          </span>
        )}
      </div>

      {!isActive && <TypeBadge type={sub.type} />}
      {isActive && (
        <span className="text-[9px] font-black text-blue-200 tracking-wider shrink-0">
          SEDANG DIPUTAR
        </span>
      )}
    </button>
  );
}

export default function ModulPage() {
  const { slug, modulId } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading } = useCourseDetail(slug);
  const { mutate: completeModule } = useCompleteModule(slug);
  const [activeSubId, setActiveSubId] = useState(null);

  const modul = course?.modules.find((m) => m.id === modulId);
  const activeSub =
    modul?.subModules.find((s) => s.id === activeSubId) ?? modul?.subModules[0];

  useEffect(() => {
    if (modul?.subModules[0]) {
      setActiveSubId(modul.subModules[0].id);
    }
  }, [modulId]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-sm text-gray-400">Memuat modul...</p>
      </div>
    );
  }

  if (!course || !modul) {
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

  const currentIdx = course.modules.findIndex((m) => m.id === modulId);
  const nextModul = course.modules[currentIdx + 1];

  const handleComplete = () => {
    completeModule(modul.id, {
      onSuccess: () => {
        if (nextModul && !nextModul.locked) {
          navigate(`/user/course/free/${slug}/modul/${nextModul.id}`);
        } else {
          navigate(`/user/course/free/${slug}`);
        }
      },
    });
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-5 overflow-y-auto h-full">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold cursor-pointer text-[var(--text-secondary,#64748b)] hover:text-[#2B6CB0] transition-colors self-start"
      >
        <ArrowLeft size={16} />
        Kembali ke Kursus
      </button>

      <div>
        <p className="text-[11px] font-black text-[#ED8936] tracking-widest uppercase mb-1">
          {course.title}
        </p>
        <h1 className="text-xl md:text-2xl font-black text-[var(--text-dashboard)] leading-tight">
          {modul.title}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {modul.subModules.length} Pelajaran
          {modul.durasi ? ` · ${modul.durasi}` : ""}
        </p>
      </div>

      {/* Video player / placeholder */}
      {/* Video player */}
      <div className="relative w-full aspect-video rounded overflow-hidden bg-[#0f1923] shadow-lg">
        {getYouTubeEmbedUrl(activeSub?.videoUrl) ? (
          <iframe
            key={activeSub.id}
            src={getYouTubeEmbedUrl(activeSub.videoUrl)}
            title={activeSub.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : activeSub?.videoUrl ? (
          <video
            key={activeSub.id}
            src={activeSub.videoUrl}
            controls
            autoPlay
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        ) : (
          <>
            <img
              src={course.thumbnailUrl ?? "/placeholder.webp"}
              alt={modul.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3">
              <div className="w-16 h-16 rounded-full bg-[#ED8936] flex items-center justify-center shadow-xl">
                <PlayCircle size={34} className="text-white" />
              </div>
              <p className="text-white text-sm font-bold opacity-80">
                {activeSub?.title}
              </p>
            </div>
          </>
        )}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="text-[10px] font-black px-2.5 py-1 rounded bg-[#ED8936] text-white tracking-wider">
            MODUL {String(currentIdx + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Sub-modul list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-[var(--text-dashboard)] tracking-wide uppercase">
            Daftar Pelajaran
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <CheckCircle size={12} className="text-green-500" />
            {modul.completed ? modul.subModules.length : 0} /{" "}
            {modul.subModules.length} selesai
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {modul.subModules.map((sub, i) => (
            <SubModulRow
              key={sub.id}
              sub={sub}
              index={i}
              isActive={sub.id === activeSub?.id}
              onClick={() => setActiveSubId(sub.id)}
            />
          ))}
        </div>
      </div>

      {/* Complete / Next CTA */}
      {!modul.completed && (
        <div className="mt-2 p-4 rounded-lg bg-gradient-to-r from-[#2B6CB0] to-[#1A4A7A] flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black text-blue-200 tracking-widest uppercase mb-0.5">
              {nextModul ? "Selesaikan & Lanjut" : "Selesaikan Modul"}
            </p>
            <p className="text-sm font-bold text-white">
              {nextModul ? nextModul.title : "Tandai modul ini selesai"}
            </p>
          </div>
          <button
            onClick={handleComplete}
            className="shrink-0 px-4 py-2 rounded bg-[#ED8936] hover:bg-[#DD6B20] text-white text-xs font-black tracking-wider transition-colors"
          >
            {nextModul ? "LANJUT" : "SELESAI"}
          </button>
        </div>
      )}
    </div>
  );
}
