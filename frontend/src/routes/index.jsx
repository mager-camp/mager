import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/user/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);