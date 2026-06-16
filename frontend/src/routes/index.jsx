// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import GuestRoute from "@/routes/GuestRoute";
import RoleRoute from "@/routes/RoleRoute";
import PremiumGuard from "@/features/premium/guards/PremiumGuard";
import PaymentGuard from "@/features/premium/guards/PaymentGuard";

import PublicLayout from "@/layout/PublicLayout";
import UserLayout from "@/layout/UserLayout";
import AdminLayout from "@/layout/AdminLayout";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import LandingPage from "@/pages/LandingPage";

import Dashboard from "@/pages/user/Dashboard";
import Kalender from "@/pages/user/Kalender";
import Premium from "@/pages/user/Premium";
import Course from "@/pages/user/Course";
import Rekap from "@/pages/user/Rekap";
import Settings from "@/pages/user/Settings";
import Dukungan from "@/pages/user/Support";

import CoursePage from "@/features/premium/pages/CoursePage";
import ModulPage from "@/features/premium/pages/ModulPage";
import FreeCoursePage from "@/features/course/pages/CoursePage";
import FreeModulPage from "@/features/course/pages/ModulPage";
import PaymentPage from "@/features/premium/pages/PaymentPage";
import InvoicePage from "@/features/premium/pages/InvoicePage";

import DashboardAdmin from "@/pages/admin/Dashboard-admin";
import ManajemenUser from "@/pages/admin/ManajemenUser";
import AdminSetting from "@/pages/admin/AdminSetting";
import PaymentManagementPage from "@/pages/admin/PaymentManagementPage";
import ManajemenKursus from "@/pages/admin/ManajemenKursus";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestRoute>
        <PublicLayout />
      </GuestRoute>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/user",
    element: (
      <RoleRoute allowedRoles={["USER"]}>
        <UserLayout />
      </RoleRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "kalender",
        element: <Kalender />,
      },
      {
        path: "premium",
        children: [
          { index: true, element: <Premium /> },
          {
            element: <PaymentGuard />,
            children: [
              {
                path: "payment",
                element: <PaymentPage />,
              },
            ],
          },
          {
            element: <PremiumGuard />,
            children: [
              { path: "course/:slug", element: <CoursePage /> },
              { path: "course/:slug/modul/:modulId", element: <ModulPage /> },
              {
                path: "payment/invoice/:invoiceNumber",
                element: <InvoicePage />,
              },
            ],
          },
        ],
      },
      {
        path: "course",
        children: [
          {
            index: true,
            element: <Course />,
          },
          {
            path: "free/:slug",
            element: <FreeCoursePage />,
          },
          {
            path: "free/:slug/modul/:modulId",
            element: <FreeModulPage />,
          },
        ],
      },
      {
        path: "rekap",
        element: <Rekap />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "support",
        element: <Dukungan />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <RoleRoute allowedRoles={["ADMIN"]}>
        <AdminLayout />
      </RoleRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardAdmin />,
      },
      {
        path: "manajemen-user",
        element: <ManajemenUser />,
      },
      {
        path: "manajemen-pembayaran", // 👈 2. Path URL yang diakses browser
        element: <PaymentManagementPage />, // URL akses browser otomatis menjadi: /admin/manajemen-pembayaran
      },
      {
        path: "kursus", // 👈 2. Sesuai dengan isi href navigasi.js kamu
        element: <ManajemenKursus />,
      },
      {
        path: "setting",
        element: <AdminSetting />,
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);