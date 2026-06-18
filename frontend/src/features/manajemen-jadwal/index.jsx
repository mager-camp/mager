import { usePelatihJadwal } from "@/features/pelatih-dashboard/hooks/usePelatihDashboard";

export default function Index() {
  const { data: schedules = [], isLoading } = usePelatihJadwal();

  return (
    <div className="min-h-full bg-[#f7f7f3] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#133957]">Manajemen Jadwal</h1>
          <p className="text-sm text-[#8a9db5]">
            Total {schedules.length} jadwal terdaftar
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm text-[#8a9db5]">
            Memuat jadwal...
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#e8edf2] bg-white shadow-sm">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] bg-[#487097] px-6 py-4 text-sm font-semibold text-white">
              <span>Atlet</span>
              <span>Tanggal</span>
              <span>Status</span>
              <span className="text-center">Detail</span>
            </div>
            <div className="divide-y divide-[#eef3f8]">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] items-center gap-4 px-6 py-4">
                  <div>
                    <p className="font-semibold text-[#133957]">{schedule.user?.fullName || "-"}</p>
                    <p className="text-xs text-[#8a9db5]">{schedule.user?.email || "-"}</p>
                  </div>
                  <div className="text-sm text-[#487097]">
                    {new Date(schedule.scheduleDate).toLocaleString("id-ID")}
                  </div>
                  <div>
                    <span className="rounded-full bg-[#E9F1F8] px-3 py-1 text-xs font-semibold text-[#133957]">
                      {schedule.status}
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="rounded-lg bg-[#487097] px-4 py-2 text-sm font-semibold text-white">
                      Lihat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
