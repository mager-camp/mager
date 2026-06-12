import { createBrowserRouter } from "react-router-dom";
import GuestRoute from "@/routes/GuestRoute";
import RoleRoute from "@/routes/RoleRoute";

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

import DashboardAdmin from "@/pages/admin/Dashboard-admin";
import ManajemenUser from "@/pages/admin/ManajemenUser";
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
          {
            index: true,
            element: <Premium />,
          },
          {
            path: "kursus/:slug",
            element: <CoursePage />,
          },
          {
            path: "kursus/:slug/modul/:modulId",
            element: <ModulPage />,
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
    ],
  },

  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);