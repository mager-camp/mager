export default function PageHeader({
  isEditing,
  onEdit,
  onSave,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
          Pengaturan Akun
        </h1>

        <p className="text-sm text-text-primary mt-1 leading-relaxed">
          Kelola profil, keamanan akun, dan preferensi pengguna Anda.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
        <button
          type="button"
          onClick={onEdit}
          disabled={isEditing}
          className={`px-5 py-2 text-xs font-bold rounded-sm border-2 transition-all ${
            isEditing
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#EBF8FF]"
          }`}
        >
          EDIT PERUBAHAN
        </button>

        <button
          type="submit"
          disabled={!isEditing}
          className={`px-5 py-2 text-xs font-bold rounded-sm transition-all ${
            isEditing
              ? "bg-[#ED8936] hover:bg-[#DD6B20] text-white active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          SIMPAN PERUBAHAN
        </button>
      </div>
    </div>
  );
}