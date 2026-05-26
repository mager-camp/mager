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
  progress: 65,
  desc: "Saat ini, Anda termasuk dalam 1% atlet pentathlon terbaik di dunia.",
};

export const KURSUS_ITEMS = [
  {
    id: 1,
    slug: "biomekanika-lari-cepat",
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
    slug: "efisiensi-hidrodinamis",
    kategori: "RENANG",
    badge: "PREMIUM",
    title: "Efisiensi Hidrodinamis",
    desc: "Menguasai tendangan lumba-lumba di bawah air dan meminimalkan hambatan selama sprint.",
    durasi: null,
    modul: "6 Modul",
    image: "/swim.jpg",
  },
];

export const KURSUS_DETAIL = {
  "efisiensi-hidrodinamis": {
    id: 2,
    slug: "efisiensi-hidrodinamis",
    kategori: "RENANG",
    badge: "LEVEL PREMIUM",
    title: "Efisiensi Hidrodinamis",
    image: "/swim.jpg",
    totalModul: 6,
    totalDurasi: "4 Jam",
    totalKelas: 4,
    tentang: `Menguasai air bukanlah soal melawan hambatannya, melainkan tentang menyatu dengan alirannya. Dalam Efisiensi Hidrodinamik, kita menghilangkan gerakan-gerakan yang tidak efisien yang menimbulkan hambatan dan berfokus pada ketepatan yang sangat akurat dalam mekanika gerakan renang.

Modul dalam seri MAGER ini menerapkan prinsip-prinsip dinamika fluida tingkat lanjut yang disesuaikan dengan fisiologi manusia. Anda akan belajar mempertahankan tubuh yang ramping, mengoptimalkan sudut penangkapan air untuk dorongan maksimal, serta menyinkronkan pernapasan guna mempertahankan kecepatan puncak tanpa mengorbankan posisi tubuh Anda.`,
    highlights: [
      {
        id: "h1",
        icon: "drag",
        title: "PENURUNAN GAYA SENTRIFUGAL",
        desc: "Jadikan air media percepatan, bukan hambatan.",
      },
      {
        id: "h2",
        icon: "power",
        title: "TENAGA PENGGERAK MAKSIMAL",
        desc: "Optimalkan biomekanika stroke untuk efisiensi tertinggi.",
      },
    ],
    pelatih: {
      nama: "PELATIH JACKSON WANG",
      foto: "/coach.jpg",
      bio: "Seorang mantan pelatih Olimpiades dengan pengalaman lebih dari 20 tahun dalam analisis biomekanika. Pelatih Vukke telah melatih 14 peraih medali emas menggunakan metodologi Fluid Friction-nya.",
      badges: ["GO", "FR"],
    },
    modul: [
      {
        id: 1,
        title: "Dasar-dasar Posisi Tubuh",
        durasi: "23AM VIDEO",
        locked: false,
        subModul: [
          { id: "1a", title: "Pengenalan Hidrodinamika Dasar", durasi: "8 Min", type: "video" },
          { id: "1b", title: "Posisi Streamline Sempurna", durasi: "10 Min", type: "video" },
          { id: "1c", title: "Latihan Posisi di Air", durasi: "5 Min", type: "drill" },
        ],
      },
      {
        id: 2,
        title: "Fase Menarik & Mengangkat",
        durasi: "24AM VIDEO",
        locked: true,
        subModul: [
          { id: "2a", title: "Mekanika Pull Phase", durasi: "12 Min", type: "video" },
          { id: "2b", title: "Lift Force dan Drag Reduction", durasi: "9 Min", type: "video" },
          { id: "2c", title: "Drill: High Elbow Catch", durasi: "3 Min", type: "drill" },
        ],
      },
      {
        id: 3,
        title: "Pola Pernapasan Tingkat Lanjut",
        durasi: "31AM VIDEO",
        locked: true,
        subModul: [
          { id: "3a", title: "Bilateral Breathing Pattern", durasi: "14 Min", type: "video" },
          { id: "3b", title: "Rotasi Tubuh & Timing Napas", durasi: "11 Min", type: "video" },
          { id: "3c", title: "Sprint Breathing Technique", durasi: "6 Min", type: "drill" },
        ],
      },
      {
        id: 4,
        title: "Sinkronisasi Tendangan",
        durasi: "31AM VIDEO",
        locked: true,
        subModul: [
          { id: "4a", title: "Dolphin Kick Mechanics", durasi: "13 Min", type: "video" },
          { id: "4b", title: "Underwater Phase Optimization", durasi: "12 Min", type: "video" },
          { id: "4c", title: "Kick Tempo & Power Balance", durasi: "6 Min", type: "drill" },
        ],
      },
      {
        id: 5,
        title: "Analisis Video & Koreksi",
        durasi: "18AM VIDEO",
        locked: true,
        subModul: [
          { id: "5a", title: "Cara Membaca Analisis Stroke", durasi: "10 Min", type: "video" },
          { id: "5b", title: "Common Errors & Fix", durasi: "8 Min", type: "video" },
        ],
      },
      {
        id: 6,
        title: "Program Latihan 4 Minggu",
        durasi: "15AM VIDEO",
        locked: true,
        subModul: [
          { id: "6a", title: "Week 1-2: Foundation Phase", durasi: "7 Min", type: "video" },
          { id: "6b", title: "Week 3-4: Performance Phase", durasi: "8 Min", type: "video" },
        ],
      },
    ],
  },
  "biomekanika-lari-cepat": {
    id: 1,
    slug: "biomekanika-lari-cepat",
    kategori: "LARI",
    badge: "LEVEL PREMIUM",
    title: "Biomekanika Lari Cepat",
    image: "/runner.webp",
    totalModul: 5,
    totalDurasi: "45 Min",
    totalKelas: 3,
    tentang: `Lari cepat bukan sekadar soal seberapa keras Anda mendorong tanah — melainkan bagaimana tubuh Anda bergerak sebagai satu sistem terintegrasi. Dalam kursus Biomekanika Lari Cepat, kami membedah setiap fase stride untuk mengungkap kebocoran energi tersembunyi yang memperlambat Anda.

Dipandu oleh analisis gaya dan data biomekanika terkini, Anda akan belajar mengoptimalkan ground contact time, memperbaiki postur lari, dan mengembangkan pola rekrutmen otot yang menghasilkan kecepatan maksimal dengan usaha minimal.`,
    highlights: [
      {
        id: "h1",
        icon: "zap",
        title: "GROUND CONTACT OPTIMIZATION",
        desc: "Kurangi waktu kontak tanah untuk stride yang lebih eksplosif.",
      },
      {
        id: "h2",
        icon: "activity",
        title: "POSTUR & ALIGNMENT",
        desc: "Koreksi postur berlari untuk transfer tenaga yang lebih efisien.",
      },
    ],
    pelatih: {
      nama: "PELATIH SARAH CHEN",
      foto: "/coach2.jpg",
      bio: "Mantan sprinter nasional dengan gelar Ph.D. di bidang Kinesiologi. Telah melatih lebih dari 50 atlet ke level kompetitif internasional selama 15 tahun karir kepelatihannya.",
      badges: ["ID", "SG"],
    },
    modul: [
      {
        id: 1,
        title: "Anatomi Lari Cepat",
        durasi: "18 MIN VIDEO",
        locked: false,
        subModul: [
          { id: "1a", title: "Fase-fase dalam Siklus Lari", durasi: "9 Min", type: "video" },
          { id: "1b", title: "Kelompok Otot Kunci", durasi: "9 Min", type: "video" },
        ],
      },
      {
        id: 2,
        title: "Optimasi Ground Contact",
        durasi: "22 MIN VIDEO",
        locked: true,
        subModul: [
          { id: "2a", title: "Mekanika Foot Strike", durasi: "11 Min", type: "video" },
          { id: "2b", title: "Drill: Paw Back Technique", durasi: "11 Min", type: "drill" },
        ],
      },
      {
        id: 3,
        title: "Postur & Arm Drive",
        durasi: "20 MIN VIDEO",
        locked: true,
        subModul: [
          { id: "3a", title: "Head & Shoulder Positioning", durasi: "10 Min", type: "video" },
          { id: "3b", title: "Arm Mechanics for Speed", durasi: "10 Min", type: "video" },
        ],
      },
      {
        id: 4,
        title: "Akselerasi & Top Speed",
        durasi: "25 MIN VIDEO",
        locked: true,
        subModul: [
          { id: "4a", title: "Phase Akselerasi 0-30m", durasi: "13 Min", type: "video" },
          { id: "4b", title: "Mempertahankan Top Speed", durasi: "12 Min", type: "video" },
        ],
      },
      {
        id: 5,
        title: "Program Sprint 3 Minggu",
        durasi: "12 MIN VIDEO",
        locked: true,
        subModul: [
          { id: "5a", title: "Struktur Latihan Mingguan", durasi: "6 Min", type: "video" },
          { id: "5b", title: "Recovery & Progressi Beban", durasi: "6 Min", type: "video" },
        ],
      },
    ],
  },
};