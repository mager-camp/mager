import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import { MACROCYCLE_INFO } from "../constants/calendarData";

export default function CalendarHeader({
  monthName,
  year,
  onPrev,
  onNext,
  onToday,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-4 flex-shrink-0">
      {/* Kiri: macrocycle info + bulan */}
      <div>
        <p className="text-[10px] font-bold text-text-primary tracking-widest uppercase mb-1">
          {MACROCYCLE_INFO.cycle} // <br/> {MACROCYCLE_INFO.phase}
        </p>
        <h2 className="text-4xl font-black text-[var(--text-dashboard)] leading-none">
          {monthName}
          <br />
          <span className="text-3xl font-extrabold text-[var(--text-dashboard)]">{year}</span>
        </h2>
      </div>

      {/* Kanan: kontrol navigasi */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <button
          onClick={onToday}
          className="text-xs font-semibold px-3 py-1.5 rounded border-2 border-border text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Hari Ini
        </button>

        {/* View toggle */}
        <div className="hidden md:flex items-center border-2 border-border rounded overflow-hidden">
          <button className="p-1.5 bg-[#2B6CB0] text-white">
            <LayoutGrid size={14} />
          </button>
          <button className="p-1.5 text-gray-400 hover:bg-gray-50 transition-colors">
            <List size={14} />
          </button>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-1 overflow-hidden">
          <button
            onClick={onPrev}
            className="p-1.5 text-gray-500 border-2 border-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={onNext}
            className="p-1.5 text-gray-500 border-2 border-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}