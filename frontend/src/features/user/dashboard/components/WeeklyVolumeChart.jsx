import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { MoreVertical } from "lucide-react";
import { useWeeklyProgress } from "../hooks/useDashboard";

function toISODate(input) {
  return new Date(input).toISOString().split("T")[0];
}

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));

    return {
      date: toISODate(d),
      day: d.toLocaleDateString("id-ID", { weekday: "short" }),
      workouts: 0,
    };
  });
}

function mergeWithData(days, apiData = []) {
  const map = Object.fromEntries(
    (apiData ?? []).map((d) => [toISODate(d.date), d.workouts]),
  );

  return days.map((d) => ({
    ...d,
    workouts: map[d.date] ?? 0,
  }));
}

function WeeklyVolumeChartSkeleton() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-6" />

      <div className="flex-1 flex items-end gap-3">
        {[60, 90, 50, 120, 80, 100, 70].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-200 rounded-t animate-pulse"
            style={{ height }}
          />
        ))}
      </div>
    </div>
  );
}

export default function WeeklyVolumeChart() {
  const { data, isLoading, isError } = useWeeklyProgress();

  const base = getLast7Days();
  const chartData = mergeWithData(base, data);
  const todayStr = toISODate(new Date());

  const TODAY = base.find((d) => d.date === todayStr)?.day ?? "";

  if (isLoading) {
    return (
      <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 h-full">
        <WeeklyVolumeChartSkeleton />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <h3 className="font-bold text-gray-900 text-lg">Volume Mingguan</h3>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        {isError ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            Gagal memuat data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
              <Tooltip />
              <Bar dataKey="workouts" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => (
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
        )}
      </div>
    </div>
  );
}
