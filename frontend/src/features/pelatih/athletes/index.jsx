import { useState, useMemo } from 'react';
import { Search, Users, Zap } from 'lucide-react';
import { useAthletes } from './hooks/useAthletes';

const READINESS_LEVELS = [
  { label: 'Semua', value: 'all' },
  { label: 'Optimal', value: 'Optimal' },
  { label: 'Sedang', value: 'Sedang' },
  { label: 'Rendah', value: 'Rendah' },
  { label: 'Belum ada data', value: 'null' },
];

const LEVEL_CONFIG = {
  Optimal: { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500', dot: 'bg-green-400' },
  Sedang:  { badge: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-400', dot: 'bg-yellow-400' },
  Rendah:  { badge: 'bg-red-100 text-red-600', bar: 'bg-red-400', dot: 'bg-red-400' },
};

function AthleteCardSkeleton() {
  return (
    <div className="bg-white rounded border border-gray-100 p-4 flex items-center gap-4 animate-pulse">
      <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="w-1/2 h-4 rounded bg-gray-200" />
        <div className="w-1/3 h-3 rounded bg-gray-200" />
        <div className="w-full h-2 rounded bg-gray-100 mt-1" />
      </div>
      <div className="w-14 h-6 rounded-full bg-gray-200 shrink-0" />
    </div>
  );
}

function AthleteCard({ athlete }) {
  const cfg = athlete.readiness ? LEVEL_CONFIG[athlete.readiness.level] : null;
  const score = athlete.readiness?.score ?? null;

  return (
    <div className="bg-white rounded border border-gray-100 shadow-sm p-4 flex items-center gap-4">
      {/* Avatar */}
      <div className="relative shrink-0">
        {athlete.profilePicture ? (
          <img
            src={athlete.profilePicture}
            alt={athlete.fullName}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#EBF8FF] border border-[#90CDF4] flex items-center justify-center">
            <span className="text-sm font-black text-[#2B6CB0]">
              {athlete.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {cfg && (
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${cfg.dot}`} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-900 truncate">{athlete.fullName}</p>
          {athlete.isPremium && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#ED8936] text-white shrink-0">
              PREMIUM
            </span>
          )}
        </div>
        <p className="text-[11px] text-gray-400 truncate">{athlete.email}</p>

        {/* Progress bar */}
        <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          {score !== null ? (
            <div
              className={`h-full rounded-full transition-all ${cfg?.bar ?? 'bg-gray-300'}`}
              style={{ width: `${score}%` }}
            />
          ) : (
            <div className="h-full rounded-full bg-gray-200 w-0" />
          )}
        </div>
      </div>

      {/* Score + badge */}
      <div className="shrink-0 flex flex-col items-end gap-1.5">
        {score !== null ? (
          <>
            <span className="text-lg font-black text-gray-800 leading-none">{score}</span>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${cfg?.badge}`}>
              {athlete.readiness.level}
            </span>
          </>
        ) : (
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
            BELUM ADA DATA
          </span>
        )}
      </div>
    </div>
  );
}

export default function AthletesPage() {
  const { data: athletes = [], isLoading } = useAthletes();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const filtered = useMemo(() => {
    return athletes.filter((a) => {
      const matchSearch = a.fullName.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());

      const matchLevel = levelFilter === 'all'
        ? true
        : levelFilter === 'null'
          ? a.readiness === null
          : a.readiness?.level === levelFilter;

      return matchSearch && matchLevel;
    });
  }, [athletes, search, levelFilter]);

  const counts = useMemo(() => ({
    total:   athletes.length,
    optimal: athletes.filter((a) => a.readiness?.level === 'Optimal').length,
    sedang:  athletes.filter((a) => a.readiness?.level === 'Sedang').length,
    rendah:  athletes.filter((a) => a.readiness?.level === 'Rendah').length,
  }), [athletes]);

  return (
    <div className="p-10 md:p-12 flex flex-col gap-5 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users size={28} className="text-[#ED8936]" />
        <div>
          <h1 className="text-xl font-black text-[var(--text-dashboard)]">Daftar Atlet</h1>
          <p className="text-sm text-gray-400">Monitor kesiapan latihan seluruh atlet</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Atlet', value: counts.total, color: 'text-[#2B6CB0]', bg: 'bg-[#EBF8FF]' },
          { label: 'Optimal', value: counts.optimal, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Sedang', value: counts.sedang, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Rendah', value: counts.rendah, color: 'text-red-500', bg: 'bg-red-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded border border-gray-100 p-3`}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau email atlet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {READINESS_LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => setLevelFilter(lvl.value)}
              className={`px-3 py-2 text-[11px] font-black rounded transition-all ${
                levelFilter === lvl.value
                  ? 'bg-[#2B6CB0] text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-[#2B6CB0] hover:text-[#2B6CB0]'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <AthleteCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Zap size={32} className="mb-2 opacity-30" />
            <p className="text-sm font-bold">Tidak ada atlet ditemukan</p>
          </div>
        ) : (
          filtered.map((a) => <AthleteCard key={a.id} athlete={a} />)
        )}
      </div>
    </div>
  );
}