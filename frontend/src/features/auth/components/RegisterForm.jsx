import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, User, Phone, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../constants/authSchema";

function InputField({ label, icon: Icon, type = "text", placeholder, registration, error, rightSlot }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className={`w-full pl-9 ${rightSlot ? "pr-9" : "pr-3"} py-2.5 text-sm border rounded bg-white/70
            placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] transition-colors
            ${error ? "border-red-400" : "border-gray-200"}`}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      {error && <p className="text-[10px] text-red-500 mt-0.5">{error.message}</p>}
    </div>
  );
}

export default function RegisterForm() {
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      namaLengkap: "", email: "", noTelepon: "",
      password: "", konfirmasiPassword: "", setuju: false,
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    // Simulasi API call — ganti dengan axios/fetch ke backend
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Register:", data);
    navigate("/user/dashboard");
    setLoading(false);
  }

  const eyeBtn = (show, toggle) => (
    <button type="button" onClick={toggle} className="text-gray-400 hover:text-gray-600">
      {show ? <EyeOff size={13} /> : <Eye size={13} />}
    </button>
  );

  return (
    <div className="w-full max-w-[340px] mx-auto">
      {/* Logo */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-black text-[#1A365D] tracking-widest">MAGER</h1>
        <div className="flex items-center gap-2 justify-center mt-1">
          <div className="h-px w-10 bg-gray-300" />
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em]">DAFTAR</p>
          <div className="h-px w-10 bg-gray-300" />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-t-sm shadow-xl border border-white/60 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">

          {/* Nama Lengkap */}
          <InputField
            label="Nama Lengkap"
            icon={User}
            placeholder="Martin Edwards Park"
            registration={register("namaLengkap")}
            error={errors.namaLengkap}
          />

          {/* Email */}
          <InputField
            label="Alamat Email"
            icon={Mail}
            type="email"
            placeholder="Enter email address"
            registration={register("email")}
            error={errors.email}
          />

          {/* No. Telepon */}
          <InputField
            label="No. Telepon"
            icon={Phone}
            type="tel"
            placeholder="+62 812 3456 7890"
            registration={register("noTelepon")}
            error={errors.noTelepon}
          />

          {/* Password */}
          <InputField
            label="Kata Sandi"
            icon={Lock}
            type={showPass ? "text" : "password"}
            placeholder="Min. 6 karakter"
            registration={register("password")}
            error={errors.password}
            rightSlot={eyeBtn(showPass, () => setShowPass((v) => !v))}
          />

          {/* Konfirmasi Password */}
          <InputField
            label="Konfirmasi Kata Sandi"
            icon={Lock}
            type={showConfirm ? "text" : "password"}
            placeholder="Ulangi kata sandi"
            registration={register("konfirmasiPassword")}
            error={errors.konfirmasiPassword}
            rightSlot={eyeBtn(showConfirm, () => setShowConfirm((v) => !v))}
          />

          {/* Checkbox setuju */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                {...register("setuju")}
                className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 accent-[#2B6CB0] cursor-pointer shrink-0"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                Saya menyetujui{" "}
                <button type="button" className="font-bold text-[#2B6CB0] hover:underline">
                  Ketentuan Layanan
                </button>{" "}
                dan{" "}
                <button type="button" className="font-bold text-[#2B6CB0] hover:underline">
                  Protokol Privasi
                </button>{" "}
                MAGER.
              </span>
            </label>
            {errors.setuju && (
              <p className="text-[10px] text-red-500 mt-0.5">{errors.setuju.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2B6CB0] hover:bg-[#1A365D] active:scale-95 transition-all text-white text-xs font-black rounded tracking-widest mt-1"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>BUAT AKUN <Zap size={13} /></>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] font-bold text-gray-400 tracking-wider">ATAU</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-95 transition-all rounded text-xs font-semibold text-gray-600"
          >
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Daftar via Google
          </button>
        </form>
      </div>

      {/* Login link */}
      <div className="bg-[#1A365D]/80 backdrop-blur-sm rounded-b-sm py-3 px-5 flex items-center justify-center gap-1.5">
        <span className="text-xs text-blue-200">Sudah punya akun?</span>
        <button
          onClick={() => navigate("/login")}
          className="text-xs font-black text-[#ED8936] hover:text-[#F6AD55] transition-colors"
        >
          Masuk sekarang
        </button>
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
          Protokol Privasi
        </button>
        <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
          Ketentuan Kerja Sama
        </button>
      </div>
    </div>
  );
}