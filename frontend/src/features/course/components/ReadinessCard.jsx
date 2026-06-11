import { Zap } from "lucide-react";
import { READINESS } from "../constants/courseData";
 
export default function ReadinessCard() {
  const score = READINESS.score;
  const level = score >= 80 ? "Optimal" : score >= 60 ? "Sedang" : "Rendah";
 
  return (
    <div className="bg-[#1A365D] rounded p-5 flex items-center justify-between h-full">
      <div>
        <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">
          Kesiapan Latihan
        </p>
        <p className="text-4xl font-black text-white leading-none">
          {score}{" "}
          <span className="text-2xl font-bold text-blue-200">%</span>
        </p>
        <p className="text-xs text-blue-300 mt-1">{level}</p>
      </div>
      <div className="w-12 h-12 rounded-xl border-2 border-blue-400 flex items-center justify-center">
        <Zap size={24} className="text-blue-300" />
      </div>
    </div>
  );
}
 