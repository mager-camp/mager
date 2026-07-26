import page2 from '../../../assets/page2.svg';

function PerformaMaksimal() {
  return (
    <section
      className="w-full bg-[#EFF3FC] py-[60px] px-4 sm:px-6 lg:px-10 mt-[50px] flex justify-center items-center"
      id="section-performa-maksimal"
    >
      <div className="performa-konten w-full max-w-[1306px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12" id="performa-konten">

        {/* Bagian kiri Informasi & Keunggulan */}
        <div
          className="performa-kiri animasi-saat-scroll w-full lg:flex-[0_0_50%] lg:max-w-[550px] flex flex-col items-center lg:items-start text-center lg:text-left"
          id="performa-kiri"
        >
          <div className="inline-flex items-center bg-[#D2E3FC] rounded-full py-1.5 px-[18px] mb-5 text-xs font-bold text-[#1B3A5C] tracking-[0.8px] uppercase" id="badge-intuitif">
            INTUITIF &amp; MUDAH DIGUNAKAN
          </div>

          <h2 className="performa-judul text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-[#133957] mb-5" id="performa-judul">
            Dirancang untuk
            <span className="block text-[#133957]">Performa Maksimal</span>
          </h2>

          <p className="text-sm font-normal text-[#4682A9] leading-[1.7] mb-6 max-w-[500px]" id="performa-deskripsi">
            Antar muka simpel namun powerful yang membantu pelatih, atlit dan pengguna biasa pada apa yang paling penting
          </p>

          <ul className="list-none p-0 m-0 flex flex-col gap-3 items-start" id="performa-poin-list">
            <li className="flex items-center gap-3 text-sm font-medium text-[#133957]">
              <span className="text-[#4178BF] font-bold text-base shrink-0">✓</span>
              <span>Navigasi mudah &amp; responsif</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-[#133957]">
              <span className="text-[#4178BF] font-bold text-base shrink-0">✓</span>
              <span>Informasi jelas &amp; terstruktur</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-[#133957]">
              <span className="text-[#4178BF] font-bold text-base shrink-0">✓</span>
              <span>Akses cepat ke data penting</span>
            </li>
          </ul>
        </div>

        {/* Bagian kanan Gambar Presentasi */}
        <div
          className="performa-kanan animasi-saat-scroll tunda-scroll-1 w-full lg:flex-[0_0_48%] flex items-center justify-center lg:justify-end"
          id="performa-kanan"
        >
          <div className="performa-gambar-container w-full max-w-[511px] aspect-[511/356] h-auto" id="performa-gambar-container">
            <img
              src={page2}
              alt="Pratinjau performa MAGER - Desain intuitif dan fungsional"
              className="performa-gambar w-full h-full object-contain rounded-xl shadow-[0_20px_45px_rgba(27,58,92,0.12)]"
              id="performa-gambar"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default PerformaMaksimal;