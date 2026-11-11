import React, { useState } from 'react';
import { WilayahAdatDetail, KodeWilayahAdat } from '../../types';
import { daftarTujuhWilayahAdat } from '../../data/wilayahAdatData';
import { 
  Users, 
  MapPin, 
  BookOpen, 
  Compass, 
  ShieldAlert, 
  Check, 
  Table, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface EnsiklopediaWilayahAdatViewProps {
  padaPilihWilayahDiPeta?: (wilayahId: KodeWilayahAdat) => void;
}

export const EnsiklopediaWilayahAdatView: React.FC<EnsiklopediaWilayahAdatViewProps> = ({
  padaPilihWilayahDiPeta
}) => {
  const [tabAktif, setTabAktif] = useState<KodeWilayahAdat | 'matriks'>('mamta');

  const wilayahTerpilih = daftarTujuhWilayahAdat.find(w => w.id === tabAktif) || daftarTujuhWilayahAdat[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          <Compass className="w-4 h-4" />
          <span>Ensiklopedia Etnokultural &amp; Antropologi Papua</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          ENSIKLOPEDIA TUJUH WILAYAH ADAT PAPUA
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Dokumentasi antropologi mendalam mengenai tujuh zona kultural adat bangsa Papua: sistem kepemimpinan tradisional, hukum tanah ulayat, rumpun bahasa daerah, seni tradisi, sejarah persekolahan zending, dan dinamika sosial ekonomi.
        </p>

        <div className="p-3 bg-[#060A14] border-l-2 border-[#C5A059] text-xs text-slate-400 mt-2">
          <strong className="text-slate-200">Keterangan Sumber &amp; Yurisdiksi Adat:</strong> Batas wilayah adat merupakan batas kultural komunal masyarakat adat Papua, bukan batas administrasi resmi negara.
        </div>
      </div>

      {/* Navigation Tabs (7 Regions + 1 Comparison Matrix Tab) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {daftarTujuhWilayahAdat.map((w) => {
          const aktif = tabAktif === w.id;
          return (
            <button
              key={w.id}
              onClick={() => setTabAktif(w.id)}
              className={`px-4 py-2 text-xs font-serif transition-all cursor-pointer ${
                aktif
                  ? 'bg-[#C5A059] text-black font-bold shadow-md'
                  : 'bg-[#080E1C] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {w.nama}
            </button>
          );
        })}

        <button
          onClick={() => setTabAktif('matriks')}
          className={`px-4 py-2 text-xs font-serif transition-all flex items-center gap-1.5 cursor-pointer ml-auto ${
            tabAktif === 'matriks'
              ? 'bg-[#16284C] text-[#DFB76C] border border-[#C5A059] font-bold'
              : 'bg-[#080E1C] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Tabel Perbandingan 7 Wilayah Adat</span>
        </button>
      </div>

      {/* Tab Content: Single Region Deep Page OR Comparison Matrix */}
      {tabAktif === 'matriks' ? (
        /* COMPARISON MATRIX TABLE ACROSS ALL 7 REGIONS */
        <div className="bg-[#080E1C] border border-slate-800 p-6 sm:p-8 space-y-6 overflow-x-auto shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#FBF9F5]">
              Matriks Perbandingan Sosiokultural Tujuh Wilayah Adat Papua
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Perbandingan komprehensif sistem politik tradisional, ekologi, bahasa dominan, dan tokoh sejarah utama.
            </p>
          </div>

          <table className="w-full text-left text-xs border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-[#C5A059]/40 bg-[#060A14] text-[#C5A059] font-serif uppercase tracking-wider">
                <th className="p-3">Wilayah Adat</th>
                <th className="p-3">Karakter Geografis</th>
                <th className="p-3">Sistem Kepemimpinan Adat</th>
                <th className="p-3">Masyarakat &amp; Suku Utama</th>
                <th className="p-3">Rumpun Bahasa Khas</th>
                <th className="p-3">Tradisi / Seni Sakral</th>
                <th className="p-3">Aksi Peta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-sans">
              {daftarTujuhWilayahAdat.map((w) => (
                <tr key={w.id} className="hover:bg-[#101C33] transition-colors">
                  <td className="p-3 font-serif font-bold text-[#DFB76C]">
                    {w.nama}
                    <span className="block text-[10px] text-slate-400 font-mono font-normal">
                      {w.sebutanLain.split('(')[0]}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">
                    {w.cakupanWilayahGeografis.slice(0, 2).join(', ')}...
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-200">
                    {w.id === 'mamta' ? 'Ondoafi (Aristokrat Keturunan)' :
                     w.id === 'saireri' ? 'Keret & Mambri (Bahari)' :
                     w.id === 'domberai' ? 'Kain Timur & Klan Arfak' :
                     w.id === 'bomberai' ? 'Raja Petuanan & Satu Tungku Tiga Batu' :
                     w.id === 'ha_anim' ? 'Dema & Tua-Tua Klan Marind' :
                     w.id === 'la_pago' ? 'Big Man / Kain (Meritokrasi)' :
                     'Tonowi (Orang Kaya Adil & Yuwo)'}
                  </td>
                  <td className="p-3 text-slate-300">
                    {w.masyarakatAdatDanSuku.slice(0, 3).join(', ')}
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">
                    {w.rumpunBahasaDaerah.slice(0, 2).join(', ')}
                  </td>
                  <td className="p-3 text-slate-300 text-[11px]">
                    {w.id === 'mamta' ? 'Lukisan Kulit Kayu Khombow' :
                     w.id === 'saireri' ? 'Tradisi Wor & Tari Yospan' :
                     w.id === 'domberai' ? 'Sirkulasi Kain Timur & Rumah Kaki Seribu' :
                     w.id === 'bomberai' ? 'Pala Fakfak & Seni Cadas Kokas' :
                     w.id === 'ha_anim' ? 'Seni Ukir Tiang Bisj Asmat' :
                     w.id === 'la_pago' ? 'Pesta Bakar Batu (Barapen) & Noken' :
                     'Falsafah Dou Gai Ekoai & Mege'}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => padaPilihWilayahDiPeta && padaPilihWilayahDiPeta(w.id)}
                      className="px-2.5 py-1 bg-[#16284C] hover:bg-[#1E3663] text-[#DFB76C] text-[10px] font-mono uppercase tracking-wider border border-slate-700 cursor-pointer"
                    >
                      Buka Peta &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* DEDICATED REGION DOSSIER PAGE */
        <div className="bg-[#080E1C] border border-slate-800 p-8 sm:p-12 space-y-10 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest block">
                HALAMAN KHUSUS WILAYAH ADAT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FBF9F5]">
                WILAYAH ADAT {wilayahTerpilih.nama}
              </h2>
              <p className="text-sm text-[#DFB76C] font-serif italic">
                {wilayahTerpilih.sebutanLain}
              </p>
            </div>

            <button
              onClick={() => padaPilihWilayahDiPeta && padaPilihWilayahDiPeta(wilayahTerpilih.id)}
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#DFB76C] text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md self-start"
            >
              <MapPin className="w-4 h-4" />
              <span>Buka di Peta Interaktif</span>
            </button>
          </div>

          {/* Photo & Geographical Coverage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 overflow-hidden border border-slate-800 bg-black/40">
              <img
                src={wilayahTerpilih.fotoDokumentasiUrl}
                alt={wilayahTerpilih.nama}
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#060A14] text-xs text-slate-400 font-serif italic border-t border-slate-800">
                Dokumentasi Visual Adat &amp; Lanskap Wilayah {wilayahTerpilih.nama}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#FBF9F5] border-b border-slate-800 pb-2">
                Cakupan Wilayah Geografis Tradisional
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {wilayahTerpilih.cakupanWilayahGeografis.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C5A059] font-bold">▪</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-serif uppercase tracking-wider text-[#C5A059] block">
                  Kondisi Sosial &amp; Ekonomi:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {wilayahTerpilih.kondisiSosialEkonomi}
                </p>
              </div>
            </div>
          </div>

          {/* Deep Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Sejarah Wilayah */}
            <div className="p-6 bg-[#060A14] border border-slate-800 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#DFB76C] uppercase tracking-wider">
                1. Sejarah Wilayah &amp; Dinamika Zaman
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {wilayahTerpilih.sejarahWilayah}
              </p>
            </div>

            {/* Tradisi & Budaya */}
            <div className="p-6 bg-[#060A14] border border-slate-800 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#DFB76C] uppercase tracking-wider">
                2. Tradisi, Seni Sakral &amp; Hukum Adat
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {wilayahTerpilih.tradisiDanBudaya}
              </p>
            </div>

            {/* Suku & Bahasa */}
            <div className="p-6 bg-[#060A14] border border-slate-800 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#DFB76C] uppercase tracking-wider">
                3. Suku &amp; Rumpun Bahasa Daerah
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-serif block mb-1">Masyarakat Adat &amp; Suku:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {wilayahTerpilih.masyarakatAdatDanSuku.map((s, idx) => (
                      <span key={idx} className="bg-[#122240] px-2.5 py-1 text-slate-200 border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-serif block mb-1">Bahasa Daerah Khas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {wilayahTerpilih.rumpunBahasaDaerah.map((b, idx) => (
                      <span key={idx} className="bg-slate-900 px-2.5 py-1 text-slate-300 font-mono">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pendidikan & Gereja */}
            <div className="p-6 bg-[#060A14] border border-slate-800 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#DFB76C] uppercase tracking-wider">
                4. Sejarah Pendidikan &amp; Misi Gereja
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {wilayahTerpilih.sejarahPendidikanDanGereja}
              </p>
            </div>
          </div>

          {/* Prominent Figures & Research Articles */}
          <div className="p-6 bg-[#0B1528] border-l-2 border-[#C5A059] space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-serif uppercase tracking-wider text-[#C5A059] block font-semibold">
                Tokoh-Tokoh Sejarah Asal Wilayah {wilayahTerpilih.nama}:
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200 pt-1">
                {wilayahTerpilih.tokohMasyarakat.map((t, idx) => (
                  <span key={idx} className="bg-slate-800 px-3 py-1 font-sans">
                    ▪ {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700 space-y-1 text-xs text-slate-400">
              <span className="font-serif text-[#DFB76C] block">Artikel &amp; Kajian Terkait:</span>
              <ul className="space-y-1 italic text-slate-300">
                {wilayahTerpilih.artikelTerkait.map((a, idx) => (
                  <li key={idx}>▪ {a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
