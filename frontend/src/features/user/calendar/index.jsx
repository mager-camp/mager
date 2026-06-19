import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import AddProgramPanel from "./components/AddProgramPanel";
import EventDetailModal from "./components/EventDetailModal";
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
    updateEvent,
    updateStatus,
    removeEvent,
    isLoading,
    events,
  } = useCalendar();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const scheduleId = searchParams.get("scheduleId");
    if (!scheduleId || !events.length) return;

    const found = events.find((ev) => ev.id === scheduleId);
    if (found) {
      setSelectedEvent(found);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, events]);

  return (
    <div className="p-10 md:p-12 h-full flex flex-col lg:flex-row gap-4 overflow-y-auto">
      {/* Kolom kiri: kalender */}
      <div className="flex-1 min-w-0 bg-white rounded shadow-sm border border-gray-100 p-5 md:p-5 flex flex-col overflow-hidden">
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
          onSelectEvent={setSelectedEvent}
          isLoading={isLoading}
        />
      </div>

      {/* Kolom kanan: panel tambah program */}
      <div className="w-full lg:w-[260px] shrink-0 flex flex-col">
        <AddProgramPanel onAddEvent={addEvent} />
      </div>

      {/* Modal detail event */}
      <EventDetailModal
        event={
          selectedEvent
            ? (events.find((ev) => ev.id === selectedEvent.id) ?? selectedEvent) // ✅ sync dengan state terbaru
            : null
        }
        onClose={() => setSelectedEvent(null)}
        onDelete={async (ev) => {
          await removeEvent(ev.id);
          setSelectedEvent(null);
        }}
        onUpdate={updateEvent}
        onStatusChange={async (id, status) => {
          await updateStatus(id, status);
          setSelectedEvent((prev) => (prev ? { ...prev, status } : prev));
        }}
      />
    </div>
  );
}
