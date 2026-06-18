import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutLogsAdmin } from "@/services/rekapService";

export const TIME_FILTERS = ["7 Hari Terakhir", "Bulan Ini", "Semua"];

// Filter logs berdasarkan activeFilter
function filterByPeriod(logs, filter) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (filter === "7 Hari Terakhir") {
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() - 6);
    cutoff.setHours(0, 0, 0, 0);
    return logs.filter((l) => new Date(l.completedAt) >= cutoff);
  }

  if (filter === "Bulan Ini") {
    const cutoff = new Date(now.getFullYear(), now.getMonth(), 1);
    return logs.filter((l) => new Date(l.completedAt) >= cutoff);
  }

  return logs; // "Semua"
}

// Hitung stats dari filtered logs
function computeStats(logs) {
  if (!logs.length) {
    return {
      totalWorkout: { value: 0, label: "sesi selesai" },
      totalDurasi: { value: "0m", label: "total waktu latihan" },
      aktivitasUtama: { value: "—", label: "belum ada data" },
    };
  }

  // Total workout
  const totalWorkout = logs.length;

  // Total durasi
  const totalMenit = logs.reduce((sum, l) => sum + (l.durationMinutes ?? 0), 0);
  const jam = Math.floor(totalMenit / 60);
  const menit = totalMenit % 60;
  const durasiLabel = jam > 0 ? `${jam}j ${menit}m` : `${menit}m`;

  // Aktivitas terbanyak
  const activityCount = {};
  logs.forEach((l) => {
    const name = l.userSchedule?.activity?.name ?? "—";
    activityCount[name] = (activityCount[name] ?? 0) + 1;
  });
  const topActivity = Object.entries(activityCount).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return {
    totalWorkout: { value: totalWorkout, label: "sesi selesai" },
    totalDurasi: { value: durasiLabel, label: "total waktu latihan" },
    aktivitasUtama: {
      value: topActivity?.[0] ?? "—",
      label: topActivity ? `${topActivity[1]}x dilakukan` : "belum ada data",
    },
  };
}

// Map workout log ke shape untuk SessionTable
function mapLogToSession(l) {
  const menit = l.durationMinutes ?? 0;
  const jam = Math.floor(menit / 60);
  const sisa = menit % 60;

  const INTENSITY_LABEL = { light: "Ringan", medium: "Sedang", heavy: "Berat" };

  return {
    id: l.id,
    nama: l.user?.fullName ?? "-",
    title: l.userSchedule?.activity?.name ?? "—",
    tanggal: new Date(l.completedAt).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    durasi: jam > 0 ? `${jam}j ${sisa}m` : `${menit}m`,
    intensitas:
      INTENSITY_LABEL[l.userSchedule?.intensity] ??
      l.userSchedule?.intensity ??
      "—",
    notes: l.notes ?? null,
    status: "Selesai",
  };
}

export function useRekapFilter() {
  const [activeFilter, setActiveFilter] = useState("7 Hari Terakhir");

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["workout-logs-admin"],
    queryFn: getWorkoutLogsAdmin,
    staleTime: 1000 * 60 * 5,
  });
  

  const filtered = useMemo(
    () => filterByPeriod(logs, activeFilter),
    [logs, activeFilter],
  );
  const stats = useMemo(() => computeStats(filtered), [filtered]);
  const sessions = useMemo(() => filtered.map(mapLogToSession), [filtered]);

  return { activeFilter, setActiveFilter, stats, sessions, isLoading };
}
