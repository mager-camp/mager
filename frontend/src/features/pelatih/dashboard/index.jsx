import PageHeader   from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import SessionTable from "./components/SessionTable";
import { useRekapFilter } from "./hooks/useRekapFilter";
import { useDashboardStats } from "./hooks/useDashboardStats";

export default function DashboardPelatihPage() {
  const { activeFilter, setActiveFilter, sessions, isLoading: loadingLogs } =
    useRekapFilter();

  const { stats, isLoading: loadingStats } = useDashboardStats();

  return (
    <div className="p-10 md:p-12 h-full flex flex-col gap-4 overflow-y-auto">

      <PageHeader activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <SummaryCards stats={stats} isLoading={loadingStats} />

      <div className="flex flex-row gap-4 xl:min-h-0 xl:flex-1">
        <div className="w-full xl:flex-1 min-w-0">
          <SessionTable sessions={sessions} isLoading={loadingLogs} />
        </div>
      </div>

    </div>
  );
}