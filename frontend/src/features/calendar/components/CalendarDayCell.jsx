import EventChip from "./EventChip";

function toDateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function CalendarDayCell({ date, isCurrentMonth, events = [], isToday }) {
  const dateStr = toDateStr(date);
  const dayNum = date.getDate();

  return (
    <div
      className={`
        border border-gray-100 p-1.5 flex flex-col gap-1 min-h-0 overflow-hidden
        ${!isCurrentMonth ? "bg-gray-50" : "bg-white"}
        ${isToday ? "ring-1 ring-inset ring-[#2B6CB0]" : ""}
      `}
    >
      {/* Nomor tanggal */}
      <span
        className={`
          text-[11px] font-semibold leading-none self-end
          ${!isCurrentMonth ? "text-gray-300" : isToday ? "text-[#2B6CB0]" : "text-gray-700"}
        `}
      >
        {dayNum}
      </span>

      {/* Event chips */}
      <div className="flex flex-col gap-0.5 overflow-hidden">
        {events.map((ev) => (
          <EventChip
            key={ev.id}
            title={ev.title}
            time={ev.time}
            color={ev.color}
            isRestDay={ev.isRestDay}
          />
        ))}
      </div>
    </div>
  );
}