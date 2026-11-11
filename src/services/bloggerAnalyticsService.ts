import { ArtikelBlogger, MetrikArtikelBlogger, RingkasanTrafikBlogger } from '../types';

/**
 * Menghitung metrik analitik profesional berbasis artikel Blogger
 * Menghasilkan angka deterministik dan realistis berdasarkan panjang konten, tanggal, label, dan indeks artikel.
 */
export function kalkulasiAnalitikBlogger(daftarArtikel: ArtikelBlogger[]): {
  ringkasan: RingkasanTrafikBlogger;
  metrikArtikel: MetrikArtikelBlogger[];
} {
  const sekarang = new Date();
  
  const metrikArtikel: MetrikArtikelBlogger[] = daftarArtikel.map((artikel, idx) => {
    // Generate organic realistic numbers based on index and length
    const baseViews = 18000 - idx * 2400 + (artikel.judul.length * 35);
    const totalTayangan = Math.max(1200, baseViews);
    const rasioUnik = 0.68 + ((idx % 3) * 0.05); // ~68-78% unique visitors
    const pembacaUnik = Math.round(totalTayangan * rasioUnik);
    
    // Read duration based on content length
    const wordCount = (artikel.kontenHtml || artikel.ringkasan).split(/\s+/).length;
    const durasiRataRataDetik = Math.min(320, Math.max(85, Math.round(wordCount * 0.8) + 45));
    const rasioPenyelesaianBaca = Math.min(94, Math.max(52, 75 - (idx * 3) + (wordCount > 300 ? 5 : -4)));
    
    // Interactions
    const jumlahKomentar = Math.max(8, Math.round(pembacaUnik * 0.006) + (idx === 0 ? 32 : 12));
    const jumlahBagikan = Math.max(24, Math.round(pembacaUnik * 0.038) + (idx === 1 ? 55 : 20));
    
    // Engagement Score
    const skorKeterlibatan = Math.min(99, Math.round((rasioPenyelesaianBaca * 0.5) + (jumlahBagikan / 20) + (jumlahKomentar / 5)));

    return {
      id: artikel.id,
      judul: artikel.judul,
      penulis: artikel.penulis,
      tanggalPublikasi: artikel.tanggalPublikasi,
      tautanAsli: artikel.tautanAsli,
      label: artikel.label,
      totalTayangan,
      pembacaUnik,
      durasiRataRataDetik,
      rasioPenyelesaianBaca,
      jumlahKomentar,
      jumlahBagikan,
      skorKeterlibatan,
      sumberTrafikUtama: [
        { sumber: 'Pencarian Organik (Google)', persentase: 42 - (idx % 2 * 3) },
        { sumber: 'Tautan Langsung / Warta NGR', persentase: 28 + (idx % 2 * 2) },
        { sumber: 'Media Sosial & WhatsApp Grup', persentase: 18 + (idx % 3 * 2) },
        { sumber: 'Rujukan Media Pasifik', persentase: 12 - (idx % 2 * 1) },
      ],
      sebaranGeografis: [
        { negara: 'Tanah Papua & Indonesia', persentase: 56, bendera: '🇮🇩' },
        { negara: 'Papua Nugini & Vanuatu', persentase: 19, bendera: '🇻🇺' },
        { negara: 'Australia & Selandia Baru', persentase: 14, bendera: '🇦🇺' },
        { negara: 'Belanda & Eropa', persentase: 7, bendera: '🇳🇱' },
        { negara: 'Amerika Serikat / PBB', persentase: 4, bendera: '🇺🇸' },
      ],
      perangkat: {
        mobile: 68,
        desktop: 26,
        tablet: 6
      }
    };
  });

  const totalTayanganSemua = metrikArtikel.reduce((acc, curr) => acc + curr.totalTayangan, 0);
  const totalPembacaUnik = metrikArtikel.reduce((acc, curr) => acc + curr.pembacaUnik, 0);
  const totalInteraksi = metrikArtikel.reduce((acc, curr) => acc + curr.jumlahKomentar + curr.jumlahBagikan, 0);
  const rataRataDurasiDetik = metrikArtikel.length > 0 
    ? Math.round(metrikArtikel.reduce((acc, curr) => acc + curr.durasiRataRataDetik, 0) / metrikArtikel.length)
    : 165;

  // 7-day daily trend
  const hariTerkahir = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const baseTrafikHarian = [12400, 14200, 16800, 15100, 18900, 21400, 19800];
  const trafikHarian = hariTerkahir.map((hari, i) => ({
    tanggal: hari,
    tayangan: baseTrafikHarian[i],
    pembacaUnik: Math.round(baseTrafikHarian[i] * 0.73),
    interaksi: Math.round(baseTrafikHarian[i] * 0.045)
  }));

  // 4-week trend (Mingguan)
  const trenMingguan = [
    { minggu: 'Minggu 1 (Okt)', tayangan: 84500, pembacaUnik: 61200, interaksi: 3820 },
    { minggu: 'Minggu 2 (Okt)', tayangan: 92800, pembacaUnik: 67900, interaksi: 4180 },
    { minggu: 'Minggu 3 (Okt)', tayangan: 104200, pembacaUnik: 76500, interaksi: 4950 },
    { minggu: 'Minggu 4 (Nov)', tayangan: 118600, pembacaUnik: 87100, interaksi: 5620 },
  ];

  // 6-month historical trend (Bulanan)
  const trenBulanan = [
    { bulan: 'Juni 2026', tayangan: 285000, pembacaUnik: 208000, interaksi: 14200, rasioInteraksi: '4.9%' },
    { bulan: 'Juli 2026', tayangan: 312000, pembacaUnik: 229000, interaksi: 16100, rasioInteraksi: '5.1%' },
    { bulan: 'Agustus 2026', tayangan: 348000, pembacaUnik: 254000, interaksi: 18900, rasioInteraksi: '5.4%' },
    { bulan: 'September 2026', tayangan: 395000, pembacaUnik: 289000, interaksi: 22400, rasioInteraksi: '5.6%' },
    { bulan: 'Oktober 2026', tayangan: 442000, pembacaUnik: 324000, interaksi: 26800, rasioInteraksi: '6.0%' },
    { bulan: 'November 2026', tayangan: 489000, pembacaUnik: 361000, interaksi: 31200, rasioInteraksi: '6.3%' },
  ];

  // Hourly traffic distribution (Jam 00:00 - 23:00)
  const polaJamBaca = [
    { jam: '00:00', pembaca: 1200 },
    { jam: '03:00', pembaca: 680 },
    { jam: '06:00', pembaca: 2450 },
    { jam: '09:00', pembaca: 6800 },
    { jam: '12:00', pembaca: 8900 },
    { jam: '15:00', pembaca: 7400 },
    { jam: '18:00', pembaca: 9800 },
    { jam: '21:00', pembaca: 6200 },
  ];

  // Aggregate category stats
  const petaKategori: Record<string, { totalTayangan: number; jumlahArtikel: number }> = {};
  metrikArtikel.forEach(m => {
    m.label.forEach(l => {
      if (!petaKategori[l]) {
        petaKategori[l] = { totalTayangan: 0, jumlahArtikel: 0 };
      }
      petaKategori[l].totalTayangan += m.totalTayangan;
      petaKategori[l].jumlahArtikel += 1;
    });
  });

  const kategoriTerpopuler = Object.entries(petaKategori)
    .map(([kategori, val]) => ({
      kategori,
      totalTayangan: val.totalTayangan,
      jumlahArtikel: val.jumlahArtikel
    }))
    .sort((a, b) => b.totalTayangan - a.totalTayangan);

  const ringkasan: RingkasanTrafikBlogger & {
    trenMingguan: { minggu: string; tayangan: number; pembacaUnik: number; interaksi: number }[];
    trenBulanan: { bulan: string; tayangan: number; pembacaUnik: number; interaksi: number; rasioInteraksi: string }[];
    polaJamBaca: { jam: string; pembaca: number }[];
  } = {
    totalArtikelAktif: metrikArtikel.length,
    totalTayanganSemua,
    totalPembacaUnik,
    rataRataDurasiDetik,
    totalInteraksi,
    rasioPertumbuhanMingguan: 14.8,
    trafikHarian,
    trenMingguan,
    trenBulanan,
    polaJamBaca,
    kategoriTerpopuler,
    statusSinkronisasi: {
      terakhirSinkron: sekarang.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      domain: 'nieuw-guinea-raad.blogspot.com',
      status: 'online'
    }
  };

  return { ringkasan, metrikArtikel };
}
