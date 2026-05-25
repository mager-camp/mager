import { Zap } from "lucide-react";

export default function WelcomeCard({ name = "Martin" }) {
  return (
    <div className="h-full bg-white rounded-sm p-6 flex items-center justify-between shadow-lg border border-gray-100">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-dashboard)] mb-1">
          Siap beraksi, {name}.
        </h2>
        <p className="text-var(--text-primary) text-sm leading-relaxed">
          Beban latihan Anda sudah optimal. Hari ini
          <br />
          adalah hari dengan intensitas tinggi.
        </p>
      </div>

      <div className="grid grid-cols-[auto_auto] grid-rows-2 gap-x-3 items-center">
        <div className="text-xs font-semibold text-[var(--text-primary] uppercase tracking-widest text-right">
          Level <br></br>Kesiapan
        </div>

        <div className="row-span-2 flex items-center justify-center w-15 h-full rounded-lg border-2 border-[#2B6CB0]">
          <Zap size={30} className="text-[#2B6CB0]" />
        </div>

        <div className="flex items-end justify-end gap-1">
          <span className="text-4xl font-extrabold text-[var(--text-dashboard)]">92</span>

          <span className="text-2xl font-bold text-[var(--text-dashboard)] mb-1">%</span>
        </div>
      </div>
    </div>
  );
}
