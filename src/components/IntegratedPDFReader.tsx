import React, { useState, useEffect, useRef } from 'react';
import { DokumenArsip } from '../types';
import { generateArchivalPDFBlobUrl } from '../utils/pdfGenerator';
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Printer, 
  ExternalLink, 
  Download, 
  Maximize2, 
  Minimize2, 
  Check, 
  Copy, 
  ShieldCheck, 
  Layers, 
  Sliders,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface IntegratedPDFReaderProps {
  dokumen: DokumenArsip;
  padaTutup?: () => void;
}

export const IntegratedPDFReader: React.FC<IntegratedPDFReaderProps> = ({ dokumen }) => {
  // State Pembaca PDF
  const [halamanAktif, setHalamanAktif] = useState<number>(1);
  const totalHalaman = 2;
  const [tingkatZoom, setTingkatZoom] = useState<number>(100);
  const [rotasi, setRotasi] = useState<number>(0);
  const [modeTampilan, setModeTampilan] = useState<'lembar_arsip' | 'iframe_asli'>('lembar_arsip');
  const [temaKertas, setTemaKertas] = useState<'pergamen' | 'putih' | 'gelap'>('pergamen');
  const [kataKunciCari, setKataKunciCari] = useState<string>('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [tersalin, setTersalin] = useState<boolean>(false);
  const [layarPenuh, setLayarPenuh] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Buat URL PDF Blob saat dokumen berubah
  useEffect(() => {
    let url: string | null = null;
    try {
      url = generateArchivalPDFBlobUrl(dokumen);
      setPdfBlobUrl(url);
    } catch (e) {
      console.error('Gagal membuat PDF Blob:', e);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [dokumen]);

  // Handler Zoom
  const zoomIn = () => setTingkatZoom(prev => Math.min(prev + 15, 175));
  const zoomOut = () => setTingkatZoom(prev => Math.max(prev - 15, 60));
  const resetZoom = () => setTingkatZoom(100);

  // Handler Rotasi
  const putarDokumen = () => setRotasi(prev => (prev + 90) % 360);

  // Handler Cetak
  const handleCetak = () => {
    if (modeTampilan === 'iframe_asli' && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    } else {
      window.print();
    }
  };

  // Handler Salin Kutipan Dokumen
  const handleSalinTeks = () => {
    const teks = `${dokumen.judul} (${dokumen.tanggal})\nKatalog: ${dokumen.nomorKatalog}\nSumber: ${dokumen.sumber}\n\n${dokumen.ringkasan}\n\nTranskrip:\n${dokumen.transkripLengkap || ''}`;
    navigator.clipboard.writeText(teks);
    setTersalin(true);
    setTimeout(() => setTersalin(false), 2500);
  };

  // Helper pencarian teks dan penandaan
  const renderTeksDenganHighlight = (teks: string) => {
    if (!kataKunciCari.trim()) return teks;
    const regex = new RegExp(`(${kataKunciCari.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const bagian = teks.split(regex);
    return bagian.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-[#C5A059] text-black font-semibold px-0.5 rounded-xs">
          {part}
        </mark>
      ) : part
    );
  };

  // Gaya Kertas berdasarkan tema
  const gayaKertas = () => {
    switch (temaKertas) {
      case 'pergamen':
        return 'bg-[#FBF9F4] text-[#1B2433] shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-[#C5A059]/50';
      case 'putih':
        return 'bg-white text-slate-900 shadow-2xl border border-slate-300';
      case 'gelap':
        return 'bg-[#0E172A] text-slate-100 shadow-2xl border border-slate-700';
      default:
        return 'bg-[#FBF9F4] text-[#1B2433]';
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-col bg-[#070C18] border border-[#C5A059]/40 overflow-hidden transition-all duration-300 ${
        layarPenuh ? 'fixed inset-0 z-50 rounded-none' : 'h-[620px] rounded-sm shadow-2xl'
      }`}
    >
      {/* TOOLBAR UTAMA PEMBACA PDF */}
      <div className="bg-[#0B1426] border-b border-[#C5A059]/30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
        
        {/* Kontrol Navigasi Halaman */}
        <div className="flex items-center gap-1.5 bg-[#070C18] border border-slate-700/60 px-2 py-1">
          <button
            onClick={() => setHalamanAktif(prev => Math.max(prev - 1, 1))}
            disabled={halamanAktif <= 1 || modeTampilan === 'iframe_asli'}
            className="p-1 text-slate-300 hover:text-[#DFB76C] disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="font-mono text-[11px] text-slate-200 px-2 flex items-center gap-1">
            <span>Hal.</span>
            <span className="font-bold text-[#DFB76C]">{halamanAktif}</span>
            <span>/</span>
            <span>{totalHalaman}</span>
          </div>

          <button
            onClick={() => setHalamanAktif(prev => Math.min(prev + 1, totalHalaman))}
            disabled={halamanAktif >= totalHalaman || modeTampilan === 'iframe_asli'}
            className="p-1 text-slate-300 hover:text-[#DFB76C] disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Kontrol Zoom & Rotasi */}
        <div className="flex items-center gap-1 bg-[#070C18] border border-slate-700/60 px-2 py-1">
          <button
            onClick={zoomOut}
            disabled={modeTampilan === 'iframe_asli'}
            className="p-1 text-slate-300 hover:text-[#DFB76C] disabled:opacity-30 cursor-pointer"
            title="Perkecil (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetZoom}
            disabled={modeTampilan === 'iframe_asli'}
            className="font-mono text-[11px] text-slate-300 hover:text-[#DFB76C] px-1.5 cursor-pointer"
            title="Atur Ulang Zoom"
          >
            {tingkatZoom}%
          </button>

          <button
            onClick={zoomIn}
            disabled={modeTampilan === 'iframe_asli'}
            className="p-1 text-slate-300 hover:text-[#DFB76C] disabled:opacity-30 cursor-pointer"
            title="Perbesar (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-3.5 w-px bg-slate-700 mx-1" />

          <button
            onClick={putarDokumen}
            disabled={modeTampilan === 'iframe_asli'}
            className="p-1 text-slate-300 hover:text-[#DFB76C] disabled:opacity-30 cursor-pointer flex items-center gap-1"
            title="Putar Dokumen 90 Derajat"
          >
            <RotateCw className="w-3.5 h-3.5" />
            {rotasi > 0 && <span className="font-mono text-[10px] text-[#DFB76C]">{rotasi}°</span>}
          </button>
        </div>

        {/* Pencarian dalam Teks Dokumen */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[#C5A059] absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={kataKunciCari}
            onChange={(e) => setKataKunciCari(e.target.value)}
            placeholder="Cari kata dalam teks..."
            disabled={modeTampilan === 'iframe_asli'}
            className="bg-[#070C18] border border-slate-700/70 pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#C5A059] w-36 sm:w-44 disabled:opacity-40"
          />
          {kataKunciCari && (
            <button 
              onClick={() => setKataKunciCari('')}
              className="absolute right-2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Pemilih Mode Tampilan & Tema Kertas */}
        <div className="flex items-center gap-2">
          {/* Mode Tampilan Tab */}
          <div className="flex items-center bg-[#070C18] border border-slate-700/60 p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setModeTampilan('lembar_arsip')}
              className={`px-2 py-1 transition-colors cursor-pointer flex items-center gap-1 ${
                modeTampilan === 'lembar_arsip'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tampilan Lembar Dokumen Interaktif"
            >
              <BookOpen className="w-3 h-3" />
              <span>Interaktif</span>
            </button>
            <button
              onClick={() => setModeTampilan('iframe_asli')}
              className={`px-2 py-1 transition-colors cursor-pointer flex items-center gap-1 ${
                modeTampilan === 'iframe_asli'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tampilan Mesin PDF Bawaan Peramban (Iframe)"
            >
              <Layers className="w-3 h-3" />
              <span>PDF Asli</span>
            </button>
          </div>

          {/* Tema Kertas (Khusus mode interaktif) */}
          {modeTampilan === 'lembar_arsip' && (
            <div className="hidden md:flex items-center gap-1 bg-[#070C18] border border-slate-700/60 px-1.5 py-1 text-[10px] font-mono">
              <span className="text-slate-500 mr-1">Kertas:</span>
              <button
                onClick={() => setTemaKertas('pergamen')}
                className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer ${
                  temaKertas === 'pergamen' ? 'bg-[#C5A059]/20 text-[#DFB76C] font-bold border border-[#C5A059]/40' : 'text-slate-400'
                }`}
              >
                Arsip
              </button>
              <button
                onClick={() => setTemaKertas('putih')}
                className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer ${
                  temaKertas === 'putih' ? 'bg-white/20 text-white font-bold border border-white/40' : 'text-slate-400'
                }`}
              >
                Putih
              </button>
              <button
                onClick={() => setTemaKertas('gelap')}
                className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer ${
                  temaKertas === 'gelap' ? 'bg-blue-900/40 text-blue-300 font-bold border border-blue-500/40' : 'text-slate-400'
                }`}
              >
                Gelap
              </button>
            </div>
          )}

          {/* Aksi Tambahan: Salin, Cetak, Tab Baru, Layar Penuh */}
          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              onClick={handleSalinTeks}
              className="p-1.5 text-slate-300 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors cursor-pointer"
              title="Salin Naskah Dokumen"
            >
              {tersalin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleCetak}
              className="p-1.5 text-slate-300 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors cursor-pointer"
              title="Cetak Dokumen"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {pdfBlobUrl && (
              <a
                href={pdfBlobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-300 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors"
                title="Buka Dokumen PDF di Tab Baru"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => setLayarPenuh(!layarPenuh)}
              className="p-1.5 text-slate-300 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors cursor-pointer"
              title={layarPenuh ? 'Perkecil Tampilan' : 'Tampilan Layar Penuh'}
            >
              {layarPenuh ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>

      {/* AREA PEMBACA UTAMA (VIEWPORT) */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-[#050811] relative">
        
        {/* MODE 1: LEMBAR ARSIP INTERAKTIF BERGAYA HISTORIS */}
        {modeTampilan === 'lembar_arsip' ? (
          <div 
            style={{
              transform: `scale(${tingkatZoom / 100}) rotate(${rotasi}deg)`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out',
            }}
            className="w-full max-w-[760px] my-2"
          >
            {halamanAktif === 1 ? (
              /* HALAMAN 1: SAMPUL RESMI & RINGKASAN */
              <div className={`p-8 sm:p-12 relative ${gayaKertas()}`}>
                
                {/* Border ganda khas dokumen dekrit resmi */}
                <div className="border-2 border-[#C5A059]/40 p-6 sm:p-8 relative space-y-6">
                  
                  {/* Kop Resmi Nieuw Guinea Raad */}
                  <div className="text-center pb-4 border-b border-[#C5A059]/30 space-y-1">
                    <div className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                      REPOSITORI ARSIP SEJARAH NASIONAL PAPUA
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-extrabold tracking-wide text-[#0B132B] dark:text-[#FBF9F5]">
                      NIEUW GUINEA RAAD – DEWAN PAPUA
                    </h2>
                    <p className="text-[11px] font-serif italic text-slate-600 dark:text-slate-400">
                      Pusat Dokumentasi Sejarah, Arsip, dan Penelusuran Identitas Bangsa Papua (1961)
                    </p>
                  </div>

                  {/* Metadata Registrasi Arsip */}
                  <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-slate-300 dark:border-slate-800 pb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#C5A059]">KODE ARSIP:</span>
                      <span className="bg-black/10 dark:bg-black/40 px-2 py-0.5 border border-[#C5A059]/30">
                        {dokumen.nomorKatalog}
                      </span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      TANGGAL DOKUMEN: <span className="font-bold text-slate-800 dark:text-slate-200">{dokumen.tanggal}</span>
                    </div>
                  </div>

                  {/* Judul Dokumen Sejarah */}
                  <div className="py-2 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                      KLASIFIKASI: {dokumen.kategori.replace('_', ' ').toUpperCase()} · SUMBER {dokumen.jenisSumber}
                    </span>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                      {renderTeksDenganHighlight(dokumen.judul)}
                    </h1>
                  </div>

                  {/* Kotak Provenansi Sumber */}
                  <div className="p-3.5 bg-black/5 dark:bg-black/30 border border-slate-300 dark:border-slate-700/60 text-xs space-y-1.5 font-sans">
                    <div className="flex items-center gap-1.5 font-semibold text-[#C5A059]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Standar Validasi &amp; Asal-Usul Dokumen:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-semibold">Lembaga Sumber: </span>
                        <span>{dokumen.sumber}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Penyimpanan Asli: </span>
                        <span>{dokumen.lokasiPenyimpananAsli || 'Koleksi Arsip Dewan Papua'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ringkasan Isi Dokumen */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xs font-bold tracking-wider text-[#C5A059] uppercase">
                      I. Ikhtisar Kuratorial &amp; Kandungan Dokumen
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-justify font-serif">
                      {renderTeksDenganHighlight(dokumen.ringkasan)}
                    </p>
                  </div>

                  {/* Catatan Konteks Sejarah */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-300 dark:border-slate-800">
                    <h3 className="font-serif text-xs font-bold tracking-wider text-[#C5A059] uppercase">
                      II. Konteks Historiografi &amp; Hukum Internasional
                    </h3>
                    <p className="text-xs leading-relaxed italic text-slate-600 dark:text-slate-400 font-serif">
                      "{renderTeksDenganHighlight(dokumen.keteranganKuratorial)}"
                    </p>
                  </div>

                  {/* Cap Stempel Otentikasi Digital */}
                  <div className="pt-6 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-slate-500">
                      <div>TERVERIFIKASI SISTEM REPOSITORI NIEUW GUINEA RAAD</div>
                      <div>STANDAR ISO-16363 ARSIP DIGITAL OTENTIK</div>
                    </div>

                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#C5A059] flex flex-col items-center justify-center text-center p-1 rotate-[-12deg] bg-[#C5A059]/10">
                      <span className="text-[7px] font-mono uppercase font-bold text-[#C5A059]">Nieuw Guinea Raad</span>
                      <span className="text-[9px] font-bold font-serif text-[#C5A059]">TERVALIDASI</span>
                      <span className="text-[6px] font-mono text-slate-500">5 APRIL 1961</span>
                    </div>
                  </div>

                  {/* Nomor Halaman */}
                  <div className="pt-4 border-t border-slate-300 dark:border-slate-800 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Arsip Dokumen Sejarah Papua</span>
                    <span>Halaman 1 dari 2</span>
                  </div>

                </div>
              </div>
            ) : (
              /* HALAMAN 2: TRANSKRIP OTENTIK & KLAUSUL VERBATIM */
              <div className={`p-8 sm:p-12 relative ${gayaKertas()}`}>
                <div className="border-2 border-[#C5A059]/40 p-6 sm:p-8 relative space-y-6">
                  
                  {/* Header Halaman 2 */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/30 text-xs font-mono">
                    <span className="text-[#C5A059] font-bold">TRANSKRIP VERBATIM NASKAH DOKUMEN HISTORIS</span>
                    <span className="text-slate-500">KATALOG: {dokumen.nomorKatalog}</span>
                  </div>

                  {/* Bagian Transkrip */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-sm font-bold tracking-wider text-[#C5A059] uppercase">
                        III. Naskah Asli &amp; Kutipan Lengkap
                      </h3>
                      <button
                        onClick={handleSalinTeks}
                        className="text-[11px] font-mono text-slate-500 hover:text-[#C5A059] flex items-center gap-1 cursor-pointer"
                      >
                        {tersalin ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{tersalin ? 'Tersalin' : 'Salin Teks'}</span>
                      </button>
                    </div>

                    <div className="p-5 bg-black/5 dark:bg-black/50 border border-slate-300 dark:border-slate-800 font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-line text-justify max-h-[460px] overflow-y-auto">
                      {dokumen.transkripLengkap ? (
                        renderTeksDenganHighlight(dokumen.transkripLengkap)
                      ) : (
                        renderTeksDenganHighlight(
                          `Naskah resmi dokumen "${dokumen.judul}" (${dokumen.tanggal}). Sumber primer: ${dokumen.sumber}.\n\n` +
                          `Ringkasan Historis:\n${dokumen.ringkasan}\n\n` +
                          `Analisis Kedudukan Hukum:\n` +
                          `Dokumen ini merupakan salah satu arsip primer dalam kronologi politik dekolonisasi Nederlands Nieuw-Guinea. Sesuai dengan ketetapan Raad dan ketentuan Pasal 73 Piagam PBB mengenai Wilayah Tanpa Pemerintahan Sendiri (Non-Self-Governing Territories).\n\n` +
                          `Keterangan Kurator:\n${dokumen.keteranganKuratorial}\n\n` +
                          `Tautan Sumber Resmi:\n${dokumen.tautanReferensi || 'https://nieuw-guinea-raad.blogspot.com/'}`
                        )
                      )}
                    </div>
                  </div>

                  {/* Label / Kata Kunci Indeks */}
                  <div className="space-y-2 pt-2 border-t border-slate-300 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                      Indeks Kata Kunci Terkait:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dokumen.kataKunci.map((kata, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-black/10 dark:bg-black/40 border border-slate-400 dark:border-slate-700">
                          #{kata}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Halaman 2 */}
                  <div className="pt-4 border-t border-slate-300 dark:border-slate-800 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Arsip Nieuw Guinea Raad – Perpustakaan Digital</span>
                    <span>Halaman 2 dari 2</span>
                  </div>

                </div>
              </div>
            )}
          </div>
        ) : (
          /* MODE 2: MESIN PDF BAWAAN PERAMBAN (NATIVE IFRAME READER) */
          <div className="w-full h-full min-h-[500px] bg-slate-900 border border-slate-700">
            {pdfBlobUrl ? (
              <iframe
                ref={iframeRef}
                src={`${pdfBlobUrl}#toolbar=1&navpanes=1`}
                title={`Dokumen PDF ${dokumen.judul}`}
                className="w-full h-full min-h-[520px] border-none"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3 p-12 text-center">
                <Sparkles className="w-8 h-8 text-[#C5A059] animate-spin" />
                <p className="text-sm font-mono">Membuat berkas PDF terenkripsi...</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* FOOTER INFORMASI STATUS PEMBACA */}
      <div className="bg-[#0B1426] border-t border-[#C5A059]/30 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Pembaca PDF Terintegrasi Aktif · Siap Baca Langsung di Browser</span>
        </div>
        <div className="font-mono text-slate-400 hidden sm:block">
          Tekan tombol <span className="text-[#DFB76C]">Cetak</span> atau <span className="text-[#DFB76C]">Tab Baru</span> untuk mencetak dokumen arsip
        </div>
      </div>
    </div>
  );
};
