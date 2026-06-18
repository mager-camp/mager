import { useNavigate } from "react-router-dom";
import {
  usePelatihDashboard,
  usePelatihJadwal,
} from "./hooks/usePelatihDashboard";

export default function Index() {
  const navigate = useNavigate();
  const { data: dashboard, isLoading: loadingDashboard } = usePelatihDashboard();
  const { data: jadwal = [], isLoading: loadingJadwal } = usePelatihJadwal();

  const formatDate = (value) =>
    new Date(value).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTime = (value) =>
    new Date(value).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
<div className="font-lexend text-[14px] text-utama bg-latarMager h-screen flex flex-col overflow-hidden m-0">
  {/* Topbar / Bagian Atas */}
  <header className="navbar flex items-center justify-between py-[12px] px-[28px] bg-[#E9F1F8] border-b-2 border-menengah sticky top-0 z-20 gap-[16px]">
    <div className="navbar-logo flex items-center shrink-0 w-[180px]">
      <img src="image/logo.png" alt="Mager Logo" className="h-[40px] w-auto object-contain" />
    </div>
    <div className="navbar-pencarian flex items-center bg-white border border-sekunder rounded-[24px] py-[8px] px-[16px] gap-[8px] flex-1 max-w-[400px]">
      <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px] shrink-0">
        <circle cx="11" cy="11" r="7" stroke="#487097" stroke-width="1.8" />
        <path d="M20 20l-3.5-3.5" stroke="#487097" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      <input type="text" id="search-input" placeholder="Cari..." className="border-none bg-transparent outline-none font-lexend text-[13px] text-utama w-full placeholder:text-[#9ca3af]" />
    </div>
    <div className="navbar-aksi flex items-center gap-[22px]">
      <button className="btn-ikon w-[36px] h-[36px] rounded-full flex items-center justify-center text-utama transition-colors duration-200 border-none bg-transparent cursor-pointer hover:bg-[#f0f5fb]" aria-label="Notifikasi">
        <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button className="btn-ikon w-[36px] h-[36px] rounded-full flex items-center justify-center text-utama transition-colors duration-200 border-none bg-transparent cursor-pointer hover:bg-[#f0f5fb]" aria-label="Bantuan">
        <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          <circle cx="12" cy="17" r="0.8" fill="currentColor" />
        </svg>
      </button>
      <button className="btn-ikon w-[36px] h-[36px] rounded-full flex items-center justify-center text-utama transition-colors duration-200 border-none bg-transparent cursor-pointer hover:bg-[#f0f5fb]" aria-label="Profil">
        <img src="image/icon/profile.svg" alt="Profil" className="w-[20px] h-[20px]" />
      </button>
    </div>
  </header>

  <div className="container-utama flex flex-1 overflow-hidden min-h-0">
    {/*LAYOUT*/}
    <aside className="sidebar w-[288px] min-w-[210px] bg-white flex flex-col justify-between pb-[24px] border-r border-batasMager h-full overflow-y-auto shrink-0">
      <div className="sidebar-atas flex flex-col">
        <div className="sidebar-profil py-[24px] px-[28px] flex flex-col items-start border-b border-batasMager mb-[12px]">
          <h2 className="font-lexend text-[11px] font-bold text-menengah tracking-[0.08em] uppercase m-0 mb-[4px]">PORTAL ATLET</h2>
          <span className="font-lexend text-[10px] font-semibold text-aksen uppercase tracking-[0.06em]">MARTIN E. PARK</span>
        </div>
        <nav className="sidebar-nav flex flex-col gap-[6px] px-[12px]">
          <a href="index.html" className="item-nav active flex items-center gap-[10px] py-[8px] px-[12px] rounded-[8px] text-[13px] transition-colors duration-200 no-underline font-semibold text-menengah bg-[#EDF1F5] border-r-[6px] border-menengah hover:bg-[#f0f5fb]">
            <img src="image/icon/dashboard.svg" alt="Dasbor" className="w-[18px] h-[18px] shrink-0 object-contain" /> Dasbor
          </a>
          <a href="manajemen_jadwal.html" className="item-nav flex items-center gap-[10px] py-[8px] px-[12px] rounded-[8px] text-[13px] transition-colors duration-200 no-underline text-utama font-normal hover:bg-[#f0f5fb]">
            <img src="image/icon/manjad.svg" alt="Manajemen Jadwal" className="w-[18px] h-[18px] shrink-0 object-contain" /> Manajemen Jadwal
          </a>
          <a href="manajemen_kursus.html" className="item-nav flex items-center gap-[10px] py-[8px] px-[12px] rounded-[8px] text-[13px] transition-colors duration-200 no-underline text-utama font-normal hover:bg-[#f0f5fb]">
            <img src="image/icon/manajemenkursus.svg" alt="Manajemen Kursus" className="w-[18px] h-[18px] shrink-0 object-contain" /> Manajemen Kursus
          </a>
          <a href="daftar_atlit.html" className="item-nav flex items-center gap-[10px] py-[8px] px-[12px] rounded-[8px] text-[13px] transition-colors duration-200 no-underline text-utama font-normal hover:bg-[#f0f5fb]">
            <img src="image/icon/daftaratlit.svg" alt="Daftar Atlit" className="w-[18px] h-[18px] shrink-0 object-contain" /> Daftar Atlit
          </a>
          <a href="profile.html" className="item-nav flex items-center gap-[10px] py-[8px] px-[12px] rounded-[8px] text-[13px] transition-colors duration-200 no-underline text-utama font-normal hover:bg-[#f0f5fb]">
            <img src="image/icon/setting.svg" alt="Pengaturan" className="w-[18px] h-[18px] shrink-0 object-contain" /> Pengaturan
          </a>
        </nav>
      </div>
      <div className="sidebar-bawah flex flex-col px-[12px] gap-[2px] border-t border-batasMager pt-[12px] mt-[10px]">
        <button className="btn-sidebar-bawah flex items-center gap-[10px] py-[8px] px-[12px] rounded-[8px] text-[13px] transition-colors duration-200 text-utama font-normal border-none bg-transparent cursor-pointer text-left hover:bg-[#f0f5fb]">
          <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0 text-menengah"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /><circle cx="12" cy="17" r="0.8" fill="currentColor" /></svg> Dukungan
        </button>
        <button className="btn-sidebar-bawah flex items-center gap-[10px] py-[8px] px-[12px] rounded-[8px] text-[13px] transition-colors duration-200 text-utama font-normal border-none bg-transparent cursor-pointer text-left hover:bg-[#f0f5fb]">
          <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0 text-menengah"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /><path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg> Keluar
        </button>
      </div>
    </aside>

    {/* ADD KURSUS */}
    <main className="area-konten flex-1 overflow-y-auto bg-latarMager relative h-full">
      <div className="container-konten pt-[32px] px-[40px] pb-[64px] max-w-[1200px] w-full mx-auto flex flex-col gap-[32px]">
        
        <header className="content-header flex items-center justify-between mb-[16px]">
          <h1 className="content-title text-[26px] font-bold text-utama tracking-[-0.01em] m-0">Haloo, Pelatih!</h1>
          <div className="aksi-header flex items-center gap-[12px]">
            <button className="btn-utama py-[9px] px-[16px] bg-[#4682A9] text-white border-none rounded-[8px] text-[18px] font-semibold tracking-[0.02em] shadow-[0_2px_6px_#4682a940] transition-all duration-200 flex items-center gap-[6px] cursor-pointer no-underline hover:-translate-y-[1px] hover:shadow-[0_4px_10px_#4682a959]" onClick={() => navigate('/pelatih/kursus/tambah')}>
              Tambah Kursus <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" /><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
            </button>
            <button className="btn-utama py-[9px] px-[16px] bg-[#4682A9] text-white border-none rounded-[8px] text-[18px] font-semibold tracking-[0.02em] shadow-[0_2px_6px_#4682a940] transition-all duration-200 flex items-center gap-[6px] cursor-pointer no-underline hover:-translate-y-[1px] hover:shadow-[0_4px_10px_#4682a959]" onClick={() => navigate('/pelatih/jadwal')}>
              Tambah Jadwal <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" /><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
            </button>
          </div>
        </header>

        {/* STATISTIK */}
        <section className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          <div className="card-statistik bg-white p-[24px] rounded-[12px] border border-batasMager shadow-[0_4px_6px_#0003] flex flex-col items-center justify-center relative min-h-[120px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_12px_#0003]">
            <div className="stat-icon bg-blue absolute top-0 right-0 p-[8px] rounded-bl-[12px] rounded-tr-[12px] flex items-center justify-center bg-[#E9F1F8]">
              <img src="image/icon/daftaratlit.svg" alt="Ikon Atlet" className="w-[20px] h-[20px]" style="opacity:0.7" />
            </div>
            <h3 className="text-[13px] font-semibold text-menengah mb-[6px] mt-0">Total Atlet</h3>
            <span className="stat-value text-[32px] font-bold text-utama leading-none">{loadingDashboard ? "..." : dashboard?.totalAtlet ?? 0}</span>
          </div>

          <div className="card-statistik bg-white p-[24px] rounded-[12px] border border-batasMager shadow-[0_4px_6px_#0003] flex flex-col items-center justify-center relative min-h-[120px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_12px_#0003]">
            <div className="stat-icon bg-green absolute top-0 right-0 p-[8px] rounded-bl-[12px] rounded-tr-[12px] flex items-center justify-center bg-[#E8F6E8]">
              <img src="image/icon/suksesicon.svg" alt="Ikon Kursus" className="w-[20px] h-[20px]" />
            </div>
            <h3 className="text-[13px] font-semibold text-menengah mb-[6px] mt-0">Total Kursus</h3>
            <span className="stat-value green text-[32px] font-bold text-hijauMager leading-none">{loadingDashboard ? "..." : dashboard?.totalKursus ?? 0}</span>
          </div>

          <div className="card-statistik bg-white p-[24px] rounded-[12px] border border-batasMager shadow-[0_4px_6px_#0003] flex flex-col items-center justify-center relative min-h-[120px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_12px_#0003]">
            <div className="stat-icon bg-orange absolute top-0 right-0 p-[8px] rounded-bl-[12px] rounded-tr-[12px] flex items-center justify-center bg-[#FDF0E8]">
              <img src="image/icon/jamicon.svg" alt="Ikon Jadwal" className="w-[20px] h-[20px]" />
            </div>
            <h3 className="text-[13px] font-semibold text-menengah mb-[6px] mt-0">Total Jadwal</h3>
            <div className="stat-value-group flex items-baseline gap-[4px]">
              <span className="stat-value orange text-[32px] font-bold text-oranyeMager leading-none">{loadingDashboard ? "..." : dashboard?.totalJadwal ?? 0}</span>
              <span className="text-[12px] font-medium text-aksen">/ hari</span>
            </div>
          </div>
        </section>

        {/*TABEL JADWAL ATLIT*/}
        <section className="table-section bg-white rounded-[14px] shadow-[0_4px_6px_#0003] overflow-hidden flex flex-col">
          <div className="table-header bg-[#749BC2] py-[18px] px-[24px]">
            <h2 className="text-[15px] font-semibold text-white tracking-[0.02em] m-0">Jadwal Terbaru Atlit</h2>
          </div>
          <div className="table-responsive overflow-x-auto">
            <table className="data-table w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="w-25 w-[25%] py-[15px] px-[20px] text-[11px] font-bold text-utama uppercase tracking-[0.06em] bg-white border-b-2 border-[#f0f4f8]">Pengguna</th>
                  <th className="w-18 w-[18%] py-[15px] px-[20px] text-[11px] font-bold text-utama uppercase tracking-[0.06em] bg-white border-b-2 border-[#f0f4f8]">Tanggal</th>
                  <th className="w-15 w-[15%] py-[15px] px-[20px] text-[11px] font-bold text-utama uppercase tracking-[0.06em] bg-white border-b-2 border-[#f0f4f8]">Waktu</th>
                  <th className="w-22 w-[22%] py-[15px] px-[20px] text-[11px] font-bold text-utama uppercase tracking-[0.06em] bg-white border-b-2 border-[#f0f4f8]">Jenis Latihan</th>
                  <th className="w-20 w-[20%] py-[15px] px-[20px] text-[11px] font-bold text-utama uppercase tracking-[0.06em] bg-white border-b-2 border-[#f0f4f8]">Intensitas Program</th>
                </tr>
              </thead>
              <tbody>
                {loadingJadwal ? (
                  <tr>
                    <td colSpan="5" className="py-[18px] px-[20px] text-center text-[13px] text-aksen">Memuat jadwal...</td>
                  </tr>
                ) : jadwal.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-[18px] px-[20px] text-center text-[13px] text-aksen">Belum ada jadwal</td>
                  </tr>
                ) : (
                  jadwal.slice(0, 5).map((item) => (
                    <tr key={item.id} className="border-b border-[#f0f4f8] transition-colors duration-200 hover:bg-[#fafcff]">
                      <td className="py-[14px] px-[20px] text-[13px] text-utama whitespace-nowrap">
                        <div className="user-cell flex items-center gap-[10px]">
                          <img src={item.user?.profilePicture || "image/icon/profile.svg"} alt="Avatar" className="w-[34px] h-[34px] shrink-0 object-contain rounded-full" />
                          <span>{item.user?.fullName || "Atlet"}</span>
                        </div>
                      </td>
                      <td className="py-[14px] px-[20px] text-[13px] text-utama whitespace-nowrap">{formatDate(item.scheduledAt)}</td>
                      <td className="py-[14px] px-[20px] text-[13px] text-utama whitespace-nowrap">{formatTime(item.scheduledAt)}</td>
                      <td className="py-[14px] px-[20px] text-[13px] text-utama whitespace-nowrap">{item.activity?.name || "Latihan"}</td>
                      <td className="py-[14px] px-[20px] text-[13px] text-utama whitespace-nowrap">
                        <span className="badge badge-green inline-block w-[80px] text-center py-[4px] px-0 rounded-[20px] text-[11px] font-bold tracking-[0.04em] bg-[#6BB664] text-white">{item.intensity || "NORMAL"}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="table-footer py-[12px] px-[20px] border-t border-[#f0f4f8] flex justify-end">
            <button onClick={() => navigate('/pelatih/atlet')} className="link-all text-[11px] font-bold text-[#4682A9] no-underline transition-colors duration-200 flex items-center gap-[4px] hover:text-utama">Lihat semua <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px] ml-[4px]"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
          </div>
        </section>

        {/*DAFTAR KURSUS*/}
        <section className="course-section flex flex-col gap-[16px]">
          <h2 className="section-title text-[22px] font-bold text-utama tracking-[-0.01em] m-0">Daftar Kursus</h2>
          <div className="course-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            
            <div className="course-card bg-[#4682A9] rounded-[14px] overflow-hidden shadow-[0_2px_8px_#1339572e] flex flex-col transition-all duration-[180ms] hover:-translate-y-[3px] hover:shadow-[0_6px_24px_#13395738]">
              <div className="course-image-wrapper relative h-[220px] overflow-hidden">
                <img src="image/modul1.png" alt="Kursus" className="w-full h-full object-cover object-top" />
                <div className="course-image-overlay absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-[#4682A9] via-[#4682a9cc] to-transparent"></div>
                <span className="course-module-count absolute top-[12px] right-[12px] bg-utama text-white text-[11px] font-semibold py-[4px] px-[12px] rounded-[6px] flex items-center gap-[4px] z-[2]">
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><rect x="1" y="2" width="14" height="12" rx="2" stroke="white" stroke-width="1.2" /><path d="M5 6h6M5 9h4" stroke="white" stroke-width="1.2" stroke-linecap="round" /></svg> 4 Modul
                </span>
                <div className="course-tags absolute bottom-[16px] left-[16px] z-10 flex gap-[8px]">
                  <span className="tag-dark text-[10px] font-bold py-[4px] px-[8px] bg-[#1E293B] text-[#BEC6E0] rounded-[4px]">LARI</span>
                  <span className="tag-light text-[10px] font-bold py-[4px] px-[8px] bg-white text-[#FF7726] rounded-[4px]">PREMIUM</span>
                </div>
              </div>
              <div className="course-content py-[16px] px-[20px] flex-1 bg-[#4682A9]">
                <h3 className="text-[15px] font-bold text-white mb-[8px] leading-[1.35] m-0">Biomekanika Lari Cepat</h3>
                <p className="text-[12px] font-light text-[#ffffffd9] m-0 leading-[1.55]">Optimalkan pola pukulan Anda dan kurangi waktu kontak dengan permukaan untuk...</p>
              </div>
              <div className="course-actions flex gap-[30px] py-[16px] px-[20px] bg-[#4682A9]">
                <button className="btn-course-edit flex-1 py-[10px] px-0 bg-oranyeMager text-white border-none rounded-[6px] text-[11px] font-bold tracking-[0.06em] transition-colors duration-200 cursor-pointer hover:bg-[#d4784f]">UBAH</button>
                <button className="btn-course-delete flex-1 py-[10px] px-0 bg-white text-oranyeMager border-none rounded-[6px] text-[11px] font-bold tracking-[0.06em] transition-colors duration-200 cursor-pointer hover:bg-[#f0ebe8]">HAPUS</button>
              </div>
            </div>

            <div className="course-card bg-[#4682A9] rounded-[14px] overflow-hidden shadow-[0_2px_8px_#1339572e] flex flex-col transition-all duration-[180ms] hover:-translate-y-[3px] hover:shadow-[0_6px_24px_#13395738]">
              <div className="course-image-wrapper relative h-[220px] overflow-hidden">
                <img src="image/modul2.png" alt="Kursus" className="w-full h-full object-cover object-top" />
                <div className="course-image-overlay absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-[#4682A9] via-[#4682a9cc] to-transparent"></div>
                <span className="course-module-count absolute top-[12px] right-[12px] bg-utama text-white text-[11px] font-semibold py-[4px] px-[12px] rounded-[6px] flex items-center gap-[4px] z-[2]">
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><rect x="1" y="2" width="14" height="12" rx="2" stroke="white" stroke-width="1.2" /><path d="M5 6h6M5 9h4" stroke="white" stroke-width="1.2" stroke-linecap="round" /></svg> 4 Modul
                </span>
                <div className="course-tags absolute bottom-[16px] left-[16px] z-10 flex gap-[8px]">
                  <span className="tag-dark text-[10px] font-bold py-[4px] px-[8px] bg-[#1E293B] text-[#BEC6E0] rounded-[4px]">RENANG</span>
                  <span className="tag-light text-[10px] font-bold py-[4px] px-[8px] bg-white text-[#FF7726] rounded-[4px]">GRATIS</span>
                </div>
              </div>
              <div className="course-content py-[16px] px-[20px] flex-1 bg-[#4682A9]">
                <h3 className="text-[15px] font-bold text-white mb-[8px] leading-[1.35] m-0">Efisiensi Hidrodinamik</h3>
                <p className="text-[12px] font-light text-[#ffffffd9] m-0 leading-[1.55]">Menguasai tendangan lumba-lumba di bawah air dan meminimalkan hambatan selama...</p>
              </div>
              <div className="course-actions flex gap-[30px] py-[16px] px-[20px] bg-[#4682A9]">
                <button className="btn-course-edit flex-1 py-[10px] px-0 bg-oranyeMager text-white border-none rounded-[6px] text-[11px] font-bold tracking-[0.06em] transition-colors duration-200 cursor-pointer hover:bg-[#d4784f]">UBAH</button>
                <button className="btn-course-delete flex-1 py-[10px] px-0 bg-white text-oranyeMager border-none rounded-[6px] text-[11px] font-bold tracking-[0.06em] transition-colors duration-200 cursor-pointer hover:bg-[#f0ebe8]">HAPUS</button>
              </div>
            </div>

            <div className="course-card bg-[#4682A9] rounded-[14px] overflow-hidden shadow-[0_2px_8px_#1339572e] flex flex-col transition-all duration-[180ms] hover:-translate-y-[3px] hover:shadow-[0_6px_24px_#13395738]">
              <div className="course-image-wrapper relative h-[220px] overflow-hidden">
                <img src="image/modul3.png" alt="Kursus" className="w-full h-full object-cover object-top" />
                <div className="course-image-overlay absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-[#4682A9] via-[#4682a9cc] to-transparent"></div>
                <span className="course-module-count absolute top-[12px] right-[12px] bg-utama text-white text-[11px] font-semibold py-[4px] px-[12px] rounded-[6px] flex items-center gap-[4px] z-[2]">
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><rect x="1" y="2" width="14" height="12" rx="2" stroke="white" stroke-width="1.2" /><path d="M5 6h6M5 9h4" stroke="white" stroke-width="1.2" stroke-linecap="round" /></svg> 4 Modul
                </span>
                <div className="course-tags absolute bottom-[16px] left-[16px] z-10 flex gap-[8px]">
                  <span className="tag-dark text-[10px] font-bold py-[4px] px-[8px] bg-[#1E293B] text-[#BEC6E0] rounded-[4px]">RENANG</span>
                  <span className="tag-light text-[10px] font-bold py-[4px] px-[8px] bg-white text-[#FF7726] rounded-[4px]">GRATIS</span>
                </div>
              </div>
              <div className="course-content py-[16px] px-[20px] flex-1 bg-[#4682A9]">
                <h3 className="text-[15px] font-bold text-white mb-[8px] leading-[1.35] m-0">Dasar-Dasar Renang</h3>
                <p className="text-[12px] font-light text-[#ffffffd9] m-0 leading-[1.55]">Menguasai pengetahuan dan praktek fundamental renang...</p>
              </div>
              <div className="course-actions flex gap-[30px] py-[16px] px-[20px] bg-[#4682A9]">
                <button className="btn-course-edit flex-1 py-[10px] px-0 bg-oranyeMager text-white border-none rounded-[6px] text-[11px] font-bold tracking-[0.06em] transition-colors duration-200 cursor-pointer hover:bg-[#d4784f]">UBAH</button>
                <button className="btn-course-delete flex-1 py-[10px] px-0 bg-white text-oranyeMager border-none rounded-[6px] text-[11px] font-bold tracking-[0.06em] transition-colors duration-200 cursor-pointer hover:bg-[#f0ebe8]">HAPUS</button>
              </div>
            </div>

          </div>
        </section>

      </div>
      
      {/*FOOTER*/}
      <footer className="footer-situs bg-[#E9F1F8] py-[16px] px-0 mt-auto">
        <p className="text-center text-menengah text-[11px] font-medium m-0">Mager &copy; 2025. Hak Cipta Dilindungi</p>
      </footer>
    </main>
  </div>
</div>
  );
}