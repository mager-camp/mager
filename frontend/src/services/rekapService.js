import api from "@/lib/api";

export const getWorkoutLogs = async () => {
  const res = await api.get("/workout-logs");
  return res.data.data;
};