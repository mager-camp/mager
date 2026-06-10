import PageHeader   from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import SessionTable from "./components/SessionTable";
import EksporPanel  from "./components/EksporPanel";
import { useRekapFilter } from "./hooks/useRekapFilter";

export default function RekapLatihanPage() {
  const { activeFilter, setActiveFilter, stats, sessions, isLoading } = useRekapFilter();

  return (
    <div className="p-4 md:p-6 h-full flex flex-col gap-4 overflow-hidden">

      {/* Row 1: Judul + Filter */}
      <PageHeader activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Row 2: 3 summary stat cards */}
      <SummaryCards stats={stats} isLoading={isLoading} />

      {/* Row 3: Tabel sesi + Panel ekspor */}
      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex-1 min-w-0 min-h-0">
          <SessionTable sessions={sessions} isLoading={isLoading} />
        </div>
        <div className="w-85 shrink-0">
          <EksporPanel sessions={sessions}/>
        </div>
      </div>

    </div>
  );
}