import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MoreVertical } from "lucide-react";

const weeklyData = [
  { day: "SENIN", volume: 55 },
  { day: "SELASA", volume: 75 },
  { day: "RABU", volume: 88 },
  { day: "KAMIS", volume: 100 },
  { day: "JUMAT", volume: 40 },
  { day: "SABTU", volume: 65 },
  { day: "MINGGU", volume: 80 },
];

const TODAY = "KAMIS";

export default function WeeklyVolumeChart() {
  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <h3 className="font-bold text-gray-900 text-lg">Volume Mingguan</h3>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* flex-1 + min-h-0 biar ResponsiveContainer bisa ngitung tinggi dari parent */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            barCategoryGap="2%"
            margin={{ top: 4, right: 0, left: -30, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#F0F4F8" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={payload.value === TODAY ? "700" : "400"}
                  fill={payload.value === TODAY ? "#2B6CB0" : "#A0AEC0"}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis hide />
            <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
              {weeklyData.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={
                    entry.day === TODAY
                      ? "var(--chart-today)"
                      : "var(--chart-another)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
