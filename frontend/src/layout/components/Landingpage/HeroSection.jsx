import mainLandingPage from '../../../assets/main_landing_page.svg';
import page1 from '../../../assets/page1.svg';
import panahKanan from '../../../assets/icon/panah_kanan.svg';
import logoMager from '../../../assets/logo_mager.svg';

export function HeroSection({ onScroll }) {
  return (
    <section
      className="hero-section w-full h-[693px] relative overflow-hidden flex items-center"
      id="hero-section"
    >
      {/* Gambar latar belakang */}
      <div className="absolute top-0 left-0 w-full h-full z-0" id="hero-gambar-latar">
        <img
          src={mainLandingPage}
          alt="Latar belakang hero MAGER dengan atlet pentathlon"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Lapisan gradasi */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[1]"
        id="hero-lapisan-gradasi"
        style={{
          background: 'linear-gradient(to right, #B8D1E9 0%, #B8D1E9 35%, rgba(184, 209, 233, 0.85) 50%, rgba(184, 209, 233, 0.64) 70%, rgba(184, 209, 233, 0.39) 85%, #b8d1e91c 100%)',
        }}
      />

      {/* Kontainer konten hero */}
      <div
        className="hero-konten relative z-[2] w-full h-full flex items-center justify-between px-10 mx-auto"
        id="hero-konten"
      >
        {/* Kiri: Judul, subjudul, CTA */}
        <div className="hero-kiri flex-[0_0_50%] max-w-[550px] pt-5" id="hero-kiri">
          <div
            className="animasi-dari-bawah tunda-1 inline-flex items-center gap-2 bg-[#1B2B3F] backdrop-blur-sm border border-[rgba(27,58,92,0.15)] rounded-full py-1.5 px-[18px] mb-6 text-xs font-semibold text-white tracking-[0.8px] uppercase"
            id="badge-baru"
          >
            <span className="w-2 h-2 bg-[#FF5F00] rounded-full inline-block" />
            BARU: PEMULIHAN PREDIKTIF
          </div>

          <h1
            className="hero-judul animasi-dari-bawah tunda-2 text-[42px] font-extrabold leading-[1.15] text-[#1B3A5C] mb-5"
            id="hero-judul"
          >
            Kuasai Penampilanmu.
            <span className="text-[#E8601C] block">Jadilah Juara Pentathlon</span>
          </h1>

          <p
            className="hero-subjudul animasi-dari-bawah tunda-3 text-lg font-normal text-[#4a5568] leading-[1.7] mb-8 max-w-[546px]"
            id="hero-subjudul"
          >
            Sistem operasi terbaik untuk atlet elit multidisiplin. Sinkronkan
            kalender Anda, optimalkan periodisasi, dan kuasai setiap cabang
            olahraga dengan pelacakan data yang akurat.
          </p>

          <div
            className="hero-grup-cta animasi-dari-bawah tunda-4 flex items-center gap-4 flex-wrap"
            id="hero-grup-cta"
          >
            <a
              href="#mulai"
              className="tombol-cta-utama group inline-flex items-center gap-2.5 bg-[#E8601C] text-white py-3.5 px-7 rounded-lg font-bold text-[13px] tracking-[1px] no-underline border-2 border-[#E8601C] cursor-pointer transition-all duration-300 uppercase hover:bg-[#d4520f] hover:border-[#d4520f] hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(232,96,28,0.35)]"
              id="tombol-cta-mulai"
              onClick={(e) => onScroll(e, '#mulai')}
            >
              MULAI PELATIHAN GRATIS
              <img
                src={panahKanan}
                alt="Panah kanan"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#premium"
              className="tombol-cta-sekunder inline-flex items-center bg-transparent text-[#1B3A5C] border-2 border-[#1B3A5C] py-4 px-7 rounded-lg font-bold text-[13px] tracking-[1px] no-underline cursor-pointer transition-all duration-300 uppercase hover:bg-[#1B3A5C] hover:text-white hover:border-[#1B3A5C] hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(27,58,92,0.2)]"
              id="tombol-cta-premium"
              onClick={(e) => onScroll(e, '#section-premium-mager')}
            >
              LIHAT PAKET PREMIUM
            </a>
          </div>
        </div>

        {/* Kanan: Gambar dashboard */}
        <div
          className="hero-kanan animasi-dari-kanan tunda-3 flex-[0_0_48%] flex items-center justify-end relative h-full pt-[30px]"
          id="hero-kanan"
        >
          <div className="hero-gambar-dashboard relative w-[110%] max-w-[580px] h-auto" id="hero-gambar-dashboard">
            <img
              src={page1}
              alt="Pratinjau dashboard MAGER - Portal atlet dengan metrik performa"
              className="max-w-[110%] h-auto rounded-xl shadow-[0_20px_60px_rgba(27,58,92,0.25),0_8px_24px_rgba(27,58,92,0.15)] transition-transform duration-[400ms]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onScroll }) {
  return (
    <footer
      className="footer-utama w-full h-[125px] bg-[#EFF3FC] flex items-center justify-center border-t border-[#E2E8F0]"
      id="footer-utama"
    >
      <div
        className="footer-konten w-full max-w-[1306px] mx-auto px-10 flex items-center justify-between"
        id="footer-konten"
      >
        {/* Logo Website Kiri */}
        <div className="flex items-center" id="footer-kiri">
          <a
            href="#navigasi-utama"
            className="block"
            id="footer-logo"
            onClick={(e) => onScroll(e, '#navigasi-utama')}
          >
            <img
              src={logoMager}
              alt="Logo MAGER - Modern Pentathlon Training"
              className="h-[38px] w-auto block"
            />
          </a>
        </div>

        {/* Tengah: Link Navigasi Tambahan */}
        <div className="footer-tengah flex gap-8" id="footer-tengah">
          <a
            href="#kebijakan"
            className="no-underline text-[13px] font-semibold text-[#4682A9] tracking-[0.5px] transition-colors duration-300 hover:text-[#133957]"
            onClick={(e) => onScroll(e, '#kebijakan')}
          >
            KEBIJAKAN PRIVASI
          </a>
          <a
            href="#syarat"
            className="no-underline text-[13px] font-semibold text-[#4682A9] tracking-[0.5px] transition-colors duration-300 hover:text-[#133957]"
            onClick={(e) => onScroll(e, '#syarat')}
          >
            SYARAT DAN KETENTUAN
          </a>
        </div>

        {/* Kanan: Hak Cipta */}
        <div className="footer-kanan text-right" id="footer-kanan">
          <p className="text-xs font-medium text-[#4682A9] tracking-[0.3px]">
            © 2026 MAGER (MONITORING ATLET &amp; GERAK EFEKTIF RUTIN)
          </p>
        </div>
      </div>
    </footer>
  );
}
