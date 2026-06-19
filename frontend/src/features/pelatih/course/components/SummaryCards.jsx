import { CheckCircle, Clock, Flame } from "lucide-react";

function StatCard({ icon: Icon, iconBg, iconColor, label, children }) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full relative overflow-hidden">
      <div
        className={`absolute right-3 top-3 w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center opacity-20`}
      >
        <Icon size={20} className={iconColor} />
      </div>
      <p className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function SummaryCards({
  stats,
  isLoading,
  totalFreeCourse = 0,
  totalPremiumCourse = 0,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-shrink-0">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-sm border p-5 animate-pulse h-24"
          />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const { totalAtlet, totalCourse, totalSchedule } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-shrink-0">
      <StatCard
        icon={CheckCircle}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        label="Total Course"
      >
        <p className="text-3xl text-[var(--text-dashboard)] font-black">
          {totalCourse}
        </p>
        <p className="text-xs text-gray-400 mt-1">semua course</p>
      </StatCard>

      <StatCard
        icon={Clock}
        iconBg="bg-green-100"
        iconColor="text-green-600"
        label="Course Free"
      >
        <p className="text-3xl text-[var(--text-dashboard)] font-black">
          {totalFreeCourse}
        </p>
        <p className="text-xs text-gray-400 mt-1">course gratis</p>
      </StatCard>

      <StatCard
        icon={Flame}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        label="Course Premium"
      >
        <p className="text-3xl text-[var(--text-dashboard)] font-black">
          {totalPremiumCourse}
        </p>
        <p className="text-xs text-gray-400 mt-1">course premium</p>
      </StatCard>
    </div>
  );
}
