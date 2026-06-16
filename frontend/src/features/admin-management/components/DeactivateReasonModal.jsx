// src/features/admin-management/components/DeactivateReasonModal.jsx
import { useEffect, useState } from "react";

export default function DeactivateReasonModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const cleanReason = reason.trim();

    if (!cleanReason) {
      setError("Alasan wajib diisi.");
      return;
    }

    onConfirm(cleanReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[405px] rounded-[16px] bg-white px-10 pb-10 pt-10 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <h3 className="mx-auto mb-10 max-w-[285px] text-[18px] font-bold leading-tight text-[#153a59]">
          Tuliskan alasan anda untuk menonaktifkan akun ini!
        </h3>

        <div className="mb-16 text-left">
          <textarea
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
              if (error) setError("");
            }}
            className="h-10 w-full resize-y rounded-[7px] border border-[#153a59] px-3 py-2 text-sm font-medium text-[#153a59] outline-none focus:border-[#4a7ca3] focus:ring-1 focus:ring-[#4a7ca3]"
          />

          {error ? (
            <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>
          ) : null}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 font-semibold text-[22px] sm:flex-row sm:gap-10">
          <button
            type="button"
            onClick={onClose}
            className="h-[42px] w-[143px] rounded-[7px] bg-[#ff624d] text-white transition-colors hover:bg-[#e85643]"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="h-[42px] w-[143px] rounded-[7px] bg-[#68b461] text-white transition-colors hover:bg-[#5aa153]"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}