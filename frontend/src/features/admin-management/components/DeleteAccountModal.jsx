// src/features/admin-management/components/DeleteAccountModal.jsx
export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[620px] rounded-[18px] bg-white px-8 py-12 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-7 flex justify-center">
          <div className="flex h-[66px] w-[66px] select-none items-center justify-center rounded-full border-[6px] border-[#ff1010] text-[42px] font-bold leading-none text-[#ff1010]">
            !
          </div>
        </div>

        <h3 className="mx-auto mb-12 max-w-[390px] text-[26px] font-bold leading-tight text-[#153a59] md:text-[28px]">
          Yakin ingin menghapus akun ini?
        </h3>

        <div className="flex flex-col items-center justify-center gap-4 font-semibold text-[22px] sm:flex-row sm:gap-14">
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-[145px] rounded-[7px] bg-[#ff624d] text-white transition-colors hover:bg-[#e85643]"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-10 w-[145px] rounded-[7px] bg-[#68b461] text-white transition-colors hover:bg-[#5aa153]"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
}