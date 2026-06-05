import { useLandingPage } from '../hooks/useLandingPage';
import Navigasi from '../layout/components/Landingpage/Navigasi';
import { HeroSection, Footer } from '../layout/components/Landingpage/HeroSection';
import KeunggulanTaktis from '../layout/components/Landingpage/KeunggulanTaktis';
import PerformaMaksimal from '../layout/components/Landingpage/PerformaMaksimal';
import SectionPremium from '../layout/components/Landingpage/SectionPremium';

function LandingPageLayout() {
  const { navigasiRef, handleSmoothScroll } = useLandingPage();

  return (
    <>
      {/* Pembungkus utama dengan padding-top untuk header fixed */}
      <div className="relative w-full pt-[70px]">
        <Navigasi navigasiRef={navigasiRef} onScroll={handleSmoothScroll} />
        <HeroSection onScroll={handleSmoothScroll} />
      </div>

      {/* Banner kepercayaan */}
      <div
        className="animasi-saat-scroll w-full py-5 px-10 text-center border-b border-[#E2E8F0] bg-white"
        id="banner-kepercayaan"
      >
        <p className="text-sm font-medium text-[#4682A9] tracking-[0.3px]">
          Dipercaya oleh pelatih dan atlet di berbagai klub &amp; institusi
        </p>
      </div>

      <KeunggulanTaktis />
      <PerformaMaksimal />
      <SectionPremium onScroll={handleSmoothScroll} />
      <Footer onScroll={handleSmoothScroll} />
    </>
  );
}

export default LandingPageLayout;