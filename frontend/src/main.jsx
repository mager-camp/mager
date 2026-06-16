import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import QueryProvider from "@/providers/QueryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <FeedbackProvider>
            <RouterProvider router={router} />
          </FeedbackProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryProvider>
  </React.StrictMode>,
);
