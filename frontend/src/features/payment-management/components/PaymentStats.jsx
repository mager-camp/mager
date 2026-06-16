// src/features/payment-management/components/PaymentStats.jsx
import React from "react";
import { Wallet, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";

export default function PaymentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      {/* 1. CARD TOTAL PENDAPATAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-slate-400">Total Pendapatan</p>
          <h3 className="text-2xl font-bold text-[#1e3240] mt-2">Rp 12.490 Jt</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-green-600 mt-2">
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          <span>120% dari bulan lalu</span>
        </div>
        
        {/* 🎯 Kotak icon nempel pas di pojok kanan atas ala Active Methods */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-[#eef3f9] text-[#4a90e2] rounded-bl-xl flex items-center justify-center">
          <Wallet className="w-5 h-5 fill-current opacity-80" />
        </div>
      </div>

      {/* 2. CARD TRANSAKSI BERHASIL */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-slate-400">Transaksi Berhasil</p>
          <h3 className="text-2xl font-bold text-[#1e3240] mt-2">760</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-green-600 mt-2">
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          <span>120% dari bulan lalu</span>
        </div>
        
        {/* 🎯 Kotak icon nempel pas di pojok kanan atas ala Active Methods */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-[#eaf4e8] text-[#2e9d45] rounded-bl-xl flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 fill-current opacity-20 stroke-[3]" />
          <CheckCircle2 className="w-5 h-5 text-[#2e9d45] stroke-[3] absolute" />
        </div>
      </div>

      {/* 3. CARD TRANSAKSI PENDING */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-slate-400">Transaksi Pending</p>
          <h3 className="text-2xl font-bold text-[#1e3240] mt-2">12</h3>
        </div>
        <p className="text-xs font-medium text-slate-400 mt-2">
          Membutuhkan verifikasi manual
        </p>
        
        {/* 🎯 Kotak icon nempel pas di pojok kanan atas ala Active Methods */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-[#fdf2e2] text-[#f49322] rounded-bl-xl flex items-center justify-center">
          <Clock className="w-5 h-5 fill-current opacity-80" />
        </div>
      </div>

    </div>
  );
}