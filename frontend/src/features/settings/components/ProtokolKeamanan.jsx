import { useState } from "react";
import { ShieldCheck, Smartphone, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function ProtokolKeamanan({ isEditing }) {
  const [showPass, setShowPass]   = useState(false);
  const [twoFA, setTwoFA]         = useState(true);

  return (
    <div className="bg-white rounded-xl border min-h-0 border-gray-100 shadow-sm p-6">
      {/* Section title */}
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck size={18} className="text-[#ED8936]" />
        <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">
          Protokol Keamanan
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Passcode */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Passcode Terkini
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              defaultValue="12345678"
              disabled={!isEditing}
              className={`
                w-full border rounded px-3 py-2.5 text-sm font-medium pr-10 transition-colors
                focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]
                ${isEditing
                  ? "bg-white border-gray-300 text-gray-800"
                  : "bg-[#E2E8F0] border-[#CBD5E0] text-gray-500 cursor-not-allowed"
                }
              `}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Permintaan perubahan kunci */}
        <button
          type="button"
          disabled={!isEditing}
          className={`flex items-center gap-1.5 text-xs font-bold w-fit transition-colors ${
            isEditing
              ? "text-[#ED8936] hover:text-[#DD6B20]"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          <ArrowRight size={13} />
          PERMINTAAN PERUBAHAN KUNCI
        </button>

        {/* 2FA toggle */}
        <div className={`flex items-center justify-between gap-4 rounded px-4 py-3.5 border ${
          twoFA
            ? "bg-[#EBF8FF] border-[#BEE3F8]"
            : "bg-gray-50 border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              twoFA ? "bg-[#BEE3F8]" : "bg-gray-200"
            }`}>
              <Smartphone size={16} className={twoFA ? "text-[#2B6CB0]" : "text-gray-400"} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Two-Factor Auth (2FA)
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Mengamankan akun melalui aplikasi otentikasi.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={!isEditing}
            onClick={() => isEditing && setTwoFA((v) => !v)}
            className={`px-3 py-1.5 text-[10px] font-black rounded-md transition-colors shrink-0 ${
              twoFA
                ? isEditing
                  ? "bg-[#2B6CB0] text-white hover:bg-[#1A365D]"
                  : "bg-[#2B6CB0] text-white cursor-not-allowed"
                : isEditing
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {twoFA ? "MATIKAN" : "AKTIFKAN"}
          </button>
        </div>
      </div>
    </div>
  );
}