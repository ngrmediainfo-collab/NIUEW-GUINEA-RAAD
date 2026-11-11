import React, { useState } from 'react';
import { TokohSejarahPapua, KategoriTokoh } from '../../types';
import { koleksiTokohSejarah } from '../../data/tokohData';
import { 
  Users, 
  Search, 
  GraduationCap, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  X, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const TokohSejarahView: React.FC = () => {
  const [kategoriFilter, setKategoriFilter] = useState<string>('semua');
  const [kataKunci, setKataKunci] = useState('');
  const [tokohAktifModal, setTokohAktifModal] = useState<TokohSejarahPapua | null>(null);

  const daftarKategori = [
    { id: 'semua', label: 'Seluruh Tokoh Sejarah' },
    { id: 'tokoh_ngr', label: 'Tokoh Nieuw Guinea Raad' },
    { id: 'nasionalisme', label: 'Nasionalisme Papua' },
    { id: 'perjuangan', label: 'Perjuangan Kemerdekaan' },
    { id: 'kebudayaan', label: 'Kebudayaan & Seni' },
    { id: 'gereja_masyarakat', label: 'Gereja & Masyarakat Adat' },
    { id: 'pendidikan', label: 'Pendidikan & Perintis' }
  ];

  const tokohTerfilter = koleksiTokohSejarah.filter((t) => {
    if (kategoriFilter !== 'semua' && t.kategori !== kategoriFilter) return false;
    if (kataKunci.trim()) {
      const q = kataKunci.toLowerCase();
      const cocok = 
        t.namaLengkap.toLowerCase().includes(q) ||
        (t.gelarAtauJulukan && t.gelarAtauJulukan.toLowerCase().includes(q)) ||
        t.peranSejarah.toLowerCase().includes(q) ||
        t.pemikiranDanPandanganPolitik.toLowerCase().includes(q);
      if (!cocok) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          <Users className="w-4 h-4" />
          <span>Biografi &amp; Historiografi Kritis Pemimpin Bangsa</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          TOKOH SEJARAH DAN PERJUANGAN POLITIK PAPUA
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Ensiklopedia biografi terverifikasi yang mendokumentasikan riwayat hidup, pemikiran politik, dan kontribusi para tokoh parlemen Nieuw Guinea Raad, perintis nasionalisme, pejuang kemerdekaan, pimpinan gereja, budayawan, dan tokoh integrasi dalam keragaman perspektif sejarah.
        </p>

        <div className="p-3 bg-[#060A14] border-l-2 border-[#C5A059] text-xs text-slate-400 mt-2">
          <strong className="text-slate-200">Prinsip Pluralisme Sejarah:</strong> Tokoh-tokoh Papua memiliki spektrum pemikiran dan pilihan politik yang beragam. Ensiklopedia ini menyajikan rekam jejak mereka secara objektif berdasarkan arsip sejarah terverifikasi tanpa generalisasi sepihak.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#080E1C] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari nama tokoh, gelar, atau peran..."
            className="w-full bg-[#060A14] border border-slate-700 text-slate-100 pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {daftarKategori.map(k => (
            <button
              key={k.id}
              onClick={() => setKategoriFilter(k.id)}
              className={`px-3 py-1.5 font-serif transition-colors cursor-pointer ${
                kategoriFilter === k.id
                  ? 'bg-[#C5A059] text-black font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tokohTerfilter.map((tokoh) => (
          <article
            key={tokoh.id}
            onClick={() => setTokohAktifModal(tokoh)}
            className="bg-[#080E1C] border border-slate-800 hover:border-[#C5A059] transition-all p-6 space-y-4 flex flex-col justify-between group cursor-pointer shadow-lg"
          >
            <div className="space-y-4">
              {/* Photo & Basic Info Lockup */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-24 shrink-0 overflow-hidden bg-black/60 border border-slate-700">
                  <img
                    src={tokoh.fotoUrl}
                    alt={tokoh.namaLengkap}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase block truncate">
                    {tokoh.kategoriLabel}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-100 group-hover:text-[#DFB76C] transition-colors leading-snug">
                    {tokoh.namaLengkap}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {tokoh.tahunLahirWafat}
                  </div>
                  <div className="text-[11px] text-slate-400 font-serif italic truncate">
                    {tokoh.tempatLahir}
                  </div>
                </div>
              </div>

              {/* Perspective Label (Unboxed) */}
              <div className="text-[11px] font-mono text-[#DFB76C] border-t border-b border-slate-800/80 py-1.5">
                Aliran: {tokoh.perspektifHistoris}
              </div>

              {/* Historical Role Excerpt */}
              <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                {tokoh.peranSejarah}
              </p>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-[#C5A059] group-hover:text-white transition-colors">
              <span className="font-serif">Buka Biografi Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>

      {/* Detailed Modal Dossier */}
      {tokohAktifModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setTokohAktifModal(null)}
          />

          <div className="relative w-full max-w-3xl bg-[#090F1E] border border-[#C5A059]/50 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#060A14] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between">
              <span className="font-mono text-xs text-[#C5A059] uppercase">
                BERKAS BIOGRAFI RESMI · {tokohAktifModal.kategoriLabel}
              </span>
              <button
                onClick={() => setTokohAktifModal(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Header Profile */}
              <div className="flex flex-col sm:flex-row items-start gap-6 border-b border-slate-800 pb-6">
                <div className="w-28 h-36 shrink-0 overflow-hidden bg-black/60 border border-[#C5A059]/40 shadow-md">
                  <img
                    src={tokohAktifModal.fotoUrl}
                    alt={tokohAktifModal.namaLengkap}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#C5A059]">
                    {tokohAktifModal.tempatLahir} ({tokohAktifModal.tahunLahirWafat})
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
                    {tokohAktifModal.namaLengkap}
                  </h2>
                  {tokohAktifModal.gelarAtauJulukan && (
                    <div className="text-sm font-serif italic text-[#DFB76C]">
                      {tokohAktifModal.gelarAtauJulukan}
                    </div>
                  )}
                  <div className="text-xs font-mono text-slate-400 pt-1">
                    Klasifikasi Sejarah: <span className="text-slate-200">{tokohAktifModal.perspektifHistoris}</span>
                  </div>
                </div>
              </div>

              {/* Education */}
              {tokohAktifModal.riwayatPendidikan && (
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[#DFB76C] font-serif font-semibold">
                    <GraduationCap className="w-4 h-4 text-[#C5A059]" />
                    <span>Riwayat Pendidikan:</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 ml-5 list-disc">
                    {tokohAktifModal.riwayatPendidikan.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Life Narrative */}
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
                  Perjalanan Hidup &amp; Konteks Zaman
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-line bg-[#060A14] p-4 border-l-2 border-[#C5A059]">
                  {tokohAktifModal.perjalananHidup}
                </p>
              </div>

              {/* Political Thoughts */}
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
                  Pemikiran &amp; Pandangan Politik
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {tokohAktifModal.pemikiranDanPandanganPolitik}
                </p>
              </div>

              {/* Contributions */}
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
                  Peran Sejarah &amp; Kontribusi
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {tokohAktifModal.perjuanganDanKontribusi}
                </p>
              </div>

              {/* Works/Publications if any */}
              {tokohAktifModal.karyaDanPublikasi && (
                <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800">
                  <span className="font-serif text-[#DFB76C] font-semibold block">
                    Karya, Pidato &amp; Naskah Penting:
                  </span>
                  <ul className="space-y-1 text-slate-300 ml-5 list-disc font-serif italic">
                    {tokohAktifModal.karyaDanPublikasi.map((k, idx) => (
                      <li key={idx}>{k}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verified Sources */}
              <div className="space-y-1 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-serif">
                <span className="text-[#C5A059] font-semibold block">Rujukan Dokumen &amp; Sumber Primer:</span>
                {tokohAktifModal.sumberSejarah.map((s, idx) => (
                  <div key={idx} className="italic">▪ {s}</div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#060A14] px-6 py-3 border-t border-[#C5A059]/30 text-right">
              <button
                onClick={() => setTokohAktifModal(null)}
                className="px-4 py-1.5 text-xs font-serif uppercase tracking-wider text-slate-200 bg-[#16284C] hover:bg-[#1E3563] transition-colors"
              >
                Tutup Berkas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
