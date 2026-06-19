import SummaryCards from "./components/SummaryCards";
import {
  useDashboardStats,
  useCourseCounts,
} from "./hooks/useCourse";
import Course from "./components/Course";
import CoursePremium from "./components/CoursePremium";

export default function DashboardPelatihPage() {
  const { stats, isLoading: loadingStats } = useDashboardStats();

  const {
    totalFreeCourse,
    totalPremiumCourse,
    isLoading: loadingCourse,
  } = useCourseCounts();

  return (
    <div className="p-10 md:p-12 h-full flex flex-col gap-4 overflow-y-auto">
      <SummaryCards
        stats={stats}
        isLoading={loadingStats || loadingCourse}
        totalFreeCourse={totalFreeCourse}
        totalPremiumCourse={totalPremiumCourse}
      />

      <div className="flex flex-col gap-6">
        <Course />
        <CoursePremium />
      </div>
    </div>
  );
}