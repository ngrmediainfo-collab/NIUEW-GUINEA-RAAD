import { InfografisItem } from '../types';

export const koleksiInfografisSejarah: InfografisItem[] = [
  {
    id: 'info-01',
    nomor: 'INF-01-KRN',
    judul: 'Kronologi Besar Sejarah Papua (1898 – Kontemporer)',
    kategori: 'kronologi',
    kategoriLabel: 'Kronologi Sejarah Papua',
    tahun: '1898–2026',
    keterangan: 'Peta jalan waktu peristiwa paling menentukan yang membentuk perjalanan politik, kedaulatan, dan dekolonisasi bangsa Papua selama satu abad.',
    poinDataHistoris: [
      { label: 'Pos Administrasi Belanda', nilai: '1898', konteks: 'Manokwari dan Fakfak' },
      { label: 'Pelantikan Parlemen NGR', nilai: '5 April 1961', konteks: '23 dari 28 anggota pribumi' },
      { label: 'Manifesto Politik Kebangsaan', nilai: '1 Desember 1961', konteks: 'Bintang Kejora dikibarkan' },
      { label: 'Perjanjian New York PBB', nilai: '15 Agustus 1962', konteks: 'Klausul plebisit Pasal XVIII' },
      { label: 'Musyawarah Pepera', nilai: '1969', konteks: '1.025 delegasi di bawah militer' }
    ],
    kronologiRingkas: [
      { waktu: '1898', kejadian: 'Belanda mendirikan pos kolonial permanen di Manokwari dan Fakfak.' },
      { waktu: '1949', kejadian: 'KMB Den Haag: Pasal 2 menetapkan status sengketa Nieuw-Guinea terpisah dari RIS.' },
      { waktu: '1961', kejadian: 'Pelantikan Nieuw Guinea Raad (5 April) & Pengibaran Bintang Kejora (1 Desember).' },
      { waktu: '1962', kejadian: 'Penandatanganan Perjanjian New York & Transisi Otoritas Sementara PBB (UNTEA).' },
      { waktu: '1969', kejadian: 'Pelaksanaan Pepera melalui musyawarah 1.025 orang & Laporan PBB A/7723.' },
      { waktu: '2000', kejadian: 'Kongres Rakyat Papua II menetapkan Presidium Dewan Papua di Jayapura.' }
    ],
    sumberVerifikasi: 'Arsip PBB New York, Nationaal Archief Den Haag, & Resolusi Sidang Umum PBB',
    referensiDokumen: 'NGR-TRT-1962-007, UN Doc A/7723, KMB Staatsblad J 570'
  },
  {
    id: 'info-02',
    nomor: 'INF-02-NGR',
    judul: 'Struktur dan Keanggotaan Nieuw Guinea Raad 1961',
    kategori: 'ngr_1961',
    kategoriLabel: 'Nieuw Guinea Raad 1961',
    tahun: '1961–1963',
    keterangan: 'Analisis kelembagaan parlemen perwakilan rakyat Papua pertama dengan mayoritas mutlak putra asli Papua.',
    poinDataHistoris: [
      { label: 'Total Kursi Parlemen', nilai: '28 Kursi', konteks: 'Lembaga legislatif representatif' },
      { label: 'Anggota Putra Asli Papua', nilai: '23 Orang (82%)', konteks: 'Mayoritas mutlak wakil rakyat' },
      { label: 'Anggota Keturunan Eropa', nilai: '5 Orang (18%)', konteks: 'Wakil minoritas' },
      { label: 'Distrik Elektoral Pemilu', nilai: '16 Distrik', konteks: 'Pemilihan langsung di perkotaan' },
      { label: 'Wakil Dewan Suku Adat', nilai: '12 Kursi', konteks: 'Musyawarah adat pedalaman' }
    ],
    kronologiRingkas: [
      { waktu: '16 April 1960', kejadian: 'Pengesahan Lembaran Negara No. 18/1960 tentang Undang-Undang Dewan Nugini.' },
      { waktu: 'Januari 1961', kejadian: 'Penyelenggaraan pemilihan umum legislatif di distrik-distrik pemilihan Papua.' },
      { waktu: '5 April 1961', kejadian: 'Upacara pelantikan agung 28 anggota di Hollandia dihadiri diplomat 5 negara.' },
      { waktu: 'Oktober 1961', kejadian: 'Sidang istimewa mengesahkan pembentukan Komite Nasional Papua & Manifesto.' }
    ],
    sumberVerifikasi: 'Handelingen van de Nieuw-Guinea Raad, Zitting 1961–1962, Hollandia',
    referensiDokumen: 'NGR-ACT-1960-003, NGR-DOC-1961-004'
  },
  {
    id: 'info-03',
    nomor: 'INF-03-DEC',
    judul: 'Anatomi Makna Atribut Nasional 1 Desember 1961',
    kategori: 'desember_1961',
    kategoriLabel: 'Peristiwa 1 Desember 1961',
    tahun: '1961',
    keterangan: 'Dokumentasi resmi penetapan Bendera Bintang Kejora, Lagu Kebangsaan Hai Tanahku Papua, dan Lambang Mambruk.',
    poinDataHistoris: [
      { label: 'Dasar Hukum Pengibaran', nilai: 'GB No. 68/1961', konteks: 'Ketetapan resmi Gubernur Platteel' },
      { label: 'Penandatangan Manifesto', nilai: '70 Tokoh', konteks: 'Pimpinan partai politik & dewan adat' },
      { label: 'Garis Merah Bendera', nilai: 'Keberanian', konteks: 'Pengorbanan darah martir tanah Papua' },
      { label: 'Tujuh Garis Biru-Putih', nilai: 'Lautan & Perdamaian', konteks: 'Kesucian niat & kepulauan Melanesia' },
      { label: 'Semboyan Adat Mambruk', nilai: 'E Mauto Nin Vie', konteks: 'Satu Orang, Satu Jiwa (One People, One Soul)' }
    ],
    kronologiRingkas: [
      { waktu: '19 Okt 1961', kejadian: 'Manifesto Politik disahkan oleh rapat 70 delegasi komite politik di Hollandia.' },
      { waktu: '18 Nov 1961', kejadian: 'Gubernur Nederlands Nieuw-Guinea mengesahkan Ordonansi No. 68 Tahun 1961.' },
      { waktu: '1 Des 1961', kejadian: 'Pengibaran resmi bendera Bintang Kejora serentak di seluruh distrik tanah Papua.' }
    ],
    sumberVerifikasi: 'Gouvernementsblad van Nederlands Nieuw-Guinea 1961 No. 68',
    referensiDokumen: 'NGR-MAN-1961-005, NGR-DEC-1961-006'
  },
  {
    id: 'info-04',
    nomor: 'INF-04-NYA',
    judul: 'Bedah Hukum Perjanjian New York 1962 & Rencana Bunker',
    kategori: 'perjanjian_new_york',
    kategoriLabel: 'Perjanjian New York 1962',
    tahun: '1962',
    keterangan: 'Analisis pasal-pasal kunci traktat bilateral Belanda-Indonesia di PBB yang menentukan nasib bangsa Papua.',
    poinDataHistoris: [
      { label: 'Tempat Penandatanganan', nilai: 'Markas PBB, New York', konteks: '15 Agustus 1962' },
      { label: 'Pihak Penandatangan', nilai: 'Belanda & Indonesia', konteks: 'Tanpa delegasi resmi rakyat Papua' },
      { label: 'Fasilitator Utama', nilai: 'Ellsworth Bunker (AS)', konteks: 'Diplomasi Perang Dingin Gedung Putih' },
      { label: 'Pasal Penentuan Nasib', nilai: 'Pasal XVIII–XXII', konteks: 'Kewajiban plebisit sebelum akhir 1969' },
      { label: 'Prinsip Suara Pasal 18c', nilai: 'Praktik Internasional', konteks: 'One man, one vote yang diabaikan' }
    ],
    kronologiRingkas: [
      { waktu: 'Maret 1962', kejadian: 'Perundingan rahasia dimulai di Middleburg, Virginia di bawah Ellsworth Bunker.' },
      { waktu: '15 Ags 1962', kejadian: 'Subandrio dan J.H. van Roijen menandatangani perjanjian di New York disaksikan Sekjen PBB U Thant.' },
      { waktu: '21 Sep 1962', kejadian: 'Majelis Umum PBB mengesahkan Resolusi 1752 (XVII) menyetujui mandat UNTEA.' }
    ],
    sumberVerifikasi: 'United Nations Treaty Series (UNTS) Vol. 437, No. 6311',
    referensiDokumen: 'NGR-TRT-1962-007, UN Doc A/RES/1752(XVII)'
  },
  {
    id: 'info-05',
    nomor: 'INF-05-UNT',
    judul: 'Mandat Pemerintahan Sementara PBB (UNTEA 1962–1963)',
    kategori: 'untea',
    kategoriLabel: 'UNTEA 1962–1963',
    tahun: '1962–1963',
    keterangan: 'Eksperimen pertama dalam sejarah PBB yang menjalankan administrasi pemerintahan langsung atas suatu wilayah.',
    poinDataHistoris: [
      { label: 'Durasi Transisi', nilai: '7 Bulan', konteks: '1 Oktober 1962 – 1 Mei 1963' },
      { label: 'Pasukan Keamanan UNSF', nilai: '1.500 Personel', konteks: 'Kontingen militer Pakistan' },
      { label: 'Administrator PBB', nilai: 'Djalal Abdoh', konteks: 'Diplomat berkebangsaan Iran' },
      { label: 'Komandan Pasukan', nilai: 'Brigjen Said Uddin Khan', konteks: 'Komando stabilitas transisi PBB' },
      { label: 'Pengalihan Administrasi', nilai: '1 Mei 1963', konteks: 'Penyerahan kendali kepada Indonesia' }
    ],
    kronologiRingkas: [
      { waktu: '1 Okt 1962', kejadian: 'Belanda menyerahkan kekuasaan administratif kepada UNTEA; bendera PBB berkibar.' },
      { waktu: '31 Des 1962', kejadian: 'Bendera Belanda diturunkan; bendera Indonesia diizinkan berkibar berdampingan bendera PBB.' },
      { waktu: '1 Mei 1963', kejadian: 'UNTEA resmi mengakhiri masa tugas dan menyerahkan administrasi ke Pemerintah Indonesia.' }
    ],
    sumberVerifikasi: 'United Nations Official Records, Annual Report of the Secretary-General on the Work of the Organization 1963',
    referensiDokumen: 'NGR-UN-1962-008'
  },
  {
    id: 'info-06',
    nomor: 'INF-06-PEP',
    judul: 'Fakta Kritis Pelaksanaan Pepera 1969',
    kategori: 'pepera_1969',
    kategoriLabel: 'Pelaksanaan Pepera 1969',
    tahun: '1969',
    keterangan: 'Perbandingan antara prinsip hukum internasional dekolonisasi PBB dengan metode musyawarah faktual di lapangan.',
    poinDataHistoris: [
      { label: 'Jumlah Populasi Asli', nilai: '± 800.000 Jiwa', konteks: 'Penduduk Papua Barat tahun 1969' },
      { label: 'Peserta Musyawarah Pepera', nilai: '1.025 Orang (0.12%)', konteks: 'Anggota dewan musyawarah terpilih' },
      { label: 'Hasil Pemungutan Suara', nilai: '100% Bulat', konteks: 'Di bawah karantina & pengawasan militer' },
      { label: 'Laporan Utusan PBB Ortiz Sanz', nilai: 'Dokumen A/7723', konteks: 'Mencatat penolakan asas one man one vote' },
      { label: 'Resolusi MU PBB 2504', nilai: '30 Negara Abstain', konteks: 'Hanya "mencatat" (takes note of)' }
    ],
    kronologiRingkas: [
      { waktu: '14 Jul 1969', kejadian: 'Musyawarah pertama dimulai di Merauke, disusul Wamena, Paniai, Fakfak, Sorong, Manokwari, Biak, dan Jayapura.' },
      { waktu: '2 Ags 1969', kejadian: 'Musyawarah terakhir di Jayapura; 1.025 peserta menyatakan setuju integrasi.' },
      { waktu: '6 Nov 1969', kejadian: 'Ortiz Sanz menyerahkan laporan kritis A/7723 kepada Sekjen PBB U Thant.' },
      { waktu: '19 Nov 1969', kejadian: 'Sidang Pleno MU PBB ke-1813 mengesahkan Resolusi 2504 (XXIV): 84 setuju, 0 tolak, 30 abstain.' }
    ],
    sumberVerifikasi: 'Laporan Resmi PBB Dokumen A/7723 & Resolusi Majelis Umum PBB 2504 (XXIV)',
    referensiDokumen: 'NGR-RPT-1969-009, NGR-RES-1969-010'
  },
  {
    id: 'info-07',
    nomor: 'INF-07-WIL',
    judul: 'Komparasi Matriks 7 Wilayah Adat Tanah Papua',
    kategori: 'tujuh_wilayah_adat',
    kategoriLabel: 'Tujuh Wilayah Adat',
    tahun: 'Tradisional',
    keterangan: 'Matriks komparasi sosiokultural, sistem kepemimpinan, dan ekologi adat antarzona.',
    poinDataHistoris: [
      { label: 'Total Wilayah Adat', nilai: '7 Wilayah', konteks: 'Mamta, Saireri, Domberai, Bomberai, Ha Anim, La Pago, Mee Pago' },
      { label: 'Jumlah Bahasa Daerah', nilai: '270+ Bahasa', konteks: 'Rumpun Papua/Non-Austronesia & Austronesia' },
      { label: 'Sistem Kepemimpinan Pesisir', nilai: 'Ondoafi / Keret', konteks: 'Garis keturunan ningrat adat' },
      { label: 'Sistem Kepemimpinan Gunung', nilai: 'Big Man / Tonowi', konteks: 'Meritokrasi prestasi & kedermawanan' },
      { label: 'Tradisi Perdamaian Tertua', nilai: 'Satu Tungku Tiga Batu', konteks: 'Kearifan toleransi Semenanjung Bomberai' }
    ],
    kronologiRingkas: [
      { waktu: 'Zaman Purba', kejadian: 'Sistem kepemimpinan adat otonom berkembang di masing-masing bentang ekologis.' },
      { waktu: '1961', kejadian: 'Nieuw Guinea Raad mengadopsi 7 bintang pada perisai mewakili kesatuan 7 wilayah adat.' },
      { waktu: '2000', kejadian: 'Kongres Rakyat Papua II mengukuhkan pembagian 7 wilayah adat sebagai pilar representasi Dewan Adat Papua.' }
    ],
    sumberVerifikasi: 'Mansoben, J.R. (1995). Sistem Politik Tradisional di Irian Jaya. LIPI-KITLV',
    referensiDokumen: 'NGR-ARK-PRE-001, Dokumen Dewan Adat Papua'
  },
  {
    id: 'info-08',
    nomor: 'INF-08-DIP',
    judul: 'Peta Diplomasi Internasional Papua di Pasifik & PBB',
    kategori: 'diplomasi',
    kategoriLabel: 'Sejarah Diplomasi Papua',
    tahun: '1961–2026',
    keterangan: 'Jejak langkah advokasi diplomatik di forum PBB, Melanesian Spearhead Group (MSG), dan Pacific Islands Forum (PIF).',
    poinDataHistoris: [
      { label: 'Status Observer di MSG', nilai: 'Tahun 2015', konteks: 'KTT Honiara mengakui representasi ULMWP' },
      { label: 'Negara Pelopor Pasifik', nilai: 'Republik Vanuatu', konteks: 'Konsisten menyuarakan hak penentuan nasib sendiri' },
      { label: 'Negara Abstain 1969', nilai: '30 Negara Afrika', konteks: 'Menolak kompromi plebisit Pepera' },
      { label: 'Resolusi Komunike PIF', nilai: 'Tahun 2019 & 2023', konteks: 'Mendesak kunjungan Komisioner Tinggi HAM PBB' }
    ],
    kronologiRingkas: [
      { waktu: '1969', kejadian: 'Lobi diplomatik diaspora di New York berhasil mendorong 30 negara Afrika abstain di PBB.' },
      { waktu: '2014', kejadian: 'Deklarasi Saralana di Port Vila membentuk kesatuan diplomatik ULMWP.' },
      { waktu: '2015', kejadian: 'KTT Melanesian Spearhead Group (MSG) di Honiara memberikan status Observer resmi.' },
      { waktu: '2023', kejadian: 'Komunike Pemimpin PIF di Rarotonga menegaskan keprihatinan atas krisis kemanusiaan di tanah Papua.' }
    ],
    sumberVerifikasi: 'Sekretariat Melanesian Spearhead Group & Arsip Sidang Majelis Umum PBB',
    referensiDokumen: 'NGR-MSG-2015-012, NGR-RES-2022-004'
  }
];
