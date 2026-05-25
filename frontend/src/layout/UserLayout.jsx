import { useState } from "react";
import Sidebar from "@/layout/components/Sidebar/Sidebar";
import { Header } from "@/layout/components/Navbar/header-with-search";

export default function UserLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-(--background-def)">
      <Header />

      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* CONTENT */}
        <main
          className={`
            flex-1 transition-all duration-300
            overflow-y-auto md:overflow-hidden
            ${isCollapsed ? "md:ml-24" : "md:ml-72"}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}