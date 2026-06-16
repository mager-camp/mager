// src/features/payment-management/components/PaymentTable.jsx
import React from "react";

export default function PaymentTable({ transactions }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-[#1e3240]">Riwayat Transaksi</h3>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 focus:outline-none">
            <option>Semua</option>
            <option>Sukses</option>
            <option>Pending</option>
            <option>Gagal</option>
          </select>
          <button className="bg-[#4a7ca3]/10 text-[#4a7ca3] hover:bg-[#4a7ca3]/20 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
            Unduh Rekap (PDF/CSV)
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-4">ID Transaksi</th>
              <th className="py-4 px-4">Nama User</th>
              <th className="py-4 px-4">Paket Pembelian</th>
              <th className="py-4 px-4">Metode</th>
              <th className="py-4 px-4">Harga</th>
              <th className="py-4 px-4 text-center">Status Pembelian</th>
              <th className="py-4 px-4">Tanggal Pembelian</th>
              <th className="py-4 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-50">
            {transactions.map((tx, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 text-slate-400 font-mono">{tx.id}</td>
                <td className="py-4 px-4">
                  <div className="font-semibold text-[#1e3240]">{tx.name}</div>
                  <div className="text-xs text-slate-400 font-normal">{tx.email}</div>
                </td>
                <td className="py-4 px-4 text-slate-500">{tx.package}</td>
                <td className="py-4 px-4 font-semibold text-slate-600">{tx.method}</td>
                <td className="py-4 px-4 font-semibold text-[#1e3240]">{tx.price}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    tx.status === "Sukses" ? "bg-green-50 text-green-600" :
                    tx.status === "Pending" ? "bg-amber-50 text-amber-600" :
                    "bg-red-50 text-red-600"
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[#1e3240]">{tx.date}</div>
                  <div className="text-[11px] text-slate-400">{tx.time}</div>
                </td>
                <td className="py-4 px-4 text-center">
                  <button className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2">
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
        <span>Menampilkan 1 dari 120 Daftar Transaksi</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">&lt; Sebelumnya</button>
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">Selanjutnya &gt;</button>
        </div>
      </div>
    </div>
  );
}