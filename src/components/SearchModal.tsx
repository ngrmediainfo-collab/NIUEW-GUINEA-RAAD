import React, { useState, useMemo } from 'react';
import { DokumenArsip, ArtikelBlogger, MenuNavigasi } from '../types';
import { koleksiDokumenArsip } from '../data/archiveDocuments';
import { daftarPeriodeSejarah } from '../data/historicalPeriods';
import { koleksiPublikasiPenelitian } from '../data/researchPublications';
import { Search, X, BookOpen, Calendar, ArrowRight, ShieldCheck, Newspaper } from 'lucide-react';

interface SearchModalProps {
  terbuka: boolean;
  padaTutup: () => void;
  artikelBlogger: ArtikelBlogger[];
  padaPilihDokumen: (dokumen: DokumenArsip) => void;
  padaPilihArtikel: (artikel: ArtikelBlogger) => void;
  padaPilihNavigasi: (halaman: MenuNavigasi) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  terbuka,
  padaTutup,
  artikelBlogger,
  padaPilihDokumen,
  padaPilihArtikel,
  padaPilihNavigasi
}) => {
  const [kataKunci, setKataKunci] = useState('');

  const hasilPencarian = useMemo(() => {
    const q = kataKunci.toLowerCase().trim();
    if (!q) return { dokumen: [], periode: [], artikel: [], publikasi: [] };

    const dokumen = koleksiDokumenArsip.filter(d => 
      d.judul.toLowerCase().includes(q) ||
      d.nomorKatalog.toLowerCase().includes(q) ||
      d.ringkasan.toLowerCase().includes(q) ||
      d.kataKunci.some(k => k.toLowerCase().includes(q))
    );

    const periode = daftarPeriodeSejarah.filter(p =>
      p.judul.toLowerCase().includes(q) ||
      p.deskripsiSingkat.toLowerCase().includes(q) ||
      p.rentangTahun.toLowerCase().includes(q) ||
      p.tokohPenting.some(t => t.toLowerCase().includes(q))
    );

    const artikel = artikelBlogger.filter(a =>
      a.judul.toLowerCase().includes(q) ||
      a.ringkasan.toLowerCase().includes(q) ||
      a.label.some(l => l.toLowerCase().includes(q))
    );

    const publikasi = koleksiPublikasiPenelitian.filter(pub =>
      pub.judul.toLowerCase().includes(q) ||
      pub.penulis.toLowerCase().includes(q) ||
      pub.abstrak.toLowerCase().includes(q)
    );

    return { dokumen, periode, artikel, publikasi };
  }, [kataKunci, artikelBlogger]);

  if (!terbuka) return null;

  const totalHasil = 
    hasilPencarian.dokumen.length + 
    hasilPencarian.periode.length + 
    hasilPencarian.artikel.length + 
    hasilPencarian.publikasi.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-6 md:p-12">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={padaTutup} 
      />

      <div className="relative w-full max-w-3xl bg-[#090F1E] border border-[#C5A059]/50 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[85vh] mt-8">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#060A14] border-b border-[#C5A059]/30 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
          <input
            type="text"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari traktat, peristiwa, nama tokoh, tahun, atau nomor katalog arsip..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            autoFocus
          />
          {kataKunci && (
            <button
              onClick={() => setKataKunci('')}
              className="p-1 text-slate-400 hover:text-white"
              title="Bersihkan"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={padaTutup}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {!kataKunci ? (
            <div className="text-center py-10 space-y-3">
              <BookOpen className="w-8 h-8 text-[#C5A059]/50 mx-auto" />
              <p className="text-xs text-slate-400 font-serif">
                Ketik kata kunci seperti: <span className="text-[#DFB76C]">"1961"</span>, <span className="text-[#DFB76C]">"Bintang Kejora"</span>, <span className="text-[#DFB76C]">"New York"</span>, <span className="text-[#DFB76C]">"UNTEA"</span>, <span className="text-[#DFB76C]">"Pepera"</span>, atau <span className="text-[#DFB76C]">"Nicolaas Jouwe"</span>.
              </p>
            </div>
          ) : totalHasil === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400 font-serif">
              Tidak ditemukan arsip atau dokumen dengan kata kunci <span className="text-[#DFB76C]">"{kataKunci}"</span>.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dokumen Arsip Matches */}
              {hasilPencarian.dokumen.length > 0 && (
                <div>
                  <h4 className="text-xs font-serif tracking-widest text-[#C5A059] uppercase mb-2">
                    Dokumen Arsip ({hasilPencarian.dokumen.length})
                  </h4>
                  <div className="space-y-2">
                    {hasilPencarian.dokumen.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          padaPilihDokumen(doc);
                          padaTutup();
                        }}
                        className="w-full text-left p-3 bg-[#0B1528] hover:bg-[#122240] border border-slate-800 hover:border-[#C5A059]/50 transition-colors flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-mono text-[#DFB76C]">
                            <span>{doc.nomorKatalog}</span>
                            <span>·</span>
                            <span>{doc.tanggal}</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-100">
                            {doc.judul}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {doc.ringkasan}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sejarah Periode Matches */}
              {hasilPencarian.periode.length > 0 && (
                <div>
                  <h4 className="text-xs font-serif tracking-widest text-[#C5A059] uppercase mb-2">
                    Periode Sejarah ({hasilPencarian.periode.length})
                  </h4>
                  <div className="space-y-2">
                    {hasilPencarian.periode.map((per) => (
                      <button
                        key={per.id}
                        onClick={() => {
                          padaPilihNavigasi('sejarah_papua');
                          padaTutup();
                        }}
                        className="w-full text-left p-3 bg-[#0B1528] hover:bg-[#122240] border border-slate-800 transition-colors flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <div className="text-[10px] text-[#DFB76C] font-serif">
                            {per.rentangTahun}
                          </div>
                          <div className="text-xs font-semibold text-slate-100">
                            {per.judul}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {per.deskripsiSingkat}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Artikel Blogger Matches */}
              {hasilPencarian.artikel.length > 0 && (
                <div>
                  <h4 className="text-xs font-serif tracking-widest text-[#C5A059] uppercase mb-2">
                    Warta &amp; Terbitan Blogger ({hasilPencarian.artikel.length})
                  </h4>
                  <div className="space-y-2">
                    {hasilPencarian.artikel.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          padaPilihArtikel(art);
                          padaTutup();
                        }}
                        className="w-full text-left p-3 bg-[#0B1528] hover:bg-[#122240] border border-slate-800 transition-colors flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <Newspaper className="w-3 h-3 text-[#C5A059]" />
                            <span>{art.tanggalPublikasi}</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-100">
                            {art.judul}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Publikasi Penelitian Matches */}
              {hasilPencarian.publikasi.length > 0 && (
                <div>
                  <h4 className="text-xs font-serif tracking-widest text-[#C5A059] uppercase mb-2">
                    Publikasi Penelitian ({hasilPencarian.publikasi.length})
                  </h4>
                  <div className="space-y-2">
                    {hasilPencarian.publikasi.map((pub) => (
                      <button
                        key={pub.id}
                        onClick={() => {
                          padaPilihNavigasi('penelitian_publikasi');
                          padaTutup();
                        }}
                        className="w-full text-left p-3 bg-[#0B1528] hover:bg-[#122240] border border-slate-800 transition-colors flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <div className="text-[10px] text-[#DFB76C] font-mono">
                            {pub.nomorPublikasi} · {pub.penulis} ({pub.tahun})
                          </div>
                          <div className="text-xs font-semibold text-slate-100">
                            {pub.judul}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#060A14] border-t border-[#C5A059]/30 text-right">
          <span className="text-[11px] text-slate-500 font-serif">
            Sistem Pencarian Arsip &amp; Dokumen Sejarah Papua
          </span>
        </div>
      </div>
    </div>
  );
};
