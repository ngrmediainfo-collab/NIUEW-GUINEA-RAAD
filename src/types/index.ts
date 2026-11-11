/**
 * Tipe data komprehensif untuk Portal Dokumentasi, Ensiklopedia, Peta Adat,
 * AI Sejarah, Keamanan, dan Media Internasional NIEUW GUINEA RAAD.
 */

export type StandarKredibilitas = 
  | 'fakta_terverifikasi'
  | 'dokumen_resmi'
  | 'interpretasi_sejarah'
  | 'pandangan_politik'
  | 'opini_penulis'
  | 'perdebatan_hukum';

export type PeranPengguna = 'administrator' | 'editor' | 'reporter' | 'kontributor';

export interface PenggunaAdmin {
  id: string;
  username: string;
  nama: string;
  email: string;
  role: PeranPengguna;
  token?: string;
  mfaEnabled?: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  username: string;
  action: string;
  details: string;
  ip: string;
  status: 'sukses' | 'peringatan' | 'gagal';
}

export type WarnaSorotan = 'emas' | 'kuning' | 'hijau' | 'biru' | 'merah';

export interface AnotasiDokumen {
  id: string;
  dokumenId: string;
  nomorKatalog: string;
  teksDisorot: string;
  catatanPribadi: string;
  warna: WarnaSorotan;
  waktuDibuat: string;
  kategoriCatatan: 'analisis_hukum' | 'fakta_kunci' | 'pertanyaan_riset' | 'kutipan_penting' | 'umum';
}

export interface DokumenArsip {
  id: string;
  nomorKatalog: string;
  judul: string;
  tanggal: string;
  tahun: number;
  periodeId: string;
  kategori: 'dokumen_sejarah' | 'foto_arsip' | 'peta_sejarah' | 'surat_korespondensi' | 'dokumen_pbb' | 'buku_sejarah' | 'penelitian_akademis' | 'kesaksian_sejarah' | 'publikasi_laporan';
  sumber: string;
  jenisSumber: 'Primer' | 'Sekunder';
  standarKredibilitas: StandarKredibilitas;
  ringkasan: string;
  transkripLengkap?: string;
  keteranganKuratorial: string;
  tautanReferensi?: string;
  gambarUrl?: string;
  lokasiPenyimpananAsli?: string;
  kataKunci: string[];
  pdfUrl?: string;
  jumlahHalaman?: number;
}

export interface PeriodeSejarah {
  id: string;
  nomorUrut: number;
  rentangTahun: string;
  judul: string;
  deskripsiSingkat: string;
  narasiPanjang: string;
  poinKunci: string[];
  tokohPenting: string[];
  dokumenTerkaitIds: string[];
  gambarUrl?: string;
}

export interface ArtikelBlogger {
  id: string;
  judul: string;
  tanggalPublikasi: string;
  ringkasan: string;
  kontenHtml: string;
  gambarUrl?: string;
  label: string[];
  tautanAsli: string;
  penulis: string;
}

export interface FotoGaleri {
  id: string;
  nomorRegistrasi: string;
  judul: string;
  tahun: string;
  lokasi: string;
  deskripsi: string;
  fotograferAtauSumber: string;
  kategori: 'politik' | 'kebudayaan' | 'diplomasi' | 'tokoh' | 'peristiwa';
  gambarUrl: string;
}

export interface PublikasiPenelitian {
  id: string;
  nomorPublikasi: string;
  judul: string;
  penulis: string;
  afiliasi: string;
  tahun: number;
  jenis: 'Jurnal' | 'Kertas Kerja' | 'Monograf' | 'Laporan HAM' | 'Analisis Hukum';
  abstrak: string;
  kataKunci: string[];
  tautanUnduh?: string;
  sitasi: {
    apa: string;
    chicago: string;
  };
}

// --- Modul 2: Peta Papua & 7 Wilayah Adat ---
export type KodeWilayahAdat = 'mamta' | 'saireri' | 'domberai' | 'bomberai' | 'ha_anim' | 'la_pago' | 'mee_pago';

