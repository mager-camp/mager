// hooks/useDashboardStats.js
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/service";

export function useDashboardStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5,
  });

  return {
    stats: data,
    isLoading,
  };
}