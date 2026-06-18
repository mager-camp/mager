import PageHeader   from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import SessionTable from "./components/SessionTable";
import EksporPanel  from "./components/EksporPanel";
import { useRekapFilter } from "./hooks/useRekapFilter";

export default function RekapLatihanPage() {
  const { activeFilter, setActiveFilter, stats, sessions, isLoading } = useRekapFilter();

  return (
    <div className="p-10 md:p-12 h-full flex flex-col gap-4 overflow-y-auto">

      {/* Row 1: Judul + Filter */}
      <PageHeader activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Row 2: 3 summary stat cards */}
      <SummaryCards stats={stats} isLoading={isLoading} />

      {/* Row 3: Tabel sesi + Panel ekspor */}
      <div className="flex flex-col xl:flex-row gap-4 xl:min-h-0 xl:flex-1 ">
        <div className="w-full xl:flex-1 min-w-0">
          <SessionTable sessions={sessions} isLoading={isLoading} />
        </div>
        <div className="w-full xl:w-85 shrink-0">
          <EksporPanel sessions={sessions}/>
        </div>
      </div>

    </div>
  );
}