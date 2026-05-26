import { useState } from "react";
import { Download, ArrowRight, CheckCircle } from "lucide-react";
import { SCOPE_OPTIONS, FORMAT_OPTIONS } from "../constants/rekapLatihanData";

export default function EksporPanel() {
  const [scope,     setScope]     = useState("BULANAN");
  const [format,    setFormat]    = useState("PDF");
  const [exported,  setExported]  = useState(false);
  const [loading,   setLoading]   = useState(false);

  function handleEkspor() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    }, 1200);
  }

  return (
    <div className="bg-[#EBF8FF] border border-[#BEE3F8] rounded-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <Download size={16} className="text-[#2B6CB0]" />
        <h2 className="text-base font-black text-[#2B6CB0] uppercase tracking-wide">
          Ekspor Rekap
        </h2>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-shrink-0">
        Buat salinan data lengkap untuk analisis pelatihan eksternal atau pengarsipan pribadi.
      </p>

      {/* Ruang Lingkup */}
      <div className="mb-4 flex-shrink-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          Ruang Lingkup Laporan
        </p>
        <div className="flex flex-col gap-2">
          {SCOPE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setScope(opt)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-bold transition-colors text-left ${
                scope === opt
                  ? "bg-white border-[#2B6CB0] text-[#2B6CB0]"
                  : "bg-white/50 border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                scope === opt
                  ? "border-[#2B6CB0] bg-[#2B6CB0]"
                  : "border-gray-300 bg-white"
              }`} />
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Format */}
      <div className="mb-5 flex-shrink-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          Format
        </p>
        <div className="flex gap-2">
          {FORMAT_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                format === f
                  ? "bg-white border-[#2B6CB0] text-[#2B6CB0]"
                  : "bg-white/50 border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA Button */}
      <button
        onClick={handleEkspor}
        disabled={loading || exported}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
          exported
            ? "bg-green-500 text-white"
            : loading
            ? "bg-[#ED8936]/70 text-white cursor-wait"
            : "bg-[#ED8936] hover:bg-[#DD6B20] text-white"
        }`}
      >
        {exported ? (
          <>
            <CheckCircle size={16} />
            Berhasil Diekspor!
          </>
        ) : loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Menyiapkan...
          </>
        ) : (
          <>
            BUAT & EKSPOR
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}