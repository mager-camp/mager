import api from "@/lib/api";

export const getAdminDashboardSummary = async () => {
  const response = await api.get("/admin/dashboard-summary");
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getAdminPremiumUsers = async () => {
  const response = await api.get("/admin/premium-users");
  return response.data;
};

export const getAdminStatistics = async () => {
  const response = await api.get("/admin/statistics");
  return response.data;
};