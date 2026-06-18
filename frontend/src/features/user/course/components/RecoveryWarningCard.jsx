import { AlertTriangle } from "lucide-react";
import { useTodaySchedules } from "@/features/user/dashboard/hooks/useDashboard";

const RECOVERY_MESSAGES = {
  RENANG: "Tingkat hidrasi menurun setelah berenang. Minumlah 500 ml larutan elektrolit sebelum sesi berikutnya.",
  LARI: "Otot kaki membutuhkan pemulihan setelah lari. Lakukan peregangan 10 menit dan konsumsi protein dalam 30 menit.",
  ANGGAR: "Pergelangan tangan dan lengan tegang setelah anggar. Lakukan ice pack 15 menit pada area yang terasa pegal.",
  TEMBAK: "Konsentrasi menurun setelah sesi tembak. Istirahat mata 20 menit dan hindari layar sebelum sesi berikutnya.",
  OBSTACLE: "Sendi dan otot inti terkuras setelah obstacle. Konsumsi karbohidrat kompleks dan istirahat minimal 2 jam.",
};

const DEFAULT_MESSAGE = "Pantau kondisi tubuh Anda setelah sesi latihan. Pastikan hidrasi dan istirahat cukup sebelum sesi berikutnya.";

export default function RecoveryWarningCard() {
  const { data: schedules = [], isLoading } = useTodaySchedules();

  const lastCompleted = schedules
    .filter((s) => s.status === "completed")
    .sort((a, b) => new Date(b.workoutLogs?.[0]?.completedAt ?? 0) - new Date(a.workoutLogs?.[0]?.completedAt ?? 0))[0];

  const activityName = lastCompleted?.activity?.name;
  const message = RECOVERY_MESSAGES[activityName] ?? DEFAULT_MESSAGE;

  if (isLoading) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4 flex gap-3 h-full animate-pulse">
        <div className="w-4 h-4 rounded bg-red-200 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="w-32 h-3 rounded bg-red-200" />
          <div className="w-full h-3 rounded bg-red-200" />
          <div className="w-4/5 h-3 rounded bg-red-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded p-4 flex gap-3 h-full">
      <div className="shrink-0 mt-0.5">
        <AlertTriangle size={16} className="text-red-500" />
      </div>
      <div>
        <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-1">
          Peringatan Pemulihan
          {activityName && (
            <span className="ml-1 normal-case font-normal text-red-400">
              · setelah {activityName.toLowerCase()}
            </span>
          )}
        </p>
        <p className="text-xs text-red-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}