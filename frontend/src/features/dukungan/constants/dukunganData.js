export const JENIS_MASALAH_OPTIONS = [
  "Technical Error",
  "Pertanyaan Akun",
  "Masalah Pembayaran",
  "Bug & Laporan",
  "Permintaan Fitur",
  "Lainnya",
];

export const FAQ_ITEMS = [
  {
    id: 1,
    category: "Jadwal",
    question: "Bagaimana cara menambahkan jadwal latihan?",
    answer:
      "Buka halaman Kalender, lalu isi form di panel kanan: pilih rentang tanggal, jam mulai & selesai, jenis latihan, dan intensitas. Klik 'Tambah Jadwal' untuk menyimpan. Jadwal tidak bisa dibuat untuk tanggal atau waktu yang sudah lewat.",
  },
  {
    id: 2,
    category: "Jadwal",
    question: "Mengapa jadwal saya tidak bisa disimpan?",
    answer:
      "Ada beberapa kemungkinan: (1) Tanggal atau waktu yang dipilih sudah lewat, (2) Jadwal bentrok dengan sesi lain yang sudah ada di jam yang sama, (3) Jam selesai lebih awal dari jam mulai. Periksa pesan error yang muncul di form untuk detail spesifik.",
  },
  {
    id: 3,
    category: "Jadwal",
    question: "Bagaimana cara mengaktifkan pengingat (alarm) untuk jadwal?",
    answer:
      "Saat menambahkan jadwal, aktifkan toggle 'Pengingat' di form dan pilih berapa menit sebelum latihan Anda ingin diingatkan (15, 30, 60, atau 120 menit). Notifikasi akan dikirim via WhatsApp ke nomor yang terdaftar di akun Anda.",
  },
  {
    id: 4,
    category: "Jadwal",
    question: "Bagaimana cara menandai latihan sebagai selesai?",
    answer:
      "Klik event di kalender untuk membuka detail jadwal. Klik 'Mulai Latihan' untuk mengubah status menjadi aktif, lalu klik 'Selesai' setelah latihan berakhir. Workout log akan otomatis tercatat dengan durasi latihan Anda.",
  },
  {
    id: 5,
    category: "Premium",
    question: "Bagaimana cara upgrade ke akun Premium?",
    answer:
      "Buka halaman Premium → klik 'Aktifkan Premium' → pilih paket → klik 'Bayar Sekarang'. Pembayaran diproses melalui Midtrans dan premium langsung aktif setelah pembayaran berhasil. Invoice akan tersedia di halaman Premium.",
  },
  {
    id: 6,
    category: "Premium",
    question: "Apa saja fitur yang didapat setelah upgrade Premium?",
    answer:
      "Dengan Premium, Anda mendapatkan: akses kursus latihan eksklusif (Lari, Renang, dll), periodisasi otomatis (jadwal pemulihan setelah sesi intensitas tinggi), dan ekspor rekap latihan tanpa batas dalam format PDF, CSV, atau Excel.",
  },
  {
    id: 7,
    category: "Premium",
    question: "Jadwal pemulihan otomatis tidak muncul setelah latihan selesai.",
    answer:
      "Jadwal pemulihan hanya dibuat untuk latihan dengan intensitas medium atau heavy, dan hanya untuk akun Premium aktif. Pastikan akun Anda Premium aktif dan intensitas latihan yang diselesaikan adalah medium atau heavy. Pemulihan akan muncul di Kalender setelah latihan ditandai selesai.",
  },
  {
    id: 8,
    category: "Ekspor",
    question: "Bagaimana cara mengekspor rekap latihan?",
    answer:
      "Buka halaman Rekap, pilih periode filter (7 hari, bulan ini, atau semua), lalu di panel Ekspor pilih format (PDF, CSV, atau Excel) dan klik 'Buat & Ekspor'. File akan langsung diunduh ke perangkat Anda.",
  },
  {
    id: 9,
    category: "Ekspor",
    question: "Rekap latihan tidak menampilkan data yang benar.",
    answer:
      "Data rekap diambil dari workout log — sesi yang sudah ditandai 'Selesai'. Pastikan Anda menandai latihan sebagai selesai melalui modal detail jadwal di Kalender. Coba ganti filter periode di bagian atas halaman Rekap.",
  },
  {
    id: 10,
    category: "Akun",
    question: "Bagaimana cara mengubah nomor telepon untuk notifikasi WhatsApp?",
    answer:
      "Buka halaman Pengaturan → edit profil → ubah nomor telepon. Pastikan nomor diawali dengan kode negara (contoh: 628123456789 untuk Indonesia). Notifikasi reminder akan dikirim ke nomor yang diperbarui.",
  },
];