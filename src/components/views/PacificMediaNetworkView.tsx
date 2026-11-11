import React, { useState } from 'react';
import { koleksiPacificMediaNetwork } from '../../data/pacificMediaNetworkData';
import { PacificMediaPartner, BahasaAktif } from '../../types';
import { 
  Globe2, 
  Search, 
  Filter, 
  MapPin, 
  Radio, 
  ExternalLink, 
  Mail, 
  Users, 
  Send, 
  CheckCircle2, 
  Share2, 
  FileText,
  Building2,
  Tv,
  Newspaper
} from 'lucide-react';

interface PacificMediaNetworkViewProps {
  bahasa?: BahasaAktif;
}

export const PacificMediaNetworkView: React.FC<PacificMediaNetworkViewProps> = ({ bahasa = 'id' }) => {
  const [filterNegara, setFilterNegara] = useState<string>('semua');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [kataKunci, setKataKunci] = useState<string>('');
  const [modalKirimArtikel, setModalKirimArtikel] = useState<boolean>(false);
  const [notifSukses, setNotifSukses] = useState<string | null>(null);

  // Form Kontributor Internasional
  const [judulArtikel, setJudulArtikel] = useState('');
  const [namaPenulis, setNamaPenulis] = useState('');
  const [asalNegara, setAsalNegara] = useState('Vanuatu');
  const [emailKontak, setEmailKontak] = useState('');
  const [isiRingkasan, setIsiRingkasan] = useState('');

  const daftarWilayah = [
    'semua',
    'Tanah Papua',
    'Vanuatu',
    'Papua Nugini (PNG)',
    'Fiji',
    'Kepulauan Solomon',
    'Kaledonia Baru (Kanaky)',
    'Samoa',
    'Selandia Baru (Aotearoa)',
    'Australia & Selandia Baru',
    'Tonga',
    'Kepulauan Marshall',
    'Palau (Belau)'
  ];

  const dataTersaring = koleksiPacificMediaNetwork.filter((item) => {
    const cocokNegara = filterNegara === 'semua' || item.negaraWilayah === filterNegara;
    const cocokStatus = filterStatus === 'semua' || item.statusKerjasama === filterStatus;
    const cocokCari =
      item.namaMedia.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.negaraWilayah.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.fokusLiputan.some(f => f.toLowerCase().includes(kataKunci.toLowerCase())) ||
      (item.korespondenNama && item.korespondenNama.toLowerCase().includes(kataKunci.toLowerCase()));
    return cocokNegara && cocokStatus && cocokCari;
  });

  const handleKirimKolaborasi = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifSukses(
      bahasa === 'en'
        ? 'Thank you! Your cross-border article dispatch has been received by Pacific Media Network desk.'
        : 'Terima kasih! Naskah kolaborasi jurnalistik Anda telah diterima oleh meja redaksi Pacific Media Network.'
    );
    setModalKirimArtikel(false);
    setJudulArtikel('');
    setNamaPenulis('');
    setEmailKontak('');
    setIsiRingkasan('');
    setTimeout(() => setNotifSukses(null), 5000);
  };

  return (
    <div className="py-10 bg-[#0E1726] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header Hero Section */}
        <div className="border border-[#B99A55]/30 bg-gradient-to-br from-[#101C2C] via-[#0E1726] to-[#080E18] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B99A55]/15 border border-[#B99A55]/40 text-[#DFB76C] text-xs font-serif uppercase tracking-widest">
              <Globe2 className="w-3.5 h-3.5" />
              <span>PACIFIC MEDIA NETWORK</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {bahasa === 'en' 
                ? 'Regional Journalism & Pacific News Exchange' 
                : 'Jaringan Media, Koresponden & Kolaborasi Pasifik'}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              {bahasa === 'en'
                ? 'A collaborative media alliance connecting investigative journalists and newsrooms across Melanesia, Micronesia, Polynesia, Australia, and New Zealand to amplify indigenous voices and regional truths.'
                : 'Pusat kolaborasi pemberitaan yang menghubungkan ruang redaksi, koresponden lapangan, dan jurnalis independen di 17 negara dan wilayah kepulauan Pasifik guna menyuarakan keadilan iklim, dekolonisasi, dan hak asasi manusia.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setModalKirimArtikel(true)}
                className="px-4 py-2 bg-[#B99A55] hover:bg-[#C9AA65] text-[#101C2C] font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>{bahasa === 'en' ? 'Submit International Article' : 'Kirim Liputan / Rilis Media'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifikasi Sukses */}
        {notifSukses && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-sans flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{notifSukses}</span>
          </div>
        )}

        {/* Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[#101C2C] border border-slate-800 p-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#B99A55] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder={bahasa === 'en' ? 'Search media, country, correspondent, or topic...' : 'Cari media, negara, nama koresponden, atau topik liputan...'}
                className="w-full bg-[#080E18] border border-slate-700 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B99A55]"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#080E18] border border-slate-700 px-3 py-2 text-xs text-[#DFB76C] font-mono focus:outline-none focus:border-[#B99A55] cursor-pointer"
              >
                <option value="semua">{bahasa === 'en' ? 'All Partnership Status' : 'Semua Status Kemitraan'}</option>
                <option value="mitra_resmi">{bahasa === 'en' ? 'Confirmed Partners' : 'Mitra Terkonfirmasi'}</option>
                <option value="kontak_korespondensi">{bahasa === 'en' ? 'Correspondence Contacts' : 'Kontak Korespondensi'}</option>
                <option value="calon_mitra">{bahasa === 'en' ? 'Prospective Partners' : 'Calon Mitra'}</option>
              </select>
            </div>

            {/* Results count */}
            <div className="text-xs font-mono text-slate-400 shrink-0">
              {dataTersaring.length} {bahasa === 'en' ? 'Outlets Listed' : 'Media Terdaftar'}
            </div>
          </div>

          {/* Wilayah Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono">
            {daftarWilayah.map((neg) => (
              <button
                key={neg}
                onClick={() => setFilterNegara(neg)}
                className={`px-3 py-1.5 whitespace-nowrap uppercase tracking-wider transition-all cursor-pointer ${
                  filterNegara === neg
                    ? 'bg-[#B99A55] text-black font-bold shadow-md'
                    : 'bg-[#101C2C] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {neg === 'semua' ? (bahasa === 'en' ? 'All Territories' : 'Semua Wilayah') : neg}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Kartu Media Partner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataTersaring.map((item) => (
            <div
              key={item.id}
              className="bg-[#101C2C] border border-[#B99A55]/25 hover:border-[#B99A55] transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="p-6 space-y-4">
                
                {/* Meta Top: Status Tag & Country */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A55]" />
                    <span className="font-semibold">{item.negaraWilayah}</span>
                  </span>

                  <span className={`px-2 py-0.5 text-[10px] uppercase font-bold border ${
                    item.statusKerjasama === 'mitra_resmi'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : item.statusKerjasama === 'kontak_korespondensi'
                      ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                  }`}>
                    {item.statusKerjasama === 'mitra_resmi'
                      ? 'Mitra Resmi'
                      : item.statusKerjasama === 'kontak_korespondensi'
                      ? 'Korespondensi'
                      : 'Calon Mitra'}
                  </span>
                </div>

                {/* Media Name & Type */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#DFB76C] transition-colors leading-snug">
                    {item.namaMedia}
                  </h3>
                  <div className="text-xs font-mono text-[#DFB76C] mt-1 flex items-center gap-1.5">
                    <Radio className="w-3 h-3" />
                    <span>{item.tipeMedia} · {item.kotaKantor}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                  {item.deskripsi}
                </p>

                {/* Coverage Tags */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Fokus Liputan:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.fokusLiputan.map((fokus, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-[#080E18] text-slate-300 border border-slate-800">
                        #{fokus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Correspondent */}
                {item.korespondenNama && (
                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#B99A55]" />
                      <span>{item.korespondenNama}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#B99A55]">{item.bahasa.join(', ')}</span>
                  </div>
                )}

              </div>

              {/* Action Footer */}
              <div className="px-6 py-3 bg-[#080E18] border-t border-slate-800 flex items-center justify-between">
                <a
                  href={item.situsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#DFB76C] hover:text-white font-medium flex items-center gap-1"
                >
                  <span>{bahasa === 'en' ? 'Visit Newsroom' : 'Kunjungi Redaksi'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {item.kontakEmail && (
                  <a
                    href={`mailto:${item.kontakEmail}`}
                    className="text-xs text-slate-400 hover:text-[#DFB76C] flex items-center gap-1 font-mono"
                    title={`Email ke ${item.kontakEmail}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Hubungi</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Kirim Kolaborasi Artikel Internasional */}
        {modalKirimArtikel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-xl bg-[#101C2C] border border-[#B99A55] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="p-6 bg-[#080E18] border-b border-[#B99A55]/30 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    {bahasa === 'en' ? 'Submit Cross-Border Article' : 'Kirim Liputan Kolaborasi Pasifik'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {bahasa === 'en' 
                      ? 'Dispatch stories or press releases for publication across the Pacific Media Network.'
                      : 'Kirimkan rilis berita, investigasi, atau opini untuk diterbitkan di jejaring media Pasifik.'}
                  </p>
                </div>
                <button onClick={() => setModalKirimArtikel(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleKirimKolaborasi} className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Judul Liputan / Berita:</label>
                  <input
                    type="text"
                    required
                    value={judulArtikel}
                    onChange={(e) => setJudulArtikel(e.target.value)}
                    placeholder="Contoh: Dampak Kenaikan Muka Air Laut di Kepulauan Torres..."
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-mono uppercase mb-1">Nama Jurnalis / Penulis:</label>
                    <input
                      type="text"
                      required
                      value={namaPenulis}
                      onChange={(e) => setNamaPenulis(e.target.value)}
                      placeholder="Nama lengkap..."
                      className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-mono uppercase mb-1">Negara / Wilayah Liputan:</label>
                    <select
                      value={asalNegara}
                      onChange={(e) => setAsalNegara(e.target.value)}
                      className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                    >
                      {daftarWilayah.filter(w => w !== 'semua').map((w, idx) => (
                        <option key={idx} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Email Korespondensi Redaksi:</label>
                  <input
                    type="email"
                    required
                    value={emailKontak}
                    onChange={(e) => setEmailKontak(e.target.value)}
                    placeholder="nama@media.org"
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Ringkasan Liputan &amp; Sumber Fakta:</label>
                  <textarea
                    rows={4}
                    required
                    value={isiRingkasan}
                    onChange={(e) => setIsiRingkasan(e.target.value)}
                    placeholder="Tuliskan pokok temuan, narasumber yang dikutip, dan fakta terverifikasi..."
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalKirimArtikel(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#B99A55] text-black font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke Meja Redaksi</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
