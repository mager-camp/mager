import { useMemo, useState } from "react";
import { ArrowLeft, ChevronRight, ImagePlus, Plus, Upload, X } from "lucide-react";

export default function TambahModulPage() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [durasi, setDurasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambarPreview, setGambarPreview] = useState("");
  const [subModules, setSubModules] = useState([]);

  const canPublish = useMemo(() => {
    return judul.trim() && kategori && durasi && deskripsi.trim();
  }, [judul, kategori, durasi, deskripsi]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setGambarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const addSubModule = () => {
    setSubModules((prev) => [
      ...prev,
      {
        id: Date.now(),
        judul: "",
        video: "",
        durasi: "",
        deskripsi: "",
      },
    ]);
  };

  const removeSubModule = (id) => {
    setSubModules((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSubModule = (id, field, value) => {
    setSubModules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f7f3] text-[#133957]">
      <div className="mx-auto max-w-7xl px-6 pb-32 pt-8">
        <div className="flex items-center gap-2 text-sm text-[#8a9db5]">
          <span>Manajemen Modul</span>
          <ChevronRight size={16} />
          <span className="font-semibold text-[#e88d67]">Tambah Modul</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold text-[#133957]">
          Tambah Modul Kursus Baru
        </h1>

        <section className="mt-6 rounded-2xl border border-[#e8edf2] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3ec]">
              <ImagePlus className="text-[#e88d67]" size={18} />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#133957]">
              Informasi Umum Modul
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">Gambar Modul</label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#c5d8ea] bg-[#fafcff] px-6 py-10 transition hover:border-[#487097] hover:bg-[#f3f7fb]">
                {gambarPreview ? (
                  <img
                    src={gambarPreview}
                    alt="Preview modul"
                    className="max-h-52 w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f1f8]">
                      <Upload size={22} className="text-[#487097]" />
                    </div>
                    <p className="font-semibold text-[#487097]">Klik untuk upload gambar</p>
                    <p className="text-xs text-[#8a9db5]">PNG, JPG, WEBP — Maks. 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Judul Modul</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Masukkan judul modul..."
                className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none transition focus:border-[#487097]"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Kategori Modul</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full rounded-xl border border-[#c5d8ea] bg-white px-4 py-3 outline-none transition focus:border-[#487097]"
                >
                  <option value="">Pilih Kategori...</option>
                  <option value="obstacle">Obstacle</option>
                  <option value="anggar">Anggar</option>
                  <option value="tembak">Tembak</option>
                  <option value="renang">Renang</option>
                  <option value="lari">Lari</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Durasi Estimasi (Menit)</label>
                <input
                  type="number"
                  min="1"
                  value={durasi}
                  onChange={(e) => setDurasi(e.target.value)}
                  placeholder="Contoh: 45"
                  className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none transition focus:border-[#487097]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Deskripsi Lengkap</label>
              <textarea
                rows={5}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Jelaskan tujuan dan materi yang akan dipelajari dalam modul ini..."
                className="w-full resize-none rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none transition focus:border-[#487097]"
              />
            </div>
          </div>
        </section>

        <div className="mt-6 space-y-5">
          {subModules.map((item, index) => (
            <section
              key={item.id}
              className="rounded-2xl border border-[#e8edf2] bg-white p-8 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3ec]">
                    <ImagePlus className="text-[#e88d67]" size={18} />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#133957]">
                    Informasi Umum Sub Modul {index + 1}
                  </h2>
                </div>
                <button
                  onClick={() => removeSubModule(item.id)}
                  className="rounded-xl border border-[#fecaca] px-3 py-2 text-sm font-semibold text-[#f87171] transition hover:border-[#f87171] hover:bg-[#fef2f2]"
                >
                  Hapus Sub Modul
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Judul Sub Modul</label>
                  <input
                    type="text"
                    value={item.judul}
                    onChange={(e) =>
                      updateSubModule(item.id, "judul", e.target.value)
                    }
                    placeholder="Masukkan judul sub modul..."
                    className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none transition focus:border-[#487097]"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Link Video (Opsional)</label>
                    <input
                      type="url"
                      value={item.video}
                      onChange={(e) =>
                        updateSubModule(item.id, "video", e.target.value)
                      }
                      placeholder="https://youtube.com"
                      className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none transition focus:border-[#487097]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Durasi Estimasi (Menit)</label>
                    <input
                      type="number"
                      min="1"
                      value={item.durasi}
                      onChange={(e) =>
                        updateSubModule(item.id, "durasi", e.target.value)
                      }
                      placeholder="Contoh: 45"
                      className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none transition focus:border-[#487097]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Deskripsi Lengkap</label>
                  <textarea
                    rows={4}
                    value={item.deskripsi}
                    onChange={(e) =>
                      updateSubModule(item.id, "deskripsi", e.target.value)
                    }
                    placeholder="Jelaskan isi sub modul ini..."
                    className="w-full resize-none rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none transition focus:border-[#487097]"
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-[#e8edf2] bg-[#f7f7f3] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            onClick={addSubModule}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#8a9db5] bg-white px-4 py-3 text-sm font-semibold text-[#487097] transition hover:border-[#487097] hover:bg-[#f3f7fb]"
          >
            <Plus size={18} />
            Tambahkan Sub Modul Baru
          </button>

          <button className="flex items-center gap-2 rounded-2xl border border-[#133957] bg-white px-6 py-3 text-sm font-semibold text-[#133957] transition hover:bg-[#f3f7fb]">
            <ArrowLeft size={16} />
            Kembali
          </button>

          <button
            disabled={!canPublish}
            className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition ${
              canPublish
                ? "bg-[#487097] hover:bg-[#133957]"
                : "cursor-not-allowed bg-[#c5d8ea]"
            }`}
          >
            <Upload size={16} />
            Publikasi Modul
          </button>
        </div>
      </div>
    </div>
  );
}
