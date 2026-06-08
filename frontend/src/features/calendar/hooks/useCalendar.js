import { useFeedback } from "@/hooks/useFeedback";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  getSchedules,
  createSchedule,
  deleteSchedule,
  updateSchedule,
  updateScheduleStatus,
} from "@/services/scheduleService";
import { formatDate, formatTime } from "../utils/dateUtils";
import { useQueryClient } from "@tanstack/react-query";
import { DASHBOARD_KEYS } from "@/features/dashboard/hooks/useDashboard";

const ACTIVITY_TYPE_TO_COLOR = {
  LARI: "green",
  RENANG: "blue",
  ANGGAR: "orange",
  TEMBAK: "red",
  OBSTACLE: "gray",
};

function getActivityColor(activityName) {
  if (!activityName) return "blue";
  return ACTIVITY_TYPE_TO_COLOR[activityName.toUpperCase()] ?? "blue";
}

// Map raw API schedule to local event shape
function mapScheduleToEvent(s) {
  const activityName = s.activity?.name;

  return {
    id: s.id,
    date: formatDate(new Date(s.scheduledAt)),
    title: activityName ?? "—",
    startTime: formatTime(s.startAt),
    endTime: formatTime(s.endAt),
    color: getActivityColor(activityName),
    intensity: s.intensity,
    notes: s.notes ?? null,
    status: s.status ?? "scheduled",
  };
}

export function useCalendar() {
  const { showSuccess, showError } = useFeedback();
  const queryClient = useQueryClient();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const STATUS_MESSAGE = {
    active: "Status Latihan Aktif",
    completed: "Status Latihan Selesai",
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const data = await getSchedules();
      setEvents(data.map(mapScheduleToEvent));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate
    .toLocaleString("id-ID", { month: "long" })
    .toUpperCase();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7; // Senin = 0
    const endDow = (lastDay.getDay() + 6) % 7;
    const result = [];

    for (let i = startDow - 1; i >= 0; i--) {
      result.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      result.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }
    const remaining = endDow === 6 ? 0 : 6 - endDow;
    for (let i = 1; i <= remaining; i++) {
      result.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return result;
  }, [year, month]);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, ev) => {
      if (!acc[ev.date]) acc[ev.date] = [];
      acc[ev.date].push(ev);
      return acc;
    }, {});
  }, [events]);

  const addEvent = useCallback(
    async (payloads) => {
      try {
        const results = await Promise.all(payloads.map(createSchedule));
        setEvents((prev) => [...prev, ...results.map(mapScheduleToEvent)]);
        showSuccess("Jadwal Berhasil Ditambahkan");
      } catch (err) {
        console.error(err);
        showError("Gagal menambahkan jadwal");
      }
    },
    [showSuccess, showError],
  );

  const updateEvent = useCallback(
    async (id, { activityId, startTime, endTime, intensity, notes }) => {
      try {
        const dateStr = events.find((ev) => ev.id === id)?.date;
        const res = await updateSchedule(id, {
          ...(activityId && { activityId }),
          startAt: new Date(`${dateStr}T${startTime}`).toISOString(),
          endAt: new Date(`${dateStr}T${endTime}`).toISOString(),
          intensity: intensity.toLowerCase(),
          notes: notes || undefined,
        });
        setEvents((prev) =>
          prev.map((ev) => (ev.id === id ? mapScheduleToEvent(res) : ev)),
        );
        showSuccess("Jadwal berhasil diupdate");
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } catch (err) {
        console.error(err);
        showError("Gagal mengupdate jadwal");
      }
    },
    [events, showSuccess, showError],
  );

  const updateStatus = useCallback(
    async (id, status) => {
      try {
        const res = await updateScheduleStatus(id, status);
        setEvents((prev) =>
          prev.map((ev) => (ev.id === id ? mapScheduleToEvent(res) : ev)),
        );
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        showSuccess(STATUS_MESSAGE[status] ?? "Status berhasil diupdate");
      } catch (err) {
        console.error(err);
        showError("Gagal mengupdate status jadwal");
      }
    },
    [showError, queryClient],
  );

  const removeEvent = useCallback(
    async (id) => {
      try {
        await deleteSchedule(id);
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
        showSuccess("Jadwal berhasil dihapus");
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } catch (err) {
        console.error(err);
        showError("Gagal menghapus jadwal");
      }
    },
    [showSuccess, showError],
  );

  const todayStr = formatDate(today);

  return {
    year,
    month,
    monthName,
    days,
    eventsByDate,
    addEvent,
    goToPrevMonth: () => setCurrentDate(new Date(year, month - 1, 1)),
    goToNextMonth: () => setCurrentDate(new Date(year, month + 1, 1)),
    goToToday: () => setCurrentDate(new Date()),
    todayStr,
    updateEvent,
    updateStatus,
    removeEvent,
    isLoading,
    events,
  };
}
