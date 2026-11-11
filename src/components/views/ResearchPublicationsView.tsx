import React, { useState } from 'react';
import { PublikasiPenelitian } from '../../types';
import { koleksiPublikasiPenelitian } from '../../data/researchPublications';
import { BookOpen, Copy, Check, FileText, ArrowDownToLine, Tag } from 'lucide-react';

export const ResearchPublicationsView: React.FC = () => {
  const [salinId, setSalinId] = useState<string | null>(null);
  const [formatSitasi, setFormatSitasi] = useState<'apa' | 'chicago'>('apa');

  const handleSalinSitasi = (pub: PublikasiPenelitian) => {
    const teks = formatSitasi === 'apa' ? pub.sitasi.apa : pub.sitasi.chicago;
    navigator.clipboard.writeText(teks);
    setSalinId(pub.id);
    setTimeout(() => setSalinId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          Divisi Penelitian Akademis &amp; Advokasi Hukum
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          Penelitian dan Publikasi
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Kumpulan monograf sejarah, kajian hukum internasional dekolonisasi, laporan situasi hak asasi manusia, dan kertas kerja kebijakan yang diterbitkan oleh peneliti independen dan arsiparis Nieuw Guinea Raad.
        </p>
      </div>

      {/* Citation Format Switcher */}
      <div className="flex items-center justify-between p-4 bg-[#080E1C] border border-slate-800 text-xs">
        <span className="text-slate-400 font-serif">
          Format Sitasi Akademis Otomatis:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFormatSitasi('apa')}
            className={`px-3 py-1 font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              formatSitasi === 'apa'
                ? 'bg-[#C5A059] text-black font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            APA 7th
          </button>
          <button
            onClick={() => setFormatSitasi('chicago')}
            className={`px-3 py-1 font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              formatSitasi === 'chicago'
                ? 'bg-[#C5A059] text-black font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Chicago 17th
          </button>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        {koleksiPublikasiPenelitian.map((pub) => {
          const tersalin = salinId === pub.id;
          return (
            <article
              key={pub.id}
              className="p-8 bg-[#080E1C] border border-slate-800 hover:border-[#C5A059]/60 transition-all space-y-5"
            >
              {/* Publication Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#C5A059]">
                  <span>{pub.nomorPublikasi} · {pub.jenis.toUpperCase()}</span>
                  <span className="text-slate-400 font-serif">{pub.tahun}</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF9F5] leading-snug">
                  {pub.judul}
                </h2>

                <div className="text-xs text-slate-400 font-serif">
                  <span className="text-[#DFB76C] font-semibold">{pub.penulis}</span> · {pub.afiliasi}
                </div>
              </div>

              {/* Abstract */}
              <div className="p-4 bg-[#060A14] border-l-2 border-[#C5A059] text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <span className="font-serif text-xs text-[#C5A059] uppercase block mb-1 font-semibold">
                  Abstrak Penelitian:
                </span>
                {pub.abstrak}
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                {pub.kataKunci.map((kata, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 border border-slate-800"
                  >
                    #{kata}
                  </span>
                ))}
              </div>

              {/* Citation Box */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400 bg-[#060A14] p-3 border border-slate-800/80 flex-1 overflow-x-auto">
                  <span className="text-[10px] text-[#DFB76C] font-serif uppercase block mb-0.5">
                    Kutipan Sitasi ({formatSitasi.toUpperCase()}):
                  </span>
                  {formatSitasi === 'apa' ? pub.sitasi.apa : pub.sitasi.chicago}
                </div>

                <button
                  onClick={() => handleSalinSitasi(pub)}
                  className="px-4 py-2.5 bg-[#16284C] hover:bg-[#1E3663] text-slate-100 text-xs font-semibold uppercase tracking-wider border border-slate-700 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  {tersalin ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Sitasi Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C5A059]" />
                      <span>Salin Sitasi</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
