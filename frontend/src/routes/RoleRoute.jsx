import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RoleRoute({ children, allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth();

  console.log("USER:", user);
  console.log("ROLE:", user?.role);
  console.log("ALLOWED:", allowedRoles);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
