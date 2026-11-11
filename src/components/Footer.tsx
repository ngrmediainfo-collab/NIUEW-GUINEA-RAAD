import React from 'react';
import { MenuNavigasi } from '../types';
import { Emblem } from './Emblem';
import { ExternalLink, ShieldCheck, BookOpen, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  padaPilihHalaman: (halaman: MenuNavigasi) => void;
}

export const Footer: React.FC<FooterProps> = ({ padaPilihHalaman }) => {
  const navigasiCepat: { label: string; id: MenuNavigasi }[] = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Tentang Lembaga', id: 'tentang_ngr' },
    { label: 'Sejarah Papua (12 Periode)', id: 'sejarah_papua' },
    { label: 'Nieuw Guinea Raad 1961', id: 'ngr_1961' },
    { label: '1 Desember 1961', id: 'desember_1961' },
    { label: 'Perjanjian New York 1962', id: 'perjanjian_new_york' },
    { label: 'UNTEA 1962–1963', id: 'untea' },
    { label: 'Pepera 1969', id: 'pepera_1969' },
  ];

  const navigasiDokumentasi: { label: string; id: MenuNavigasi }[] = [
    { label: 'Arsip Dokumen Sejarah', id: 'arsip_dokumen' },
    { label: 'Penelitian dan Publikasi', id: 'penelitian_publikasi' },
    { label: 'Galeri Fotografi Sejarah', id: 'galeri_sejarah' },
    { label: 'Gerakan Politik Papua', id: 'gerakan_politik' },
    { label: 'Diplomasi Internasional', id: 'diplomasi_internasional' },
    { label: 'Hak Asasi Manusia', id: 'hak_asasi_manusia' },
    { label: 'Pengajuan Arsip & Kontak', id: 'hubungi_kami' },
  ];

  return (
    <footer className="bg-[#060A14] border-t border-[#C5A059]/25 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Identity & Slogan (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2">
              <Emblem size={44} />
              <span className="text-[11px] text-[#C5A059] font-serif tracking-widest uppercase block">
                Pusat Dokumentasi Sejarah Papua
              </span>
            </div>

            <p className="text-sm text-slate-300/90 leading-relaxed font-sans max-w-md">
              Pusat Dokumentasi Sejarah, Arsip, Penelitian, dan Perjalanan Politik Papua. Berdiri untuk menjaga memori kolektif, merekam sumber primer, dan menyajikan historiografi kritis berstandar internasional.
            </p>

            <blockquote className="text-xs font-serif italic text-[#DFB76C] border-l-2 border-[#C5A059] pl-3 py-1">
              "Merawat Ingatan Sejarah, Mendokumentasikan Identitas, dan Menelusuri Perjalanan Bangsa Papua."
            </blockquote>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Standar Kredibilitas Arsip Primer Terverifikasi</span>
            </div>
          </div>

          {/* Column 2: Navigasi Tonggak Sejarah (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
              Tonggak Sejarah
            </h4>
            <ul className="space-y-2 text-xs">
              {navigasiCepat.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      padaPilihHalaman(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#FBF9F5] transition-colors cursor-pointer text-left text-slate-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dokumentasi & Riset (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
              Pusat Arsip
            </h4>
            <ul className="space-y-2 text-xs">
              {navigasiDokumentasi.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      padaPilihHalaman(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#FBF9F5] transition-colors cursor-pointer text-left text-slate-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Sumber & Integrasi (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#DFB76C] uppercase">
              Sumber Asli
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dokumentasi ini terhubung dengan repositori dan warta resmi blogspot Nieuw Guinea Raad.
            </p>
            <a
              href="https://nieuw-guinea-raad.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#DFB76C] hover:text-white transition-colors underline underline-offset-4"
            >
              <span>nieuw-guinea-raad.blogspot.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Hollandia (Jayapura) / Pasifik</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>ngrmediainfo@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <p>
            &copy; {new Date().getFullYear()} NIEUW GUINEA RAAD. Seluruh hak cipta arsip dan dokumentasi dilindungi.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Bahasa Indonesia (Resmi)</span>
            <span>·</span>
            <span>Prinsip Dekolonisasi PBB</span>
            <span>·</span>
            <span>Kode Etik Arsip Internasional</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
