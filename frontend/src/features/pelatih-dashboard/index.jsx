export default function DashboardPelatih() {
  const stats = [
    {
      title: "Total Atlet",
      value: 50,
    },
    {
      title: "Total Kursus",
      value: 20,
    },
    {
      title: "Total Jadwal",
      value: 5,
      sub: "/ hari",
    },
  ];

  const jadwal = [
    {
      nama: "Zaenal Fahri Nugroho",
      tanggal: "05/05/2026",
      waktu: "10.00",
      latihan: "Renang",
      intensitas: "LOW",
    },
    {
      nama: "Gufron Ali Marjiet",
      tanggal: "06/05/2026",
      waktu: "13.00",
      latihan: "Renang",
      intensitas: "MED",
    },
    {
      nama: "ganjar Ponoro",
      tanggal: "07/05/2026",
      waktu: "14.00",
      latihan: "Renang",
      intensitas: "HIGH",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-blue-700">
        Halo, Pelatih!
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow border p-5"
          >
            <p className="text-gray-500">
              {item.title}
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-4xl font-bold text-green-600">
                {item.value}
              </span>

              <span className="text-gray-500">
                {item.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="bg-blue-500 text-white p-4 font-semibold">
          Jadwal Terbaru Pengguna
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Waktu</th>
              <th className="p-3 text-left">Jenis Latihan</th>
              <th className="p-3 text-left">Intensitas</th>
            </tr>
          </thead>

          <tbody>
            {jadwal.map((item, index) => (
              <tr
                key={index}
                className="border-b"
              >
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.tanggal}</td>
                <td className="p-3">{item.waktu}</td>
                <td className="p-3">{item.latihan}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    {item.intensitas}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Daftar Kursus
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow border overflow-hidden"
            >
              <div className="h-40 bg-slate-200" />

              <div className="p-4">
                <h3 className="font-bold">
                  Biomekanika Lari Cepat
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Optimalkan pola pukulan Anda dan kurangi
                  waktu kontak dengan permukaan.
                </p>

                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded">
                    Edit
                  </button>

                  <button className="px-4 py-2 border rounded">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}