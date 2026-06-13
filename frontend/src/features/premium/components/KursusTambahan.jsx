import { GraduationCap, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePremiumCourses, usePremiumStatus } from "../hooks/usePremium";
import { useFeedback } from "@/hooks/useFeedback";

function KursusCard({ item, isPremium }) {
  const navigate = useNavigate();
  const { showError } = useFeedback();

  return (
    <div className="relative w-[250px] h-[350px] shrink-0 rounded shadow-lg overflow-hidden group">
      <img
        src={item.thumbnailUrl ?? "/placeholder.webp"}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          !isPremium ? "grayscale brightness-75" : ""
        }`}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isPremium
            ? "from-[#2B6CB0] via-[#2B6CB0]/80"
            : "from-gray-900 via-gray-800/80"
        } to-transparent`}
      />

      {!isPremium && (
        <div className="absolute top-3 left-3 z-20">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2">
            <Lock size={16} className="text-white" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 md:p-4 flex flex-col justify-end min-h-[240px]">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded ${
              isPremium ? "bg-[#1A365D]" : "bg-gray-700"
            }`}
          >
            {item.activity?.name}
          </span>

          <span
            className={`text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded flex items-center gap-1 ${
              isPremium
                ? "bg-white text-[#ED8936]"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            <GraduationCap size={8} />
            {item.type?.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col flex-1">
          <div>
            <h3 className="text-lg md:text-xl font-black text-white leading-tight">
              {item.title}
            </h3>

            {item.description && (
              <p
                className={`text-[11px] md:text-xs mt-2 leading-relaxed line-clamp-3 ${
                  isPremium ? "text-blue-100" : "text-gray-300"
                }`}
              >
                {item.description}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              if (!isPremium) {
                showError(
                  "Aktifkan Premium terlebih dahulu untuk mengakses kursus ini."
                );
                return;
              }

              navigate(`/user/premium/course/${item.id}`);
            }}
            className={`mt-auto w-full py-2 md:py-2.5 rounded text-white text-[10px] md:text-xs font-black tracking-wider transition-all active:scale-[0.98] ${
              isPremium
                ? "bg-[#ED8936] hover:bg-[#DD6B20]"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            MULAI KURSUS
          </button>
        </div>
      </div>
    </div>
  );
}

function KursusCardSkeleton() {
  return (
    <div className="relative w-[250px] h-[350px] shrink-0 rounded shadow-lg overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex flex-col gap-3 min-h-[240px] justify-end">
        <div className="w-12 h-4 rounded bg-gray-300" />

        <div className="flex flex-col gap-2">
          <div className="w-4/5 h-5 rounded bg-gray-300" />
          <div className="w-3/5 h-5 rounded bg-gray-300" />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="w-full h-3 rounded bg-gray-300" />
          <div className="w-4/5 h-3 rounded bg-gray-300" />
          <div className="w-2/3 h-3 rounded bg-gray-300" />
        </div>

        <div className="w-full h-8 rounded bg-gray-300 mt-auto" />
      </div>
    </div>
  );
}

export default function Course() {
  const { data: courses = [], isLoading } = usePremiumCourses();
  const { data: premiumData } = usePremiumStatus();

  const isPremium = premiumData?.isPremium;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap size={30} className="text-[#ED8936]" />

        <div>
          <h2 className="text-xl font-bold text-[var(--text-dashboard)]">
            Kursus Premium
          </h2>

          <p className="text-sm text-text-primary">
            Teknik-teknik canggih untuk memangkas waktu tempuh Anda.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <KursusCardSkeleton key={i} />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <p className="text-sm text-gray-400">
          Belum ada kursus premium tersedia.
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {courses.map((item) => (
            <KursusCard
              key={item.id}
              item={item}
              isPremium={isPremium}
            />
          ))}
        </div>
      )}
    </div>
  );
}