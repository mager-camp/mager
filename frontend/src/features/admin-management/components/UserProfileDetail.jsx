// src/features/admin-management/components/UserProfileDetail.jsx
import { useState } from "react";
import { ArrowLeft, Send, Edit3, CreditCard, Clock, User } from "lucide-react";
import SendMessageModal from "./SendMessageModal";
import DeactivateAccountModal from "./DeactivateAccountModal";

function formatDate(value, options = {}) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(options.withTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  }).format(new Date(value));
}

function formatAccountType(user) {
  return user?.accountType || (user?.isPremium ? "Premium" : "Biasa");
}

function getScheduleStatus(activity) {
  if (activity?.status === "completed") return ["Selesai", "bg-green-100 text-green-600"];
  if (activity?.status === "skipped") return ["Dibatalkan", "bg-red-100 text-red-600"];
  return ["Belum Mulai", "bg-amber-100 text-amber-600"];
}

export default function UserProfileDetail({
  user,
  onBack,
  onEditClick,
  onPaymentHistoryClick,
  onDeactivateClick,
}) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const userData = user || {};
  const activities = userData.activities ?? [];
  const logs = userData.logs ?? [];
  const accountType = formatAccountType(userData);
  const isInactive = userData.status === "deleted";

  const handleConfirmDeactivate = () => {
    setIsDeactivateModalOpen(false);
    onDeactivateClick && onDeactivateClick();
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800 relative">
      <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 mb-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-300 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-all text-sm text-slate-700"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <button
          type="button"
          onClick={() => setIsMessageModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2 bg-[#e2f1fc] text-[#2b7bb9] rounded-xl font-semibold shadow-sm hover:bg-[#d2e8f7] transition-all text-sm"
        >
          <Send className="w-4 h-4" /> Kirim Pesan
        </button>

        <button
          type="button"
          onClick={() => setIsDeactivateModalOpen(true)}
          disabled={isInactive}
          className="px-5 py-2 bg-[#fff0f0] text-[#e05353] border border-[#fca3a3] rounded-xl font-semibold shadow-sm hover:bg-[#ffe5e5] transition-all text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Nonaktifkan Akun
        </button>

        <button
          type="button"
          onClick={onEditClick}
          className="flex items-center gap-2 px-5 py-2 bg-[#4a7ca3] text-white rounded-xl font-semibold shadow-sm hover:bg-[#3b6688] transition-all text-sm"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative w-20 h-20 flex-shrink-0">
          <div className="w-full h-full bg-[#10b981]/10 rounded-full flex items-center justify-center text-emerald-700 overflow-hidden border border-slate-200 shadow-sm">
            {userData.avatarUrl || userData.profilePicture ? (
              <img src={userData.avatarUrl || userData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-slate-400" />
            )}
          </div>
          <span className={`absolute bottom-0 right-0 w-4 h-4 border-[3px] border-white rounded-full shadow-sm ${isInactive ? "bg-slate-400" : "bg-[#22c55e]"}`}></span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-[#1e3240]">{userData.fullName || userData.name || "Tanpa Nama"}</h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            User <span className="text-slate-300 mx-1.5">•</span> {userData.favoriteCourse || "-"}
          </p>
        </div>

        <div className="hidden md:block h-12 w-[1px] bg-slate-200 mx-4"></div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-1 text-sm text-center md:text-left w-full md:w-auto">
          <div>
            <p className="text-xs text-slate-400 font-medium">Bergabung Sejak</p>
            <p className="font-bold text-[#1e3240] mt-0.5">{formatDate(userData.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Kursus yang Sering Dipakai</p>
            <p className="font-bold text-[#1e3240] mt-0.5">{userData.favoriteCourse || "-"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#1e3240] mb-6">Informasi User</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-sm">
              <div>
                <p className="text-xs text-[#4a7ca3] font-semibold mb-1">Nama Lengkap</p>
                <p className="font-bold text-[#1e3240]">{userData.fullName || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-[#4a7ca3] font-semibold mb-1">Email</p>
                <p className="font-bold text-[#1e3240] break-all">{userData.email || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-[#4a7ca3] font-semibold mb-1">Telepon</p>
                <p className="font-bold text-[#1e3240]">{userData.phone || "-"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
            <h3 className="text-base font-bold text-[#1e3240] mb-4">Riwayat Aktifitas Terakhir</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="py-3 pr-4">AKTIVITAS</th>
                    <th className="py-3 px-4">TANGGAL</th>
                    <th className="py-3 px-4">DURASI</th>
                    <th className="py-3 px-4 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-[#1e3240]">
                  {activities.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400">
                        Belum ada riwayat aktivitas.
                      </td>
                    </tr>
                  ) : (
                    activities.map((act) => {
                      const [label, statusColor] = getScheduleStatus(act);
                      return (
                        <tr key={act.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 pr-4">
                            <p className="font-bold text-slate-700">{act.name}</p>
                            <p className="text-[11px] text-slate-400 font-normal mt-0.5">{act.coach || "Mandiri"}</p>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-600">{formatDate(act.date, { withTime: true })}</td>
                          <td className="py-3.5 px-4 text-slate-600 font-bold">{act.duration || "-"}</td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColor}`}>
                              {label}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#1e3240] mb-5">Status Akun</h3>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Tipe Akun</span>
                <span className="px-3 py-0.5 bg-[#4a7ca3] text-white text-xs font-bold rounded-full shadow-sm">{accountType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Berlaku Hingga</span>
                <span className="font-bold text-[#1e3240]">{formatDate(userData.premiumExpiredAt || userData.expiryDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Pembayaran</span>
                <span className="font-bold text-[#1e3240]">{userData.paymentMethod || "-"}</span>
              </div>

              <button
                type="button"
                onClick={onPaymentHistoryClick}
                className="w-full flex items-center justify-center gap-2 mt-4 bg-[#4a7ca3]/10 hover:bg-[#4a7ca3]/20 text-[#4a7ca3] font-bold py-2.5 rounded-xl transition-all text-sm shadow-sm"
              >
                <CreditCard className="w-4 h-4" /> Riwayat Pembayaran
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#1e3240] mb-5">Log Akses</h3>
            <div className="space-y-5">
              {logs.length === 0 ? (
                <p className="text-xs text-slate-400 font-semibold">Belum ada log akses.</p>
              ) : (
                logs.map((log, idx) => (
                  <div key={`${log.type}-${idx}`} className="flex gap-3 text-xs items-start">
                    <div className="p-1.5 bg-blue-50 text-[#4a7ca3] rounded-lg mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e3240]">{log.type}</h4>
                      <p className="text-slate-400 mt-0.5">
                        {formatDate(log.time, { withTime: true })}{" "}
                        <span className="text-[#4a7ca3] font-semibold text-[10px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 tracking-wide">
                          {log.location}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <SendMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        email={userData.email}
      />

      <DeactivateAccountModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
      />
    </div>
  );
}
