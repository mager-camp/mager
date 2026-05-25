import { Clock } from "lucide-react";

export default function NextSessionCard({
  title = "Anggar: Taktis Pertandingan",
  place = "Ruang Latihan Senjata",
  intensityType = "Intensitas Tinggi",
  minutesUntil = 45,
}) {
  return (
    <div className="bg-[var(--dashboard-secondary-bg)] rounded-sm p-5 flex flex-col justify-between shadow-sm h-full">
      <div>
        <div className="flex items-center gap-1.5 text-[#2B6CB0] text-sm font-bold mb-2">
          <Clock size={13} />
          <span>SESI BERIKUTNYA DI {minutesUntil}M</span>
        </div>
        <h3 className="text-xl font-bold text-[var(--text-dashboard)] leading-snug mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{place} - </p>
        <p className="text-sm text-gray-600">{intensityType}</p>
      </div>

      <button className="mt-4 w-full bg-[#ED8936] hover:bg-[#DD6B20] text-white text-sm font-semibold py-2 rounded-xs transition-colors duration-200">
        Mulai Pemanasan
      </button>
    </div>
  );
}