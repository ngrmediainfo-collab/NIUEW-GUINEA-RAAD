import React from 'react';
import { MenuNavigasi, DokumenArsip } from '../../types';
import { koleksiDokumenArsip } from '../../data/archiveDocuments';
import { 
  Calendar, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Scale, 
  Landmark, 
  Flag, 
  Globe2, 
  Users, 
  HeartHandshake 
} from 'lucide-react';

interface TopicViewProps {
  topik: MenuNavigasi;
  padaPilihDokumen: (dokumen: DokumenArsip) => void;
  padaPilihNavigasi: (halaman: MenuNavigasi) => void;
}

interface DetailTopik {
  judul: string;
  subjudul: string;
  ikon: any;
  tanggalKunci: string;
  gambarUrl?: string;
  ringkasanEksekutif: string;
  kontenHistoriografi: {
    judulSub: string;
    paragraf: string[];
  }[];
  poinPenting: string[];
  tokohKunci: string[];
  nomorKatalogTerkait: string[];
}

export const dataTopikSejarah: Record<string, DetailTopik> = {
  sejarah_nasionalisme: {
    judul: 'Sejarah Nasionalisme Papua',
    subjudul: 'Kebangkitan Kesadaran Identitas, Ikatan Etnolinguistik Melanesia, dan Generasi Terpelajar Awal',
    ikon: Users,
    tanggalKunci: '1944 – 1961',
    gambarUrl: '/src/assets/images/galeri_budaya_papua_1794381198080.jpg',
    ringkasanEksekutif: 'Nasionalisme Papua bukanlah fenomena buatan asing, melainkan hasil sintesis bertahap antara kesadaran etno-kultural rumpun Melanesia, perjumpaan pemuda antarsuku dalam sekolah-sekolah guru/pamong praja, serta respon kolektif terhadap nasib politik di tengah dekolonisasi Pasifik.',
    kontenHistoriografi: [
      {
        judulSub: 'Akar Perjumpaan Pemuda di Bestuurschool dan Sekolah Guru',
        paragraf: [
          'Sebelum dekade 1940-an, suku-suku di Papua terfragmentasi oleh bentang alam pegunungan dan hutan lebat. Titik balik kesadaran bersama dimulai ketika para pemuda dari berbagai penjuru suku dikumpulkan dalam institusi pendidikan seperti Bestuurschool (Sekolah Pamong Praja) di Yoka, Hollandia, serta sekolah guru zending di Biak dan Serui.',
          'Di bangku-bangku sekolah inilah, pemuda dari wilayah adat Tabi, Saireri, Bomberay, hingga Pegunungan Tengah saling bertukar gagasan, menyadari persamaan nasib, latar belakang rasial Melanesia, serta bahasa persatuan Melayu Papua yang membedakan mereka dari kepulauan lain di kawasan Asia Tenggara.'
        ]
      },
      {
        judulSub: 'Peran Perang Pasifik 1944 dan Pencerahan Anti-Kolonial',
        paragraf: [
          'Kedatangan pasukan Sekutu pimpinan Jenderal Douglas MacArthur pada tahun 1944 di Hollandia membawa kontak langsung pemuda Papua dengan tentara berkulit hitam Amerika Serikat. Menyaksikan warga kulit hitam memegang posisi teknis, mengemudikan kendaraan militer berat, dan bersikap setara melahirkan kesadaran emansipasi mendalam bahwa orang Papua juga memiliki hak sederajat di muka bumi.',
          'Pascaperang, generasi terpelajar ini mulai mendirikan organisasi-organisasi rintisan seperti Gerakan Pemuda Papua, mendiskusikan masa depan pemerintahan sendiri, dan menolak diperlakukan semata sebagai objek pertukaran wilayah geopolitik.'
        ]
      }
    ],
    poinPenting: [
      'Pendidikan Bestuurschool di Yoka melahirkan inti kepemimpinan modern bangsa Papua.',
      'Pengalaman Perang Dunia II membuka pandangan dunia masyarakat terhadap kesetaraan rasial.',
      'Kelahiran partai politik modern pertama: PARNA (Partai Nasional) dipimpin Frits Kirihio pada 1960.',
      'Pengukuhan identitas kultural Melanesia sebagai jangkar identitas kebangsaan.'
    ],
    tokohKunci: ['Frits Kirihio', 'Markus Kaisiepo', 'Nicolaas Jouwe', 'Herman Womsiwor', 'Silas Papare (periode awal)'],
    nomorKatalogTerkait: ['NGR-DOC-1961-004', 'NGR-MAN-1961-005']
  },

  sejarah_perjuangan: {
    judul: 'Sejarah Perjuangan Kemerdekaan Papua',
    subjudul: 'Dinamika Perjuangan Fisik, Perlawanan Gerilya Hutan, Gerakan Kultural, dan Perlawanan Sipil Damai',
    ikon: Flag,
    tanggalKunci: '1963 – Kontemporer',
    gambarUrl: '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg',
    ringkasanEksekutif: 'Perjuangan kemerdekaan Papua berlangsung melalui berbagai fase: perlawanan bersenjata gerilya hutan sejak 1965 di Manokwari, perjuangan revitalisasi kebudayaan Mambesak, hingga transformasi gerakan politik sipil nir-kekerasan di era Reformasi.',
    kontenHistoriografi: [
      {
        judulSub: 'Meletusnya Perlawanan Bersenjata Pertama di Manokwari 1965',
        paragraf: [
          'Setelah pembubaran paksa institusi Nieuw Guinea Raad dan penurunan bendera Bintang Kejora pada tahun 1963, ketegangan politik meledak. Pada 28 Juli 1965 di Kebar, Manokwari, mantan anggota Papoea Vrijwilligers Korps (PVK) dipimpin Permenas Ferry Awom melancarkan serangan terhadap pos militer Indonesia.',
          'Peristiwa ini disusul oleh perlawanan Mayor Tituler Lodewijk Mandatjan dan Barent Mandatjan di wilayah pegunungan Arfak, yang menandai fase awal lahirnya sayap bersenjata Organisasi Papua Merdeka (OPM).'
        ]
      },
      {
        judulSub: 'Proklamasi 1971 dan Gerakan Budaya Mambesak',
        paragraf: [
          'Pada 1 Juli 1971 di Markas Victoria, perbatasan Papua Barat dan Papua Nugini, Seth Jafet Rumkorem dan Jacob Hendrik Prai memproklamasikan berdirinya Negara Republik Papua Barat dengan Undang-Undang Dasar Sementara.',
          'Di ranah sipil pada akhir 1970-an, antropolog dan seniman Arnold Clemens Ap mendirikan grup musik Mambesak di Universitas Cenderawasih. Mambesak menghidupkan kembali lagu-lagu rakyat dan tarian sakral sebagai senjata perlawanan kultural melawan de-Papuanisasi, sebelum Arnold Ap ditangkap dan gugur dibunuh pada April 1984.'
        ]
      }
    ],
    poinPenting: [
      'Perlawanan bersenjata pertama meletus di Manokwari pada 28 Juli 1965 (Peristiwa Kebar).',
      'Proklamasi Republik Papua Barat 1 Juli 1971 di Markas Victoria oleh Seth Jafet Rumkorem.',
      'Kebangkitan resistensi kebudayaan lewat Grup Musik Mambesak pimpinan Arnold Ap.',
      'Transformasi perlawanan menjadi konsolidasi sipil tanpa kekerasan di kota-kota Papua.'
    ],
    tokohKunci: ['Permenas Ferry Awom', 'Lodewijk Mandatjan', 'Seth Jafet Rumkorem', 'Arnold Clemens Ap', 'Kelly Kwalik'],
    nomorKatalogTerkait: ['NGR-LIT-2000-011', 'NGR-RES-2023-002']
  },

  ngr_1961: {
    judul: 'Nieuw Guinea Raad 1961',
    subjudul: 'Parlemen Representatif Pertama Tanah Papua, Mandat Konstitusional, dan Sidang Bersejarah',
    ikon: Landmark,
    tanggalKunci: '5 April 1961',
    gambarUrl: '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg',
    ringkasanEksekutif: 'Nieuw Guinea Raad (Dewan Nugini) merupakan parlemen resmi pertama yang dilantik di Hollandia pada 5 April 1961. Dari 28 anggotanya, 23 adalah putra-putra asli Papua. Dewan ini memiliki wewenang legislasi dan merancang dasar kedaulatan bangsa Papua.',
    kontenHistoriografi: [
      {
        judulSub: 'Komposisi Representasi Demokratis',
        paragraf: [
          'Ordonansi pembentukan Dewan Nugini (Gouvernementsblad 1960 No. 18) menetapkan dewan perwakilan modern. Pemilihan umum diselenggarakan di wilayah perkotaan (Hollandia, Biak, Manokwari, Sorong, Merauke) dan musyawarah perwakilan suku adat di pedalaman.',
          'Hasilnya, 23 dari 28 kursi parlemen dimenangkan oleh orang asli Papua dari beragam suku dan latar belakang profesi, didampingi 5 anggota keturunan Eropa/Eurasia. Pelantikan dihadiri utusan resmi dari Australia, Selandia Baru, Inggris, Prancis, dan Belanda.'
        ]
      },
      {
        judulSub: 'Keputusan Krusial Sidang Pleno Oktober 1961',
        paragraf: [
          'Dalam sidang pleno bersejarah bulan Oktober 1961, Nieuw Guinea Raad mengesahkan pembentukan Komite Nasional Papua. Dewan ini menugaskan perumusan Manifesto Politik, pengesahan Bendera Bintang Kejora, lagu kebangsaan Hai Tanahku Papua, dan lambang burung Mambruk.',
          'Dewan ini juga mengajukan jadwal penentuan kemerdekaan penuh tanah Papua kepada Kerajaan Belanda dan Perserikatan Bangsa-Bangsa dalam kurun waktu tidak lebih dari 10 tahun.'
        ]
      }
    ],
    poinPenting: [
      'Pelantikan resmi 5 April 1961 di Hollandia disaksikan perwakilan diplomatik mancanegara.',
      'Mayoritas mutlak anggota (23 dari 28 orang) adalah orang asli Papua.',
      'Memiliki hak inisiatif legislatif, anggaran, dan hak interpelasi terhadap Gubernur.',
      'Menjadi landasan formal proklamasi identitas kebangsaan Papua pada 1 Desember 1961.'
    ],
    tokohKunci: ['J.H.F. Sollewijn Gelpke', 'Nicolaas Jouwe', 'Markus Kaisiepo', 'Nicolaas Tanggahma', 'Willem Inury'],
    nomorKatalogTerkait: ['NGR-ACT-1960-003', 'NGR-DOC-1961-004']
  },

  desember_1961: {
    judul: '1 Desember 1961',
    subjudul: 'Hari Manifesto Politik, Pengibaran Bendera Bintang Kejora, dan Lagu Kebangsaan Hai Tanahku Papua',
    ikon: Flag,
    tanggalKunci: '1 Desember 1961',
    gambarUrl: '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg',
    ringkasanEksekutif: 'Pada 1 Desember 1961, bangsa Papua secara resmi memproklamasikan identitas kebangsaannya melalui pengibaran bendera Bintang Kejora berdampingan dengan bendera Belanda, dinyanyikannya lagu Hai Tanahku Papua, dan penerbitan Manifesto Politik.',
    kontenHistoriografi: [
      {
        judulSub: 'Penerbitan Ketetapan Hukum Gouvernementsblad No. 68/1961',
        paragraf: [
          'Pengibaran bendera Bintang Kejora pada 1 Desember 1961 bukanlah tindakan liar, melainkan keputusan yang memiliki legitimasi yuridis melalui ketetapan resmi Gubernur Nederlands Nieuw-Guinea No. 68 tertanggal 18 November 1961 atas rekomendasi sidang Nieuw Guinea Raad.',
          'Pemerintah kolonial secara protokoler mengatur agar di seluruh kantor pos dan distrik pemerintahan, bendera Bintang Kejora dikibarkan berdampingan dengan bendera Kerajaan Belanda, diiringi lagu kebangsaan "Hai Tanahku Papua" ciptaan I.S. Kijne.'
        ]
      },
      {
        judulSub: 'Simbolisme dan Makna Filosofis Atribut Nasional',
        paragraf: [
          'Bintang Kejora (Morgenster) melambangkan harapan fajar kemerdekaan yang terbit di ufuk timur Pasifik. Garis merah melambangkan keberanian dan tumpah darah para martir; garis putih melambangkan kesucian niat; dan garis biru melambangkan lautan serta kepulauan Melanesia.',
          'Lambang negara Burung Mambruk (Crown Pigeon) dengan semboyan adat "E Mauto Nin Vie" (Satu Orang, Satu Jiwa) menegaskan persatuan utuh seluruh suku dari pesisir hingga pegunungan.'
        ]
      }
    ],
    poinPenting: [
      'Deklarasi Manifesto Politik ditandatangani oleh 70 wakil komite dan partai politik.',
      'Pengibaran resmi bendera Bintang Kejora berdasarkan Gouvernementsblad 1961 No. 68.',
      'Lagu Hai Tanahku Papua ditetapkan secara resmi sebagai lagu kebangsaan.',
      'Nama resmi wilayah disepakati menjadi West Papua dan nama bangsa menjadi Bangsa Papua.'
    ],
    tokohKunci: ['Nicolaas Jouwe', 'E.J. Bonay', 'Markus Kaisiepo', 'Willem Zonggonao', 'Herman Womsiwor'],
    nomorKatalogTerkait: ['NGR-MAN-1961-005', 'NGR-DEC-1961-006']
  },

  perjanjian_new_york: {
    judul: 'Perjanjian New York 1962',
    subjudul: 'Kompromi Geopolitik Perang Dingin, Rencana Bunker, dan Mandat Penentuan Nasib Sendiri PBB',
    ikon: Scale,
    tanggalKunci: '15 Agustus 1962',
    gambarUrl: '/src/assets/images/arsip_dokumen_sejarah_1794381197550.jpg',
    ringkasanEksekutif: 'Perjanjian bilateral antara Belanda dan Indonesia yang ditandatangani di Markas PBB New York atas desakan Amerika Serikat. Ditandatangani tanpa keterlibatan wakil bangsa Papua, namun memuat kewajiban hukum internasional Pasal XVIII mengenai plebisit sebelum 1969.',
    kontenHistoriografi: [
      {
        judulSub: 'Tekanan Geopolitik Perang Dingin dan Peran Presiden Kennedy',
        paragraf: [
          'Pada awal dekade 1960-an, eskalasi militer di wilayah Pasifik meningkat tajam menyusul komando Trikora oleh Presiden Sukarno dan pembelian armada kapal perang serta jet tempur dari Uni Soviet. Presiden AS John F. Kennedy khawatir Indonesia akan jatuh ke orbit komunisme internasional.',
          'Guna meredakan krisis, Kennedy menunjuk mantan duta besar Ellsworth Bunker untuk menyusun proposal kompromi (Bunker Plan) yang memaksa Belanda melepaskan Papua Barat kepada otoritas sementara PBB untuk diteruskan kepada Indonesia, dengan imbalan janji plebisit di kemudian hari.'
        ]
      },
      {
        judulSub: 'Klausul Internasional Pasal XVIII–XXII',
        paragraf: [
          'Meskipun bangsa Papua tidak dilibatkan dalam penandatanganan traktat, Perjanjian New York memuat jaminan hukum internasional yang tegas dalam Pasal XVIII: Indonesia diwajibkan menyelenggarakan tindakan penentuan nasib sendiri (Act of Free Choice) bagi seluruh penduduk Papua sebelum akhir tahun 1969.',
          'Pasal XVIII huruf c secara eksplisit menegaskan bahwa plebisit tersebut harus menjamin partisipasi seluruh orang dewasa sesuai dengan praktik internasional lazim (one man one vote).'
        ]
      }
    ],
    poinPenting: [
      'Ditandatangani di Markas PBB New York pada 15 Agustus 1962 oleh Subandrio dan Van Roijen.',
      'Diprakarsai oleh diplomat AS Ellsworth Bunker tanpa perwakilan resmi delegasi Papua.',
      'Menetapkan administrasi transisi PBB (UNTEA) mulai 1 Oktober 1962.',
      'Pasal XVIII mewajibkan penyelenggaraan penentuan nasib sendiri sebelum akhir 1969.'
    ],
    tokohKunci: ['Ellsworth Bunker', 'John F. Kennedy', 'Subandrio', 'J.H. van Roijen', 'U Thant'],
    nomorKatalogTerkait: ['NGR-TRT-1962-007', 'NGR-UN-1962-008']
  },

  untea: {
    judul: 'UNTEA 1962–1963',
    subjudul: 'Pemerintahan Sementara PBB, Pasukan Keamanan UNSF, dan Fase Transisi Kedaulatan',
    ikon: Globe2,
    tanggalKunci: '1 Oktober 1962 – 1 Mei 1963',
    gambarUrl: '/src/assets/images/diplomasi_pbb_papua_1794381198400.jpg',
    ringkasanEksekutif: 'United Nations Temporary Executive Authority (UNTEA) adalah preseden pertama dalam sejarah PBB di mana badan internasional memegang mandat pemerintahan langsung atas suatu wilayah. Periode transisi 7 bulan ini berakhir dengan pengalihan kendali kepada Indonesia pada 1 Mei 1963.',
    kontenHistoriografi: [
      {
        judulSub: 'Mandat Pemerintahan Langsung PBB Pertama di Dunia',
        paragraf: [
          'Berdasarkan Resolusi Majelis Umum PBB No. 1752 (XVII), kekuasaan administratif diserahkan dari Gubernur Belanda kepada Administrator PBB Djalal Abdoh (diplomat asal Iran) pada 1 Oktober 1962.',
          'PBB mengirimkan Pasukan Keamanan PBB (UNSF) berkekuatan 1.500 prajurit dari kontingen Angkatan Darat Pakistan di bawah pimpinan Brigjen Said Uddin Khan untuk menjaga stabilitas keamanan selama transisi berlangsung.'
        ]
      },
      {
        judulSub: 'Dilema Transisi dan Kekecewaan Rakyat Papua',
        paragraf: [
          'Dalam praktiknya, masa transisi UNTEA berlangsung sangat singkat dan diwarnai tekanan kuat dari perwakilan Indonesia. Bendera PBB dikibarkan berdampingan dengan bendera Indonesia setelah 31 Desember 1962, sementara pegawai sipil Belanda secara bertahap dipulangkan.',
          'Aktivis dan dewan rakyat Papua mengalami sensor politik dan pembatasan gerak, hingga pada 1 Mei 1963 UNTEA secara resmi meninggalkan Papua dan menyerahkan seluruh administrasi kepada otoritas Jakarta.'
        ]
      }
    ],
    poinPenting: [
      'Pemerintahan administratif langsung pertama oleh PBB dalam sejarah dunia.',
      'Penempatan 1.500 tentara penjaga perdamaian Pakistan (UNSF).',
      'Penarikan aparatur sipil dan militer Belanda dari tanah Papua.',
      'Pengalihan administrasi penuh kepada Republik Indonesia pada 1 Mei 1963.'
    ],
    tokohKunci: ['Djalal Abdoh (Administrator UNTEA)', 'Brigjen Said Uddin Khan', 'U Thant', 'Subandrio'],
    nomorKatalogTerkait: ['NGR-UN-1962-008', 'NGR-TRT-1962-007']
  },

  pepera_1969: {
    judul: 'Pepera 1969 (Act of Free Choice)',
    subjudul: 'Pelaksanaan Musyawarah 1.025 Delegasi, Laporan Kritis Ortiz Sanz A/7723, dan Resolusi PBB 2504',
    ikon: Scale,
    tanggalKunci: '14 Juli – 2 Agustus 1969',
    gambarUrl: '/src/assets/images/diplomasi_pbb_papua_1794381198400.jpg',
    ringkasanEksekutif: 'Penentuan Pendapat Rakyat (Pepera) 1969 diselenggarakan melalui musyawarah 1.025 orang wakil yang dipilih oleh pemerintah di bawah pengawasan militer, bukan dengan sistem satu orang satu suara. Laporan PBB Dokumen A/7723 mencatat ketidaksesuaian ini.',
    kontenHistoriografi: [
      {
        judulSub: 'Metode Musyawarah vs Prinsip "One Man One Vote"',
        paragraf: [
          'Meskipun Pasal XVIII Perjanjian New York mensyaratkan pelaksanaan hak penentuan nasib sendiri sesuai dengan praktik internasional lazim (one man, one vote), Pemerintah Indonesia memilih menggunakan metode "musyawarah" dengan alasan topografi dan tingkat pendidikan.',
          'Sebanyak 1.025 orang anggota Dewan Musyawarah Pepera (DMP) dikarantina dan diberi pengarahan ketat oleh aparat militer pimpinan Brigjen Ali Moertopo (Operasi Khusus / Opsus). Seluruh 1.025 peserta secara terbuka menyatakan memilih bergabung dengan Indonesia.'
        ]
      },
      {
        judulSub: 'Laporan Resmi Ortiz Sanz (A/7723) dan Resolusi PBB 2504',
        paragraf: [
          'Utusan Khusus Sekjen PBB, Duta Besar Fernando Ortiz Sanz, dalam laporan resminya kepada Majelis Umum PBB (Dokumen A/7723 Paragraf 250) menyatakan secara gamblang bahwa hak penentuan nasib sendiri yang sejati tidak terlaksana di Papua Barat.',
          'Pada 19 November 1969, Majelis Umum PBB mengesahkan Resolusi 2504 (XXIV) dengan hasil: 84 mendukung, 0 menolak, dan 30 negara abstain (terutama negara-negara Afrika yang menolak pengesahan plebisit bermasalah). Diksi resolusi hanya "mencatat" (takes note of) laporan Sekjen PBB tanpa pernah secara eksplisit "mengesahkan" integrasi.'
        ]
      }
    ],
    poinPenting: [
      'Hanya melibatkan 1.025 orang dari sekitar 800.000 penduduk asli Papua saat itu.',
      'Sistem satu orang satu suara (one man one vote) ditolak dan digantikan musyawarah konsensus.',
      'Laporan resmi Utusan PBB Fernando Ortiz Sanz (UN Doc A/7723) mencatat pelanggaran kebebasan.',
      'Resolusi Majelis Umum PBB No. 2504 (XXIV) hanya berstatus "mencatat" (takes note of).'
    ],
    tokohKunci: ['Fernando Ortiz Sanz (Utusan PBB)', 'Jenderal Ali Moertopo (Opsus)', 'Frans Kaisiepo', 'Sudjarwo Tjondronegoro'],
    nomorKatalogTerkait: ['NGR-RPT-1969-009', 'NGR-RES-1969-010']
  },

  gerakan_politik: {
    judul: 'Gerakan Politik Papua',
    subjudul: 'Evolusi Organisasi Sipil, Presidium Dewan Papua, Parlemen Nasional West Papua, dan Gerakan Mahasiswa',
    ikon: Users,
    tanggalKunci: '1998 – Sekarang',
    gambarUrl: '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg',
    ringkasanEksekutif: 'Evolusi gerakan perlawanan politik dari masa isolasi militer menuju ruang publik terbuka di era reformasi, pembentukan Presidium Dewan Papua (PDP), Komite Nasional Papua Barat (KNPB), dan konsolidasi payung persatuan ULMWP.',
    kontenHistoriografi: [
      {
        judulSub: 'Musyawarah Besar dan Kongres Rakyat Papua II Tahun 2000',
        paragraf: [
          'Runtuhnya rezim otoriter Orde Baru membuka ruang bagi kebangkitan politik damai Papua. Setelah dialog Tim 100 dengan Presiden Habibie pada 1999, diselenggarakan Kongres Rakyat Papua II pada Mei–Juni 2000 di GOR Jayapura yang dihadiri puluhan ribu orang.',
          'Kongres menetapkan Presidium Dewan Papua (PDP) yang dipimpin Theys Hiyo Eluay dan Tom Beanal sebagai representasi resmi aspirasi rakyat Papua. Kongres menegaskan bahwa kemerdekaan Papua telah sah sejak 1 Desember 1961 dan menuntut penyelesaian damai tanpa kekerasan.'
        ]
      },
      {
        judulSub: 'Dinamika Gerakan Sipil Kontemporer dan Represi',
        paragraf: [
          'Pembunuhan Theys Eluay pada 10 November 2001 oleh anggota Satuan Tugas Tribuana Kopassus mengguncang gerakan sipil namun tidak memadamkan aspirasi.',
          'Dalam dua dekade terakhir, gerakan politik berkembang menjadi perlawanan perkotaan melalui aksi-aksi damai Aliansi Mahasiswa Papua (AMP), KNPB, dan konsolidasi aliansi gereja-gereja Papua yang menuntut penarikan pasukan militer dan penegakan hak penentuan nasib sendiri.'
        ]
      }
    ],
    poinPenting: [
      'Pertemuan bersejarah Tim 100 dengan Presiden B.J. Habibie pada Februari 1999.',
      'Kongres Rakyat Papua II tahun 2000 melahirkan Presidium Dewan Papua (PDP).',
      'Pembunuhan tokoh kharismatik Theys Hiyo Eluay pada 10 November 2001.',
      'Konsolidasi gerakan damai mahasiswa, pemuda, dan dewan adat di tanah Papua.'
    ],
    tokohKunci: ['Theys Hiyo Eluay', 'Tom Beanal', 'Willy Mandowen', 'Thaha Alhamid', 'Aktivis Mahasiswa Papua'],
    nomorKatalogTerkait: ['NGR-LIT-2000-011', 'NGR-RES-2024-001']
  },

  diplomasi_internasional: {
    judul: 'Diplomasi Internasional',
    subjudul: 'Advokasi di Forum PBB, Melanesian Spearhead Group (MSG), Pacific Islands Forum (PIF), dan Diplomasi Diaspora',
    ikon: Globe2,
    tanggalKunci: '1961 – Kontemporer',
    gambarUrl: '/src/assets/images/diplomasi_pbb_papua_1794381198400.jpg',
    ringkasanEksekutif: 'Perjuangan hak penentuan nasib sendiri dan perlindungan hak asasi manusia Papua di forum-forum diplomatik internasional, mulai dari Komite Dekolonisasi PBB (C-24), Dewan HAM Jenewa, hingga KTT negara-negara kepulauan Pasifik.',
    kontenHistoriografi: [
      {
        judulSub: 'Diplomasi Diaspora Awal di Eropa dan Afrika',
        paragraf: [
          'Sejak tahun 1960-an, para pemimpin Papua di pengasingan seperti Nicolaas Jouwe, Markus Kaisiepo, dan Herman Womsiwor mendirikan biro informasi di Belanda dan New York. Mereka melobi delegasi negara-negara Afrika yang baru merdeka di PBB, yang berbuah 30 suara abstain pada Sidang Majelis Umum 1969.',
          'Pada era 1970-an, utusan diplomatik Papua di bawah kepemimpinan Moses Werror dan Rex Rumakiek membuka perwakilan di Senegal dan wilayah Pasifik Selatan guna membangun jejaring solidaritas anti-kolonial.'
        ]
      },
      {
        judulSub: 'Terobosan Pasifik: KTT MSG dan Resolusi HAM PBB',
        paragraf: [
          'Kawasan Melanesia menjadi pilar terpenting diplomasi kontemporer Papua. Pembentukan United Liberation Movement for West Papua (ULMWP) di Port Vila pada Desember 2014 berbuah pengakuan status Observer dalam Melanesian Spearhead Group (MSG) pada 2015 di Honiara.',
          'Pemerintah Republik Vanuatu dan Kepulauan Solomon secara konsisten mengangkat pelanggaran hak asasi manusia di Sidang Majelis Umum PBB dan mendesak Komisioner Tinggi HAM PBB (OHCHR) untuk diizinkan mengunjungi Papua.'
        ]
      }
    ],
    poinPenting: [
      'Kampanye diplomatik diaspora di New York, Den Haag, dan Dakar sejak era 1960-an.',
      'Pemberian status Observer kepada ULMWP dalam KTT MSG di Honiara tahun 2015.',
      'Komunike Pacific Islands Forum (PIF) yang mendesak akses tim investigasi HAM PBB ke Papua.',
      'Pidato rutin para pemimpin negara Pasifik di forum Sidang Umum PBB New York.'
    ],
    tokohKunci: ['Diplomat Vanuatu', 'Perwakilan ULMWP', 'Komite C-24 PBB', 'Jaringan Solidaritas Pasifik'],
    nomorKatalogTerkait: ['NGR-MSG-2015-012', 'NGR-RES-2022-004']
  },

  hak_asasi_manusia: {
    judul: 'Hak Asasi Manusia dan Kemanusiaan',
    subjudul: 'Dokumentasi Pelanggaran HAM Berat, Krisis Pengungsi Internal (IDP), dan Perlindungan Hak Hidup',
    ikon: HeartHandshake,
    tanggalKunci: '1963 – Sekarang',
    gambarUrl: '/src/assets/images/arsip_dokumen_sejarah_1794381197550.jpg',
    ringkasanEksekutif: 'Pencatatan sistematis situasi hak asasi manusia di tanah Papua, meliputi peristiwa pelanggaran HAM berat yang belum diadili, pembatasan kebebasan berekspresi, penahanan aktivis politik, krisis pengungsi internal di wilayah konflik bersenjata, dan hak kelestarian lingkungan adat.',
    kontenHistoriografi: [
      {
        judulSub: 'Jejak Pelanggaran HAM Masa Lalu dan Impunitas',
        paragraf: [
          'Sejarah panjang operasi militer di Papua menyisakan luka kemanusiaan yang mendalam. Peristiwa Wasior (2001), Wamena (2003), Paniai (2014), serta rangkaian operasi militer di pedalaman telah ditetapkan oleh Komnas HAM sebagai pelanggaran HAM berat.',
          'Namun hingga kini, impunitas hukum masih mendominasi di mana para pelaku penembakan dan kekerasan terhadap warga sipil jarang sekali dimintai pertanggungjawaban di pengadilan hak asasi manusia yang independen.'
        ]
      },
      {
        judulSub: 'Darurat Kemanusiaan: Puluhan Ribu Pengungsi Internal (IDP)',
        paragraf: [
          'Sejak akhir tahun 2018, eskalasi kontak senjata antara aparat keamanan dan Tentara Pembebasan Nasional Papua Barat (TPNPB) di Nduga, Intan Jaya, Puncak, Maybrat, dan Pegunungan Bintang telah memaksa lebih dari 65.000 warga sipil adat mengungsi ke hutan dan gereja-gereja penampungan.',
          'Ratusan warga sipil, terutama anak-anak dan lansia, meninggal dunia akibat ketiadaan obat-obatan, malnutrisi, dan kedinginan di hutan belantara. Nieuw Guinea Raad mendokumentasikan krisis ini sebagai darurat kemanusiaan yang membutuhkan intervensi palang merah internasional dan pelapor khusus PBB.'
        ]
      }
    ],
    poinPenting: [
      'Dokumentasi berkas pelanggaran HAM berat Wasior, Wamena, dan Paniai.',
      'Krisis kemanusiaan lebih dari 65.000 pengungsi sipil internal (IDP) di pegunungan tengah.',
      'Pembatasan jurnalis asing dan pemantau independen internasional ke tanah Papua.',
      'Ancaman kerusakan lingkungan hidup dan perampasan tanah adat oleh industri ekstraktif.'
    ],
    tokohKunci: ['Pastor dan Pendeta Pembela HAM', 'Relawan Kemanusiaan Sipil', 'Komnas HAM RI', 'Komisioner Tinggi HAM PBB'],
    nomorKatalogTerkait: ['NGR-RES-2025-003', 'NGR-LIT-2000-011']
  }
};

