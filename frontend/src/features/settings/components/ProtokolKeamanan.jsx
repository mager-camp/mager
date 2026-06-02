import { ShieldCheck } from "lucide-react";

export default function ProtokolKeamanan({
  isEditing,
  onChangePassword,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      {/* Section title */}
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck
          size={18}
          className="text-[#ED8936]"
        />

        <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">
          Keamanan Akun
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Password
          </label>

          <input
            type="password"
            value="********"
            readOnly
            disabled
            className="
              w-full
              border
              border-[#CBD5E0]
              bg-[#E2E8F0]
              text-gray-500
              rounded-lg
              px-3
              py-2.5
              text-sm
              font-medium
              cursor-not-allowed
            "
          />
        </div>

        {/* Change password button */}
        <button
          type="button"
          disabled={!isEditing}
          onClick={onChangePassword}
          className={`
            w-fit
            px-4
            py-2
            rounded-lg
            text-sm
            font-semibold
            transition-colors
            ${
              isEditing
                ? "bg-[#ED8936] text-white hover:bg-[#DD6B20]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Ubah Password
        </button>

        {/* Future feature */}
        {/*
          TODO:
          Two Factor Authentication (2FA)

          Requirement:
          - twoFactorEnabled di database
          - endpoint enable/disable 2FA
          - authenticator app integration
          - OTP verification

          Ditunda untuk MVP.
        */}
      </div>
    </div>
  );
}