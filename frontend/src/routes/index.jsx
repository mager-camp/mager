import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layout/PublicLayout";
import UserLayout from "@/layout/UserLayout";

import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/user/Dashboard";
import Kalender from "@/pages/user/Kalender";

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
    ],
  },
]);