import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        403
      </h1>

      <p>
        Anda tidak memiliki akses ke halaman ini.
      </p>

      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded"
      >
        Kembali
      </Link>
    </div>
  );
}