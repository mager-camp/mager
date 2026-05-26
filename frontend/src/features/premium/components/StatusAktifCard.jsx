import { Award } from "lucide-react";
import { STATUS_AKTIF } from "../constants/premiumData";

export default function StatusAktifCard() {
  const { level, nextLevel, progress, desc } = STATUS_AKTIF;

  return (
    <div className="bg-gradient-to-br from-[#2B6CB0] via-[#1A4A7A] to-[#1A365D] rounded p-5 flex flex-col items-center gap-5 relative overflow-hidden justify-center">
      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />

      <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center relative z-10">
        <Award size={36} className="text-[#ED8936]" />
      </div>

      <div className="text-center relative z-10">
        <p className="text-xl font-black text-white uppercase tracking-widest">Status Aktif</p>
        <p className="text-xs text-blue-200 mt-2 leading-relaxed">{desc}</p>
      </div>

      <div className="w-full relative z-10">
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] font-black text-[#ED8936] tracking-widest">{level}</span>
          <span className="text-[10px] font-black text-blue-300 tracking-widest">{nextLevel}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ED8936] to-[#F6AD55] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}