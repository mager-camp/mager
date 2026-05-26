import { TrendingUp, TrendingDown, BarChart2, Activity } from "lucide-react";

function StatCard({ icon: Icon, iconBg, label, children }) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Watermark icon */}
      <div className={`absolute right-3 top-3 w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center opacity-20`}>
        <Icon size={20} className="text-gray-600" />
      </div>
      <p className="text-sm  font-bold text-[var(--text-dashboard)] uppercase tracking-widest mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function SummaryCards({ stats }) {
  if (!stats) return null;
  const { volumeLatihan, skorKinerja, efisiensiPemulihan } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-shrink-0">
      {/* Volume */}
      <StatCard icon={BarChart2} iconBg="bg-blue-100" label="Jumlah Total Volume Latihan">
        <div>
          <p className="text-3xl font-black text-text-primary">
            {volumeLatihan.value}
            <span className="text-base font-bold text-gray-400 ml-1">{volumeLatihan.unit}</span>
          </p>
          {volumeLatihan.up !== null && (
            <p className={`text-xs mt-1.5 flex items-center gap-1 font-semibold ${
              volumeLatihan.up ? "text-green-500" : "text-red-400"
            }`}>
              {volumeLatihan.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {volumeLatihan.change}
            </p>
          )}
          {volumeLatihan.up === null && (
            <p className="text-xs mt-1.5 text-gray-400">{volumeLatihan.change}</p>
          )}
        </div>
      </StatCard>

      {/* Skor Kinerja */}
      <StatCard icon={Activity} iconBg="bg-green-100" label="Skor Kinerja Rata-Rata">
        <div>
          <p className="text-3xl font-black text-gray-600">
            {skorKinerja.value}
            <span className="text-base font-bold text-gray-400 ml-0.5">/ {skorKinerja.outOf}</span>
          </p>
          <p className="text-xs mt-1.5 text-gray-400 font-medium">{skorKinerja.label}</p>
        </div>
      </StatCard>

      {/* Efisiensi Pemulihan */}
      <StatCard icon={TrendingUp} iconBg="bg-purple-100" label="Efisiensi Pemulihan">
        <div>
          <p className="text-3xl font-black text-gray-500">
            {efisiensiPemulihan.value}
            <span className="text-base font-bold text-gray-400 ml-0.5">{efisiensiPemulihan.unit}</span>
          </p>
          {efisiensiPemulihan.up !== null ? (
            <p className="text-xs mt-1.5 text-green-500 font-semibold flex items-center gap-1">
              <TrendingUp size={12} />
              {efisiensiPemulihan.label}
            </p>
          ) : (
            <p className="text-xs mt-1.5 text-gray-400">{efisiensiPemulihan.label}</p>
          )}
        </div>
      </StatCard>
    </div>
  );
}