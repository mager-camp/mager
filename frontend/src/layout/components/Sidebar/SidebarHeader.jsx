import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function getRoleName(user) {
  const role = user?.role;

  if (typeof role === "string") {
    return role.toUpperCase();
  }

  if (typeof role?.name === "string") {
    return role.name.toUpperCase();
  }

  return "";
}

export default function SidebarHeader({
  isCollapsed,
  toggleCollapse,
}) {
  const { user } = useAuth();
  const location = useLocation();

  const roleName = getRoleName(user);

  const isAdmin = location.pathname.startsWith("/admin");
  const isPelatih = location.pathname.startsWith("/pelatih");

  return (
    <div
      className={`
        flex items-center
        transition-all duration-300
        ${isCollapsed ? "justify-center p-3 pb-0" : "justify-between px-4 pt-4"}
      `}
    >
      {!isCollapsed && (
        <div className="flex items-center gap-3 p-4">
          <div>
            <h1
              className="
                text-lg font-bold
                text-[var(--foreground)]
                tracking-[0.1em]
              "
            >
              {isAdmin
                ? "PORTAL ADMIN"
                : isPelatih
                ? "PORTAL PELATIH"
                : "PORTAL ATLET"}
            </h1>

            <p
              className="
                text-[var(--muted)]
                mt-0.5
                tracking-[0.1em]
                font-semibold
                text-md
              "
            >
              {isPelatih
                ? "PELATIH"
                : isAdmin
                ? "ADMIN"
                : (user?.fullName ?? "USER").toUpperCase()}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={toggleCollapse}
        className="
          flex items-center justify-center
          p-2 rounded-lg
          hover:bg-slate-100
          transition-all duration-200
        "
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}