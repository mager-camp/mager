// frontend\src\features\payment-management\index.jsx
import React, { useState } from "react";
import PaymentHeader from "./components/PaymentHeader";
import PaymentStats from "./components/PaymentStats";
import PaymentTable from "./components/PaymentTable";
import ActiveMethods from "./components/ActiveMethods";

export default function PaymentManagementFeature() {
  // Simulasi data dummy transaksi finansial sesuai mockup gambar
  const [transactions] = useState([
    { id: "#10284", name: "Zaenal Fahri Nugroho", email: "zaenalfahrinugroho@gmail.com", package: "Paket 1 bulan", method: "BCA", price: "Rp 250.000", status: "Sukses", date: "Selasa, 12/08/2026", time: "12.09 WIB" },
    { id: "#10285", name: "Dewi Sartika", email: "dewi.sartika88@yahoo.com", package: "Paket 3 bulan", method: "Mandiri", price: "Rp 700.000", status: "Sukses", date: "Rabu, 13/08/2026", time: "09.30 WIB" },
    { id: "#10286", name: "Arif Rahman", email: "arif.rahman@gmail.com", package: "Paket 6 bulan", method: "BRI", price: "Rp 1.200.000", status: "Pending", date: "Kamis, 14/08/2026", time: "15.45 WIB" },
  ]);

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <PaymentHeader />
        <PaymentStats />
        <PaymentTable transactions={transactions} />
        <ActiveMethods />
      </div>
    </main>
  );
}