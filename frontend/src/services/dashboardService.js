import api from "@/lib/api";

export const getDashboardSummary = async () => {
  const res = await api.get("/dashboard/summary");
  return res.data.data;
};

export const getSchedules = async () => {
  const res = await api.get("/schedules");
  return res.data.data;
};

// Derived dari schedules — hitung aktivitas per hari 7 hari terakhir
export const getWeeklyProgress = async () => {
  const data = await getSchedules();
  const now  = new Date();

  // Buat map 7 hari terakhir
  const days = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days[d.toISOString().split("T")[0]] = 0;
  }

  // Hitung jadwal per hari (pakai startAt biar akurat ke tanggal lokal)
  data.forEach((s) => {
    const dateStr = new Date(s.startAt).toLocaleDateString("sv"); // "YYYY-MM-DD"
    if (dateStr in days) days[dateStr]++;
  });

  return Object.entries(days).map(([date, workouts]) => ({ date, workouts }));
};

// Jadwal hari ini
export const getTodaySchedules = async () => {
  const data    = await getSchedules();
  const todayStr = new Date().toLocaleDateString("sv");
  return data.filter((s) => new Date(s.startAt).toLocaleDateString("sv") === todayStr);
};

// Sesi berikutnya (terdekat dari sekarang, status pending)
export const getNextSession = async () => {
  const data = await getSchedules();
  const now  = new Date();
  const upcoming = data
    .filter((s) => new Date(s.startAt) >= now && s.status === "scheduled")
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
  return upcoming[0] ?? null;
};