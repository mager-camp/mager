// frontend\src\features\admin-dashboard\components\StatCardsSection.jsx
import React from "react";

// Import file aset gambar dekorasi latar belakang
import OrangIcon from "@/assets/Orang_Icon.png";
import OrangMerah from "@/assets/Orang_Merah.png";
import DuitIcon from "@/assets/Duit_Icon.png";

function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value ?? 0);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function GrowthBadge({ value }) {
  const growth = Number(value ?? 0);
  const isNegative = growth < 0;
  const isPositive = growth > 0;

  return (
    <div className="badge-container">
      <span
        className={`badge-up ${
          isNegative ? "negative" : isPositive ? "positive" : "neutral"
        }`}
      >
        <i
          className={`fas ${isNegative ? "fa-arrow-down" : "fa-arrow-up"}`}
        ></i>{" "}
        {growth > 0 ? "+" : ""}
        {growth}%
      </span>
      <small className="badge-text">dari bulan lalu</small>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="stat-card">
      <div className="skeleton-line short"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line short"></div>
    </div>
  );
}

export default function StatCardsSection({ summary, loading, error }) {
  if (loading) {
    return (
      <div className="cards-wrapper">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-state error">
        <strong>Ringkasan gagal dimuat.</strong>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="cards-wrapper">
      {/* CARD 1: TOTAL PENGGUNA */}
      <div className="stat-card card-pengguna">
        <div className="stat-title">Total Pengguna</div>
        <div className="stat-value">{formatNumber(summary?.totalUsers)}</div>
        <GrowthBadge value={summary?.userGrowthPercent} />
        
        {/* Gambar Latar Belakang */}
        <img 
          src={OrangIcon} 
          alt="Dekorasi Pengguna" 
          className="stat-card-bg-icon" 
        />
      </div>

      {/* CARD 2: TOTAL PENGGUNA PREMIUM */}
      <div className="stat-card card-pengguna">
        <div className="stat-title">Total Pengguna Premium</div>
        <div className="stat-value">
          {formatNumber(summary?.totalPremiumUsers)}
        </div>
        <GrowthBadge value={summary?.premiumGrowthPercent} />
        
        {/* Gambar Latar Belakang */}
        <img 
          src={OrangMerah} 
          alt="Dekorasi Premium" 
          className="stat-card-bg-icon" 
        />
      </div>

      {/* CARD 3: TOTAL PENDAPATAN */}
      <div className="stat-card card-pendapatan">
        <div className="stat-title">Total Pendapatan</div>
        <div className="stat-value">
          {formatCurrency(summary?.totalRevenue)}
        </div>
        <GrowthBadge value={summary?.revenueGrowthPercent} />
        
        {/* Gambar Latar Belakang */}
        <img 
          src={DuitIcon} 
          alt="Dekorasi Pendapatan" 
          className="stat-card-bg-icon" 
        />
      </div>
    </div>
  );
}