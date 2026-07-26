import CalendarDayCell from "./CalendarDayCell";

const DAY_LABELS = [
  "SENIN",
  "SELASA",
  "RABU",
  "KAMIS",
  "JUMAT",
  "SABTU",
  "MINGGU",
];

function toDateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function CalendarGridSkeleton() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header hari — sama persis, ga diskeleton */}
      <div className="grid grid-cols-7 border-b border-gray-200 flex-shrink-0">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-[10px] font-bold tracking-widest py-2 text-gray-300"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Grid skeleton — 35 cells (5 baris x 7) */}
      <div
        className="grid grid-cols-7 flex-1 min-h-0"
        style={{ gridAutoRows: "1fr" }}
      >
        {Array.from({ length: 35 }).map((_, idx) => (
          <div
            key={idx}
            className="border-b border-r border-gray-100 p-2 flex flex-col gap-1.5 animate-pulse"
          >
            {/* Nomor tanggal */}
            <div className="h-5 w-5 rounded-full bg-gray-100 self-end" />
            {/* Event bar — random beberapa cell ada, beberapa kosong */}
            {idx % 3 === 0 && (
              <div className="h-2 rounded-full bg-gray-100 w-[80%]" />
            )}
            {idx % 5 === 0 && (
              <div className="h-2 rounded-full bg-gray-100 w-[60%]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalendarGrid({
  days,
  eventsByDate,
  todayStr,
  onSelectEvent,
  isLoading,
}) {
  if (isLoading) return <CalendarGridSkeleton />;

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-x-auto">
      <div className="min-w-[700px] flex flex-col flex-1 min-h-[300px] lg:min-h-0">
        {/* Header hari */}
        <div className="grid grid-cols-7 border-b border-gray-200 flex-shrink-0">
          {DAY_LABELS.map((label) => (
            <div
              key={label}
              className={`
              text-center text-[10px] font-bold tracking-widest py-2
              ${label === "SABTU" || label === "MINGGU" ? "text-(--text-dashboard)" : "text-var(--text-primary)"}
            `}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid hari — flex-1 biar ngisi sisa tinggi */}
        <div
          className="grid grid-cols-7 flex-1 min-h-0"
          style={{ gridAutoRows: "1fr" }}
        >
          {days.map((dayObj, idx) => {
            const dateStr = toDateStr(dayObj.date);
            const events = eventsByDate[dateStr] ?? [];
            const isToday = dateStr === todayStr;
            return (
              <CalendarDayCell
                key={idx}
                date={dayObj.date}
                isCurrentMonth={dayObj.isCurrentMonth}
                events={events}
                isToday={isToday}
                onSelectEvent={onSelectEvent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
