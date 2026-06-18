import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function getRoleName(user) {
  const role = user?.role;

  if (typeof role === "string") {
    return role.toUpperCase();
  }

  if (typeof role?.name === "string") {
    return role.name.toUpperCase();
  }

  return "";
}

export default function GuestRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated) {
    const roleName = getRoleName(user);

    if (roleName === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (roleName === "PELATIH") {
      return <Navigate to="/pelatih/dashboard" replace />;
    }

    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}