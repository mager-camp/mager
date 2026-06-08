import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import QueryProvider from "@/providers/QueryProvider";

import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <FeedbackProvider>
          <RouterProvider router={router} />
        </FeedbackProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>,
);
