import React, { useState } from 'react';
import { PeriodeSejarah, DokumenArsip } from '../../types';
import { daftarPeriodeSejarah } from '../../data/historicalPeriods';
import { koleksiDokumenArsip } from '../../data/archiveDocuments';
import { Calendar, User, FileText, ChevronRight, BookOpen } from 'lucide-react';

interface HistoryPapuaViewProps {
  padaPilihDokumen: (dokumen: DokumenArsip) => void;
  periodeAwalId?: string;
}

export const HistoryPapuaView: React.FC<HistoryPapuaViewProps> = ({
  padaPilihDokumen,
  periodeAwalId
}) => {
  const [periodeAktifId, setPeriodeAktifId] = useState<string>(
    periodeAwalId || daftarPeriodeSejarah[0].id
  );

  const periodeAktif = 
    daftarPeriodeSejarah.find((p) => p.id === periodeAktifId) || 
    daftarPeriodeSejarah[0];

  const dokumenTerkait = koleksiDokumenArsip.filter((doc) => 
    periodeAktif.dokumenTerkaitIds.includes(doc.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          Pusat Dokumentasi Historiografi Kritis
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          Pusat Dokumentasi Sejarah Papua (12 Periode)
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Rekonstruksi kronologis perjalanan bangsa Papua dari era pra-kolonial, masa administrasi Belanda, pendirian Nieuw Guinea Raad, diplomasi internasional, hingga dinamika Papua kontemporer berdasarkan arsip primer.
        </p>
      </div>

      {/* Main Grid: Sidebar Periods Navigator + Editorial Reading Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: 12 Periods Sticky Rail (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-[#060A14] border border-[#C5A059]/30 text-xs font-serif uppercase tracking-wider text-[#C5A059]">
            Indeks 12 Periode Kronologis
          </div>
          
          <div className="space-y-1 max-h-[78vh] overflow-y-auto pr-1">
            {daftarPeriodeSejarah.map((periode) => {
              const aktif = periode.id === periodeAktif.id;
              return (
                <button
                  key={periode.id}
                  onClick={() => {
                    setPeriodeAktifId(periode.id);
                    window.scrollTo({ top: 220, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3.5 transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    aktif
                      ? 'bg-[#16284C] border-l-2 border-[#C5A059] text-[#FBF9F5] shadow-md'
                      : 'bg-[#080E1C] border-l-2 border-transparent text-slate-300 hover:bg-[#0F1E36] hover:text-[#DFB76C]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className={aktif ? 'text-[#DFB76C]' : 'text-slate-500'}>
                        BAGIAN 0{periode.nomorUrut}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-400">{periode.rentangTahun}</span>
                    </div>
                    <div className="text-xs font-semibold leading-snug">
                      {periode.judul}
                    </div>
                  </div>
                  {aktif && <ChevronRight className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editorial Reading Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-8 bg-[#080E1C] p-6 sm:p-10 border border-slate-800">
          
          {/* Section Heading & Epoch Metadata */}
          <div className="space-y-3 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3 text-xs font-mono text-[#C5A059]">
              <span>BAGIAN 0{periodeAktif.nomorUrut}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-serif text-[#DFB76C]">
                <Calendar className="w-3.5 h-3.5" />
                {periodeAktif.rentangTahun}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5] leading-tight">
              {periodeAktif.judul}
            </h2>

            <p className="text-sm font-serif italic text-slate-300 leading-relaxed bg-[#0B1528] p-4 border-l-2 border-[#C5A059]">
              {periodeAktif.deskripsiSingkat}
            </p>
          </div>

          {/* Optional Visual Banner */}
          {periodeAktif.gambarUrl && (
            <div className="overflow-hidden border border-slate-800 bg-black/40">
              <img
                src={periodeAktif.gambarUrl}
                alt={periodeAktif.judul}
                className="w-full max-h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-2.5 bg-[#060A14] text-[11px] text-slate-400 font-serif italic border-t border-slate-800">
                Arsip Visual Terkait: {periodeAktif.judul}
              </div>
            </div>
          )}

          {/* In-depth Historical Narrative (with Drop Cap) */}
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C5A059] first-letter:float-left first-letter:mr-3 first-letter:mt-1 whitespace-pre-line">
            {periodeAktif.narasiPanjang}
          </div>

          {/* Key Analytical Points */}
          <div className="p-5 bg-[#060A14] border border-[#C5A059]/20 space-y-3">
            <h4 className="font-serif text-xs font-semibold tracking-wider text-[#DFB76C] uppercase">
              Poin-Poin Analisis Kunci:
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {periodeAktif.poinKunci.map((poin, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#C5A059] font-bold">▪</span>
                  <span>{poin}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Figures Definition */}
          {periodeAktif.tokohPenting && periodeAktif.tokohPenting.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-serif text-[#C5A059] uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                <span>Tokoh &amp; Pihak Penting dalam Periode Ini:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {periodeAktif.tokohPenting.map((tokoh, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-slate-200 bg-[#16284C] px-3 py-1 border border-slate-700"
                  >
                    {tokoh}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Associated Primary Documents */}
          {dokumenTerkait.length > 0 && (
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-serif text-[#DFB76C] uppercase tracking-wider">
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>Arsip Dokumen Terkait Periode Ini:</span>
              </div>
              
              <div className="space-y-2">
                {dokumenTerkait.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => padaPilihDokumen(doc)}
                    className="p-3.5 bg-[#0B1528] hover:bg-[#122240] border border-slate-800 hover:border-[#C5A059] transition-all flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#DFB76C]">
                        <span>{doc.nomorKatalog}</span>
                        <span>·</span>
                        <span>{doc.tanggal}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-100">
                        {doc.judul}
                      </div>
                    </div>
                    <button
                      className="px-3 py-1 bg-[#16284C] text-[11px] font-medium text-slate-200 uppercase tracking-wider border border-slate-700 hover:text-white shrink-0"
                    >
                      Buka Arsip
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
