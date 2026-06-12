// src/features/admin-management/components/UserPaymentHistory.jsx
import { ArrowLeft, Printer, CheckCircle2, RefreshCw, FileText } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getStatusLabel(status) {
  if (status === "paid") return "Sukses";
  if (status === "pending") return "Pending";
  if (status === "failed") return "Gagal";
  if (status === "refunded") return "Refund";
  return status || "-";
}

export default function UserPaymentHistory({ user, payments = [], onBack, onPrintStrukClick }) {
  const mainPayment = payments[0] || null;
  const totalPaid = payments
    .filter((item) => item.status === "paid")
    .reduce((sum, item) => sum + Number(item.amount ?? item.price ?? 0), 0);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1e3240]">Riwayat Detail Transaksi</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-all text-sm text-slate-700"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>

          <button
            type="button"
            onClick={() => onPrintStrukClick(mainPayment)}
            disabled={!mainPayment}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4a7ca3] text-white rounded-xl font-semibold shadow-sm hover:bg-[#3b6688] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-4 h-4" /> Cetak Struk Terbaru
          </button>
        </div>
      </div>

      <div className="mb-6">
        <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold shadow-sm">
          {payments.length} Transaksi
        </span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-sm font-medium text-slate-500">
          <span className="text-[#1e3240] font-bold">{user?.fullName || user?.name || "User"}</span>
          <span>•</span>
          <span>{user?.email || "-"}</span>
          <span className="md:ml-auto text-slate-400">TOTAL PAID</span>
          <span className="text-[#2b7bb9] text-lg font-bold md:ml-2">{formatCurrency(totalPaid)}</span>
        </div>
        <hr className="border-slate-200 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
            <h3 className="text-base font-bold text-[#1e3240] mb-5">Daftar Transaksi</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="py-3 pr-4">INVOICE</th>
                    <th className="py-3 px-4">PEMBELIAN</th>
                    <th className="py-3 px-4">TANGGAL</th>
                    <th className="py-3 px-4">TOTAL</th>
                    <th className="py-3 px-4 text-center">STATUS</th>
                    <th className="py-3 pl-4 text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-[#1e3240]">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-slate-400">
                        Belum ada transaksi pembayaran.
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 pr-4 font-bold">{payment.invoiceNumber || "-"}</td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-700">{payment.packageName || "Paket"}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{payment.paymentMethod || "-"}</p>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-bold">{formatDate(payment.date || payment.createdAt)}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-bold">{formatCurrency(payment.amount ?? payment.price)}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${payment.status === "paid" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                            {getStatusLabel(payment.status)}
                          </span>
                        </td>
                        <td className="py-3.5 pl-4 text-center">
                          <button
                            type="button"
                            onClick={() => onPrintStrukClick(payment)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4a7ca3]/10 text-[#4a7ca3] hover:bg-[#4a7ca3]/20 font-bold"
                          >
                            <Printer className="w-3.5 h-3.5" /> Struk
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {mainPayment ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1e3240] mb-5">Detail Transaksi Terbaru</h3>
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-[#1e3240] text-base">{mainPayment.packageName}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{mainPayment.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#1e3240] text-base">{formatCurrency(mainPayment.amount ?? mainPayment.price)}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">1 unit</p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span className="text-[#1e3240]">{formatCurrency(mainPayment.amount ?? mainPayment.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pajak</span>
                  <span className="text-[#1e3240]">Rp 0</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan</span>
                  <span className="text-[#1e3240]">Rp 0</span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between text-base">
                  <span className="text-[#1e3240]">Total</span>
                  <span className="text-[#2b7bb9] font-bold">{formatCurrency(mainPayment.amount ?? mainPayment.price)}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#4a7ca3]/10 rounded-full mx-auto flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#4a7ca3]" />
            </div>
            <h3 className="font-bold text-[#1e3240]">Ringkasan Pembayaran</h3>
            <p className="text-xs text-slate-400 mt-1">Total transaksi user dari backend.</p>
          </div>

          <div className="bg-[#eef6fc] rounded-2xl border border-[#d2e6f4] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#2a5b82] mb-4">Status Terbaru</h3>
            <div className="space-y-3 text-xs font-bold text-[#1e3240]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                {mainPayment ? getStatusLabel(mainPayment.status) : "Belum ada transaksi"}
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#4a7ca3]" />
                {mainPayment ? formatDate(mainPayment.date || mainPayment.createdAt) : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
