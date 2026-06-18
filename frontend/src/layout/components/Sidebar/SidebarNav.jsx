import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

import {
  adminNavigationItems,
  userNavigationItems,
  pelatihNavigationItems,
} from "./navigation";

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

export default function SidebarNav({ isCollapsed }) {
  const location = useLocation();

let items = userNavigationItems;

if (location.pathname.startsWith("/admin")) {
  items = adminNavigationItems;
}

if (location.pathname.startsWith("/pelatih")) {
  items = pelatihNavigationItems;
}

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