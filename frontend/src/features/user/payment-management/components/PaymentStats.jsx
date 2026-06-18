import React from "react";
import {
  Wallet,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

const formatShortNumber = (value) => {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
  }).format(value);
};

const formatCompactCurrency = (value) => {
  const amount = Number(value ?? 0);

  if (amount >= 1_000_000_000) {
    return `Rp ${formatShortNumber(amount / 1_000_000_000)} M`;
  }

  if (amount >= 1_000_000) {
    return `Rp ${formatShortNumber(amount / 1_000_000)} Jt`;
  }

  if (amount >= 1_000) {
    return `Rp ${formatShortNumber(amount / 1_000)} Rb`;
  }

  return `Rp ${formatShortNumber(amount)}`;
};

const getTrendLabel = ({ currentMonth = 0, previousMonth = 0, percent = 0 }) => {
  if (previousMonth === 0 && currentMonth > 0) {
    return "Baru bulan ini";
  }

  if (previousMonth === 0 && currentMonth === 0) {
    return "0% dari bulan lalu";
  }

  const sign = percent > 0 ? "+" : "";
  return `${sign}${percent}% dari bulan lalu`;
};

const getTrendIcon = (percent) => {
  if (percent > 0) return ArrowUpRight;
  if (percent < 0) return ArrowDownRight;
  return Minus;
};

const getTrendColor = (percent, mode = "upGood") => {
  if (percent === 0) return "text-slate-400";

  if (mode === "downGood") {
    return percent < 0 ? "text-green-600" : "text-red-500";
  }

  return percent > 0 ? "text-green-600" : "text-red-500";
};

function TrendLabel({
  currentMonth = 0,
  previousMonth = 0,
  percent = 0,
  mode = "upGood",
}) {
  const TrendIcon = getTrendIcon(percent);

  return (
    <div
      className={`flex items-center gap-1 text-xs font-bold mt-2 ${getTrendColor(
        percent,
        mode
      )}`}
    >
      <TrendIcon className="w-4 h-4 stroke-[3]" />

      <span>
        {getTrendLabel({
          currentMonth,
          previousMonth,
          percent,
        })}
      </span>
    </div>
  );
}

export default function PaymentStats({ summary, loading }) {
  const totalRevenue = summary?.totalRevenue ?? 0;
  const paidCount = summary?.paidCount ?? 0;
  const pendingCount = summary?.pendingCount ?? 0;

  const revenueCurrentMonth = summary?.totalRevenueCurrentMonth ?? 0;
  const revenuePreviousMonth = summary?.totalRevenuePreviousMonth ?? 0;
  const revenueMonthlyPercent = summary?.totalRevenueMonthlyPercent ?? 0;

  const paidCurrentMonth = summary?.paidCurrentMonth ?? 0;
  const paidPreviousMonth = summary?.paidPreviousMonth ?? 0;
  const paidMonthlyPercent = summary?.paidMonthlyPercent ?? 0;

  const pendingCurrentMonth = summary?.pendingCurrentMonth ?? 0;
  const pendingPreviousMonth = summary?.pendingPreviousMonth ?? 0;
  const pendingMonthlyPercent = summary?.pendingMonthlyPercent ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* CARD 1: TOTAL PENDAPATAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-[#7fa4cb]">
            Total Pendapatan
          </p>

          <h3 className="text-3xl font-black text-[#12324a] mt-2 tracking-tight">
            {loading ? "Memuat..." : formatCompactCurrency(totalRevenue)}
          </h3>
        </div>

        <TrendLabel
          currentMonth={revenueCurrentMonth}
          previousMonth={revenuePreviousMonth}
          percent={revenueMonthlyPercent}
          mode="upGood"
        />

        <div className="absolute top-0 right-0 w-12 h-12 bg-[#dcebf8] text-[#4a90e2] rounded-bl-xl flex items-center justify-center">
          <Wallet className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>

      {/* CARD 2: TRANSAKSI BERHASIL */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-[#7fa4cb]">
            Transaksi Berhasil
          </p>

          <h3 className="text-3xl font-black text-[#12324a] mt-2 tracking-tight">
            {loading ? "..." : paidCount}
          </h3>
        </div>

        <TrendLabel
          currentMonth={paidCurrentMonth}
          previousMonth={paidPreviousMonth}
          percent={paidMonthlyPercent}
          mode="upGood"
        />

        <div className="absolute top-0 right-0 w-12 h-12 bg-[#cdefdc] text-[#12a94f] rounded-bl-xl flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 stroke-[3]" />
        </div>
      </div>

      {/* CARD 3: TRANSAKSI PENDING */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative flex flex-col justify-between min-h-[140px] overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-[#7fa4cb]">
            Transaksi Pending
          </p>

          <h3 className="text-3xl font-black text-[#12324a] mt-2 tracking-tight">
            {loading ? "..." : pendingCount}
          </h3>
        </div>

        <TrendLabel
          currentMonth={pendingCurrentMonth}
          previousMonth={pendingPreviousMonth}
          percent={pendingMonthlyPercent}
          mode="downGood"
        />

        <div className="absolute top-0 right-0 w-12 h-12 bg-[#fde8c6] text-[#f49322] rounded-bl-xl flex items-center justify-center">
          <Clock className="w-5 h-5 stroke-[3]" />
        </div>
      </div>
    </div>
  );
}