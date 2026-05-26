import { UserCircle } from "lucide-react";

function InputField({ label, disabled, error, registration, type = "text", placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...registration}
        className={`
          w-full border-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
          focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]
          ${disabled
            ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white border-border text-gray-800"
          }
          ${error ? "border-red-400 focus:ring-red-400" : ""}
        `}
      />
      {error && (
        <p className="text-[10px] text-red-500">{error.message}</p>
      )}
    </div>
  );
}

export default function ProfilPengguna({
  register,
  errors,
  isEditing,
  fotoPreview,
  fileInputRef,
  onFotoChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      {/* Section title */}
      <div className="flex items-center gap-2 mb-6">
        <UserCircle size={18} className="text-[#ED8936]" />
        <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">
          Profil Pengguna
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Foto profil */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100">
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Foto profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#EBF8FF]">
                <UserCircle size={40} className="text-[#90CDF4]" />
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onFotoChange}
            className="hidden"
          />
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => fileInputRef.current?.click()}
            className={`text-xs font-bold transition-colors ${
              isEditing
                ? "text-[#ED8936] hover:text-[#DD6B20]"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            PERBARUI FOTO
          </button>
        </div>

        {/* Form fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Nama Lengkap"
            disabled={!isEditing}
            registration={register("namaLengkap")}
            error={errors.namaLengkap}
          />
          <InputField
            label="Email"
            type="email"
            disabled={!isEditing}
            registration={register("email")}
            error={errors.email}
          />
          <InputField
            label="No. Telepon"
            disabled={!isEditing}
            registration={register("noTelepon")}
            error={errors.noTelepon}
          />
        </div>
      </div>
    </div>
  );
}