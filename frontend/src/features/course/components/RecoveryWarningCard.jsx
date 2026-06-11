import { AlertTriangle } from "lucide-react";
import { RECOVERY_WARNING } from "../constants/courseData";

export default function RecoveryWarningCard() {
  return (
    <div className="bg-red-50 border border-red-200 rounded p-4 flex gap-3 h-full">
      <div className="shrink-0 mt-0.5">
        <AlertTriangle size={16} className="text-red-500" />
      </div>
      <div>
        <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-1">
          Peringatan Pemulihan
        </p>
        <p className="text-xs text-red-700 leading-relaxed">
          {RECOVERY_WARNING.message}
        </p>
      </div>
    </div>
  );
}