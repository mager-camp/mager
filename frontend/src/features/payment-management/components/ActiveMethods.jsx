// src/features/payment-management/components/ActiveMethods.jsx
import React from "react";

export default function ActiveMethods() {
  return (
    <div>
      <h3 className="text-lg font-bold text-[#1e3240] mb-1">Metode Pembayaran Aktif</h3>
      <p className="text-xs text-slate-400 font-medium mb-4">Konfigurasi saluran pembayaran untuk user anda</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Card 1 - VA */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <h4 className="font-bold text-slate-700 text-sm">Virtual Account</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">BCA, Mandiri, BNI</p>
            <span className="inline-block mt-3 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">AKTIF</span>
          </div>
          <button className="text-slate-400 hover:text-[#4a7ca3] text-xs">✏️</button>
        </div>

        {/* Card 2 - EWallet */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <h4 className="font-bold text-slate-700 text-sm">E-Wallet</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Dana, OVO, GoPay</p>
            <span className="inline-block mt-3 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">AKTIF</span>
          </div>
          <button className="text-slate-400 hover:text-[#4a7ca3] text-xs">✏️</button>
        </div>

        {/* Card 3 - Tambah Baru */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 transition-colors bg-slate-50/50">
          <span className="text-xl text-slate-400 font-bold">+</span>
          <span className="text-xs font-semibold text-slate-500 mt-1">Integrasi Baru</span>
        </div>
      </div>
    </div>
  );
}