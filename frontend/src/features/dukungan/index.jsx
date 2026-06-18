import LaporkanMasalah from "./components/LaporkanMasalah";
import PusatBantuan    from "./components/PusatBantuan";

export default function DukunganPage() {
  return (
      <div className="p-10 md:p-12 h-full flex flex-col gap-4 overflow-y-auto">

        {/* Page title */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-black text-gray-900">Pusat Bantuan</h1>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Dapatkan bantuan teknis dan pelajari protokol latihan cabang olahraga pentathlon.
          </p>
        </div>

        {/* Main content: 2 kolom, ngisi sisa tinggi */}
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-4 flex-1 xl:min-h-0">
          <LaporkanMasalah />
          <PusatBantuan />
        </div>

      </div>
  );
}