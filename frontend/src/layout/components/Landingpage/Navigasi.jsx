import { useState } from "react";
import mager from "../../../assets/mager.svg";
import { Link } from "react-router-dom";

function Navigasi({ navigasiRef, onScroll }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (e, target) => {
    setMenuOpen(false);
    onScroll(e, target);
  };

  return (
    <header
      className="navigasi-utama animasi-dari-atas w-full h-[70px] flex items-center justify-between px-4 sm:px-6 lg:px-10 fixed top-0 left-0 z-[1000] bg-white/90 backdrop-blur-sm transition-all duration-300"
      id="navigasi-utama"
      ref={navigasiRef}
    >
      <nav className="w-full max-w-[1306px] mx-auto h-full flex items-center justify-between">
        <a
          href="#navigasi-utama"
          className="flex items-center gap-2 no-underline shrink-0"
          id="logo-mager"
          onClick={(e) => handleLinkClick(e, "#navigasi-utama")}
        >
          <img src={mager} alt="mager" className="h-8 sm:h-10 w-auto" />
        </a>

        <ul className="menu-navigasi hidden lg:flex items-center gap-8 list-none" id="menu-navigasi">
          <li>
            <a
              href="#kursus"
              className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] transition-all duration-300 relative hover:text-[#E8601C]"
              onClick={(e) => onScroll(e, "#kursus")}
            >
              KURSUS
            </a>
          </li>
          <li>
            <a
              href="#keunggulan-baris-atas"
              className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] transition-all duration-300 relative hover:text-[#E8601C]"
              onClick={(e) => onScroll(e, "#keunggulan-baris-atas")}
            >
              KALENDER
            </a>
          </li>
          <li>
            <a
              href="#section-premium-mager"
              className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] transition-all duration-300 relative hover:text-[#E8601C]"
              onClick={(e) => onScroll(e, "#section-premium-mager")}
            >
              PREMIUM
            </a>
          </li>
        </ul>

        <div className="hidden lg:flex items-center gap-3" id="grup-tombol-header">
          <Link
            to="/login"
            className="tombol-masuk w-[140px] h-9 bg-[#1B3A5C] text-white border-2 border-[#1B3A5C] rounded-md font-semibold text-[13px] tracking-[0.8px] cursor-pointer transition-all duration-300 flex items-center justify-center no-underline hover:bg-transparent hover:text-[#1B3A5C] hover:-translate-y-px"
            id="tombol-masuk"
          >
            MASUK
          </Link>

          <Link
            to="/user/dashboard"
            className="tombol-dashboard w-[140px] h-9 bg-transparent text-[#1B3A5C] border-2 border-[#1B3A5C] rounded-md font-semibold text-[13px] tracking-[0.8px] cursor-pointer transition-all duration-300 flex items-center justify-center no-underline hover:bg-[#1B3A5C] hover:text-white hover:-translate-y-px"
            id="tombol-dashboard"
          >
            KE DASHBOARD
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 shrink-0"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Buka menu"
        >
          <span className={`block w-6 h-0.5 bg-[#1B3A5C] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1B3A5C] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1B3A5C] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-t border-[#E2E8F0] shadow-lg flex flex-col items-stretch px-4 py-4 gap-4"
          id="menu-mobile-panel"
        >
          <a
            href="#kursus"
            className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] py-2"
            onClick={(e) => handleLinkClick(e, "#kursus")}
          >
            KURSUS
          </a>
          <a
            href="#keunggulan-baris-atas"
            className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] py-2"
            onClick={(e) => handleLinkClick(e, "#keunggulan-baris-atas")}
          >
            KALENDER
          </a>
          <a
            href="#section-premium-mager"
            className="no-underline text-[#1B3A5C] font-medium text-sm tracking-[0.5px] py-2"
            onClick={(e) => handleLinkClick(e, "#section-premium-mager")}
          >
            PREMIUM
          </a>

          <div className="flex flex-col gap-3 pt-2 border-t border-[#E2E8F0]">
            <Link
              to="/login"
              className="tombol-masuk w-full h-10 bg-[#1B3A5C] text-white border-2 border-[#1B3A5C] rounded-md font-semibold text-[13px] tracking-[0.8px] flex items-center justify-center no-underline"
            >
              MASUK
            </Link>
            <Link
              to="/user/dashboard"
              className="tombol-dashboard w-full h-10 bg-transparent text-[#1B3A5C] border-2 border-[#1B3A5C] rounded-md font-semibold text-[13px] tracking-[0.8px] flex items-center justify-center no-underline"
            >
              KE DASHBOARD
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigasi;