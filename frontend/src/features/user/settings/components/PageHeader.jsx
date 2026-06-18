export default function PageHeader({ isEditing, onEdit, onCancel }) {
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
        {!isEditing ? (
          <button
            type="button"
            onClick={onEdit}
            className="px-5 py-2 text-xs font-bold rounded-sm border-2 border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#EBF8FF] transition-all"
          >
            EDIT PERUBAHAN
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 text-xs font-bold rounded-sm border-2 border-red-200 text-red-600 hover:bg-red-50 transition-all"
            >
              BATALKAN
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-sm bg-[#ED8936] hover:bg-[#DD6B20] text-white active:scale-95 transition-all"
            >
              SIMPAN PERUBAHAN
            </button>
          </>
        )}
      </div>
    </div>
  );
}
