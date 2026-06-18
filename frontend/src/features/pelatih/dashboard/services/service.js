import api from "@/lib/api";


export const getWorkoutLogsAdmin = async () => {
  const res = await api.get("/workout-logs/admin");
  return res.data.data;
};

export const getDashboardStats = async () => {
  const res = await api.get("/pl-dashboard/stats");
  return res.data.data;
};