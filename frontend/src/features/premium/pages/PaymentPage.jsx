import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Check, Clock, ChevronRight, Loader2 } from "lucide-react";
import { createPremiumTransaction } from "@/services/premiumPaymentService";
import { queryClient } from "@/providers/QueryProvider";

const PACKAGE = {
  label:       "Paket Premium 1 Bulan",
  price:       250000,
  priceLabel:  "IDR 250,000",
  features: [
    "Kursus Tambahan (Kursus Lari & Renang)",
    "Tips Periodisasi",
    "Ekspor Rekap Latihan Tanpa Batas",
  ],
};

function loadMidtransScript(clientKey) {
  return new Promise((resolve, reject) => {
    if (document.getElementById("midtrans-snap")) return resolve();
    const script    = document.createElement("script");
    script.id       = "midtrans-snap";
    script.src      = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.onload   = resolve;
    script.onerror  = reject;
    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  async function handleBayar() {
    setLoading(true);
    setError(null);

    try {
      // 1. Minta snap token dari BE
      const { snapToken, invoiceNumber } = await createPremiumTransaction("1-bulan");

      // 2. Load Midtrans Snap script
      await loadMidtransScript(import.meta.env.VITE_MIDTRANS_CLIENT_KEY);

      // 3. Buka Snap popup
      window.snap.pay(snapToken, {
        onSuccess: async () => {
          // Invalidate premium cache biar status langsung update
          queryClient.invalidateQueries({ queryKey: ["premium", "status"] });
          navigate(`/user/premium/payment/invoice/${invoiceNumber}`);
        },
        onPending: () => {
          navigate(`/user/premium/payment/invoice/${invoiceNumber}`);
        },
        onError: (result) => {
          console.error("Snap error:", result);
          setError("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          // User tutup popup tanpa bayar — ga apa2
        },
      });
    } catch (err) {
      console.error(err);
      setError("Gagal memulai pembayaran. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 md:p-12 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-[var(--text-dashboard)] uppercase tracking-tight">
          Pembayaran Paket Premium
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tingkatkan disiplin Anda. Konfirmasikan detail langganan Anda di bawah ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 ">
        {/* Kiri — info & CTA */}
        <div className="flex flex-col gap-5">
          {/* Package summary */}
          <div className="bg-white rounded border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-black px-2.5 py-1 rounded bg-[#ED8936] text-white tracking-wider">
                PREMIUM BADGE
              </span>
            </div>

            <h2 className="text-xl font-black text-[var(--text-dashboard)] mb-1">
              {PACKAGE.label}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Akses penuh semua fasilitas & course latihan
            </p>

            <div className="border-t border-gray-100 pt-4 mb-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Fasilitas yang Didapatkan
              </p>
              <div className="flex flex-col gap-2">
                {PACKAGE.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ED8936] flex items-center justify-center shrink-0">
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className="bg-gray-50 rounded-sm p-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Sub Total</span>
                <span>{PACKAGE.priceLabel}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Pajak</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Biaya Layanan</span>
                <span>Rp 0</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-black text-[var(--text-dashboard)] text-base">
                <span>Total Pembayaran</span>
                <span>{PACKAGE.priceLabel}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-3 leading-relaxed text-center">
              Dengan memulai transaksi ini, Anda menyetujui Ketentuan MAGER.
              Langganan Anda akan diperpanjang secara otomatis hingga dibatalkan.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-semibold">
              {error}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleBayar}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#ED8936] hover:bg-[#DD6B20] disabled:opacity-60 active:scale-[0.98] transition-all text-white font-black text-sm py-4 rounded shadow"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Memproses...</>
            ) : (
              <>BAYAR SEKARANG <ChevronRight size={16} /></>
            )}
          </button>
        </div>

        {/* Kanan — security info */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#EBF8FF] border border-[#BEE3F8] rounded p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-[#2B6CB0]" />
              <p className="text-sm font-black text-[#2B6CB0] uppercase tracking-wider">
                Pembayaran Aman
              </p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Transaksi Anda diproses secara aman melalui Midtrans. Kami tidak menyimpan data kartu Anda.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-[#ED8936]" />
              <p className="text-sm font-black text-[var(--text-dashboard)] uppercase tracking-wider">
                Aktivasi Instan
              </p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Premium aktif langsung setelah pembayaran berhasil. Tidak ada proses manual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}