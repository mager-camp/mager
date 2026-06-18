import { Users, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

function StatCard({ icon: Icon, iconBg, iconColor, label, value, isLoading }) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full relative overflow-hidden">
      <div className={`absolute right-3 top-3 w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center opacity-20`}>
        <Icon size={20} className={iconColor} />
      </div>

      <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
        {label}
      </p>

      {isLoading ? (
        <div className="w-10 h-6 bg-gray-200 animate-pulse rounded" />
      ) : (
        <p className="text-3xl font-black text-[var(--text-dashboard)]">{value}</p>
      )}
    </div>
  );
}

export default function ReadinessCards({ counts, isLoading }) {
  if (!counts) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        icon={Users}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        label="Total Atlet"
        value={counts.total}
        isLoading={isLoading}
      />

      <StatCard
        icon={CheckCircle}
        iconBg="bg-green-100"
        iconColor="text-green-600"
        label="Optimal"
        value={counts.optimal}
        isLoading={isLoading}
      />

      <StatCard
        icon={AlertTriangle}
        iconBg="bg-yellow-100"
        iconColor="text-yellow-600"
        label="Sedang"
        value={counts.sedang}
        isLoading={isLoading}
      />

      <StatCard
        icon={XCircle}
        iconBg="bg-red-100"
        iconColor="text-red-500"
        label="Rendah"
        value={counts.rendah}
        isLoading={isLoading}
      />
    </div>
  );
}