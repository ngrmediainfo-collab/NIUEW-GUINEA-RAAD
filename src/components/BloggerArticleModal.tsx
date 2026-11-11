import React from 'react';
import { ArtikelBlogger } from '../types';
import { X, ExternalLink, Calendar, Tag, User } from 'lucide-react';

interface BloggerArticleModalProps {
  artikel: ArtikelBlogger | null;
  padaTutup: () => void;
}

export const BloggerArticleModal: React.FC<BloggerArticleModalProps> = ({ artikel, padaTutup }) => {
  if (!artikel) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={padaTutup} 
      />

      <div className="relative w-full max-w-3xl bg-[#090F1E] border border-[#C5A059]/40 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-[#060A14] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#C5A059] font-serif">
            <span>Warta &amp; Terbitan Resmi Nieuw Guinea Raad</span>
          </div>

          <button
            onClick={padaTutup}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{artikel.tanggalPublikasi}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{artikel.penulis}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5] leading-tight">
            {artikel.judul}
          </h1>

          {/* Labels */}
          {artikel.label && artikel.label.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
              {artikel.label.map((lbl, idx) => (
                <span
                  key={idx}
                  className="text-[11px] text-[#DFB76C] bg-[#16284C] px-2.5 py-0.5 border border-[#C5A059]/20 uppercase tracking-wider font-mono"
                >
                  {lbl}
                </span>
              ))}
            </div>
          )}

          {/* Featured Image */}
          {artikel.gambarUrl && (
            <div className="overflow-hidden border border-slate-800 bg-black/40">
              <img
                src={artikel.gambarUrl}
                alt={artikel.judul}
                className="w-full max-h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Article HTML Content */}
          <div 
            className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4 font-sans [&>p]:mb-4 [&>p]:leading-relaxed [&>a]:text-[#DFB76C] [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: artikel.kontenHtml }}
          />

          {/* Source Attribution Notice */}
          <div className="p-4 bg-[#060A14] border-l-2 border-[#C5A059] text-xs text-slate-400 space-y-1">
            <span className="text-slate-200 font-semibold block">Integritas Sumber:</span>
            <p>
              Artikel ini dipublikasikan secara resmi melalui portal blogspot Nieuw Guinea Raad. Website arsip ini menjaga keaslian teks dan menyajikan dokumen ini demi kepentingan dokumentasi dan keterbukaan sejarah.
            </p>
          </div>
        </div>

        {/* Footer Ribbon with Direct Link to Original Blogger */}
        <div className="bg-[#060A14] px-6 py-3 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4 text-xs">
          <a
            href={artikel.tautanAsli}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DFB76C] hover:text-white transition-colors underline underline-offset-4"
          >
            <span>Buka Artikel Asli di nieuw-guinea-raad.blogspot.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={padaTutup}
            className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-200 bg-[#16284C] hover:bg-[#1E3563] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
