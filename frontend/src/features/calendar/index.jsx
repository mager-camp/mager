import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import AddProgramPanel from "./components/AddProgramPanel";
import { useCalendar } from "./hooks/useCalendar";

export default function CalendarPage() {
  const {
    year,
    monthName,
    days,
    eventsByDate,
    addEvent,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    todayStr,
  } = useCalendar();

  return (

      <div className="p-4 md:p-6 h-full flex gap-4 overflow-hidden">

        {/* Kolom kiri: kalender */}
        <div className="flex-1 min-w-0 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col overflow-hidden">
          <CalendarHeader
            monthName={monthName}
            year={year}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
          />
          <CalendarGrid
            days={days}
            eventsByDate={eventsByDate}
            todayStr={todayStr}
          />
        </div>

        {/* Kolom kanan: panel tambah program — onAddEvent diterusin ke hook */}
        <div className="w-[260px] shrink-0 flex flex-col">
          <AddProgramPanel onAddEvent={addEvent} />
        </div>

      </div>
  );
}