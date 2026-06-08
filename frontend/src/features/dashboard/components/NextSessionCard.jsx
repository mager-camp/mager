import { Clock } from "lucide-react";
import { useNextSession } from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";

const INTENSITY_LABEL = {
  light: "Intensitas Ringan",
  medium: "Intensitas Sedang",
  heavy: "Intensitas Tinggi",
};

function getMinutesUntil(isoString) {
  const diff = new Date(isoString) - new Date();
  return Math.max(0, Math.round(diff / 1000 / 60));
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NextSessionCard() {
  const { data: session, isLoading } = useNextSession();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-[var(--dashboard-secondary-bg)] rounded-sm p-5 shadow-sm h-full flex flex-col gap-3 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="mt-auto h-9 bg-gray-200 rounded" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-[var(--dashboard-secondary-bg)] rounded-sm p-5 shadow-sm h-full flex flex-col justify-center items-center gap-2">
        <p className="text-sm font-bold text-gray-400">
          Tidak ada sesi berikutnya
        </p>
        <p className="text-xs text-gray-300">Tambah jadwal latihan baru</p>
      </div>
    );
  }

  const minutesUntil = getMinutesUntil(session.startAt);
  const hoursUntil = Math.floor(minutesUntil / 60);
  const minsLeft = minutesUntil % 60;
  const timeLabel =
    hoursUntil > 0 ? `${hoursUntil}J ${minsLeft}M` : `${minutesUntil}M`;

  return (
    <div className="bg-[var(--dashboard-secondary-bg)] rounded-sm p-5 flex flex-col justify-between shadow-sm h-full">
      <div>
        <div className="flex items-center gap-1.5 text-[#2B6CB0] text-sm font-bold mb-2">
          <Clock size={13} />
          <span>SESI BERIKUTNYA DALAM {timeLabel}</span>
        </div>
        <h3 className="text-xl font-bold text-[var(--text-dashboard)] leading-snug mb-1">
          {session.activity?.name ?? "—"}
        </h3>
        <p className="text-sm text-gray-600">
          {formatTime(session.startAt)} - {formatTime(session.endAt)} WIB
        </p>
        <p className="text-sm text-gray-600">
          {INTENSITY_LABEL[session.intensity] ?? session.intensity}
        </p>
      </div>

      <button
        onClick={() => navigate(`/user/kalender?scheduleId=${session.id}`)}
        className="mt-4 w-full bg-[#ED8936] hover:bg-[#DD6B20] text-white text-sm font-semibold py-2 rounded-xs transition-colors duration-200"
      >
        Lihat Jadwal
      </button>
    </div>
  );
}
