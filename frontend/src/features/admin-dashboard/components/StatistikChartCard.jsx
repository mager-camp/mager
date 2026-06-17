import { useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const chartColors = [
  "#2575e6",
  "#27c267",
  "#ef1f2d",
  "#ff7a00",
  "#6c4da8",
  "#749bc2",
  "#e88d67",
];

function toPercentages(values) {
  const total = values.reduce((sum, value) => sum + Number(value || 0), 0);

  if (total <= 0) {
    return values.map(() => 0);
  }

  return values.map((value) => {
    const percentage = (Number(value || 0) / total) * 100;
    return Number(percentage.toFixed(2));
  });
}

function formatPercentage(value) {
  const number = Number(value || 0);

  if (number <= 0) return "";
  if (Number.isInteger(number)) return `${number}%`;

  return `${Number(number.toFixed(1))}%`;
}

function normalizeCourseName(course) {
  return (
    course?.name ||
    course?.activityName ||
    course?.activity?.name ||
    course?.title ||
    "Tanpa nama"
  );
}

function getCourseTotal(course) {
  const total =
    course?.totalCourses ??
    course?.courseCount ??
    course?.total ??
    Math.max(
      Number(course?.totalEnrollments ?? 0),
      Number(course?.totalPayments ?? 0),
      1,
    );

  return Number(total) || 0;
}

function aggregateCourses(courses) {
  const map = new Map();

  courses.forEach((course) => {
    const name = normalizeCourseName(course);
    const total = getCourseTotal(course);

    if (total <= 0) return;

    const current = map.get(name);

    if (current) {
      current.total += total;
      return;
    }

    map.set(name, {
      id: course?.id || name,
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
    .reduce((sum, course) => sum + Number(course.total || 0), 0);

  if (otherTotal <= 0) {
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

  const premium = statistics?.userComposition?.premium ?? 0;
  const regular = statistics?.userComposition?.regular ?? 0;
  const hasUserComposition = premium + regular > 0;

  const userPercentages = useMemo(
    () => toPercentages([regular, premium]),
    [regular, premium],
  );

  const courses = useMemo(() => {
    return limitCourseItems(
      aggregateCourses(statistics?.courseDistribution ?? []),
      5,
    );
  }, [statistics?.courseDistribution]);

  const courseValues = useMemo(
    () => courses.map((course) => course.total),
    [courses],
  );

  const coursePercentages = useMemo(
    () => toPercentages(courseValues),
    [courseValues],
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 8,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        anchor: "center",
        align: "center",
        clamp: true,
        clip: false,
        display: (context) => {
          const value = Number(context.dataset.data[context.dataIndex] || 0);

          /*
            Ini supaya tulisan persen tidak numpuk.
            Kalau slice terlalu kecil, label persen disembunyikan.
            Nilainya tetap bisa dilihat lewat tooltip saat hover.
          */
          return value >= 6;
        },
        font: (context) => {
          const width = context.chart.width;

          return {
            weight: "bold",
            size: width < 220 ? 10 : 15,
          };
        },
        formatter: (value) => formatPercentage(value),
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = formatPercentage(context.parsed);
            return `${label}: ${value}`;
          },
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
        borderWidth: 0,
        hoverOffset: 6,
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
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  if (loading) {
    return (
      <div className="side-card statistic-card">
        <div className="side-card-header">Statistik</div>
        <div className="section-state">Memuat statistik...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="side-card statistic-card">
        <div className="side-card-header">Statistik</div>
        <div className="section-state error">
          <strong>Statistik gagal dimuat.</strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="side-card statistic-card">
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
                <span className="legend-box user-regular"></span>
                <span className="legend-label">
                  Pengguna biasa ({regular})
                </span>
              </div>

              <div className="legend-item">
                <span className="legend-box user-premium"></span>
                <span className="legend-label">
                  Pengguna premium ({premium})
                </span>
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

                  <span className="legend-label">
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