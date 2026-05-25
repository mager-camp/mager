import { useEffect, useRef, useCallback } from 'react';

export function useLandingPage() {
  const navigasiRef = useRef(null);

  const aktifkanAnimasi = useCallback(() => {
    const elemenAnimasi = document.querySelectorAll(
      '.animasi-dari-bawah, .animasi-dari-kiri, .animasi-dari-kanan'
    );
    elemenAnimasi.forEach((elemen) => {
      elemen.addEventListener('animationend', () => {
        elemen.style.opacity = '1';
      });
    });

    const pengamatScroll = new IntersectionObserver(
      (entri) => {
        entri.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add('sudah-terlihat');
            pengamatScroll.unobserve(item.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elemenScroll = document.querySelectorAll('.animasi-saat-scroll');
    elemenScroll.forEach((elemen) => {
      pengamatScroll.observe(elemen);
    });

    return () => {
      pengamatScroll.disconnect();
    };
  }, []);

  const aktifkanEfekScrollNavigasi = useCallback(() => {
    const handleScroll = () => {
      const navigasi = navigasiRef.current;
      if (!navigasi) return;

      if (window.scrollY > 50) {
        navigasi.style.backgroundColor = '#ffffff';
        navigasi.style.boxShadow = '0 2px 16px rgba(27, 58, 92, 0.10)';
      } else {
        navigasi.style.backgroundColor = 'transparent';
        navigasi.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cleanupAnimasi = aktifkanAnimasi();
    const cleanupScroll = aktifkanEfekScrollNavigasi();

    return () => {
      if (cleanupAnimasi) cleanupAnimasi();
      if (cleanupScroll) cleanupScroll();
    };
  }, [aktifkanAnimasi, aktifkanEfekScrollNavigasi]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (!targetId || targetId === '#') return;

    const elemenTujuan = document.querySelector(targetId);
    if (elemenTujuan) {
      const offsetAtas = elemenTujuan.offsetTop - 70;
      window.scrollTo({
        top: offsetAtas,
        behavior: 'smooth',
      });
    }
  };

  return { navigasiRef, handleSmoothScroll };
}
