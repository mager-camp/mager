import { useFeedback } from "@/hooks/useFeedback";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  getSchedules,
  createSchedule,
  deleteSchedule,
  updateSchedule,
  updateScheduleStatus,
  createWorkoutLog,
} from "@/services/scheduleService";
import { formatDate, formatTime } from "../utils/dateUtils";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

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
    alarmEnabled: s.alarmEnabled ?? false,
    alarmAt: s.alarmAt ?? null,
    userName: s.user?.fullName ?? null,
    userId: s.user?.id ?? null,
  };
}

export function useCalendar({ isInstructor = false } = {}) {
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
      let data;
      if (isInstructor) {
        const res = await api.get("/schedules/instructor/all-schedules");
        data = res.data.data;
      } else {
        data = await getSchedules();
      }
      setEvents(data.map(mapScheduleToEvent));
      setIsLoading(false);
    }
    fetchData();
  }, [isInstructor]);

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
      // Kirim satu per satu (bukan Promise.all) supaya overlap antar hari dalam
      // rentang yang sama juga ke-detect, dan error bisa di-throw ke caller
      const results = [];
      for (const payload of payloads) {
        const res = await createSchedule(payload); // ← biarkan throw kalau error
        results.push(res);
      }

      setEvents((prev) => [...prev, ...results.map(mapScheduleToEvent)]);
      showSuccess("Jadwal Berhasil Ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    [queryClient, showSuccess],
    // ← hapus showError dari sini, error dihandle di AddProgramPanel
  );

  const updateEvent = useCallback(
    async (
      id,
      {
        activityId,
        startTime,
        endTime,
        intensity,
        notes,
        alarmEnabled,
        alarmAt,
      },
    ) => {
      const dateStr = events.find((ev) => ev.id === id)?.date;

      const payload = {
        ...(activityId && { activityId }),

        startAt: new Date(`${dateStr}T${startTime}`).toISOString(),

        endAt: new Date(`${dateStr}T${endTime}`).toISOString(),

        intensity: intensity.toLowerCase(),

        notes: notes || undefined,

        alarmEnabled,
      };

      if (alarmEnabled && alarmAt) {
        payload.alarmAt = new Date(`${dateStr}T${alarmAt}`).toISOString();
      } else {
        payload.alarmAt = null;
      }

      const res = await updateSchedule(id, payload);
      console.log("UPDATE RES", res);
      setEvents((prev) =>
        prev.map((ev) => (ev.id === id ? mapScheduleToEvent(res) : ev)),
      );

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      showSuccess("Jadwal berhasil diupdate");

      return res;
    },
    [events, queryClient, showSuccess],
  );

  const assignEvent = useCallback(
    async (payloads, targetUserId) => {
      const results = [];
      for (const payload of payloads) {
        const { data } = await api.post(
          `/schedules/instructor/assign/${targetUserId}`,
          payload,
        );
        results.push(data.data);
      }
      // Jadwal yang di-assign ke atlet lain TIDAK muncul di kalender instructor
      // Cukup tampilkan success
      showSuccess(`${results.length} jadwal berhasil di-assign ke atlet`);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    [queryClient, showSuccess],
  );

  const updateStatus = useCallback(
    async (id, status) => {
      try {
        if (status === "completed") {
          const event = events.find((ev) => ev.id === id);

          const [startH, startM] = event.startTime.split(".").map(Number);
          const [endH, endM] = event.endTime.split(".").map(Number);
          const durationMinutes = Math.max(
            endH * 60 + endM - (startH * 60 + startM),
            1,
          );

          await createWorkoutLog({ userScheduleId: id, durationMinutes });

          // BE sudah update status jadi completed via completeScheduleRepo
          setEvents((prev) =>
            prev.map((ev) =>
              ev.id === id ? { ...ev, status: "completed" } : ev,
            ),
          );
        } else {
          const res = await updateScheduleStatus(id, status);
          setEvents((prev) =>
            prev.map((ev) => (ev.id === id ? mapScheduleToEvent(res) : ev)),
          );
        }

        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        showSuccess(STATUS_MESSAGE[status] ?? "Status berhasil diupdate");
      } catch (err) {
        console.error(err);
        showError("Gagal mengupdate status jadwal");
      }
    },
    [events, showError, showSuccess, queryClient],
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
    assignEvent,
  };
}
