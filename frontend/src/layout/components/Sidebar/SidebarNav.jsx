import SidebarItem from "./SidebarItem";
import { navigationItems } from "./navigation";
import { useLocation } from "react-router-dom";

export default function SidebarNav({ isCollapsed }) {
  const location = useLocation();

  return (
    <nav className="flex-1 px-3 py-4">
      <ul className="space-y-2">
        {navigationItems.map((item) => (
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
