// features/premium/components/KursusTambahan.jsx
import { GraduationCap, PlayCircle, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { KURSUS_ITEMS } from "../constants/premiumData";

function KursusCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative
        w-[250px] h-[350px]
        shrink-0 
        rounded shadow-lg
        overflow-hidden
        group
      "
    >
      {/* Background */}
      <img
        src={item.image}
        alt={item.title}
        className="
          absolute inset-0
          w-full h-full
          object-cover
          group-hover:scale-105
          transition-transform duration-500
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-[#2B6CB0]
          via-[#2B6CB0]/80
          to-transparent
        "
      />

      {/* Badge kanan atas */}
      <div className="absolute top-3 right-3 z-10">
        {item.durasi && (
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-md">
            <PlayCircle size={13} />
            {item.durasi}
          </span>
        )}

        {item.modul && (
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-md">
            <BookOpen size={13} />
            {item.modul}
          </span>
        )}
      </div>

      {/* Bottom content */}
      <div
        className="
          absolute bottom-0 left-0 right-0
            z-10
            p-3 md:p-4
            flex flex-col justify-end
            min-h-[240px]
            "
      >
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="
              bg-[#1A365D]
              text-white
              text-[9px] md:text-[10px]
              font-black
              px-2.5 py-1
              rounded
            "
          >
            {item.kategori}
          </span>

          <span
            className="
              bg-white
              text-[#ED8936]
              text-[9px] md:text-[10px]
              font-black
              px-2.5 py-1
              rounded
              flex items-center gap-1
            "
          >
            <GraduationCap size={8} />
            {item.badge}
          </span>
        </div>

        {/* Flexible content */}
        <div className="flex flex-col flex-1">
          {/* Title + desc */}
          <div>
            <h3
              className="
                text-lg md:text-xl
                font-black
                text-white
                leading-tight
              "
            >
              {item.title}
            </h3>

            <p
              className="
                text-[11px] md:text-xs
                text-blue-100
                mt-2
                leading-relaxed
                line-clamp-3
              "
            >
              {item.desc}
            </p>
          </div>

          {/* Button always bottom */}
          <button
            onClick={() => navigate(`/user/premium/kursus/${item.slug}`)}
            className="
              mt-auto
              w-full
              cursor-pointer
              py-2 md:py-2.5
              rounded
              bg-[#ED8936]
              hover:bg-[#DD6B20]
              active:scale-[0.98]
              transition-all
              text-white
              text-[10px] md:text-xs
              font-black
              tracking-wider
            "
          >
            MULAI KURSUS
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KursusTambahan() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap size={30} className="text-[#ED8936]" />
        <div>
          <h2 className="text-xl font-bold text-[var(--text-dashboard)]">
            Kursus Tambahan
          </h2>
          <p className="text-sm text-text-primary">
            Teknik-teknik canggih untuk memangkas waktu tempuh Anda.
          </p>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {KURSUS_ITEMS.map((item) => (
          <KursusCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}