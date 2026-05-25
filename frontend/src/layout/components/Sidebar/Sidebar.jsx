import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";
//import SidebarProfile from "./SidebarProfile";

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed top-5 left-5 z-50
          p-3 rounded-xl
          bg-#487D97
          shadow-sm
          md:hidden
        "
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0
            bg-black/40
            z-30
            md:hidden
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    fixed left-0 z-40
    top-14 h-[calc(100vh-3.5rem)]
    bg-[var(--background)]
    flex flex-col
    transition-all duration-300

    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    ${isCollapsed ? "w-24" : "w-72"}

    md:translate-x-0
  `}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        <SidebarNav isCollapsed={isCollapsed} />

        {/* <SidebarProfile isCollapsed={isCollapsed} /> */}

        <SidebarFooter isCollapsed={isCollapsed} />
      </aside>
    </>
  );
}