export interface TitikPetaSejarah {
  id: string;
  nama: string;
  kategori: 'wilayah_adat' | 'sejarah_ngr' | 'peristiwa' | 'bahasa' | 'budaya' | 'arsip' | 'penelitian';
  wilayahAdat: KodeWilayahAdat;
  lat: number;
  lng: number;
  tahun?: string;
  deskripsiSingkat: string;
  deskripsiLengkap: string;
  sukuAtauBahasa?: string[];
  tokohTerkait?: string[];
  dokumenIdTerkait?: string;
  sumberReferensi: string;
}

export interface WilayahAdatDetail {
  id: KodeWilayahAdat;
  nama: string;
  sebutanLain: string;
  cakupanWilayahGeografis: string[];
  sejarahWilayah: string;
  masyarakatAdatDanSuku: string[];
  rumpunBahasaDaerah: string[];
  tradisiDanBudaya: string;
  tokohMasyarakat: string[];
  sejarahPendidikanDanGereja: string;
  kondisiSosialEkonomi: string;
  fotoDokumentasiUrl: string;
  artikelTerkait: string[];
  sumberReferensi: string[];
}

// --- Modul 3: Tanya Sejarah Papua AI ---
export interface PesanChatAI {
  id: string;
  peran: 'pengguna' | 'asisten';
  waktu: string;
  konten: string;
  sumber?: string[];
  memuat?: boolean;
}

// --- Modul 4: Infografis Sejarah Papua ---
export interface InfografisItem {
  id: string;
  nomor: string;
  judul: string;
  kategori: 
    | 'kronologi'
    | 'ngr_1961'
    | 'desember_1961'
    | 'perjanjian_new_york'
    | 'untea'
    | 'pepera_1969'
    | 'nasionalisme'
    | 'tokoh'
    | 'tujuh_wilayah_adat'
    | 'diplomasi'
    | 'pendidikan'
    | 'politik';
  kategoriLabel: string;
  tahun: string;
  keterangan: string;
  poinDataHistoris: { label: string; nilai: string; konteks: string }[];
  kronologiRingkas: { waktu: string; kejadian: string }[];
  sumberVerifikasi: string;
  referensiDokumen: string;
}

// --- Modul 5: Ensiklopedia Tokoh Sejarah Papua ---
export type KategoriTokoh = 
  | 'tokoh_ngr'
  | 'nasionalisme'
  | 'perjuangan'
  | 'diplomasi'
  | 'pendidikan'
  | 'kebudayaan'
  | 'gereja_masyarakat'
  | 'hak_asasi_manusia';

export interface TokohSejarahPapua {
  id: string;
  namaLengkap: string;
  gelarAtauJulukan?: string;
  tempatLahir?: string;
  tahunLahirWafat: string;
  kategori: KategoriTokoh;
  kategoriLabel: string;
  perspektifHistoris: 'Perintis Kemerdekaan NGR' | 'Tokoh Nasionalisme Kultural' | 'Tokoh Integrasi & Perjanjian' | 'Pemimpin Gereja & HAM' | 'Diplomat Diaspora';
  fotoUrl: string;
  riwayatPendidikan: string[];
  perjalananHidup: string;
  peranSejarah: string;
  pemikiranDanPandanganPolitik: string;
  perjuanganDanKontribusi: string;
  karyaDanPublikasi?: string[];
  sumberSejarah: string[];
}

// --- Modul 7: Ensiklopedia Tabel Sejarah Papua ---
export interface PeristiwaEnsiklopedia {
  id: string;
  tahun: number;
  tanggalLengkap: string;
  peristiwa: string;
  pengertian: string;
  latarBelakang: string;
  tokohTerkait: string[];
  dampakSejarah: string;
  dokumenSumber: string;
  referensi: string;
  topik: 'politik' | 'hukum' | 'diplomasi' | 'kebudayaan' | 'militer' | 'pbb';
  periodeNomor: number;
}

