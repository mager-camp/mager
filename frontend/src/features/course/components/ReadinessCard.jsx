import { Zap } from "lucide-react";
import { useReadiness } from "@/features/readiness/hooks/useReadiness";

export default function ReadinessCard() {
  const { data, isLoading } = useReadiness();

  if (isLoading) {
    return <div className="bg-[#1A365D] rounded p-5 h-full animate-pulse" />;
  }

  return (
    <div className="bg-[#1A365D] rounded p-5 flex items-center justify-between h-full">
      <div>
        <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">
          Kesiapan Latihan
        </p>
        <p className="text-4xl font-black text-white leading-none">
          {data.score}
          <span className="text-2xl font-bold text-blue-200">%</span>
        </p>
        <p className="text-xs text-blue-300 mt-1">{data.level}</p>
      </div>
      <div className="w-12 h-12 rounded-xl border-2 border-blue-400 flex items-center justify-center">
        <Zap size={24} className="text-blue-300" />
      </div>
    </div>
  );
}
