// src/features/payment-management/components/PaymentStats.jsx
import React from "react";

export default function PaymentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Total Pendapatan */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-sm font-semibold text-slate-400">Total Pendapatan</p>
        <h3 className="text-3xl font-bold text-[#1e3240] mt-2">Rp 12.490 Jt</h3>
        <p className="text-xs text-green-500 font-semibold mt-2 flex items-center gap-1">
          ↗ +120% <span className="text-slate-400 font-medium">dari bulan lalu</span>
        </p>
      </div>

      {/* Transaksi Berhasil */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-sm font-semibold text-slate-400">Transaksi Berhasil</p>
        <h3 className="text-3xl font-bold text-[#1e3240] mt-2">760</h3>
        <p className="text-xs text-green-500 font-semibold mt-2 flex items-center gap-1">
          ↗ +120% <span className="text-slate-400 font-medium">dari bulan lalu</span>
        </p>
      </div>

      {/* Transaksi Pending */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-sm font-semibold text-slate-400">Transaksi Pending</p>
        <h3 className="text-3xl font-bold text-[#1e3240] mt-2">12</h3>
        <p className="text-xs text-slate-400 font-medium mt-2">
          Membutuhkan verifikasi manual
        </p>
      </div>
    </div>
  );
}