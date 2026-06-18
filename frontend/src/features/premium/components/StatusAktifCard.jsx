import { Award, Lock, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { usePremiumStatus } from "../hooks/usePremium";
import api from "@/lib/api";

function useLastInvoice(enabled) {
  return useQuery({
    queryKey: ["premium", "last-invoice"],
    queryFn:  async () => {
      const { data } = await api.get("/premium-payment/last-invoice");
      return data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}

export default function StatusAktifCard() {
  const navigate = useNavigate();
  const { data, isLoading } = usePremiumStatus();

  const isPremium = data?.isPremium;
  const { data: lastInvoice } = useLastInvoice(!!isPremium);

  if (isLoading) {
    return <div className="h-full bg-gray-100 rounded animate-pulse" />;
  }

  if (!isPremium) {
    return (
      <div className="bg-gray-200 rounded p-5 flex flex-col items-center gap-5 relative overflow-hidden justify-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-white/40 border border-white/40 flex items-center justify-center relative z-10">
          <Lock size={36} className="text-gray-400" />
        </div>

        <div className="relative z-10">
          <p className="text-xl font-black text-gray-500 uppercase tracking-widest">
            Status Nonaktif
          </p>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-xs">
            Aktifkan Premium untuk mendapatkan periodisasi otomatis dan akses penuh ke semua kursus.
          </p>
        </div>

        <button
          onClick={() => navigate("/user/premium/payment")}
          className="relative z-10 px-5 py-2.5 rounded bg-[#ED8936] hover:bg-[#DD6B20] active:scale-[0.98] transition-all text-white text-xs font-black tracking-wider shadow"
        >
          AKTIFKAN PREMIUM
        </button>
      </div>
    );
  }

  const expiredLabel = data?.premiumExpiredAt
    ? new Date(data.premiumExpiredAt).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <div className="bg-gradient-to-br from-[#2B6CB0] via-[#1A4A7A] to-[#1A365D] rounded p-5 flex flex-col items-center gap-5 relative overflow-hidden justify-center">
      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />

      <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center relative z-10">
        <Award size={36} className="text-[#ED8936]" />
      </div>

      <div className="text-center relative z-10">
        <p className="text-xl font-black text-white uppercase tracking-widest">Status Aktif</p>
        <p className="text-xs text-blue-200 mt-2 leading-relaxed">
          Anda adalah member premium MAGER.
        </p>
        {expiredLabel && (
          <p className="text-[10px] text-blue-300 mt-1">
            Berlaku hingga {expiredLabel}
          </p>
        )}
      </div>

      {/* Tombol lihat invoice terakhir */}
      {lastInvoice?.invoiceNumber && (
        <button
          onClick={() => navigate(`/user/premium/payment/invoice/${lastInvoice.invoiceNumber}`)}
          className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors"
        >
          <Receipt size={13} />
          Lihat Invoice Terakhir
        </button>
      )}
    </div>
  );
}