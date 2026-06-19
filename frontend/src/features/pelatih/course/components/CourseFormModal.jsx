import { useState, useEffect } from "react";
import { X, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useCreateCourse, useUpdateCourse } from "../hooks/useCourse";

const ACTIVITY_OPTIONS = [
  { value: "d6ea56db-80f7-4ea1-96d7-6f239c2805c0", label: "LARI" },
  { value: "b24dfc52-1326-4fac-9b63-bd0064fe581a", label: "RENANG" },
  { value: "a4a01562-cdb4-445a-86e8-94b089ae602f", label: "ANGGAR" },
  { value: "a531061c-2e3a-45c0-bf84-94de289663eb", label: "TEMBAK" },
  { value: "a498b77d-645b-4b75-89bf-7f9cc445f978", label: "OBSTACLE" },
];

const EMPTY_MODULE    = () => ({ title: "", durasi: "", order: 0, subModules: [] });
const EMPTY_SUBMODULE = () => ({ title: "", durasi: "", type: "video", order: 0, videoUrl: "" });
const EMPTY_HIGHLIGHT = () => ({ icon: "zap", title: "", desc: "", order: 0 });

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]";
const labelCls = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1";

export default function CourseFormModal({ course, onClose }) {
  const isEdit        = !!course;
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const isLoading      = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState({
    activityId:    "",
    instructorId:  "",
    title:         "",
    description:   "",
    about:         "",
    totalDurasi:   "",
    type:          "free",
    thumbnailUrl:  "",
    introVideoUrl: "",
    highlights:    [],
    modules:       [],
  });

  const [error,        setError]        = useState(null);
  const [expandedMod,  setExpandedMod]  = useState(null);

  // Populate form kalau edit
  useEffect(() => {
    if (course) {
      setForm({
        activityId:    course.activityId    ?? "",
        instructorId:  course.instructorId  ?? "",
        title:         course.title         ?? "",
        description:   course.description   ?? "",
        about:         course.about         ?? "",
        totalDurasi:   course.totalDurasi   ?? "",
        type:          course.type          ?? "free",
        thumbnailUrl:  course.thumbnailUrl  ?? "",
        introVideoUrl: course.introVideoUrl ?? "",
        highlights:    course.highlights    ?? [],
        modules:       (course.modules ?? []).map((m) => ({
          title:      m.title,
          durasi:     m.durasi ?? "",
          order:      m.order,
          subModules: (m.subModules ?? []).map((s) => ({
            title:    s.title,
            durasi:   s.durasi ?? "",
            type:     s.type,
            order:    s.order,
            videoUrl: s.videoUrl ?? "",
          })),
        })),
      });
    }
  }, [course]);

  // ── Field helpers ────────────────────────────────────────────────────────
  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  // Highlights
  const addHighlight    = () => set("highlights", [...form.highlights, EMPTY_HIGHLIGHT()]);
  const removeHighlight = (i) => set("highlights", form.highlights.filter((_, idx) => idx !== i));
  const setHighlight    = (i, key, val) => set("highlights", form.highlights.map((h, idx) => idx === i ? { ...h, [key]: val } : h));

  // Modules
  const addModule    = () => set("modules", [...form.modules, { ...EMPTY_MODULE(), order: form.modules.length }]);
  const removeModule = (i) => set("modules", form.modules.filter((_, idx) => idx !== i));
  const setModule    = (i, key, val) => set("modules", form.modules.map((m, idx) => idx === i ? { ...m, [key]: val } : m));

  // SubModules
  const addSubModule    = (mi) => setModule(mi, "subModules", [...(form.modules[mi].subModules ?? []), EMPTY_SUBMODULE()]);
  const removeSubModule = (mi, si) => setModule(mi, "subModules", form.modules[mi].subModules.filter((_, idx) => idx !== si));
  const setSubModule    = (mi, si, key, val) => setModule(mi, "subModules", form.modules[mi].subModules.map((s, idx) => idx === si ? { ...s, [key]: val } : s));

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const payload = {
      ...form,
      highlights: form.highlights.map((h, i) => ({ ...h, order: i })),
      modules:    form.modules.map((m, i) => ({
        ...m, order: i,
        subModules: (m.subModules ?? []).map((s, j) => ({ ...s, order: j })),
      })),
    };

    // Bersihkan string kosong jadi null
    ["instructorId", "about", "totalDurasi", "thumbnailUrl", "introVideoUrl"].forEach((k) => {
      if (!payload[k]) payload[k] = null;
    });

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: course.id, ...payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message ?? "Gagal menyimpan kursus.");
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-[720px] max-w-[95vw] max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-black text-[var(--text-dashboard)]">
            {isEdit ? "Edit Kursus" : "Tambah Kursus Baru"}
          </h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

          {/* ── Section: Info Dasar ── */}
          <div>
            <p className="text-xs font-black text-[#2B6CB0] uppercase tracking-wider mb-3 border-b border-blue-100 pb-1">Info Dasar</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelCls}>Judul Kursus *</label>
                <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Biomekanika Lari Cepat" required />
              </div>

              <div>
                <label className={labelCls}>Aktivitas *</label>
                <select className={inputCls} value={form.activityId} onChange={(e) => set("activityId", e.target.value)} required>
                  <option value="">-- Pilih --</option>
                  {ACTIVITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Tipe *</label>
                <select className={inputCls} value={form.type} onChange={(e) => set("type", e.target.value)}>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className={labelCls}>Deskripsi Singkat *</label>
                <textarea className={inputCls} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Deskripsi singkat kursus" required />
              </div>

              <div className="col-span-2">
                <label className={labelCls}>Tentang Kursus (About)</label>
                <textarea className={inputCls} rows={4} value={form.about} onChange={(e) => set("about", e.target.value)} placeholder="Penjelasan panjang tentang kursus ini..." />
              </div>

              <div>
                <label className={labelCls}>Total Durasi</label>
                <input className={inputCls} value={form.totalDurasi} onChange={(e) => set("totalDurasi", e.target.value)} placeholder="45 Min" />
              </div>

              <div>
                <label className={labelCls}>Instructor ID</label>
                <input className={inputCls} value={form.instructorId} onChange={(e) => set("instructorId", e.target.value)} placeholder="UUID instructor (opsional)" />
              </div>

              <div>
                <label className={labelCls}>URL Thumbnail</label>
                <input className={inputCls} value={form.thumbnailUrl} onChange={(e) => set("thumbnailUrl", e.target.value)} placeholder="https://..." />
              </div>

              <div>
                <label className={labelCls}>URL Intro Video</label>
                <input className={inputCls} value={form.introVideoUrl} onChange={(e) => set("introVideoUrl", e.target.value)} placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* ── Section: Highlights ── */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-blue-100 pb-1">
              <p className="text-xs font-black text-[#2B6CB0] uppercase tracking-wider">Highlights</p>
              <button type="button" onClick={addHighlight} className="flex items-center gap-1 text-xs font-bold text-[#2B6CB0] hover:text-[#1A365D]">
                <Plus size={13} /> Tambah
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {form.highlights.map((h, i) => (
                <div key={i} className="grid grid-cols-[80px_1fr_1fr_32px] gap-2 items-start bg-gray-50 rounded-lg p-3">
                  <div>
                    <label className={labelCls}>Icon</label>
                    <input className={inputCls} value={h.icon} onChange={(e) => setHighlight(i, "icon", e.target.value)} placeholder="zap" />
                  </div>
                  <div>
                    <label className={labelCls}>Judul</label>
                    <input className={inputCls} value={h.title} onChange={(e) => setHighlight(i, "title", e.target.value)} placeholder="Judul highlight" />
                  </div>
                  <div>
                    <label className={labelCls}>Deskripsi</label>
                    <input className={inputCls} value={h.desc} onChange={(e) => setHighlight(i, "desc", e.target.value)} placeholder="Deskripsi" />
                  </div>
                  <button type="button" onClick={() => removeHighlight(i)} className="mt-5 text-red-400 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {form.highlights.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada highlight</p>}
            </div>
          </div>

          {/* ── Section: Modules ── */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-blue-100 pb-1">
              <p className="text-xs font-black text-[#2B6CB0] uppercase tracking-wider">Modul</p>
              <button type="button" onClick={addModule} className="flex items-center gap-1 text-xs font-bold text-[#2B6CB0] hover:text-[#1A365D]">
                <Plus size={13} /> Tambah Modul
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {form.modules.map((m, mi) => (
                <div key={mi} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Modul header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                    <button type="button" onClick={() => setExpandedMod(expandedMod === mi ? null : mi)} className="flex items-center gap-2 text-sm font-bold text-gray-700 flex-1 text-left">
                      {expandedMod === mi ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      Modul {mi + 1}: {m.title || "(Tanpa Judul)"}
                    </button>
                    <button type="button" onClick={() => removeModule(mi)} className="text-red-400 hover:text-red-600 ml-2">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {expandedMod === mi && (
                    <div className="p-4 flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Judul Modul</label>
                          <input className={inputCls} value={m.title} onChange={(e) => setModule(mi, "title", e.target.value)} placeholder="Dasar Posisi Tubuh" />
                        </div>
                        <div>
                          <label className={labelCls}>Durasi</label>
                          <input className={inputCls} value={m.durasi} onChange={(e) => setModule(mi, "durasi", e.target.value)} placeholder="23 Min Video" />
                        </div>
                      </div>

                      {/* SubModules */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Sub Modul</p>
                          <button type="button" onClick={() => addSubModule(mi)} className="flex items-center gap-1 text-[10px] font-bold text-[#2B6CB0]">
                            <Plus size={11} /> Tambah Sub Modul
                          </button>
                        </div>
                        <div className="flex flex-col gap-2">
                          {(m.subModules ?? []).map((s, si) => (
                            <div key={si} className="grid grid-cols-[1fr_80px_80px_120px_32px] gap-2 items-end bg-gray-50 rounded-lg p-2">
                              <div>
                                <label className={labelCls}>Judul</label>
                                <input className={inputCls} value={s.title} onChange={(e) => setSubModule(mi, si, "title", e.target.value)} placeholder="Pengenalan Dasar" />
                              </div>
                              <div>
                                <label className={labelCls}>Durasi</label>
                                <input className={inputCls} value={s.durasi} onChange={(e) => setSubModule(mi, si, "durasi", e.target.value)} placeholder="8 Min" />
                              </div>
                              <div>
                                <label className={labelCls}>Tipe</label>
                                <select className={inputCls} value={s.type} onChange={(e) => setSubModule(mi, si, "type", e.target.value)}>
                                  <option value="video">Video</option>
                                  <option value="drill">Drill</option>
                                </select>
                              </div>
                              <div>
                                <label className={labelCls}>URL Video</label>
                                <input className={inputCls} value={s.videoUrl} onChange={(e) => setSubModule(mi, si, "videoUrl", e.target.value)} placeholder="https://..." />
                              </div>
                              <button type="button" onClick={() => removeSubModule(mi, si)} className="text-red-400 hover:text-red-600 pb-0.5">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                          {(m.subModules ?? []).length === 0 && <p className="text-[10px] text-gray-400 text-center py-1">Belum ada sub modul</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {form.modules.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada modul</p>}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 font-semibold">
              {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm rounded-xl">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2.5 bg-[#2B6CB0] hover:bg-[#2C5282] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-colors"
          >
            {isLoading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Kursus"}
          </button>
        </div>
      </div>
    </div>
  );
}