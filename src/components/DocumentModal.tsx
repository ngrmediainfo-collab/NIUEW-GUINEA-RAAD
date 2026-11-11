import React, { useState, useEffect } from 'react';
import { DokumenArsip, StandarKredibilitas } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Bookmark, 
  BookOpen, 
  Info,
  Maximize2,
  Minimize2,
  Headphones,
  Highlighter,
  Plus
} from 'lucide-react';
import { IntegratedPDFReader } from './IntegratedPDFReader';
import { AudioNarrationPlayer } from './AudioNarrationPlayer';
import { DocumentAnnotationsPanel } from './DocumentAnnotationsPanel';

interface DocumentModalProps {
  dokumen: DokumenArsip | null;
  padaTutup: () => void;
}

export function formatLabelKredibilitas(kredibilitas: StandarKredibilitas): { label: string; deskripsi: string; warna: string } {
  switch (kredibilitas) {
    case 'dokumen_resmi':
      return {
        label: 'Dokumen Resmi (Traktat/UU/Resolusi)',
        deskripsi: 'Arsip primer hukum yang diterbitkan otoritas berdaulat atau badan PBB.',
        warna: 'text-amber-400 border-amber-500/40 bg-amber-500/10'
      };
    case 'fakta_terverifikasi':
      return {
        label: 'Fakta Sejarah Terverifikasi',
        deskripsi: 'Didukung oleh konkordansi multi-sumber primer dan historiografi kritis.',
        warna: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
      };
    case 'perdebatan_hukum':
      return {
        label: 'Perdebatan Hukum & Sejarah Internasional',
        deskripsi: 'Dokumen yang memuat tafsir hukum bertentangan mengenai status dekolonisasi.',
        warna: 'text-blue-400 border-blue-500/40 bg-blue-500/10'
      };
    case 'interpretasi_sejarah':
      return {
        label: 'Interpretasi Sejarah Akademis',
        deskripsi: 'Analisis berbasis kajian historiografi dari sejarawan atau peneliti profesional.',
        warna: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10'
      };
    case 'pandangan_politik':
      return {
        label: 'Pandangan Politik & Resolusi Sipil',
        deskripsi: 'Pernyataan resmi organisasi, manifesto politik, atau kehendak kolektif masyarakat.',
        warna: 'text-purple-400 border-purple-500/40 bg-purple-500/10'
      };
    case 'opini_penulis':
      return {
        label: 'Opini & Kesaksian Penulis',
        deskripsi: 'Catatan personal, kesaksian individual, atau editorial sudut pandang.',
        warna: 'text-rose-400 border-rose-500/40 bg-rose-500/10'
      };
    default:
      return {
        label: 'Arsip Sejarah',
        deskripsi: 'Dokumentasi arsip resmi.',
        warna: 'text-slate-400 border-slate-500/40 bg-slate-500/10'
      };
  }
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ dokumen, padaTutup }) => {
  const [tabAktif, setTabAktif] = useState<'pdf' | 'metadata' | 'anotasi'>('pdf');
  const [tersalin, setTersalin] = useState(false);
  const [layarPenuhModal, setLayarPenuhModal] = useState(false);
  const [tampilkanAudio, setTampilkanAudio] = useState(true);

  // State Seleksi Teks & Anotasi
  const [teksPilihan, setTeksPilihan] = useState<string>('');
  const [posisiPopupSeleksi, setPosisiPopupSeleksi] = useState<{ x: number; y: number } | null>(null);
  const [jumlahAnotasi, setJumlahAnotasi] = useState<number>(0);

  // Hitung jumlah anotasi dari localStorage
  const hitungJumlahAnotasi = () => {
    if (!dokumen) return;
    try {
      const tersimpan = localStorage.getItem(`ngr_anotasi_${dokumen.id}`);
      if (tersimpan) {
        const list = JSON.parse(tersimpan);
        setJumlahAnotasi(list.length);
      } else {
        setJumlahAnotasi(0);
      }
    } catch (e) {
      setJumlahAnotasi(0);
    }
  };

  useEffect(() => {
    hitungJumlahAnotasi();
  }, [dokumen?.id, tabAktif]);

  // Hentikan sintesis suara saat modal ditutup atau dilepas
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTutupModal = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    padaTutup();
  };

  // Deteksi penyeleksian teks untuk penyorotan cepat
  const handleMouseUpSeleksi = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 3) {
      const teks = selection.toString().trim();
      setTeksPilihan(teks);
      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setPosisiPopupSeleksi({
          x: Math.min(Math.max(rect.left + rect.width / 2, 100), window.innerWidth - 140),
          y: Math.max(rect.top - 12, 40),
        });
      } catch (e) {
        setPosisiPopupSeleksi(null);
      }
    } else {
      setPosisiPopupSeleksi(null);
    }
  };

  if (!dokumen) return null;

  const infoKredibilitas = formatLabelKredibilitas(dokumen.standarKredibilitas);

  const handleSalinKutipan = () => {
    const teksSitasi = `Nieuw Guinea Raad. (${dokumen.tahun}). "${dokumen.judul}" [Nomor Arsip: ${dokumen.nomorKatalog}]. Sumber: ${dokumen.sumber}. Diakses dari Pusat Dokumentasi Sejarah Papua (https://nieuw-guinea-raad.blogspot.com/).`;
    navigator.clipboard.writeText(teksSitasi);
    setTersalin(true);
    setTimeout(() => setTersalin(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
      onMouseUp={handleMouseUpSeleksi}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={handleTutupModal} 
      />

      {/* Floating Toolbar Penyorot Teks (Saat ada teks diseleksi) */}
      {posisiPopupSeleksi && (
        <div 
          style={{ 
            position: 'fixed', 
            left: `${posisiPopupSeleksi.x}px`, 
            top: `${posisiPopupSeleksi.y}px`, 
            transform: 'translate(-50%, -100%)' 
          }}
          className="z-60 bg-[#0B1428] border border-[#C5A059] shadow-2xl p-1.5 flex items-center gap-2 rounded-xs animate-fade-in text-xs font-mono"
        >
          <button
            onClick={() => {
              setTabAktif('anotasi');
              setPosisiPopupSeleksi(null);
            }}
            className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] font-bold flex items-center gap-1.5 cursor-pointer shadow-md rounded-xs"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>Sorot &amp; Beri Catatan</span>
          </button>
          <button
            onClick={() => setPosisiPopupSeleksi(null)}
            className="px-1.5 py-1 text-slate-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modal Container */}
      <div 
        className={`relative w-full bg-[#080D1A] border border-[#C5A059]/40 shadow-2xl z-10 flex flex-col transition-all duration-300 ${
          layarPenuhModal 
            ? 'h-[98vh] max-w-[98vw] rounded-none' 
            : 'max-w-5xl max-h-[92vh] rounded-xs'
        }`}
      >
        {/* Header Ribbon */}
        <div className="bg-[#050914] px-4 sm:px-6 py-3 border-b border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Identitas Dokumen Kiri */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C5A059]/15 border border-[#C5A059]/40 rounded-xs text-[#DFB76C]">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#C5A059] tracking-wider block">
                  {dokumen.nomorKatalog}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.2 bg-[#16284C] text-[10px] font-mono text-[#DFB76C] border border-[#C5A059]/30">
                  {dokumen.tanggal}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-sans line-clamp-1">
                Kategori: {dokumen.kategori.replace('_', ' ').toUpperCase()} · Sumber {dokumen.jenisSumber}
              </span>
            </div>
          </div>

          {/* Tab Switcher & Aksi Kanan */}
          <div className="flex items-center gap-2">
            
            {/* Tombol Toggle Pemutar Audio Narasi */}
            <button
              onClick={() => setTampilkanAudio(!tampilkanAudio)}
              className={`px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono transition-all border cursor-pointer ${
                tampilkanAudio
                  ? 'bg-[#16284C] text-[#DFB76C] border-[#C5A059]/60 font-semibold'
                  : 'bg-[#080D1A] text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={tampilkanAudio ? 'Sembunyikan Pemutar Audio' : 'Tampilkan Pemutar Audio Narasi'}
            >
              <Headphones className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden md:inline">Narasi Audio</span>
            </button>

            {/* Tab Navigasi: Pembaca PDF vs Metadata vs Anotasi */}
            <div className="flex items-center bg-[#080D1A] border border-[#C5A059]/30 p-0.5 text-xs font-mono">
              <button
                onClick={() => setTabAktif('pdf')}
                className={`px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 transition-all cursor-pointer ${
                  tabAktif === 'pdf'
                    ? 'bg-[#C5A059] text-[#080D1A] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-[#DFB76C]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pembaca PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>

              <button
                onClick={() => setTabAktif('metadata')}
                className={`px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 transition-all cursor-pointer ${
                  tabAktif === 'metadata'
                    ? 'bg-[#C5A059] text-[#080D1A] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-[#DFB76C]'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kajian &amp; Metadata</span>
                <span className="sm:hidden">Kajian</span>
              </button>

              <button
                onClick={() => setTabAktif('anotasi')}
                className={`px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 transition-all cursor-pointer relative ${
                  tabAktif === 'anotasi'
                    ? 'bg-[#C5A059] text-[#080D1A] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-[#DFB76C]'
                }`}
              >
                <Highlighter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Anotasi</span>
                <span className="sm:hidden">Catatan</span>
                {jumlahAnotasi > 0 && (
                  <span className={`px-1 py-0.2 text-[10px] font-mono rounded-full ${
                    tabAktif === 'anotasi' ? 'bg-[#080D1A] text-[#DFB76C]' : 'bg-[#C5A059] text-black font-bold'
                  }`}>
                    {jumlahAnotasi}
                  </span>
                )}
              </button>
            </div>

            {/* Salin Sitasi */}
            <button
              onClick={handleSalinKutipan}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-200 bg-[#16284C] hover:bg-[#1E3563] border border-slate-700 transition-colors cursor-pointer"
              title="Salin Sitasi Akademis Format APA / Chicago"
            >
              {tersalin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
              <span className="hidden sm:inline">{tersalin ? 'Tersalin' : 'Kutip'}</span>
            </button>

            {/* Layar Penuh Modal */}
            <button
              onClick={() => setLayarPenuhModal(!layarPenuhModal)}
              className="p-1.5 text-slate-300 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors cursor-pointer"
              title={layarPenuhModal ? 'Kecilkan Jendela' : 'Perbesar Jendela'}
            >
              {layarPenuhModal ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Tutup Modal */}
            <button
              onClick={handleTutupModal}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-red-950/80 transition-colors cursor-pointer"
              aria-label="Tutup Jendela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* KOMPONEN PEMUTAR AUDIO NARASI TERINTEGRASI */}
        {tampilkanAudio && (
          <div className="shrink-0 border-b border-[#C5A059]/20">
            <AudioNarrationPlayer dokumen={dokumen} />
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {tabAktif === 'pdf' ? (
            /* TAB 1: PEMBACA PDF TERINTEGRASI DALAM BROWSER */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#C5A059]/20 gap-2">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#FBF9F5] leading-snug">
                    {dokumen.judul}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                    <span>Dokumen Arsip Terbuka di Peramban</span>
                    <span>•</span>
                    <span className="text-[#DFB76C]">Dapat dibaca langsung tanpa unduh</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTabAktif('anotasi')}
                    className="px-3 py-1 bg-[#101C38] hover:bg-[#1A2E5A] text-[#DFB76C] border border-[#C5A059]/30 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <Highlighter className="w-3.5 h-3.5" />
                    <span>Catatan Riset ({jumlahAnotasi})</span>
                  </button>

                  <span className="hidden sm:inline-flex px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PDF Otentik Terbuka</span>
                  </span>
                </div>
              </div>

              {/* Komponen Pembaca PDF Interaktif */}
              <IntegratedPDFReader dokumen={dokumen} padaTutup={handleTutupModal} />
            </div>
          ) : tabAktif === 'metadata' ? (
            /* TAB 2: METADATA & TELAAH KURATORIAL */
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Title & Date */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-[#DFB76C] font-serif mb-1">
                    Tanggal Bersejarah: {dokumen.tanggal}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5] leading-tight">
                    {dokumen.judul}
                  </h2>
                </div>

                <button
                  onClick={() => setTabAktif('anotasi')}
                  className="px-3.5 py-2 bg-[#101C38] hover:bg-[#1A2E5A] text-[#DFB76C] border border-[#C5A059]/40 text-xs font-mono flex items-center gap-1.5 shrink-0 cursor-pointer self-start"
                >
                  <Highlighter className="w-4 h-4 text-[#C5A059]" />
                  <span>Beri Catatan / Sorotan</span>
                </button>
              </div>

              {/* Credibility Standard Box */}
              <div className={`p-4 border ${infoKredibilitas.warna} space-y-1`}>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{infoKredibilitas.label}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {infoKredibilitas.deskripsi}
                </p>
              </div>

              {/* Archival Provenance Definition List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#050914] border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block font-serif">Sumber Dokumen:</span>
                  <span className="text-slate-200 font-medium">{dokumen.sumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-serif">Lokasi Penyimpanan Asli:</span>
                  <span className="text-slate-200 font-medium">
                    {dokumen.lokasiPenyimpananAsli || 'Arsip Sejarah Nieuw Guinea Raad'}
                  </span>
                </div>
              </div>

              {/* Abstract / Summary */}
              <div>
                <h3 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase mb-2">
                  Ringkasan Dokumen
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-sans bg-[#0B1528] p-4 border-l-2 border-[#C5A059]">
                  {dokumen.ringkasan}
                </p>
              </div>

              {/* Document Image if present */}
              {dokumen.gambarUrl && (
                <div className="space-y-2">
                  <h3 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
                    Pratinjau Visual Fisik Arsip
                  </h3>
                  <div className="border border-slate-800 overflow-hidden bg-black/40">
                    <img
                      src={dokumen.gambarUrl}
                      alt={dokumen.judul}
                      className="w-full max-h-96 object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              {/* Full Transcript (Verbatim Excerpt) with Annotation Callout */}
              {dokumen.transkripLengkap && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C5A059]" />
                      <h3 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
                        Transkrip Teks Bersejarah (Ekstrak Otentik)
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                      Tip: Seleksi teks dengan kursor untuk menyorot
                    </span>
                  </div>
                  <div className="p-5 bg-[#050811] border border-[#C5A059]/20 font-mono text-xs sm:text-[13px] text-slate-300 leading-relaxed whitespace-pre-line overflow-x-auto selection:bg-[#C5A059] selection:text-black">
                    {dokumen.transkripLengkap}
                  </div>
                </div>
              )}

              {/* Curatorial Commentary */}
              <div className="pt-2 border-t border-slate-800">
                <h3 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase mb-1">
                  Catatan Kuratorial &amp; Konteks Sejarah
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed italic font-serif">
                  "{dokumen.keteranganKuratorial}"
                </p>
              </div>

              {/* Keywords / Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {dokumen.kataKunci.map((kata, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] text-slate-400 font-mono bg-slate-900/80 px-2.5 py-1 border border-slate-800"
                  >
                    #{kata}
                  </span>
                ))}
              </div>

            </div>
          ) : (
            /* TAB 3: LEMBAR ANOTASI & CATATAN RISET PRIBADI */
            <DocumentAnnotationsPanel
              dokumen={dokumen}
              teksPilihanAwal={teksPilihan}
              padaBersihkanPilihan={() => {
                setTeksPilihan('');
                hitungJumlahAnotasi();
              }}
              padaPilihTeksAnotasi={() => {
                setTabAktif('metadata');
              }}
            />
          )}

        </div>

        {/* Footer Ribbon */}
        <div className="bg-[#050914] px-4 sm:px-6 py-3 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4 text-xs shrink-0">
          <div className="flex items-center gap-4">
            {dokumen.tautanReferensi ? (
              <a
                href={dokumen.tautanReferensi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#DFB76C] hover:text-white transition-colors"
              >
                <span>Lihat Sumber Arsip Terkait</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-slate-400 font-mono text-[11px]">Pusat Dokumentasi Arsip Resmi NGR</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTabAktif(tabAktif === 'anotasi' ? 'pdf' : 'anotasi')}
              className="text-xs font-mono text-[#DFB76C] hover:text-white underline cursor-pointer flex items-center gap-1"
            >
              <Highlighter className="w-3 h-3" />
              <span>{tabAktif === 'anotasi' ? 'Kembali ke Pembaca PDF' : `Buka Lembar Catatan (${jumlahAnotasi})`}</span>
            </button>

            <button
              onClick={handleTutupModal}
              className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-200 bg-[#16284C] hover:bg-[#1E3563] transition-colors cursor-pointer border border-[#C5A059]/30"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