// --- Modul 8: Koleksi Khusus Nieuw Guinea Raad ---
export interface ArsipKhususNGR {
  id: string;
  kodeArsip: string;
  judul: string;
  tanggal: string;
  kategoriKoleksi: 'dokumen_sidang' | 'foto_sidang' | 'biografi_anggota' | 'pidato_pernyataan' | 'dokumen_pemerintah' | 'surat_korespondensi' | 'arsip_1961' | 'dokumen_pbb' | 'buku_penelitian';
  kategoriLabel: string;
  deskripsi: string;
  asalDokumen: string;
  tautanSumber: string;
}

export type BahasaAktif = 'id' | 'en';

// --- Modul 9: Media Berita Internasional (22 Kategori Editorial) ---
export type KategoriBeritaMedia = 
  | 'semua'
  | 'papua'
  | 'indonesia'
  | 'melanesia'
  | 'pasifik'
  | 'australia_nz'
  | 'dunia'
  | 'politik'
  | 'diplomasi'
  | 'hukum_ham'
  | 'kemanusiaan'
  | 'ekonomi'
  | 'pendidikan'
  | 'kesehatan'
  | 'budaya'
  | 'sejarah_papua'
  | 'nieuw_guinea_raad'
  | 'tokoh_papua'
  | 'partai_gerakan'
  | 'investigasi'
  | 'opini'
  | 'multimedia';

export interface BeritaPortalItem {
  id: string;
  judul: string;
  subjudul?: string;
  kategori: KategoriBeritaMedia;
  kategoriLabel: string;
  tanggal: string;
  waktuRilis?: string;
  ringkasan: string;
  isiLengkap: string;
  penulis: string;
  lokasiLiputan: string;
  gambarUrl?: string;
  sumberAsliUrl?: string;
  labelTag: string[];
  isBreakingNews?: boolean;
  isHeadline?: boolean;
  isSlider?: boolean;
  dibacaCount?: number;
  tipeKonten?: 'artikel' | 'foto' | 'video' | 'wawancara' | 'investigasi';
}

// --- Modul F: Kalender Sejarah Bangsa Papua ---
export type TemaPeristiwaKalender =
  | 'masyarakat_adat'
  | 'masa_belanda'
  | 'pembentukan_ngr'
  | 'identitas_nasionalisme'
  | 'diplomasi_internasional'
  | 'new_york_agreement'
  | 'untea'
  | 'penyerahan_1963'
  | 'pepera_1969'
  | 'politik_sosial_pasca1969'
  | 'pendidikan_budaya_gereja'
  | 'kemanusiaan_ham';

export interface PeristiwaKalender {
  id: string;
  hari: number;
  bulan: number; // 1 - 12
  tahun: number;
  tanggalFormat: string;
  judulPeristiwa: string;
  penjelasan: string;
  latarBelakang: string;
  tema: TemaPeristiwaKalender;
  temaLabel: string;
  wilayah: string;
  tokohTerkait: string[];
  dampakSejarah: string;
  sumberPrimer: string;
  catatanPerspektif: string;
  gambarUrl?: string;
  dokumenIdTerkait?: string;
  statusVerifikasi: 'terverifikasi_editor' | 'usulan_kontributor' | 'dalam_kajian';
}

// --- Modul G: Direktori Partai, Gerakan, dan Organisasi Politik Papua ---
export type KategoriOrganisasi =
  | 'partai_politik'
  | 'gerakan_nasional'
  | 'organisasi_diplomasi'
  | 'organisasi_masyarakat_gereja'
  | 'organisasi_pemuda_mahasiswa'
  | 'organisasi_budaya_pendidikan'
  | 'organisasi_perjuangan_historis';

export interface ProfilOrganisasiPolitik {
  id: string;
  namaResmi: string;
  namaLainAtauSingkatan: string;
  kategori: KategoriOrganisasi;
  kategoriLabel: string;
  logoUrl?: string;
  tahunBerdiri: string;
  latarBelakangSejarah: string;
  pendiriDanTokoh: string[];
  tujuanOrganisasi: string;
  perkembanganDanPerubahan: string;
  wilayahAktivitas: string[];
  dokumenDanPernyataanResmi: string[];
  referensiArsip: string[];
  statusVerifikasi: 'Terverifikasi Dokumen Resmi' | 'Dokumentasi Historiografi' | 'Kajian Kontemporer';
  tanggalPembaruan: string;
}

