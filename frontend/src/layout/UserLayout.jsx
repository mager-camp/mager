import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/layout/components/Sidebar/Sidebar";
import { Header } from "@/layout/components/Navbar/header-with-search";

export default function UserLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-(--background-def)">
      <Header />

      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main
          className={`
            flex-1 transition-all duration-300
            overflow-y-auto md:overflow-hidden
            ${isCollapsed ? "md:ml-24" : "md:ml-72"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}