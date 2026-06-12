import {
  LayoutDashboard,
  Calendar,
  Award,
  GraduationCap,
  TrendingUp,
  Settings,
} from "lucide-react";

export const userNavigationItems = [
  {
    id: "dashboard",
    name: "Dasbor",
    icon: LayoutDashboard,
    href: "/user/dashboard",
  },
  {
    id: "kalender",
    name: "Kalender",
    icon: Calendar,
    href: "/user/kalender",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Award,
    href: "/user/premium",
  },
  {
    id: "kursus",
    name: "Kursus",
    icon: GraduationCap,
    href: "/user/course",
  },
  {
    id: "rekap",
    name: "Rekap Latihan",
    icon: TrendingUp,
    href: "/user/rekap",
  },
  {
    id: "pengaturan",
    name: "Pengaturan",
    icon: Settings,
    href: "/user/settings",
  },
];

export const adminNavigationItems = [
  {
    id: "admin-dashboard",
    name: "Dasbor Admin",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
];

// biar file lama yang masih import navigationItems tidak error
export const navigationItems = userNavigationItems;