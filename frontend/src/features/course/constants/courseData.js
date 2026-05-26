export const NEXT_SESSION = {
  title: "Olahraga Berkuda - Lompat Rintangan",
  location: "Kandang Oakwood",
  intensity: "Tinggi",
  // countdown target: 1 jam 45 menit dari sekarang
  durationSeconds: 1 * 3600 + 45 * 60,
};

export const READINESS = {
  score: 92,
};

export const RECOVERY_WARNING = {
  message:
    "Tingkat hidrasi menurun setelah berenang. Minumlah 500 ml larutan elektrolit sebelum sesi berikutnya.",
};

export const GOALS = [
  {
    id: 1,
    status: "SELESAI",
    title: "LARI LINTAS ALAM",
    metric: "3.2 km",
    detail: "Kecepatan: 4:15/km",
    icon: "run",
  },
  {
    id: 2,
    status: "SELESAI",
    title: "RENANG",
    metric: "200 m",
    detail: "Waktu: 2:05.4",
    icon: "swim",
  },
  {
    id: 3,
    status: "SEDANG BERLANGSUNG",
    title: "ÉPÉE BOUTS",
    metric: "14/20 bouts",
    detail: "Win Rate: 78%",
    icon: "sword",
  },
  {
    id: 4,
    status: "DITUNDA",
    title: "LASER PISTOL",
    metric: "-- pts",
    detail: "Scheduled: 16:00",
    icon: "target",
  },
  {
    id: 5,
    status: "SELANJUTNYA",
    title: "SHOW JUMPING",
    metric: "12 obs",
    detail: "Scheduled: 14:30",
    icon: "horse",
  },
];

export const STATS = {
  vo2max: {
    trend: [52, 54, 53, 55, 56, 55, 68],
    current: 68,
  },
  muatanMingguan: { value: "1,420", unit: "TSS" },
  skorKualitasTidur: { value: 88, unit: "/100" },
  dekatJantung: { value: 42, unit: "bpm" },
  hrv: { value: 65, unit: "ms" },
};