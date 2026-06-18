import { useState } from "react";
import { Download, ArrowRight, CheckCircle } from "lucide-react";
import { SCOPE_OPTIONS, FORMAT_OPTIONS } from "../constants/rekapLatihanData";

// ── CSV ───────────────────────────────────────────────────────────────────────
function exportCSV(sessions) {
  const headers = ["Aktivitas", "Tanggal", "Durasi", "Intensitas", "Status", "Catatan"];
  const rows    = sessions.map((s) => [
    s.title, s.tanggal, s.durasi, s.intensitas, s.status, s.notes ?? "",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  downloadBlob(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }), "rekap-latihan.csv");
}

// ── Excel (XLSX via SheetJS) ──────────────────────────────────────────────────
async function exportExcel(sessions) {
  const XLSX = await import("xlsx");

  const data = sessions.map((s) => ({
    "Aktivitas":  s.title,
    "Tanggal":    s.tanggal,
    "Durasi":     s.durasi,
    "Intensitas": s.intensitas,
    "Status":     s.status,
    "Catatan":    s.notes ?? "",
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rekap Latihan");

  // Auto column width
  const colWidths = Object.keys(data[0] ?? {}).map((key) => ({
    wch: Math.max(key.length, ...data.map((r) => String(r[key] ?? "").length)) + 2,
  }));
  ws["!cols"] = colWidths;

  XLSX.writeFile(wb, "rekap-latihan.xlsx");
}

// ── PDF ───────────────────────────────────────────────────────────────────────
async function exportPDF(sessions) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape" });

  // Header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Rekap Latihan", 14, 16);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text(`Diekspor: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`, 14, 23);
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 28,
    head: [["Aktivitas", "Tanggal", "Durasi", "Intensitas", "Status", "Catatan"]],
    body: sessions.map((s) => [s.title, s.tanggal, s.durasi, s.intensitas, s.status, s.notes ?? "—"]),
    headStyles: { fillColor: [43, 108, 176], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [235, 248, 255] },
    columnStyles: { 5: { cellWidth: 60 } },
    margin: { left: 14, right: 14 },
  });

  doc.save("rekap-latihan.pdf");
}

// ── Helper ────────────────────────────────────────────────────────────────────
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function EksporPanel({ sessions = [] }) {
  const [scope,    setScope]    = useState("BULANAN");
  const [format,   setFormat]   = useState("PDF");
  const [exported, setExported] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  async function handleEkspor() {
    if (!sessions.length) {
      setError("Tidak ada data untuk diekspor.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (format === "CSV")   await exportCSV(sessions);
      if (format === "Excel") await exportExcel(sessions);
      if (format === "PDF")   await exportPDF(sessions);

      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Gagal mengekspor. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#EBF8FF] border border-[#BEE3F8] rounded-sm p-5 flex flex-col h-full overflow-y-auto">
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
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-sm border text-sm font-bold transition-colors text-left ${
                scope === opt
                  ? "bg-white border-[#2B6CB0] text-[#2B6CB0]"
                  : "bg-white/50 border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                scope === opt ? "border-[#2B6CB0] bg-[#2B6CB0]" : "border-gray-300 bg-white"
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
              className={`flex-1 py-1.5 text-xs font-bold rounded-sm border transition-colors ${
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

      <div className="flex-1" />

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 font-semibold mb-2 text-center">{error}</p>
      )}

      {/* CTA */}
      <button
        onClick={handleEkspor}
        disabled={loading || exported}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-sm font-bold text-sm transition-all active:scale-95 ${
          exported
            ? "bg-green-500 text-white"
            : loading
            ? "bg-[#ED8936]/70 text-white cursor-wait"
            : "bg-[#ED8936] hover:bg-[#DD6B20] text-white"
        }`}
      >
        {exported ? (
          <><CheckCircle size={16} /> Berhasil Diekspor!</>
        ) : loading ? (
          <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Menyiapkan...</>
        ) : (
          <>BUAT & EKSPOR <ArrowRight size={16} /></>
        )}
      </button>
    </div>
  );
}