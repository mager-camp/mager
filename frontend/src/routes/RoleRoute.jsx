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

export default function RoleRoute({ children, allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getRoleName(user);
  const normalizedAllowedRoles = allowedRoles.map((role) => role.toUpperCase());

  if (!normalizedAllowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
