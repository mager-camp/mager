import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePelatihAtlet } from "@/features/pelatih-dashboard/hooks/usePelatihDashboard";

export default function Index() {
  const navigate = useNavigate();
  const { data: athletes = [], isLoading } = usePelatihAtlet();
  const [query, setQuery] = useState("");

  const filteredAthletes = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return athletes;

    return athletes.filter((athlete) =>
      `${athlete.fullName} ${athlete.email}`.toLowerCase().includes(term)
    );
  }, [athletes, query]);

  return (
    <div className="min-h-full bg-[#f7f7f3] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#133957]">Daftar Atlit</h1>
            <p className="text-sm text-[#8a9db5]">
              Kelola data dan pantau performa dari {athletes.length} atlet aktif
            </p>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 text-sm outline-none focus:border-[#487097] md:max-w-sm"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e8edf2] bg-white shadow-sm">
          <div className="grid grid-cols-[1.4fr_1fr_0.8fr] bg-[#487097] px-6 py-4 text-sm font-semibold text-white">
            <span>Nama Atlit</span>
            <span className="text-center">Kontak</span>
            <span className="text-center">Detail</span>
          </div>

          {isLoading ? (
            <div className="px-6 py-10 text-center text-sm text-[#8a9db5]">
              Memuat daftar atlet...
            </div>
          ) : filteredAthletes.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-[#8a9db5]">
              Tidak ada atlet yang sesuai
            </div>
          ) : (
            <div className="divide-y divide-[#eef3f8]">
              {filteredAthletes.map((athlete) => (
                <div
                  key={athlete.id}
                  className="grid grid-cols-[1.4fr_1fr_0.8fr] items-center gap-4 px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={athlete.profilePicture || "/image/icon/profile.svg"}
                      alt={athlete.fullName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#133957]">{athlete.fullName}</p>
                      <p className="text-xs text-[#8a9db5]">
                        Bergabung {new Date(athlete.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-[#487097]">
                    <p>{athlete.email}</p>
                    <p>{athlete.phone || "-"}</p>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => navigate(`/pelatih/atlet/${athlete.id}`)}
                      className="rounded-lg bg-[#487097] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#133957]"
                    >
                      Lihat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}