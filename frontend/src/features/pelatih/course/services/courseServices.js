import api from "@/lib/api";

export const getDashboardStats = async () => {
  const res = await api.get("/pl-dashboard/stats");
  return res.data.data;
};