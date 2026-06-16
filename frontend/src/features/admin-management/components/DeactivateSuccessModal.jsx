// src/features/admin-management/components/DeactivateSuccessModal.jsx
export default function DeactivateSuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[625px] rounded-[18px] bg-white px-8 py-12 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6 flex justify-center">
          <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full border-[7px] border-[#05ba27] text-[#05ba27]">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 27L22 37L41 17"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h3 className="mx-auto mb-5 max-w-[330px] text-[30px] font-bold leading-tight text-[#153a59]">
          Akun berhasil di non-aktifkan
        </h3>

        <button
          type="button"
          onClick={onClose}
          className="h-10 w-[145px] rounded-[7px] bg-[#ff624d] text-[22px] font-semibold text-white transition-colors hover:bg-[#e85643]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}