import { useState, useMemo, useCallback } from "react";
import { INITIAL_EVENTS, JENIS_LATIHAN_OPTIONS } from "../constants/calendarData";

let nextId = INITIAL_EVENTS.length + 1;

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate
    .toLocaleString("id-ID", { month: "long" })
    .toUpperCase();

  // Generate array of day objects untuk grid
  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay  = new Date(year, month + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7; // Senin = 0
    const endDow   = (lastDay.getDay()  + 6) % 7;
    const result   = [];

    for (let i = startDow - 1; i >= 0; i--) {
      result.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      result.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }
    const remaining = endDow === 6 ? 0 : 6 - endDow;
    for (let i = 1; i <= remaining; i++) {
      result.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
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
      (o) => o.value === formData.jenisLatihan
    );

    const newEvent = {
      id:        nextId++,
      date:      formData.date,                          // "YYYY-MM-DD"
      title:     jenisOption?.label ?? formData.jenisLatihan,
      time:      formData.time,
      color:     jenisOption?.color ?? "blue",
      intensity: formData.intensity,
      notes:     formData.targetFokus ?? "",
    };

    setEvents((prev) => [...prev, newEvent]);

    // Navigasi ke bulan event yang baru ditambahkan
    const [y, m] = formData.date.split("-").map(Number);
    setCurrentDate(new Date(y, m - 1, 1));
  }, []);

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday    = () => setCurrentDate(new Date(2025, 9, 1));

  const today    = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return {
    year, month, monthName,
    days, eventsByDate,
    addEvent,
    goToPrevMonth, goToNextMonth, goToToday,
    todayStr,
  };
}