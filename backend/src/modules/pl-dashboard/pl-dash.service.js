import { getDashboardStatsRepo } from "./pl-dash.repository.js";

export const getDashboardStats = async () => {
  return getDashboardStatsRepo();
};