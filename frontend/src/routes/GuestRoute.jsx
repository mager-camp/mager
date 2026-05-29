import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function GuestRoute({
  children,
}) {
  const {
    isAuthenticated,
    loading,
    user,
  } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    // redirect berdasarkan role
    if (user?.role?.name === "ADMIN") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/user/dashboard"
        replace
      />
    );
  }

  return children;
}