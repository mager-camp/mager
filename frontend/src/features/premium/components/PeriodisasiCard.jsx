import { Leaf, Snowflake, Activity, TrendingUp } from "lucide-react";
import { PERIODISASI_ITEMS } from "../constants/premiumData";

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
  return (
    <div className="bg-background shadow-md rounded p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={32} className="text-[#ED8936]" />
            <h2 className="text-xl font-black text-[var(--text-dashboard)]">Periodisasi Profesional</h2>
          </div>
          <p className="text-sm text-text-primary leading-relaxed ">
            Penjadwalan pemulihan yang dioptimalkan berdasarkan blok latihan intensitas tinggi Anda baru-baru ini.
          </p>
        </div>
        <span className="shrink-0 text-[11px] font-black px-2.5 py-1 rounded bg-[#ED8936] text-white tracking-wider">
          PROTOKOL AKTIF
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {PERIODISASI_ITEMS.map((item) => (
          <ScheduleItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}