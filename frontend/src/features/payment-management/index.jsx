// src/features/payment-management/index.jsx
import React, { useState } from "react";
import PaymentHeader from "./components/PaymentHeader";
import PaymentStats from "./components/PaymentStats";
import PaymentTable from "./components/PaymentTable";
import ActiveMethods from "./components/ActiveMethods";

export default function PaymentManagementFeature() {
  // 1. Data transaksi bawaan lengkap dengan variasi status (Sukses, Pending, Gagal)
  const [transactions] = useState([
    { id: "#10284", name: "Zaenal Fahri Nugroho", email: "zaenalfahrinugroho@gmail.com", package: "Paket 1 bulan", method: "BCA", price: "Rp 250.000", status: "Sukses", date: "Selasa, 12/08/2026", time: "12.09 WIB" },
    { id: "#10285", name: "Dewi Sartika", email: "dewi.sartika88@yahoo.com", package: "Paket 3 bulan", method: "Mandiri", price: "Rp 700.000", status: "Sukses", date: "Rabu, 13/08/2026", time: "09.30 WIB" },
    { id: "#10286", name: "Arif Rahman", email: "arif.rahman@gmail.com", package: "Paket 6 bulan", method: "BRI", price: "Rp 1.200.000", status: "Pending", date: "Kamis, 14/08/2026", time: "15.45 WIB" },
    { id: "#10287", name: "Rian Hidayat", email: "rian.hid@gmail.com", package: "Paket 1 bulan", method: "OVO", price: "Rp 250.000", status: "Gagal", date: "Jumat, 15/08/2026", time: "19.00 WIB" },
  ]);

  // 2. State untuk menyimpan filter status transaksi yang dipilih (Default: "Semua")
  const [statusFilter, setStatusFilter] = useState("Semua");

  // 3. State penampung card metode pembayaran aktif
  const [activeMethodsList, setActiveMethodsList] = useState([
    { id: "init-1", title: "Virtual Account", description: "BCA, Mandiri, BNI" },
    { id: "init-2", title: "E-Wallet", description: "Dana, OVO, GoPay" }
  ]);

  // Logika memilah data transaksi berdasarkan dropdown status
  const filteredTransactions = transactions.filter((tx) => {
    if (statusFilter === "Semua") return true;
    return tx.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleAddNewMethod = (newMethod) => {
    setActiveMethodsList((prev) => [
      ...prev,
      {
        id: `method-${Date.now()}`,
        title: newMethod.jenis === "Bank" ? "Virtual Account" : newMethod.jenis,
        description: `${newMethod.bank} (${newMethod.nomor})`
      }
    ]);
  };

  const handleUpdateExistingMethod = (updatedData) => {
    setActiveMethodsList((prev) =>
      prev.map((item) =>
        item.id === updatedData.id
          ? {
              ...item,
              title: updatedData.jenis === "Bank" ? "Virtual Account" : updatedData.jenis,
              description: `${updatedData.bank} (${updatedData.nomor})`
            }
          : item
      )
    );
  };

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <PaymentHeader />
        <PaymentStats />
        
        {/* Kirim state filter dan fungsinya ke PaymentTable agar dropdown-nya 
          bisa mengubah isi tabel transaksi secara realtime 
        */}
        <PaymentTable 
          transactions={filteredTransactions} 
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
        
        <ActiveMethods 
          methods={activeMethodsList} 
          onAddMethod={handleAddNewMethod} 
          onUpdateMethod={handleUpdateExistingMethod} 
        />
      </div>
    </main>
  );
}