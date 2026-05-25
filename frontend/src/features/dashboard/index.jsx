import WelcomeCard from "@/features/dashboard/components/WelcomeCard";
import NextSessionCard from "@/features/dashboard/components/NextSessionCard";
import GoalCard from "@/features/dashboard/components/GoalCard";
import WeeklyVolumeChart from "@/features/dashboard/components/WeeklyVolumeChart";

export default function Dashboard() {
  return (
      <div className="
        p-4 md:p-6
        flex flex-col gap-4
        min-h-full
        md:h-full md:overflow-hidden
      ">

        {/* Row 1: Welcome + Next Session */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0"> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
          <div className="lg:col-span-2 min-h-0">
            <WelcomeCard name="Martin" />
          </div>
          <div className="min-h-0">
            <NextSessionCard
              title="Anggar: Taktis Pertandingan"
              subtitle="Ruang Latihan Senjata - Intensitas Tinggi"
              minutesUntil={45}
            />
          </div>
        </div>

        {/* Row 2: Goals */}
        {/* <div className="flex flex-col gap-3 flex-1 min-h-0"> */}
        <div className="flex flex-col gap-3 min-h-0">
          <h2 className="text-xl font-bold text-[var(--text-dashboard)] flex-shrink-0">
            Goals Hari Ini
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 min-h-0">
            <GoalCard
              icon="swim"
              status="SELESAI"
              title="Renang 200m"
              description="2:05.40 - Target tercapai"
            />
            <GoalCard
              icon="run"
              status="AKTIF"
              title="Lari Cepat"
              description="4x800m + 4x5 shots"
            />
            <GoalCard
              icon="bike"
              status="DIJADWALKAN"
              title="Olahraga Berkuda"
              description="16:00 - 12 Rintangan"
            />
          </div>
        </div>

        {/* Row 3: Weekly Volume Chart */}
        <div className="flex-1 min-h-0">
          <WeeklyVolumeChart />
        </div>

      </div>
  );
}