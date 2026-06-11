import { MapPin, Zap, Clock } from "lucide-react";
import { useCountdownTo } from "../hooks/useCountdownTo";
import { useNextSession } from "@/features/dashboard/hooks/useDashboard"; // sesuaikan path
import { useNavigate } from "react-router-dom";

const INTENSITY_LABEL = {
  light: "Ringan",
  medium: "Sedang",
  heavy: "Berat",
};

export default function NextSessionCard() {
  const { data: session, isLoading } = useNextSession();
  const { display, isFinished } = useCountdownTo(session?.startAt ?? null);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white rounded border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full animate-pulse">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* label "Sesi Berikutnya" */}
            <div className="w-24 h-3 rounded bg-gray-200" />
            {/* title */}
            <div className="w-3/4 h-5 rounded bg-gray-200" />
            {/* location + intensity */}
            <div className="flex gap-3 mt-1">
              <div className="w-20 h-3 rounded bg-gray-200" />
              <div className="w-24 h-3 rounded bg-gray-200" />
            </div>
          </div>
          {/* countdown badge */}
          <div className="w-24 h-8 rounded-lg bg-gray-200 shrink-0" />
        </div>
        {/* button */}
        <div className="mt-4 w-28 h-8 rounded bg-gray-200" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-white rounded border border-gray-100 shadow-sm p-5 h-full flex items-center justify-center">
        <p className="text-sm text-gray-400">Tidak ada sesi terjadwal.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Sesi Berikutnya
          </p>
          <h3 className="text-base font-bold text-[#2B6CB0] leading-snug mb-3 truncate">
            {session.activity.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
            {session.notes && (
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-gray-400" />
                {session.notes}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Zap size={13} className="text-gray-400" />
              Intensitas:{" "}
              {INTENSITY_LABEL[session.intensity] ?? session.intensity}
            </span>
          </div>
        </div>

        <div
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-mono font-bold transition-colors ${
            isFinished
              ? "border-green-400 text-green-600 bg-green-50"
              : "border-gray-300 text-gray-700 bg-gray-50"
          }`}
        >
          <Clock size={13} className="text-gray-400" />
          {isFinished ? "Mulai Sekarang!" : display}
        </div>
      </div>

      <button
        onClick={() => navigate(`/user/kalender?scheduleId=${session.id}`)}
        className="mt-4 w-max px-6 py-2 bg-[#ED8936] hover:bg-[#DD6B20] active:scale-95 transition-all text-white text-sm font-bold rounded-sm"
      >
        LIHAT JADWAL
      </button>
    </div>
  );
}
