import { useState } from "react";

import Sidebar from "@/layout/components/Sidebar/Sidebar";
import { Header } from "@/layout/components/Navbar/header-with-search";

export default function UserLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background-def)]">
      <Header />

      <div className="pt-14">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* CONTENT */}
        <main
          className={`
    transition-all duration-300
    p-6
    ml-0
    ${isCollapsed ? "md:ml-24" : "md:ml-72"}
  `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
