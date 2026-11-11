import React, { useState } from 'react';
import { MenuNavigasi, BahasaAktif } from '../types';
import { koleksiBeritaPortal } from '../data/portalBeritaData';
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Sun,
  Moon,
  Radio,
  Globe2,
  Calendar,
  Building,
  Layers,
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';

interface NavbarProps {
  halamanAktif: MenuNavigasi;
  padaPilihHalaman: (halaman: MenuNavigasi) => void;
  padaBukaPencarian: () => void;
  tema?: 'dark' | 'light';
  padaGantiTema?: () => void;
  bahasa?: BahasaAktif;
  padaGantiBahasa?: (b: BahasaAktif) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  halamanAktif,
  padaPilihHalaman,
  padaBukaPencarian,
  tema = 'dark',
  padaGantiTema,
  bahasa = 'id',
  padaGantiBahasa,
}) => {
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [dropdownKawasanTerbuka, setDropdownKawasanTerbuka] = useState(false);
  const [dropdownTopikTerbuka, setDropdownTopikTerbuka] = useState(false);
  const [dropdownSejarahTerbuka, setDropdownSejarahTerbuka] = useState(false);
  const [dropdownJurnalismeTerbuka, setDropdownJurnalismeTerbuka] = useState(false);

  // Ambil breaking news terkini untuk ticker
  const breakingNewsList = koleksiBeritaPortal.filter(b => b.isBreakingNews);
  const [tickerIndex, setTickerIndex] = useState(0);

  const breakingSaatIni = breakingNewsList[tickerIndex] || koleksiBeritaPortal[0];

  const handleKlikNavigasi = (id: MenuNavigasi) => {
    padaPilihHalaman(id);
    setMenuTerbuka(false);
    setDropdownKawasanTerbuka(false);
    setDropdownTopikTerbuka(false);
    setDropdownSejarahTerbuka(false);
    setDropdownJurnalismeTerbuka(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigasi 22 Kategori & Pilar Media
  const kelompokKawasan: { label: string; id: MenuNavigasi; labelEN: string }[] = [
    { label: 'Papua', id: 'kategori_papua', labelEN: 'West Papua' },
    { label: 'Indonesia', id: 'kategori_indonesia', labelEN: 'Indonesia' },
    { label: 'Melanesia', id: 'kategori_melanesia', labelEN: 'Melanesia' },
    { label: 'Pasifik', id: 'kategori_pasifik', labelEN: 'Pacific' },
    { label: 'Australia & Selandia Baru', id: 'kategori_australia_nz', labelEN: 'Australia & NZ' },
    { label: 'Dunia', id: 'kategori_dunia', labelEN: 'World News' },
  ];

  const kelompokTopik: { label: string; id: MenuNavigasi; labelEN: string }[] = [
    { label: 'Politik', id: 'kategori_politik', labelEN: 'Politics' },
    { label: 'Diplomasi', id: 'kategori_diplomasi', labelEN: 'Diplomacy' },
    { label: 'Hukum & HAM', id: 'kategori_hukum_ham', labelEN: 'Law & Human Rights' },
    { label: 'Kemanusiaan', id: 'kategori_kemanusiaan', labelEN: 'Humanitarian' },
    { label: 'Ekonomi', id: 'kategori_ekonomi', labelEN: 'Economy' },
    { label: 'Pendidikan', id: 'kategori_pendidikan', labelEN: 'Education' },
    { label: 'Kesehatan', id: 'kategori_kesehatan', labelEN: 'Health' },
    { label: 'Budaya', id: 'kategori_budaya', labelEN: 'Culture' },
  ];

  const kelompokSejarah: { label: string; id: MenuNavigasi; labelEN: string }[] = [
    { label: 'Sejarah Papua (12 Periode)', id: 'sejarah_papua', labelEN: 'Papua History (12 Periods)' },
    { label: 'Nieuw Guinea Raad 1961', id: 'ngr_1961', labelEN: 'Nieuw Guinea Raad 1961' },
    { label: 'Kalender Sejarah Bangsa Papua', id: 'kalender_sejarah', labelEN: 'Papua Historical Calendar' },
    { label: 'Tokoh & Pemimpin Papua', id: 'tokoh_sejarah', labelEN: 'Historical Figures' },
    { label: 'Partai & Gerakan Politik', id: 'direktori_organisasi', labelEN: 'Political Parties Directory' },
    { label: '7 Wilayah Adat Papua', id: 'ensiklopedia_wilayah_adat', labelEN: '7 Customary Regions' },
    { label: 'Peta Interaktif Papua', id: 'peta_papua', labelEN: 'Interactive Papua Map' },
    { label: 'Pusat Dokumentasi NGR', id: 'pusat_dokumentasi_ngr', labelEN: 'NGR Archival Center' },
    { label: 'Katalog Arsip Dokumen', id: 'arsip_dokumen', labelEN: 'Document Archives' },
  ];

  const kelompokJurnalisme: { label: string; id: MenuNavigasi; labelEN: string }[] = [
    { label: 'Investigasi', id: 'kategori_investigasi', labelEN: 'Investigation' },
    { label: 'Opini & Kolom', id: 'kategori_opini', labelEN: 'Opinion & Editorial' },
    { label: 'Multimedia & Galeri', id: 'kategori_multimedia', labelEN: 'Multimedia' },
    { label: 'Pacific Media Network', id: 'pacific_media_network', labelEN: 'Pacific Media Network' },
    { label: 'Warta Portal Lengkap', id: 'portal_berita', labelEN: 'All News Portal' },
  ];

  // Horizontal Quick Strip (Paling sering diakses)
  const quickPills: { label: string; id: MenuNavigasi }[] = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Dashboard Editor', id: 'dashboard_editor' },
    { label: 'Papua', id: 'kategori_papua' },
    { label: 'Melanesia', id: 'kategori_melanesia' },
    { label: 'Pasifik', id: 'kategori_pasifik' },
    { label: 'Politik', id: 'kategori_politik' },
    { label: 'Diplomasi', id: 'kategori_diplomasi' },
    { label: 'Hukum & HAM', id: 'kategori_hukum_ham' },
    { label: 'Kalender Sejarah', id: 'kalender_sejarah' },
    { label: 'Partai & Gerakan', id: 'direktori_organisasi' },
    { label: 'NGR Intelligence', id: 'ngr_intelligence' },
    { label: 'Pacific Media', id: 'pacific_media_network' },
  ];

  return (
    <>
      {/* 1. TOP UTILITY BAR (Editorial Standard - Tirto/Reuters/Guardian style) */}
      <div className="bg-[#0A121D] border-b border-[#B99A55]/20 text-slate-300 text-xs px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-[11px] font-sans">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[#B99A55] font-serif tracking-wider uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] animate-pulse"></span>
            INTERNATIONAL PAPUA &amp; PACIFIC MEDIA
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-slate-400 italic">
            "Merekam Peristiwa, Merawat Sejarah, Menghubungkan Dunia"
          </span>
        </div>

        {/* Utilitas Kanan: Bahasa, Tema, NGR Intelligence, Keamanan */}
        <div className="flex items-center gap-3 ml-auto text-xs">
          {/* Dual Language Switcher */}
          <div className="inline-flex items-center bg-[#101C2C] border border-[#B99A55]/30 rounded p-0.5">
            <button
              onClick={() => padaGantiBahasa && padaGantiBahasa('id')}
              className={`px-2 py-0.5 text-[11px] font-semibold tracking-wider rounded transition-colors ${
                bahasa === 'id'
                  ? 'bg-[#B99A55] text-[#101C2C]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => padaGantiBahasa && padaGantiBahasa('en')}
              className={`px-2 py-0.5 text-[11px] font-semibold tracking-wider rounded transition-colors ${
                bahasa === 'en'
                  ? 'bg-[#B99A55] text-[#101C2C]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Shortcut Dashboard Editor */}
          <button
            onClick={() => handleKlikNavigasi('dashboard_editor')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold tracking-wide border transition-all ${
              halamanAktif === 'dashboard_editor'
                ? 'bg-[#B99A55] text-[#101C2C] border-[#B99A55]'
                : 'bg-[#101C2C] text-slate-300 border-slate-700 hover:border-[#B99A55] hover:text-white'
            }`}
            title="Panel Analitik & Trafik Blogger Redaksi"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span>Dashboard Editor</span>
          </button>

          {/* Shortcut NGR Intelligence */}
          <button
            onClick={() => handleKlikNavigasi('ngr_intelligence')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold tracking-wide border transition-all ${
              halamanAktif === 'ngr_intelligence'
                ? 'bg-[#DFB76C] text-[#101C2C] border-[#DFB76C]'
                : 'bg-[#101C2C] text-[#DFB76C] border-[#B99A55]/40 hover:bg-[#16273D]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span>NGR Intelligence</span>
          </button>

          {/* Admin Security */}
          <button
            onClick={() => handleKlikNavigasi('pengaturan_keamanan')}
            className={`p-1.5 rounded transition-colors ${
              halamanAktif === 'pengaturan_keamanan'
                ? 'text-emerald-400 bg-[#16284C]'
                : 'text-slate-400 hover:text-emerald-400 hover:bg-[#101C2C]'
            }`}
            title="Pusat Kendali Keamanan & Admin"
            aria-label="Keamanan Admin"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          {padaGantiTema && (
            <button
              onClick={padaGantiTema}
              className="p-1.5 text-slate-400 hover:text-[#DFB76C] hover:bg-[#101C2C] rounded transition-colors"
              title={tema === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
            >
              {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* 2. BREAKING NEWS TICKER WITH LIVE DOT */}
      {breakingSaatIni && (
        <div className="bg-[#101C2C] border-b border-[#C62828]/40 px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3 text-xs overflow-hidden">
          <div className="shrink-0 flex items-center gap-1.5 bg-[#C62828] text-white px-2.5 py-0.5 rounded font-black text-[10px] tracking-widest uppercase shadow-sm">
            <Radio className="w-3 h-3 animate-ping" />
            <span>BREAKING</span>
          </div>

          <div className="flex-1 truncate text-slate-200">
            <span className="text-[#B99A55] font-serif font-semibold mr-2">[{breakingSaatIni.kategoriLabel}]:</span>
            <button
              onClick={() => handleKlikNavigasi('portal_berita')}
              className="text-slate-200 hover:text-[#DFB76C] transition-colors underline-offset-2 hover:underline cursor-pointer"
            >
              {breakingSaatIni.judul}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 shrink-0 text-slate-500 text-[11px]">
            <span>{breakingSaatIni.waktuRilis || breakingSaatIni.tanggal}</span>
            <button
              onClick={() => setTickerIndex((tickerIndex + 1) % breakingNewsList.length)}
              className="ml-2 px-1.5 py-0.5 rounded bg-[#16253B] text-slate-300 hover:text-white"
              title="Next Breaking News"
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#101C2C]/95 backdrop-blur-md border-b border-[#B99A55]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Logo Media Resmi */}
          <button
            onClick={() => handleKlikNavigasi('beranda')}
            className="flex items-center text-left group whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
            aria-label="Nieuw Guinea Raad"
          >
            <div className="bg-white px-3 py-1.5 rounded border border-[#B99A55]/40 shadow-md flex items-center transition-all group-hover:scale-[1.02]">
              <img
                src="/assets/aistudio/1777983492806-removebg-preview_2f7b52f7.png"
                alt="NIEUW GUINEA RAAD - DEWAN PAPUA"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>
          </button>

          {/* Desktop Dropdown Menus (22 Categories organized neatly) */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-200">
            <button
              onClick={() => handleKlikNavigasi('beranda')}
              className={`py-1 transition-colors cursor-pointer ${
                halamanAktif === 'beranda' ? 'text-[#DFB76C] border-b-2 border-[#B99A55]' : 'hover:text-[#DFB76C]'
              }`}
            >
              Beranda
            </button>

            {/* Kawasan Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownKawasanTerbuka(!dropdownKawasanTerbuka);
                  setDropdownTopikTerbuka(false);
                  setDropdownSejarahTerbuka(false);
                  setDropdownJurnalismeTerbuka(false);
                }}
                className="flex items-center gap-1 py-1 hover:text-[#DFB76C] transition-colors cursor-pointer"
              >
                <span>Kawasan ({kelompokKawasan.length})</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownKawasanTerbuka ? 'rotate-180 text-[#DFB76C]' : ''}`} />
              </button>
              {dropdownKawasanTerbuka && (
                <div className="absolute left-0 mt-3 w-64 bg-[#0A121D] border border-[#B99A55]/40 shadow-2xl py-2 z-50 rounded-b">
                  <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B99A55] border-b border-slate-800">
                    Liputan Geopolitik &amp; Wilayah
                  </div>
                  {kelompokKawasan.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleKlikNavigasi(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                        halamanAktif === item.id
                          ? 'bg-[#16284C] text-[#DFB76C]'
                          : 'text-slate-200 hover:bg-[#121E30] hover:text-white'
                      }`}
                    >
                      <span>{bahasa === 'en' ? item.labelEN : item.label}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Topik Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownTopikTerbuka(!dropdownTopikTerbuka);
                  setDropdownKawasanTerbuka(false);
                  setDropdownSejarahTerbuka(false);
                  setDropdownJurnalismeTerbuka(false);
                }}
                className="flex items-center gap-1 py-1 hover:text-[#DFB76C] transition-colors cursor-pointer"
              >
                <span>Topik Berita ({kelompokTopik.length})</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownTopikTerbuka ? 'rotate-180 text-[#DFB76C]' : ''}`} />
              </button>
              {dropdownTopikTerbuka && (
                <div className="absolute left-0 mt-3 w-64 bg-[#0A121D] border border-[#B99A55]/40 shadow-2xl py-2 z-50 rounded-b">
                  <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B99A55] border-b border-slate-800">
                    Kanal Tematik Redaksi
                  </div>
                  {kelompokTopik.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleKlikNavigasi(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                        halamanAktif === item.id
                          ? 'bg-[#16284C] text-[#DFB76C]'
                          : 'text-slate-200 hover:bg-[#121E30] hover:text-white'
                      }`}
                    >
                      <span>{bahasa === 'en' ? item.labelEN : item.label}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sejarah & Arsip Bangsa Papua Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownSejarahTerbuka(!dropdownSejarahTerbuka);
                  setDropdownKawasanTerbuka(false);
                  setDropdownTopikTerbuka(false);
                  setDropdownJurnalismeTerbuka(false);
                }}
                className="flex items-center gap-1 py-1 text-[#DFB76C] hover:text-white transition-colors cursor-pointer font-bold"
              >
                <span>Sejarah &amp; Dokumen</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownSejarahTerbuka ? 'rotate-180 text-white' : ''}`} />
              </button>
              {dropdownSejarahTerbuka && (
                <div className="absolute left-0 mt-3 w-72 bg-[#0A121D] border border-[#B99A55]/40 shadow-2xl py-2 z-50 rounded-b">
                  <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B99A55] border-b border-slate-800">
                    Pusat Dokumentasi &amp; Ensiklopedia
                  </div>
                  {kelompokSejarah.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleKlikNavigasi(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                        halamanAktif === item.id
                          ? 'bg-[#16284C] text-[#DFB76C]'
                          : 'text-slate-200 hover:bg-[#121E30] hover:text-white'
                      }`}
                    >
                      <span>{bahasa === 'en' ? item.labelEN : item.label}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Jurnalisme & Media Network */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownJurnalismeTerbuka(!dropdownJurnalismeTerbuka);
                  setDropdownKawasanTerbuka(false);
                  setDropdownTopikTerbuka(false);
                  setDropdownSejarahTerbuka(false);
                }}
                className="flex items-center gap-1 py-1 hover:text-[#DFB76C] transition-colors cursor-pointer"
              >
                <span>Jurnalisme &amp; Jaringan</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownJurnalismeTerbuka ? 'rotate-180 text-[#DFB76C]' : ''}`} />
              </button>
              {dropdownJurnalismeTerbuka && (
                <div className="absolute right-0 mt-3 w-72 bg-[#0A121D] border border-[#B99A55]/40 shadow-2xl py-2 z-50 rounded-b">
                  <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B99A55] border-b border-slate-800">
                    Pemberitaan &amp; Korespondensi Pasifik
                  </div>
                  {kelompokJurnalisme.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleKlikNavigasi(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                        halamanAktif === item.id
                          ? 'bg-[#16284C] text-[#DFB76C]'
                          : 'text-slate-200 hover:bg-[#121E30] hover:text-white'
                      }`}
                    >
                      <span>{bahasa === 'en' ? item.labelEN : item.label}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Quick Action Buttons Right */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Button */}
            <button
              onClick={padaBukaPencarian}
              className="p-2 text-slate-300 hover:text-[#DFB76C] hover:bg-[#16284C] rounded transition-colors cursor-pointer"
              title="Cari Berita, Arsip, & Tokoh"
              aria-label="Cari"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct Link to NGR Intelligence */}
            <button
              onClick={() => handleKlikNavigasi('ngr_intelligence')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#101C2C] bg-[#DFB76C] hover:bg-white transition-all cursor-pointer shadow-md rounded-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Riset</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuTerbuka(!menuTerbuka)}
              className="xl:hidden p-2 text-slate-200 hover:text-[#DFB76C] hover:bg-[#16284C] rounded transition-colors"
              aria-label="Buka Menu"
            >
              {menuTerbuka ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 4. HORIZONTAL SCROLLABLE CATEGORY PILLS BAR (Mobile & Desktop) */}
        <div className="border-t border-[#B99A55]/20 bg-[#0C1523] px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs">
          <span className="text-[#B99A55] font-serif text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Kanal:
          </span>
          {quickPills.map((pill) => {
            const aktif = halamanAktif === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => handleKlikNavigasi(pill.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  aktif
                    ? 'bg-[#B99A55] text-[#101C2C] font-bold shadow-sm'
                    : 'bg-[#121F33] text-slate-300 hover:bg-[#182C48] hover:text-white border border-slate-700/50'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* 5. MOBILE DRAWER SIDEBAR NAVIGATION */}
      {menuTerbuka && (
        <div className="fixed inset-0 z-50 xl:hidden flex">
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMenuTerbuka(false)}
          />
          <div className="relative ml-auto w-full max-w-sm bg-[#0A121D] border-l border-[#B99A55]/30 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#B99A55]/20">
                <div className="bg-white px-2.5 py-1 rounded border border-[#B99A55]/30">
                  <img
                    src="/assets/aistudio/1777983492806-removebg-preview_2f7b52f7.png"
                    alt="Nieuw Guinea Raad"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMenuTerbuka(false)}
                  className="p-1.5 text-slate-400 hover:text-white"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switcher in Mobile Drawer */}
              <div className="mt-4 flex items-center justify-between p-2 bg-[#101C2C] rounded border border-slate-800">
                <span className="text-xs text-slate-400 font-sans">Bahasa / Language:</span>
                <div className="inline-flex gap-1">
                  <button
                    onClick={() => padaGantiBahasa && padaGantiBahasa('id')}
                    className={`px-3 py-1 text-xs rounded font-bold ${bahasa === 'id' ? 'bg-[#B99A55] text-[#101C2C]' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Indonesia
                  </button>
                  <button
                    onClick={() => padaGantiBahasa && padaGantiBahasa('en')}
                    className={`px-3 py-1 text-xs rounded font-bold ${bahasa === 'en' ? 'bg-[#B99A55] text-[#101C2C]' : 'bg-slate-800 text-slate-300'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* AI & Intelligence Feature Badge */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleKlikNavigasi('dashboard_editor')}
                  className="w-full p-3 bg-gradient-to-r from-[#B99A55]/20 to-[#101C2C] border border-[#B99A55]/40 rounded text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-5 h-5 text-[#DFB76C]" />
                    <div>
                      <div className="text-xs font-bold text-white">DASHBOARD EDITOR</div>
                      <div className="text-[10px] text-slate-400">Metrik Trafik, Pembaca Unik &amp; Interaksi</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#DFB76C]" />
                </button>

                <button
                  onClick={() => handleKlikNavigasi('ngr_intelligence')}
                  className="w-full p-3 bg-gradient-to-r from-[#B99A55]/20 to-[#16284C] border border-[#B99A55]/40 rounded text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#DFB76C]" />
                    <div>
                      <div className="text-xs font-bold text-white">NGR INTELLIGENCE</div>
                      <div className="text-[10px] text-slate-400">10 Fitur Khusus Riset AI Papua</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#DFB76C]" />
                </button>
              </div>

              {/* Kelompok Kawasan */}
              <div className="mt-6 mb-2 text-[10px] font-mono tracking-widest text-[#B99A55] uppercase">
                Kanal Kawasan (6)
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {kelompokKawasan.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleKlikNavigasi(item.id)}
                    className="p-2 text-left text-xs bg-[#101C2C] border border-slate-800 hover:border-[#B99A55] rounded text-slate-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Kelompok Topik */}
              <div className="mt-4 mb-2 text-[10px] font-mono tracking-widest text-[#B99A55] uppercase">
                Topik Berita (8)
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {kelompokTopik.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleKlikNavigasi(item.id)}
                    className="p-2 text-left text-xs bg-[#101C2C] border border-slate-800 hover:border-[#B99A55] rounded text-slate-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Sejarah & Dokumentasi */}
              <div className="mt-4 mb-2 text-[10px] font-mono tracking-widest text-[#B99A55] uppercase">
                Pusat Sejarah &amp; Arsip
              </div>
              <div className="space-y-1">
                {kelompokSejarah.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleKlikNavigasi(item.id)}
                    className="w-full text-left px-3 py-2 text-xs bg-[#101C2C] border border-slate-800 hover:border-[#B99A55] rounded text-slate-200 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>

              {/* Jaringan Media & Investigasi */}
              <div className="mt-4 mb-2 text-[10px] font-mono tracking-widest text-[#B99A55] uppercase">
                Jurnalisme &amp; Jaringan
              </div>
              <div className="space-y-1">
                {kelompokJurnalisme.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleKlikNavigasi(item.id)}
                    className="w-full text-left px-3 py-2 text-xs bg-[#101C2C] border border-slate-800 hover:border-[#B99A55] rounded text-slate-200 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#B99A55]/20 mt-6">
              <p className="text-[11px] text-slate-400 font-serif italic text-center">
                "Merekam Peristiwa, Merawat Sejarah, Menghubungkan Dunia."
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
