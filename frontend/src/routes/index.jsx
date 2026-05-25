import { createBrowserRouter } from "react-router-dom";

import UserLayout from "@/layout/UserLayout";

import Dashboard from "@/pages/user/Dashboard";
import Kalender from "@/pages/user/Kalender";

export const router = createBrowserRouter([
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