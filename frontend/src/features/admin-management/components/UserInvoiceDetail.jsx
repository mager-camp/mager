// src/features/admin-management/components/UserInvoiceDetail.jsx
import { ArrowLeft, Download } from "lucide-react";
import magerLogo from "@/assets/mager.svg";

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
  if (status === "paid") return "Pembelian Sukses";
  if (status === "pending") return "Pembayaran Pending";
  if (status === "failed") return "Pembayaran Gagal";
  return status || "Transaksi";
}

export default function UserInvoiceDetail({ user, payment, onBack }) {
  const amount = payment?.amount ?? payment?.price ?? 0;
  const invoiceData = {
    id: payment?.invoiceNumber || "-",
    date: formatDate(payment?.date || payment?.paidAt || payment?.createdAt),
    buyer: user?.fullName || payment?.userName || "-",
    method: payment?.paymentMethod || "-",
    productName: payment?.packageName || "Paket Premium",
    productDesc: "Akses penuh semua fasilitas & course latihan",
    subTotal: formatCurrency(amount),
    tax: "Rp 0",
    serviceFee: "Rp 0",
    total: formatCurrency(amount),
    status: getStatusLabel(payment?.status),
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden !important;
          }
          .print-container-invoice, .print-container-invoice * {
            visibility: visible !important;
          }
          .print-container-invoice {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          @page {
            margin: 0;
          }
        }
      `}} />

      <div className="print-container-invoice bg-[#f8fafc] min-h-screen font-sans text-slate-800 py-8 print:bg-white print:py-0">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 relative overflow-hidden print:border-none print:shadow-none print:p-8">
          <div className="flex justify-center mb-6">
            <img src={magerLogo} alt="Mager" className="h-10 w-auto object-contain" />
          </div>

          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#d1fad7] text-[#1f8734] rounded-full text-xs font-bold shadow-sm border border-[#bbf7c3] uppercase tracking-wide">
              ✓ {invoiceData.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-6 text-left border-b border-slate-100 pb-6 mb-6">
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">ID Transaksi</p>
              <p className="text-base font-bold text-[#1e3240] mt-0.5">{invoiceData.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Tanggal Transaksi</p>
              <p className="text-base font-bold text-[#1e3240] mt-0.5">{invoiceData.date}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Nama Pembeli</p>
              <p className="text-base font-bold text-[#1e3240] mt-0.5">{invoiceData.buyer}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Metode Pembayaran</p>
              <p className="text-base font-bold text-[#1e3240] mt-0.5">{invoiceData.method}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide mb-2">Ringkasan Pembelian</p>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-[#1e3240] text-base">{invoiceData.productName}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{invoiceData.productDesc}</p>
              </div>
              <span className="font-bold text-[#1e3240] text-base">{invoiceData.total}</span>
            </div>

            <div className="bg-[#eef6fc] rounded-2xl p-6 mt-6 border border-[#dae9f4] space-y-3.5 text-sm font-semibold text-slate-600 print:bg-[#eef6fc]">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span className="text-[#1e3240]">{invoiceData.subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Pajak</span>
                <span className="text-[#1e3240]">{invoiceData.tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan</span>
                <span className="text-[#1e3240]">{invoiceData.serviceFee}</span>
              </div>
              <hr className="border-[#dae9f4] my-2" />
              <div className="flex justify-between text-base font-bold">
                <span className="text-[#1e3240]">Total Pembayaran</span>
                <span className="text-[#2b7bb9]">{invoiceData.total}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
              Ini adalah tanda terima yang dihasilkan secara elektronik. Tidak diperlukan tanda tangan.
            </p>
          </div>

          <div className="flex justify-center items-center gap-6 mt-8 pt-4 border-t border-slate-100 print:hidden">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={!payment}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>

          <div className="flex justify-center mt-8 opacity-30">
            <div className="flex gap-[2px] h-8 items-center">
              {[2,1,4,2,1,3,1,4,2,1,2,3,1,4,1,2,3,2,1,4,3,1,2].map((w, i) => (
                <div key={i} className="bg-slate-800 h-full" style={{ width: `${w}px` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
