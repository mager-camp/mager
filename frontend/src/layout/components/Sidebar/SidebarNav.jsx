import SidebarItem from "./SidebarItem";
import { navigationItems } from "./navigation";

export default function SidebarNav({
  activeItem,
  setActiveItem,
  isCollapsed,
}) {
  return (
    <nav className="flex-1 px-3 py-4">
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <SidebarItem
              item={item}
              isActive={activeItem === item.id}
              isCollapsed={isCollapsed}
              onClick={() =>
                setActiveItem(item.id)
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}