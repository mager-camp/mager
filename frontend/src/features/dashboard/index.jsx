import WelcomeCard from "@/features/dashboard/components/WelcomeCard";
import NextSessionCard from "@/features/dashboard/components/NextSessionCard";
import TodayGoals from "@/features/dashboard/components/TodayGoals";
import WeeklyVolumeChart from "@/features/dashboard/components/WeeklyVolumeChart";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const formatName = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "User";
  
  return (
    <div className="h-full flex flex-col gap-4 p-10 md:p-12 overflow-auto">
      {/* ROW 1 (fixed height) */}
      <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WelcomeCard name={formatName(user?.fullName)} />
        </div>
        <div>
          <NextSessionCard />
        </div>
      </div>

      {/* ROW 2 (fixed height) */}
      <div className="shrink-0 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-[var(--text-dashboard)]">
          Goals Hari Ini
        </h2>
        <TodayGoals />
      </div>

      {/* ROW 3 (FLEX FILL AREA - CHART ONLY) */}
      <div className="flex-1 min-h-[280px]">
        <WeeklyVolumeChart />
      </div>
    </div>
  );
}