// --- Modul H: Pacific Media Network (Jaringan Media Papua & Pasifik) ---
export interface PacificMediaPartner {
  id: string;
  namaMedia: string;
  negaraWilayah: string;
  tipeMedia: 'Kantor Berita' | 'Surat Kabar' | 'Penyiaran Radio/TV' | 'Portal Digital' | 'Jurnal Independen';
  statusKerjasama: 'mitra_resmi' | 'kontak_korespondensi' | 'calon_mitra';
  kotaKantor: string;
  bahasa: string[];
  fokusLiputan: string[];
  deskripsi: string;
  situsUrl: string;
  korespondenNama?: string;
  kontakEmail?: string;
}

export type MenuNavigasi = 
  | 'beranda'
  | 'tentang_ngr'
  | 'sejarah_papua'
  | 'peta_papua'
  | 'tanya_ai'
  | 'ngr_intelligence'
  | 'infografis'
  | 'tokoh_sejarah'
  | 'kalender_sejarah'
  | 'direktori_organisasi'
  | 'pacific_media_network'
  | 'ensiklopedia_wilayah_adat'
  | 'ensiklopedia_sejarah'
  | 'pusat_dokumentasi_ngr'
  | 'portal_berita'
  | 'pengaturan_keamanan'
  | 'dashboard_editor'
  | 'sejarah_nasionalisme'
  | 'sejarah_perjuangan'
  | 'ngr_1961'
  | 'desember_1961'
  | 'perjanjian_new_york'
  | 'untea'
  | 'pepera_1969'
  | 'gerakan_politik'
  | 'diplomasi_internasional'
  | 'hak_asasi_manusia'
  | 'arsip_dokumen'
  | 'penelitian_publikasi'
  | 'galeri_sejarah'
  | 'hubungi_kami'
  // Kategori Khusus Berita
  | 'kategori_papua'
  | 'kategori_indonesia'
  | 'kategori_melanesia'
  | 'kategori_pasifik'
  | 'kategori_australia_nz'
  | 'kategori_dunia'
  | 'kategori_politik'
  | 'kategori_diplomasi'
  | 'kategori_hukum_ham'
  | 'kategori_kemanusiaan'
  | 'kategori_ekonomi'
  | 'kategori_pendidikan'
  | 'kategori_kesehatan'
  | 'kategori_budaya'
  | 'kategori_investigasi'
  | 'kategori_opini'
  | 'kategori_multimedia';

// --- Modul J: Dashboard Editor & Analitik Blogger ---
export interface MetrikArtikelBlogger {
  id: string;
  judul: string;
  penulis: string;
  tanggalPublikasi: string;
  tautanAsli: string;
  label: string[];
  totalTayangan: number;
  pembacaUnik: number;
  durasiRataRataDetik: number;
  rasioPenyelesaianBaca: number; // Persentase 0-100%
  jumlahKomentar: number;
  jumlahBagikan: number;
  skorKeterlibatan: number; // 0-100
  sumberTrafikUtama: { sumber: string; persentase: number }[];
  sebaranGeografis: { negara: string; persentase: number; bendera: string }[];
  perangkat: { mobile: number; desktop: number; tablet: number };
}

export interface RingkasanTrafikBlogger {
  totalArtikelAktif: number;
  totalTayanganSemua: number;
  totalPembacaUnik: number;
  rataRataDurasiDetik: number;
  totalInteraksi: number;
  rasioPertumbuhanMingguan: number;
  trafikHarian: { tanggal: string; tayangan: number; pembacaUnik: number }[];
  kategoriTerpopuler: { kategori: string; totalTayangan: number; jumlahArtikel: number }[];
  statusSinkronisasi: {
    terakhirSinkron: string;
    domain: string;
    status: 'online' | 'memuat' | 'offline';
  };
}

export interface JadwalLaporanRedaktur {
  id: string;
  emailPenerima: string;
  namaPenerima: string;
  frekuensi: 'bulanan' | 'mingguan';
  hariPengiriman: number;
  waktuKirim: string;
  statusAktif: boolean;
  terakhirTerkirim?: string;
  totalTerkirim: number;
}


