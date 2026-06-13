import { Navigate, Outlet } from "react-router-dom";
import { usePremiumStatus } from "../hooks/usePremium";


export default function PremiumGuard() {
  const { data, isLoading } = usePremiumStatus();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-gray-400">Memuat...</p>
      </div>
    );
  }

  if (!data?.isPremium) {
    return <Navigate to="/user/payment" replace />;
  }

  return <Outlet />;
}