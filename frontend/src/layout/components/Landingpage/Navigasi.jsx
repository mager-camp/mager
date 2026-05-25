import mager from '../../../assets/mager.svg';

function Navigasi({ navigasiRef, onScroll }) {
  return (
    <header
      className="navigasi-utama animasi-dari-atas w-full h-[70px] flex items-center justify-between px-10 fixed top-0 left-0 z-[1000] bg-transparent transition-all duration-300"
      id="navigasi-utama"
      ref={navigasiRef}
    >
      <nav className="w-full h-full flex items-center justify-between">

        <a
          href="#navigasi-utama"
          className="flex items-center gap-2 no-underline"
          id="logo-mager"
          onClick={(e) => onScroll(e, '#navigasi-utama')}
        >
          <img
            src={mager}
            alt="mager"
            className="h-10 w-auto"
          />
        </a>

        <ul className="menu-navigasi flex items-center gap-8 list-none" id="menu-navigasi">
          <li>
            <a
              href="#kursus"
              className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] transition-all duration-300 relative hover:text-[#E8601C]"
              onClick={(e) => onScroll(e, '#kursus')}
            >
              KURSUS
            </a>
          </li>
          <li>
            <a
              href="#keunggulan-baris-atas"
              className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] transition-all duration-300 relative hover:text-[#E8601C]"
              onClick={(e) => onScroll(e, '#keunggulan-baris-atas')}
            >
              KALENDER
            </a>
          </li>
          <li>
            <a
              href="#section-premium-mager"
              className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] transition-all duration-300 relative hover:text-[#E8601C]"
              onClick={(e) => onScroll(e, '#section-premium-mager')}
            >
              PREMIUM
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3" id="grup-tombol-header">
          <a
            href="#masuk"
            className="tombol-masuk w-[140px] h-9 bg-[#1B3A5C] text-white border-2 border-[#1B3A5C] rounded-md font-semibold text-[13px] tracking-[0.8px] cursor-pointer transition-all duration-300 flex items-center justify-center no-underline hover:bg-transparent hover:text-[#1B3A5C] hover:-translate-y-px"
            id="tombol-masuk"
            onClick={(e) => onScroll(e, '#masuk')}
          >
            MASUK
          </a>
          <a
            href="#dashboard"
            className="tombol-dashboard w-[140px] h-9 bg-transparent text-[#1B3A5C] border-2 border-[#1B3A5C] rounded-md font-semibold text-[13px] tracking-[0.8px] cursor-pointer transition-all duration-300 flex items-center justify-center no-underline hover:bg-[#1B3A5C] hover:text-white hover:-translate-y-px"
            id="tombol-dashboard"
            onClick={(e) => onScroll(e, '#dashboard')}
          >
            KE DASHBOARD
          </a>
        </div>

      </nav>
    </header>
  );
}

export default Navigasi;
