import { useTodaySchedules } from "../hooks/useDashboard";
import GoalCard from "./GoalCard";

// Map activity name BE → icon di GoalCard
const ACTIVITY_ICON_MAP = {
  LARI:     "run",
  RENANG:   "swim",
  ANGGAR:   "sword", 
  TEMBAK:   "shoot",
  OBSTACLE: "obstacle",
};

const STATUS_MAP = {
  pending:   "DIJADWALKAN",
  completed: "SELESAI",
  skipped:   "AKTIF",
};

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString("id-ID", {
    hour:   "2-digit",
    minute: "2-digit",
  });
}

export default function TodayGoals() {
  const { data: schedules = [], isLoading } = useTodaySchedules();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-36 bg-gray-100 rounded-sm animate-pulse" />
        ))}
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 bg-gray-50 rounded-sm border border-dashed border-gray-200">
        <p className="text-sm text-gray-400">Tidak ada jadwal hari ini</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 min-h-0">
      {schedules.map((s) => (
        <GoalCard
          key={s.id}
          icon={ACTIVITY_ICON_MAP[s.activity?.name] ?? "bike"}
          status={STATUS_MAP[s.status] ?? "DIJADWALKAN"}
          title={s.activity?.name ?? "—"}
          description={`${formatTime(s.startAt)} - ${formatTime(s.endAt)} • ${s.intensity.toUpperCase()}`}
        />
      ))}
    </div>
  );
}