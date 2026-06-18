import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, getProfile, updateProfile } from "@/services/pelatihService";

export default function Index() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["pelatih-profile"],
    queryFn: getProfile,
  });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelatih-profile"] });
      alert("Profil berhasil diperbarui");
    },
    onError: () => alert("Gagal memperbarui profil"),
  });

  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => alert("Password berhasil diubah"),
    onError: () => alert("Gagal mengubah password"),
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  const handleChangePassword = () => {
    const currentPassword = window.prompt("Masukkan password saat ini:");
    const newPassword = window.prompt("Masukkan password baru:");

    if (!currentPassword || !newPassword) return;

    passwordMutation.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="min-h-full bg-[#f7f7f3] p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#133957]">Pengaturan Akun</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="rounded-xl bg-[#e88d67] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70"
          >
            {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm text-[#8a9db5]">
            Memuat profil...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold uppercase tracking-[0.2em] text-[#133957]">
                Profil Pelatih
              </h2>
              <form onSubmit={handleSave} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Nama Lengkap</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none focus:border-[#487097]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none focus:border-[#487097]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Nomor Telepon</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-[#c5d8ea] px-4 py-3 outline-none focus:border-[#487097]"
                  />
                </div>
              </form>
            </section>

            <section className="rounded-2xl bg-[#E9F1F8] p-6 shadow-sm">
              <h2 className="text-base font-bold uppercase tracking-[0.2em] text-[#133957]">
                Keamanan
              </h2>
              <button
                onClick={handleChangePassword}
                className="mt-4 rounded-xl bg-[#487097] px-5 py-3 text-sm font-semibold text-white"
              >
                Ubah Password
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}