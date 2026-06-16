// src/features/payment-management/components/ActiveMethods.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Pencil,
  Landmark,
  CreditCard,
  ChevronDown,
  Trash2,
} from "lucide-react";

export default function ActiveMethods({
  methods = [],
  onAddMethod,
  onUpdateMethod,
  onDeleteMethod,
  isSaving = false,
  isDeleting = false,
}) {
  // Mengontrol kemunculan modal dan penentuan step sukses
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessStep, setIsSuccessStep] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  // State untuk mendeteksi apakah sedang EDIT atau TAMBAH BARU
  const [editingMethod, setEditingMethod] = useState(null);

  // State form fields
  const [jenisPembayaran, setJenisPembayaran] = useState("Bank");
  const [metodePembayaran, setMetodePembayaran] = useState("BCA");
  const [nomorRekening, setNomorRekening] = useState("");

  // State untuk mengontrol buka/tutup dropdown custom di dalam modal
  const [isJenisOpen, setIsJenisOpen] = useState(false);
  const [isMetodeOpen, setIsMetodeOpen] = useState(false);

  // Ref untuk mendeteksi klik di luar dropdown agar menutup otomatis
  const jenisRef = useRef(null);
  const metodeRef = useRef(null);

  const isProcessing = isSaving || isDeleting;

  const bankOptions = ["BCA", "Mandiri", "BNI"];
  const walletOptions = ["Dana", "OVO", "GoPay"];

  // Efek untuk mengisi data form otomatis ketika tombol pensil edit ditekan
  useEffect(() => {
    if (editingMethod) {
      const rawMethod = editingMethod.raw || {};

      const isBank = rawMethod.category
        ? rawMethod.category === "bank_transfer"
        : editingMethod.title === "Virtual Account" ||
          editingMethod.title === "Bank" ||
          editingMethod.title?.toLowerCase().includes("bank") ||
          editingMethod.title?.toLowerCase().includes("virtual");

      setJenisPembayaran(isBank ? "Bank" : "E-Wallet");

      if (rawMethod.name) {
        setMetodePembayaran(rawMethod.name);
      } else {
        const rawDescription = editingMethod.description || "";
        const rawBank = rawDescription.split(" ")[0];
        setMetodePembayaran(rawBank || (isBank ? "BCA" : "Dana"));
      }

      if (rawMethod.accountNumber) {
        setNomorRekening(rawMethod.accountNumber);
      } else {
        const rawDescription = editingMethod.description || "";
        const matchNo = rawDescription.match(/\(([^)]+)\)/);
        setNomorRekening(matchNo ? matchNo[1] : "");
      }
    } else {
      setJenisPembayaran("Bank");
      setMetodePembayaran("BCA");
      setNomorRekening("");
    }

    setFormError("");
    setIsJenisOpen(false);
    setIsMetodeOpen(false);
  }, [editingMethod]);

  // Menutup dropdown custom saat klik di luar area menu dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (jenisRef.current && !jenisRef.current.contains(event.target)) {
        setIsJenisOpen(false);
      }

      if (metodeRef.current && !metodeRef.current.contains(event.target)) {
        setIsMetodeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenAddModal = () => {
    setEditingMethod(null);
    setIsSuccessStep(false);
    setSuccessMessage("");
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingMethod(item);
    setIsSuccessStep(false);
    setSuccessMessage("");
    setFormError("");
    setIsModalOpen(true);
  };

  // Handler ganti jenis pembayaran custom
  const handleSelectJenis = (value) => {
    setJenisPembayaran(value);
    setMetodePembayaran(value === "Bank" ? "BCA" : "Dana");
    setIsJenisOpen(false);
    setIsMetodeOpen(false);
  };

  const handleSimpanForm = async (e) => {
    e.preventDefault();
    setFormError("");

    const nomorTrimmed = nomorRekening.trim();

    if (!nomorTrimmed) {
      setFormError("Nomor pembayaran wajib diisi.");
      return;
    }

    try {
      if (editingMethod) {
        await onUpdateMethod({
          id: editingMethod.id,
          jenis: jenisPembayaran,
          bank: metodePembayaran,
          nomor: nomorTrimmed,
        });

        setSuccessMessage("Metode pembayaran sudah berhasil diubah");
      } else {
        await onAddMethod({
          jenis: jenisPembayaran,
          bank: metodePembayaran,
          nomor: nomorTrimmed,
        });

        setSuccessMessage("Metode pembayaran sudah berhasil ditambahkan");
      }

      setIsSuccessStep(true);
    } catch (error) {
      setFormError(
        error?.response?.data?.message ||
          error?.message ||
          "Metode pembayaran gagal disimpan."
      );
    }
  };

  const handleDeleteMethod = async () => {
    if (!editingMethod?.id || !onDeleteMethod) return;

    const yakin = window.confirm("Hapus metode pembayaran ini?");
    if (!yakin) return;

    setFormError("");

    try {
      await onDeleteMethod(editingMethod.id);
      setSuccessMessage("Metode pembayaran sudah berhasil dihapus");
      setIsSuccessStep(true);
    } catch (error) {
      setFormError(
        error?.response?.data?.message ||
          error?.message ||
          "Metode pembayaran gagal dihapus."
      );
    }
  };

  const handleTutupSemuaModal = () => {
    setNomorRekening("");
    setEditingMethod(null);
    setIsSuccessStep(false);
    setSuccessMessage("");
    setFormError("");
    setIsModalOpen(false);
    setIsJenisOpen(false);
    setIsMetodeOpen(false);
  };

  return (
    <div className="mt-8 relative">
      <h3 className="text-lg font-bold text-[#1e3240] mb-1">
        Metode Pembayaran Aktif
      </h3>

      <p className="text-xs text-slate-400 font-medium mb-4">
        Konfigurasi saluran pembayaran untuk user anda
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* LOOPING DAN RENDER KARTU METODE PEMBAYARAN */}
        {methods.map((item) => {
          const title = item.title || "";
          const description = item.description || "";

          const isVirtualAccount =
            title.toLowerCase().includes("virtual") ||
            title.toLowerCase().includes("bank");

          const iconContainerBg = isVirtualAccount
            ? "bg-[#eef3f9]"
            : "bg-[#eaf4e8]";

          const iconColor = isVirtualAccount
            ? "text-[#4a90e2]"
            : "text-[#2e9d45]";

          const IconUtama = isVirtualAccount ? Landmark : CreditCard;

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative flex items-center gap-4 transition-all animate-fade-in min-h-[116px]"
            >
              <div
                className={`${iconContainerBg} ${iconColor} w-16 h-16 rounded-xl flex items-center justify-center shrink-0`}
              >
                <IconUtama className="w-8 h-8" />
              </div>

              <div className="pr-8">
                <h4 className="font-bold text-slate-700 text-sm leading-tight">
                  {title}
                </h4>

                <p className="text-[11px] text-slate-400 mt-0.5">
                  {description}
                </p>

                <span className="inline-block mt-2 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  AKTIF
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenEditModal(item)}
                className="absolute top-4 right-5 flex flex-col items-center text-slate-400 hover:text-[#4a7ca3] transition-colors focus:outline-none"
                aria-label="Edit metode pembayaran"
              >
                <Pencil className="w-4 h-4" />
                <div className="w-4 h-[1px] bg-current mt-[2px] opacity-60" />
              </button>
            </div>
          );
        })}

        {/* Card Tambah Integrasi Baru */}
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 transition-colors bg-slate-50/50 min-h-[116px]"
        >
          <span className="text-xl text-slate-400 font-bold">+</span>
          <span className="text-xs font-semibold text-slate-500 mt-1">
            Integrasi Baru
          </span>
        </button>
      </div>

      {/* =========================================================================
          SISTEM MODAL INTERAKTIF DENGAN DROPDOWN CUSTOM
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all">
          {!isSuccessStep ? (
            /* POP-UP FORM EDIT / TAMBAH DATA METODE PEMBAYARAN */
            <div className="relative bg-white rounded-[22px] shadow-2xl border border-slate-100 px-8 py-6 w-full max-w-[610px] mx-4 animate-scale-up overflow-visible">
              {editingMethod && (
                <button
                  type="button"
                  onClick={handleDeleteMethod}
                  disabled={isProcessing}
                  className="absolute right-8 top-7 text-[#ff5b45] hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Hapus metode pembayaran"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <h4 className="text-lg font-bold text-[#1a314b] text-center mb-8 tracking-wide">
                {editingMethod
                  ? "Edit Metode Pembayaran"
                  : "Tambahkan Metode Pembayaran"}
              </h4>

              <form onSubmit={handleSimpanForm} className="overflow-visible">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-11 mb-6 overflow-visible">
                  {/* DROPDOWN CUSTOM 1: JENIS PEMBAYARAN */}
                  <div className="flex flex-col relative" ref={jenisRef}>
                    <label className="text-xs font-bold text-[#1a314b] mb-2">
                      Jenis Pembayaran
                    </label>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => {
                        setIsJenisOpen(!isJenisOpen);
                        setIsMetodeOpen(false);
                      }}
                      className="w-full h-10 flex items-center justify-between bg-white border border-[#1a314b] rounded-lg px-9 py-3 text-xs font-bold text-[#1a314b] focus:outline-none shadow-xs hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>{jenisPembayaran}</span>
                      <ChevronDown
                        className={`w-6 h-6 text-[#1a314b] transition-transform ${
                          isJenisOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Menu Item Dropdown Floating */}
                    {isJenisOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-50 animate-scale-up">
                        <button
                          type="button"
                          onClick={() => handleSelectJenis("Bank")}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                            jenisPembayaran === "Bank"
                              ? "text-[#4a7ca3] bg-slate-50"
                              : "text-slate-600 hover:bg-slate-50/80"
                          }`}
                        >
                          Bank
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectJenis("E-Wallet")}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                            jenisPembayaran === "E-Wallet"
                              ? "text-[#4a7ca3] bg-slate-50"
                              : "text-slate-600 hover:bg-slate-50/80"
                          }`}
                        >
                          E-Wallet
                        </button>
                      </div>
                    )}
                  </div>

                  {/* DROPDOWN CUSTOM 2: METODE PEMBAYARAN */}
                  <div className="flex flex-col relative" ref={metodeRef}>
                    <label className="text-xs font-bold text-[#1a314b] mb-2">
                      Metode Pembayaran
                    </label>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => {
                        setIsMetodeOpen(!isMetodeOpen);
                        setIsJenisOpen(false);
                      }}
                      className="w-full h-10 flex items-center justify-between bg-white border border-[#1a314b] rounded-lg px-9 py-3 text-xs font-bold text-[#1a314b] focus:outline-none shadow-xs hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>{metodePembayaran}</span>
                      <ChevronDown
                        className={`w-6 h-6 text-[#1a314b] transition-transform ${
                          isMetodeOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Menu Item Dropdown Floating */}
                    {isMetodeOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-50 animate-scale-up max-h-[160px] overflow-y-auto">
                        {(jenisPembayaran === "Bank"
                          ? bankOptions
                          : walletOptions
                        ).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setMetodePembayaran(option);
                              setIsMetodeOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                              metodePembayaran === option
                                ? "text-[#4a7ca3] bg-slate-50"
                                : "text-slate-600 hover:bg-slate-50/80"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-12">
                  <label className="text-xs font-bold text-[#1a314b] mb-2">
                    Masukkan Nomor
                  </label>

                  <input
                    type="text"
                    required
                    disabled={isProcessing}
                    placeholder=""
                    value={nomorRekening}
                    onChange={(e) => setNomorRekening(e.target.value)}
                    className="w-full h-10 bg-white border border-[#1a314b] rounded-lg px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {formError && (
                  <p className="-mt-8 mb-6 rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                    {formError}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                  <button
                    type="button"
                    onClick={handleTutupSemuaModal}
                    disabled={isProcessing}
                    className="bg-[#ff604d] text-white py-3 px-6 rounded-lg font-bold text-sm shadow-md transition-colors hover:bg-[#e0563e] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Kembali
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="bg-[#65b85f] text-white py-3 px-6 rounded-lg font-bold text-sm shadow-md transition-colors hover:bg-[#4cae4c] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* POP-UP NOTIFIKASI INFORMASI SUKSES DISIMPAN/DIUBAH/DIHAPUS */
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 w-full max-w-[400px] mx-4 flex flex-col items-center text-center animate-scale-up">
              <div className="w-20 h-20 bg-white border-4 border-[#00c853] rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-[#00c853]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <h4 className="text-xl font-bold text-[#1a314b] mb-8 leading-relaxed max-w-[280px]">
                {successMessage}
              </h4>

              <button
                type="button"
                onClick={handleTutupSemuaModal}
                className="w-32 bg-[#ff6b52] hover:bg-[#e0563e] text-white py-2.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                Kembali
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}