export const TopicView: React.FC<TopicViewProps> = ({
  topik,
  padaPilihDokumen,
  padaPilihNavigasi
}) => {
  const detail = dataTopikSejarah[topik] || dataTopikSejarah['sejarah_nasionalisme'];
  const IkonKomponen = detail.ikon;

  const dokumenTerkait = koleksiDokumenArsip.filter(d => 
    detail.nomorKatalogTerkait.includes(d.nomorKatalog)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          <IkonKomponen className="w-4 h-4" />
          <span>Fokus Historiografi Khusus · {detail.tanggalKunci}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FBF9F5] leading-tight">
          {detail.judul}
        </h1>

        <p className="text-base text-[#DFB76C] font-serif italic">
          {detail.subjudul}
        </p>

        {/* Executive Summary */}
        <div className="p-5 bg-[#080E1C] border-l-2 border-[#C5A059] text-sm text-slate-300 leading-relaxed font-sans">
          <span className="font-serif text-xs uppercase tracking-wider text-[#C5A059] block mb-1 font-semibold">
            Ringkasan Eksekutif Arsip:
          </span>
          {detail.ringkasanEksekutif}
        </div>
      </div>

      {/* Featured Visual Archive Banner if present */}
      {detail.gambarUrl && (
        <div className="border border-slate-800 bg-[#060A14] p-3 shadow-2xl">
          <div className="overflow-hidden bg-black/60 relative aspect-[16/9]">
            <img
              src={detail.gambarUrl}
              alt={detail.judul}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-2.5 px-2 py-1 text-[11px] text-slate-400 font-serif italic flex items-center justify-between">
            <span>Dokumentasi Visual Terkait: {detail.judul}</span>
            <span className="font-mono text-[#C5A059]">ARSIP PUSAT NGR</span>
          </div>
        </div>
      )}

      {/* Historiographical Essay Sections */}
      <div className="space-y-10">
        {detail.kontenHistoriografi.map((section, idx) => (
          <div key={idx} className="space-y-4 bg-[#080E1C] p-8 border border-slate-800">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF9F5]">
              {section.judulSub}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C5A059] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {section.paragraf.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Bullet Points */}
      <div className="p-8 bg-[#060A14] border border-[#C5A059]/30 space-y-4">
        <h3 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>Fakta Sejarah &amp; Poin Kunci Terverifikasi:</span>
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
          {detail.poinPenting.map((poin, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-[#C5A059] font-bold text-base leading-none">▪</span>
              <span>{poin}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Figures */}
      <div className="space-y-3">
        <span className="text-xs font-serif uppercase tracking-wider text-[#C5A059] block">
          Tokoh &amp; Pelaku Sejarah Terkait:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {detail.tokohKunci.map((tokoh, idx) => (
            <span
              key={idx}
              className="text-xs text-slate-200 bg-[#0E1A33] px-3.5 py-1.5 border border-slate-800 font-sans"
            >
              {tokoh}
            </span>
          ))}
        </div>
      </div>

      {/* Associated Primary Documents */}
      {dokumenTerkait.length > 0 && (
        <div className="pt-8 border-t border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#FBF9F5] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C5A059]" />
              <span>Arsip Primer Terkait Pembahasan Ini</span>
            </h3>
            <button
              onClick={() => padaPilihNavigasi('arsip_dokumen')}
              className="text-xs font-serif text-[#DFB76C] hover:text-white uppercase tracking-wider"
            >
              Buka Semua Katalog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dokumenTerkait.map((doc) => (
              <div
                key={doc.id}
                onClick={() => padaPilihDokumen(doc)}
                className="p-4 bg-[#080E1C] hover:bg-[#122240] border border-slate-800 hover:border-[#C5A059] transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[#C5A059]">
                    {doc.nomorKatalog} · {doc.tanggal}
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-slate-100 group-hover:text-[#DFB76C] transition-colors line-clamp-2">
                    {doc.judul}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {doc.ringkasan}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-[#C5A059]">
                  <span>Baca Transkrip</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
