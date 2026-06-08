export default function SidebarProfile({
  isCollapsed,
}) {
  return (
    <div
      className="
        border-t-2 border-[var(--border)]
        p-3
      "
    >
      {!isCollapsed ? (
        <div
          className="
            flex items-center gap-3
            p-2 rounded-xl
            hover:bg-slate-100
            transition-all
          "
        >
          <div
            className="
              w-10 h-10 rounded-full
              bg-slate-200
              flex items-center justify-center
            "
          >
            <span className="text-sm font-semibold">
              FM
            </span>
          </div>

          <div className="flex-1">
            <h2
              className="
                text-sm font-medium
                text-[var(--border)]
              "
            >
              Fahran
            </h2>

            <p
              className="
                text-xs text-[var(--muted)]
              "
            >
              Athlete
            </p>
          </div>

          <div
            className="
              w-2 h-2 rounded-full
              bg-green-500
            "
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div
            className="
              w-10 h-10 rounded-full
              bg-slate-200
              flex items-center justify-center
            "
          >
            <span className="text-sm font-semibold">
              FM
            </span>
          </div>
        </div>
      )}
    </div>
  );
}