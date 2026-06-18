import { useQuery } from "@tanstack/react-query";
import { getReadiness } from "../services/readinessService";

export function useReadiness() {
  return useQuery({
    queryKey: ["readiness"],
    queryFn: getReadiness,
    staleTime: 1000 * 60 * 5,
  });
}