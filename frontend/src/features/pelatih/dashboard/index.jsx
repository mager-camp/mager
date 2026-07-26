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

      <div className="flex flex-col gap-4 h-full lg:flex-1 lg:min-h-0 min-w-0">
          <SessionTable sessions={sessions} isLoading={loadingLogs} />
      </div>

    </div>
  );
}