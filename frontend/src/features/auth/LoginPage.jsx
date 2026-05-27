import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    /*
      Background: gradient abu-abu biru muda + silhouette athlete overlay
      Persis kaya di design — pakai pseudo gradient layer
    */
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C8D8E8] via-[#D8E6F0] to-[#B8CCE0]" />

      {/* Silhouette overlay — SVG athlete siluet abstrak */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg
          viewBox="0 0 400 600"
          className="h-full max-h-screen opacity-10"
          fill="#5A7FA0"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Siluet manusia sederhana */}
          <ellipse cx="200" cy="80" rx="38" ry="42" />
          <path d="M162 130 Q145 220 140 320 Q155 310 170 320 L180 220 L200 260 L220 220 L230 320 Q245 310 260 320 Q255 220 238 130 Q220 120 200 118 Q180 120 162 130Z" />
          <path d="M140 320 Q120 380 115 440 Q130 445 140 435 L155 360 L160 320Z" />
          <path d="M260 320 Q280 380 285 440 Q270 445 260 435 L245 360 L240 320Z" />
        </svg>
      </div>

      {/* Noise texture overlay biar berasa */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Form — di atas semua layer */}
      <div className="relative z-10 w-full px-4">
        <LoginForm />
      </div>
    </div>
  );
}