function SectionPremium({ onScroll }) {
  return (
    <section
      className="w-full bg-white pt-[60px] px-10 pb-40 mt-[50px] flex flex-col items-center justify-center"
      id="section-premium-mager"
    >
      {/* Header section premium */}
      <div className="animasi-saat-scroll text-center mb-10" id="premium-header-container">
        <h2 className="premium-judul-utama text-[32px] font-extrabold text-[#133957] mb-3" id="premium-judul-utama">
          Standar Tanpa Kompromi.
        </h2>
        <p className="premium-deskripsi-utama text-lg font-normal text-[#4682A9] leading-[1.6] max-w-[700px] mx-auto" id="premium-deskripsi-utama">
          Ikuti protokol ini. Dapatkan perangkat lengkap untuk meraih kejayaan di bidang olahraga.
        </p>
      </div>

      {/* Kartu Premium Badge */}
      <div
        className="premium-kartu-pembungkus animasi-saat-scroll tunda-scroll-1 w-[448px] h-[380px] bg-white border-2 border-[#D3E4FE] rounded-2xl relative shadow-[0_12px_36px_rgba(80,123,177,0.08)] overflow-visible"
        id="premium-kartu-pembungkus"
      >
        <div
          className="absolute top-0 right-0 bg-[#507BB1] text-white text-[11px] font-bold tracking-[0.5px] p-2 rounded-tl-none rounded-tr-[14px] rounded-br-none rounded-bl-[14px] uppercase leading-none"
          id="badge-direkomendasikan"
        >
          DIREKOMENDASIKAN
        </div>

        <div className="premium-kartu-konten py-9 px-8 flex flex-col h-full justify-between" id="premium-kartu-konten">
          <h3 className="text-2xl font-bold text-[#133957] mt-2.5" id="premium-paket-judul">
            Premium Badge
          </h3>

          <div className="flex items-baseline my-3" id="premium-harga-box">
            <span className="text-[#FF5F00] text-[40px] font-extrabold tracking-[-0.5px]" id="premium-harga-nilai">
              Rp248.000
            </span>
            <span className="text-[#4682A9] text-sm font-medium ml-3" id="premium-harga-durasi">
              /bulan
            </span>
          </div>

          <ul className="list-none p-0 mb-5 flex flex-col gap-3" id="premium-keuntungan-list">
            <li className="flex items-center gap-2.5 text-sm font-medium text-[#4682A9]">
              <span className="text-[#FF5F00] font-bold text-base shrink-0">✓</span>
              <span>Kursus Tambahan (Kursus Lari &amp; Renang)</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm font-medium text-[#4682A9]">
              <span className="text-[#FF5F00] font-bold text-base shrink-0">✓</span>
              <span>Tips Periodisasi</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm font-medium text-[#4682A9]">
              <span className="text-[#FF5F00] font-bold text-base shrink-0">✓</span>
              <span>Ekspor Rekap Latihan Tanpa Batas</span>
            </li>
          </ul>

          <a
            href="#beli"
            className="tombol-beli-premium flex items-center justify-center w-[382px] h-[46px] bg-[#507BB1] text-white text-[13px] font-bold rounded-lg no-underline uppercase tracking-[0.8px] mx-auto transition-all duration-300 border-none hover:bg-[#3b5f8c] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(80,123,177,0.2)]"
            id="tombol-beli-premium"
            onClick={(e) => onScroll(e, '#beli')}
          >
            BELI PREMIUM BADGE
          </a>
        </div>
      </div>
    </section>
  );
}

export default SectionPremium;
