import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, CheckCircle, Clock } from "lucide-react";
import { getInvoice } from "@/services/premiumPaymentService";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style:    "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}


function formatDateTime(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return d.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  }) + " · " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
}

export default function InvoicePage() {
  const { invoiceNumber } = useParams();
  const navigate          = useNavigate();
    const invoiceRef = useRef(null);

    const handleDownload = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `invoice-${invoiceNumber}`,
    });

  const { data: invoice, isLoading, isError } = useQuery({
    queryKey: ["invoice", invoiceNumber],
    queryFn:  () => getInvoice(invoiceNumber),
    staleTime: 1000 * 60 * 10,
  });


  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-gray-400">Memuat invoice...</p>
      </div>
    );
  }

  if (isError || !invoice) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-gray-400">Invoice tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="text-sm text-[#2B6CB0] underline">Kembali</button>
      </div>
    );
  }

  const isPaid = invoice.status === "paid";

  return (
    <div className="p-10 md:p-12 h-full overflow-y-auto flex flex-col items-center">
      {/* Top label */}
      <div className="w-full max-w-md mb-4">
        <p className="text-xs text-gray-400 font-semibold">Nota pembelian user PR</p>
      </div>

      {/* Invoice card */}
      <div
        ref={invoiceRef}
        className="w-full max-w-md bg-white rounded-sm shadow-lg overflow-hidden"
      >
        {/* Logo + status */}
        <div className="flex flex-col items-center pt-8 pb-5 px-6 border-b border-gray-100">
          {/* Logo */}
          <img src="/logo.png" alt="MAGER" className="h-10 mb-4 object-contain" onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }} />
          <p className="text-xl font-black text-[#2B6CB0] tracking-widest hidden">MAGER</p>

          {/* Status badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
            isPaid
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}>
            {isPaid ? <CheckCircle size={12} /> : <Clock size={12} />}
            {isPaid ? "PEMBELIAN SUKSES" : "MENUNGGU PEMBAYARAN"}
          </div>
        </div>

        {/* Transaction info */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">ID Transaksi</p>
              <p className="text-base font-black text-[var(--text-dashboard)]">{invoice.invoiceNumber.replace("INV-", "#")}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Tanggal Transaksi</p>
              <p className="text-xs font-semibold text-gray-700">{formatDateTime(invoice.paidAt ?? invoice.createdAt)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Nama Pembeli</p>
              <p className="text-sm font-bold text-gray-800">{invoice.fullName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Metode Pembayaran</p>
              <p className="text-sm font-bold text-gray-800">{invoice.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Package detail */}
        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">Ringkasan Pembelian</p>
          <p className="text-base font-black text-[var(--text-dashboard)]">{invoice.packageLabel}</p>
          <p className="text-xs text-gray-500 mb-4">{invoice.packageDesc}</p>

          <div className="bg-[#EBF8FF] rounded-lg p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Sub Total</span>
              <span className="font-semibold">{formatRupiah(invoice.amount)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Pajak</span>
              <span>Rp 0</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Biaya Layanan</span>
              <span>Rp 0</span>
            </div>
            <div className="border-t border-blue-200 pt-2 flex justify-between font-black text-[var(--text-dashboard)] text-base">
              <span>Total Pembayaran</span>
              <span>{formatRupiah(invoice.amount)}</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            Ini adalah tanda terima yang dihasilkan secara elektronik. Tidak diperlukan tanda tangan.
            Simpan ini sebagai catatan pelatihan performa elit Anda.
          </p>
        </div>

        {/* Barcode visual */}
        <div className="flex justify-center py-4">
          <div className="flex gap-px">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800"
                style={{
                  width:  `${Math.random() > 0.5 ? 2 : 1}px`,
                  height: "32px",
                  opacity: 0.7 + Math.random() * 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-md mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate(`/user/premium`)}
          className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm py-3 rounded-sm transition-colors"
        >
          <ArrowLeft size={15} />
          Kembali
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-bold text-sm py-3 rounded-sm transition-colors"
        >
          <Download size={15} />
          Download PDF
        </button>
      </div>
    </div>
  );
}