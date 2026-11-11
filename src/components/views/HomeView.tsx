import React, { useState, useEffect } from 'react';
import { 
  MenuNavigasi, 
  DokumenArsip, 
  ArtikelBlogger, 
  BeritaPortalItem, 
  BahasaAktif 
} from '../../types';
import { koleksiBeritaPortal } from '../../data/portalBeritaData';
import { koleksiDokumenArsip } from '../../data/archiveDocuments';
import { koleksiGaleriFoto } from '../../data/photoGallery';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  Eye, 
  Radio, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  Share2, 
  Bookmark, 
  Globe2, 
  ShieldCheck, 
  Award, 
  FileText, 
  Layers, 
  Mail, 
  CheckCircle2, 
  Building 
} from 'lucide-react';

interface HomeViewProps {
  padaPilihNavigasi: (halaman: MenuNavigasi) => void;
  padaPilihDokumen: (dokumen: DokumenArsip) => void;
  padaPilihArtikel: (artikel: ArtikelBlogger) => void;
  padaPilihBerita?: (berita: BeritaPortalItem) => void;
  artikelBlogger: ArtikelBlogger[];
  memuatBlogger: boolean;
  padaMuatUlangBlogger: () => void;
  bahasa?: BahasaAktif;
}

export const HomeView: React.FC<HomeViewProps> = ({
  padaPilihNavigasi,
  padaPilihDokumen,
  padaPilihArtikel,
  padaPilihBerita,
  artikelBlogger,
  memuatBlogger,
  padaMuatUlangBlogger,
  bahasa = 'id'
}) => {
  // Slider Berita Utama
  const daftarSlider = koleksiBeritaPortal.filter(b => b.isSlider || b.isHeadline);
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderAktif = daftarSlider[sliderIndex] || koleksiBeritaPortal[0];

  // Touch swipe support for Hero Slider
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto rotate slider every 7 seconds
  useEffect(() => {
    if (daftarSlider.length <= 1) return;
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % daftarSlider.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [daftarSlider.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      // Swipe left -> next
      setSliderIndex((prev) => (prev + 1) % daftarSlider.length);
    } else if (diff < -50) {
      // Swipe right -> prev
      setSliderIndex((prev) => (prev - 1 + daftarSlider.length) % daftarSlider.length);
    }
    setTouchStartX(null);
  };

  // Section C Groups
  const headlinesPilihan = koleksiBeritaPortal.filter(b => b.isHeadline && b.id !== sliderAktif.id).slice(0, 3);
  const beritaPapua = koleksiBeritaPortal.filter(b => b.kategori === 'papua' || b.kategori === 'sejarah_papua');
  const beritaMelanesiaPasifik = koleksiBeritaPortal.filter(b => b.kategori === 'melanesia' || b.kategori === 'pasifik');
  const beritaIndonesiaDunia = koleksiBeritaPortal.filter(b => b.kategori === 'indonesia' || b.kategori === 'dunia' || b.kategori === 'australia_nz');
  const beritaPolitikDiplomasi = koleksiBeritaPortal.filter(b => b.kategori === 'politik' || b.kategori === 'diplomasi');
  const beritaHukumHAM = koleksiBeritaPortal.filter(b => b.kategori === 'hukum_ham' || b.kategori === 'kemanusiaan');
  const beritaEkonomiPendidikanKesehatan = koleksiBeritaPortal.filter(b => b.kategori === 'ekonomi' || b.kategori === 'pendidikan' || b.kategori === 'kesehatan');
  const beritaBudayaSejarah = koleksiBeritaPortal.filter(b => b.kategori === 'budaya' || b.kategori === 'sejarah_papua' || b.kategori === 'nieuw_guinea_raad');
  const beritaInvestigasiOpini = koleksiBeritaPortal.filter(b => b.kategori === 'investigasi' || b.kategori === 'opini');

  // Most Read / Trending (Sorted by dibacaCount desc)
  const beritaTrending = [...koleksiBeritaPortal].sort((a, b) => (b.dibacaCount || 0) - (a.dibacaCount || 0)).slice(0, 5);

  // Newsletter State
  const [emailLangganan, setEmailLangganan] = useState('');
  const [langgananSukses, setLanggananSukses] = useState(false);

  const handleLangganan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailLangganan) return;
    setLanggananSukses(true);
    setTimeout(() => {
      setEmailLangganan('');
      setLanggananSukses(false);
    }, 4000);
  };

  return (
    <div className="space-y-16 pb-24 bg-[#0E1726] text-slate-100 font-sans selection:bg-[#B99A55] selection:text-[#101C2C]">
      
      {/* ============================================================ */}
      {/* 1 & 2. HERO SLIDER BERITA UTAMA & HEADLINE PILIHAN REDAKSI */}
      {/* ============================================================ */}
      <section className="border-b border-[#B99A55]/20 bg-[#101C2C] pt-6 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* HERO SLIDER (8 Cols on Desktop) */}
            <div 
              className="lg:col-span-8 space-y-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative group overflow-hidden rounded bg-[#0A121D] border border-[#B99A55]/30 aspect-[16/9] shadow-2xl">
                <img
                  src={sliderAktif.gambarUrl || '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg'}
                  alt={sliderAktif.judul}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Slider Controls Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-mono tracking-wider font-bold bg-[#C62828] text-white uppercase rounded shadow">
                    {sliderAktif.kategoriLabel}
                  </span>
                  {sliderAktif.isBreakingNews && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-[#C62828] uppercase rounded shadow flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <button
                    onClick={() => setSliderIndex((sliderIndex - 1 + daftarSlider.length) % daftarSlider.length)}
                    className="p-2 bg-black/70 hover:bg-[#B99A55] text-white hover:text-[#101C2C] rounded-full transition-all cursor-pointer backdrop-blur-sm"
                    aria-label="Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSliderIndex((sliderIndex + 1) % daftarSlider.length)}
                    className="p-2 bg-black/70 hover:bg-[#B99A55] text-white hover:text-[#101C2C] rounded-full transition-all cursor-pointer backdrop-blur-sm"
                    aria-label="Selanjutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Slider Content Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 space-y-2">
                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#DFB76C]" />
                      {sliderAktif.tanggal} · {sliderAktif.waktuRilis || 'Redaksi'}
                    </span>
                    <span>·</span>
                    <span className="text-[#DFB76C] font-semibold">{sliderAktif.lokasiLiputan}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {sliderAktif.judul}
                  </h2>

                  {sliderAktif.subjudul && (
                    <p className="hidden sm:block text-slate-300 text-sm font-sans line-clamp-2">
                      {sliderAktif.subjudul}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Oleh <span className="text-white font-medium">{sliderAktif.penulis}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (padaPilihBerita) padaPilihBerita(sliderAktif);
                        else padaPilihNavigasi('portal_berita');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B99A55] hover:bg-[#DFB76C] text-[#101C2C] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md"
                    >
                      <span>Baca Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {daftarSlider.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSliderIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === sliderIndex ? 'w-8 bg-[#B99A55]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3. HEADLINE PILIHAN REDAKSI (4 Cols Desktop) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between border-b border-[#B99A55]/40 pb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#DFB76C]" />
                  <span className="text-xs font-serif font-bold text-[#DFB76C] uppercase tracking-wider">
                    Headline Pilihan Redaksi
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Terkurasi</span>
              </div>

              <div className="space-y-4">
                {headlinesPilihan.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (padaPilihBerita) padaPilihBerita(item);
                      else padaPilihNavigasi('portal_berita');
                    }}
                    className="p-3.5 bg-[#0C1523] border border-slate-800 hover:border-[#B99A55]/50 transition-all rounded group cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-[#DFB76C] font-semibold">{item.kategoriLabel}</span>
                      <span>{item.tanggal}</span>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[#DFB76C] transition-colors leading-snug">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans line-clamp-2">
                      {item.ringkasan}
                    </p>
                  </div>
                ))}
              </div>

              {/* Banner NGR Intelligence Card */}
              <div 
                onClick={() => padaPilihNavigasi('ngr_intelligence')}
                className="p-4 bg-gradient-to-br from-[#121F33] to-[#0A121D] border border-[#DFB76C]/40 rounded shadow-md group cursor-pointer hover:border-[#DFB76C] transition-all"
              >
                <div className="flex items-center gap-2 text-[#DFB76C] mb-1">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span className="text-xs font-serif font-bold tracking-wider uppercase">NGR Intelligence AI</span>
                </div>
                <p className="text-xs text-slate-300 font-sans mb-3">
                  10 mode AI penelitian dokumen, ringkasan PDF, dan linimasa sejarah Papua terverifikasi.
                </p>
                <div className="text-[11px] text-[#DFB76C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Mulai Konsultasi Pengetahuan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. BERITA TERBARU & FEED BLOGGER RESMI */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#B99A55]/30 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#DFB76C] uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>Sumber Resmi: nieuw-guinea-raad.blogspot.com</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Warta &amp; Publikasi Terbaru
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={padaMuatUlangBlogger}
              disabled={memuatBlogger}
              className="text-xs px-3 py-1.5 rounded bg-[#101C2C] border border-slate-700 hover:border-[#B99A55] text-slate-300 hover:text-white transition-colors"
            >
              {memuatBlogger ? 'Memperbarui...' : 'Sinkronkan Feed'}
            </button>
            <button
              onClick={() => padaPilihNavigasi('portal_berita')}
              className="text-xs font-bold text-[#DFB76C] hover:text-white flex items-center gap-1"
            >
              <span>Semua Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grid 4 Kolom Berita Terkini */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {koleksiBeritaPortal.slice(0, 4).map((berita) => (
            <div
              key={berita.id}
              onClick={() => {
                if (padaPilihBerita) padaPilihBerita(berita);
                else padaPilihNavigasi('portal_berita');
              }}
              className="bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/50 transition-all rounded overflow-hidden flex flex-col justify-between group cursor-pointer shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={berita.gambarUrl || '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg'}
                  alt={berita.judul}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-[#DFB76C] uppercase border border-[#B99A55]/30">
                  {berita.kategoriLabel}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-[11px] text-slate-400">
                    {berita.tanggal} · {berita.lokasiLiputan}
                  </div>
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-[#DFB76C] transition-colors line-clamp-2">
                    {berita.judul}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans line-clamp-2">
                    {berita.ringkasan}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{berita.penulis}</span>
                  <span className="flex items-center gap-1 text-[#DFB76C]">
                    <Eye className="w-3 h-3" />
                    {berita.dibacaCount?.toLocaleString() || '1,200'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5, 6, 7. SEKSI KAWASAN: PAPUA, MELANESIA & PASIFIK, DUNIA */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ROW 1: Berita Papua & Berita Melanesia-Pasifik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Kolom Berita Papua */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#B99A55] pb-2">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#B99A55] rounded-full"></span>
                Kanal Tanah Papua
              </h3>
              <button
                onClick={() => padaPilihNavigasi('kategori_papua')}
                className="text-xs text-[#DFB76C] hover:text-white font-semibold flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {beritaPapua.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (padaPilihBerita) padaPilihBerita(item);
                    else padaPilihNavigasi('portal_berita');
                  }}
                  className="p-3 bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/40 rounded transition-all group cursor-pointer flex gap-4"
                >
                  <img
                    src={item.gambarUrl || '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg'}
                    alt={item.judul}
                    className="w-24 h-20 object-cover rounded shrink-0 bg-black"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="text-[10px] text-[#DFB76C] font-mono">{item.tanggal} · {item.lokasiLiputan}</div>
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#DFB76C] transition-colors line-clamp-2">
                      {item.judul}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.ringkasan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Berita Melanesia & Pasifik */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#B99A55] pb-2">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#B99A55] rounded-full"></span>
                Melanesia &amp; Pasifik Selatan
              </h3>
              <button
                onClick={() => padaPilihNavigasi('kategori_pasifik')}
                className="text-xs text-[#DFB76C] hover:text-white font-semibold flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {beritaMelanesiaPasifik.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (padaPilihBerita) padaPilihBerita(item);
                    else padaPilihNavigasi('portal_berita');
                  }}
                  className="p-3 bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/40 rounded transition-all group cursor-pointer flex gap-4"
                >
                  <img
                    src={item.gambarUrl || '/src/assets/images/diplomasi_pbb_papua_1794381198400.jpg'}
                    alt={item.judul}
                    className="w-24 h-20 object-cover rounded shrink-0 bg-black"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="text-[10px] text-[#DFB76C] font-mono">{item.tanggal} · {item.lokasiLiputan}</div>
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#DFB76C] transition-colors line-clamp-2">
                      {item.judul}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.ringkasan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* ============================================================ */}
      {/* 8, 9, 10, 11, 12. SEKSI TOPIK TEMATIK & KANAL KHUSUS */}
      {/* ============================================================ */}
      <section className="bg-[#101C2C] py-12 border-y border-[#B99A55]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#DFB76C]">Kanal Tematik &amp; Analisis Hukum</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Politik, Diplomasi, HAM, &amp; Investigasi
              </h2>
            </div>
            <button
              onClick={() => padaPilihNavigasi('portal_berita')}
              className="text-xs text-[#DFB76C] font-semibold hover:underline"
            >
              Semua Kanal &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Kanal Politik & Diplomasi */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#DFB76C] border-b border-[#B99A55]/30 pb-1">
                Politik &amp; Diplomasi
              </h4>
              {beritaPolitikDiplomasi.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (padaPilihBerita) padaPilihBerita(item);
                    else padaPilihNavigasi('portal_berita');
                  }}
                  className="p-3 bg-[#0C1523] rounded border border-slate-800 hover:border-[#B99A55]/40 transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] text-slate-400">{item.tanggal}</span>
                  <h5 className="font-serif text-sm font-semibold text-white group-hover:text-[#DFB76C] transition-colors mt-1">
                    {item.judul}
                  </h5>
                </div>
              ))}
            </div>

            {/* Kanal Hukum, HAM & Kemanusiaan */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#DFB76C] border-b border-[#B99A55]/30 pb-1">
                Hukum, HAM &amp; Kemanusiaan
              </h4>
              {beritaHukumHAM.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (padaPilihBerita) padaPilihBerita(item);
                    else padaPilihNavigasi('portal_berita');
                  }}
                  className="p-3 bg-[#0C1523] rounded border border-slate-800 hover:border-[#B99A55]/40 transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] text-slate-400">{item.tanggal}</span>
                  <h5 className="font-serif text-sm font-semibold text-white group-hover:text-[#DFB76C] transition-colors mt-1">
                    {item.judul}
                  </h5>
                </div>
              ))}
            </div>

            {/* Kanal Investigasi & Opini */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#DFB76C] border-b border-[#B99A55]/30 pb-1">
                Investigasi &amp; Opini
              </h4>
              {beritaInvestigasiOpini.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (padaPilihBerita) padaPilihBerita(item);
                    else padaPilihNavigasi('portal_berita');
                  }}
                  className="p-3 bg-[#0C1523] rounded border border-slate-800 hover:border-[#B99A55]/40 transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] text-slate-400">{item.tanggal}</span>
                  <h5 className="font-serif text-sm font-semibold text-white group-hover:text-[#DFB76C] transition-colors mt-1">
                    {item.judul}
                  </h5>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. MULTIMEDIA SHOWCASE & 14. TRENDING / MOST READ */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MULTIMEDIA SHOWCASE (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#B99A55]/30 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#DFB76C]" />
                <h3 className="font-serif text-xl font-bold text-white">
                  Galeri Multimedia &amp; Rekaman Visual
                </h3>
              </div>
              <button
                onClick={() => padaPilihNavigasi('galeri_sejarah')}
                className="text-xs text-[#DFB76C] font-semibold hover:underline"
              >
                Buka Galeri Lengkap &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {koleksiGaleriFoto.slice(0, 3).map((foto) => (
                <div
                  key={foto.id}
                  onClick={() => padaPilihNavigasi('galeri_sejarah')}
                  className="bg-[#101C2C] border border-slate-800 rounded overflow-hidden group cursor-pointer hover:border-[#B99A55]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <img
                      src={foto.gambarUrl}
                      alt={foto.judul}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] text-[#DFB76C] font-mono">
                      {foto.tahun}
                    </div>
                  </div>
                  <div className="p-3">
                    <h5 className="font-serif text-xs font-bold text-white line-clamp-2 group-hover:text-[#DFB76C]">
                      {foto.judul}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">{foto.lokasi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 14. TRENDING / MOST READ (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#B99A55]/30 pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C62828]" />
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                  Terpopuler (1-5)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Minggu Ini</span>
            </div>

            <div className="space-y-3">
              {beritaTrending.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (padaPilihBerita) padaPilihBerita(item);
                    else padaPilihNavigasi('portal_berita');
                  }}
                  className="p-3 bg-[#101C2C] border border-slate-800 hover:border-[#B99A55] rounded transition-all flex items-start gap-3 group cursor-pointer"
                >
                  <span className="font-serif font-black text-2xl text-[#B99A55] leading-none shrink-0 w-6 text-center">
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#DFB76C] font-mono">{item.kategoriLabel}</span>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-[#DFB76C] transition-colors line-clamp-2">
                      {item.judul}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{item.dibacaCount?.toLocaleString() || '1,000'} dibaca</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 15. KUNJUNGI PUSAT DOKUMENTASI & KALENDER SEJARAH */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Kalender Sejarah */}
          <div 
            onClick={() => padaPilihNavigasi('kalender_sejarah')}
            className="p-6 bg-gradient-to-r from-[#101C2C] to-[#121F33] border border-[#B99A55]/30 rounded group cursor-pointer hover:border-[#B99A55] transition-all shadow-xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B99A55]/20 text-[#DFB76C] text-xs font-serif uppercase tracking-widest rounded">
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender Sejarah Bangsa Papua</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#DFB76C] transition-colors">
              Kronologi Hari Bersejarah 1855–2014
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Telusuri peristiwa harian per bulan, traktat diplomatik, peristiwa dekolonisasi, dan kirim usulan peristiwa dengan rujukan sumber primer.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-[#DFB76C] font-bold group-hover:translate-x-1 transition-transform">
              <span>Buka Kalender Sejarah</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Direktori Partai & Organisasi */}
          <div 
            onClick={() => padaPilihNavigasi('direktori_organisasi')}
            className="p-6 bg-gradient-to-r from-[#101C2C] to-[#121F33] border border-[#B99A55]/30 rounded group cursor-pointer hover:border-[#B99A55] transition-all shadow-xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B99A55]/20 text-[#DFB76C] text-xs font-serif uppercase tracking-widest rounded">
              <Building className="w-3.5 h-3.5" />
              <span>Direktori Partai &amp; Gerakan Politik</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#DFB76C] transition-colors">
              Arsip Organisasi &amp; Mandat Sejarah
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Dokumentasi resmi PARNA, Komite Nasional Papua 1961, Presidium Dewan Papua (PDP), Dewan Adat Papua, hingga ULMWP dengan rujukan arsip.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-[#DFB76C] font-bold group-hover:translate-x-1 transition-transform">
              <span>Jelajahi Direktori Organisasi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 16. NEWSLETTER & BERLANGGANAN WARTA MEDIA INTERNASIONAL */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#101C2C] via-[#0C1523] to-[#0A121D] border border-[#B99A55]/40 rounded-lg shadow-2xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-serif uppercase tracking-widest text-[#B99A55] font-bold">
              Buletin Berkala Nieuw Guinea Raad
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Berlangganan Warta Media Internasional Papua &amp; Pasifik
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Dapatkan analisis geopolitik berkala, ringkasan risalah PBB, dan publikasi arsip sejarah terbaru langsung ke kotak masuk Anda.
            </p>
          </div>

          {langgananSukses ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs rounded-md max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Terima kasih! Alamat surel Anda telah terdaftar dalam jaringan buletin resmi.</span>
            </div>
          ) : (
            <form onSubmit={handleLangganan} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={emailLangganan}
                onChange={(e) => setEmailLangganan(e.target.value)}
                placeholder="Masukkan alamat surel Anda..."
                className="flex-1 px-4 py-2.5 bg-[#080E18] border border-slate-700 text-xs text-white placeholder-slate-500 rounded focus:border-[#B99A55] focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B99A55] hover:bg-[#DFB76C] text-[#101C2C] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow cursor-pointer whitespace-nowrap"
              >
                Daftar
              </button>
            </form>
          )}

          <div className="text-[11px] text-slate-500 font-mono">
            Privasi terlindungi · Bebas spam · Surel resmi: ngrmediainfo@gmail.com
          </div>
        </div>
      </section>

    </div>
  );
};
