import { Users } from 'lucide-react';
import AthleteTable from './components/AthleteTable';

export default function AthletesPage() {
  return (
    <div className="p-10 md:p-12 h-full flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center gap-3">
        <Users size={28} className="text-[#ED8936]" />
        <div>
          <h1 className="text-xl font-black text-[var(--text-dashboard)]">Daftar Atlet</h1>
          <p className="text-sm text-gray-400">Monitor kesiapan latihan seluruh atlet</p>
        </div>
      </div>

      <div className="flex w-full gap-4 flex-1 min-h-0">
        <AthleteTable />
      </div>

    </div>
  );
}
