import React from "react";
import { Wallet, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
};

export default function PaymentStats({ summary, loading }) {
  const totalRevenue = summary?.totalRevenue ?? 0;
  const paidCount = summary?.paidCount ?? 0;
  const pendingCount = summary?.pendingCount ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-slate-400">Total Pendapatan</p>
          <h3 className="text-2xl font-bold text-[#1e3240] mt-2">
            {loading ? "Memuat..." : formatCurrency(totalRevenue)}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-green-600 mt-2">
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          <span>Data dari transaksi paid</span>
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 bg-[#eef3f9] text-[#4a90e2] rounded-bl-xl flex items-center justify-center">
          <Wallet className="w-5 h-5 fill-current opacity-80" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-slate-400">Transaksi Berhasil</p>
          <h3 className="text-2xl font-bold text-[#1e3240] mt-2">
            {loading ? "..." : paidCount}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-green-600 mt-2">
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          <span>Status paid</span>
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 bg-[#eaf4e8] text-[#2e9d45] rounded-bl-xl flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 fill-current opacity-20 stroke-[3]" />
          <CheckCircle2 className="w-5 h-5 text-[#2e9d45] stroke-[3] absolute" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-slate-400">Transaksi Pending</p>
          <h3 className="text-2xl font-bold text-[#1e3240] mt-2">
            {loading ? "..." : pendingCount}
          </h3>
        </div>

        <p className="text-xs font-medium text-slate-400 mt-2">
          Menunggu settlement atau pembayaran user
        </p>

        <div className="absolute top-0 right-0 w-12 h-12 bg-[#fdf2e2] text-[#f49322] rounded-bl-xl flex items-center justify-center">
          <Clock className="w-5 h-5 fill-current opacity-80" />
        </div>
      </div>
    </div>
  );
}
