import { BowArrow, Swords, Construction } from "lucide-react";
import { FaRunning } from "react-icons/fa";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import { Zap } from "lucide-react";

const STATUS_CONFIG = {
  SELESAI: {
    label: "SELESAI",
    className: "bg-[#2B6CB0] text-white",
    textClass: "text-[var(--text-dashboard)]",
    descriptionClass: "text-[var(--text-primary)]",
  },

  AKTIF: {
    label: "AKTIF",
    className: "bg-[#38A169] text-white",
    textClass: "text-[var(--text-dashboard)]",
    descriptionClass: "text-[var(--text-primary)]",
  },

  DIJADWALKAN: {
    label: "DIJADWALKAN",
    className: "bg-gray-200 text-gray-600",
    textClass: "text-gray-400",
    descriptionClass: "text-gray-400",
  },
};

const ICON_MAP = {
  swim: PiPersonSimpleSwimFill,
  run: FaRunning,
  shoot: BowArrow,
  fencing: Swords,
  obstacle : Construction,
};

export default function GoalCard({
  icon = "swim",
  status = "SELESAI",
  title = "Renang 200m",
  description = "2:05.40 - Target tercapai",
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.DIJADWALKAN;
  const Icon = ICON_MAP[icon] ?? Zap;

  return (
    <div className="bg-white rounded-sm p-5 flex flex-col gap-3 shadow-sm border-2 border-border-full">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg bg-[#EBF8FF] flex items-center justify-center">
          <Icon size={20} className="text-[#2B6CB0]" />
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-1 tracking-wide ${config.className}`}
        >
          {config.label}
        </span>
      </div>

      <div>
        <h4
          className={`
    font-bold text-lg leading-tight mb-0.5
    ${config.textClass}
  `}
        >
          {title}
        </h4>

        <p
          className={`
    text-sm
    ${config.descriptionClass}
  `}
        >
          {description}
        </p>
      </div>

      <div className="mt-auto h-1 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${
            status === "SELESAI"
              ? "w-full bg-[#2B6CB0]"
              : status === "AKTIF"
                ? "w-1/2 bg-[#38A169]"
                : "w-0 bg-gray-300"
          }`}
        />
      </div>
    </div>
  );
}
