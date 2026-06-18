import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PageHeader({ activeFilter, onFilterChange }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 className="text-4xl font-black text-[var(--text-dashboard)] leading-text tracking-tight">
          Halo, {user.fullName}
        </h1>
      </div>

      <div className="flex gap-2 shrink-0 self-start sm:self-auto">
        <button
          onClick={() => navigate("/pelatih/course")}
          className="px-4 py-2 text-xs font-bold bg-[#2B6CB0] text-white rounded-sm hover:bg-[#2C5282]"
        >
          Add Course
        </button>

        <button
          onClick={() => navigate("/pelatih/calendar")}
          className="px-4 py-2 text-xs font-bold bg-[#2B6CB0] text-white rounded-sm hover:bg-[#2C5282]"
        >
          Add Calendar
        </button>
      </div>
    </div>
  );
}
