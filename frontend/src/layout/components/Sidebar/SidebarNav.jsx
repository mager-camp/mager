import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import {
  adminNavigationItems,
  userNavigationItems,
  pelatihNavigationItems,
} from "./navigation";

export default function SidebarNav({ isCollapsed }) {
  const location = useLocation();

  const isPelatihRoute =
    location.pathname.startsWith("/pelatih");

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  let items = userNavigationItems;

  if (isAdminRoute) {
    items = adminNavigationItems;
  }

  if (isPelatihRoute) {
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