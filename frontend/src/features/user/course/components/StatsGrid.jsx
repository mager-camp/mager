import { TrendingUp } from "lucide-react";
import { STATS } from "../constants/courseData";

function VO2MaxChart({ trend, current }) {
  const max = Math.max(...trend);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          Trend VO2 Max
        </p>
        <TrendingUp size={14} className="text-[#2B6CB0]" />
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 flex-1 min-h-0">
        {trend.map((val, i) => {
          const isLast = i === trend.length - 1;
          const height = `${(val / max) * 100}%`;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end gap-1 h-full"
            >
              {isLast && (
                <span className="text-[10px] font-bold text-[#2B6CB0]">
                  {val}
                </span>
              )}
              <div
                className={`w-full rounded-t-sm transition-all ${
                  isLast ? "bg-[#2B6CB0]" : "bg-[#BEE3F8]"
                }`}
                style={{ height }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetricItem({ label, value, unit }) {
  return (
    <div className="flex flex-col justify-start">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-tight">
        {label}
      </p>

      <p className="text-2xl font-black text-gray-900 mt-2">
        {value}
        <span className="text-sm font-semibold text-gray-400 ml-1">{unit}</span>
      </p>
    </div>
  );
}

export default function StatsGrid() {
  const { vo2max, muatanMingguan, skorKualitasTidur, dekatJantung, hrv } =
    STATS;

  return (
    <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
      {/* kiri */}
      <div className="row-span-2">
        <VO2MaxChart trend={vo2max.trend} current={vo2max.current} />
      </div>

      {/* kanan jadi 1 card besar */}
      <div className="bg-white rounded-xl border row-span-2 border-gray-100 shadow-sm p-4">
        <div className="grid grid-cols-2  gap-4 h-full">
          <MetricItem
            label="Muatan Mingguan"
            value={muatanMingguan.value}
            unit={muatanMingguan.unit}
          />

          <MetricItem
            label="Skor Kualitas Tidur"
            value={skorKualitasTidur.value}
            unit={skorKualitasTidur.unit}
          />

          <MetricItem
            label="Detak Jantung Istirahat"
            value={dekatJantung.value}
            unit={dekatJantung.unit}
          />

          <MetricItem label="HRV" value={hrv.value} unit={hrv.unit} />
        </div>
      </div>
    </div>
  );
}
