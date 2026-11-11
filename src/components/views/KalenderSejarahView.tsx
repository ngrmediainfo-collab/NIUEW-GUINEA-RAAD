import React, { useState } from 'react';
import { koleksiKalenderSejarahPapua } from '../../data/kalenderSejarahData';
import { PeristiwaKalender, TemaPeristiwaKalender, BahasaAktif } from '../../types';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  Share2, 
  Plus, 
  FileText, 
  Award, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send
} from 'lucide-react';

interface KalenderSejarahViewProps {
  bahasa?: BahasaAktif;
  padaPilihDokumen?: (dokumenId: string) => void;
}

export const KalenderSejarahView: React.FC<KalenderSejarahViewProps> = ({ bahasa = 'id' }) => {
  const [bulanTerpilih, setBulanTerpilih] = useState<number>(0); // 0 = Semua bulan
  const [temaTerpilih, setTemaTerpilih] = useState<string>('semua');
  const [kataKunci, setKataKunci] = useState<string>('');
  const [peristiwaDetail, setPeristiwaDetail] = useState<PeristiwaKalender | null>(null);
  const [modalUsulTerbuka, setModalUsulTerbuka] = useState<boolean>(false);
  const [notifSukses, setNotifSukses] = useState<string | null>(null);

  // Form Usulan Kontributor
  const [usulJudul, setUsulJudul] = useState('');
  const [usulTanggal, setUsulTanggal] = useState('');
  const [usulPenjelasan, setUsulPenjelasan] = useState('');
  const [usulSumber, setUsulSumber] = useState('');
  const [usulNamaKontributor, setUsulNamaKontributor] = useState('');

  const namaBulanID = [
    'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const namaBulanEN = [
    'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daftarBulan = bahasa === 'en' ? namaBulanEN : namaBulanID;

  const daftarTema: { id: string; labelID: string; labelEN: string }[] = [
    { id: 'semua', labelID: 'Semua Tema Sejarah', labelEN: 'All Themes' },
    { id: 'pembentukan_ngr', labelID: 'Nieuw Guinea Raad 1961', labelEN: 'NGR 1961' },
    { id: 'identitas_nasionalisme', labelID: 'Nasionalisme & 1 Des 1961', labelEN: 'Nationalism & Dec 1' },
    { id: 'new_york_agreement', labelID: 'Perjanjian New York 1962', labelEN: 'New York Agreement' },
    { id: 'untea', labelID: 'Pemerintahan UNTEA', labelEN: 'UNTEA Administration' },
    { id: 'penyerahan_1963', labelID: 'Penyerahan 1963', labelEN: '1963 Transfer' },
    { id: 'pepera_1969', labelID: 'Pepera 1969', labelEN: 'Act of Free Choice 1969' },
    { id: 'pendidikan_budaya_gereja', labelID: 'Pendidikan, Budaya & Gereja', labelEN: 'Education & Church' },
    { id: 'kemanusiaan_ham', labelID: 'Kemanusiaan & HAM', labelEN: 'Human Rights' },
    { id: 'diplomasi_internasional', labelID: 'Diplomasi Internasional', labelEN: 'International Diplomacy' },
    { id: 'politik_sosial_pasca1969', labelID: 'Politik Pasca-1969', labelEN: 'Post-1969 Politics' },
  ];

  // Filter Data
  const peristiwaTersaring = koleksiKalenderSejarahPapua.filter((item) => {
    const cocokBulan = bulanTerpilih === 0 || item.bulan === bulanTerpilih;
    const cocokTema = temaTerpilih === 'semua' || item.tema === temaTerpilih;
    const cocokCari = 
      item.judulPeristiwa.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.penjelasan.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.wilayah.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.tokohTerkait.some(t => t.toLowerCase().includes(kataKunci.toLowerCase()));
    return cocokBulan && cocokTema && cocokCari;
  });

  const handleKirimUsulan = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifSukses(
      bahasa === 'en'
        ? 'Thank you! Your historical event submission has been sent to the editorial committee for archival verification.'
        : 'Terima kasih! Usulan peristiwa sejarah Anda telah dikirim ke tim redaksi untuk verifikasi arsip.'
    );
    setModalUsulTerbuka(false);
    setUsulJudul('');
    setUsulTanggal('');
    setUsulPenjelasan('');
    setUsulSumber('');
    setUsulNamaKontributor('');
    setTimeout(() => setNotifSukses(null), 5000);
  };

  return (
    <div className="py-10 bg-[#0E1726] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header Hero Section */}
        <div className="border border-[#B99A55]/30 bg-gradient-to-br from-[#101C2C] via-[#0E1726] to-[#080E18] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B99A55]/15 border border-[#B99A55]/40 text-[#DFB76C] text-xs font-serif uppercase tracking-widest">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{bahasa === 'en' ? 'HISTORICAL CALENDAR OF PAPUA' : 'KALENDER SEJARAH BANGSA PAPUA'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {bahasa === 'en' 
                ? 'Chronology, Anniversaries & Historical Milestones' 
                : 'Kronologi, Hari Bersejarah & Tonggak Kemerdekaan'}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              {bahasa === 'en'
                ? 'An interactive timeline documenting pivotal moments from the dawn of customary society, 1855 Mansinam arrival, the 1961 Nieuw Guinea Raad proclamation, 1962 New York Agreement, to modern international diplomacy.'
                : 'Pusat penelusuran tanggal-tanggal krusial perjalanan bangsa Papua: mulai dari sejarah masyarakat adat, pekabaran Injil 1855, peresmian Nieuw Guinea Raad 5 April 1961, Manifesto 19 Oktober & 1 Desember 1961, hingga diplomasi Pasifik modern.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setModalUsulTerbuka(true)}
                className="px-4 py-2 bg-[#B99A55] hover:bg-[#C9AA65] text-[#101C2C] font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>{bahasa === 'en' ? 'Submit Historical Event' : 'Ajukan Peristiwa Sejarah'}</span>
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

        {/* Filter Bar: Bulan, Tema, & Pencarian */}
        <div className="space-y-4">
          
          {/* Baris Bulan 1–12 */}
          <div className="bg-[#101C2C] border border-[#B99A55]/30 p-3 overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-max">
              {daftarBulan.map((bulan, idx) => (
                <button
                  key={idx}
                  onClick={() => setBulanTerpilih(idx)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    bulanTerpilih === idx
                      ? 'bg-[#B99A55] text-black font-bold shadow-sm'
                      : 'bg-[#0E1726] text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {bulan}
                </button>
              ))}
            </div>
          </div>

          {/* Baris Filter Tema & Input Cari */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[#101C2C] border border-slate-800 p-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#B99A55] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder={bahasa === 'en' ? 'Search event, date, figure, or location...' : 'Cari peristiwa, tanggal bersejarah, nama tokoh, atau wilayah...'}
                className="w-full bg-[#080E18] border border-slate-700 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B99A55]"
              />
            </div>

            {/* Tema Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#B99A55]" />
              <select
                value={temaTerpilih}
                onChange={(e) => setTemaTerpilih(e.target.value)}
                className="bg-[#080E18] border border-slate-700 px-3 py-2 text-xs text-[#DFB76C] font-mono focus:outline-none focus:border-[#B99A55] cursor-pointer"
              >
                {daftarTema.map((t) => (
                  <option key={t.id} value={t.id}>
                    {bahasa === 'en' ? t.labelEN : t.labelID}
                  </option>
                ))}
              </select>
            </div>

            {/* Hasil hitung */}
            <div className="text-xs font-mono text-slate-400 shrink-0">
              {peristiwaTersaring.length} {bahasa === 'en' ? 'Events Found' : 'Peristiwa Ditemukan'}
            </div>

          </div>

        </div>

        {/* Linimasa Peristiwa (Timeline Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peristiwaTersaring.map((item) => (
            <div
              key={item.id}
              className="bg-[#101C2C] border border-[#B99A55]/25 hover:border-[#B99A55] transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Tanggal & Tema Tag */}
                <div className="p-5 pb-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 bg-[#B99A55]/15 text-[#DFB76C] border border-[#B99A55]/30 font-bold">
                    {item.tanggalFormat}
                  </span>
                  <span className="text-slate-400 text-[11px] font-sans">
                    {item.tahun}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[10px] font-mono uppercase text-[#B99A55] tracking-wide">
                    {item.temaLabel}
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-[#DFB76C] transition-colors leading-snug">
                    {item.judulPeristiwa}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {item.penjelasan}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B99A55] shrink-0" />
                      <span className="truncate">{item.wilayah}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#B99A55] shrink-0" />
                      <span className="truncate">{item.tokohTerkait.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 py-3 bg-[#080E18] border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setPeristiwaDetail(item)}
                  className="text-xs text-[#DFB76C] hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{bahasa === 'en' ? 'Examine Source & Impact' : 'Telaah Sumber & Dampak'}</span>
                </button>

                <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5">
                  Terverifikasi
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Peristiwa Sejarah */}
        {peristiwaDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-3xl bg-[#101C2C] border border-[#B99A55] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-[#080E18] border-b border-[#B99A55]/30 flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#DFB76C]">
                    <span className="px-2 py-0.5 bg-[#B99A55]/20 border border-[#B99A55]/40">{peristiwaDetail.tanggalFormat}</span>
                    <span>• {peristiwaDetail.temaLabel}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                    {peristiwaDetail.judulPeristiwa}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span>Lokasi: {peristiwaDetail.wilayah}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPeristiwaDetail(null)}
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
                    I. Latar Belakang Historis
                  </h4>
                  <p className="leading-relaxed text-slate-300">
                    {peristiwaDetail.latarBelakang}
                  </p>
                </div>

                {/* Uraian Peristiwa */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    II. Jalannya Peristiwa &amp; Fakta Sejarah
                  </h4>
                  <p className="leading-relaxed text-slate-200 bg-[#080E18] p-4 border-l-2 border-[#B99A55]">
                    {peristiwaDetail.penjelasan}
                  </p>
                </div>

                {/* Tokoh Terkait */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    III. Tokoh Terkait
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {peristiwaDetail.tokohTerkait.map((tokoh, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-[#080E18] border border-slate-700 text-xs text-slate-200 font-mono">
                        {tokoh}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dampak Sejarah */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#DFB76C] uppercase tracking-wider">
                    IV. Dampak Sejarah &amp; Dekolonisasi
                  </h4>
                  <p className="leading-relaxed text-slate-300">
                    {peristiwaDetail.dampakSejarah}
                  </p>
                </div>

                {/* Sumber Primer & Catatan Perspektif */}
                <div className="p-4 bg-[#080E18] border border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="text-[#B99A55] font-mono uppercase block font-bold">Sumber Primer / Arsip:</span>
                    <span className="text-slate-200 font-serif italic">{peristiwaDetail.sumberPrimer}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[#B99A55] font-mono uppercase block font-bold">Catatan Perspektif:</span>
                    <span className="text-slate-300 font-sans">{peristiwaDetail.catatanPerspektif}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#080E18] border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setPeristiwaDetail(null)}
                  className="px-6 py-2 bg-[#B99A55] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C9AA65]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Usulan Peristiwa dari Kontributor */}
        {modalUsulTerbuka && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-xl bg-[#101C2C] border border-[#B99A55] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="p-6 bg-[#080E18] border-b border-[#B99A55]/30 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    {bahasa === 'en' ? 'Submit Historical Event Proposal' : 'Ajukan Peristiwa Sejarah Baru'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {bahasa === 'en' 
                      ? 'Proposals will be reviewed by the archival editorial board against primary sources.'
                      : 'Usulan akan diverifikasi oleh dewan kurator arsip sebelum diterbitkan secara resmi.'}
                  </p>
                </div>
                <button onClick={() => setModalUsulTerbuka(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleKirimUsulan} className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Judul Peristiwa:</label>
                  <input
                    type="text"
                    required
                    value={usulJudul}
                    onChange={(e) => setUsulJudul(e.target.value)}
                    placeholder="Contoh: Pembentukan Partai Demokratik Papua 1960"
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Tanggal &amp; Tahun Terjadinya:</label>
                  <input
                    type="text"
                    required
                    value={usulTanggal}
                    onChange={(e) => setUsulTanggal(e.target.value)}
                    placeholder="Contoh: 10 Agustus 1960"
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Uraian / Penjelasan Peristiwa:</label>
                  <textarea
                    rows={4}
                    required
                    value={usulPenjelasan}
                    onChange={(e) => setUsulPenjelasan(e.target.value)}
                    placeholder="Jelaskan jalannya peristiwa, tokoh yang hadir, dan latar belakangnya..."
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Rujukan Dokumen / Sumber Primer:</label>
                  <input
                    type="text"
                    required
                    value={usulSumber}
                    onChange={(e) => setUsulSumber(e.target.value)}
                    placeholder="Contoh: Lembaran Negara No. 18/1960 atau Arsip Nasional Den Haag"
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono uppercase mb-1">Nama Kontributor / Peneliti:</label>
                  <input
                    type="text"
                    required
                    value={usulNamaKontributor}
                    onChange={(e) => setUsulNamaKontributor(e.target.value)}
                    placeholder="Nama lengkap Anda..."
                    className="w-full bg-[#080E18] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-[#B99A55]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalUsulTerbuka(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#B99A55] text-black font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Usulan</span>
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
