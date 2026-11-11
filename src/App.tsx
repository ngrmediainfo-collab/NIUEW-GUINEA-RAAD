/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MenuNavigasi, 
  DokumenArsip, 
  ArtikelBlogger, 
  BeritaPortalItem, 
  BahasaAktif,
  KategoriBeritaMedia 
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DocumentModal } from './components/DocumentModal';
import { BloggerArticleModal } from './components/BloggerArticleModal';
import { SearchModal } from './components/SearchModal';
import { ambilArtikelBlogger } from './services/bloggerService';
import { initialBloggerPosts } from './data/initialBloggerPosts';

// Views
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { HistoryPapuaView } from './components/views/HistoryPapuaView';
import { TopicView } from './components/views/TopicView';
import { DigitalArchiveView } from './components/views/DigitalArchiveView';
import { ResearchPublicationsView } from './components/views/ResearchPublicationsView';
import { GalleryView } from './components/views/GalleryView';
import { ContactView } from './components/views/ContactView';

// Modul Lanjutan & Sistem Media Internasional
import { PetaPapuaView } from './components/views/PetaPapuaView';
import { TanyaAIView } from './components/views/TanyaAIView';
import { NGRIntelligenceView } from './components/views/NGRIntelligenceView';
import { InfografisView } from './components/views/InfografisView';
import { TokohSejarahView } from './components/views/TokohSejarahView';
import { EnsiklopediaWilayahAdatView } from './components/views/EnsiklopediaWilayahAdatView';
import { EnsiklopediaSejarahView } from './components/views/EnsiklopediaSejarahView';
import { PusatDokumentasiNGRView } from './components/views/PusatDokumentasiNGRView';
import { PortalBeritaView } from './components/views/PortalBeritaView';
import { PengaturanKeamananView } from './components/views/PengaturanKeamananView';
import { KalenderSejarahView } from './components/views/KalenderSejarahView';
import { DirektoriOrganisasiView } from './components/views/DirektoriOrganisasiView';
import { PacificMediaNetworkView } from './components/views/PacificMediaNetworkView';
import { DashboardEditorView } from './components/views/DashboardEditorView';

