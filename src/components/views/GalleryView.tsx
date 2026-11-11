import React, { useState } from 'react';
import { FotoGaleri } from '../../types';
import { koleksiGaleriFoto } from '../../data/photoGallery';
import { X, ZoomIn, Calendar, MapPin, Camera, Image as ImageIcon } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const [fotoAktif, setFotoAktif] = useState<FotoGaleri | null>(null);
  const [kategoriFilter, setKategoriFilter] = useState<string>('semua');

  const daftarKategori = [
    { id: 'semua', label: 'Seluruh Koleksi Foto' },
    { id: 'politik', label: 'Politik & Sidang Parlemen' },
    { id: 'diplomasi', label: 'Diplomasi Internasional & PBB' },
    { id: 'kebudayaan', label: 'Kebudayaan & Masyarakat Adat' },
    { id: 'tokoh', label: 'Tokoh & Pemimpin Bangsa' },
    { id: 'peristiwa', label: 'Peristiwa Bersejarah' }
  ];

  const fotoTerfilter = kategoriFilter === 'semua'
    ? koleksiGaleriFoto
    : koleksiGaleriFoto.filter(f => f.kategori === kategoriFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          Kurasi Visual &amp; Fotografi Museum
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          Galeri Sejarah Papua
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Dokumentasi visual berstandar museum yang merekam detik-detik pelantikan parlemen Nieuw Guinea Raad 1961, perundingan diplomatik di PBB, kehidupan masyarakat adat, dan momentum penting kebangsaan Papua.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-[#080E1C] border border-slate-800">
        {daftarKategori.map(k => (
          <button
            key={k.id}
            onClick={() => setKategoriFilter(k.id)}
            className={`px-3 py-1.5 text-xs font-serif transition-colors cursor-pointer ${
              kategoriFilter === k.id
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fotoTerfilter.map((foto) => (
          <div
            key={foto.id}
            onClick={() => setFotoAktif(foto)}
            className="group bg-[#080E1C] border border-slate-800 hover:border-[#C5A059] transition-all overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Photo Container with Archival Framing */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/60">
                <img
                  src={foto.gambarUrl}
                  alt={foto.judul}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1.5 bg-black/80 border border-[#C5A059] text-xs font-serif text-[#DFB76C] flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Perbesar Arsip</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#DFB76C]">
                  <span className="bg-black/80 px-2 py-0.5 border border-[#C5A059]/30">
                    {foto.tahun}
                  </span>
                  <span className="text-slate-400">
                    {foto.kategori.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Museum Label */}
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-mono text-[#C5A059] block">
                  {foto.nomorRegistrasi}
                </span>

                <h3 className="font-serif text-base font-bold text-slate-100 group-hover:text-[#DFB76C] transition-colors leading-snug">
                  {foto.judul}
                </h3>

                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                  {foto.deskripsi}
                </p>
              </div>
            </div>

            {/* Bottom Location & Source Ribbon */}
            <div className="px-5 py-3 bg-[#060A14] border-t border-slate-800 text-[11px] text-slate-500 font-serif flex items-center justify-between">
              <span className="truncate">{foto.lokasi}</span>
              <span className="text-[#C5A059] shrink-0 font-sans text-xs">Detail &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {fotoAktif && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setFotoAktif(null)}
          />

          <div className="relative w-full max-w-4xl bg-[#090F1E] border border-[#C5A059]/50 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Top Bar */}
            <div className="bg-[#060A14] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between">
              <span className="font-mono text-xs text-[#C5A059]">
                {fotoAktif.nomorRegistrasi} · ARSIP MUSEUM NGR
              </span>
              <button
                onClick={() => setFotoAktif(null)}
                className="p-1.5 text-slate-400 hover:text-white"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo View */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="border border-slate-800 overflow-hidden bg-black/80 flex items-center justify-center">
                <img
                  src={fotoAktif.gambarUrl}
                  alt={fotoAktif.judul}
                  className="w-full max-h-[55vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Archival Placard Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-4 text-xs font-serif text-[#DFB76C] mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {fotoAktif.tahun}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {fotoAktif.lokasi}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#FBF9F5]">
                    {fotoAktif.judul}
                  </h2>
                </div>

                <div className="p-4 bg-[#060A14] border-l-2 border-[#C5A059] text-sm text-slate-300 leading-relaxed font-sans">
                  {fotoAktif.deskripsi}
                </div>

                <div className="text-xs text-slate-400 font-serif flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Sumber Kuratorial: {fotoAktif.fotograferAtauSumber}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#060A14] px-6 py-3 border-t border-[#C5A059]/30 text-right">
              <button
                onClick={() => setFotoAktif(null)}
                className="px-4 py-1.5 text-xs font-serif uppercase tracking-wider text-slate-200 bg-[#16284C] hover:bg-[#1E3563] transition-colors"
              >
                Tutup Tampilan Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
