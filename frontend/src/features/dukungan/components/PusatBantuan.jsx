import { useState } from "react";
import { Search, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "../constants/dukunganData";
import { FileQuestionMark } from "lucide-react";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`border rounded-sm transition-colors  ${
        isOpen ? "border-[#90CDF4] bg-white border-l-[#ED8936] border-l-4" : "border-[#BEE3F8] bg-white/60 hover:bg-white"
      }`}
    >
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

export default function PusatBantuan() {
  const [openId,      setOpenId]      = useState(2); // ID 2 open by default
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = FAQ_ITEMS.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="bg-[#BEE3F8] rounded-xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 flex-shrink-0">
        <div className="flex items-start gap-2">
          <FileQuestionMark size={26} className="text-[#ED8936]" />
          <h2 className="text-lg font-black text-[#1A365D] leading-snug">
            Pelatihan & Protokol<br />Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        {/* Search */}
        <div className="relative shrink-0 w-44">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari basis pengetahuan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs border border-[#90CDF4] rounded-lg bg-white/80 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]"
          />
        </div>
      </div>

      {/* FAQ accordion */}
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
              onToggle={() => toggle(item.id)}
            />
          ))
        )}
      </div>

      {/* Footer link */}
      <div className="flex-shrink-0 pt-4 border-t border-[#90CDF4] mt-4">
        <button className="flex items-center gap-1.5 text-xs font-black text-[#ED8936] hover:text-[#DD6B20] transition-colors mx-auto">
          LIHAT SEMUA DOKUMENTASI
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}