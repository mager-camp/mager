import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const chartColors = [
  "#1e75d5",
  "#1cb85c",
  "#e62e2e",
  "#ff7a00",
  "#634dbf",
  "#749bc2",
  "#e88d67",
];

function toPercentages(values) {
  const total = values.reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return values.map(() => 0);
  }

  return values.map((value) => Number(((value / total) * 100).toFixed(2)));
}

function aggregateCourses(courses) {
  const map = new Map();

  courses.forEach((course) => {
    const name = course.name || "Tanpa nama";
    const total = course.totalPayments || course.totalEnrollments || 0;
    const current = map.get(name);

    if (current) {
      current.total += total;
      return;
    }

    map.set(name, {
      id: course.id,
      name,
      total,
    });
  });

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

function limitCourseItems(courses, limit = 5) {
  const topItems = courses.slice(0, limit);
  const otherTotal = courses
    .slice(limit)
    .reduce((sum, course) => sum + course.total, 0);

  if (otherTotal === 0) {
    return topItems;
  }

  return [
    ...topItems,
    {
      id: "other-courses",
      name: "Lainnya",
      total: otherTotal,
    },
  ];
}

export default function StatistikChartCard({ statistics, loading, error }) {
  const [activeTab, setActiveTab] = useState("pengguna");

  useEffect(() => {
    ChartJS.defaults.font.family = "'Montserrat', sans-serif";
  }, []);

  if (loading) {
    return (
      <div className="side-card">
        <div className="side-card-header">Statistik</div>
        <div className="section-state">Memuat statistik...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="side-card">
        <div className="side-card-header">Statistik</div>
        <div className="section-state error">
          <strong>Statistik gagal dimuat.</strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const premium = statistics?.userComposition?.premium ?? 0;
  const regular = statistics?.userComposition?.regular ?? 0;
  const hasUserComposition = premium + regular > 0;
  const userPercentages = toPercentages([regular, premium]);

  const courses = limitCourseItems(
    aggregateCourses(statistics?.courseDistribution ?? []).filter(
      (course) => course.total > 0,
    ),
  );

  const courseValues = courses.map((course) => course.total);
  const coursePercentages = toPercentages(courseValues);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        font: { weight: "bold", size: 11 },
        formatter: (value) => (value > 0 ? `${value}%` : ""),
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed}%`,
        },
      },
    },
  };

  const dataPengguna = {
    labels: ["Pengguna biasa", "Pengguna premium"],
    datasets: [
      {
        data: userPercentages,
        backgroundColor: ["#749bc2", "#e88d67"],
        borderWidth: 1,
      },
    ],
  };

  const dataKursus = {
    labels: courses.map((course) => course.name),
    datasets: [
      {
        data: coursePercentages,
        backgroundColor: courses.map(
          (_, index) => chartColors[index % chartColors.length],
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="side-card">
      <div className="side-card-header">
        <span>Statistik</span>
        <span className="dropdown-mock">Bulan ini</span>
      </div>

      <div className="toggle-buttons">
        <button
          type="button"
          className={`tg-btn ${activeTab === "pengguna" ? "active" : ""}`}
          onClick={() => setActiveTab("pengguna")}
        >
          Pengguna
        </button>

        <button
          type="button"
          className={`tg-btn ${activeTab === "kursus" ? "active" : ""}`}
          onClick={() => setActiveTab("kursus")}
        >
          Kursus
        </button>
      </div>

      <div
        className={`stat-wrapper ${activeTab === "pengguna" ? "active" : ""}`}
      >
        {!hasUserComposition ? (
          <div className="section-state">Belum ada data pengguna.</div>
        ) : (
          <>
            <div className="chart-container">
              <div className="chart-box-fix">
                <Pie data={dataPengguna} options={chartOptions} />
              </div>
            </div>

            <div className="chart-legends-horizontal">
              <div className="legend-item">
                <span className="dot blue"></span>
                <span>Pengguna biasa ({regular})</span>
              </div>

              <div className="legend-item">
                <span className="dot orange"></span>
                <span>Pengguna premium ({premium})</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`stat-wrapper ${activeTab === "kursus" ? "active" : ""}`}>
        {courses.length === 0 ? (
          <div className="section-state">Belum ada data kursus.</div>
        ) : (
          <>
            <div className="chart-container">
              <div className="chart-box-fix">
                <Pie data={dataKursus} options={chartOptions} />
              </div>
            </div>

            <div className="kursus-legend-grid">
              {courses.map((course, index) => (
                <div className="legend-item" key={course.id}>
                  <span
                    className="legend-box"
                    style={{
                      backgroundColor: chartColors[index % chartColors.length],
                    }}
                  ></span>
                  <span>
                    {course.name} ({course.total})
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
