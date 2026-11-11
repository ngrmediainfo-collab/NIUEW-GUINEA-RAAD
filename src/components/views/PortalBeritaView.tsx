import React, { useState, useEffect } from 'react';
import { koleksiBeritaPortal } from '../../data/portalBeritaData';
import { BeritaPortalItem, ArtikelBlogger, KategoriBeritaMedia, BahasaAktif } from '../../types';
import { 
  Globe2, 
  Search, 
  Filter, 
  RefreshCw, 
  Share2, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  User, 
  Tag, 
  Newspaper, 
  Radio, 
  BookOpen, 
  Clock,
  Check,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PortalBeritaViewProps {
  artikelBlogger?: ArtikelBlogger[];
  memuatBlogger?: boolean;
  padaMuatUlangBlogger?: () => void;
  padaPilihArtikelBlogger?: (artikel: ArtikelBlogger) => void;
  kategoriAwal?: KategoriBeritaMedia;
  bahasa?: BahasaAktif;
}

export const PortalBeritaView: React.FC<PortalBeritaViewProps> = ({
  artikelBlogger = [],
  memuatBlogger = false,
  padaMuatUlangBlogger,
  padaPilihArtikelBlogger,
  kategoriAwal = 'semua',
  bahasa = 'id'
}) => {
  const [kategoriTerpilih, setKategoriTerpilih] = useState<KategoriBeritaMedia>(kategoriAwal);
  const [kataKunci, setKataKunci] = useState('');
  const [artikelDetail, setArtikelDetail] = useState<BeritaPortalItem | null>(null);
  const [tersalinId, setTersalinId] = useState<string | null>(null);

  // Update jika kategoriAwal berubah dari luar
  useEffect(() => {
    if (kategoriAwal) {
      setKategoriTerpilih(kategoriAwal);
    }
  }, [kategoriAwal]);

  // 22 Kategori Editorial Berita
  const daftarKategori: { id: KategoriBeritaMedia; labelID: string; labelEN: string }[] = [
    { id: 'semua', labelID: 'Semua Kanal (22)', labelEN: 'All News' },
    { id: 'papua', labelID: 'Tanah Papua', labelEN: 'West Papua' },
    { id: 'indonesia', labelID: 'Indonesia', labelEN: 'Indonesia' },
    { id: 'melanesia', labelID: 'Melanesia (MSG)', labelEN: 'Melanesia' },
    { id: 'pasifik', labelID: 'Pasifik & PBB', labelEN: 'Pacific & UN' },
    { id: 'australia_nz', labelID: 'Australia & NZ', labelEN: 'Australia & NZ' },
    { id: 'dunia', labelID: 'Dunia Internasional', labelEN: 'World' },
    { id: 'politik', labelID: 'Politik', labelEN: 'Politics' },
    { id: 'diplomasi', labelID: 'Diplomasi', labelEN: 'Diplomacy' },
    { id: 'hukum_ham', labelID: 'Hukum & HAM', labelEN: 'Law & Human Rights' },
    { id: 'kemanusiaan', labelID: 'Kemanusiaan', labelEN: 'Humanitarian' },
    { id: 'ekonomi', labelID: 'Ekonomi & SDA', labelEN: 'Economy' },
    { id: 'pendidikan', labelID: 'Pendidikan', labelEN: 'Education' },
    { id: 'kesehatan', labelID: 'Kesehatan', labelEN: 'Health' },
    { id: 'budaya', labelID: 'Budaya & Adat', labelEN: 'Culture' },
    { id: 'sejarah_papua', labelID: 'Sejarah Papua', labelEN: 'History' },
    { id: 'nieuw_guinea_raad', labelID: 'Nieuw Guinea Raad', labelEN: 'NGR 1961' },
    { id: 'tokoh_papua', labelID: 'Tokoh Papua', labelEN: 'Figures' },
    { id: 'partai_gerakan', labelID: 'Partai & Gerakan', labelEN: 'Movements' },
    { id: 'investigasi', labelID: 'Investigasi Khusus', labelEN: 'Investigation' },
    { id: 'opini', labelID: 'Opini & Kolom Redaksi', labelEN: 'Opinion' },
    { id: 'multimedia', labelID: 'Multimedia & Visual', labelEN: 'Multimedia' },
  ];

  // Filter editorial articles
  const beritaTersaring = koleksiBeritaPortal.filter((item) => {
    const cocokKategori = kategoriTerpilih === 'semua' || item.kategori === kategoriTerpilih;
    const cocokCari = 
      item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.ringkasan.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.penulis.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.labelTag.some(t => t.toLowerCase().includes(kataKunci.toLowerCase()));
    return cocokKategori && cocokCari;
  });

  const bagikanArtikel = (item: BeritaPortalItem) => {
    const teks = `${item.judul} - NIEUW GUINEA RAAD: ${item.sumberAsliUrl || 'https://nieuw-guinea-raad.blogspot.com/'}`;
    navigator.clipboard.writeText(teks);
    setTersalinId(item.id);
    setTimeout(() => setTersalinId(null), 2500);
  };

  return (
    <div className="py-10 bg-[#0E1726] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Hero Section */}
        <div className="border border-[#B99A55]/30 bg-gradient-to-br from-[#101C2C] via-[#0E1726] to-[#0A121D] p-8 sm:p-12 relative overflow-hidden shadow-2xl rounded-lg">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B99A55]/15 border border-[#B99A55]/40 text-[#DFB76C] text-xs font-serif tracking-widest uppercase">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{bahasa === 'en' ? 'INTERNATIONAL PAPUA & PACIFIC MEDIA' : 'PORTAL MEDIA INTERNASIONAL PAPUA & PASIFIK'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {bahasa === 'en' ? 'News, Analysis & Archival Dispatches' : 'Warta Peristiwa, Analisis Geopolitik & Catatan Sejarah'}
            </h1>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              Jurnalisme berstandar internasional yang menyajikan informasi independen, analisis traktat dekolonisasi, perkembangan hak asasi manusia, dan dinamika geopolitik Pasifik. Terhubung langsung dengan publikasi resmi Nieuw Guinea Raad.
            </p>

            {/* Blogger Sync Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#0A121D] border border-[#B99A55]/30 rounded">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <span className="text-xs font-mono text-[#DFB76C] uppercase tracking-wider block">Sinkronisasi Jaringan Redaksi</span>
                  <a 
                    href="https://nieuw-guinea-raad.blogspot.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-white underline font-mono flex items-center gap-1"
                  >
                    <span>nieuw-guinea-raad.blogspot.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {padaMuatUlangBlogger && (
                <button
                  onClick={padaMuatUlangBlogger}
                  disabled={memuatBlogger}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#16284C] hover:bg-[#203764] text-[#DFB76C] text-xs font-mono border border-[#B99A55]/30 cursor-pointer disabled:opacity-50 rounded"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${memuatBlogger ? 'animate-spin' : ''}`} />
                  <span>{memuatBlogger ? 'Menyinkronkan...' : 'Segarkan Data'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 22 Kategori Bar & Search Input */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[#101C2C] border border-[#B99A55]/25 p-4 rounded-lg">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#B99A55] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder={bahasa === 'en' ? 'Search dispatches, treaties, figures, or tags...' : 'Cari berita, analisis, dokumen traktat, tokoh, atau topik...'}
                className="w-full bg-[#0A121D] text-slate-100 text-xs pl-10 pr-4 py-2.5 border border-slate-700 rounded focus:border-[#B99A55] focus:outline-none"
              />
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Menampilkan <span className="text-[#DFB76C] font-bold">{beritaTersaring.length}</span> artikel
            </div>
          </div>

          {/* 22 Categories Pill Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {daftarKategori.map((kat) => (
              <button
                key={kat.id}
                onClick={() => setKategoriTerpilih(kat.id)}
                className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-all font-medium cursor-pointer shrink-0 ${
                  kategoriTerpilih === kat.id
                    ? 'bg-[#B99A55] text-[#101C2C] font-bold shadow-md'
                    : 'bg-[#101C2C] text-slate-300 border border-slate-700 hover:border-[#B99A55] hover:text-white'
                }`}
              >
                {bahasa === 'en' ? kat.labelEN : kat.labelID}
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Grid Artikel Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaTersaring.map((item) => (
            <article
              key={item.id}
              className="bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/60 transition-all rounded-lg overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.gambarUrl || '/src/assets/images/hero_nieuw_guinea_raad_1794381196846.jpg'}
                    alt={item.judul}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="bg-black/80 px-2 py-0.5 text-[10px] font-mono text-[#DFB76C] uppercase border border-[#B99A55]/30">
                      {item.kategoriLabel}
                    </span>
                    {item.isBreakingNews && (
                      <span className="bg-[#C62828] text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
                        Breaking
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#DFB76C]" />
                      {item.tanggal}
                    </span>
                    <span>{item.lokasiLiputan}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#DFB76C] transition-colors leading-snug">
                    {item.judul}
                  </h3>

                  {item.subjudul && (
                    <p className="text-xs text-slate-300 font-serif italic line-clamp-2">
                      {item.subjudul}
                    </p>
                  )}

                  <p className="text-xs text-slate-400 font-sans line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-500">Penulis:</span> {item.penulis}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => bagikanArtikel(item)}
                    className="p-1.5 text-slate-400 hover:text-[#DFB76C] transition-colors"
                    title="Bagikan Tautan"
                  >
                    {tersalinId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setArtikelDetail(item)}
                    className="px-3 py-1.5 bg-[#B99A55] hover:bg-[#DFB76C] text-[#101C2C] font-bold text-xs uppercase tracking-wider rounded transition-colors"
                  >
                    Baca
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* FEED BLOGGER NIEUW GUINEA RAAD */}
        {artikelBlogger.length > 0 && (
          <div className="pt-10 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#DFB76C]">Arsip Blogspot Nieuw Guinea Raad</span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Postingan Langsung dari nieuw-guinea-raad.blogspot.com
                </h3>
              </div>
              <a
                href="https://nieuw-guinea-raad.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#DFB76C] hover:underline flex items-center gap-1 font-mono"
              >
                <span>Buka Blog Resmi</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artikelBlogger.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => padaPilihArtikelBlogger && padaPilihArtikelBlogger(blog)}
                  className="bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/50 p-5 rounded-lg space-y-3 cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[#DFB76C] font-mono">{blog.penulis}</span>
                    <span>{blog.tanggalPublikasi}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white group-hover:text-[#DFB76C] transition-colors line-clamp-2">
                    {blog.judul}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans line-clamp-3">
                    {blog.ringkasan}
                  </p>
                  <div className="pt-2 text-xs text-[#DFB76C] font-semibold flex items-center gap-1">
                    <span>Baca Artikel Arsip</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL BACA ARTIKEL LENGKAP */}
      {artikelDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101C2C] border border-[#B99A55]/40 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-mono bg-[#B99A55] text-[#101C2C] font-bold rounded">
                    {artikelDetail.kategoriLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {artikelDetail.lokasiLiputan} · {artikelDetail.tanggal}
                  </span>
                </div>
                <button
                  onClick={() => setArtikelDetail(null)}
                  className="text-slate-400 hover:text-white font-mono text-sm px-2 py-1 rounded bg-slate-800"
                >
                  Tutup ✕
                </button>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                  {artikelDetail.judul}
                </h2>
                {artikelDetail.subjudul && (
                  <p className="font-serif text-sm text-[#DFB76C] italic">
                    {artikelDetail.subjudul}
                  </p>
                )}
              </div>

              {artikelDetail.gambarUrl && (
                <div className="aspect-[16/9] overflow-hidden rounded bg-black">
                  <img
                    src={artikelDetail.gambarUrl}
                    alt={artikelDetail.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-invert max-w-none text-slate-200 text-sm font-sans leading-relaxed whitespace-pre-line">
                {artikelDetail.isiLengkap}
              </div>

              <div className="p-4 bg-[#0A121D] border border-slate-800 rounded space-y-2">
                <div className="text-xs font-mono text-[#B99A55]">Rujukan &amp; Sumber Resmi:</div>
                <p className="text-xs text-slate-300 font-sans">
                  Liputan ini disajikan oleh redaksi NIEUW GUINEA RAAD berdasarkan traktat dekolonisasi PBB, arsip sejarah 1961, dan korespondensi Pasifik.
                </p>
                {artikelDetail.sumberAsliUrl && (
                  <a
                    href={artikelDetail.sumberAsliUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#DFB76C] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>{artikelDetail.sumberAsliUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>

            <div className="p-4 border-t border-slate-800 bg-[#0A121D] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Oleh: {artikelDetail.penulis}</span>
              <button
                onClick={() => setArtikelDetail(null)}
                className="px-4 py-2 bg-[#B99A55] text-[#101C2C] font-bold text-xs uppercase rounded"
              >
                Kembali ke Portal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
