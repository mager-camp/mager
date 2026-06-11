import NextSessionCard from "./components/NextSessionCard";
import ReadinessCard from "./components/ReadinessCard";
import RecoveryWarningCard from "./components/RecoveryWarningCard";
import GoalCardList from "./components/GoalCard";
import Course from "./components/Course";
// import StatsGrid from "./components/StatsGrid";

export default function CoursePage() {
  return (
    <div className="p-4 md:p-6 h-full flex flex-col gap-4 overflow-hidden md:overflow-y-auto">
      {/* Row 1: Sesi Berikutnya + Kesiapan + Peringatan */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 flex-shrink-0">
        {/* Kiri: Next session card full width di mobile, 1fr di desktop */}
        <NextSessionCard />

        {/* Kanan: Kesiapan (atas) + Peringatan (bawah) */}
        <div className="flex flex-col gap-3">
          <ReadinessCard />
          <RecoveryWarningCard />
        </div>
      </div>

      {/* Row 2: Goals horizontal scroll */}
      <div>
        <GoalCardList />
      </div>

      {/* Row 3: Stats — ngisi sisa tinggi layar */}
      {/* <StatsGrid /> */}
      <Course />
    </div>
  );
}
