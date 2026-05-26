import CalendarDayCell from "./CalendarDayCell";

const DAY_LABELS = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "MINGGU"];

function toDateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function CalendarGrid({ days, eventsByDate, todayStr }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
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
      <div className="grid grid-cols-7 flex-1 min-h-0" style={{ gridAutoRows: "1fr" }}>
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
            />
          );
        })}
      </div>
    </div>
  );
}