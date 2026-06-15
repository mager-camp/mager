import { useState } from "react";
import { Search, ChevronDown, ChevronUp, ArrowRight, X, FileQuestion } from "lucide-react";
import { FAQ_ITEMS } from "../constants/dukunganData";

const CATEGORIES = ["Semua", "Jadwal", "Premium", "Ekspor", "Akun"];

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`border rounded-sm transition-colors ${
      isOpen
        ? "border-[#90CDF4] bg-white border-l-[#ED8936] border-l-4"
        : "border-[#BEE3F8] bg-white/60 hover:bg-white"
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className={`text-sm font-semibold leading-snug ${
          isOpen ? "text-[#2B6CB0]" : "text-gray-700"
        }`}>
          {item.question}
        </span>
        {isOpen
          ? <ChevronUp size={15} className="text-[#2B6CB0] shrink-0" />
          : <ChevronDown size={15} className="text-gray-400 shrink-0" />
        }
      </button>
      {isOpen && item.answer && (
        <div className="px-4 pb-4">
          <div className="h-px bg-[#BEE3F8] mb-3" />
          <p className="text-xs text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

// ── FAQ Modal ─────────────────────────────────────────────────────────────────
function FaqModal({ onClose }) {
  const [openId,      setOpenId]      = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchSearch   = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory === "Semua" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-[680px] max-w-[95vw] max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileQuestion size={20} className="text-[#ED8936]" />
            <h2 className="text-lg font-black text-[var(--text-dashboard)]">
              Semua Dokumentasi
            </h2>
            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {FAQ_ITEMS.length} artikel
            </span>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search + Category filter */}
        <div className="px-6 py-3 border-b border-gray-100 flex flex-col gap-3 flex-shrink-0">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]"
              autoFocus
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
                  activeCategory === cat
                    ? "bg-[#2B6CB0] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <p className="text-sm text-gray-400 font-medium">
                Tidak ada hasil untuk "{searchQuery}"
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("Semua"); }}
                className="text-xs text-[#2B6CB0] underline"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId((prev) => prev === item.id ? null : item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PusatBantuan() {
  const [openId,       setOpenId]       = useState(2);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [showModal,    setShowModal]    = useState(false);

  // Tampilkan hanya 4 item pertama di sidebar
  const previewItems = FAQ_ITEMS.slice(0, 4);

  const filtered = previewItems.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="bg-[#B8D1E9] rounded-sm p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 flex-shrink-0">
          <div className="flex items-start gap-2">
            <FileQuestion size={26} className="text-[#ED8936]" />
            <h2 className="text-lg font-black text-[#1A365D] leading-snug">
              Pelatihan & Protokol<br />Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          {/* Search */}
          <div className="relative shrink-0">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-[#90CDF4] rounded bg-white/80 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]"
            />
          </div>
        </div>

        {/* FAQ accordion — preview 4 item */}
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto min-h-0">
          {filtered.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-6">
              Tidak ada hasil untuk "{searchQuery}"
            </p>
          ) : (
            filtered.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((prev) => prev === item.id ? null : item.id)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 pt-4 border-t border-[#90CDF4] mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-xs font-black text-[#ED8936] hover:text-[#DD6B20] transition-colors mx-auto"
          >
            LIHAT SEMUA DOKUMENTASI ({FAQ_ITEMS.length})
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && <FaqModal onClose={() => setShowModal(false)} />}
    </>
  );
}