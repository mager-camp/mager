import ikonTanggal from '../../../assets/icon/tanggal.svg';
import ikonNotif from '../../../assets/icon/notif.svg';

function KeunggulanTaktis() {
  return (
    <section className="w-full py-[60px] px-10 bg-white" id="section-keunggulan">
      <div className="animasi-saat-scroll mb-10" id="keunggulan-header">
        <h2 className="text-4xl font-extrabold text-[#133957] mb-3 leading-[1.2]">
          Keunggulan Taktis.
        </h2>
        <p className="text-lg font-normal text-[#4682A9] leading-[1.6] max-w-[600px]">
          Alat yang dirancang khusus untuk kondisi psikologis &quot;flow&quot;. Tanpa
          basa-basi, hanya data yang padat.
        </p>
      </div>

      <div className="flex gap-6 mb-6" id="keunggulan-baris-atas">
        <div
          className="animasi-saat-scroll tunda-scroll-1 group w-full min-w-[auto] h-[300px] bg-white border border-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(19,57,87,0.08)]"
          id="kartu-manajemen"
        >
          <div className="flex justify-between items-start">
            <div className="max-w-[60%]">
              <h3 className="text-2xl font-bold text-[#133957] mb-2 leading-[1.3]">
                Manajemen Kalender
              </h3>
              <p className="text-base font-normal text-[#4682A9] leading-[1.6]">
                Peta panas latihan Anda. Lihat volume latihan secara instan
                dan lacak rotasi disiplin dengan kejernihan yang tak tertandingi.
              </p>
            </div>

            <div className="shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100" id="ikon-kalender">
              <img src={ikonTanggal} alt="Ikon kalender" width="72" height="72" />
            </div>
          </div>

          {/* Visual kalender mingguan */}
          <div className="flex gap-2 w-96 h-[66px] py-3 px-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] items-center" id="visual-kalender">
            <div className="flex-1 h-8 rounded-md transition-transform duration-200 hover:scale-y-[1.1] bg-[#E2E8F0]" />
            <div className="flex-1 h-8 rounded-md transition-transform duration-200 hover:scale-y-[1.1] bg-[#E2E8F0]" />
            <div className="flex-1 h-8 rounded-md transition-transform duration-200 hover:scale-y-[1.1] bg-[#3B82A0]" />
            <div className="flex-1 h-8 rounded-md transition-transform duration-200 hover:scale-y-[1.1] bg-[#E2E8F0]" />
            <div className="flex-1 h-8 rounded-md transition-transform duration-200 hover:scale-y-[1.1] bg-[#E2E8F0]" />
            <div className="flex-1 h-8 rounded-md transition-transform duration-200 hover:scale-y-[1.1] bg-[#E2E8F0]" />
            <div className="flex-1 h-8 rounded-md transition-transform duration-200 hover:scale-y-[1.1] bg-[#E2E8F0]" />
          </div>
        </div>

        {/* Kartu Alarm Pintar */}
        <div
          className="animasi-saat-scroll tunda-scroll-2 w-96 min-w-[384px] h-[300px] bg-[#D9E7F5] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(65,120,191,0.15)]"
          id="kartu-alarm"
        >
          <div>
            <h3 className="text-[22px] font-bold text-[#4178BF] tracking-[0.5px] mb-2">
              ALARM PINTAR
            </h3>
            <p className="text-base font-normal text-[#133957] leading-[1.6] mb-auto">
              Pemberitahuan peringatan untuk jendela pemulihan kritis dan
              waktu pemberian nutrisi.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#BAD0E9] rounded-md p-1 transition-all duration-300" id="alarm-protokol">
            <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full">
              <img src={ikonNotif} alt="Ikon notifikasi" width="22" height="22" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-[#4178BF] tracking-[0.5px]">PROTOKOL PEMULIHAN</span>
              <span className="text-sm font-normal text-[#4178BF]">Akan dimulai dalam 5 menit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kartu Periodisasi Premium */}
      <div
        className="animasi-saat-scroll w-full h-[300px] bg-white border border-[#E2E8F0] rounded-2xl p-8 flex gap-10 items-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(19,57,87,0.08)]"
        id="kartu-periodisasi"
      >
        <div className="flex-1" id="periodisasi-kiri">
          <h3 className="text-2xl font-bold text-[#133957] mb-2 leading-[1.3]">
            Periodisasi Premium
          </h3>
          <p className="text-base font-normal text-[#4682A9] leading-[1.6] mb-6">
            Pemantauan kecepatan dan manajemen beban. Sesuaikan siklus mikro
            dengan jadwal kompetisi agar performa mencapai puncaknya tepat pada saat yang tepat.
          </p>
          <ul className="list-none p-0 m-0 flex flex-col gap-3" id="daftar-fitur-centang">
            <li className="flex items-center gap-2.5 text-sm font-medium text-[#4682A9]">
              <span className="text-[#E8601C] font-bold text-base shrink-0">✓</span>
              <span>Minggu Penurunan Beban yang Dihitung Otomatis</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm font-medium text-[#4682A9]">
              <span className="text-[#E8601C] font-bold text-base shrink-0">✓</span>
              <span>Penilaian Kelelahan Akibat Kurangnya Disiplin</span>
            </li>
          </ul>
        </div>

        {/* Visual grafik tangga */}
        <div className="flex-1 flex justify-center items-end pb-2.5" id="periodisasi-kanan">
          <div className="w-full max-w-[380px] h-40 relative" id="grafik-tangga">
            <div className="absolute top-[28%] left-0 w-full h-px border-t-[1.5px] border-dashed border-[#CBD5E1] z-[2]" />
            <div className="absolute w-2.5 h-2.5 bg-[#7BAFD4] rounded-full border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.12)] top-[23%] left-[48%] z-[3]" />
            <div className="absolute bottom-0 right-0 w-3/4 h-full flex items-end">
              <div className="bg-[#D9E7F5] flex-1 rounded-none transition-colors duration-300 h-[22%]" />
              <div className="bg-[#D9E7F5] flex-1 rounded-none transition-colors duration-300 h-[35%]" />
              <div className="bg-[#C5D9EC] flex-1 rounded-none transition-colors duration-300 h-[50%]" />
              <div className="bg-[#B0CCDF] flex-1 rounded-none transition-colors duration-300 h-[65%]" />
              <div className="bg-[#9ABDD4] flex-1 rounded-none transition-colors duration-300 h-[78%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeunggulanTaktis;
