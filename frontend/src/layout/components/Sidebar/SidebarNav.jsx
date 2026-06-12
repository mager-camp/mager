import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SidebarItem from "./SidebarItem";
import { adminNavigationItems, userNavigationItems } from "./navigation";

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

export default function SidebarNav({ isCollapsed }) {
  const location = useLocation();
  const { user } = useAuth();

  const roleName = getRoleName(user);
  const items = roleName === "ADMIN" ? adminNavigationItems : userNavigationItems;

  return (
    <nav className="flex-1 px-3 py-4">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <SidebarItem
              item={item}
              isActive={
                location.pathname === item.href ||
                location.pathname.startsWith(`${item.href}/`)
              }
              isCollapsed={isCollapsed}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}