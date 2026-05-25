import { createBrowserRouter } from "react-router-dom";

import Dashboard from "@/pages/user/Dashboard";
import Kalender from "@/pages/user/Kalender";
import Login from "@/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/user/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user/kalender",
    element: <Kalender />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);