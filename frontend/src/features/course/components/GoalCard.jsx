import { BowArrow, Swords, Construction, Activity } from "lucide-react";
import { FaRunning } from "react-icons/fa";
import { PiPersonSimpleSwimFill } from "react-icons/pi";

import { useTodaySchedules } from "@/features/dashboard/hooks/useDashboard"; // sesuaikan path

const ICON_MAP = {
  RENANG: PiPersonSimpleSwimFill,
  LARI: FaRunning,
  TEMBAK: BowArrow,
  ANGGAR: Swords,
  OBSTACLE: Construction,
};


const STATUS_MAP = {
  scheduled:  "SELANJUTNYA",
  active:     "SEDANG BERLANGSUNG",
  completed:  "SELESAI",
  skipped:    "DITUNDA",
};

const STATUS_CONFIG = {
  "SELESAI": {
    badge:  "bg-[#2B6CB0] text-white",
    card:   "bg-white border-gray-100",
    title:  "text-gray-900",
    metric: "text-gray-800",
    detail: "text-gray-500",
    bar:    "bg-[#2B6CB0] w-full",
  },
  "SEDANG BERLANGSUNG": {
    badge:  "bg-[#BEE3F8] text-[#2B6CB0]",
    card:   "bg-[#EBF8FF] border-[#90CDF4]",
    title:  "text-[#2B6CB0]",
    metric: "text-[#2B6CB0]",
    detail: "text-[#4299E1]",
    bar:    "bg-[#2B6CB0] w-3/4",
  },
  "DITUNDA": {
    badge:  "bg-gray-200 text-gray-500",
    card:   "bg-white border-gray-100",
    title:  "text-gray-400",
    metric: "text-gray-400",
    detail: "text-gray-400",
    bar:    "bg-gray-200 w-0",
  },
  "SELANJUTNYA": {
    badge:  "bg-gray-100 text-gray-500",
    card:   "bg-white border-gray-100",
    title:  "text-gray-500",
    metric: "text-gray-500",
    detail: "text-gray-400",
    bar:    "bg-gray-200 w-0",
  },
};

const INTENSITY_LABEL = {
  light:  "Ringan",
  medium: "Sedang",
  heavy:  "Berat",
};

function GoalItem({ schedule }) {
  const status = STATUS_MAP[schedule.status] ?? "SELANJUTNYA";
  const cfg    = STATUS_CONFIG[status];
  const Icon   = ICON_MAP[schedule.activity.name] ?? Activity;

  const startTime = new Date(schedule.startAt).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`w-full rounded border p-4 flex flex-col gap-2 ${cfg.card}`}>
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-white/60 border border-gray-100 flex items-center justify-center">
          <Icon size={15} className={cfg.title} />
        </div>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
          {status}
        </span>
      </div>

      <div>
        <p className={`text-[11px] font-extrabold tracking-wide leading-tight ${cfg.title}`}>
          {schedule.activity.name}
        </p>
        <p className={`text-base font-bold mt-0.5 ${cfg.metric}`}>
          {INTENSITY_LABEL[schedule.intensity]}
        </p>
       <p className={`text-[11px] mt-0.5 ${cfg.detail}`}>
  {schedule.status === "completed" && schedule.workoutLogs?.[0]
    ? `Selesai ${new Date(schedule.workoutLogs[0].completedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} · ${schedule.workoutLogs[0].durationMinutes} menit`
    : `Mulai: ${startTime}`}
</p>
      </div>

      <div className="h-[3px] rounded-full bg-gray-100 overflow-hidden mt-auto">
        <div className={`h-full rounded-full transition-all ${cfg.bar}`} />
      </div>
    </div>
  );
}

export default function GoalCardList() {
  const { data: schedules = [], isLoading } = useTodaySchedules();

  if (isLoading) {
    return <p className="text-sm text-gray-400">Memuat goals...</p>;
  }

  if (schedules.length === 0) {
    return (
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">Goals Hari Ini</h2>
        <p className="text-sm text-gray-400">Belum ada jadwal untuk hari ini.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-3">Goals Hari Ini</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4">
        {schedules.map((s) => (
          <GoalItem key={s.id} schedule={s} />
        ))}
      </div>
    </div>
  );
}