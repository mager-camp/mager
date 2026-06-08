const COLOR_MAP = {
  green: "bg-[#C6F6D5] text-[#2F855A] border-[#9AE6B4]",
  blue: "bg-[#BEE3F8] text-[#2B6CB0] border-[#90CDF4]",
  orange: "bg-[#FEEBC8] text-[#C05621] border-[#FBD38D]",
  red: "bg-[#FED7D7] text-[#C53030] border-[#FEB2B2]",
  gray: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function EventChip({
  title,
  startTime,
  endTime,
  color = "blue",
  isRestDay,
}) {
  if (isRestDay) {
    return (
      <div className="text-[9px] font-bold text-[#C05621] uppercase tracking-wider text-center mt-1">
        Rest Day
      </div>
    );
  }

  return (
    <div
      className={`
    flex items-center gap-1 px-1.5 py-0.5 rounded
    border text-[9px] font-semibold truncate
    ${COLOR_MAP[color] ?? COLOR_MAP.blue}
  `}
    >
      <span className="truncate">{title}</span>

      {startTime && endTime && (
        <span className="opacity-60 shrink-0">
          {startTime}-{endTime}
        </span>
      )}
    </div>
  );
}
