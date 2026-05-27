import { LogOut, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarFooter({
  isCollapsed,
}) {
  const location = useLocation();

  const supportActive =
    location.pathname === "/user/support";

  const activeClass = supportActive
    ? "bg-[var(--primary)] border-r-6 border-[var(--text-primary)]"
    : "text-[var(--text-primary)] hover:bg-slate-100";

  return (
    <div className="py-3 px-5 border-t-2 border-[var(--border)]">

      {/* DUKUNGAN */}
      <Link
        to="/user/support"
        className={`
          w-full flex items-center
          rounded-sm px-3 py-3
          transition-all
          font-bold
          ${activeClass}
          ${isCollapsed ? "justify-center" : ""}
        `}
      >
        <HelpCircle className="w-5 h-5" />

        {!isCollapsed && (
          <span className="ml-3 text-sm">
            Dukungan
          </span>
        )}
      </Link>

      {/* LOGOUT */}
      <button
        onClick={() => {
          console.log("logout");
        }}
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