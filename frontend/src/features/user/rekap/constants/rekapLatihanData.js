export const TIME_FILTERS = ["7 Hari Terakhir", "Bulan Lalu", "Kustom"];

export const SUMMARY_STATS = {
  "7 Hari Terakhir": {
    volumeLatihan:      { value: "14,250", unit: "LBS", change: "+12% dari periode sebelumnya", up: true },
    skorKinerja:        { value: 88, outOf: 100, label: "— Konsisten" },
    efisiensiPemulihan: { value: 92, unit: "%", label: "Kondisi Optimal", up: true },
  },
  "Bulan Lalu": {
    volumeLatihan:      { value: "58,100", unit: "LBS", change: "+8% dari periode sebelumnya", up: true },
    skorKinerja:        { value: 84, outOf: 100, label: "— Stabil" },
    efisiensiPemulihan: { value: 88, unit: "%", label: "Kondisi Baik", up: true },
  },
  "Kustom": {
    volumeLatihan:      { value: "--", unit: "LBS", change: "Pilih rentang tanggal", up: null },
    skorKinerja:        { value: "--", outOf: 100, label: "— Pilih rentang" },
    efisiensiPemulihan: { value: "--", unit: "%", label: "Pilih rentang", up: null },
  },
};

export const INTENSITY_COLOR = {
  Tinggi: "bg-red-500",
  Sedang: "bg-orange-400",
  Rendah: "bg-blue-400",
  Ringan: "bg-purple-400",
};

export const SESSIONS = {
  "7 Hari Terakhir": [
    { id: 1, icon: "zap",    title: "Latihan Interval Sprint", tanggal: "20 Mei 2025", durasi: "45m",    intensitas: "Tinggi", status: "Completed" },
    { id: 2, icon: "weight", title: "Angkat Berat: Bawah",     tanggal: "19 Mei 2025", durasi: "1j 15m", intensitas: "Sedang", status: "Completed" },
    { id: 3, icon: "waves",  title: "Pemulihan Aktif",         tanggal: "18 Mei 2025", durasi: "30m",    intensitas: "Rendah", status: "Completed" },
    { id: 4, icon: "move",   title: "Alur Mobilitas",          tanggal: "17 Mei 2025", durasi: "40m",    intensitas: "Ringan", status: "Completed" },
  ],
  "Bulan Lalu": [
    { id: 5, icon: "zap",    title: "Sprint Lapangan",         tanggal: "10 Apr 2025", durasi: "50m",    intensitas: "Tinggi", status: "Completed" },
    { id: 6, icon: "weight", title: "Angkat Berat: Atas",      tanggal: "08 Apr 2025", durasi: "1j 00m", intensitas: "Sedang", status: "Completed" },
    { id: 7, icon: "waves",  title: "Renang Endurance",        tanggal: "05 Apr 2025", durasi: "1j 20m", intensitas: "Sedang", status: "Completed" },
    { id: 8, icon: "move",   title: "Yoga & Stretching",       tanggal: "02 Apr 2025", durasi: "45m",    intensitas: "Ringan", status: "Completed" },
  ],
  "Kustom": [],
};

export const SCOPE_OPTIONS  = ["BULANAN", "MINGGUAN"];
export const FORMAT_OPTIONS = ["PDF", "CSV", "Excel"];