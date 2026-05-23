import {
  LayoutDashboard,
  Calendar,
  Award,
  GraduationCap,
  TrendingUp,   
  Settings
} from "lucide-react";

export const navigationItems = [
  {
    id: "dashboard",
    name: "Dasbor",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "kalender",
    name: "Kalender",
    icon: Calendar,
    href: "/kalender",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Award,
    href: "/premium",
    //badge: "3",
  },
  {
    id: "kursus",
    name: "Kursus",
    icon: GraduationCap,
    href: "/kursus",
    //badge: "12",
  },
  {
    id: "rekap",
    name: "Rekap Latihan",
    icon: TrendingUp,
    href: "/rekap",
  },
  {
    id: "pengaturan",
    name: "Pengaturan",
    icon: Settings,
    href: "/pengaturan",
  },
];