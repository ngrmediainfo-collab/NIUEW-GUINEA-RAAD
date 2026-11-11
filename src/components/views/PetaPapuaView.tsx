import React, { useState, useEffect, useRef } from 'react';
import { WilayahAdatDetail, TitikPetaSejarah, KodeWilayahAdat, DokumenArsip } from '../../types';
import { daftarTujuhWilayahAdat, titikLokasiPetaPapua } from '../../data/wilayahAdatData';
import { koleksiDokumenArsip } from '../../data/archiveDocuments';
import { 
  MapPin, 
  Layers, 
  Search, 
  Compass, 
  BookOpen, 
  ShieldAlert, 
  Info, 
  Users, 
  Sparkles, 
  X, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Calendar,
  FileText
} from 'lucide-react';
import L from 'leaflet';

interface PetaPapuaViewProps {
  padaPilihDokumen?: (dokumen: DokumenArsip) => void;
  wilayahAdatAwal?: KodeWilayahAdat;
}

export const PetaPapuaView: React.FC<PetaPapuaViewProps> = ({
  padaPilihDokumen,
  wilayahAdatAwal
}) => {
  const [wilayahTerpilihId, setWilayahTerpilihId] = useState<KodeWilayahAdat>(
    wilayahAdatAwal || 'mamta'
  );
  const [kategoriFilter, setKategoriFilter] = useState<string>('semua');
  const [kataKunci, setKataKunci] = useState<string>('');
  const [titikAktif, setTitikAktif] = useState<TitikPetaSejarah | null>(null);

  const petaContainerRef = useRef<HTMLDivElement>(null);
  const petaInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const detailWilayah = daftarTujuhWilayahAdat.find(w => w.id === wilayahTerpilihId) || daftarTujuhWilayahAdat[0];

  // Coordinates mapping for 7 Customary Regions centers
  const koordinatWilayah: Record<KodeWilayahAdat, [number, number]> = {
    mamta: [-2.5337, 140.7181],
    saireri: [-1.4500, 136.2000],
    domberai: [-0.8872, 134.0924],
    bomberai: [-2.9268, 132.2965],
    ha_anim: [-5.5411, 138.5000],
    la_pago: [-4.0975, 138.9442],
    mee_pago: [-3.9214, 136.3768]
  };

  // Filtered points
  const titikTerfilter = titikLokasiPetaPapua.filter(t => {
    if (kategoriFilter !== 'semua' && t.kategori !== kategoriFilter) return false;
    if (kataKunci.trim()) {
      const q = kataKunci.toLowerCase();
      const match = 
        t.nama.toLowerCase().includes(q) ||
        t.deskripsiSingkat.toLowerCase().includes(q) ||
        t.sumberReferensi.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!petaContainerRef.current) return;

    if (!petaInstanceRef.current) {
      // Create map centered on Papua (-4.0, 136.0, zoom 6)
      const map = L.map(petaContainerRef.current, {
        center: [-3.8, 137.0],
        zoom: 6,
        minZoom: 5,
        maxZoom: 12,
        zoomControl: true
      });

      // CartoDB Dark Matter / Stadia / OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      petaInstanceRef.current = map;
    }

    return () => {
      // Clean up map on unmount
      if (petaInstanceRef.current) {
        petaInstanceRef.current.remove();
        petaInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when points or filter changes
  useEffect(() => {
    const map = petaInstanceRef.current;
    const group = markersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    titikTerfilter.forEach((titik) => {
      // Custom colored icon
      const warnaMarker = 
        titik.kategori === 'sejarah_ngr' ? '#C5A059' :
        titik.kategori === 'peristiwa' ? '#E11D48' :
        titik.kategori === 'budaya' ? '#10B981' :
        titik.kategori === 'arsip' ? '#3B82F6' : '#8B5CF6';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${warnaMarker};
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
          ">
            <span>●</span>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker([titik.lat, titik.lng], { icon: customIcon });

      marker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; color: #080D1A; padding: 4px; min-width: 200px;">
          <div style="font-size: 10px; font-weight: bold; color: #C5A059; text-transform: uppercase;">
            ${titik.kategori.replace('_', ' ')} · ${titik.tahun || ''}
          </div>
          <div style="font-size: 13px; font-weight: bold; margin-top: 2px; color: #080D1A;">
            ${titik.nama}
          </div>
          <p style="font-size: 11px; color: #4B5563; margin-top: 4px; line-height: 1.4;">
            ${titik.deskripsiSingkat}
          </p>
        </div>
      `);

      marker.on('click', () => {
        setTitikAktif(titik);
        setWilayahTerpilihId(titik.wilayahAdat);
      });

      group.addLayer(marker);
    });
  }, [titikTerfilter]);

  // Center on selected Customary Region
  const handlePilihWilayah = (id: KodeWilayahAdat) => {
    setWilayahTerpilihId(id);
    setTitikAktif(null);
    const coords = koordinatWilayah[id];
    if (petaInstanceRef.current && coords) {
      petaInstanceRef.current.flyTo(coords, 7.5, { duration: 1.2 });
    }
  };

  const handleBukaDokumenTerkait = (dokumenId?: string) => {
    if (!dokumenId) return;
    const doc = koleksiDokumenArsip.find(d => d.id === dokumenId);
    if (doc && padaPilihDokumen) {
      padaPilihDokumen(doc);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-[#C5A059]/30 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
          <Compass className="w-4 h-4" />
          <span>Sistem Informasi Geospasial &amp; Budaya Sejarah Papua</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
          PETA PAPUA: TUJUH WILAYAH ADAT &amp; TITIK SEJARAH
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-3xl">
          Eksplorasi kartografi interaktif berbasis OpenStreetMap yang memetakan persebaran tujuh wilayah adat Papua, situs parlemen Nieuw Guinea Raad 1961, perlawanan dekolonisasi, persebaran bahasa, dan arsip kebudayaan sakral.
        </p>

        {/* Mandatory Attribution & Disclaimer Notice */}
        <div className="p-3 bg-[#060A14] border-l-2 border-[#C5A059] flex items-start gap-2.5 text-xs text-slate-400 mt-3">
          <ShieldAlert className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">Keterangan Sumber &amp; Yurisdiksi Adat:</strong> Batas wilayah adat merupakan batas kultural, ekologis, dan ruang hidup ulayat masyarakat adat Papua yang bersumber dari kajian antropologis dan Dewan Adat Papua, bukan batas administrasi resmi pemerintahan negara.
          </p>
        </div>
      </div>

      {/* Region Selector Bar (7 Customary Regions) */}
      <div className="space-y-2">
        <div className="text-xs font-serif uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
          <Users className="w-3.5 h-3.5" />
          <span>Pilih Tujuh Wilayah Adat Papua:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {daftarTujuhWilayahAdat.map((w) => {
            const aktif = w.id === wilayahTerpilihId;
            return (
              <button
                key={w.id}
                onClick={() => handlePilihWilayah(w.id)}
                className={`px-3 py-2.5 text-xs font-serif transition-all text-left flex flex-col justify-between border cursor-pointer ${
                  aktif
                    ? 'bg-[#16284C] border-[#C5A059] text-[#DFB76C] shadow-md font-bold'
                    : 'bg-[#080E1C] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span className="uppercase text-xs tracking-wider">{w.nama}</span>
                <span className="text-[10px] text-slate-400 font-mono truncate">{w.sebutanLain.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Interactive Frame & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Map Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Map Filter and Search Toolbar */}
          <div className="p-3 bg-[#080E1C] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder="Cari lokasi, peristiwa, atau nama arsip..."
                className="w-full bg-[#060A14] border border-slate-700 text-slate-200 pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Layer Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'semua', label: 'Semua Titik' },
                { id: 'sejarah_ngr', label: 'NGR 1961' },
                { id: 'peristiwa', label: 'Peristiwa' },
                { id: 'budaya', label: 'Budaya & Bahasa' },
                { id: 'arsip', label: 'Arsip & Riset' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setKategoriFilter(f.id)}
                  className={`px-2.5 py-1 text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                    kategoriFilter === f.id
                      ? 'bg-[#C5A059] text-black font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leaflet Map DOM Container */}
          <div className="relative border border-[#C5A059]/40 bg-[#060A14] overflow-hidden shadow-2xl">
            <div 
              ref={petaContainerRef}
              className="w-full h-[520px] z-10"
              style={{ background: '#0a101d' }}
            />

            {/* Map Legend Floating Box */}
            <div className="absolute bottom-3 left-3 z-20 bg-[#080D1A]/95 p-3 border border-[#C5A059]/30 text-[11px] space-y-1.5 shadow-xl max-w-xs backdrop-blur-sm pointer-events-auto">
              <span className="font-serif text-[#C5A059] font-bold block uppercase">
                Legenda Simbol Peta Sejarah
              </span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] inline-block" />
                  <span>Situs NGR 1961</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] inline-block" />
                  <span>Peristiwa Kunci</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block" />
                  <span>Situs Budaya Adat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] inline-block" />
                  <span>Lokasi Arsip/Riset</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Point of Interest Card (if clicked) */}
          {titikAktif && (
            <div className="p-5 bg-[#080E1C] border border-[#C5A059] space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{titikAktif.kategori.toUpperCase()} · TAHUN {titikAktif.tahun || '-'}</span>
                </div>
                <button
                  onClick={() => setTitikAktif(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                {titikAktif.nama}
              </h3>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {titikAktif.deskripsiLengkap}
              </p>

              {titikAktif.tokohTerkait && (
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  <span className="font-serif text-[#DFB76C]">Tokoh Terkait:</span>
                  {titikAktif.tokohTerkait.map((t, idx) => (
                    <span key={idx} className="bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-serif">
                <span>Sumber: {titikAktif.sumberReferensi}</span>
                {titikAktif.dokumenIdTerkait && (
                  <button
                    onClick={() => handleBukaDokumenTerkait(titikAktif.dokumenIdTerkait)}
                    className="inline-flex items-center gap-1 text-[#DFB76C] hover:text-white underline cursor-pointer"
                  >
                    <span>Buka Arsip Terkait</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Customary Region Deep Dossier (4 cols) */}
        <div className="lg:col-span-4 bg-[#080E1C] p-6 border border-slate-800 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block">
              DOKUMENTASI WILAYAH ADAT
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#FBF9F5]">
              {detailWilayah.nama}
            </h2>
            <p className="text-xs text-[#DFB76C] font-serif italic">
              {detailWilayah.sebutanLain}
            </p>
          </div>

          {/* Region Photo */}
          <div className="aspect-[16/9] overflow-hidden border border-slate-800 bg-black/40">
            <img
              src={detailWilayah.fotoDokumentasiUrl}
              alt={detailWilayah.nama}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Geographical scope */}
          <div className="space-y-1.5 text-xs">
            <span className="font-serif text-[#DFB76C] font-semibold block">
              Cakupan Wilayah Geografis:
            </span>
            <ul className="space-y-1 text-slate-300">
              {detailWilayah.cakupanWilayahGeografis.map((c, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#C5A059]">▪</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* History overview */}
          <div className="space-y-1.5 text-xs">
            <span className="font-serif text-[#DFB76C] font-semibold block">
              Gambaran Sejarah Singkat:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
              {detailWilayah.sejarahWilayah}
            </p>
          </div>

          {/* Indigenous Peoples & Languages */}
          <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
            <div>
              <span className="font-serif text-[#DFB76C] font-semibold block mb-1">
                Suku &amp; Masyarakat Adat:
              </span>
              <div className="flex flex-wrap gap-1">
                {detailWilayah.masyarakatAdatDanSuku.map((s, idx) => (
                  <span key={idx} className="bg-[#122240] px-2 py-0.5 text-[10px] text-slate-200 border border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-serif text-[#DFB76C] font-semibold block mb-1">
                Rumpun Bahasa Daerah:
              </span>
              <div className="flex flex-wrap gap-1">
                {detailWilayah.rumpunBahasaDaerah.map((b, idx) => (
                  <span key={idx} className="bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Traditions & Culture */}
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800">
            <span className="font-serif text-[#DFB76C] font-semibold block">
              Sistem Nilai &amp; Kebudayaan Adat:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
              {detailWilayah.tradisiDanBudaya}
            </p>
          </div>

          {/* Figures */}
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800">
            <span className="font-serif text-[#DFB76C] font-semibold block">
              Tokoh Sejarah Wilayah:
            </span>
            <div className="space-y-0.5 text-slate-300 text-[11px]">
              {detailWilayah.tokohMasyarakat.map((t, idx) => (
                <div key={idx}>▪ {t}</div>
              ))}
            </div>
          </div>

          {/* References */}
          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-serif space-y-0.5">
            <span className="text-[#C5A059] block font-semibold">Sumber &amp; Atribusi:</span>
            {detailWilayah.sumberReferensi.map((ref, idx) => (
              <div key={idx} className="italic line-clamp-1">{ref}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
