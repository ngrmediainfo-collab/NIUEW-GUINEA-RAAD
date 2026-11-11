import React, { useState, useMemo } from 'react';
import { DokumenArsip, StandarKredibilitas } from '../../types';
import { koleksiDokumenArsip } from '../../data/archiveDocuments';
import { daftarPeriodeSejarah } from '../../data/historicalPeriods';
import { formatLabelKredibilitas } from '../DocumentModal';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Download,
  RotateCcw
} from 'lucide-react';

interface DigitalArchiveViewProps {
  padaPilihDokumen: (dokumen: DokumenArsip) => void;
}

export const DigitalArchiveView: React.FC<DigitalArchiveViewProps> = ({ padaPilihDokumen }) => {
  const [kataKunci, setKataKunci] = useState('');
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>('semua');
  const [kredibilitasTerpilih, setKredibilitasTerpilih] = useState<string>('semua');
  const [periodeTerpilih, setPeriodeTerpilih] = useState<string>('semua');

  const daftarKategori: { id: string; label: string }[] = [
    { id: 'semua', label: 'Semua Kategori' },
    { id: 'dokumen_sejarah', label: 'Dokumen Sejarah' },
    { id: 'dokumen_pbb', label: 'Dokumen PBB' },
    { id: 'peta_sejarah', label: 'Peta Sejarah' },
    { id: 'kesaksian_sejarah', label: 'Kesaksian Sejarah' },
    { id: 'publikasi_laporan', label: 'Publikasi & Laporan' },
    { id: 'foto_arsip', label: 'Foto Arsip' },
    { id: 'surat_korespondensi', label: 'Surat & Korespondensi' },
    { id: 'buku_sejarah', label: 'Buku Sejarah' },
    { id: 'penelitian_akademis', label: 'Penelitian Akademis' }
  ];

  const daftarFilterKredibilitas: { id: string; label: string }[] = [
    { id: 'semua', label: 'Semua Standar Kredibilitas' },
    { id: 'dokumen_resmi', label: 'Dokumen Resmi' },
    { id: 'fakta_terverifikasi', label: 'Fakta Terverifikasi' },
    { id: 'perdebatan_hukum', label: 'Perdebatan Hukum' },
    { id: 'interpretasi_sejarah', label: 'Interpretasi Sejarah' },
    { id: 'pandangan_politik', label: 'Pandangan Politik' },
    { id: 'opini_penulis', label: 'Opini Penulis' }
  ];

  const dokumenTerfilter = useMemo(() => {
    return koleksiDokumenArsip.filter((doc) => {
      // Search
      const q = kataKunci.toLowerCase().trim();
      if (q) {
        const cocok = 
          doc.judul.toLowerCase().includes(q) ||
          doc.nomorKatalog.toLowerCase().includes(q) ||
          doc.ringkasan.toLowerCase().includes(q) ||
          doc.sumber.toLowerCase().includes(q) ||
          doc.kataKunci.some(k => k.toLowerCase().includes(q));
        if (!cocok) return false;
      }

      // Kategori
      if (kategoriTerpilih !== 'semua' && doc.kategori !== kategoriTerpilih) {
        return false;
      }

      // Kredibilitas
      if (kredibilitasTerpilih !== 'semua' && doc.standarKredibilitas !== kredibilitasTerpilih) {
        return false;
      }

      // Periode
      if (periodeTerpilih !== 'semua' && doc.periodeId !== periodeTerpilih) {
        return false;
      }

      return true;
    });
  }, [kataKunci, kategoriTerpilih, kredibilitasTerpilih, periodeTerpilih]);

  const handleResetFilter = () => {
    setKataKunci('');
    setKategoriTerpilih('semua');
    setKredibilitasTerpilih('semua');
    setPeriodeTerpilih('semua');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          Perpustakaan &amp; Repositori Digital
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          Arsip Dokumen Sejarah Papua
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Perpustakaan digital terbuka yang mengklasifikasikan sumber primer, traktat PBB, peta kartografi, risalah sidang parlemen, dan korespondensi diplomatik dengan standar kredibilitas internasional yang ketat.
        </p>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="p-6 bg-[#080E1C] border border-[#C5A059]/30 space-y-5">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#C5A059] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari berdasarkan judul dokumen, nomor katalog (misal: NGR-DOC), tahun, atau kata kunci..."
            className="w-full bg-[#060A14] border border-slate-700 text-slate-100 placeholder-slate-500 text-sm pl-12 pr-4 py-3 focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Kategori Filter */}
          <div className="space-y-1">
            <label className="text-slate-400 font-serif">Kategori Arsip:</label>
            <select
              value={kategoriTerpilih}
              onChange={(e) => setKategoriTerpilih(e.target.value)}
              className="w-full bg-[#060A14] border border-slate-700 text-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
            >
              {daftarKategori.map(k => (
                <option key={k.id} value={k.id}>{k.label}</option>
              ))}
            </select>
          </div>

          {/* Kredibilitas Filter */}
          <div className="space-y-1">
            <label className="text-slate-400 font-serif">Standar Kredibilitas:</label>
            <select
              value={kredibilitasTerpilih}
              onChange={(e) => setKredibilitasTerpilih(e.target.value)}
              className="w-full bg-[#060A14] border border-slate-700 text-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
            >
              {daftarFilterKredibilitas.map(k => (
                <option key={k.id} value={k.id}>{k.label}</option>
              ))}
            </select>
          </div>

          {/* Periode Sejarah Filter */}
          <div className="space-y-1">
            <label className="text-slate-400 font-serif">Rentang Periode:</label>
            <select
              value={periodeTerpilih}
              onChange={(e) => setPeriodeTerpilih(e.target.value)}
              className="w-full bg-[#060A14] border border-slate-700 text-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
            >
              <option value="semua">Semua 12 Periode Sejarah</option>
              {daftarPeriodeSejarah.map(p => (
                <option key={p.id} value={p.id}>
                  Bagian {p.nomorUrut}: {p.judul}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>
            Menampilkan <strong className="text-[#DFB76C] font-mono">{dokumenTerfilter.length}</strong> dokumen dari total {koleksiDokumenArsip.length} berkas terdaftar
          </span>

          {(kataKunci || kategoriTerpilih !== 'semua' || kredibilitasTerpilih !== 'semua' || periodeTerpilih !== 'semua') && (
            <button
              onClick={handleResetFilter}
              className="inline-flex items-center gap-1 text-[#C5A059] hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Atur Ulang Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Documents Grid */}
      {dokumenTerfilter.length === 0 ? (
        <div className="text-center py-16 bg-[#080E1C] border border-slate-800 space-y-3">
          <BookOpen className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
          <h3 className="font-serif text-base font-bold text-slate-200">
            Tidak Ditemukan Dokumen yang Cocok
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Coba sesuaikan kata kunci pencarian atau ubah filter kategori dan kredibilitas.
          </p>
          <button
            onClick={handleResetFilter}
            className="mt-2 px-4 py-2 bg-[#16284C] text-xs text-slate-200 uppercase font-medium tracking-wider"
          >
            Tampilkan Semua Dokumen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dokumenTerfilter.map((doc) => {
            const infoKredibilitas = formatLabelKredibilitas(doc.standarKredibilitas);
            return (
              <div
                key={doc.id}
                onClick={() => padaPilihDokumen(doc)}
                className="p-6 bg-[#080E1C] border border-slate-800 hover:border-[#C5A059] transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Top catalog & Date */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#C5A059] tracking-wider font-semibold">
                      {doc.nomorKatalog}
                    </span>
                    <span className="text-slate-400 font-serif">
                      {doc.tahun}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base font-bold text-slate-100 group-hover:text-[#DFB76C] transition-colors leading-snug line-clamp-2">
                    {doc.judul}
                  </h3>

                  {/* Credibility Badge (Text format, anti-slop) */}
                  <div className="text-[11px] flex items-center gap-1.5 text-slate-400 border-t border-b border-slate-800/80 py-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span className="truncate">{infoKredibilitas.label}</span>
                  </div>

                  {/* Snippet */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {doc.ringkasan}
                  </p>

                  {/* Provenance */}
                  <div className="text-[11px] text-slate-400 font-serif">
                    <span className="text-[#DFB76C]">Sumber:</span> {doc.sumber}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-[#C5A059] group-hover:text-white transition-colors">
                  <span className="font-serif">Buka Transkrip &amp; Sitasi</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
