import { Zap } from "lucide-react";
import { useTodaySchedules } from "../hooks/useDashboard";

function getDominantIntensity(schedules) {
  if (!schedules?.length) return null;
  const priority = { heavy: 3, medium: 2, light: 1 };
  return schedules.reduce((max, s) =>
    (priority[s.intensity] ?? 0) > (priority[max] ?? 0) ? s.intensity : max,
    schedules[0].intensity
  );
}

const INTENSITY_CONFIG = {
  null: {
    message: "Tidak ada latihan hari ini. Gunakan waktu ini untuk istirahat dan pemulihan.",
    readiness: 60,
  },
  light: {
    message: "Beban latihan hari ini ringan. Fokus pada teknik dan pemulihan aktif.",
    readiness: 75,
  },
  medium: {
    message: "Beban latihan Anda sudah optimal. Hari ini adalah hari dengan intensitas sedang.",
    readiness: 85,
  },
  heavy: {
    message: "Hari ini intensitas tinggi. Pastikan nutrisi dan hidrasi Anda sudah cukup.",
    readiness: 92,
  },
};

export default function WelcomeCard({ name = "Martin" }) {
  const { data: schedules = [], isLoading } = useTodaySchedules();

  const intensity = getDominantIntensity(schedules);
  const config    = INTENSITY_CONFIG[intensity] ?? INTENSITY_CONFIG[null];

  return (
    <div className="h-full bg-white rounded-sm p-6 flex items-center justify-between shadow-lg border border-gray-100">
      <div className="flex-1 pr-6">
        <h2 className="text-2xl font-bold text-[var(--text-dashboard)] mb-1">
          Siap beraksi, {name}.
        </h2>
        {isLoading ? (
          <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-[var(--text-primary)] text-sm leading-relaxed">
            {config.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-[auto_auto] grid-rows-2 gap-x-3 items-center flex-shrink-0">
        <div className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-widest text-right">
          Level <br /> Kesiapan
        </div>

        <div className="row-span-2 flex items-center justify-center w-15 h-full rounded-lg border-2 border-[#2B6CB0]">
          <Zap size={30} className="text-[#2B6CB0]" />
        </div>

        <div className="flex items-end justify-end gap-1">
          {isLoading ? (
            <div className="h-10 w-12 bg-gray-100 rounded animate-pulse" />
          ) : (
            <>
              <span className="text-4xl font-extrabold text-[var(--text-dashboard)]">
                {config.readiness}
              </span>
              <span className="text-2xl font-bold text-[var(--text-dashboard)] mb-1">%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}