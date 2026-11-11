import React, { useState } from 'react';
import { Emblem } from '../Emblem';
import { Mail, MapPin, Send, CheckCircle, ShieldAlert, FileUp } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [nama, setNama] = useState('');
  const [surel, setSurel] = useState('');
  const [tipePengajuan, setTipePengajuan] = useState('sumbangan_arsip');
  const [judulDokumen, setJudulDokumen] = useState('');
  const [pesan, setPesan] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTerkirim(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          Sekretariat Dokumentasi &amp; Komunikasi
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          Hubungi Nieuw Guinea Raad
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Sampaikan pertanyaan penelitian, ajukan penyerahan dokumen arsip sejarah keluarga/organisasi, atau hubungi sekretariat kurasi kami.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#080E1C] p-8 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#FBF9F5]">
              Formulir Penyerahan Arsip &amp; Pertanyaan
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Tim kurator sejarah kami akan meninjau setiap pengajuan berdasarkan standar validasi sumber primer.
            </p>
          </div>

          {terkirim ? (
            <div className="p-8 bg-[#060A14] border border-[#C5A059]/40 text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-[#DFB76C] mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  Pengajuan Berhasil Diterima
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-md mx-auto">
                  Terima kasih atas kontribusi Anda dalam merawat ingatan sejarah Papua. Sekretariat Nieuw Guinea Raad akan menelaah data yang Anda kirimkan dan menghubungi Anda melalui surel <span className="text-[#DFB76C] font-mono">{surel}</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  setTerkirim(false);
                  setJudulDokumen('');
                  setPesan('');
                }}
                className="px-4 py-2 bg-[#16284C] text-xs font-serif uppercase tracking-wider text-slate-200 hover:text-white"
              >
                Kirim Pengajuan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-serif">Nama Lengkap / Instansi:</label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Anda atau Lembaga"
                    className="w-full bg-[#060A14] border border-slate-700 text-slate-100 px-3 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-serif">Alamat Surel (Email):</label>
                  <input
                    type="email"
                    required
                    value={surel}
                    onChange={(e) => setSurel(e.target.value)}
                    placeholder="nama@domain.com"
                    className="w-full bg-[#060A14] border border-slate-700 text-slate-100 px-3 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-serif">Jenis Pengajuan:</label>
                <select
                  value={tipePengajuan}
                  onChange={(e) => setTipePengajuan(e.target.value)}
                  className="w-full bg-[#060A14] border border-slate-700 text-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="sumbangan_arsip">Penyerahan/Donasi Dokumen atau Foto Sejarah</option>
                  <option value="penelitian">Permohonan Data / Kerjasama Penelitian Akademis</option>
                  <option value="koreksi_fakta">Usulan Verifikasi / Koreksi Catatan Sejarah</option>
                  <option value="umum">Pertanyaan Umum ke Sekretariat</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-serif">Judul Dokumen atau Pokok Bahasan:</label>
                <input
                  type="text"
                  required
                  value={judulDokumen}
                  onChange={(e) => setJudulDokumen(e.target.value)}
                  placeholder="Misal: Arsip Surat Traktat 1961 atau Foto Pelantikan"
                  className="w-full bg-[#060A14] border border-slate-700 text-slate-100 px-3 py-2.5 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-serif">Deskripsi / Uraian Pesan:</label>
                <textarea
                  required
                  rows={5}
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Jelaskan rincian dokumen, asal-usul, tanggal, atau hal yang ingin Anda sampaikan..."
                  className="w-full bg-[#060A14] border border-slate-700 text-slate-100 px-3 py-2.5 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Kirimkan ke Sekretariat</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact info & Curatorial guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#080E1C] p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <Emblem size={36} />
              <div>
                <span className="font-serif text-sm font-bold text-[#FBF9F5] block">
                  Sekretariat Arsip NGR
                </span>
                <span className="text-[11px] text-[#C5A059] font-mono">
                  Pusat Informasi &amp; Media
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-serif text-slate-400 block">Surel Resmi:</span>
                  <a href="mailto:ngrmediainfo@gmail.com" className="text-[#DFB76C] font-mono hover:underline">
                    ngrmediainfo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-serif text-slate-400 block">Wilayah Dokumentasi:</span>
                  <span>Hollandia (Jayapura), Tanah Papua &amp; Jaringan Internasional Pasifik</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#060A14] p-6 border border-[#C5A059]/30 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-[#DFB76C] font-serif font-semibold">
              <ShieldAlert className="w-4 h-4 text-[#C5A059]" />
              <span>Etika &amp; Keamanan Pengirim Arsip</span>
            </div>
            <p className="leading-relaxed">
              Kami menghormati kerahasiaan identitas saksi sejarah dan keluarga pemilik dokumen bersejarah. Jika diperlukan, nama narasumber dapat disamarkan demi pertimbangan keamanan dan perlindungan hak asasi manusia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
