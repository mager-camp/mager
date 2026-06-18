import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  SearchIcon,
  CircleHelpIcon,
  UserCircle2Icon,
  CheckCheck,
  Clock,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/layout/components/Navbar/hooks/useNotifications";
import { useSearch } from "@/layout/components/Navbar/hooks/useSearch";
import magerLogo from "@/assets/mager.svg";
import { motion, AnimatePresence } from "framer-motion";

// ── Helpers ───────────────────────────────────────────────────────────────────
function getRoleName(user) {
  const role = user?.role;
  if (typeof role === "string") return role.toUpperCase();
  if (typeof role?.name === "string") return role.name.toUpperCase();
  return "USER";
}

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Baru saja";
  if (m < 60) return `${m}m lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}j lalu`;
  return `${Math.floor(h / 24)}h lalu`;
}

const TYPE_CONFIG = {
  reminder: {
    label: "Tindakan Segera",
    color: "text-[#ED8936] bg-orange-50 border-orange-200",
  },
  system: {
    label: "Data Kinerja",
    color: "text-[#2B6CB0] bg-blue-50 border-blue-200",
  },
  payment: {
    label: "Konten Terbaru",
    color: "text-green-600 bg-green-50 border-green-200",
  },
};

const TYPE_ICON = {
  reminder: "⏰",
  system: "📊",
  payment: "🎓",
};

// ── Notification Dropdown ─────────────────────────────────────────────────────
function NotificationDropdown({
  notifications,
  unreadCount,
  markAll,
  markOne,
  onClose,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
      }}
      className="absolute right-0 top-full mt-3 w-[340px] rounded-b-lg bg-[#B8D1E9] shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden z-[100]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-dashboard)] font-black text-sm uppercase tracking-wider">
            Notifikasi
          </span>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ED8936] text-white">
              {unreadCount} Notifikasi Baru
            </span>
          )}
        </div>
        <button onClick={onClose} className="text-black/40 hover:text-black">
          <X size={14} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-[360px] overflow-y-auto bg-white border-l-4 border-l-[#ED8936] border-b-1 border-b-border">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <BellIcon size={32} className="text-black/20" />
            <p className="text-sm text-black/40 font-medium">
              Tidak ada notifikasi terbaru saat ini
            </p>
            <button
              onClick={onClose}
              className="text-xs font-bold text-[#ED8936] hover:text-[#DD6B20]"
            >
              MULAI LATIHAN SEKARANG!
            </button>
          </div>
        ) : (
          notifications.map((n) => {
            const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.system;
            const icon = TYPE_ICON[n.type] ?? "📌";
            return (
              <div
                key={n.id}
                onClick={() => markOne(n.id)}
                className={cn(
                  "px-4 py-3.5 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors",
                  !n.isRead && "bg-white/[0.03]",
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-lg bg-[#ED8936]/20 flex items-center justify-center shrink-0 text-base">
                    {icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Type label + time */}
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                      <span className="text-[10px] text-black/60 shrink-0 ml-2">
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-xs font-bold text-[var(--text-dashboard)] leading-snug mt-1">
                      {n.title}
                    </p>
                    <p className="text-[11px] text-[var(--text-dashboard)] mt-0.5 leading-snug truncate">
                      {n.message}
                    </p>

                    {/* CTA */}
                    {n.schedule && (
                      <button className="text-[10px] font-black text-[#ED8936] hover:text-[#DD6B20] mt-1.5 flex items-center gap-1">
                        MULAI SEKARANG →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 flex flex-col items-center gap-3">
        <button
          onClick={() => markAll()}
          className="text-[10px] font-bold text-black/40 hover:text-black/70 flex items-center gap-1"
        >
          <CheckCheck size={11} />
          TANDAI SEMUA SEBAGAI TELAH DIPROSES
        </button>

        <button
          onClick={onClose}
          className="text-[10px] font-bold text-white bg-[#ED8936] hover:bg-[#DD6B20] px-4 py-1.5 rounded-sm"
        >
          CLOSE
        </button>
      </div>
    </motion.div>
  );
}

// ── Search Dropdown ───────────────────────────────────────────────────────────
function SearchDropdown({ results, isLoading, query, onNavigate }) {
  if (query.length < 2) return null;

  const TYPE_COLOR = {
    Jadwal: "bg-blue-100 text-blue-700",
    Kursus: "bg-orange-100 text-orange-700",
    Rekap: "bg-green-100 text-green-700",
  };

  return (
    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-b-sm shadow-lg border border-gray-100 overflow-hidden z-[100]">
      {isLoading ? (
        <div className="px-4 py-6 text-center text-sm text-gray-400">
          Mencari...
        </div>
      ) : results.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-gray-400">
          Tidak ada hasil untuk "{query}"
        </div>
      ) : (
        <div className="py-1">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => onNavigate(r.href)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
            >
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${TYPE_COLOR[r.type] ?? "bg-gray-100 text-gray-600"}`}
              >
                {r.type}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {r.title}
                </p>
                <p className="text-xs text-gray-400 truncate">{r.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = getRoleName(user);

  const routesByRole = {
    ADMIN: {
      settings: "/admin/setting",
      support: null,
    },
    ATLET: {
      settings: "/user/settings",
      support: "/user/support",
    },
    INSTRUCTOR: {
      settings: "/pelatih/settings",
      support: "/pelatih/support",
    },
  };
  const { notifications, unreadCount, markAll, markOne } = useNotifications();
  const { query, setQuery, results, isLoading } = useSearch();

  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const notifRef = useRef(null);
  const searchRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotif(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSearch(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleNavigate(href) {
    navigate(href);
    setShowSearch(false);
    setQuery("");
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b-2 border-foreground backdrop-blur-lg",
        "bg-secondary supports-[backdrop-filter]:bg-secondary/80",
      )}
    >
      <nav className="relative flex h-14 items-center justify-between px-4">
        {/* LEFT — Logo */}
        <div className="flex items-center gap-2">
          <div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
            <img src={magerLogo} alt="Mager" className="h-6 w-auto" />
          </div>
        </div>

        {/* CENTER — Search */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[320px]"
          ref={searchRef}
        >
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => setShowSearch(true)}
              placeholder="Cari jadwal, kursus, rekap..."
              className="hidden md:flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]"
            />
            {showSearch && (
              <SearchDropdown
                results={results}
                isLoading={isLoading}
                query={query}
                onNavigate={handleNavigate}
              />
            )}
          </div>
        </div>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-1">
          {/* Notification bell */}
          <div className="relative hidden md:block" ref={notifRef}>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowNotif((p) => !p)}
              className="relative"
            >
              <BellIcon className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#ED8936] text-white text-[9px] font-black flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>

            <AnimatePresence>
              {showNotif && (
                <NotificationDropdown
                  notifications={notifications}
                  unreadCount={unreadCount}
                  markAll={markAll}
                  markOne={markOne}
                  onClose={() => setShowNotif(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Help — route by role */}
          {routesByRole[role]?.support && (
            <Button
              size="icon"
              variant="ghost"
              className="hidden md:flex"
              onClick={() => navigate(routesByRole[role].support)}
            >
              <CircleHelpIcon className="size-5" />
            </Button>
          )}

          {/* Settings — route by role */}
          <Button
            size="icon"
            variant="ghost"
            className="hidden md:flex"
            onClick={() => navigate(routesByRole[role].settings)}
          >
            <UserCircle2Icon className="size-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
