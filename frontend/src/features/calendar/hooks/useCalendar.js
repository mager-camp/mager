import { useState, useMemo, useCallback } from "react";
import {
  INITIAL_EVENTS,
  JENIS_LATIHAN_OPTIONS,
} from "../constants/calendarData";
import { useFeedback } from "@/hooks/useFeedback";

let nextId = INITIAL_EVENTS.length + 1;

function formatDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}
export function useCalendar() {
  const { showSuccess, showError } = useFeedback();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate
    .toLocaleString("id-ID", { month: "long" })
    .toUpperCase();

  // Generate array of day objects untuk grid
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

  // Map events by date string "YYYY-MM-DD"
  const eventsByDate = useMemo(() => {
    return events.reduce((acc, ev) => {
      if (!acc[ev.date]) acc[ev.date] = [];
      acc[ev.date].push(ev);
      return acc;
    }, {});
  }, [events]);

  // Tambah event baru dari form data
  const addEvent = useCallback((formData) => {
    const jenisOption = JENIS_LATIHAN_OPTIONS.find(
      (o) => o.value === formData.jenisLatihan,
    );

    const from = new Date(formData.dateRange.from);
    const to = new Date(formData.dateRange.to);

    const newEvents = [];

    const current = new Date(from);

    while (current <= to) {
      newEvents.push({
        id: nextId++,

        date: formatDate(current),

        title: jenisOption?.label ?? formData.jenisLatihan,

        startTime: formData.startTime,
        endTime: formData.endTime,

        color: jenisOption?.color ?? "blue",

        intensity: formData.intensity,

        notes: formData.targetFokus ?? "",
      });

      current.setDate(current.getDate() + 1);
    };
    
    showSuccess("Jadwal Berhasil Ditambahkan");
    setEvents((prev) => [...prev, ...newEvents]);

    setCurrentDate(new Date(from.getFullYear(), from.getMonth(), 1));
  }, []);

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());


  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return {
    year,
    month,
    monthName,
    days,
    eventsByDate,
    addEvent,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    todayStr,
  };
}
