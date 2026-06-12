import { useCallback, useEffect, useState } from "react";

import {
  getAdminDashboardSummary,
  getAdminUsers,
  getAdminPremiumUsers,
  getAdminStatistics,
} from "@/services/adminDashboardService";

const initialData = {
  summary: null,
  users: [],
  premiumUsers: [],
  statistics: null,
};

const initialLoading = {
  summary: true,
  users: true,
  premiumUsers: true,
  statistics: true,
};

const initialError = {
  summary: "",
  users: "",
  premiumUsers: "",
  statistics: "",
};

function getErrorMessage(result, fallback) {
  return result.reason?.response?.data?.message || fallback;
}

export function useAdminDashboard() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(initialError);

  const fetchAdminDashboard = useCallback(async () => {
    setLoading(initialLoading);
    setError(initialError);

    const [summaryResult, usersResult, premiumUsersResult, statisticsResult] =
      await Promise.allSettled([
        getAdminDashboardSummary(),
        getAdminUsers(),
        getAdminPremiumUsers(),
        getAdminStatistics(),
      ]);

    setData({
      summary:
        summaryResult.status === "fulfilled" ? summaryResult.value.data : null,
      users:
        usersResult.status === "fulfilled"
          ? (usersResult.value.data?.items ?? [])
          : [],
      premiumUsers:
        premiumUsersResult.status === "fulfilled"
          ? (premiumUsersResult.value.data?.items ?? [])
          : [],
      statistics:
        statisticsResult.status === "fulfilled"
          ? statisticsResult.value.data
          : null,
    });

    setError({
      summary:
        summaryResult.status === "rejected"
          ? getErrorMessage(summaryResult, "Gagal memuat ringkasan dashboard.")
          : "",
      users:
        usersResult.status === "rejected"
          ? getErrorMessage(usersResult, "Gagal memuat data user.")
          : "",
      premiumUsers:
        premiumUsersResult.status === "rejected"
          ? getErrorMessage(
              premiumUsersResult,
              "Gagal memuat data user premium.",
            )
          : "",
      statistics:
        statisticsResult.status === "rejected"
          ? getErrorMessage(statisticsResult, "Gagal memuat statistik.")
          : "",
    });

    setLoading({
      summary: false,
      users: false,
      premiumUsers: false,
      statistics: false,
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAdminDashboard();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchAdminDashboard]);

  return {
    ...data,
    loading,
    error,
    refetch: fetchAdminDashboard,
  };
}
