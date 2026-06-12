// src/features/admin-management/components/SendMessageModal.jsx
import { useState } from "react";

export default function SendMessageModal({ isOpen, onClose, email }) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    if (!message.trim()) {
      alert("Pesan tidak boleh kosong!");
      return;
    }
    // Logika pengiriman data ke backend atau API bisa ditaruh di sini
    console.log(`Mengirim pesan ke ${email}:`, message);
    alert("Pesan berhasil dikirim!");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* CARD POP UP */}
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-150">
        
        {/* JUDUL POP UP */}
        <h3 className="text-2xl font-bold text-[#1e3240] tracking-tight mb-4">
          Kirim Pesan
        </h3>
        
        {/* DESKRIPSI EMAIL TUJUAN */}
        <p className="text-sm text-[#1e3240] font-medium leading-relaxed max-w-xs mx-auto mb-6">
          Pesan ini akan otomatis dikirim ke email{" "}
          <span className="font-bold underline text-blue-600 break-all">
            {email || "user@example.com"}
          </span>
        </p>

        {/* INPUT TEXTAREA */}
        <div className="relative mb-8">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis pesan Anda di sini..."
            className="w-full rounded-xl border-2 border-[#1e3240] p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none bg-slate-50 min-h-[100px]"
          />
          {/* Garis hiasan pojok kanan bawah textarea bawaan browser jika ada */}
          <div className="absolute bottom-2 right-2 pointer-events-none opacity-40">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0L0 10M10 4L4 10M10 8L8 10" stroke="#1e3240" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex gap-4 justify-center items-center">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#ff6b57] hover:bg-[#e05643] text-white font-bold py-3 px-6 rounded-xl text-base shadow-sm transition-all active:scale-[0.98]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex-1 bg-[#6cb76f] hover:bg-[#569e59] text-white font-bold py-3 px-6 rounded-xl text-base shadow-sm transition-all active:scale-[0.98]"
          >
            Kirim
          </button>
        </div>

      </div>
    </div>
  );
}