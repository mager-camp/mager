import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePelatihAtlet } from "@/features/pelatih-dashboard/hooks/usePelatihDashboard";

export default function Index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: athletes = [], isLoading } = usePelatihAtlet();

  const athlete = useMemo(
    () => athletes.find((item) => item.id === id),
    [athletes, id]
  );

  if (isLoading) {
    return (
      <div className="min-h-full bg-[#f7f7f3] p-8 text-center text-sm text-[#8a9db5]">
        Memuat profil atlet...
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="min-h-full bg-[#f7f7f3] p-8 text-center text-sm text-[#8a9db5]">
        Atlet tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f7f7f3] p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/pelatih/atlet")}
            className="rounded-xl border border-[#133957] px-4 py-2 text-sm font-semibold text-[#133957]"
          >
            Kembali
          </button>
          <button className="rounded-xl bg-[#4682A9] px-5 py-3 text-sm font-semibold text-white">
            Kirim Pesan
          </button>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <img
              src={athlete.profilePicture || "/image/icon/profile.svg"}
              alt={athlete.fullName}
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#133957]">{athlete.fullName}</h1>
              <p className="text-sm text-[#8a9db5]">{athlete.email}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold uppercase tracking-[0.2em] text-[#133957]">
              Informasi User
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <span className="text-[#8a9db5]">Nama Lengkap</span>
                <p className="font-semibold text-[#133957]">{athlete.fullName}</p>
              </div>
              <div>
                <span className="text-[#8a9db5]">Email</span>
                <p className="font-semibold text-[#133957]">{athlete.email}</p>
              </div>
              <div>
                <span className="text-[#8a9db5]">Telepon</span>
                <p className="font-semibold text-[#133957]">{athlete.phone || "-"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#E9F1F8] p-6 shadow-sm">
            <h2 className="text-base font-bold uppercase tracking-[0.2em] text-[#133957]">
              Status Langganan
            </h2>
            <p className="mt-4 text-sm text-[#133957]">
              {athlete.isPremium ? "Premium aktif" : "Belum berlangganan premium"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}