import React from "react";

import obstacleImg from "../../../assets/obstacle.png";
import anggarImg from "../../../assets/anggar.png";
import tembakImg from "../../../assets/tembak.png";
import renangImg from "../../../assets/renang.png";
import lariImg from "../../../assets/lari.png";

const emptyStat = {
  total: 0,
  currentMonth: 0,
  previousMonth: 0,
  monthlyDelta: 0,
};

const getTypeKey = (activeType) => {
  return activeType === "Premium" ? "premium" : "free";
};

const getTrendClass = (delta) => {
  if (delta < 0) return "text-[#d23b3b]";
  return "text-[#17a934]";
};

const getTrendIcon = (delta) => {
  if (delta < 0) return "↘";
  return "↗";
};

const getTrendText = (delta) => {
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta} bulan ini`;
};

function TrendLabel({ delta = 0, className = "" }) {
  return (
    <p
      className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${getTrendClass(
        delta
      )} ${className}`}
    >
      <span className="text-sm leading-none">{getTrendIcon(delta)}</span>
      <span>{getTrendText(delta)}</span>
    </p>
  );
}

export default function CourseStats({
  activeType,
  onChangeType,
  stats,
  isLoading = false,
}) {
  const typeKey = getTypeKey(activeType);

  const totalBiasa = stats?.types?.free?.total ?? 0;
  const totalPremium = stats?.types?.premium?.total ?? 0;

  const activeTypeStats = stats?.types?.[typeKey] || emptyStat;
  const activeCategoryStats = stats?.categories?.[typeKey] || {};

  const categoriesData = [
    {
      name: "OBSTACLE",
      label: "Obstacle",
      stat: activeCategoryStats.OBSTACLE || emptyStat,
      color: "text-[#199454]",
      img: obstacleImg,
    },
    {
      name: "ANGGAR",
      label: "Anggar",
      stat: activeCategoryStats.ANGGAR || emptyStat,
      color: "text-[#644FB7]",
      img: anggarImg,
    },
    {
      name: "TEMBAK",
      label: "Tembak",
      stat: activeCategoryStats.TEMBAK || emptyStat,
      color: "text-[#E64950]",
      img: tembakImg,
    },
    {
      name: "RENANG",
      label: "Renang",
      stat: activeCategoryStats.RENANG || emptyStat,
      color: "text-[#3C7CC5]",
      img: renangImg,
    },
    {
      name: "LARI",
      label: "Lari",
      stat: activeCategoryStats.LARI || emptyStat,
      color: "text-[#F88841]",
      img: lariImg,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] md:col-span-4 flex flex-col justify-between min-h-[175px]">
        <div>
          <h4 className="text-[11px] font-bold text-slate-400 tracking-wide mb-3">
            Total Kursus
          </h4>

          <div className="bg-slate-100 p-0.5 rounded-xl flex gap-1 w-full">
            <button
              type="button"
              onClick={() => onChangeType("Biasa")}
              className={`flex-1 text-center py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all ${
                activeType === "Biasa"
                  ? "bg-[#4a7ca3] text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Kursus Biasa
            </button>

            <button
              type="button"
              onClick={() => onChangeType("Premium")}
              className={`flex-1 text-center py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all ${
                activeType === "Premium"
                  ? "bg-[#4a7ca3] text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Kursus Premium
            </button>
          </div>
        </div>

        <div className="mt-3 text-center flex flex-col items-center justify-center">
          <h2 className="text-[90px] font-bold text-[#133957] tracking-tight leading-none my-2">
            {isLoading
              ? "..."
              : activeType === "Biasa"
              ? totalBiasa
              : totalPremium}
          </h2>

          <TrendLabel
            delta={activeTypeStats.monthlyDelta}
            className="justify-center w-full"
          />
        </div>
      </div>

      <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categoriesData.map((cat) => (
          <div
            key={cat.name}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[82px] relative overflow-hidden"
          >
            <span className={`text-xs font-bold ${cat.color} tracking-wide`}>
              {cat.label}
            </span>

            <div className="mt-3 z-10">
              <h3
                className={`text-3xl font-black ${cat.color} tracking-tight leading-none`}
              >
                {isLoading ? "..." : cat.stat.total}
              </h3>

              <TrendLabel delta={cat.stat.monthlyDelta} />
            </div>

            <div className="absolute right-3 bottom-3 w-20 h-20 flex items-center justify-center opacity-90 pointer-events-none">
              <img
                src={cat.img}
                alt={`Icon ${cat.label}`}
                className="w-full h-full object-contain object-right-bottom"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}