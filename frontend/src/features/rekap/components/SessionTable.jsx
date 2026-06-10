import { BowArrow, Swords, Construction, Zap } from "lucide-react";
import { FaRunning } from "react-icons/fa";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import { INTENSITY_COLOR } from "../constants/rekapLatihanData";

const ICON_MAP = {
  RENANG: PiPersonSimpleSwimFill,
  LARI: FaRunning,
  TEMBAK: BowArrow,
  ANGGAR: Swords,
  OBSTACLE: Construction,
};

const HEADERS = ["Tipe Aktivitas", "Tanggal", "Durasi", "Intensitas", "Status"];

function IntensityBar({ level }) {
  const color = INTENSITY_COLOR[level] ?? "bg-gray-300";
  const width =
    {
      Tinggi: "w-16",
      Sedang: "w-10",
      Rendah: "w-7",
      Ringan: "w-5",
    }[level] ?? "w-5";

  return (
    <div className="flex items-center gap-2">
      <div className={`h-1.5 rounded-full ${color} ${width}`} />
      {/* <span className="text-xs text-gray-500">{level}</span> */}
    </div>
  );
}

export default function SessionTable({ sessions, isLoading }) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-5 flex flex-col h-full overflow-hidden">
      {/* Title row */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-lg font-black text-[var(--text-dashboard)] uppercase tracking-wide">
          Sesi Terbaru
        </h2>
        {/* <button className="text-sm font-bold text-[#ED8936] hover:text-[#DD6B20] transition-colors">
          Lihat Semua
        </button> */}
      </div>

      {isLoading ? (
        <div className="flex-1 min-h-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-bold text-text-primary uppercase tracking-widest pb-2 pr-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gray-100 animate-pulse" />
                      <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
                    </div>
                  </td>

                  <td className="py-3 pr-4">
                    <div className="h-4 w-20 rounded bg-gray-100 animate-pulse" />
                  </td>

                  <td className="py-3 pr-4">
                    <div className="h-4 w-16 rounded bg-gray-100 animate-pulse" />
                  </td>

                  <td className="py-3 pr-4">
                    <div className="h-2 w-16 rounded-full bg-gray-100 animate-pulse" />
                  </td>

                  <td className="py-3">
                    <div className="h-6 w-20 rounded-full bg-gray-100 animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : sessions.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
          Pilih rentang tanggal untuk melihat sesi.
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-bold text-text-primary uppercase tracking-widest pb-2 pr-4 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sessions.map((s) => {
                const Icon = ICON_MAP[s.title] ?? Zap;
                return (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    {/* Tipe Aktivitas */}
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#EBF8FF] flex items-center justify-center shrink-0">
                          <Icon size={12} className="text-[#2B6CB0]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                          {s.title}
                        </span>
                      </div>
                    </td>

                    {/* Tanggal */}
                    <td className="py-3 pr-4 text-sm text-gray-500 whitespace-nowrap">
                      {s.tanggal}
                    </td>

                    {/* Durasi */}
                    <td className="py-3 pr-4 text-sm text-gray-600 whitespace-nowrap">
                      {s.durasi}
                    </td>

                    {/* Intensitas */}
                    <td className="py-3 pr-4">
                      <IntensityBar level={s.intensitas} />
                    </td>

                    {/* Status */}
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-sm text-[11px] font-medium bg-[#2B6CB0] text-white whitespace-nowrap">
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
