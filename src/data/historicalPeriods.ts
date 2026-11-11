import { PeriodeSejarah } from '../types';

export const daftarPeriodeSejarah: PeriodeSejarah[] = [
  {
    id: 'periode-1',
    nomorUrut: 1,
    rentangTahun: 'Pra-Kolonial – Abad ke-19',
    judul: 'Sejarah Masyarakat dan Kebudayaan Papua',
    deskripsiSingkat: 'Akar peradaban ribuan tahun, sistem nilai adat, struktur klan otonom, perdagangan maritim kuno, dan relasi kosmologis dengan tanah leluhur.',
    narasiPanjang: `Jauh sebelum kedatangan ekspedisi bangsa Eropa dan batas-batas kolonial digariskan, tanah Papua (Tanah Besar New Guinea) telah dihuni oleh ratusan kelompok etnolinguistik rumpun Melanesia yang memiliki sistem pengetahuan agraris, navigasi bahari, dan falsafah hidup yang mandiri. Arkeologi modern di Lembah Baliem dan pesisir utara membuktikan praktik pertanian purba berusia lebih dari 9.000 tahun di Dataran Tinggi Kuk dan sekitarnya.

Hubungan antarsuku dijalin melalui rute perdagangan tradisional yang melintasi pesisir dan pegunungan, seperti perdagangan kapak batu, noken, kerang siput cawat, bulu burung cenderawasih, dan perahu kano bercadik. Struktur kepemimpinan adat berkembang secara organik: sistem 'Big Man' di kawasan pegunungan tengah berbasis kepemimpinan prestasi dan kedermawanan, serta sistem 'Ondoafi' atau 'Korano' di kawasan pesisir yang berbasis garis keturunan aristokrat adat. Tanah bukanlah komoditas dagang melainkan ibu pertiwi yang memiliki relasi spiritual sakral yang mengikat generasi silam, kini, dan masa depan.`,
    poinKunci: [
      'Bukti peradaban pertanian kuno berusia ribuan tahun di dataran tinggi Papua.',
      'Ratusan bahasa dan dialek rumpun Melanesia non-Austronesia dan Austronesia.',
      'Sistem hukum adat otonom (Ondoafi di pesisir, Big Man di pegunungan tengah).',
      'Falsafah kepemilikan komunal atas tanah ulayat dan sumber daya alam sakral.'
    ],
    tokohPenting: ['Para Leluhur Klan Adat', 'Ondoafi Pesisir Tanah Tabi', 'Kepala Suku Mee dan Dani'],
    dokumenTerkaitIds: ['arsip-001', 'arsip-002'],
    gambarUrl: '/src/assets/images/galeri_budaya_papua_1794381198080.jpg'
  },
  {
    id: 'periode-2',
    nomorUrut: 2,
    rentangTahun: '1898 – 1949',
    judul: 'Masa Pemerintahan Belanda (Nederlands Nieuw-Guinea)',
    deskripsiSingkat: 'Pembentukan pos administrasi Belanda di Manokwari dan Fakfak 1898, pemisahan administrasi dari Hindia Belanda, dan era Perang Pasifik.',
    narasiPanjang: `Pemerintah Kerajaan Belanda secara resmi memancangkan pos pemerintahan tetap di pantai barat dan utara Papua pada tahun 1898 di Manokwari dan Fakfak, guna membatasi pengaruh ekspansi kolonial Inggris dan Jerman di bagian timur pulau. Pada masa ini, Nieuw-Guinea diperlakukan sebagai pos terdepan yang sangat terbelakang dengan administrasi sipil yang minim.

Selama Perang Dunia II (1942–1945), Papua menjadi medan pertempuran paling menentukan di mandala Pasifik Selatan antara Tentara Sekutu pimpinan Jenderal Douglas MacArthur melawan Kekaisaran Jepang. Kota Hollandia (kini Jayapura) dijadikan pangkalan militer raksasa MacArthur dengan lebih dari 200.000 pasukan Sekutu. Pengalaman Perang Pasifik ini membuka kontak mendalam pemuda Papua dengan dunia modern, teknologi, dan gagasan emansipasi internasional.`,
    poinKunci: [
      'Pendirian pos administrasi resmi Belanda pertama pada 1898 di Manokwari dan Fakfak.',
      'Hollandia menjadi basis komando tertinggi Jenderal Douglas MacArthur dalam Perang Pasifik 1944.',
      'Munculnya kesadaran generasi terpelajar Papua pertama melalui sekolah guru dan zending.',
      'Perbedaan mendasar sosiologis, etnis, dan geografis antara Kepulauan Hindia Belanda dan Papua.'
    ],
    tokohPenting: ['Gubernur J.P. van Eechoud', 'Frits Kirihio', 'Silas Papare (fase awal)', 'Marcus Kaisiepo'],
    dokumenTerkaitIds: ['arsip-003', 'arsip-004']
  },
  {
    id: 'periode-3',
    nomorUrut: 3,
    rentangTahun: '1949 – 1961',
    judul: 'Perkembangan Politik Papua 1949–1961',
    deskripsiSingkat: 'Pengecualian Papua dari KMB 1949, percepatan dekolonisasi Belanda, pembentukan partai-partai politik lokal, dan pendidikan kaderisasi nasional.',
    narasiPanjang: `Dalam Konferensi Meja Bundar (KMB) di Den Haag akhir tahun 1949, status Nieuw-Guinea mengalami kebuntuan sengit (deadlock) antara Belanda dan Republik Indonesia Serikat. Piagam Penyerahan Kedaulatan Pasal 2 menetapkan bahwa status Papua Barat akan diselesaikan melalui perundingan bilateral dalam waktu satu tahun. Namun perundingan tersebut tidak pernah mencapai kesepakatan.

Melihat kebuntuan itu, Belanda di bawah Pasal 73 Piagam PBB mengenai Wilayah Tanpa Pemerintahan Sendiri (Non-Self-Governing Territories) mulai secara intensif menyiapkan penduduk asli Papua menuju penentuan nasib sendiri (self-determination). Belanda mendirikan Bestuurschool (Sekolah Pamong Praja), sekolah kejuruan, dan kepolisian pribumi. Pemuda-pemuda Papua membentuk partai politik lokal seperti PARNA (Partai Nasional), KSP (Komite Kemerdekaan Papua), dan menerbitkan pamflet politik yang menuntut kedaulatan bangsa Papua.`,
    poinKunci: [
      'Pasal 2 Piagam KMB 1949 mengecualikan Papua Barat dari kedaulatan Republik Indonesia Serikat.',
      'Belanda secara teratur melaporkan administrasi Papua ke PBB berdasarkan Pasal 73e Piagam PBB.',
      'Kelahiran partai-partai politik pertama di Papua: PARNA, KSP, Partai Demokratis Papua.',
      'Pernyataan bersama Belanda-Australia 1957 tentang kerja sama administratif dekolonisasi New Guinea.'
    ],
    tokohPenting: ['Herman Womsiwor', 'Nicolaas Jouwe', 'Markus Kaisiepo', 'Willem Inury', 'Frans Kaisiepo'],
    dokumenTerkaitIds: ['arsip-005', 'arsip-006']
  },
  {
    id: 'periode-4',
    nomorUrut: 4,
    rentangTahun: '5 April 1961',
    judul: 'Pembentukan Nieuw Guinea Raad (Dewan Nugini)',
    deskripsiSingkat: 'Pelantikan parlemen representatif pertama rakyat Papua dengan 28 anggota, beranggotakan 23 orang pribumi Papua, dihadiri diplomat mancanegara.',
    narasiPanjang: `Pada tanggal 5 April 1961, sebuah tonggak sejarah demokrasi modern dipancangkan di Hollandia dengan diresmikannya Nieuw Guinea Raad (Dewan Nugini). Lembaga ini merupakan parlemen representatif transisi yang dibentuk berdasarkan Ordonansi Dewan Nugini tahun 1960 untuk mempersiapkan kemerdekaan penuh tanah Papua.

Dewan ini terdiri atas 28 anggota, di mana 23 di antaranya adalah putra-putra asli Papua yang terpilih melalui pemilihan umum langsung di perkotaan dan sistem perwakilan adat di pedalaman. Upacara peresmian dihadiri oleh utusan resmi dari berbagai negara, termasuk Australia, Inggris, Prancis, Selandia Baru, serta pejabat Pasifik. Pelantikan ini menjadi bukti nyata kapasitas politik orang asli Papua dalam memegang kendali institusi legislatif modern.`,
    poinKunci: [
      'Parlemen pertama tanah Papua dibentuk secara sah melalui undang-undang pada 5 April 1961.',
      'Mayoritas mutlak kursi parlemen (23 dari 28 orang) dipegang oleh putra asli Papua.',
      'Dihadiri utusan diplomatik internasional negara-negara Pasifik dan Eropa.',
      'Mandat utama dewan: merumuskan arah kemerdekaan dan bentuk kedaulatan bangsa Papua.'
    ],
    tokohPenting: ['J.H.F. Sollewijn Gelpke (Ketua Pertama)', 'Nicolaas Jouwe (Wakil Ketua)', 'Markus Kaisiepo', 'Nicolaas Tanggahma'],
    dokumenTerkaitIds: ['arsip-007', 'arsip-008'],
    gambarUrl: '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg'
  },
  {
    id: 'periode-5',
    nomorUrut: 5,
    rentangTahun: '1 Desember 1961',
    judul: 'Peristiwa 1 Desember 1961 & Manifesto Politik',
    deskripsiSingkat: 'Pengibaran resmi bendera nasional Bintang Kejora, lagu kebangsaan Hai Tanahku Papua, lambang negara Burung Mambruk, dan Manifesto Politik Papua.',
    narasiPanjang: `Menindaklanjuti sidang paripurna Nieuw Guinea Raad pada bulan Oktober 1961, Komite Nasional Papua mengeluarkan Manifesto Politik yang menetapkan identitas kebangsaan bangsa Papua. Gubernur J.P. Plateel mengeluarkan ordonansi resmi yang mengizinkan pengibaran bendera nasional berdampingan dengan bendera Kerajaan Belanda.

Pada pagi hari tanggal 1 Desember 1961, dalam upacara khidmat di seluruh distrik tanah Papua, bendera nasional 'Morgenster' (Bintang Kejora) pertama kali dikibarkan secara resmi diiringi lagu kebangsaan 'Hai Tanahku Papua' karya I.S. Kijne. Tanggal ini dipandang oleh bangsa Papua sebagai hari proklamasi embrio kedaulatan politik dan manifestasi lahirnya identitas nasional yang utuh.`,
    poinKunci: [
      'Penerbitan Manifesto Politik Komite Nasional Papua 19 Oktober 1961.',
      'Pengibaran resmi Bendera Bintang Kejora di samping Bendera Belanda pada 1 Desember 1961.',
      'Penetapan Lagu Kebangsaan "Hai Tanahku Papua" dan Lambang Burung Mambruk berselogan "E Mauto Nin Vie".',
      'Pengakuan nama resmi wilayah sebagai West Papua (Papua Barat) dan nama bangsa sebagai Bangsa Papua.'
    ],
    tokohPenting: ['Nicolaas Jouwe', 'E.J. Bonay', 'Markus Kaisiepo', 'Willem Zonggonao', 'Herman Womsiwor'],
    dokumenTerkaitIds: ['arsip-009', 'arsip-010']
  },
  {
    id: 'periode-6',
    nomorUrut: 6,
    rentangTahun: '15 Agustus 1962',
    judul: 'Perjanjian New York 1962 (New York Agreement)',
    deskripsiSingkat: 'Perjanjian bilateral Belanda–Indonesia di bawah tekanan diplomasi Perang Dingin AS (Rencana Bunker), tanpa keterlibatan langsung delegasi Papua.',
    narasiPanjang: `Dinamika geopolitik Perang Dingin mencapai puncaknya ketika Presiden AS John F. Kennedy, yang khawatir Indonesia akan berpaling sepenuhnya ke blok Uni Soviet pasca-pembelian senjata besar-besaran, menunjuk diplomat Ellsworth Bunker untuk menekan Belanda agar menyerahkan wilayah Papua Barat kepada Republik Indonesia.

Pada 15 Agustus 1962, tanpa satu pun perwakilan rakyat Papua dilibatkan di meja perundingan, ditandatanganilah Perjanjian New York di Markas Besar PBB. Pasal XVIII hingga XXII perjanjian ini memuat klausul kewajiban internasional bahwa Indonesia harus melaksanakan Penentuan Nasib Sendiri (Act of Free Choice) bagi seluruh penduduk asli Papua sebelum akhir tahun 1969 di bawah pengawasan PBB dengan prinsip satu orang satu suara ('one man one vote').`,
    poinKunci: [
      'Ditandatangani di Markas Besar PBB New York pada 15 Agustus 1962 oleh Subandrio dan Van Roijen.',
      'Rakyat Papua sama sekali tidak diikutsertakan sebagai pihak penandatangan traktat.',
      'Pasal XVIII mewajibkan pelaksanaan plebisit penentuan nasib sendiri sebelum akhir 1969.',
      'Pengalihan wilayah melalui mandat transisi badan sementara PBB (UNTEA).'
    ],
    tokohPenting: ['Ellsworth Bunker', 'John F. Kennedy', 'Subandrio', 'J.H. van Roijen', 'U Thant'],
    dokumenTerkaitIds: ['arsip-011', 'arsip-012'],
    gambarUrl: '/src/assets/images/arsip_dokumen_sejarah_1794381197550.jpg'
  },
  {
    id: 'periode-7',
    nomorUrut: 7,
    rentangTahun: '1 Oktober 1962 – 1 Mei 1963',
    judul: 'Pemerintahan Transisi UNTEA (PBB)',
    deskripsiSingkat: 'Badan Otoritas Eksekutif Sementara PBB (UNTEA) memegang kendali administratif, penempatan pasukan keamanan PBB (UNSF), dan pembubaran institusi lokal.',
    narasiPanjang: `Sebagai pelaksanaan Perjanjian New York, kekuasaan administratif Kerajaan Belanda atas Papua Barat resmi diserahkan kepada United Nations Temporary Executive Authority (UNTEA) pada 1 Oktober 1962. Ini adalah kali pertama dalam sejarah di mana PBB menjalankan pemerintahan administratif langsung atas suatu wilayah berpenduduk.

PBB menempatkan Pasukan Keamanan PBB (United Nations Security Force / UNSF) yang sebagian besar beranggotakan kontingen militer Pakistan. Selama periode transisi tujuh bulan ini, pegawai administrasi Belanda ditarik pulang, mata uang gulden Nugini ditarik, dan tekanan politik mulai dialami para aktivis Papua. Kendati mandat awal menjanjikan perlindungan hak sipil, UNTEA secara bertahap menyerahkan instrumen kekuasaan sipil dan keamanan kepada aparat Indonesia.`,
    poinKunci: [
      'UNTEA menjadi pemerintahan langsung pertama yang dijalankan oleh badan PBB di dunia.',
      'Penempatan 1.500 pasukan penjaga perdamaian PBB dari Pakistan (UNSF).',
      'Penurunan bendera Belanda dan pengibaran bendera PBB berdampingan dengan bendera Indonesia.',
      'Pembatasan ruang gerak para pemimpin nasionalis Papua dan penghentian terbitan dewan.'
    ],
    tokohPenting: ['Djalal Abdoh (Administrator UNTEA)', 'Brigjen Said Uddin Khan (Komandan UNSF)', 'U Thant'],
    dokumenTerkaitIds: ['arsip-013', 'arsip-014']
  },
  {
    id: 'periode-8',
    nomorUrut: 8,
    rentangTahun: '1 Mei 1963 – 1968',
    judul: 'Peralihan Administrasi 1963 & Awal Perlawanan',
    deskripsiSingkat: 'Penyerahan otoritas penuh kepada Indonesia pada 1 Mei 1963, pembubaran Nieuw Guinea Raad, sensor politik, dan meletusnya perlawanan Manokwari 1965.',
    narasiPanjang: `Tepat pada 1 Mei 1963, UNTEA secara resmi mengalihkan administrasi pemerintahan kepada Pemerintah Republik Indonesia. Kota Hollandia berganti nama menjadi Kotabaru (kemudian Sukarnopura). Parlemen Nieuw Guinea Raad dibubarkan dan digantikan oleh Dewan Perwakilan Rakyat Daerah Gotong Royong (DPRD-GR) yang ditunjuk.

Pengibaran bendera Bintang Kejora dan menyanyikan lagu Hai Tanahku Papua dilarang melalui Penetapan Presiden No. 8/1963. Kebijakan ini memicu kekecewaan luas di kalangan penduduk Papua. Pada bulan Juli 1965 di Manokwari, meletus perlawanan bersenjata pertama dipimpin oleh mantan anggota Korps Relawan Papua (Papoea Vrijwilligers Korps / PVK) seperti Permenas Ferry Awom dan Lodewijk Mandatjan yang menandai lahirnya Organisasi Papua Merdeka (OPM).`,
    poinKunci: [
      'Penyerahan kendali administratif dari PBB kepada Indonesia pada 1 Mei 1963.',
      'Pembubaran Nieuw Guinea Raad dan pelarangan simbol-simbol nasional Papua.',
      'Meletusnya perlawanan bersenjata pertama di Manokwari pada 28 Juli 1965 (Peristiwa Kebar).',
      'Pemberlakuan status daerah operasi dan pembersihan aparatur pro-kemerdekaan.'
    ],
    tokohPenting: ['Permenas Ferry Awom', 'Lodewijk Mandatjan', 'Eliezer Jan Bonay', 'Brigjen R. Kartidjo'],
    dokumenTerkaitIds: ['arsip-015', 'arsip-016']
  },
  {
    id: 'periode-9',
    nomorUrut: 9,
    rentangTahun: '14 Juli – 2 Agustus 1969',
    judul: 'Pelaksanaan Pepera 1969 (Act of Free Choice)',
    deskripsiSingkat: 'Pelaksanaan plebisit melalui sistem musyawarah 1.025 orang delegasi pilihan, laporan Ortiz Sanz di Sidang PBB, dan adopsi Resolusi 2504.',
    narasiPanjang: `Pada Juli–Agustus 1969, Indonesia menyelenggarakan Penentuan Pendapat Rakyat (Pepera) sesuai mandat Perjanjian New York. Namun alih-alih menggunakan prinsip satu orang satu suara ('one man one vote') sebagaimana lazimnya praktik plebisit dekolonisasi PBB, Indonesia menerapkan metode musyawarah konsensus melalui 1.025 orang anggota dewan musyawarah yang dipilih dan dikarantina di bawah pengawasan ketat militer.

Seluruh 1.025 orang tersebut dengan suara bulat menyatakan memilih bergabung dengan Indonesia. Utusan Khusus PBB Fernando Ortiz Sanz dalam laporan resminya (Dokumen A/7723) menyatakan bahwa tindakan penentuan nasib sendiri tidak dilaksanakan sesuai dengan praktik internasional yang lazim. Pada 19 November 1969, Majelis Umum PBB mengesahkan Resolusi 2504 (XXIV) yang 'mencatat' (takes note of) laporan tersebut tanpa menyatakan pengesahan substansi kemerdekaan.`,
    poinKunci: [
      'Pelaksanaan musyawarah 1.025 orang mewakili sekitar 800.000 penduduk asli Papua.',
      'Laporan Duta Besar PBB Fernando Ortiz Sanz (UN Document A/7723) yang mengkritik proses.',
      'Pengesahan Resolusi PBB 2504 (XXIV) dengan 84 setuju, 0 menolak, dan 30 abstain (terutama negara Afrika).',
      'Perdebatan yuridis internasional yang berkepanjangan mengenai keabsahan pelaksanaan Pepera.'
    ],
    tokohPenting: ['Fernando Ortiz Sanz (Utusan PBB)', 'Jenderal Ali Moertopo', 'Frans Kaisiepo', 'Sudjarwo Tjondronegoro'],
    dokumenTerkaitIds: ['arsip-017', 'arsip-018']
  },
  {
    id: 'periode-10',
    nomorUrut: 10,
    rentangTahun: '1970 – 1998',
    judul: 'Perkembangan Gerakan Politik Papua & Era Militeristik',
    deskripsiSingkat: 'Proklamasi Kemerdekaan Papua Barat 1971 di Markas Victoria, perlawanan gerilya hutan, diaspora politik di Eropa, dan resistensi kebudayaan Arnold Ap.',
    narasiPanjang: `Pasca-Pepera 1969, gerakan perlawanan bertransformasi menjadi dua sayap: sayap perlawanan bersenjata di hutan-hutan pedalaman dan perbatasan Papua Nugini, serta sayap diplomasi diaspora di Belanda, Swedia, Senegal, dan forum Pasifik. Pada 1 Juli 1971 di Markas Victoria (Warits), Seth Jafet Rumkorem memproklamasikan berdirinya Republik Papua Barat dengan konstitusi sementara.

Sepanjang dasawarsa 1970-an dan 1980-an, tanah Papua ditetapkan sebagai Daerah Operasi Militer (DOM). Operasi militer berskala besar seperti Operasi Tumpas (1977) menelan korban sipil yang sangat besar di daerah Lembah Baliem dan Enarotali. Pada masa yang sama, perlawanan kultural mencuat melalui kelompok musik Mambesak yang dipimpin budayawan dan antropolog Arnold Clemens Ap, yang dibunuh pada April 1984 karena membangkitkan kebanggaan identitas budaya Papua.`,
    poinKunci: [
      'Proklamasi Republik Papua Barat 1 Juli 1971 di Markas Victoria oleh Seth Jafet Rumkorem.',
      'Pemberlakuan Daerah Operasi Militer (DOM) dan eksodus pengungsi ke Papua Nugini (PNG).',
      'Gerakan revitalisasi budaya Mambesak dan pembunuhan budayawan Arnold Ap (1984).',
      'Pembentukan jaringan diplomasi diaspora di Eropa dan Pasifik oleh Nicolaas Jouwe dan Moses Werror.'
    ],
    tokohPenting: ['Seth Jafet Rumkorem', 'Jacob Hendrik Prai', 'Arnold Clemens Ap', 'Kelly Kwalik', 'Moses Werror'],
    dokumenTerkaitIds: ['arsip-019', 'arsip-020']
  },
  {
    id: 'periode-11',
    nomorUrut: 11,
    rentangTahun: '1998 – 2014',
    judul: 'Papua Spring, Kongres Papua II, & Kebangkitan Diplomasi',
    deskripsiSingkat: 'Musyawarah Besar 2000, Kongres Rakyat Papua II, pembentukan Presidium Dewan Papua (PDP), pembunuhan Theys Eluay, dan Otonomi Khusus.',
    narasiPanjang: `Jatuhnya rezim Orde Baru pada Mei 1998 memicu gelombang emansipasi politik terbuka yang dikenal sebagai 'Papua Spring'. Pada 26 Februari 1999, Tim 100 yang beranggotakan para tokoh terkemuka Papua dipimpin Tom Beanal menemui Presiden B.J. Habibie di Istana Negara dan secara tegas menyampaikan aspirasi agar rakyat Papua diberi kemerdekaan.

Pada Mei–Juni 2000, diselenggarakan Kongres Rakyat Papua II di Jayapura yang dihadiri puluhan ribu delegasi rakyat. Kongres membentuk Presidium Dewan Papua (PDP) diketuai Theys Hiyo Eluay. Pemerintah Indonesia kemudian menawarkan Undang-Undang Otonomi Khusus No. 21/2001. Tragedi pembunuhan Theys Eluay pada 10 November 2001 mengguncang nurani internasional dan menegaskan tuntutan penegakan hukum dan dialog bermartabat.`,
    poinKunci: [
      'Pertemuan delegasi Tim 100 dengan Presiden B.J. Habibie di Istana Merdeka 1999.',
      'Penyelenggaraan Musyawarah Besar (Mubes) dan Kongres Rakyat Papua II tahun 2000.',
      'Pemberlakuan UU No. 21 Tahun 2001 tentang Otonomi Khusus bagi Provinsi Papua.',
      'Pembunuhan Ketua Presidium Dewan Papua Theys Hiyo Eluay pada 10 November 2001.'
    ],
    tokohPenting: ['Theys Hiyo Eluay', 'Tom Beanal', 'Willy Mandowen', 'Thaha Alhamid', 'John Rumbiak'],
    dokumenTerkaitIds: ['arsip-021', 'arsip-022'],
    gambarUrl: '/src/assets/images/diplomasi_pbb_papua_1794381198400.jpg'
  },
  {
    id: 'periode-12',
    nomorUrut: 12,
    rentangTahun: '2014 – Sekarang',
    judul: 'Perkembangan Papua Kontemporer & Internasionalisasi',
    deskripsiSingkat: 'Konsolidasi diplomatik Pasifik, status observer di MSG, krisis kemanusiaan pengungsi internal, dan perdebatan legal hak asasi manusia modern.',
    narasiPanjang: `Dalam satu dekade terakhir, isu Papua mengalami internasionalisasi yang semakin meluas di panggung global. Pembentukan United Liberation Movement for West Papua (ULMWP) di Port Vila pada Desember 2014 menghasilkan status pengamat (observer) dalam Melanesian Spearhead Group (MSG). Negara-negara kepulauan Pasifik seperti Vanuatu secara konsisten mengangkat pelanggaran hak asasi manusia di Sidang Majelis Umum PBB.

Di lapangan, konflik bersenjata dan pengerahan aparat keamanan terus berdampak pada puluhan ribu pengungsi internal (IDPs) di wilayah Nduga, Intan Jaya, Puncak, dan Maybrat. Di samping itu, protes damai penolakan pemekaran Daerah Otonomi Baru (DOB) dan revisi UU Otsus menunjukkan kesenjangan antara kebijakan pembangunan infrastruktur pemerintah pusat dengan aspirasi martabat dan keadilan sosio-politik rakyat Papua.`,
    poinKunci: [
      'Pembentukan kesatuan payung politik diaspora dan internal di Port Vila (2014).',
      'Advokasi hak asasi manusia di Dewan HAM PBB Jenewa dan Sidang Majelis Umum PBB.',
      'Krisis kemanusiaan dan gelombang pengungsi internal (IDP) di wilayah pegunungan tengah.',
      'Perdebatan perpanjangan dan efektivitas Otonomi Khusus serta pemekaran DOB di tanah Papua.'
    ],
    tokohPenting: ['Tokoh Gereja Papua', 'Aktivis Aliansi Mahasiswa Papua (AMP)', 'Dewan Adat Papua (DAP)', 'Pembela HAM Sipil'],
    dokumenTerkaitIds: ['arsip-023', 'arsip-024']
  }
];
