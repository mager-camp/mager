import { CheckCircle, Clock, Flame } from "lucide-react";

function StatCard({ icon: Icon, iconBg, iconColor, label, children }) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full relative overflow-hidden">
      <div className={`absolute right-3 top-3 w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center opacity-20`}>
        <Icon size={20} className={iconColor} />
      </div>
      <p className="text-sm font-bold text-[var(--text-dashboard)] uppercase tracking-widest mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function SummaryCards({ stats, isLoading }) {
if (isLoading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-shrink-0">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-sm border border-gray-100 shadow-sm p-5 relative overflow-hidden"
        >
          {/* icon */}
          <div className="absolute right-3 top-3 w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />

          {/* label */}
          <div className="h-3 w-28 bg-gray-100 rounded animate-pulse mb-5" />

          {/* value */}
          <div className="h-8 w-24 bg-gray-100 rounded animate-pulse mb-2" />

          {/* subtitle */}
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

  if (!stats) return null;

  const { totalWorkout, totalDurasi, aktivitasUtama } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-shrink-0">
      {/* Total Workout Selesai */}
      <StatCard icon={CheckCircle} iconBg="bg-blue-100" iconColor="text-blue-600" label="Total Workout Selesai">
        <div>
          <p className="text-3xl font-black text-[var(--text-dashboard)]">
            {totalWorkout.value}
            <span className="text-base font-bold text-gray-400 ml-1">sesi</span>
          </p>
          <p className="text-xs mt-1.5 text-gray-400 font-medium">{totalWorkout.label}</p>
        </div>
      </StatCard>

      {/* Total Durasi */}
      <StatCard icon={Clock} iconBg="bg-green-100" iconColor="text-green-600" label="Total Durasi Latihan">
        <div>
          <p className="text-3xl font-black text-[var(--text-dashboard)]">
            {totalDurasi.value}
          </p>
          <p className="text-xs mt-1.5 text-gray-400 font-medium">{totalDurasi.label}</p>
        </div>
      </StatCard>

      {/* Aktivitas Terbanyak */}
      <StatCard icon={Flame} iconBg="bg-orange-100" iconColor="text-orange-500" label="Aktivitas Terbanyak">
        <div>
          <p className="text-3xl font-black text-[var(--text-dashboard)] capitalize">
            {aktivitasUtama.value}
          </p>
          <p className="text-xs mt-1.5 text-gray-400 font-medium">{aktivitasUtama.label}</p>
        </div>
      </StatCard>
    </div>
  );
}