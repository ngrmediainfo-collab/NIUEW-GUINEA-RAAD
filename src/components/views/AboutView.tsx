import React from 'react';
import { Emblem } from '../Emblem';
import { ShieldCheck, BookOpen, Scale, History, Globe2, Award, Users } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header Profile */}
      <div className="text-center space-y-4 border-b border-[#C5A059]/30 pb-10">
        <div className="flex justify-center">
          <Emblem size={72} />
        </div>
        <div>
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block">
            PROFIL LEMBAGA DOKUMENTASI
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FBF9F5] tracking-tight mt-1">
            TENTANG NIEUW GUINEA RAAD
          </h1>
        </div>
        <p className="text-sm sm:text-base text-slate-300 font-serif italic max-w-2xl mx-auto text-[#DFB76C]">
          "Merawat Ingatan Sejarah, Mendokumentasikan Identitas, dan Menelusuri Perjalanan Bangsa Papua."
        </p>
      </div>

      {/* Narrative Section 1: Warisan Sejarah 1961 */}
      <section className="space-y-4 bg-[#080E1C] p-8 sm:p-10 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-serif tracking-wider text-[#C5A059] uppercase">
          <History className="w-4 h-4" />
          <span>Akar Sejarah Lembaga</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#FBF9F5]">
          Dari Parlemen Representatif Menuju Pusat Arsip Bangsa
        </h2>
        <div className="space-y-4 text-sm text-slate-200 leading-relaxed font-sans">
          <p>
            Nieuw Guinea Raad (Dewan Nugini) mula-mula didirikan secara resmi pada 5 April 1961 di Hollandia (sekarang Jayapura) sebagai lembaga perwakilan rakyat dan parlemen transisi menuju penentuan nasib sendiri bangsa Papua. Terdiri dari 28 anggota di mana 23 di antaranya adalah putra-putra asli Papua, lembaga ini menjadi bukti historis tak terbantahkan mengenai kematangan politik dan kapasitas kelembagaan orang asli Papua dalam memandu arah kedaulatan bangsanya.
          </p>
          <p>
            Setelah pembubaran paksa institusi ini pada tahun 1963 akibat pergulatan geopolitik Perang Dingin dan Perjanjian New York 1962, cita-cita dan nama suci Nieuw Guinea Raad tetap hidup dalam ingatan kolektif rakyat Papua.
          </p>
        </div>
      </section>

      {/* Narrative Section 2: Mandat Kontemporer */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#080E1C] border border-slate-800 space-y-3">
          <div className="p-2.5 bg-[#16284C] w-fit border border-[#C5A059]/30 text-[#C5A059]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-slate-100">
            Penyelamatan Arsip
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Mengumpulkan, mendigitalkan, dan memublikasikan naskah traktat resmi, risalah persidangan, dokumen PBB, serta korespondensi diplomatik yang tersebar di Den Haag, New York, London, Canberra, dan Papua.
          </p>
        </div>

        <div className="p-6 bg-[#080E1C] border border-slate-800 space-y-3">
          <div className="p-2.5 bg-[#16284C] w-fit border border-[#C5A059]/30 text-[#C5A059]">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-slate-100">
            Penelitian Historiografi Kritis
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Meneliti sejarah dekolonisasi, hukum internasional (khususnya Pasal 73 Piagam PBB), serta menguji keabsahan plebisit Pepera 1969 bebas dari sensor dan manipulasi politik kekuasaan.
          </p>
        </div>

        <div className="p-6 bg-[#080E1C] border border-slate-800 space-y-3">
          <div className="p-2.5 bg-[#16284C] w-fit border border-[#C5A059]/30 text-[#C5A059]">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-slate-100">
            Pendidikan &amp; Kemanusiaan
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Menyediakan akses terbuka bagi generasi muda Papua, akademisi dunia, dan pengambil kebijakan internasional guna merawat kebenaran sejarah dan memperjuangkan keadilan hak asasi manusia.
          </p>
        </div>
      </section>

      {/* Metodologi & Kredibilitas Kuratorial */}
      <section className="p-8 sm:p-10 bg-[#060A14] border border-[#C5A059]/40 space-y-6">
        <div className="flex items-center gap-2 text-xs font-serif tracking-wider text-[#C5A059] uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Standar Ilmiah &amp; Integritas Sejarah</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#FBF9F5]">
          Prinsip Penulisan &amp; Kurasi Dokumen
        </h2>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
          <p>
            Pusat Dokumentasi Nieuw Guinea Raad memegang teguh standar profesional internasional dalam pengarsipan:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#080E1C] border border-slate-800">
              <span className="text-[#DFB76C] font-semibold block font-serif mb-1">
                1. Pemisahan Fakta dan Opini
              </span>
              <p className="text-slate-400 leading-relaxed">
                Kami secara ketat membedakan antara dokumen resmi hukum (treaties &amp; resolutions), fakta sejarah yang terkonfirmasi, interpretasi sejarawan, dan pernyataan sikap politik para tokoh.
              </p>
            </div>

            <div className="p-4 bg-[#080E1C] border border-slate-800">
              <span className="text-[#DFB76C] font-semibold block font-serif mb-1">
                2. Anti-Pemalsuan Sejarah
              </span>
              <p className="text-slate-400 leading-relaxed">
                Lembaga ini tidak pernah menciptakan dokumen palsu, kutipan karangan, atau merekayasa nomor katalog arsip. Setiap berkas dapat dilacak ke repositori aslinya.
              </p>
            </div>

            <div className="p-4 bg-[#080E1C] border border-slate-800">
              <span className="text-[#DFB76C] font-semibold block font-serif mb-1">
                3. Bahasa Indonesia Standar
              </span>
              <p className="text-slate-400 leading-relaxed">
                Seluruh antarmuka, keterangan katalog, dan telaah disajikan dalam Bahasa Indonesia baku agar dapat diakses secara merata oleh seluruh rakyat di tanah Papua dan nusantara.
              </p>
            </div>

            <div className="p-4 bg-[#080E1C] border border-slate-800">
              <span className="text-[#DFB76C] font-semibold block font-serif mb-1">
                4. Kebebasan Ilmiah
              </span>
              <p className="text-slate-400 leading-relaxed">
                Menyediakan ruang kajian dialogis bagi peneliti multidisiplin untuk mengkaji aspek hukum humaniter, antropologi adat, dan dekolonisasi Pasifik secara berkeadaban.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
