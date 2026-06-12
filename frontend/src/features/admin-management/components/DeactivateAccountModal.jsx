// src/features/admin-management/components/DeactivateAccountModal.jsx
import React from "react";

export default function DeactivateAccountModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Ikon Tanda Seru Merah Lingkaran */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 border-4 border-[#ff6b52] rounded-full flex items-center justify-center text-[#ff6b52] font-bold text-3xl select-none">
            !
          </div>
        </div>

        {/* Teks Pertanyaan */}
        <h3 className="text-[#1e3240] text-xl font-bold leading-snug px-4 mb-6">
          Yakin ingin menonaktifkan akun ini?
        </h3>

        {/* Tombol Aksi */}
        <div className="grid grid-cols-2 gap-3 font-semibold text-sm">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#ff6b52] text-white py-2.5 rounded-xl hover:bg-[#e0563e] transition-colors shadow-sm"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full bg-[#6dbb6d] text-white py-2.5 rounded-xl hover:bg-[#5aa35a] transition-colors shadow-sm"
          >
            Ya
          </button>
        </div>

      </div>
    </div>
  );
}