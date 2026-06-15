import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, User, Phone, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../constants/authSchema";
import { register as registerUser, login } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/services/authService";

function InputField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  registration,
  error,
  rightSlot,
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className={`w-full pl-9 ${rightSlot ? "pr-9" : "pr-3"} py-2.5 text-sm border rounded bg-white/70
            placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] transition-colors
            ${error ? "border-red-400" : "border-gray-200"}`}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[10px] text-red-500 mt-0.5">{error.message}</p>
      )}
    </div>
  );
}

export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      konfirmasiPassword: "",
      setuju: false,
    },
  });

  async function onSubmit(data) {
    try {
      setLoading(true);

      // register
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      // auto login
      const loginResult = await login({
        email: data.email,
        password: data.password,
      });

      // update auth context
      setAuth(loginResult.data.user, loginResult.data.token);

      // redirect
      navigate("/user/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Register gagal");
    } finally {
      setLoading(false);
    }
  }

  const eyeBtn = (show, toggle) => (
    <button
      type="button"
      onClick={toggle}
      className="text-gray-400 hover:text-gray-600"
    >
      {show ? <EyeOff size={13} /> : <Eye size={13} />}
    </button>
  );

  return (
    <div className="w-full max-w-[340px] mx-auto">
      {/* Logo */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-black text-[#1A365D] tracking-widest">
          MAGER
        </h1>
        <div className="flex items-center gap-2 justify-center mt-1">
          <div className="h-px w-10 bg-gray-300" />
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em]">
            DAFTAR
          </p>
          <div className="h-px w-10 bg-gray-300" />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-t-sm shadow-xl border border-white/60 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3.5"
        >
          {/* Nama Lengkap */}
          <InputField
            label="Nama Lengkap"
            icon={User}
            placeholder="Martin Edwards Park"
            registration={register("fullName")}
            error={errors.fullName}
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
            registration={register("phone")}
            error={errors.phone}
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
                <button
                  type="button"
                  className="font-bold text-[#2B6CB0] hover:underline"
                >
                  Ketentuan Layanan
                </button>{" "}
                dan{" "}
                <button
                  type="button"
                  className="font-bold text-[#2B6CB0] hover:underline"
                >
                  Protokol Privasi
                </button>{" "}
                MAGER.
              </span>
            </label>
            {errors.setuju && (
              <p className="text-[10px] text-red-500 mt-0.5">
                {errors.setuju.message}
              </p>
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
              <>
                BUAT AKUN <Zap size={13} />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] font-bold text-gray-400 tracking-wider">
              ATAU
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google SSO */}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const result = await googleLogin(credentialResponse.credential);
                setAuth(result.data.user, result.data.token);
                const roleName = result.data.user.role?.toUpperCase();
                navigate(
                  roleName === "ADMIN" ? "/admin/dashboard" : "/user/dashboard",
                  { replace: true },
                );
              } catch (err) {
                console.error(err);
              }
            }}
            onError={() => console.error("Google login failed")}
            width="100%"
            text="signin_with_google"
            shape="rectangular"
            theme="outline"
          />
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
