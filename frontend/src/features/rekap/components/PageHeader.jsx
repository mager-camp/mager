import { TIME_FILTERS } from "../constants/rekapLatihanData";

export default function PageHeader({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 className="text-2xl font-black text-[var(--text-dashboard)] leading-text uppercase tracking-tight">
          Ringkasan Kinerja & Ekspor
        </h1>
        <p className="text-sm text-text-primary mt-1 max-w-sm leading-relaxed">
          Tinjau dan ekstrak data pelatihan Anda untuk analisis eksternal atau pengarsipan mendalam.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex items-center bg-[#2B6CB0] rounded-sm overflow-hidden shrink-0 self-start sm:self-auto">
        {TIME_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap ${
              activeFilter === f
                ? "bg-[#1A365D] text-white"
                : "text-blue-200 hover:text-white hover:bg-[#2C5282]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}