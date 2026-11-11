import React, { useState, useRef, useEffect } from 'react';
import { PesanChatAI } from '../../types';
import { Emblem } from '../Emblem';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  RotateCcw, 
  Copy, 
  Check, 
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';

export const TanyaAIView: React.FC = () => {
  const [pesanInput, setPesanInput] = useState('');
  const [memuat, setMemuat] = useState(false);
  const [tersalinId, setTersalinId] = useState<string | null>(null);

  const [riwayatChat, setRiwayatChat] = useState<PesanChatAI[]>([
    {
      id: 'pesan-0',
      peran: 'asisten',
      waktu: 'Sekarang',
      konten: `Salam hormat. Saya adalah **TANYA SEJARAH PAPUA AI**, asisten digital penelitian sejarah, arsip, tokoh, peristiwa, dan perkembangan politik Papua di bawah naungan Pusat Dokumentasi Nieuw Guinea Raad.

Saya diprogram dengan basis pengetahuan yang bersumber dari naskah primer PBB, traktat resmi, arsip Belanda, lembaran negara, dan kesaksian sejarah terverifikasi.

Silakan ajukan pertanyaan mengenai:
- Parlemen **Nieuw Guinea Raad 1961** dan para anggotanya
- Peristiwa dan Manifesto Politik **1 Desember 1961**
- Tinjauan hukum **Perjanjian New York 1962** dan Pasal XVIII
- Masa transisi **UNTEA 1962–1963**
- Pelaksanaan **Pepera 1969** dan Laporan PBB Ortiz Sanz A/7723
- Etnografi dan kebudayaan **Tujuh Wilayah Adat Papua**
- Biografi tokoh-tokoh sejarah bangsa Papua`,
      sumber: ['Arsip Nasional Belanda (Nationaal Archief)', 'United Nations Treaty Series', 'Handelingen van de Nieuw-Guinea Raad 1961']
    }
  ]);

  const akhirPesanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    akhirPesanRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [riwayatChat]);

  const contohPertanyaan = [
    'Jelaskan pembentukan Nieuw Guinea Raad pada 5 April 1961 dan komposisi anggotanya.',
    'Apa landasan hukum dan isi Manifesto Politik 1 Desember 1961?',
    'Bagaimana analisis yuridis Pasal XVIII Perjanjian New York 1962?',
    'Apa isi laporan Utusan Khusus PBB Ortiz Sanz (A/7723) mengenai Pepera 1969?',
    'Sebutkan dan jelaskan perbedaan sistem adat antara Mamta, Saireri, dan La Pago.'
  ];

  const handleKirimPesan = async (teksKirim?: string) => {
    const q = teksKirim || pesanInput;
    if (!q.trim() || memuat) return;

    const pesanPengguna: PesanChatAI = {
      id: `usr-${Date.now()}`,
      peran: 'pengguna',
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      konten: q.trim()
    };

    setRiwayatChat(prev => [...prev, pesanPengguna]);
    setPesanInput('');
    setMemuat(true);

    try {
      const respon = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesan: q.trim() })
      });

      const data = await respon.json();

      if (data.sukses) {
        const pesanBot: PesanChatAI = {
          id: `bot-${Date.now()}`,
          peran: 'asisten',
          waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          konten: data.jawaban,
          sumber: data.sumber || ['Pusat Arsip Sejarah Nieuw Guinea Raad']
        };
        setRiwayatChat(prev => [...prev, pesanBot]);
      } else {
        throw new Error(data.error || 'Gagal memproses jawaban.');
      }
    } catch (err: any) {
      const pesanError: PesanChatAI = {
        id: `err-${Date.now()}`,
        peran: 'asisten',
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        konten: `Terjadi kendala teknis saat memproses basis data sejarah: ${err?.message || 'Koneksi terganggu'}. Silakan coba kembali sesaat lagi.`,
        sumber: ['Sistem Keamanan NGR']
      };
      setRiwayatChat(prev => [...prev, pesanError]);
    } finally {
      setMemuat(false);
    }
  };

  const handleSalinTeks = (id: string, teks: string) => {
    navigator.clipboard.writeText(teks);
    setTersalinId(id);
    setTimeout(() => setTersalinId(null), 2000);
  };

  const handleResetChat = () => {
    setRiwayatChat([riwayatChat[0]]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          <Bot className="w-4 h-4 text-[#C5A059]" />
          <span>Asisten Digital Kuratorial &amp; Kecerdasan Sejarah</span>
        </div>
        
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          TANYA SEJARAH PAPUA AI
        </h1>

        <p className="text-sm text-slate-300 font-sans max-w-2xl">
          "Asisten digital untuk menelusuri sejarah, arsip, tokoh, peristiwa, dan perkembangan politik Papua."
        </p>

        {/* Ethical Standards Ribbon */}
        <div className="p-3 bg-[#060A14] border-l-2 border-[#C5A059] flex items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Berbasis RAG Arsip Primer · Anti-Rekayasa Sejarah · Verifikasi Multi-Sumber</span>
          </div>

          <button
            onClick={handleResetChat}
            className="text-[#DFB76C] hover:text-white flex items-center gap-1 font-mono text-[11px] cursor-pointer"
            title="Mulai Sesi Baru"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang</span>
          </button>
        </div>
      </div>

      {/* Suggested Questions Strip */}
      <div className="space-y-2">
        <span className="text-[11px] font-serif uppercase tracking-wider text-[#C5A059] block">
          Pertanyaan Sejarah Pilihan:
        </span>
        <div className="flex flex-wrap gap-2">
          {contohPertanyaan.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleKirimPesan(q)}
              className="px-3 py-1.5 text-xs text-slate-300 bg-[#080E1C] hover:bg-[#122240] hover:text-[#DFB76C] border border-slate-800 transition-colors text-left cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-[#080E1C] border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 min-h-[480px] max-h-[650px] overflow-y-auto">
        {riwayatChat.map((chat) => {
          const isUser = chat.peran === 'pengguna';
          return (
            <div
              key={chat.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              {/* Header Label */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className={isUser ? 'text-[#DFB76C]' : 'text-[#C5A059]'}>
                  {isUser ? 'PENELITI / PENGUNJUNG' : 'TANYA SEJARAH PAPUA AI'}
                </span>
                <span>·</span>
                <span>{chat.waktu}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`p-5 max-w-3xl text-sm leading-relaxed font-sans border ${
                  isUser
                    ? 'bg-[#122240] text-slate-100 border-[#C5A059]/40'
                    : 'bg-[#060A14] text-slate-200 border-slate-800'
                }`}
              >
                <div className="whitespace-pre-line space-y-3 font-sans [&>strong]:text-[#DFB76C] [&>ul]:list-disc [&>ul]:ml-4">
                  {chat.konten}
                </div>

                {/* Sources Attribution */}
                {chat.sumber && chat.sumber.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                    <span className="font-serif text-[#C5A059] block font-semibold text-[11px]">
                      Basis Rujukan Sumber Dokumen:
                    </span>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
                      {chat.sumber.map((s, idx) => (
                        <span key={idx} className="bg-slate-900 px-2 py-0.5 border border-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Copy Button */}
                {!isUser && (
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => handleSalinTeks(chat.id, chat.konten)}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#DFB76C] transition-colors cursor-pointer"
                    >
                      {tersalinId === chat.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Teks Jawaban</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {memuat && (
          <div className="flex items-center gap-2 p-4 bg-[#060A14] border border-slate-800 text-xs text-[#C5A059] font-mono">
            <Sparkles className="w-4 h-4 animate-spin text-[#DFB76C]" />
            <span>Memindai basis pengetahuan arsip sejarah dan traktat resmi...</span>
          </div>
        )}

        <div ref={akhirPesanRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-[#080E1C] p-4 border border-[#C5A059]/40 flex items-center gap-3">
        <textarea
          rows={2}
          value={pesanInput}
          onChange={(e) => setPesanInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleKirimPesan();
            }
          }}
          placeholder="Tanyakan sejarah Papua, tokoh, perjanjian 1962, NGR 1961, Pepera, atau 7 wilayah adat..."
          className="flex-1 bg-[#060A14] border border-slate-700 text-slate-100 placeholder-slate-500 p-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] resize-none"
        />

        <button
          onClick={() => handleKirimPesan()}
          disabled={memuat || !pesanInput.trim()}
          className="px-6 py-3 bg-[#C5A059] hover:bg-[#DFB76C] disabled:opacity-50 text-[#080D1A] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>Kirim</span>
        </button>
      </div>
    </div>
  );
};
