import React, { useState } from 'react';
import { koleksiKhususNGR1961 } from '../../data/pusatDokumentasiNGRData';
import { ArsipKhususNGR } from '../../types';
import { 
  Building2, 
  Search, 
  Filter, 
  FileText, 
  Users, 
  BookOpen, 
  ExternalLink, 
  Download, 
  Share2, 
  Check, 
  Award, 
  ShieldCheck, 
  ScrollText,
  Calendar,
  Layers
} from 'lucide-react';

interface PusatDokumentasiNGRViewProps {
  padaPilihArsip?: (arsip: ArsipKhususNGR) => void;
}

export const PusatDokumentasiNGRView: React.FC<PusatDokumentasiNGRViewProps> = () => {
  const [kataKunci, setKataKunci] = useState('');
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>('semua');
  const [arsipDetailModal, setArsipDetailModal] = useState<ArsipKhususNGR | null>(null);
  const [tersalinId, setTersalinId] = useState<string | null>(null);

  const kategoriTab = [
    { id: 'semua', label: 'Semua Koleksi' },
    { id: 'dokumen_sidang', label: 'Risalah Sidang' },
    { id: 'biografi_anggota', label: '28 Anggota Parlemen' },
    { id: 'dokumen_pemerintah', label: 'Ordonansi & Ketetapan' },
    { id: 'arsip_1961', label: 'Manifesto 1961' },
    { id: 'surat_korespondensi', label: 'Surat Diplomasi & PBB' },
  ];

  const dataTersaring = koleksiKhususNGR1961.filter((item) => {
    const cocokKategori = kategoriTerpilih === 'semua' || item.kategoriKoleksi === kategoriTerpilih;
    const cocokKataKunci = 
      item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.kodeArsip.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.asalDokumen.toLowerCase().includes(kataKunci.toLowerCase());
    return cocokKategori && cocokKataKunci;
  });

  const salinSitasi = (item: ArsipKhususNGR) => {
    const sitasi = `Nieuw Guinea Raad Documentation Center. (${item.tanggal}). "${item.judul}". Kode Katalog: ${item.kodeArsip}. Sumber: ${item.asalDokumen}. Tautan: ${item.tautanSumber}`;
    navigator.clipboard.writeText(sitasi);
    setTersalinId(item.id);
    setTimeout(() => setTersalinId(null), 2500);
  };

  const unduhTeksDokumen = (item: ArsipKhususNGR) => {
    const konten = `========================================================================
PUSAT DOKUMENTASI DAN ARSIP SEJARAH NIEUW GUINEA RAAD 1961
========================================================================
KODE KATALOG : ${item.kodeArsip}
JUDUL ARSIP  : ${item.judul}
TANGGAL DOKUMEN: ${item.tanggal}
KATEGORI     : ${item.kategoriLabel}
LEMBAGA ASAL : ${item.asalDokumen}
REFERENSI    : ${item.tautanSumber}
------------------------------------------------------------------------
DESKRIPSI KURATORIAL:
${item.deskripsi}

------------------------------------------------------------------------
Standar Verifikasi: Dokumen Arsip Sejarah Terverifikasi (Nieuw Guinea Raad)
Situs Resmi: https://nieuw-guinea-raad.blogspot.com/
========================================================================`;

    const blob = new Blob([konten], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.kodeArsip}_NGR_Dokumen.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 bg-[#0B132B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero Section */}
        <div className="border border-[#C5A059]/30 bg-gradient-to-br from-[#101C38] via-[#0B132B] to-[#070D1D] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#DFB76C] text-xs font-serif tracking-widest uppercase mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Modul 8 · Arsip Parlemen Pertama Papua</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FBF9F5] leading-tight mb-4">
              Pusat Dokumentasi Nieuw Guinea Raad 1961
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-6">
              Repositori komprehensif risalah sidang resmi, orasi dan pidato 28 anggota dewan, dokumen konstitusi 
              ordonansi pembentukan dewan, naskah manifesto 19 Oktober 1961, serta arsip diplomatik korespondensi 
              internasional dan PBB yang meretas jalan politik Papua modern.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#C5A059]/20">
              <div className="bg-[#080D1A]/60 p-3 border border-[#C5A059]/20">
                <span className="text-[11px] font-mono text-[#C5A059] block uppercase">Tanggal Peresmian</span>
                <span className="text-lg font-serif font-bold text-[#FBF9F5]">5 April 1961</span>
              </div>
              <div className="bg-[#080D1A]/60 p-3 border border-[#C5A059]/20">
                <span className="text-[11px] font-mono text-[#C5A059] block uppercase">Jumlah Kursi Dewan</span>
                <span className="text-lg font-serif font-bold text-[#FBF9F5]">28 Anggota</span>
              </div>
              <div className="bg-[#080D1A]/60 p-3 border border-[#C5A059]/20">
                <span className="text-[11px] font-mono text-[#C5A059] block uppercase">Perwakilan Pribumi</span>
                <span className="text-lg font-serif font-bold text-[#FBF9F5]">23 Orang (82%)</span>
              </div>
              <div className="bg-[#080D1A]/60 p-3 border border-[#C5A059]/20">
                <span className="text-[11px] font-mono text-[#C5A059] block uppercase">Puncak Manifesto</span>
                <span className="text-lg font-serif font-bold text-[#FBF9F5]">19 Okt & 1 Des 1961</span>
              </div>
            </div>
          </div>
        </div>

        {/* 28 Anggota Parlemen Showcase Highlight */}
        <div className="border border-[#C5A059]/30 bg-[#0F1E38] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C5A059]/20">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FBF9F5] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C5A059]" />
                Komposisi Bersejarah 28 Anggota Nieuw Guinea Raad (1961)
              </h2>
              <p className="text-sm text-slate-300 font-sans mt-1">
                Terdiri dari 16 anggota terpilih melalui pemilihan umum langsung/bertingkat dan 12 anggota yang diangkat oleh Gubernur.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#DFB76C] text-xs font-mono">
              <Award className="w-4 h-4" />
              <span>Ketua Pertama: Mr. J.H.F. Sollewijn Gelpke</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { nama: 'Nicolaas Jouwe', distrik: 'Hollandia', peran: 'Wakil Ketua II Raad / Pemimpin Komite Nasional', suku: 'Sentani (Mamta)' },
              { nama: 'Markus Kaisiepo', distrik: 'Biak-Numfor', peran: 'Anggota Senior Dewan / Penasihat Adat', suku: 'Biak (Saireri)' },
              { nama: 'Nicolaas Tanggahma', distrik: 'Fakfak', peran: 'Anggota Raad / Tokoh Nasionalis Muslim', suku: 'Fakfak (Bomberai)' },
              { nama: 'Willem Inury', distrik: 'Ransiki & Manokwari', peran: 'Anggota Raad / Advokat Pendidikan Adat', suku: 'Arfak (Domberai)' },
              { nama: 'Herman Womsiwor', distrik: 'Hollandia Luar', peran: 'Ketua Delegasi Diplomasi PBB & Afrika-Asia', suku: 'Biak-Jayapura' },
              { nama: 'Silas Papare (Simpatisan Awal)', distrik: 'Serui / Jawa', peran: 'Tokoh Angkatan Muda Irian', suku: 'Yapen (Saireri)' },
              { nama: 'Frits Kirihio', distrik: 'Mahasiswa / Leiden', peran: 'Presidium Partai Nasional (PARNA)', suku: 'Biak / Saireri' },
              { nama: 'H.F.W. Gosewisch', distrik: 'Manokwari', peran: 'Anggota Perwakilan Komunitas Eropa', suku: 'Belanda/Indo-Eropa' },
            ].map((tokoh, idx) => (
              <div key={idx} className="bg-[#080D1A] border border-[#C5A059]/20 p-4 space-y-2 hover:border-[#C5A059]/50 transition-all">
                <div className="flex items-center justify-between text-[11px] text-[#C5A059] font-mono">
                  <span>Distrik: {tokoh.distrik}</span>
                  <span className="text-slate-400">#0{idx + 1}</span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#FBF9F5]">{tokoh.nama}</h3>
                <p className="text-xs text-slate-300 font-sans">{tokoh.peran}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Wilayah Adat:</span>
                  <span className="text-[#DFB76C]">{tokoh.suku}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[#101C38] border border-[#C5A059]/25 p-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder="Cari risalah sidang, ordonansi, manifesto, nomor arsip, atau nama anggota..."
                className="w-full bg-[#080D1A] border border-[#C5A059]/30 pl-10 pr-4 py-2.5 text-sm text-[#FBF9F5] placeholder-slate-400 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Quick Result Counter */}
            <div className="text-xs font-mono text-slate-300 px-3 py-2 bg-[#080D1A] border border-slate-700/60 shrink-0">
              Menampilkan <span className="text-[#DFB76C] font-bold">{dataTersaring.length}</span> Berkas Arsip
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#C5A059]/20 pb-3">
            {kategoriTab.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setKategoriTerpilih(tab.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  kategoriTerpilih === tab.id
                    ? 'bg-[#C5A059] text-[#080D1A] font-bold shadow-md'
                    : 'bg-[#101C38] text-slate-300 hover:text-[#DFB76C] border border-[#C5A059]/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Archives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataTersaring.map((item) => (
            <div 
              key={item.id}
              className="bg-[#101C38] border border-[#C5A059]/25 hover:border-[#C5A059] transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="p-6 space-y-4">
                {/* Meta Top Tag */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30">
                    {item.kodeArsip}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    {item.tanggal}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-lg text-[#FBF9F5] group-hover:text-[#DFB76C] transition-colors leading-snug">
                  {item.judul}
                </h3>

                {/* Label Category */}
                <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-serif">
                  <ScrollText className="w-3.5 h-3.5" />
                  <span>{item.kategoriLabel}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-4">
                  {item.deskripsi}
                </p>

                {/* Source Attribution */}
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <span className="text-slate-400 font-medium">Asal Dokumen: </span>
                  <span className="text-slate-200">{item.asalDokumen}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-6 py-3 bg-[#080D1A]/80 border-t border-[#C5A059]/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => setArsipDetailModal(item)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#DFB76C] hover:text-white transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Kajian Dokumen</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => salinSitasi(item)}
                    title="Salin Sitasi Akademik"
                    className="p-1.5 text-slate-400 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors cursor-pointer"
                  >
                    {tersalinId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => unduhTeksDokumen(item)}
                    title="Unduh Salinan Teks"
                    className="p-1.5 text-slate-400 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <a
                    href={item.tautanSumber}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Buka Sumber Referensi"
                    className="p-1.5 text-slate-400 hover:text-[#DFB76C] hover:bg-[#16284C] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Dokumen */}
        {arsipDetailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-3xl bg-[#0F1E38] border border-[#C5A059] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 bg-[#080D1A] border-b border-[#C5A059]/30 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#DFB76C]">
                    <span className="px-2 py-0.5 bg-[#C5A059]/20 border border-[#C5A059]/40">{arsipDetailModal.kodeArsip}</span>
                    <span>• {arsipDetailModal.tanggal}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#FBF9F5] leading-snug">
                    {arsipDetailModal.judul}
                  </h3>
                </div>
                <button
                  onClick={() => setArsipDetailModal(null)}
                  className="text-slate-400 hover:text-white p-1 text-xl font-mono"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-sm">
                <div className="bg-[#080D1A]/70 border border-[#C5A059]/20 p-4 space-y-2">
                  <div className="text-xs font-mono text-[#C5A059] uppercase tracking-wider">Klasifikasi Kuratorial</div>
                  <div className="text-slate-100 font-semibold">{arsipDetailModal.kategoriLabel}</div>
                  <div className="text-xs text-slate-400">Arsip Asal / Penerbit: {arsipDetailModal.asalDokumen}</div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#DFB76C]">Ikhtisar Historis Dokumen</h4>
                  <p className="leading-relaxed text-slate-300 font-sans whitespace-pre-line">
                    {arsipDetailModal.deskripsi}
                  </p>
                </div>

                <div className="space-y-2 bg-[#080D1A]/50 p-4 border border-slate-800">
                  <h4 className="text-xs font-mono text-[#C5A059] uppercase tracking-wider">Kutipan Sitasi Akademik Resmi (Format APA/Chicago)</h4>
                  <p className="text-xs font-mono text-slate-300 bg-black/40 p-3 border border-slate-800">
                    Nieuw Guinea Raad Documentation Center. ({arsipDetailModal.tanggal}). "{arsipDetailModal.judul}". Kode: {arsipDetailModal.kodeArsip}. Koleksi Arsip Sejarah Dewan Papua. {arsipDetailModal.asalDokumen}.
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-4 bg-[#080D1A] border-t border-[#C5A059]/30 flex items-center justify-between gap-4">
                <button
                  onClick={() => salinSitasi(arsipDetailModal)}
                  className="px-4 py-2 bg-[#16284C] hover:bg-[#203764] text-[#DFB76C] text-xs font-medium border border-[#C5A059]/30 flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{tersalinId === arsipDetailModal.id ? 'Sitasi Tersalin!' : 'Salin Sitasi'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => unduhTeksDokumen(arsipDetailModal)}
                    className="px-4 py-2 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Dokumen</span>
                  </button>
                  <button
                    onClick={() => setArsipDetailModal(null)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
