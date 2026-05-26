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
    //badge: "3",
  },
  {
    id: "kursus",
    name: "Kursus",
    icon: GraduationCap,
    href: "/user/course",
    //badge: "12",
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
    href: "/user/pengaturan",
  },
];