import { usePelatihKursus } from "@/features/pelatih-dashboard/hooks/usePelatihDashboard";

export default function Index() {
  const { data: courses = [], isLoading } = usePelatihKursus();

  return (
    <div className="min-h-full bg-[#f7f7f3] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#133957]">Manajemen Kursus</h1>
            <p className="text-sm text-[#8a9db5]">
              Total {courses.length} kursus terdaftar
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm text-[#8a9db5]">
            Memuat kursus...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-2xl bg-[#4682A9] shadow-sm"
              >
                <div className="relative h-52">
                  <img
                    src={course.thumbnailUrl || "/image/modul1.png"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4682A9] to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-[#133957]/70 px-3 py-1 text-xs font-semibold text-white">
                    {course._count?.modules ?? 0} Modul
                  </span>
                </div>
                <div className="space-y-3 p-5 text-white">
                  <div className="flex gap-2">
                    <span className="rounded bg-[#133957] px-2 py-1 text-[10px] font-bold uppercase">
                      {course.type}
                    </span>
                    <span className="rounded border border-white/40 px-2 py-1 text-[10px] font-bold uppercase">
                      {course.totalDurasi || "-"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-3">
                    {course.description || course.about || "Tidak ada deskripsi"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}