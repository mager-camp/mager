import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

async function fetchAllSearchData() {
  const [schedules, courses, workoutLogs] = await Promise.all([
    api.get("/schedules").then((r) => r.data.data),
    api.get("/courses").then((r) => r.data.data),
    api.get("/workout-logs").then((r) => r.data.data),
  ]);
  return { schedules, courses, workoutLogs };
}

export function useSearch() {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey:  ["search-data"],
    queryFn:   fetchAllSearchData,
    staleTime: 1000 * 60 * 5,
    enabled:   query.length >= 2, // hanya fetch kalau ada query
  });

  const results = useMemo(() => {
    if (!query || query.length < 2 || !data) return [];
    const q = query.toLowerCase();

    const scheduleResults = (data.schedules ?? [])
      .filter((s) => s.activity?.name?.toLowerCase().includes(q) || s.notes?.toLowerCase().includes(q))
      .slice(0, 3)
      .map((s) => ({
        id:       s.id,
        type:     "Jadwal",
        title:    s.activity?.name ?? "—",
        subtitle: new Date(s.startAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        href:     "/user/kalender",
      }));

    const courseResults = (data.courses ?? [])
      .filter((c) => c.title?.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q))
      .slice(0, 3)
      .map((c) => ({
        id:       c.id,
        type:     "Kursus",
        title:    c.title,
        subtitle: c.type === "free" ? "Gratis" : "Premium",
        href:     c.type === "free" ? `/user/course/free/${c.id}` : `/user/premium/course/${c.id}`,
      }));

    const logResults = (data.workoutLogs ?? [])
      .filter((l) => l.userSchedule?.activity?.name?.toLowerCase().includes(q))
      .slice(0, 2)
      .map((l) => ({
        id:       l.id,
        type:     "Rekap",
        title:    l.userSchedule?.activity?.name ?? "—",
        subtitle: `${l.durationMinutes} menit · ${new Date(l.completedAt).toLocaleDateString("id-ID")}`,
        href:     "/user/rekap",
      }));

    return [...scheduleResults, ...courseResults, ...logResults];
  }, [query, data]);

  return { query, setQuery, results, isLoading };
}