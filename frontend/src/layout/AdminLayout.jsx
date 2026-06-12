// src/layout/AdminLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/layout/components/Sidebar/Sidebar";
import { Header } from "@/layout/components/Navbar/header-with-search";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-(--background-def)">
      {/* Header bagian atas */}
      <Header />

      <div className="flex flex-1 overflow-hidden pt-14">
        {/* Sidebar samping kiri */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Area Konten Utama - Tempat Dashboard Admin dirender via <Outlet /> */}
        <main
          className={`
            flex-1 min-w-0 w-full transition-all duration-300
            overflow-y-auto
            ${isCollapsed ? "md:pl-24" : "md:pl-72"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
