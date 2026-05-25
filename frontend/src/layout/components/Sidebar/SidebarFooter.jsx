import { LogOut, HelpCircle } from "lucide-react";

export default function SidebarFooter({
  isCollapsed,
}) {
  return (
    <div className="py-3 px-5 border-t-2 border-[var(--border)]">
      <button
        className={`
          w-full flex items-center
          rounded-sm px-3 py-3
          text-text-primary
          hover:bg-[var(--primary)]
          transition-all
          font-bold
          ${isCollapsed ? "justify-center" : ""}
        `}
      >
        <HelpCircle className="w-5 h-5" />

        {!isCollapsed && (
          <span className="ml-3 text-sm">
            Dukungan
          </span>
        )}
      </button>

      <button
        className={`
          w-full flex items-center
          rounded-xl px-3 py-3
          text-text-primary
          hover:bg-[var(--primary)]
          transition-all
          font-bold
          ${isCollapsed ? "justify-center" : ""}
        `}
      >
        <LogOut className="w-5 h-5" />

        {!isCollapsed && (
          <span className="ml-3 text-sm">
            Logout
          </span>
        )}
      </button>
    </div>
  );
}