import React, { useState, useEffect, useRef } from 'react';
import { DokumenArsip } from '../types';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Headphones, 
  Gauge, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Radio,
  FileAudio
} from 'lucide-react';

interface AudioNarrationPlayerProps {
  dokumen: DokumenArsip;
}

export const AudioNarrationPlayer: React.FC<AudioNarrationPlayerProps> = ({ dokumen }) => {
  const [sedangMemutar, setSedangMemutar] = useState<boolean>(false);
  const [jeda, setJeda] = useState<boolean>(false);
  const [kecepatan, setKecepatan] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [bisu, setBisu] = useState<boolean>(false);
  const [progres, setProgres] = useState<number>(0); // 0 sampai 100
  const [kalimatAktif, setKalimatAktif] = useState<string>('');
  const [indeksKalimat, setIndeksKalimat] = useState<number>(0);
  const [panelTerbuka, setPanelTerbuka] = useState<boolean>(true);
  const [suaraTersedia, setSuaraTersedia] = useState<SpeechSynthesisVoice[]>([]);
  const [suaraTerpilihIndex, setSuaraTerpilihIndex] = useState<number>(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const daftarKalimatRef = useRef<string[]>([]);
  const intervalProgresRef = useRef<number | null>(null);

  // Siapkan teks narasi terstruktur
  const siapkanTeksNarasi = (): string[] => {
    const bagianTeks: string[] = [];

    // Pengantar
    bagianTeks.push(`Arsip Sejarah Nieuw Guinea Raad. Nomor katalog ${dokumen.nomorKatalog}.`);
    bagianTeks.push(`${dokumen.judul}.`);
    bagianTeks.push(`Tanggal dokumen: ${dokumen.tanggal}.`);
    bagianTeks.push(`Klasifikasi: Sumber ${dokumen.jenisSumber}, kategori ${dokumen.kategori.replace('_', ' ')}.`);
    bagianTeks.push(`Sumber arsip resmi: ${dokumen.sumber}.`);

    // Ringkasan
    bagianTeks.push(`Ikhtisar dokumen: ${dokumen.ringkasan}`);

    // Transkrip Lengkap jika ada
    if (dokumen.transkripLengkap) {
      bagianTeks.push(`Kutipan naskah bersejarah: ${dokumen.transkripLengkap}`);
    }

    // Catatan Kuratorial
    if (dokumen.keteranganKuratorial) {
      bagianTeks.push(`Catatan kuratorial: ${dokumen.keteranganKuratorial}`);
    }

    // Pecah menjadi kalimat-kalimat pendek agar mudah dipantau
    const hasilKalimat: string[] = [];
    bagianTeks.forEach((blok) => {
      // Pecah berdasarkan tanda titik, seru, tanya, atau baris baru
      const split = blok
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .split(/(?<=[.?!])\s+/)
        .map(k => k.trim())
        .filter(k => k.length > 0);
      hasilKalimat.push(...split);
    });

    return hasilKalimat;
  };

  // Muat daftar suara sintesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const perbaruiDaftarSuara = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // Prioritaskan suara Bahasa Indonesia jika ada
          const suaraId = voices.filter(v => v.lang.startsWith('id') || v.lang.startsWith('ms'));
          const daftar = suaraId.length > 0 ? suaraId : voices.filter(v => v.lang.startsWith('en') || v.default);
          setSuaraTersedia(daftar.length > 0 ? daftar : voices);
        }
      };

      perbaruiDaftarSuara();
      window.speechSynthesis.onvoiceschanged = perbaruiDaftarSuara;
    }

    return () => {
      // Hentikan suara jika komponen dilepas
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (intervalProgresRef.current) {
        clearInterval(intervalProgresRef.current);
      }
    };
  }, []);

  // Reset pemutar saat dokumen berganti
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSedangMemutar(false);
    setJeda(false);
    setProgres(0);
    setKalimatAktif('');
    setIndeksKalimat(0);
    daftarKalimatRef.current = siapkanTeksNarasi();
  }, [dokumen]);

  // Fungsi memutar kalimat berikutnya secara berantai
  const putarKalimat = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Peramban Anda tidak mendukung Web Speech API untuk pemutaran audio.');
      return;
    }

    const kalimatList = daftarKalimatRef.current;
    if (index >= kalimatList.length) {
      // Selesai membaca seluruh dokumen
      setSedangMemutar(false);
      setJeda(false);
      setProgres(100);
      setKalimatAktif('Pembacaan narasi dokumen sejarah selesai.');
      return;
    }

    const teks = kalimatList[index];
    setIndeksKalimat(index);
    setKalimatAktif(teks);
    setProgres(Math.round(((index + 1) / kalimatList.length) * 100));

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(teks);
    utteranceRef.current = utterance;

    // Pilih suara Indonesia jika tersedia
    if (suaraTersedia.length > 0 && suaraTersedia[suaraTerpilihIndex]) {
      utterance.voice = suaraTersedia[suaraTerpilihIndex];
    }
    utterance.lang = 'id-ID';
    utterance.rate = kecepatan;
    utterance.volume = bisu ? 0 : volume;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      putarKalimat(index + 1);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis event:', e);
      // Jika terjadi interupsi biasa, jangan error fatal
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        putarKalimat(index + 1);
      }
    };

    window.speechSynthesis.speak(utterance);
    setSedangMemutar(true);
    setJeda(false);
  };

  // Handler Tombol Putar / Jeda
  const handleTogglePutar = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (!sedangMemutar) {
      // Mulai dari awal atau dari posisi terakhir
      putarKalimat(indeksKalimat < daftarKalimatRef.current.length ? indeksKalimat : 0);
    } else if (jeda) {
      // Lanjutkan dari jeda
      window.speechSynthesis.resume();
      setJeda(false);
    } else {
      // Jeda
      window.speechSynthesis.pause();
      setJeda(true);
    }
  };

  // Handler Hentikan Pemutaran
  const handleHentikan = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSedangMemutar(false);
    setJeda(false);
    setProgres(0);
    setIndeksKalimat(0);
    setKalimatAktif('');
  };

  // Handler Ulangi dari Awal
  const handleUlangi = () => {
    handleHentikan();
    setTimeout(() => {
      putarKalimat(0);
    }, 150);
  };

  // Ganti Kecepatan
  const gantiKecepatan = () => {
    const opsi = [0.8, 1, 1.25, 1.5];
    const currentIndex = opsi.indexOf(kecepatan);
    const nextSpeed = opsi[(currentIndex + 1) % opsi.length];
    setKecepatan(nextSpeed);

    // Jika sedang memutar, terapkan langsung pada kalimat aktif
    if (sedangMemutar && !jeda) {
      putarKalimat(indeksKalimat);
    }
  };

  // Toggle Bisu
  const toggleBisu = () => {
    const statusBaru = !bisu;
    setBisu(statusBaru);
    if (utteranceRef.current) {
      utteranceRef.current.volume = statusBaru ? 0 : volume;
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#070D1D] via-[#0C1733] to-[#070D1D] border border-[#C5A059]/40 shadow-xl overflow-hidden transition-all duration-300">
      
      {/* BILAH ATAS: STATUS & TOGGLE MINIMIZE */}
      <div className="px-4 py-2.5 bg-[#050A16] border-b border-[#C5A059]/25 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#C5A059]/15 border border-[#C5A059]/40 rounded text-[#DFB76C] relative">
            <Headphones className="w-4 h-4" />
            {sedangMemutar && !jeda && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-slate-100 text-[13px] tracking-wide">
                Narasi Suara Dokumen Sejarah
              </span>
              <span className="px-1.5 py-0.2 bg-[#C5A059]/20 text-[#DFB76C] text-[10px] font-mono border border-[#C5A059]/30 rounded">
                Audio ID
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
              Dengarkan pembacaan teks otentik dokumen <span className="text-slate-300 font-mono">[{dokumen.nomorKatalog}]</span>
            </p>
          </div>
        </div>

        {/* Visualizer Gelombang Suara (Waveform) Animasi */}
        <div className="flex items-center gap-3">
          {sedangMemutar && !jeda ? (
            <div className="flex items-center gap-0.5 h-4 px-2 bg-black/40 border border-[#C5A059]/30 rounded-xs">
              <span className="w-1 bg-[#C5A059] h-2.5 animate-pulse" />
              <span className="w-1 bg-[#DFB76C] h-4 animate-bounce" />
              <span className="w-1 bg-[#C5A059] h-1.5 animate-pulse" />
              <span className="w-1 bg-[#DFB76C] h-3 animate-bounce" />
              <span className="w-1 bg-[#C5A059] h-2 animate-pulse" />
            </div>
          ) : (
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              {jeda ? 'Dijeda' : 'Siap Diputar'}
            </span>
          )}

          <button
            onClick={() => setPanelTerbuka(!panelTerbuka)}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={panelTerbuka ? 'Sembunyikan Panel Kontrol' : 'Buka Panel Kontrol'}
          >
            {panelTerbuka ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* PANEL KONTROL UTAMA */}
      {panelTerbuka && (
        <div className="p-4 sm:p-5 space-y-3.5">
          
          {/* Baris Kontrol Tombol Putar, Navigasi & Indikator */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Tombol Aksi Utama */}
            <div className="flex items-center gap-2">
              {/* Tombol Play/Pause */}
              <button
                onClick={handleTogglePutar}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-xs shadow-md transition-all cursor-pointer"
                title={sedangMemutar && !jeda ? 'Jeda Pembacaan' : 'Mulai Pembacaan Narasi'}
              >
                {sedangMemutar && !jeda ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>{jeda ? 'Lanjutkan' : 'Dengarkan'}</span>
                  </>
                )}
              </button>

              {/* Tombol Stop */}
              <button
                onClick={handleHentikan}
                disabled={!sedangMemutar && !jeda}
                className="p-2 bg-[#101C38] hover:bg-[#182C58] text-slate-300 hover:text-white border border-slate-700/60 rounded-xs transition-colors cursor-pointer disabled:opacity-30 disabled:hover:text-slate-300"
                title="Hentikan Pembacaan"
              >
                <Square className="w-3.5 h-3.5" />
              </button>

              {/* Tombol Ulangi */}
              <button
                onClick={handleUlangi}
                className="p-2 bg-[#101C38] hover:bg-[#182C58] text-slate-300 hover:text-[#DFB76C] border border-slate-700/60 rounded-xs transition-colors cursor-pointer"
                title="Ulangi dari Awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Kontrol Kecepatan, Suara, dan Volume */}
            <div className="flex items-center gap-3 text-xs font-mono">
              
              {/* Tombol Kecepatan */}
              <button
                onClick={gantiKecepatan}
                className="px-2.5 py-1 bg-[#080D1A] border border-[#C5A059]/30 text-[#DFB76C] hover:text-white rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                title="Ubah Kecepatan Suara"
              >
                <Gauge className="w-3 h-3 text-[#C5A059]" />
                <span>{kecepatan}x</span>
              </button>

              {/* Pilihan Suara jika ada lebih dari 1 */}
              {suaraTersedia.length > 1 && (
                <div className="hidden lg:flex items-center gap-1 bg-[#080D1A] border border-slate-700 px-2 py-0.5 rounded-xs text-[11px]">
                  <span className="text-slate-400">Suara:</span>
                  <select
                    value={suaraTerpilihIndex}
                    onChange={(e) => setSuaraTerpilihIndex(Number(e.target.value))}
                    className="bg-transparent text-[#DFB76C] focus:outline-none cursor-pointer max-w-[120px] truncate"
                  >
                    {suaraTersedia.map((voice, idx) => (
                      <option key={idx} value={idx} className="bg-[#0B132B] text-slate-200">
                        {voice.name.replace(/Google|Microsoft/g, '').trim()} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Kontrol Volume & Mute */}
              <div className="flex items-center gap-1.5 bg-[#080D1A] border border-slate-700 px-2 py-1 rounded-xs">
                <button
                  onClick={toggleBisu}
                  className="text-slate-400 hover:text-[#DFB76C] transition-colors cursor-pointer"
                  title={bisu ? 'Bunyikan' : 'Bisukan'}
                >
                  {bisu ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={bisu ? 0 : volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    setBisu(v === 0);
                  }}
                  className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                  title={`Volume: ${Math.round((bisu ? 0 : volume) * 100)}%`}
                />
              </div>

            </div>

          </div>

          {/* PROGRESS BAR LINIMASA PEMBACAAN */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-[#DFB76C]">
                <Radio className="w-3 h-3 text-[#C5A059]" />
                <span>Bagian {indeksKalimat + 1} dari {Math.max(daftarKalimatRef.current.length, 1)}</span>
              </span>
              <span>{progres}%</span>
            </div>
            
            <div className="w-full bg-[#050A16] h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-[#C5A059] to-[#DFB76C] h-full transition-all duration-300"
                style={{ width: `${progres}%` }}
              />
            </div>
          </div>

          {/* SUBTITLE / KARAOKE BOX: TEKS KALIMAT YANG SEDANG DIBACAKAN */}
          <div className="bg-[#050812]/90 border border-[#C5A059]/20 p-3 rounded-xs min-h-[46px] flex items-center justify-between gap-3">
            <div className="flex items-start gap-2 text-xs">
              <FileAudio className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <p className="text-slate-200 font-sans leading-relaxed italic">
                {kalimatAktif ? (
                  `"${kalimatAktif}"`
                ) : (
                  <span className="text-slate-400 font-sans not-italic">
                    Klik tombol <strong>Dengarkan</strong> untuk memulai pembacaan narasi suara dokumen sejarah ini.
                  </span>
                )}
              </p>
            </div>

            {sedangMemutar && !jeda && (
              <span className="shrink-0 px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono rounded">
                Membaca
              </span>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
