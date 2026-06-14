import PeriodisasiCard from "./components/PeriodisasiCard";
import StatusAktifCard from "./components/StatusAktifCard";
import KursusTambahan from "./components/KursusTambahan";

export default function PremiumPage() {
  return (
    <div className="p-10 md:p-12 h-full flex flex-col gap-4 overflow-y-auto">
      {/* Page title — flex-shrink-0 */}
      <div className="flex flex-col gap-6">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-black text-[var(--text-dashboard)]">
            Fitur Premium
          </h1>
          <p className="text-sm text-text-primary mt-1">
            Kembangkan potensi Anda sepenuhnya dengan alat dan pengetahuan
            terbaik.
          </p>
        </div>

        {/* Row 1: Periodisasi + Status Aktif */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          <PeriodisasiCard />
          <StatusAktifCard />
        </div>

        {/* Row 2: Kursus Tambahan */}
        <KursusTambahan />
      </div>
    </div>
  );
}
