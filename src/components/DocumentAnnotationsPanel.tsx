import React, { useState, useEffect } from 'react';
import { DokumenArsip, AnotasiDokumen, WarnaSorotan } from '../types';
import { 
  Highlighter, 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Search, 
  Bookmark, 
  Filter, 
  Tag,
  Share2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface DocumentAnnotationsPanelProps {
  dokumen: DokumenArsip;
  teksPilihanAwal?: string;
  padaBersihkanPilihan?: () => void;
  padaPilihTeksAnotasi?: (teks: string) => void;
}

export const DocumentAnnotationsPanel: React.FC<DocumentAnnotationsPanelProps> = ({
  dokumen,
  teksPilihanAwal = '',
  padaBersihkanPilihan,
  padaPilihTeksAnotasi,
}) => {
  const storageKey = `ngr_anotasi_${dokumen.id}`;

  const [daftarAnotasi, setDaftarAnotasi] = useState<AnotasiDokumen[]>([]);
  const [formulirTerbuka, setFormulirTerbuka] = useState<boolean>(Boolean(teksPilihanAwal));
  
  // State Form Input
  const [teksDisorotInput, setTeksDisorotInput] = useState<string>(teksPilihanAwal);
  const [catatanInput, setCatatanInput] = useState<string>('');
  const [warnaInput, setWarnaInput] = useState<WarnaSorotan>('emas');
  const [kategoriInput, setKategoriInput] = useState<AnotasiDokumen['kategoriCatatan']>('fakta_kunci');
  const [idAnotasiDiedit, setIdAnotasiDiedit] = useState<string | null>(null);

  // Filter & Search
  const [filterWarna, setFilterWarna] = useState<string>('semua');
  const [filterKategori, setFilterKategori] = useState<string>('semua');
  const [kataKunciCari, setKataKunciCari] = useState<string>('');
  const [tersalinId, setTersalinId] = useState<string | null>(null);

  // Muat dari localStorage saat dokumen berubah
  useEffect(() => {
    try {
      const tersimpan = localStorage.getItem(storageKey);
      if (tersimpan) {
        setDaftarAnotasi(JSON.parse(tersimpan));
      } else {
        // Berikan 1 catatan contoh kuratorial yang ramah jika belum ada
        const catatanAwal: AnotasiDokumen = {
          id: `note-init-${dokumen.id}`,
          dokumenId: dokumen.id,
          nomorKatalog: dokumen.nomorKatalog,
          teksDisorot: dokumen.ringkasan.slice(0, 120) + '...',
          catatanPribadi: 'Catatan penting: Memuat poin kunci kedudukan hukum dan historiografi dekolonisasi.',
          warna: 'emas',
          waktuDibuat: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          kategoriCatatan: 'fakta_kunci'
        };
        setDaftarAnotasi([catatanAwal]);
        localStorage.setItem(storageKey, JSON.stringify([catatanAwal]));
      }
    } catch (e) {
      console.warn('Gagal membaca anotasi dari localStorage:', e);
    }
  }, [dokumen.id]);

  // Pantau jika ada teks pilihan baru dari luar
  useEffect(() => {
    if (teksPilihanAwal) {
      setTeksDisorotInput(teksPilihanAwal);
      setFormulirTerbuka(true);
      setIdAnotasiDiedit(null);
    }
  }, [teksPilihanAwal]);

  // Simpan ke localStorage
  const simpanKeStorage = (data: AnotasiDokumen[]) => {
    setDaftarAnotasi(data);
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) {
      console.warn('Gagal menyimpan anotasi ke localStorage:', e);
    }
  };

  // Handler Submit Tambah/Edit
  const handleSubmitAnotasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catatanInput.trim() && !teksDisorotInput.trim()) return;

    const waktuSekarang = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    if (idAnotasiDiedit) {
      // Mode Edit
      const diperbarui = daftarAnotasi.map((item) =>
        item.id === idAnotasiDiedit
          ? {
              ...item,
              teksDisorot: teksDisorotInput.trim(),
              catatanPribadi: catatanInput.trim(),
              warna: warnaInput,
              kategoriCatatan: kategoriInput,
              waktuDibuat: `${waktuSekarang} (disunting)`,
            }
          : item
      );
      simpanKeStorage(diperbarui);
    } else {
      // Mode Baru
      const baru: AnotasiDokumen = {
        id: `anotasi-${Date.now()}`,
        dokumenId: dokumen.id,
        nomorKatalog: dokumen.nomorKatalog,
        teksDisorot: teksDisorotInput.trim() || 'Catatan Umum Dokumen',
        catatanPribadi: catatanInput.trim(),
        warna: warnaInput,
        waktuDibuat: waktuSekarang,
        kategoriCatatan: kategoriInput,
      };
      simpanKeStorage([baru, ...daftarAnotasi]);
    }

    // Reset Form
    setTeksDisorotInput('');
    setCatatanInput('');
    setIdAnotasiDiedit(null);
    setFormulirTerbuka(false);
    if (padaBersihkanPilihan) padaBersihkanPilihan();
  };

  // Handler Edit Catatan
  const handleMulaiEdit = (item: AnotasiDokumen) => {
    setIdAnotasiDiedit(item.id);
    setTeksDisorotInput(item.teksDisorot);
    setCatatanInput(item.catatanPribadi);
    setWarnaInput(item.warna);
    setKategoriInput(item.kategoriCatatan);
    setFormulirTerbuka(true);
  };

  // Handler Hapus Catatan
  const handleHapusAnotasi = (id: string) => {
    if (!confirm('Hapus catatan anotasi ini?')) return;
    const sisa = daftarAnotasi.filter(item => item.id !== id);
    simpanKeStorage(sisa);
  };

  // Handler Salin Teks Catatan
  const handleSalinCatatan = (item: AnotasiDokumen) => {
    const teks = `[Catatan Dokumen: ${dokumen.nomorKatalog} - ${dokumen.judul}]\nTeks yang Disorot:\n"${item.teksDisorot}"\n\nCatatan Pribadi:\n${item.catatanPribadi}\n(Waktu: ${item.waktuDibuat})`;
    navigator.clipboard.writeText(teks);
    setTersalinId(item.id);
    setTimeout(() => setTersalinId(null), 2500);
  };

  // Handler Unduh Berkas Catatan Riset (.txt)
  const handleEksporCatatan = () => {
    let konten = `========================================================================\n` +
      `CATATAN RISET & ANOTASI PRIBADI DOKUMEN SEJARAH\n` +
      `Lembaga: Nieuw Guinea Raad – Pusat Dokumentasi Sejarah Papua\n` +
      `========================================================================\n\n` +
      `Katalog Dokumen : ${dokumen.nomorKatalog}\n` +
      `Judul Dokumen   : ${dokumen.judul}\n` +
      `Tanggal Dokumen : ${dokumen.tanggal}\n` +
      `Sumber Primer   : ${dokumen.sumber}\n` +
      `Total Catatan   : ${daftarAnotasi.length} Catatan\n` +
      `Tanggal Ekspor  : ${new Date().toLocaleString('id-ID')}\n\n` +
      `------------------------------------------------------------------------\n\n`;

    daftarAnotasi.forEach((item, index) => {
      konten += `[CATATAN #${index + 1}] - Kategori: ${item.kategoriCatatan.toUpperCase()} (${item.waktuDibuat})\n` +
        `TEKS DISOROT :\n"${item.teksDisorot}"\n` +
        `CATATAN TELAAH:\n${item.catatanPribadi || '(Hanya penanda sorotan teks)'}\n\n` +
        `------------------------------------------------------------------------\n\n`;
    });

    konten += `Tersimpan secara lokal pada repositori penelitian pengguna.\nWebsite: https://nieuw-guinea-raad.blogspot.com/\n`;

    const blob = new Blob([konten], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Catatan_Riset_${dokumen.nomorKatalog.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Pemetaan Warna Badge & Sorotan
  const styleWarna = (warna: WarnaSorotan) => {
    switch (warna) {
      case 'emas':
        return {
          bg: 'bg-[#C5A059]/20',
          border: 'border-[#C5A059]',
          text: 'text-[#DFB76C]',
          badge: 'bg-[#C5A059] text-black',
          highlight: 'bg-[#C5A059]/30 text-slate-100 border-l-2 border-[#C5A059]'
        };
      case 'kuning':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500',
          text: 'text-yellow-300',
          badge: 'bg-yellow-400 text-black',
          highlight: 'bg-yellow-400/25 text-slate-100 border-l-2 border-yellow-400'
        };
      case 'hijau':
        return {
          bg: 'bg-emerald-500/20',
          border: 'border-emerald-500',
          text: 'text-emerald-300',
          badge: 'bg-emerald-500 text-black',
          highlight: 'bg-emerald-500/25 text-slate-100 border-l-2 border-emerald-400'
        };
      case 'biru':
        return {
          bg: 'bg-sky-500/20',
          border: 'border-sky-500',
          text: 'text-sky-300',
          badge: 'bg-sky-400 text-black',
          highlight: 'bg-sky-400/25 text-slate-100 border-l-2 border-sky-400'
        };
      case 'merah':
        return {
          bg: 'bg-rose-500/20',
          border: 'border-rose-500',
          text: 'text-rose-300',
          badge: 'bg-rose-500 text-white',
          highlight: 'bg-rose-500/25 text-slate-100 border-l-2 border-rose-500'
        };
      default:
        return {
          bg: 'bg-[#C5A059]/20',
          border: 'border-[#C5A059]',
          text: 'text-[#DFB76C]',
          badge: 'bg-[#C5A059] text-black',
          highlight: 'bg-[#C5A059]/30 border-l-2 border-[#C5A059]'
        };
    }
  };

  // Label Kategori
  const labelKategori = (kat: AnotasiDokumen['kategoriCatatan']) => {
    switch (kat) {
      case 'analisis_hukum': return 'Analisis Hukum';
      case 'fakta_kunci': return 'Fakta Kunci';
      case 'pertanyaan_riset': return 'Pertanyaan Riset';
      case 'kutipan_penting': return 'Kutipan Penting';
      case 'umum': return 'Catatan Umum';
      default: return 'Catatan';
    }
  };

  // Filter daftar catatan
  const catatanTersaring = daftarAnotasi.filter((item) => {
    const cocokWarna = filterWarna === 'semua' || item.warna === filterWarna;
    const cocokKategori = filterKategori === 'semua' || item.kategoriCatatan === filterKategori;
    const cocokTeks =
      item.teksDisorot.toLowerCase().includes(kataKunciCari.toLowerCase()) ||
      item.catatanPribadi.toLowerCase().includes(kataKunciCari.toLowerCase());
    return cocokWarna && cocokKategori && cocokTeks;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* HEADER ANOTASI & AKSI UTAMA */}
      <div className="bg-[#0A1326] border border-[#C5A059]/30 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#DFB76C]">
            <Highlighter className="w-4 h-4 text-[#C5A059]" />
            <span className="uppercase tracking-wider">Anotasi Teks &amp; Catatan Riset Pribadi</span>
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#FBF9F5]">
            Sorotan &amp; Lembar Catatan Peneliti
          </h3>
          <p className="text-xs text-slate-300 font-sans">
            Tersimpan aman di peramban Anda untuk dokumen <span className="text-[#DFB76C] font-mono">[{dokumen.nomorKatalog}]</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {daftarAnotasi.length > 0 && (
            <button
              onClick={handleEksporCatatan}
              className="px-3 py-1.5 bg-[#101C38] hover:bg-[#1A2E5A] text-[#DFB76C] text-xs font-mono border border-[#C5A059]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Ekspor Seluruh Catatan sebagai Dokumen Teks"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Catatan ({daftarAnotasi.length})</span>
            </button>
          )}

          <button
            onClick={() => {
              setFormulirTerbuka(!formulirTerbuka);
              if (formulirTerbuka) setIdAnotasiDiedit(null);
            }}
            className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{formulirTerbuka ? 'Tutup Formulir' : 'Tambah Catatan Baru'}</span>
          </button>
        </div>
      </div>

      {/* FORMULIR TAMBAH / SUNTING ANOTASI */}
      {formulirTerbuka && (
        <form 
          onSubmit={handleSubmitAnotasi}
          className="bg-[#0C1733] border border-[#C5A059]/50 p-5 space-y-4 shadow-xl animate-fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20">
            <h4 className="font-serif font-bold text-sm text-[#FBF9F5] flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#C5A059]" />
              <span>{idAnotasiDiedit ? 'Sunting Catatan Anotasi' : 'Tulis Anotasi / Sorot Teks Baru'}</span>
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              {teksDisorotInput ? 'Kutipan Teks Terpilih' : 'Catatan Mandiri'}
            </span>
          </div>

          {/* Input Teks yang Disorot */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Teks atau Kutipan yang Disorot dari Naskah:
            </label>
            <textarea
              rows={2}
              value={teksDisorotInput}
              onChange={(e) => setTeksDisorotInput(e.target.value)}
              placeholder="Pilih atau tempel kalimat penting dari transkrip atau ringkasan dokumen..."
              className="w-full bg-[#070D1D] border border-slate-700 focus:border-[#C5A059] p-3 text-xs text-slate-200 placeholder-slate-500 font-serif leading-relaxed focus:outline-none"
            />
          </div>

          {/* Input Catatan Telaah Pribadi */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Catatan Pribadi, Analisis, atau Pertanyaan Penelitian:
            </label>
            <textarea
              rows={3}
              required
              value={catatanInput}
              onChange={(e) => setCatatanInput(e.target.value)}
              placeholder="Tuliskan interpretasi, kaitan historis, atau catatan riset pribadi Anda..."
              className="w-full bg-[#070D1D] border border-slate-700 focus:border-[#C5A059] p-3 text-xs text-slate-100 placeholder-slate-500 font-sans leading-relaxed focus:outline-none"
            />
          </div>

          {/* Pilihan Warna & Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            
            {/* Pilihan Warna Sorotan */}
            <div>
              <span className="block text-[11px] font-mono text-slate-400 uppercase mb-2">
                Pilih Warna Sorotan (Tinta):
              </span>
              <div className="flex items-center gap-2">
                {[
                  { id: 'emas' as WarnaSorotan, label: 'Emas NGR', color: 'bg-[#C5A059]' },
                  { id: 'kuning' as WarnaSorotan, label: 'Kuning', color: 'bg-yellow-400' },
                  { id: 'hijau' as WarnaSorotan, label: 'Hijau', color: 'bg-emerald-500' },
                  { id: 'biru' as WarnaSorotan, label: 'Biru', color: 'bg-sky-400' },
                  { id: 'merah' as WarnaSorotan, label: 'Merah', color: 'bg-rose-500' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setWarnaInput(item.id)}
                    className={`h-7 px-2 rounded-xs border text-[11px] font-mono flex items-center gap-1.5 cursor-pointer transition-all ${
                      warnaInput === item.id
                        ? 'border-white ring-2 ring-[#C5A059] font-bold text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pilihan Kategori Catatan */}
            <div>
              <span className="block text-[11px] font-mono text-slate-400 uppercase mb-2">
                Klasifikasi Catatan:
              </span>
              <select
                value={kategoriInput}
                onChange={(e) => setKategoriInput(e.target.value as any)}
                className="w-full bg-[#070D1D] border border-slate-700 p-2 text-xs text-[#DFB76C] font-mono focus:outline-none focus:border-[#C5A059]"
              >
                <option value="fakta_kunci">Fakta Kunci &amp; Tanggal</option>
                <option value="analisis_hukum">Analisis Hukum / PBB</option>
                <option value="kutipan_penting">Kutipan Orasi / Pidato</option>
                <option value="pertanyaan_riset">Pertanyaan / Hipotesis Riset</option>
                <option value="umum">Catatan Bebas</option>
              </select>
            </div>

          </div>

          {/* Tombol Simpan / Batal */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700/60">
            <button
              type="button"
              onClick={() => {
                setFormulirTerbuka(false);
                setIdAnotasiDiedit(null);
              }}
              className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{idAnotasiDiedit ? 'Simpan Perubahan' : 'Simpan Catatan'}</span>
            </button>
          </div>
        </form>
      )}

      {/* BILAH PENYARING & PENCARIAN CATATAN */}
      <div className="bg-[#0A1326] border border-slate-800 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Pencarian dalam catatan */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={kataKunciCari}
            onChange={(e) => setKataKunciCari(e.target.value)}
            placeholder="Cari dalam catatan atau teks yang disorot..."
            className="w-full bg-[#060A14] border border-slate-700/70 pl-8 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Filter Warna */}
        <div className="flex items-center gap-1 font-mono text-[11px]">
          <span className="text-slate-400 hidden sm:inline">Warna:</span>
          {['semua', 'emas', 'kuning', 'hijau', 'biru', 'merah'].map((w) => (
            <button
              key={w}
              onClick={() => setFilterWarna(w)}
              className={`px-2 py-1 uppercase rounded-xs transition-colors cursor-pointer ${
                filterWarna === w
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'bg-[#101C38] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

      </div>

      {/* DAFTAR KARTU ANOTASI & CATATAN PRIBADI */}
      <div className="space-y-4">
        {catatanTersaring.length === 0 ? (
          <div className="p-8 text-center bg-[#070D1D] border border-slate-800 space-y-3">
            <Bookmark className="w-8 h-8 text-[#C5A059] mx-auto opacity-50" />
            <div className="text-sm font-serif font-bold text-slate-300">
              Belum ada catatan anotasi untuk filter ini.
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Sorot kalimat dari naskah atau klik tombol <strong>"Tambah Catatan Baru"</strong> untuk menandai bagian penting dokumen.
            </p>
          </div>
        ) : (
          catatanTersaring.map((item, idx) => {
            const style = styleWarna(item.warna);
            return (
              <div 
                key={item.id}
                className={`bg-[#0A1326] border ${style.border}/60 p-4 sm:p-5 space-y-3 shadow-lg transition-all hover:border-[#C5A059]`}
              >
                {/* Header Kartu Catatan */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-xs text-[10px] uppercase font-bold ${style.badge}`}>
                      {labelKategori(item.kategoriCatatan)}
                    </span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C5A059]" />
                      {item.waktuDibuat}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Salin */}
                    <button
                      onClick={() => handleSalinCatatan(item)}
                      className="p-1 text-slate-400 hover:text-[#DFB76C] transition-colors cursor-pointer"
                      title="Salin Catatan"
                    >
                      {tersalinId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleMulaiEdit(item)}
                      className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Sunting Catatan"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Hapus */}
                    <button
                      onClick={() => handleHapusAnotasi(item.id)}
                      className="p-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Hapus Catatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Teks yang Disorot dari Naskah */}
                {item.teksDisorot && (
                  <div 
                    onClick={() => padaPilihTeksAnotasi && padaPilihTeksAnotasi(item.teksDisorot)}
                    className={`p-3 text-xs leading-relaxed font-serif italic ${style.highlight} cursor-pointer hover:opacity-90 transition-opacity`}
                    title="Klik untuk menelusuri teks dalam naskah"
                  >
                    "{item.teksDisorot}"
                  </div>
                )}

                {/* Catatan / Telaah Pribadi Pengguna */}
                <div className="text-xs sm:text-[13px] text-slate-200 font-sans leading-relaxed pt-1 whitespace-pre-line">
                  {item.catatanPribadi}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* PANDUAN PENGGUNAAN SINGKAT */}
      <div className="p-4 bg-[#050914] border border-[#C5A059]/20 text-xs text-slate-400 space-y-1.5 font-sans">
        <div className="flex items-center gap-1.5 text-[#DFB76C] font-mono font-bold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Tips Anotasi &amp; Penyorotan Naskah Sejarah:</span>
        </div>
        <p className="leading-relaxed">
          Pada tab <strong>Kajian &amp; Metadata</strong> atau <strong>Pembaca PDF</strong>, Anda dapat menyeleksi (blok) teks kalimat manapun, lalu klik <strong>"Sorot &amp; Tambah Catatan"</strong> untuk langsung mengaitkan analisis riset pribadi Anda pada teks tersebut.
        </p>
      </div>

    </div>
  );
};
