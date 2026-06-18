import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../constants/authSchema";
import { login } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/services/authService";

function getRoleName(user) {
  const role = user?.role;

  if (typeof role === "string") {
    return role.toUpperCase();
  }

  if (typeof role?.name === "string") {
    return role.name.toUpperCase();
  }

  return "";
}

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    try {
      setLoading(true);

      const result = await login({
        email: data.email,
        password: data.password,
      });

      const user = result.data.user;
      const token = result.data.token;

      setAuth(user, token);

      const roleName = getRoleName(user);

      if (roleName === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else if (roleName === "PELATIH") {
        navigate("/pelatih/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    } catch (error) {
      setError("password", {
        message: error.response?.data?.message || "Email atau password salah",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[320px] mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-[#1A365D] tracking-widest">
          MAGER
        </h1>
        <div className="flex items-center gap-2 justify-center mt-1">
          <div className="h-px w-10 bg-gray-300" />
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em]">
            MASUK
          </p>
          <div className="h-px w-10 bg-gray-300" />
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-t-sm shadow-xl border border-white/60 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Alamat Email
            </label>
            <div className="relative">
              <Mail
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email")}
                className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded bg-white/70 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] transition-colors ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 mt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Kata Sandi
              </label>
              <button
                type="button"
                className="text-[10px] font-bold text-[#ED8936] hover:text-[#DD6B20] transition-colors"
              >
                Lupa kata sandi?
              </button>
            </div>

            <div className="relative">
              <Lock
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPass ? "text" : "password"}
                {...register("password")}
                placeholder="********"
                className={`w-full pl-9 pr-9 py-2.5 text-sm border rounded bg-white/70 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] transition-colors ${
                  errors.password ? "border-red-400" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-[10px] text-red-500 mt-0.5">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2B6CB0] hover:bg-[#1A365D] active:scale-95 transition-all text-white text-xs font-black rounded tracking-widest mt-1"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                MASUK <Zap size={13} />
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] font-bold text-gray-400 tracking-wider">
              MASUK DENGAN
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

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

      <div className="bg-[#1A365D]/80 backdrop-blur-sm rounded-b-sm py-3 px-5 flex items-center justify-center gap-1.5">
        <span className="text-xs text-blue-200">Belum terdaftar?</span>
        <button
          onClick={() => navigate("/register")}
          className="text-xs font-black text-[#ED8936] hover:text-[#F6AD55] transition-colors"
        >
          Daftar sekarang
        </button>
      </div>

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
