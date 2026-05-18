import {
  getSummaryRepo,
  getWeeklyProgressRepo,
  getMonthlyProgressRepo,
} from "./dashboard.repository.js";

export const getSummary = async (userId) => {
  return getSummaryRepo(userId);
};

export const getWeeklyProgress = async (userId) => {
  return getWeeklyProgressRepo(userId);
};

export const getMonthlyProgress = async (userId) => {
  return getMonthlyProgressRepo(userId);
};
