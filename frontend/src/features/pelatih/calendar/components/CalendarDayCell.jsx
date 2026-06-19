import EventChip from "./EventChip";

function toDateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function CalendarDayCell({
  date,
  isCurrentMonth,
  events = [],
  isToday,
  onSelectEvent,
}) {
  const dayNum = date.getDate();

  return (
    <div
      className={`
        border border-gray-100 p-1.5 flex flex-col gap-1 min-h-0 overflow-hidden
        ${!isCurrentMonth ? "bg-gray-50" : "bg-white"}
        ${isToday ? "ring-1 ring-inset ring-[#2B6CB0]" : ""}
      `}
    >
      <span
        className={`
          text-[11px] font-semibold leading-none self-end
          ${!isCurrentMonth ? "text-gray-300" : isToday ? "text-[#2B6CB0]" : "text-gray-700"}
        `}
      >
        {dayNum}
      </span>

      <div className="flex flex-col gap-0.5 overflow-hidden">
        {events.map((ev) => (
          <button
            key={ev.id}
            type="button"
            onClick={() => onSelectEvent?.(ev)}
            className="text-left w-full cursor-pointer"
          >
            <EventChip
              title={ev.title}
              startTime={ev.startTime}
              endTime={ev.endTime}
              color={ev.color}
              isRestDay={ev.isRestDay}
              userName={ev.userName}
            />
          </button>
        ))}
      </div>
    </div>
  );
}