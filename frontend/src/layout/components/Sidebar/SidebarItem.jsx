export default function SidebarItem({ item, isActive, isCollapsed, onClick }) {
  const Icon = item.icon;

  const activeClass = isActive
    ? "bg-[var(--primary)] border-r-6 border-[var(--text-primary)]"
    : "text-[var(--text-primary)] hover:bg-slate-100";

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full flex items-center
        rounded-sm pl-3 pr-2 py-3
        transition-all duration-200 font-bold
        group
        ${activeClass}
        ${isCollapsed ? "justify-center" : ""}
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />

      {!isCollapsed && (
        <>
          <span className="ml-3 text-sm">{item.name}</span>

          {item.badge && (
            <span
              className="
                ml-auto
                px-2 py-0.5
                rounded-full
                text-xs
                bg-white/20
              "
            >
              {item.badge}
            </span>
          )}
        </>
      )}

      {isCollapsed && (
        <div
          className="
            absolute left-full ml-3
            px-2 py-1 rounded-md
            bg-slate-900 text-white
            text-xs whitespace-nowrap
            opacity-0 invisible
            group-hover:opacity-100
            group-hover:visible
            transition-all
            z-50
          "
        >
          {item.name}
        </div>
      )}
    </button>
  );
}
