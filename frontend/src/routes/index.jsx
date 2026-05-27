import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layout/PublicLayout";
import UserLayout from "@/layout/UserLayout";

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

export const router = createBrowserRouter([
   {
    path: "/",
    element: <PublicLayout />,
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
    element: <UserLayout />,
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
        element: <Course />,
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
]);