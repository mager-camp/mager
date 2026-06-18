import {
  LayoutDashboard,
  Calendar,
  Award,
  GraduationCap,
  TrendingUp,
  Settings,
  CreditCard,
  Users,
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
    name: "Dasbor",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    id: "admin-pembayaran",
    name: "Manajemen Pembayaran",
    icon: CreditCard,
    href: "/admin/manajemen-pembayaran",
  },
  {
    id: "admin-kursus",
    name: "Manajemen Kursus",
    icon: GraduationCap,
    href: "/admin/kursus",
  },
  {
    id: "admin-manajemen-user",
    name: "Manajemen User",
    icon: Users,
    href: "/admin/manajemen-user",
  },
  {
    id: "admin-pengaturan",
    name: "Pengaturan",
    icon: Settings,
    href: "/admin/setting",
  },
];

export const instructorNavigationItems = [
  {
    id: "pelatih-dashboard",
    name: "Dasbor",
    icon: LayoutDashboard,
    href: "/pelatih/dashboard",
  },
{
    id: "pelatih-kalender",
    name: "Kalender",
    icon: Calendar,
    href: "/pelatih/kalender",
  },
];

export const navigationItems = userNavigationItems;