import React, { useState, useMemo } from 'react';
import { PeristiwaEnsiklopedia } from '../../types';
import { tabelEnsiklopediaSejarah } from '../../data/ensiklopediaSejarahData';
import { 
  Table, 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  X, 
  ArrowRight,
  ExternalLink,
  Landmark
} from 'lucide-react';

export const EnsiklopediaSejarahView: React.FC = () => {
  const [kataKunci, setKataKunci] = useState('');
  const [topikFilter, setTopikFilter] = useState<string>('semua');
  const [peristiwaModal, setPeristiwaModal] = useState<PeristiwaEnsiklopedia | null>(null);

  const daftarTopik = [
    { id: 'semua', label: 'Semua Topik' },
    { id: 'politik', label: 'Politik & Parlemen' },
    { id: 'hukum', label: 'Hukum & Traktat' },
    { id: 'diplomasi', label: 'Diplomasi Internasional' },
    { id: 'militer', label: 'Peristiwa Militer' },
    { id: 'pbb', label: 'Perserikatan Bangsa-Bangsa' },
    { id: 'kebudayaan', label: 'Kebudayaan & Identitas' }
  ];

  const peristiwaTerfilter = useMemo(() => {
    return tabelEnsiklopediaSejarah.filter((p) => {
      if (topikFilter !== 'semua' && p.topik !== topikFilter) return false;
      if (kataKunci.trim()) {
        const q = kataKunci.toLowerCase();
        const cocok =
          p.peristiwa.toLowerCase().includes(q) ||
          p.pengertian.toLowerCase().includes(q) ||
          p.latarBelakang.toLowerCase().includes(q) ||
          p.tahun.toString().includes(q) ||
          p.tokohTerkait.some(t => t.toLowerCase().includes(q));
        if (!cocok) return false;
      }
      return true;
    });
  }, [kataKunci, topikFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          <Table className="w-4 h-4" />
          <span>Basis Data Kronologis &amp; Tabel Historiografi Kritis</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          ENSIKLOPEDIA SEJARAH PAPUA
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Pusat pengetahuan berstruktur tabel yang menyajikan peristiwa-peristiwa kunci dalam sejarah Papua: Tahun, Tanggal, Peristiwa, Pengertian, Latar Belakang, Tokoh Terkait, Dampak Sejarah, Dokumen Sumber, dan Referensi Ilmiah.
        </p>

        {/* NGR 1961 Highlight Box */}
        <div className="p-4 bg-[#080E1C] border border-[#C5A059]/40 flex items-start gap-3 text-xs text-slate-300 mt-3">
          <Landmark className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-serif text-[#DFB76C] font-semibold block text-sm">
              Fokus Utama: Kedudukan &amp; Sejarah Nieuw Guinea Raad 1961
            </span>
            <p className="leading-relaxed font-sans text-slate-300">
              Nieuw Guinea Raad (Dewan Nugini) dibentuk berdasarkan Lembaran Negara 1960 No. 18 dan dilantik 5 April 1961 di Hollandia. Lembaga ini menjadi tonggak demokrasi representatif tertinggi rakyat Papua dengan 23 anggota putra asli Papua, yang merumuskan Manifesto 1 Desember 1961 sebelum dibubarkan paksa menyusul Perjanjian New York 1962.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#080E1C] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari tahun, nama peristiwa, atau tokoh..."
            className="w-full bg-[#060A14] border border-slate-700 text-slate-100 pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {daftarTopik.map(t => (
            <button
              key={t.id}
              onClick={() => setTopikFilter(t.id)}
              className={`px-3 py-1.5 font-serif transition-colors cursor-pointer ${
                topikFilter === t.id
                  ? 'bg-[#C5A059] text-black font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Master Historical Table */}
      <div className="bg-[#080E1C] border border-slate-800 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[950px]">
          <thead>
            <tr className="border-b border-[#C5A059]/40 bg-[#060A14] text-[#C5A059] font-serif uppercase tracking-wider">
              <th className="p-3 w-16">Tahun</th>
              <th className="p-3 w-32">Tanggal</th>
              <th className="p-3 w-64">Nama Peristiwa</th>
              <th className="p-3">Pengertian Singkat</th>
              <th className="p-3 w-48">Tokoh Terkait</th>
              <th className="p-3 w-44">Dokumen Sumber</th>
              <th className="p-3 w-28 text-center">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200 font-sans">
            {peristiwaTerfilter.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => setPeristiwaModal(item)}
                className="hover:bg-[#101C33] transition-colors cursor-pointer"
              >
                <td className="p-3 font-mono font-bold text-[#DFB76C] text-sm">
                  {item.tahun}
                </td>
                <td className="p-3 text-slate-300 font-mono text-[11px]">
                  {item.tanggalLengkap}
                </td>
                <td className="p-3 font-serif font-bold text-slate-100 hover:text-[#DFB76C]">
                  {item.peristiwa}
                </td>
                <td className="p-3 text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                  {item.pengertian}
                </td>
                <td className="p-3 text-slate-400 text-[11px]">
                  {item.tokohTerkait.slice(0, 2).join(', ')}
                </td>
                <td className="p-3 font-mono text-[10px] text-slate-400">
                  {item.dokumenSumber}
                </td>
                <td className="p-3 text-center">
                  <span className="text-[#C5A059] font-serif hover:underline text-[11px]">
                    Telaah &rarr;
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Peristiwa */}
      {peristiwaModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setPeristiwaModal(null)}
          />

          <div className="relative w-full max-w-3xl bg-[#090F1E] border border-[#C5A059]/50 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#060A14] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between">
              <span className="font-mono text-xs text-[#C5A059]">
                KRONOLOGI {peristiwaModal.tahun} · BAGIAN PERIODE {peristiwaModal.periodeNomor}
              </span>
              <button
                onClick={() => setPeristiwaModal(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#DFB76C]">
                  Tanggal: {peristiwaModal.tanggalLengkap}
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#FBF9F5]">
                  {peristiwaModal.peristiwa}
                </h2>
              </div>

              {/* Pengertian */}
              <div className="p-4 bg-[#060A14] border-l-2 border-[#C5A059] space-y-1">
                <span className="font-serif text-[#C5A059] font-semibold block text-xs uppercase">
                  Pengertian Pokok:
                </span>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {peristiwaModal.pengertian}
                </p>
              </div>

              {/* Latar Belakang */}
              <div className="space-y-1.5">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
                  Latar Belakang &amp; Konteks Sejarah
                </h4>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {peristiwaModal.latarBelakang}
                </p>
              </div>

              {/* Dampak Sejarah */}
              <div className="space-y-1.5">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
                  Dampak Historis Jangka Panjang
                </h4>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {peristiwaModal.dampakSejarah}
                </p>
              </div>

              {/* Tokoh Terkait */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="font-serif text-[#DFB76C] font-semibold block">
                  Tokoh-Tokoh Terkait:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {peristiwaModal.tokohTerkait.map((tokoh, idx) => (
                    <span key={idx} className="bg-slate-800 px-2.5 py-1 text-slate-200 text-xs">
                      {tokoh}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sumber & Referensi */}
              <div className="p-4 bg-[#080E1C] border border-slate-800 space-y-1.5 text-xs font-serif text-slate-400">
                <div>
                  <span className="text-[#C5A059] font-semibold">Dokumen Sumber Resmi:</span>{' '}
                  <span className="font-mono text-slate-200">{peristiwaModal.dokumenSumber}</span>
                </div>
                <div>
                  <span className="text-[#DFB76C] font-semibold">Referensi Ilmiah:</span>{' '}
                  <span className="text-slate-300 italic">{peristiwaModal.referensi}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#060A14] px-6 py-3 border-t border-[#C5A059]/30 text-right">
              <button
                onClick={() => setPeristiwaModal(null)}
                className="px-4 py-1.5 text-xs font-serif uppercase tracking-wider text-slate-200 bg-[#16284C] hover:bg-[#1E3563] transition-colors"
              >
                Tutup Telusur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