export default function App() {
  const [halamanAktif, setHalamanAktif] = useState<MenuNavigasi>('beranda');
  const [dokumenModal, setDokumenModal] = useState<DokumenArsip | null>(null);
  const [artikelModal, setArtikelModal] = useState<ArtikelBlogger | null>(null);
  const [beritaModal, setBeritaModal] = useState<BeritaPortalItem | null>(null);
  const [pencarianTerbuka, setPencarianTerbuka] = useState(false);
  const [tema, setTema] = useState<'dark' | 'light'>('dark');
  const [bahasa, setBahasa] = useState<BahasaAktif>('id');

  // Blogger Live Data State
  const [artikelBlogger, setArtikelBlogger] = useState<ArtikelBlogger[]>(initialBloggerPosts);
  const [memuatBlogger, setMemuatBlogger] = useState(false);

  const muatDataBlogger = async () => {
    setMemuatBlogger(true);
    try {
      const posts = await ambilArtikelBlogger();
      if (posts && posts.length > 0) {
        setArtikelBlogger(posts);
      }
    } catch (e) {
      console.error('Gagal mengambil feed Blogger:', e);
    } finally {
      setMemuatBlogger(false);
    }
  };

  useEffect(() => {
    muatDataBlogger();
  }, []);

  const gantiTema = () => {
    const temaBaru = tema === 'dark' ? 'light' : 'dark';
    setTema(temaBaru);
    if (temaBaru === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigasiKe = (halaman: MenuNavigasi) => {
    setHalamanAktif(halaman);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper untuk memetakan rute kategori berita
  const dapatkanKategoriDariHalaman = (halaman: MenuNavigasi): KategoriBeritaMedia => {
    switch (halaman) {
      case 'kategori_papua': return 'papua';
      case 'kategori_indonesia': return 'indonesia';
      case 'kategori_melanesia': return 'melanesia';
      case 'kategori_pasifik': return 'pasifik';
      case 'kategori_australia_nz': return 'australia_nz';
      case 'kategori_dunia': return 'dunia';
      case 'kategori_politik': return 'politik';
      case 'kategori_diplomasi': return 'diplomasi';
      case 'kategori_hukum_ham': return 'hukum_ham';
      case 'kategori_kemanusiaan': return 'kemanusiaan';
      case 'kategori_ekonomi': return 'ekonomi';
      case 'kategori_pendidikan': return 'pendidikan';
      case 'kategori_kesehatan': return 'kesehatan';
      case 'kategori_budaya': return 'budaya';
      case 'kategori_investigasi': return 'investigasi';
      case 'kategori_opini': return 'opini';
      case 'kategori_multimedia': return 'multimedia';
      default: return 'semua';
    }
  };

  const renderKontenUtama = () => {
    // Cek jika halaman adalah kategori berita
    if (halamanAktif.startsWith('kategori_')) {
      const kat = dapatkanKategoriDariHalaman(halamanAktif);
      return (
        <PortalBeritaView
          kategoriAwal={kat}
          artikelBlogger={artikelBlogger}
          memuatBlogger={memuatBlogger}
          padaMuatUlangBlogger={muatDataBlogger}
          padaPilihArtikelBlogger={(art) => setArtikelModal(art)}
          bahasa={bahasa}
        />
      );
    }

    switch (halamanAktif) {
      case 'beranda':
        return (
          <HomeView
            padaPilihNavigasi={navigasiKe}
            padaPilihDokumen={(doc) => setDokumenModal(doc)}
            padaPilihArtikel={(art) => setArtikelModal(art)}
            padaPilihBerita={(b) => setBeritaModal(b)}
            artikelBlogger={artikelBlogger}
            memuatBlogger={memuatBlogger}
            padaMuatUlangBlogger={muatDataBlogger}
            bahasa={bahasa}
          />
        );

      case 'tentang_ngr':
        return <AboutView />;

      case 'sejarah_papua':
        return (
          <HistoryPapuaView
            padaPilihDokumen={(doc) => setDokumenModal(doc)}
          />
        );

      // Sistem Lanjutan Baru
      case 'kalender_sejarah':
        return (
          <KalenderSejarahView 
            bahasa={bahasa} 
            padaPilihDokumen={(id) => {
              // Jika ada dokumen terkait, buka
              navigasiKe('arsip_dokumen');
            }}
          />
        );

      case 'direktori_organisasi':
        return <DirektoriOrganisasiView bahasa={bahasa} />;

      case 'dashboard_editor':
        return (
          <DashboardEditorView
            artikelBlogger={artikelBlogger}
            memuatBlogger={memuatBlogger}
            padaMuatUlangBlogger={muatDataBlogger}
            padaPilihArtikel={(art) => setArtikelModal(art)}
            bahasa={bahasa}
          />
        );

      case 'pacific_media_network':
        return <PacificMediaNetworkView bahasa={bahasa} />;

      case 'ngr_intelligence':
        return <NGRIntelligenceView bahasa={bahasa} />;

      case 'peta_papua':
        return (
          <PetaPapuaView 
            padaPilihDokumen={(doc) => setDokumenModal(doc)} 
          />
        );

      case 'tanya_ai':
        return <TanyaAIView />;

      case 'infografis':
        return <InfografisView />;

      case 'tokoh_sejarah':
        return <TokohSejarahView />;

      case 'ensiklopedia_wilayah_adat':
        return (
          <EnsiklopediaWilayahAdatView 
            padaPilihWilayahDiPeta={() => navigasiKe('peta_papua')} 
          />
        );

      case 'ensiklopedia_sejarah':
        return <EnsiklopediaSejarahView />;

      case 'pusat_dokumentasi_ngr':
        return <PusatDokumentasiNGRView />;

      case 'portal_berita':
        return (
          <PortalBeritaView
            kategoriAwal="semua"
            artikelBlogger={artikelBlogger}
            memuatBlogger={memuatBlogger}
            padaMuatUlangBlogger={muatDataBlogger}
            padaPilihArtikelBlogger={(art) => setArtikelModal(art)}
            bahasa={bahasa}
          />
        );

      case 'pengaturan_keamanan':
        return <PengaturanKeamananView />;

      // 17 Bab Sejarah Asli
      case 'sejarah_nasionalisme':
      case 'sejarah_perjuangan':
      case 'ngr_1961':
      case 'desember_1961':
      case 'perjanjian_new_york':
      case 'untea':
      case 'pepera_1969':
      case 'gerakan_politik':
      case 'diplomasi_internasional':
      case 'hak_asasi_manusia':
        return (
          <TopicView
            topik={halamanAktif}
            padaPilihDokumen={(doc) => setDokumenModal(doc)}
            padaPilihNavigasi={navigasiKe}
          />
        );

      case 'arsip_dokumen':
        return (
          <DigitalArchiveView
            padaPilihDokumen={(doc) => setDokumenModal(doc)}
          />
        );

      case 'penelitian_publikasi':
        return <ResearchPublicationsView />;

      case 'galeri_sejarah':
        return <GalleryView />;

      case 'hubungi_kami':
        return <ContactView />;

      default:
        return (
          <HomeView
            padaPilihNavigasi={navigasiKe}
            padaPilihDokumen={(doc) => setDokumenModal(doc)}
            padaPilihArtikel={(art) => setArtikelModal(art)}
            padaPilihBerita={(b) => setBeritaModal(b)}
            artikelBlogger={artikelBlogger}
            memuatBlogger={memuatBlogger}
            padaMuatUlangBlogger={muatDataBlogger}
            bahasa={bahasa}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A121D] text-slate-100 font-sans selection:bg-[#B99A55] selection:text-[#101C2C]">
      {/* Top Navbar with Breaking News & Category Controls */}
      <Navbar
        halamanAktif={halamanAktif}
        padaPilihHalaman={navigasiKe}
        padaBukaPencarian={() => setPencarianTerbuka(true)}
        tema={tema}
        padaGantiTema={gantiTema}
        bahasa={bahasa}
        padaGantiBahasa={(b) => setBahasa(b)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderKontenUtama()}
      </main>

      {/* Institutional Footer */}
      <Footer padaPilihHalaman={navigasiKe} />

      {/* Document Modal with integrated PDF Reader, Audio Narrator, & Text Annotations */}
      <DocumentModal
        dokumen={dokumenModal}
        padaTutup={() => setDokumenModal(null)}
      />

      {/* Blogger Article Modal */}
      <BloggerArticleModal
        artikel={artikelModal}
        padaTutup={() => setArtikelModal(null)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        terbuka={pencarianTerbuka}
        padaTutup={() => setPencarianTerbuka(false)}
        artikelBlogger={artikelBlogger}
        padaPilihDokumen={(doc) => setDokumenModal(doc)}
        padaPilihArtikel={(art) => setArtikelModal(art)}
        padaPilihNavigasi={navigasiKe}
      />
    </div>
  );
}
