import { Waves, Zap, Swords, Crosshair, ChessKnight, Activity } from "lucide-react";
import { GOALS } from "../constants/courseData";

const ICON_MAP = {
  run:    Zap,
  swim:   Waves,
  sword:  Swords,
  target: Crosshair,
  horse:  ChessKnight,
};

const STATUS_CONFIG = {
  "SELESAI": {
    badge:   "bg-[#2B6CB0] text-white",
    card:    "bg-white border-gray-100",
    title:   "text-gray-900",
    metric:  "text-gray-800",
    detail:  "text-gray-500",
    bar:     "bg-[#2B6CB0] w-full",
  },
  "SEDANG BERLANGSUNG": {
    badge:   "bg-[#BEE3F8] text-[#2B6CB0]",
    card:    "bg-[#EBF8FF] border-[#90CDF4]",
    title:   "text-[#2B6CB0]",
    metric:  "text-[#2B6CB0]",
    detail:  "text-[#4299E1]",
    bar:     "bg-[#2B6CB0] w-3/4",
  },
  "DITUNDA": {
    badge:   "bg-gray-200 text-gray-500",
    card:    "bg-white border-gray-100",
    title:   "text-gray-400",
    metric:  "text-gray-400",
    detail:  "text-gray-400",
    bar:     "bg-gray-200 w-0",
  },
  "SELANJUTNYA": {
    badge:   "bg-gray-100 text-gray-500",
    card:    "bg-white border-gray-100",
    title:   "text-gray-500",
    metric:  "text-gray-500",
    detail:  "text-gray-400",
    bar:     "bg-gray-200 w-0",
  },
};

function GoalItem({ goal }) {
  const cfg  = STATUS_CONFIG[goal.status] ?? STATUS_CONFIG["DITUNDA"];
  const Icon = ICON_MAP[goal.icon] ?? Activity;

  return (
<div
  className={`w-full rounded-xl border p-4 flex flex-col gap-2 ${cfg.card}`}
>
      {/* Icon + badge */}
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-white/60 border border-gray-100 flex items-center justify-center">
          <Icon size={15} className={cfg.title} />
        </div>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
          {goal.status}
        </span>
      </div>

      {/* Content */}
      <div>
        <p className={`text-[11px] font-extrabold tracking-wide leading-tight ${cfg.title}`}>
          {goal.title}
        </p>
        <p className={`text-base font-bold mt-0.5 ${cfg.metric}`}>{goal.metric}</p>
        <p className={`text-[11px] mt-0.5 ${cfg.detail}`}>{goal.detail}</p>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] rounded-full bg-gray-100 overflow-hidden mt-auto">
        <div className={`h-full rounded-full transition-all ${cfg.bar}`} />
      </div>
    </div>
  );
}

export default function GoalCardList() {
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-3">Goals Hari Ini</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4">
        {GOALS.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}