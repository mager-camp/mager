import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Zap } from "lucide-react";
import { useAthletes } from "../hooks/useAthletes";
import ReadinessCards from "./ReadinessCards";

const READINESS_LEVELS = [
  { label: "Semua", value: "all" },
  { label: "Optimal", value: "Optimal" },
  { label: "Sedang", value: "Sedang" },
  { label: "Rendah", value: "Rendah" },
  { label: "Belum ada data", value: "null" },
];

const LEVEL_CONFIG = {
  Optimal: { badge: "bg-green-100 text-green-700", bar: "bg-green-500" },
  Sedang: { badge: "bg-yellow-100 text-yellow-700", bar: "bg-yellow-400" },
  Rendah: { badge: "bg-red-100 text-red-600", bar: "bg-red-400" },
};

function TableSkeleton() {
  return Array.from({ length: 6 }).map((_, i) => (
    <tr key={i} className="border-t border-gray-100 animate-pulse">
      <td className="py-3 pr-4">
        <div className="w-32 h-3 bg-gray-200 rounded" />
      </td>
      <td className="py-3 pr-4">
        <div className="w-14 h-4 bg-gray-200 rounded" />
      </td>
      <td className="py-3 pr-4">
        <div className="w-20 h-3 bg-gray-200 rounded" />
      </td>
      <td className="py-3 pr-4">
        <div className="w-16 h-5 bg-gray-200 rounded-full" />
      </td>
      <td className="py-3 pr-4">
        <div className="w-24 h-3 bg-gray-200 rounded" />
      </td>
    </tr>
  ));
}

export default function AthleteTable() {
  const { data: athletes = [], isLoading } = useAthletes();

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortDir, setSortDir] = useState("desc");

  const counts = useMemo(
    () => ({
      total: athletes.length,
      optimal: athletes.filter((a) => a.readiness?.level === "Optimal").length,
      sedang: athletes.filter((a) => a.readiness?.level === "Sedang").length,
      rendah: athletes.filter((a) => a.readiness?.level === "Rendah").length,
    }),
    [athletes],
  );

  const filtered = useMemo(() => {
    return athletes
      .filter((a) => {
        const matchSearch =
          a.fullName.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase());

        const matchLevel =
          levelFilter === "all"
            ? true
            : levelFilter === "null"
              ? a.readiness === null
              : a.readiness?.level === levelFilter;

        return matchSearch && matchLevel;
      })
      .sort((a, b) => {
        const sa = a.readiness?.score ?? -1;
        const sb = b.readiness?.score ?? -1;
        return sortDir === "desc" ? sb - sa : sa - sb;
      });
  }, [athletes, search, levelFilter, sortDir]);

  return (
    <div className="flex flex-col gap-5 lg:flex-1 lg:min-h-0 min-w-0"> 
      {/* CARDS */}
      <ReadinessCards counts={counts} isLoading={isLoading} />

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-primary"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full pl-9 pr-3 py-2 text-sm border bg-white border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {READINESS_LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => setLevelFilter(lvl.value)}
              className={`px-3 py-2 text-[11px] font-bold rounded-sm border transition ${
                levelFilter === lvl.value
                  ? "bg-[#2B6CB0] text-white border-[#2B6CB0]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#2B6CB0] hover:text-[#2B6CB0]"
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white border p-5 border-gray-100 rounded-sm shadow-sm flex flex-col lg:flex-1 lg:h-full lg:overflow-hidden min-w-0">
        <div className="overflow-auto lg:min-h-0 min-w-0">
          <div>
            <table className=" w-full border-collapse">
              {/* HEADER */}
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-gray-100 ">
                  <th className="text-left text-[12px] font-bold text-text-primary uppercase tracking-widest py-3 pr-4">
                    Atlet
                  </th>

                  <th className="text-left text-[12px] font-bold text-text-primary uppercase tracking-widest py-3 pr-4">
                    Status
                  </th>

                  <th className="text-left text-[12px] font-bold text-text-primary uppercase tracking-widest py-3 pr-4">
                    <button
                      onClick={() =>
                        setSortDir((d) => (d === "desc" ? "asc" : "desc"))
                      }
                      className="flex items-center gap-1 hover:text-[#2B6CB0] transition"
                    >
                      READINESS
                      {sortDir === "desc" ? (
                        <ChevronDown size={11} />
                      ) : (
                        <ChevronUp size={11} />
                      )}
                    </button>
                  </th>

                  <th className="text-left text-[12px] font-bold text-text-primary uppercase tracking-widest py-3 pr-4">
                    Level
                  </th>

                  <th className="text-left text-[12px] font-bold text-text-primary uppercase tracking-widest py-3">
                    Terakhir
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-gray-50 ">
                {isLoading ? (
                  <TableSkeleton />
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-300">
                        <Zap size={24} />
                        <p className="text-sm font-bold text-text-primary">
                          Tidak ada atlet ditemukan
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((a) => {
                    const cfg = a.readiness
                      ? LEVEL_CONFIG[a.readiness.level]
                      : null;
                    const score = a.readiness?.score ?? null;

                    return (
                      <tr
                        key={a.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Atlet */}
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            {a.profilePicture ? (
                              <img
                                src={a.profilePicture}
                                alt={a.fullName}
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#EBF8FF] border border-[#90CDF4] flex items-center justify-center shrink-0">
                                <span className="text-sm font-black text-[#2B6CB0]">
                                  {a.fullName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {a.fullName}
                              </p>
                              <p className="text-[11px] text-text-primary truncate">
                                {a.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 pr-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-sm ${
                              a.isPremium
                                ? "bg-[#ED8936] text-white"
                                : "bg-gray-100 text-text-primary"
                            }`}
                          >
                            {a.isPremium ? "PREMIUM" : "FREE"}
                          </span>
                        </td>

                        {/* Readiness */}
                        <td className="py-4 pr-8 min-w-0">
                          {score !== null ? (
                            <div className="relative group flex-1">
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${cfg?.bar}`}
                                  style={{ width: `${score}%` }}
                                />
                              </div>

                              {/* Tooltip */}
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded">
                                  Score: {score}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>

                        {/* Level */}
                        <td className="py-4 pr-4">
                          {cfg ? (
                            <span
                              className={`text-[10px] font-bold px-2 py-1 rounded-sm ${cfg.badge}`}
                            >
                              {a.readiness.level}
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-300">
                              N/A
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-4 text-xs text-text-primary whitespace-nowrap">
                          {a.readiness?.calculatedAt
                            ? new Date(a.readiness.calculatedAt).toLocaleString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "—"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        {!isLoading && filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-[11px] text-text-primary">
              Menampilkan{" "}
              <span className="font-bold text-gray-600">{filtered.length}</span>{" "}
              dari{" "}
              <span className="font-bold text-gray-600">{athletes.length}</span>{" "}
              atlet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
