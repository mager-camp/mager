import { Leaf, Snowflake, Activity, TrendingUp, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePremiumStatus, usePeriodisasi } from "../hooks/usePremium";

const ICON_MAP = {
  leaf:      Leaf,
  snowflake: Snowflake,
  activity:  Activity,
};

function ScheduleItem({ item }) {
  const Icon = ICON_MAP[item.icon] ?? Activity;
  return (
    <div className={`flex items-center justify-between gap-3 rounded px-4 py-3 ${
      item.highlight ? "bg-[#2C4A6E]" : "bg-[#2b6bb071]"
    }`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          item.highlight ? "bg-white/20" : "bg-white/10"
        }`}>
          <Icon size={15} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-md font-bold text-white leading-tight">{item.title}</p>
          <p className="text-[11px] text-blue-200 mt-0.5 truncate">{item.desc}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-black text-white whitespace-nowrap">{item.hari}</p>
        <p className="text-[11px] text-blue-200">{item.waktu}</p>
      </div>
    </div>
  );
}

export default function PeriodisasiCard() {
  const navigate = useNavigate();
  const { data: statusData, isLoading: isStatusLoading } = usePremiumStatus();
  const isPremium = statusData?.isPremium;

  const { data: items = [], isLoading: isItemsLoading } = usePeriodisasi(isPremium);

  const isLoading = isStatusLoading || (isPremium && isItemsLoading);

  return (
    <div className={`rounded p-5 relative overflow-hidden ${
      isPremium ? "bg-background shadow-md" : "bg-gray-200"
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={32} className={isPremium ? "text-[#ED8936]" : "text-gray-400"} />
            <h2 className={`text-xl font-black ${isPremium ? "text-[var(--text-dashboard)]" : "text-gray-500"}`}>
              Periodisasi Profesional
            </h2>
          </div>
          <p className={`text-sm leading-relaxed ${isPremium ? "text-text-primary" : "text-gray-400"}`}>
            Penjadwalan pemulihan yang dioptimalkan berdasarkan blok latihan intensitas tinggi Anda baru-baru ini.
          </p>
        </div>
        {isPremium && (
          <span className="shrink-0 text-[11px] font-black px-2.5 py-1 rounded bg-[#ED8936] text-white tracking-wider">
            PROTOKOL AKTIF
          </span>
        )}
      </div>

      {/* Content */}
      {!isPremium ? (
        <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <Lock size={28} className="text-gray-400" />
          <p className="text-sm font-bold text-gray-500 max-w-xs">
            Aktifkan Premium untuk mendapatkan jadwal pemulihan otomatis setelah setiap sesi latihan.
          </p>
          <button
            onClick={() => navigate("/user/payment")}
            className="px-5 py-2 rounded bg-[#ED8936] hover:bg-[#DD6B20] active:scale-[0.98] transition-all text-white text-xs font-black tracking-wider"
          >
            AKTIFKAN PREMIUM
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-2.5">
          {[1, 2].map((i) => (
            <div key={i} className="h-14 bg-white/10 rounded animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-blue-200">
            Belum ada jadwal pemulihan. Selesaikan sesi latihan untuk mendapatkan rekomendasi otomatis.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <ScheduleItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}