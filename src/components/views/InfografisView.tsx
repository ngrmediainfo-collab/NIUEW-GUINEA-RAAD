import React, { useState } from 'react';
import { InfografisItem } from '../../types';
import { koleksiInfografisSejarah } from '../../data/infografisData';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  Share2, 
  FileText, 
  ShieldCheck, 
  Check, 
  ExternalLink,
  Printer
} from 'lucide-react';

export const InfografisView: React.FC = () => {
  const [kategoriAktif, setKategoriAktif] = useState<string>('semua');
  const [tersalinId, setTersalinId] = useState<string | null>(null);

  const daftarKategori = [
    { id: 'semua', label: 'Semua Infografis' },
    { id: 'kronologi', label: 'Kronologi Sejarah' },
    { id: 'ngr_1961', label: 'NGR 1961' },
    { id: 'desember_1961', label: '1 Desember 1961' },
    { id: 'perjanjian_new_york', label: 'Perjanjian New York' },
    { id: 'untea', label: 'UNTEA 1962–1963' },
    { id: 'pepera_1969', label: 'Pepera 1969' },
    { id: 'tujuh_wilayah_adat', label: 'Tujuh Wilayah Adat' },
    { id: 'diplomasi', label: 'Sejarah Diplomasi' }
  ];

  const infografisTerfilter = kategoriAktif === 'semua'
    ? koleksiInfografisSejarah
    : koleksiInfografisSejarah.filter(i => i.kategori === kategoriAktif);

  const handleBagiInfografis = (item: InfografisItem) => {
    const teksBagi = `[INFOGRAFIS SEJARAH PAPUA] ${item.judul}\nSumber: ${item.sumberVerifikasi}\nKunjungi Portal Nieuw Guinea Raad: https://nieuw-guinea-raad.blogspot.com/`;
    navigator.clipboard.writeText(teksBagi);
    setTersalinId(item.id);
    setTimeout(() => setTersalinId(null), 2500);
  };

  const handleCetak = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          <BarChart3 className="w-4 h-4" />
          <span>Pusat Infografis Data Historis &amp; Statistik Kritis</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          INFOGRAFIS SEJARAH PAPUA
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Visualisasi data sejarah editorial premium yang menyajikan kronologi, statistik keanggotaan parlemen, persentase elektoral, pasal-pasal perjanjian internasional, dan perbandingan tujuh wilayah adat berdasarkan sumber arsip terverifikasi.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-[#080E1C] border border-slate-800 text-xs">
        {daftarKategori.map(k => (
          <button
            key={k.id}
            onClick={() => setKategoriAktif(k.id)}
            className={`px-3 py-1.5 font-serif transition-colors cursor-pointer ${
              kategoriAktif === k.id
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      {/* Infographics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {infografisTerfilter.map((item) => {
          const tersalin = tersalinId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#080E1C] border border-slate-800 hover:border-[#C5A059] transition-all p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl"
            >
              {/* Infographic Header */}
              <div className="space-y-3 border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#C5A059]">
                  <span>{item.nomor} · {item.kategoriLabel.toUpperCase()}</span>
                  <span className="text-slate-400 font-serif">{item.tahun}</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF9F5] leading-snug">
                  {item.judul}
                </h2>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {item.keterangan}
                </p>
              </div>

              {/* Data Metrics Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {item.poinDataHistoris.map((data, idx) => (
                  <div key={idx} className="p-3 bg-[#060A14] border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-serif block truncate">
                      {data.label}
                    </span>
                    <div className="text-base sm:text-lg font-display font-bold text-[#DFB76C]">
                      {data.nilai}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block leading-tight">
                      {data.konteks}
                    </span>
                  </div>
                ))}
              </div>

              {/* Timeline Sequence */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-serif uppercase tracking-wider text-[#C5A059] block">
                  Urutan Kronologi Kunci:
                </span>
                <div className="space-y-1.5 text-xs">
                  {item.kronologiRingkas.map((k, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 bg-[#060A14] border border-slate-850">
                      <span className="font-mono text-[#DFB76C] font-semibold shrink-0 text-[11px]">
                        {k.waktu}:
                      </span>
                      <span className="text-slate-300 text-[11px] leading-relaxed">
                        {k.kejadian}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification & Document References */}
              <div className="space-y-1 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-serif">
                <div>
                  <span className="text-[#C5A059] font-semibold">Sumber Verifikasi:</span> {item.sumberVerifikasi}
                </div>
                <div>
                  <span className="text-[#DFB76C] font-semibold">Referensi Arsip:</span> <span className="font-mono">{item.referensiDokumen}</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleBagiInfografis(item)}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#DFB76C] cursor-pointer"
                >
                  {tersalin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{tersalin ? 'Ringkasan Disalin' : 'Bagikan Data'}</span>
                </button>

                <button
                  onClick={handleCetak}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#16284C] hover:bg-[#1E3663] text-slate-200 border border-slate-700 font-medium uppercase tracking-wider cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
