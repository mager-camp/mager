// src/features/admin-management/components/UserTable.jsx
import { Edit2, Trash2, User } from "lucide-react";

function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusLabel(status, fallback) {
  if (fallback) return fallback;
  if (status === "active") return "Aktif";
  if (status === "deleted") return "Offline";
  if (status === "suspend") return "Suspend";
  return status || "Offline";
}

export default function UserTable({
  data = [],
  onDeleteTrigger,
  onEditTrigger,
  onUserClick,
}) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="bg-[#4a7ca3] text-white px-4 py-3 font-semibold text-sm">
        Informasi User
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase bg-slate-50">
              <th className="px-3 py-3">User</th>
              <th className="px-3 py-3">Pengguna</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Telpon</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="px-3 py-3">Awal Registrasi</th>
              <th className="px-3 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {!data || data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-slate-400 font-medium"
                >
                  Tidak ada data user.
                </td>
              </tr>
            ) : (
              data.map((user) => {
                const currentStatus = getStatusLabel(user.status, user.statusLabel);

                let badgeClass = "bg-slate-100 text-slate-600";
                if (currentStatus === "Aktif") {
                  badgeClass = "bg-green-100 text-green-700 font-semibold";
                }
                if (currentStatus === "Suspend") {
                  badgeClass = "bg-red-100 text-red-700 font-semibold";
                }
                if (currentStatus === "Offline") {
                  badgeClass = "bg-slate-200 text-slate-600";
                }

                const currentName =
                  user.fullName || user.name || user.nama || "Tanpa Nama";

                const currentType =
                  user.accountType ||
                  user.tipe ||
                  (user.plan === "premium" ? "Premium" : "Biasa");

                const currentPhone = user.phone || user.telp || "-";

                const currentRegister = formatDate(
                  user.createdAt || user.joinDate || user.registrasi,
                );

                return (
                  <tr
                    key={user.id}
                    onClick={() => onUserClick && onUserClick(user.id)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 flex-shrink-0 overflow-hidden">
                          {user.profilePicture || user.avatarUrl ? (
                            <img
                              src={user.profilePicture || user.avatarUrl}
                              alt={currentName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-3.5 h-3.5" />
                          )}
                        </div>

                        <span
                          className="truncate max-w-[150px]"
                          title={currentName}
                        >
                          {currentName}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-slate-600">
                      {currentType}
                    </td>

                    <td
                      className="px-3 py-3 text-slate-600 break-all max-w-[180px]"
                      title={user.email}
                    >
                      {user.email || "-"}
                    </td>

                    <td className="px-3 py-3 text-slate-600 whitespace-nowrap">
                      {currentPhone}
                    </td>

                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] ${badgeClass}`}
                      >
                        {currentStatus}
                      </span>
                    </td>

                    <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                      {currentRegister}
                    </td>

                    <td
                      className="px-3 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onEditTrigger && onEditTrigger(user.id)}
                          className="text-[#4a7ca3] hover:text-blue-800 transition-colors p-1"
                          title="Lihat/Edit detail"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteTrigger && onDeleteTrigger(user.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1"
                          title="Hapus akun"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}