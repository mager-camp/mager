import { LogOut, HelpCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function getRoleName(user) {
  const role = user?.role;

  if (typeof role === "string") {
    return role.toUpperCase();
  }

  if (typeof role?.name === "string") {
    return role.name.toUpperCase();
  }

  return null;
}

export default function SidebarFooter({ isCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const roleName = getRoleName(user);

  const SUPPORT_ROLES = ["USER", "INSTRUCTOR"];
  const showSupport = SUPPORT_ROLES.includes(roleName);

  const SUPPORT_ROUTE = {
    USER: "/user/support",
    INSTRUCTOR: "/pelatih/support",
  };
  const supportPath = SUPPORT_ROUTE[roleName];

  const supportActive = location.pathname === "/user/support";

  const activeClass = supportActive
    ? "bg-[var(--primary)] border-r-6 border-[var(--text-primary)]"
    : "text-[var(--text-primary)] hover:bg-slate-100";

  return (
    <div className="py-3 px-5 border-t-2 border-[var(--border)]">
      {showSupport && supportPath && (
        <Link
          to={supportPath}
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

          {!isCollapsed && <span className="ml-3 text-sm">Dukungan</span>}
        </Link>
      )}

      <button
        onClick={() => {
          logout();
          navigate("/login");
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

        {!isCollapsed && <span className="ml-3 text-sm">Logout</span>}
      </button>
    </div>
  );
}
