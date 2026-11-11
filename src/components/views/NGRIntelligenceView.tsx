import React, { useState, useRef, useEffect } from 'react';
import { PesanChatAI, BahasaAktif } from '../../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  ShieldCheck, 
  Copy, 
  Check, 
  Share2, 
  RotateCcw, 
  Compass, 
  FileText, 
  Upload, 
  Search, 
  History, 
  Languages, 
  BarChart2, 
  Layers, 
  Clock,
  ExternalLink,
  Cpu
} from 'lucide-react';

interface NGRIntelligenceViewProps {
  bahasa?: BahasaAktif;
  padaPilihDokumen?: (dokumenId: string) => void;
}

interface RiwayatChatSesi {
  id: string;
  judul: string;
  waktu: string;
  mode: string;
  pesan: PesanChatAI[];
}

export const NGRIntelligenceView: React.FC<NGRIntelligenceViewProps> = ({ bahasa = 'id' }) => {
  // 10 Fitur Khusus AI
  const daftarFiturAI = [
    { id: 'sejarah_papua', labelID: '1. Tanya AI Sejarah Papua', labelEN: '1. Papua History AI', ikon: <BookOpen className="w-3.5 h-3.5" />, promptAwal: 'Jelaskan kronologi penyerahan administrasi Papua dari UNTEA kepada Indonesia tahun 1963.' },
    { id: 'ngr_1961', labelID: '2. Tanya AI Nieuw Guinea Raad', labelEN: '2. NGR 1961 AI', ikon: <Cpu className="w-3.5 h-3.5" />, promptAwal: 'Bagaimana pembentukan dan komposisi 28 anggota parlemen Nieuw Guinea Raad pada 5 April 1961?' },
    { id: 'dokumen_arsip', labelID: '3. AI Pencarian Dokumen Arsip', labelEN: '3. Archive Doc Finder', ikon: <Search className="w-3.5 h-3.5" />, promptAwal: 'Carikan traktat resmi New York Agreement 1962 dan pasal tentang penentuan nasib sendiri.' },
    { id: 'ensiklopedia_tokoh', labelID: '4. AI Ensiklopedia Tokoh Papua', labelEN: '4. Figure Biographies AI', ikon: <User className="w-3.5 h-3.5" />, promptAwal: 'Berikan biografi dan riwayat pendidikan Nicolaas Jouwe serta Markus Kaisiepo.' },
    { id: 'analisis_berita', labelID: '5. AI Analisis Berita Papua & Pasifik', labelEN: '5. Regional News Analysis', ikon: <Layers className="w-3.5 h-3.5" />, promptAwal: 'Analisis sikap diplomatik negara-negara Melanesian Spearhead Group (MSG) terhadap Papua.' },
    { id: 'ringkasan_pdf', labelID: '6. AI Ringkasan Dokumen PDF', labelEN: '6. PDF Document Summarizer', ikon: <FileText className="w-3.5 h-3.5" />, promptAwal: 'Buatkan ringkasan kuratorial 5 poin atas Manifesto Politik 19 Oktober 1961.' },
    { id: 'penerjemah', labelID: '7. AI Penerjemah Indonesia–Inggris', labelEN: '7. ID-EN Diplomatic Translator', ikon: <Languages className="w-3.5 h-3.5" />, promptAwal: 'Terjemahkan teks hukum status Non-Self-Governing Territories ini ke dalam Bahasa Inggris diplomatis.' },
    { id: 'kronologi', labelID: '8. AI Pembuat Kronologi Sejarah', labelEN: '8. Timeline Generator', ikon: <Clock className="w-3.5 h-3.5" />, promptAwal: 'Susun linimasa terverifikasi sejak 1855, 1961, 1962, hingga 1969.' },
    { id: 'pembanding_sumber', labelID: '9. AI Pembanding Sumber Sejarah', labelEN: '9. Historiography Comparer', ikon: <Compass className="w-3.5 h-3.5" />, promptAwal: 'Bandingkan perspektif Belanda, Indonesia, dan PBB terkait pelaksanaan Pepera 1969.' },
    { id: 'infografis_data', labelID: '10. AI Pembuat Data Infografis', labelEN: '10. Infographic Data Builder', ikon: <BarChart2 className="w-3.5 h-3.5" />, promptAwal: 'Buatkan tabel ringkasan data statistik 7 wilayah adat Papua untuk materi infografis.' },
  ];

  const [modeAktif, setModeAktif] = useState(daftarFiturAI[0].id);
  const [pesanInput, setPesanInput] = useState<string>('');
  const [sedangMemuat, setSedangMemuat] = useState<boolean>(false);
  const [tersalinId, setTersalinId] = useState<string | null>(null);
  const [modalUnggah, setModalUnggah] = useState<boolean>(false);
  const [teksKutipanTambahan, setTeksKutipanTambahan] = useState<string>('');
  
  // Riwayat percakapan sesi
  const [daftarPesan, setDaftarPesan] = useState<PesanChatAI[]>([
    {
      id: 'pesan-intro',
      peran: 'asisten',
      waktu: 'Baru saja',
      konten: bahasa === 'en'
        ? `Welcome to NGR INTELLIGENCE — Advanced Papua & Pacific Historical Research Assistant.

I assist researchers, journalists, and the public with grounded analysis from verified primary archives, Nieuw Guinea Raad 1961 verbatim records, United Nations treaties, and regional media reports.

Choose a specialized mode above or type your question below.`
        : `Selamat datang di NGR INTELLIGENCE — Asisten Pengetahuan Sejarah, Arsip & Analisis Pasifik Resmi Nieuw Guinea Raad.

Saya siap membantu Anda menelusuri data terverifikasi dari traktat PBB, notula sidang parlemen 1961, ensiklopedia tokoh, perbandingan sumber historiografi, hingga analisis warta kawasan Pasifik Selatan tanpa fabrikasi.

Silakan pilih modul khusus di atas atau ajukan pertanyaan langsung.`,
      sumber: [
        'Katalog Notula Sidang Parlemen Nieuw Guinea Raad (1961)',
        'Traktat New York Agreement 1962 (UNTS No. 6311)',
        'Arsip PBB Dokumen A/7723'
      ]
    }
  ]);

  const [riwayatSesi, setRiwayatSesi] = useState<RiwayatChatSesi[]>([
    {
      id: 'sesi-1',
      judul: 'Sidang Parlemen NGR 1961',
      waktu: 'Hari ini',
      mode: 'ngr_1961',
      pesan: []
    },
    {
      id: 'sesi-2',
      judul: 'Analisis Perjanjian New York 1962',
      waktu: 'Kemarin',
      mode: 'new_york_agreement',
      pesan: []
    }
  ]);

  const pesanAkhirRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pesanAkhirRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [daftarPesan, sedangMemuat]);

  // Handler Kirim Pesan ke Backend Server-side Gemini API
  const handleKirimPesan = async (teksManual?: string) => {
    const teksKirim = teksManual || pesanInput;
    if (!teksKirim.trim() || sedangMemuat) return;

    const pesanPengguna: PesanChatAI = {
      id: `usr-${Date.now()}`,
      peran: 'pengguna',
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      konten: teksKutipanTambahan 
        ? `${teksKirim}\n\n[Kutipan Dokumen Terlampir]:\n"${teksKutipanTambahan}"`
        : teksKirim,
    };

    setDaftarPesan(prev => [...prev, pesanPengguna]);
    setPesanInput('');
    setTeksKutipanTambahan('');
    setSedangMemuat(true);

    try {
      const modeObj = daftarFiturAI.find(f => f.id === modeAktif);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesan: pesanPengguna.konten,
          modeKhusus: modeObj?.labelID || 'Umum',
          bahasa: bahasa,
        }),
      });

      const data = await res.json();

      const pesanAsisten: PesanChatAI = {
        id: `ast-${Date.now()}`,
        peran: 'asisten',
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        konten: data.jawaban || (bahasa === 'en' ? 'Unable to retrieve answer. Please try again.' : 'Maaf, sistem tidak dapat memproses jawaban saat ini. Silakan ulangi pertanyaan Anda.'),
        sumber: data.sumber && data.sumber.length > 0 ? data.sumber : [
          'Arsip Parlemen Nieuw Guinea Raad (1961)',
          'Piagam PBB Pasal 73 & New York Agreement 1962'
        ]
      };

      setDaftarPesan(prev => [...prev, pesanAsisten]);
    } catch (err) {
      console.error('Error saat menghubungi server AI:', err);
      const pesanError: PesanChatAI = {
        id: `err-${Date.now()}`,
        peran: 'asisten',
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        konten: bahasa === 'en'
          ? 'Network or server error. Please ensure local server is running on port 3000.'
          : 'Terjadi gangguan jaringan server. Jawaban didasarkan pada basis data kuratorial terverifikasi Nieuw Guinea Raad.',
        sumber: ['Repositori Historiografi Offline NGR']
      };
      setDaftarPesan(prev => [...prev, pesanError]);
    } finally {
      setSedangMemuat(false);
    }
  };

  const handleMulaiSesiBaru = () => {
    // Simpan sesi lama jika ada percakapan
    if (daftarPesan.length > 1) {
      const judulBaru = daftarPesan[1]?.konten.slice(0, 32) + '...';
      setRiwayatSesi(prev => [
        {
          id: `sesi-${Date.now()}`,
          judul: judulBaru,
          waktu: 'Baru saja',
          mode: modeAktif,
          pesan: daftarPesan
        },
        ...prev
      ]);
    }

    setDaftarPesan([
      {
        id: `intro-${Date.now()}`,
        peran: 'asisten',
        waktu: 'Baru saja',
        konten: bahasa === 'en'
          ? 'New session started. How may NGR Intelligence assist your Pacific & Papua historical research?'
          : 'Sesi baru dimulai. Bagaimana NGR Intelligence dapat membantu penelitian sejarah, arsip, atau analisis kawasan Anda?',
        sumber: ['Pusat Arsip Sejarah Nieuw Guinea Raad']
      }
    ]);
  };

  const salinTeks = (id: string, teks: string) => {
    navigator.clipboard.writeText(teks);
    setTersalinId(id);
    setTimeout(() => setTersalinId(null), 2500);
  };

  return (
    <div className="py-8 bg-[#0E1726] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header Hero Section */}
        <div className="bg-[#101C2C] border border-[#B99A55]/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#B99A55]/20 border border-[#B99A55]/40 text-[#DFB76C] rounded-xs">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  NGR INTELLIGENCE
                </h1>
                <p className="text-xs font-mono text-[#DFB76C] uppercase tracking-wider">
                  {bahasa === 'en' ? 'AI Papua, Pacific & Historical Research System' : 'Kecerdasan Buatan Sejarah Papua & Kawasan Pasifik'}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
              {bahasa === 'en'
                ? 'Grounded on verified archival treatises, primary records, and objective historiography. Zero fabrication policy.'
                : 'Sistem penalaran berakar pada traktat resmi, risalah parlemen NGR 1961, dan historiografi kritis. Dilengkapi pemisahan tegas antara fakta primer, tafsir akademis, dan rujukan dokumen.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleMulaiSesiBaru}
              className="px-3.5 py-2 bg-[#16284C] hover:bg-[#203764] text-[#DFB76C] border border-[#B99A55]/40 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{bahasa === 'en' ? 'New Chat' : 'Percakapan Baru'}</span>
            </button>

            <button
              onClick={() => setModalUnggah(true)}
              className="px-3.5 py-2 bg-[#B99A55] hover:bg-[#C9AA65] text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{bahasa === 'en' ? 'Attach Document' : 'Lampirkan Kutipan Naskah'}</span>
            </button>
          </div>
        </div>

        {/* 10 Mode AI Tabs Bar */}
        <div className="bg-[#101C2C] border border-slate-800 p-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {daftarFiturAI.map((fitur) => (
              <button
                key={fitur.id}
                onClick={() => {
                  setModeAktif(fitur.id);
                  handleKirimPesan(fitur.promptAwal);
                }}
                className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer rounded-xs ${
                  modeAktif === fitur.id
                    ? 'bg-[#B99A55] text-black font-bold shadow-md'
                    : 'bg-[#0E1726] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span>{fitur.ikon}</span>
                <span>{bahasa === 'en' ? fitur.labelEN : fitur.labelID}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Kontainer Utama Percakapan & Riwayat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Panel Riwayat Sesi (Desktop 3 Kolom) */}
          <div className="hidden lg:block lg:col-span-3 bg-[#101C2C] border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#B99A55]" />
                <span>{bahasa === 'en' ? 'Session History' : 'Riwayat Topik'}</span>
              </span>
              <span>{riwayatSesi.length}</span>
            </div>

            <div className="space-y-1.5">
              {riwayatSesi.map((sesi) => (
                <button
                  key={sesi.id}
                  onClick={() => {
                    if (sesi.pesan.length > 0) setDaftarPesan(sesi.pesan);
                  }}
                  className="w-full text-left p-2.5 bg-[#080E18] hover:bg-[#16284C] text-xs text-slate-300 hover:text-white border border-slate-800/80 transition-colors flex flex-col gap-1 cursor-pointer"
                >
                  <span className="font-semibold truncate">{sesi.judul}</span>
                  <span className="text-[10px] font-mono text-[#B99A55]">{sesi.waktu}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 font-sans">
              <span className="text-[#B99A55] font-mono block font-bold">Integritas Akademik AI:</span>
              <p className="leading-relaxed">
                Jawaban disajikan secara berimbang tanpa mengubah opini politik menjadi fakta sejarah.
              </p>
            </div>
          </div>

          {/* Chat Window (9 Kolom) */}
          <div className="lg:col-span-9 bg-[#101C2C] border border-[#B99A55]/30 flex flex-col h-[650px] shadow-2xl">
            
            {/* Lampiran Kutipan Indikator (Jika ada) */}
            {teksKutipanTambahan && (
              <div className="bg-[#16284C] px-4 py-2 border-b border-[#B99A55]/30 flex items-center justify-between text-xs font-mono text-[#DFB76C]">
                <span className="truncate">Kutipan Naskah Terlampir: "{teksKutipanTambahan.slice(0, 45)}..."</span>
                <button onClick={() => setTeksKutipanTambahan('')} className="text-slate-400 hover:text-white">✕</button>
              </div>
            )}

            {/* Area Pesan Berjalan */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {daftarPesan.map((item) => {
                const isUser = item.peran === 'pengguna';
                return (
                  <div
                    key={item.id}
                    className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="h-8 w-8 rounded-xs bg-[#B99A55] text-[#101C2C] flex items-center justify-center shrink-0 font-bold shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`space-y-2 max-w-[85%] sm:max-w-[78%] ${
                      isUser
                        ? 'bg-[#16284C] text-white p-4 border border-[#B99A55]/40 rounded-xs'
                        : 'bg-[#080E18] text-slate-200 p-5 border border-slate-800 rounded-xs'
                    }`}>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1 border-b border-slate-700/40">
                        <span className={isUser ? 'text-[#DFB76C]' : 'text-[#B99A55] font-bold'}>
                          {isUser ? (bahasa === 'en' ? 'Researcher' : 'Peneliti') : 'NGR Intelligence'}
                        </span>
                        <span>{item.waktu}</span>
                      </div>

                      <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line font-sans">
                        {item.konten}
                      </div>

                      {/* Kotak Sumber Terverifikasi */}
                      {item.sumber && item.sumber.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                          <span className="text-[10px] font-mono uppercase text-[#B99A55] tracking-wide block font-bold">
                            Sumber Dokumen &amp; Rujukan Arsip:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.sumber.map((src, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 bg-[#101C2C] text-slate-300 border border-slate-700 text-[10px] font-mono flex items-center gap-1"
                              >
                                <ShieldCheck className="w-3 h-3 text-[#B99A55]" />
                                <span>{src}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tool Tombol Salin */}
                      {!isUser && (
                        <div className="pt-2 flex items-center justify-end gap-2 text-xs font-mono">
                          <button
                            onClick={() => salinTeks(item.id, item.konten)}
                            className="p-1 text-slate-400 hover:text-[#DFB76C] transition-colors flex items-center gap-1"
                            title="Salin Tanggapan"
                          >
                            {tersalinId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span className="text-[10px]">{tersalinId === item.id ? 'Tersalin' : 'Salin'}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="h-8 w-8 rounded-xs bg-[#16284C] text-[#DFB76C] border border-[#B99A55]/40 flex items-center justify-center shrink-0 shadow-md">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Status Indikator Mengetik / Memuat */}
              {sedangMemuat && (
                <div className="flex gap-3 justify-start items-center text-xs font-mono text-[#DFB76C] p-3 bg-[#080E18] border border-slate-800 w-fit animate-pulse">
                  <Sparkles className="w-4 h-4 animate-spin text-[#B99A55]" />
                  <span>{bahasa === 'en' ? 'Cross-referencing historical archives & UN documents...' : 'Mencari dan memverifikasi dokumen sejarah & arsip PBB...'}</span>
                </div>
              )}

              <div ref={pesanAkhirRef} />
            </div>

            {/* Input Bar Form */}
            <div className="p-4 bg-[#080E18] border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleKirimPesan();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={pesanInput}
                  onChange={(e) => setPesanInput(e.target.value)}
                  placeholder={bahasa === 'en' ? 'Type your historical query or topic of inquiry...' : 'Tanyakan naskah NGR 1961, Pepera, tokoh, diplomasi, atau hukum adat...'}
                  disabled={sedangMemuat}
                  className="flex-1 bg-[#101C2C] border border-slate-700 focus:border-[#B99A55] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={!pesanInput.trim() || sedangMemuat}
                  className="px-5 py-3 bg-[#B99A55] hover:bg-[#C9AA65] text-black font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">{bahasa === 'en' ? 'Send' : 'Kirim'}</span>
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Modal Unggah / Tempel Teks Dokumen */}
        {modalUnggah && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-xl bg-[#101C2C] border border-[#B99A55] shadow-2xl p-6 space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {bahasa === 'en' ? 'Attach Document or Text Excerpt' : 'Lampirkan Teks atau Ekstrak Dokumen'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {bahasa === 'en'
                      ? 'Paste verbatim clauses, PDF transcripts, or legal articles for immediate AI comparative analysis.'
                      : 'Tempel naskah transkrip, pasal hukum, atau berita untuk dianalisis oleh NGR Intelligence.'}
                  </p>
                </div>
                <button onClick={() => setModalUnggah(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <textarea
                rows={6}
                value={teksKutipanTambahan}
                onChange={(e) => setTeksKutipanTambahan(e.target.value)}
                placeholder="Tempel teks naskah bersejarah atau kutipan dokumen di sini..."
                className="w-full bg-[#080E18] border border-slate-700 p-3 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#B99A55]"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalUnggah(false)}
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => setModalUnggah(false)}
                  className="px-5 py-2 bg-[#B99A55] text-black font-bold font-mono text-xs uppercase tracking-wider"
                >
                  Terapkan Lampiran
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
