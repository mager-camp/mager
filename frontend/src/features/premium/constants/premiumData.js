export const PERIODISASI_ITEMS = [
  {
    id: 1,
    icon: "leaf",
    title: "Pijat Jaringan Dalam",
    desc: "Fokusah pada kelenturan bagian bawah tubuh.",
    hari: "Hari Ini",
    waktu: "14:00",
    highlight: true,
  },
  {
    id: 2,
    icon: "snowflake",
    title: "Protokol Mandi Es",
    desc: "12 menit pada suhu 10°C untuk meredakan peradangan.",
    hari: "Besok",
    waktu: "08:00",
    highlight: false,
  },
  {
    id: 3,
    icon: "activity",
    title: "Hari Istirahat Aktif",
    desc: "Yoga ringan atau jalan kaki, detak jantung < 110 bpm.",
    hari: "Jumat",
    waktu: "SETIAP HARI",
    highlight: false,
  },
];

export const STATUS_AKTIF = {
  level: "PRO",
  nextLevel: "MASTER",
  progress: 65, // persen menuju MASTER
  desc: "Saat ini, Anda termasuk dalam 1% atlet pentathlon terbaik di dunia.",
};

export const KURSUS_ITEMS = [
  {
    id: 1,
    kategori: "LARI",
    badge: "PREMIUM",
    title: "Biomekanika Lari Cepat",
    desc: "Optimalkan pola pukulan Anda dan kurangi waktu kontak dengan permukaan untuk performa maksimal.",
    durasi: "45 Min",
    modul: null,
    image: "/runner.webp",
  },
  {
    id: 2,
    kategori: "RENANG",
    badge: "PREMIUM",
    title: "Efisiensi Hidrodinamik",
    desc: "Menguasai tendangan lumba-lumba di bawah air dan meminimalkan hambatan selama sprint.",
    durasi: null,
    modul: "4 Modul",
    image: "/swim.jpg",
  },
];