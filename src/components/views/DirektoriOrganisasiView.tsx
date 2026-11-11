import React, { useState } from 'react';
import { koleksiOrganisasiPolitikPapua } from '../../data/partaiDanOrganisasiData';
import { ProfilOrganisasiPolitik, KategoriOrganisasi, BahasaAktif } from '../../types';
import { 
  Building, 
  Search, 
  Filter, 
  Users, 
  Award, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Layers,
  MapPin
} from 'lucide-react';

interface DirektoriOrganisasiViewProps {
  bahasa?: BahasaAktif;
}

export const DirektoriOrganisasiView: React.FC<DirektoriOrganisasiViewProps> = ({ bahasa = 'id' }) => {
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>('semua');
  const [kataKunci, setKataKunci] = useState<string>('');
  const [organisasiDetail, setOrganisasiDetail] = useState<ProfilOrganisasiPolitik | null>(null);

  const daftarKategori = [
    { id: 'semua', labelID: 'Semua Organisasi & Partai', labelEN: 'All Organizations' },
    { id: 'partai_politik', labelID: 'Partai Politik Historis', labelEN: 'Political Parties' },
    { id: 'gerakan_nasional', labelID: 'Gerakan Sipil & Nasional', labelEN: 'Civil & National Movements' },
    { id: 'organisasi_diplomasi', labelID: 'Diplomasi Internasional', labelEN: 'Diplomatic Missions' },
    { id: 'organisasi_masyarakat_gereja', labelID: 'Masyarakat Adat & Gereja', labelEN: 'Customary & Church' },
    { id: 'organisasi_perjuangan_historis', labelID: 'Organisasi Perjuangan Historis', labelEN: 'Historical Armed Movements' },
  ];

  const dataTersaring = koleksiOrganisasiPolitikPapua.filter((item) => {
    const cocokKategori = kategoriTerpilih === 'semua' || item.kategori === kategoriTerpilih;
    const cocokCari = 
      item.namaResmi.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.namaLainAtauSingkatan.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.tujuanOrganisasi.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.pendiriDanTokoh.some(t => t.toLowerCase().includes(kataKunci.toLowerCase()));
    return cocokKategori && cocokCari;
  });

  return (
    <div className="py-10 bg-[#0E1726] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header Hero Section */}
        <div className="border border-[#B99A55]/30 bg-gradient-to-br from-[#101C2C] via-[#0E1726] to-[#080E18] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B99A55]/15 border border-[#B99A55]/40 text-[#DFB76C] text-xs font-serif uppercase tracking-widest">
              <Building className="w-3.5 h-3.5" />
              <span>{bahasa === 'en' ? 'POLITICAL PARTIES & MOVEMENTS DIRECTORY' : 'DIREKTORI PARTAI & ORGANISASI PERJUANGAN PAPUA'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {bahasa === 'en' 
                ? 'Parties, Movements & Civil Organizations' 
                : 'Partai Politik, Gerakan Nasional & Organisasi Perjuangan'}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              {bahasa === 'en'
                ? 'An authoritative, objective archival registry documenting verified political parties (PARNA, DVP), civil national movements (Komite Nasional 1961, PDP), customary councils (DAP), diplomatic bodies (ULMWP), and historical resistance movements.'
                : 'Pusat inventarisasi resmi seluruh partai politik, gerakan pergerakan sipil, badan diplomasi, lembaga adat, gereja, dan kelompok perlawanan bersejarah Papua berdasarkan naskah statuta, arsip primer, dan catatan sejarah berimbang.'}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#B99A55]" />
              <span>{bahasa === 'en' ? 'Verifiable archival sources only · Neutral documentary standard' : 'Hanya memuat data terverifikasi arsip resmi · Standar dokumenter independen'}</span>
            </div>
          </div>
        </div>

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
                placeholder={bahasa === 'en' ? 'Search by party name, abbreviation, founder, or goal...' : 'Cari nama partai, singkatan, tokoh pendiri, atau tujuan politik...'}
                className="w-full bg-[#080E18] border border-slate-700 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B99A55]"
              />
            </div>

            {/* Results count */}
            <div className="text-xs font-mono text-slate-400 shrink-0">
              {dataTersaring.length} {bahasa === 'en' ? 'Entities Listed' : 'Entitas Terdata'}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {daftarKategori.map((kat) => (
              <button
                key={kat.id}
                onClick={() => setKategoriTerpilih(kat.id)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  kategoriTerpilih === kat.id
                    ? 'bg-[#B99A55] text-black font-bold shadow-md'
                    : 'bg-[#101C2C] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {bahasa === 'en' ? kat.labelEN : kat.labelID}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Kartu Organisasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataTersaring.map((item) => (
            <div
              key={item.id}
              className="bg-[#101C2C] border border-[#B99A55]/25 hover:border-[#B99A55] transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="p-6 space-y-4">
                
                {/* Meta Top */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 bg-[#B99A55]/15 text-[#DFB76C] border border-[#B99A55]/30">
                    {item.kategoriLabel}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B99A55]" />
                    {item.tahunBerdiri}
                  </span>
                </div>

                {/* Name & Abbreviation */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#DFB76C] transition-colors leading-snug">
                    {item.namaResmi}
                  </h3>
                  <div className="text-xs font-mono text-[#DFB76C] mt-1">
                    {item.namaLainAtauSingkatan}
                  </div>
                </div>

                {/* Goals */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                  {item.tujuanOrganisasi}
                </p>

                {/* Founders */}
                <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-start gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#B99A55] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-mono text-[10px] block uppercase">Tokoh &amp; Pendiri:</span>
                      <span className="text-slate-200">{item.pendiriDanTokoh.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A55] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-mono text-[10px] block uppercase">Basis Aktivitas:</span>
                      <span className="text-slate-300">{item.wilayahAktivitas.join(', ')}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div className="px-6 py-3 bg-[#080E18] border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setOrganisasiDetail(item)}
                  className="text-xs text-[#DFB76C] hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{bahasa === 'en' ? 'Full Archival Dossier' : 'Kajian Lengkap Profil'}</span>
                </button>

                <span className="text-[10px] font-mono text-slate-400">
                  {item.statusVerifikasi}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Profil Lengkap Organisasi */}
        {organisasiDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-3xl bg-[#101C2C] border border-[#B99A55] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
              
              {/* Header */}
              <div className="p-6 bg-[#080E18] border-b border-[#B99A55]/30 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#DFB76C]">
                    <span className="px-2 py-0.5 bg-[#B99A55]/20 border border-[#B99A55]/40">{organisasiDetail.kategoriLabel}</span>
                    <span>• {organisasiDetail.tahunBerdiri}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {organisasiDetail.namaResmi}
                  </h3>
                  <div className="text-xs font-mono text-[#DFB76C]">
                    {organisasiDetail.namaLainAtauSingkatan}
                  </div>
                </div>
                <button
                  onClick={() => setOrganisasiDetail(null)}
                  className="text-slate-400 hover:text-white p-1 text-xl font-mono cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-sm font-sans">
                
                {/* Latar Belakang */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    I. Latar Belakang Sejarah Pembentukan
                  </h4>
                  <p className="leading-relaxed text-slate-300">
                    {organisasiDetail.latarBelakangSejarah}
                  </p>
                </div>

                {/* Tujuan */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    II. Maksud, Tujuan &amp; Landasan Politik
                  </h4>
                  <p className="leading-relaxed text-slate-200 bg-[#080E18] p-4 border-l-2 border-[#B99A55]">
                    {organisasiDetail.tujuanOrganisasi}
                  </p>
                </div>

                {/* Perkembangan & Perubahan */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    III. Perkembangan Dinamika &amp; Transformasi
                  </h4>
                  <p className="leading-relaxed text-slate-300">
                    {organisasiDetail.perkembanganDanPerubahan}
                  </p>
                </div>

                {/* Tokoh & Pendiri */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    IV. Pendiri &amp; Tokoh Terkait
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {organisasiDetail.pendiriDanTokoh.map((tokoh, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-[#080E18] border border-slate-700 text-xs text-slate-200 font-mono">
                        {tokoh}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dokumen & Pernyataan Resmi */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    V. Dokumen &amp; Pernyataan Bersejarah
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                    {organisasiDetail.dokumenDanPernyataanResmi.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-[#080E18] p-2 border border-slate-800">
                        <FileText className="w-3.5 h-3.5 text-[#B99A55] shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Referensi Arsip */}
                <div className="p-4 bg-[#080E18] border border-slate-800 space-y-2 text-xs">
                  <div className="text-[#B99A55] font-mono uppercase font-bold">
                    Rujukan Arsip Primer &amp; Historiografi:
                  </div>
                  <ul className="space-y-1 text-slate-400 font-serif italic">
                    {organisasiDetail.referensiArsip.map((ref, idx) => (
                      <li key={idx}>• {ref}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-[#080E18] border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setOrganisasiDetail(null)}
                  className="px-6 py-2 bg-[#B99A55] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C9AA65]"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
