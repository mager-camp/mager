import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

const fetchNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data.data;
};

export function useNotifications() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey:  ["notifications"],
    queryFn:   fetchNotifications,
    staleTime: 1000 * 30,          // refresh tiap 30 detik
    refetchInterval: 1000 * 60,    // polling tiap 1 menit
  });

  const markAll = useMutation({
    mutationFn: () => api.patch("/notifications/mark-all"),
    onSuccess:  () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markOne = useMutation({
    mutationFn: (id) => api.patch(`/notifications/${id}/read`),
    onSuccess:  () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  return {
    notifications: query.data ?? [],
    unreadCount:   (query.data ?? []).filter((n) => !n.isRead).length,
    isLoading:     query.isLoading,
    markAll:       markAll.mutate,
    markOne:       markOne.mutate,
  };
}