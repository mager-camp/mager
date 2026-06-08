import { useQuery } from "@tanstack/react-query";
import {
  getDashboardSummary,
  getWeeklyProgress,
  getNextSession,
  getTodaySchedules,
} from "@/services/dashboardService";

export const DASHBOARD_KEYS = {
  summary:        ["dashboard", "summary"],
  weeklyProgress: ["dashboard", "weekly-progress"],
  nextSession:    ["dashboard", "next-session"],
  todaySchedules: ["dashboard", "today-schedules"],
};

export function useDashboardSummary() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.summary,
    queryFn:  getDashboardSummary,
    staleTime: 1000 * 60 * 5,
  });
}

export function useWeeklyProgress() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.weeklyProgress,
    queryFn:  getWeeklyProgress,
    staleTime: 1000 * 60 * 5,
  });
}

export function useNextSession() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.nextSession,
    queryFn:  getNextSession,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
}

export function useTodaySchedules() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.todaySchedules,
    queryFn:  getTodaySchedules,
    staleTime: 1000 * 60 * 5,
  });
}