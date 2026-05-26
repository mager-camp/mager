import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layout/PublicLayout";
import UserLayout from "@/layout/UserLayout";

import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/user/Dashboard";
import Kalender from "@/pages/user/Kalender";
import Premium from "@/pages/user/Premium";
import Course from "@/pages/user/Course";
import Rekap from "@/pages/user/Rekap";
import Settings from "@/pages/user/Settings";

export const router = createBrowserRouter([
   {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
        element: <Premium />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "Rekap",
        element: <Rekap />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);