import { MapPin, Zap, Clock } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";
import { NEXT_SESSION } from "../constants/courseData";

export default function NextSessionCard() {
  const { display, isFinished } = useCountdown(NEXT_SESSION.durationSeconds);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Sesi Berikutnya
          </p>
          <h3 className="text-base font-bold text-[#2B6CB0] leading-snug mb-3 truncate">
            {NEXT_SESSION.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-gray-400" />
              {NEXT_SESSION.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={13} className="text-gray-400" />
              Intensitas: {NEXT_SESSION.intensity}
            </span>
          </div>
        </div>

        {/* Countdown */}
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

      <button className="mt-4 w-max px-6 py-2 bg-[#ED8936] hover:bg-[#DD6B20] active:scale-95 transition-all text-white text-sm font-bold rounded-lg">
        LIHAT MODUL
      </button>
    </div>
  );
}