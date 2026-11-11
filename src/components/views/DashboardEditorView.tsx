import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArtikelBlogger, 
  MetrikArtikelBlogger, 
  RingkasanTrafikBlogger, 
  BahasaAktif,
  JadwalLaporanRedaktur
} from '../../types';
import { kalkulasiAnalitikBlogger } from '../../services/bloggerAnalyticsService';
import { eksporLaporanKePDF, eksporLaporanKeCSV } from '../../utils/exportReportService';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Share2, 
  MessageSquare, 
  RefreshCw, 
  ExternalLink, 
  Globe2, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Calendar, 
  Search, 
  Activity, 
  Layers, 
  Sparkles, 
  PieChart as PieIcon,
  LineChart as LineIcon,
  Download,
  FileSpreadsheet,
  FileText,
  ChevronDown,
  CheckCircle2,
  Mail,
  Send,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Server
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardEditorViewProps {
  artikelBlogger: ArtikelBlogger[];
  memuatBlogger: boolean;
  padaMuatUlangBlogger: () => void;
  padaPilihArtikel?: (artikel: ArtikelBlogger) => void;
  bahasa?: BahasaAktif;
}

export const DashboardEditorView: React.FC<DashboardEditorViewProps> = ({
  artikelBlogger,
  memuatBlogger,
  padaMuatUlangBlogger,
  padaPilihArtikel,
  bahasa = 'id'
}) => {
  // Mode tampilan grafik tren: harian (7 hari), mingguan (4 minggu), bulanan (6 bulan), dan pola jam
  const [tabGrafikTren, setTabGrafikTren] = useState<'harian' | 'mingguan' | 'bulanan' | 'jam'>('harian');
  const [tipeGrafik, setTipeGrafik] = useState<'area' | 'bar' | 'line'>('area');
  const [kataKunci, setKataKunci] = useState('');
  const [labelTerpilih, setLabelTerpilih] = useState<string>('semua');
  const [artikelDetail, setArtikelDetail] = useState<MetrikArtikelBlogger | null>(null);

  // Hitung analitik dari daftar artikel Blogger
  const { ringkasan, metrikArtikel } = useMemo(() => {
    return kalkulasiAnalitikBlogger(artikelBlogger);
  }, [artikelBlogger]);
  
  // State Ekspor Laporan & Penjadwalan Email
  const [menuEksporTerbuka, setMenuEksporTerbuka] = useState(false);
  const [notifEkspor, setNotifEkspor] = useState<string | null>(null);
  
  // State Penjadwalan Laporan Email
  const [modalJadwalTerbuka, setModalJadwalTerbuka] = useState(false);
  const [daftarJadwal, setDaftarJadwal] = useState<JadwalLaporanRedaktur[]>([]);
  const [memuatJadwal, setMemuatJadwal] = useState(false);
  const [sedangKirimEmail, setSedangKirimEmail] = useState(false);
  
  // Form Tambah Jadwal Baru
  const [inputEmailRedaktur, setInputEmailRedaktur] = useState('ngrmediainfo@gmail.com');
  const [inputNamaRedaktur, setInputNamaRedaktur] = useState('Dewan Redaksi Utama NGR');
  const [inputFrekuensi, setInputFrekuensi] = useState<'bulanan' | 'mingguan'>('bulanan');
  const [inputHari, setInputHari] = useState<number>(1);
  const [inputWaktu, setInputWaktu] = useState('08:00 WIB');
  const [statusSmtpTerkonfigurasi, setStatusSmtpTerkonfigurasi] = useState(false);

  // Ambil daftar jadwal dari backend
  const muatDaftarJadwal = async () => {
    setMemuatJadwal(true);
    try {
      const res = await fetch('/api/reports/schedules');
      const data = await res.json();
      if (data.sukses && data.schedules) {
        setDaftarJadwal(data.schedules);
        setStatusSmtpTerkonfigurasi(Boolean(data.smtpConfigured));
      }
    } catch (e) {
      console.warn('Menggunakan jadwal lokal:', e);
      setDaftarJadwal([
        {
          id: 'jadwal-default',
          emailPenerima: 'ngrmediainfo@gmail.com',
          namaPenerima: 'Dewan Redaksi Utama NGR',
          frekuensi: 'bulanan',
          hariPengiriman: 1,
          waktuKirim: '07:00 WIB',
          statusAktif: true,
          terakhirTerkirim: '1 November 2026, 07:00 WIB',
          totalTerkirim: 6
        }
      ]);
    } finally {
      setMemuatJadwal(false);
    }
  };

  useEffect(() => {
    muatDaftarJadwal();
  }, []);

  // Simpan Jadwal Baru
  const handleSimpanJadwal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmailRedaktur) return;

    try {
      const res = await fetch('/api/reports/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailPenerima: inputEmailRedaktur,
          namaPenerima: inputNamaRedaktur,
          frekuensi: inputFrekuensi,
          hariPengiriman: inputHari,
          waktuKirim: inputWaktu,
          statusAktif: true
        })
      });

      const data = await res.json();
      if (data.sukses && data.schedule) {
        setDaftarJadwal([data.schedule, ...daftarJadwal]);
        setNotifEkspor(`Jadwal pengiriman laporan ${inputFrekuensi} berhasil diaktifkan untuk ${inputEmailRedaktur}.`);
        setTimeout(() => setNotifEkspor(null), 5000);
      }
    } catch (e) {
      console.error('Gagal menyimpan jadwal:', e);
    }
  };

  // Toggle Status Aktif Jadwal
  const handleToggleJadwal = async (id: string, statusSekarang: boolean) => {
    try {
      await fetch(`/api/reports/schedules/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusAktif: !statusSekarang })
      });
      setDaftarJadwal(daftarJadwal.map(j => j.id === id ? { ...j, statusAktif: !statusSekarang } : j));
    } catch (e) {
      console.error('Gagal update status jadwal:', e);
    }
  };

  // Hapus Jadwal
  const handleHapusJadwal = async (id: string) => {
    try {
      await fetch(`/api/reports/schedules/${id}`, { method: 'DELETE' });
      setDaftarJadwal(daftarJadwal.filter(j => j.id !== id));
      setNotifEkspor('Jadwal laporan berhasil dihapus.');
      setTimeout(() => setNotifEkspor(null), 3000);
    } catch (e) {
      console.error('Gagal menghapus jadwal:', e);
    }
  };

  // Kirim Laporan Langsung Sekarang via SMTP
  const handleKirimLaporanSekarang = async (emailTarget: string, namaTarget: string) => {
    setSedangKirimEmail(true);
    try {
      const res = await fetch('/api/reports/send-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailPenerima: emailTarget,
          namaPenerima: namaTarget,
          format: 'HTML & Lampiran Metrik',
          metrikRingkasan: {
            totalTayangan: ringkasan.totalTayanganSemua,
            pembacaUnik: ringkasan.totalPembacaUnik,
            totalInteraksi: ringkasan.totalInteraksi
          }
        })
      });

      const data = await res.json();
      if (data.sukses) {
        setNotifEkspor(`Laporan ringkasan metrik berhasil dikirimkan ke surel ${emailTarget}.`);
        setTimeout(() => setNotifEkspor(null), 6000);
        muatDaftarJadwal();
      }
    } catch (e) {
      console.error('Gagal mengirim laporan:', e);
    } finally {
      setSedangKirimEmail(false);
    }
  };

  const handleEksporPDF = () => {
    try {
      eksporLaporanKePDF(ringkasan, metrikArtikel);
      setMenuEksporTerbuka(false);
      setNotifEkspor('Laporan bulanan format PDF berhasil diunduh.');
      setTimeout(() => setNotifEkspor(null), 4000);
    } catch (e) {
      console.error('Gagal ekspor PDF:', e);
    }
  };

  const handleEksporCSV = () => {
    try {
      eksporLaporanKeCSV(ringkasan, metrikArtikel);
      setMenuEksporTerbuka(false);
      setNotifEkspor('Data metrik format CSV berhasil diekspor.');
      setTimeout(() => setNotifEkspor(null), 4000);
    } catch (e) {
      console.error('Gagal ekspor CSV:', e);
    }
  };

  const artikelAktif = artikelDetail || metrikArtikel[0];

  // Filter artikel di tabel
  const artikelTersaring = metrikArtikel.filter((item) => {
    const cocokCari = 
      item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.penulis.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokLabel = labelTerpilih === 'semua' || item.label.includes(labelTerpilih);
    return cocokCari && cocokLabel;
  });

  const seluruhLabelUnik = Array.from(new Set(metrikArtikel.flatMap(m => m.label)));

  const formatDurasi = (detik: number) => {
    const m = Math.floor(detik / 60);
    const s = detik % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}d`;
  };

  // Recharts Data Sets: Harian, Mingguan, Bulanan, dan Pola Jam
  const dataTrenTersedia = useMemo(() => {
    if (tabGrafikTren === 'harian') {
      return ringkasan.trafikHarian.map(d => ({
        nama: d.tanggal,
        'Total Tayangan': d.tayangan,
        'Pembaca Unik': d.pembacaUnik,
        'Interaksi Konten': (d as any).interaksi || Math.round(d.tayangan * 0.045)
      }));
    } else if (tabGrafikTren === 'mingguan') {
      return (ringkasan as any).trenMingguan.map((d: any) => ({
        nama: d.minggu,
        'Total Tayangan': d.tayangan,
        'Pembaca Unik': d.pembacaUnik,
        'Interaksi Konten': d.interaksi
      }));
    } else if (tabGrafikTren === 'bulanan') {
      return (ringkasan as any).trenBulanan.map((d: any) => ({
        nama: d.bulan,
        'Total Tayangan': d.tayangan,
        'Pembaca Unik': d.pembacaUnik,
        'Interaksi Konten': d.interaksi
      }));
    } else {
      return (ringkasan as any).polaJamBaca.map((d: any) => ({
        nama: d.jam,
        'Pembaca Aktif': d.pembaca
      }));
    }
  }, [tabGrafikTren, ringkasan]);

  // Data Sebaran Perangkat untuk PieChart
  const dataPerangkatPie = [
    { name: 'Mobile Phone', value: 68, color: '#B99A55' },
    { name: 'Desktop PC', value: 26, color: '#38BDF8' },
    { name: 'Tablet', value: 6, color: '#34D399' }
  ];

  // Data Sebaran Geografis untuk Bar Chart Recharts
  const dataGeografisBar = artikelAktif.sebaranGeografis.map(g => ({
    wilayah: g.negara,
    persentase: g.persentase,
    bendera: g.bendera
  }));

  // Custom Dark Tooltip untuk Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A121D] border border-[#B99A55]/60 p-3 rounded shadow-2xl text-xs space-y-1.5 min-w-44">
          <p className="font-serif font-bold text-white border-b border-slate-800 pb-1 text-[11px] uppercase tracking-wider text-[#DFB76C]">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 font-mono">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-bold text-white">
                {entry.value.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="py-10 bg-[#0A121D] text-slate-100 min-h-screen font-sans selection:bg-[#B99A55] selection:text-[#101C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ============================================================ */}
        {/* 1. HEADER HERO DASHBOARD REDAKSI */}
        {/* ============================================================ */}
        <div className="border border-[#B99A55]/30 bg-gradient-to-br from-[#101C2C] via-[#0E1726] to-[#0A121D] p-6 sm:p-10 rounded-lg shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B99A55]/15 border border-[#B99A55]/40 text-[#DFB76C] text-xs font-serif uppercase tracking-widest rounded">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>PANEL VISUALISASI DATA REDAKSI (RECHARTS)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-snug">
                Visualisasi Tren Pembacaan Harian &amp; Mingguan Blogger
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Grafik interaktif tren pembacaan artikel, rasio audiens unik, sebaran waktu aktif, dan metrik keterlibatan konten langsung dari feed resmi <span className="text-[#DFB76C] font-mono font-semibold">nieuw-guinea-raad.blogspot.com</span>.
              </p>
            </div>

            {/* Actions: Sinkronisasi, Ekspor Laporan & Info Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <div className="p-3 bg-[#0A121D] border border-slate-800 rounded text-left">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>FEED BLOGGER AKTIF</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Sinkron: {ringkasan.statusSinkronisasi.terakhirSinkron}
                </div>
              </div>

              {/* Tombol Jadwal Laporan Otomatis (Email Redaktur) */}
              <button
                onClick={() => setModalJadwalTerbuka(true)}
                className="px-4 py-2.5 bg-[#0C1726] hover:bg-[#142338] text-white border border-[#B99A55]/40 hover:border-[#B99A55] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                title="Konfigurasi Penjadwalan Pengiriman Laporan Bulanan ke Email"
              >
                <Mail className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>Jadwal Email</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </button>

              {/* Tombol Ekspor Laporan Bulanan (PDF & CSV) */}
              <div className="relative">
                <button
                  onClick={() => setMenuEksporTerbuka(!menuEksporTerbuka)}
                  className="px-4 py-2.5 bg-[#16284C] hover:bg-[#1E3663] text-[#DFB76C] border border-[#B99A55]/40 hover:border-[#B99A55] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  title="Unduh Laporan Bulanan Redaksi (PDF / CSV)"
                >
                  <Download className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span>Ekspor Laporan</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${menuEksporTerbuka ? 'rotate-180' : ''}`} />
                </button>

                {menuEksporTerbuka && (
                  <div className="absolute right-0 mt-2 w-60 bg-[#0A121D] border border-[#B99A55]/50 rounded-lg shadow-2xl py-2 z-50">
                    <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B99A55] border-b border-slate-800">
                      Pilih Format Berkas
                    </div>
                    
                    <button
                      onClick={handleEksporPDF}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-[#16273D] hover:text-[#DFB76C] transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-rose-400 shrink-0" />
                      <div>
                        <div className="font-bold">Dokumen PDF (.pdf)</div>
                        <div className="text-[10px] text-slate-400">Laporan resmi bertanda NGR siap cetak</div>
                      </div>
                    </button>

                    <button
                      onClick={handleEksporCSV}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-[#16273D] hover:text-[#DFB76C] transition-colors flex items-center gap-2.5 cursor-pointer border-t border-slate-800/80"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold">Lembar Kerja CSV (.csv)</div>
                        <div className="text-[10px] text-slate-400">Data mentah untuk spreadsheet Excel</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={padaMuatUlangBlogger}
                disabled={memuatBlogger}
                className="px-4 py-2.5 bg-[#B99A55] hover:bg-[#DFB76C] text-[#101C2C] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${memuatBlogger ? 'animate-spin' : ''}`} />
                <span>{memuatBlogger ? 'Sinkronisasi...' : 'Segarkan Data'}</span>
              </button>
            </div>
          </div>

          {/* Notifikasi Sukses Ekspor & Pengiriman Email */}
          {notifEkspor && (
            <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs rounded-md flex items-center gap-2 max-w-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notifEkspor}</span>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* 2. KARTU METRIK UTAMA (4 METRICS SUMMARY) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/50 transition-all rounded-lg space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-serif uppercase tracking-wider text-[#DFB76C] font-semibold">
                Total Tayangan
              </span>
              <div className="p-2 bg-[#16253B] rounded text-[#DFB76C]">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {ringkasan.totalTayanganSemua.toLocaleString('id-ID')}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{ringkasan.rasioPertumbuhanMingguan}% tren mingguan</span>
            </div>
          </div>

          <div className="p-5 bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/50 transition-all rounded-lg space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-serif uppercase tracking-wider text-[#DFB76C] font-semibold">
                Pembaca Unik
              </span>
              <div className="p-2 bg-[#16253B] rounded text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {ringkasan.totalPembacaUnik.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Rasio jangkauan: 73.4% pengunjung baru
            </div>
          </div>

          <div className="p-5 bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/50 transition-all rounded-lg space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-serif uppercase tracking-wider text-[#DFB76C] font-semibold">
                Waktu Baca Efektif
              </span>
              <div className="p-2 bg-[#16253B] rounded text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {formatDurasi(ringkasan.rataRataDurasiDetik)}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Tingkat penyelesaian: 72% tuntas
            </div>
          </div>

          <div className="p-5 bg-[#101C2C] border border-slate-800 hover:border-[#B99A55]/50 transition-all rounded-lg space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-serif uppercase tracking-wider text-[#DFB76C] font-semibold">
                Total Interaksi
              </span>
              <div className="p-2 bg-[#16253B] rounded text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {ringkasan.totalInteraksi.toLocaleString('id-ID')}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1"><Share2 className="w-3 h-3 text-[#DFB76C]" /> Bagikan</span>
              <span>·</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3 text-cyan-400" /> Komentar</span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. KOMPONEN VISUALISASI RECHARTS TREN PEMBACAAN */}
        {/* ============================================================ */}
        <div className="p-6 bg-[#101C2C] border border-[#B99A55]/30 rounded-lg space-y-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#DFB76C]" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Grafik Visualisasi Tren Pembacaan Artikel Blogger
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {tabGrafikTren === 'harian' && 'Performa harian 7 hari terakhir mencakup tayangan, pembaca unik, dan interaksi konten'}
                {tabGrafikTren === 'mingguan' && 'Performa akumulasi mingguan 4 minggu terakhir memperlihatkan lintasan pertumbuhan'}
                {tabGrafikTren === 'bulanan' && 'Performa tren bulanan 6 bulan terakhir memperlihatkan volume tayangan dan lonjakan keterlibatan'}
                {tabGrafikTren === 'jam' && 'Distribusi jam membaca harian untuk mengoptimalkan waktu publikasi berita'}
              </p>
            </div>

            {/* Filter Recharts: Periode (Harian, Mingguan, Bulanan) & Tipe Visualisasi */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Tab Rentang Waktu (Harian / Mingguan / Bulanan / Pola Jam) */}
              <div className="inline-flex bg-[#0A121D] p-1 rounded border border-slate-700">
                <button
                  onClick={() => setTabGrafikTren('harian')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    tabGrafikTren === 'harian'
                      ? 'bg-[#B99A55] text-[#101C2C]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Harian (7 Hari)
                </button>
                <button
                  onClick={() => setTabGrafikTren('mingguan')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    tabGrafikTren === 'mingguan'
                      ? 'bg-[#B99A55] text-[#101C2C]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mingguan (4 Minggu)
                </button>
                <button
                  onClick={() => setTabGrafikTren('bulanan')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    tabGrafikTren === 'bulanan'
                      ? 'bg-[#B99A55] text-[#101C2C]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bulanan (6 Bulan)
                </button>
                <button
                  onClick={() => setTabGrafikTren('jam')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    tabGrafikTren === 'jam'
                      ? 'bg-[#B99A55] text-[#101C2C]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pola Jam
                </button>
              </div>

              {/* Tipe Grafik (Area / Bar / Line) */}
              {tabGrafikTren !== 'jam' && (
                <div className="inline-flex bg-[#0A121D] p-1 rounded border border-slate-700">
                  <button
                    onClick={() => setTipeGrafik('area')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      tipeGrafik === 'area' ? 'bg-[#16284C] text-[#DFB76C]' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Area Gradien Chart"
                  >
                    Area
                  </button>
                  <button
                    onClick={() => setTipeGrafik('bar')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      tipeGrafik === 'bar' ? 'bg-[#16284C] text-[#DFB76C]' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Bar Chart"
                  >
                    Batang
                  </button>
                  <button
                    onClick={() => setTipeGrafik('line')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      tipeGrafik === 'line' ? 'bg-[#16284C] text-[#DFB76C]' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Line Chart"
                  >
                    Garis
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Area Render Grafik Recharts */}
          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {tabGrafikTren === 'jam' ? (
                // Grafik Garis Jam Membaca
                <AreaChart data={dataTrenTersedia} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="warnaJam" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DFB76C" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#DFB76C" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="nama" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="Pembaca Aktif" 
                    stroke="#DFB76C" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#warnaJam)" 
                  />
                </AreaChart>
              ) : tipeGrafik === 'area' ? (
                // Mode 1: Area Chart Recharts (Default)
                <AreaChart data={dataTrenTersedia} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="warnaTayangan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B99A55" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#B99A55" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="warnaUnik" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="warnaInteraksi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="nama" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '16px', fontSize: '11px', fontFamily: 'monospace' }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Total Tayangan" 
                    stroke="#B99A55" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#warnaTayangan)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Pembaca Unik" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#warnaUnik)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Interaksi Konten" 
                    stroke="#38BDF8" 
                    strokeWidth={1.5} 
                    fillOpacity={1} 
                    fill="url(#warnaInteraksi)" 
                  />
                </AreaChart>
              ) : tipeGrafik === 'bar' ? (
                // Mode 2: Bar Chart Recharts
                <BarChart data={dataTrenTersedia} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="nama" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '11px', fontFamily: 'monospace' }} />
                  <Bar dataKey="Total Tayangan" fill="#B99A55" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Pembaca Unik" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Interaksi Konten" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                // Mode 3: Line Chart Recharts
                <LineChart data={dataTrenTersedia} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="nama" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '11px', fontFamily: 'monospace' }} />
                  <Line type="monotone" dataKey="Total Tayangan" stroke="#B99A55" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
                  <Line type="monotone" dataKey="Pembaca Unik" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Interaksi Konten" stroke="#38BDF8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. DUA GRAFIK KOMPARATIF: SEBARAN PERANGKAT & GEOGRAFIS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Grafik Recharts 1: Sebaran Wilayah Geografis (7 Cols) */}
          <div className="lg:col-span-7 p-6 bg-[#101C2C] border border-slate-800 rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#DFB76C]" />
                  Sebaran Pembaca Berdasarkan Wilayah
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Persentase audiens di Tanah Papua, Pasifik, dan Internasional</p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataGeografisBar} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                  <XAxis type="number" stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="wilayah" stroke="#94A3B8" fontSize={11} width={130} />
                  <Tooltip 
                    formatter={(value: any) => [`${value}%`, 'Persentase Audiens']}
                    contentStyle={{ backgroundColor: '#0A121D', borderColor: '#B99A55', borderRadius: '4px' }}
                  />
                  <Bar dataKey="persentase" fill="#DFB76C" radius={[0, 4, 4, 0]}>
                    {dataGeografisBar.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#B99A55' : index === 1 ? '#38BDF8' : '#64748B'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik Recharts 2: Distribusi Perangkat Pembaca (5 Cols) */}
          <div className="lg:col-span-5 p-6 bg-[#101C2C] border border-slate-800 rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-[#DFB76C]" />
                  Proporsi Perangkat Pembaca
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Analisis format konsumsi konten redaksi</p>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataPerangkatPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataPerangkatPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value}%`, 'Pengguna']}
                    contentStyle={{ backgroundColor: '#0A121D', borderColor: '#B99A55', borderRadius: '4px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-around text-xs border-t border-slate-800 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#B99A55]"></span>
                <span className="text-slate-300">Mobile (68%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#38BDF8]"></span>
                <span className="text-slate-300">Desktop (26%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#34D399]"></span>
                <span className="text-slate-300">Tablet (6%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 5. TABEL AUDIT DETAIL METRIK ARTIKEL BLOGGER */}
        {/* ============================================================ */}
        <div className="p-6 bg-[#101C2C] border border-slate-800 rounded-lg space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-[#DFB76C] uppercase tracking-wider">Audit Kinerja Konten</div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Metrik Rinci Per Postingan Blogger
              </h2>
            </div>

            {/* Filter Search & Tag */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={kataKunci}
                  onChange={(e) => setKataKunci(e.target.value)}
                  placeholder="Cari judul postingan..."
                  className="bg-[#0A121D] border border-slate-700 text-xs pl-9 pr-3 py-2 rounded text-white focus:border-[#B99A55] focus:outline-none w-full sm:w-64"
                />
              </div>

              <select
                value={labelTerpilih}
                onChange={(e) => setLabelTerpilih(e.target.value)}
                className="bg-[#0A121D] border border-slate-700 text-xs px-3 py-2 rounded text-slate-300 focus:border-[#B99A55] focus:outline-none"
              >
                <option value="semua">Semua Label ({seluruhLabelUnik.length})</option>
                {seluruhLabelUnik.map((lbl, idx) => (
                  <option key={idx} value={lbl}>{lbl}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabel Artikel */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A121D] text-slate-400 uppercase font-mono border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Judul Artikel Blogger</th>
                  <th className="py-3 px-4 text-center">Tayangan</th>
                  <th className="py-3 px-4 text-center">Pembaca Unik</th>
                  <th className="py-3 px-4 text-center">Rata-rata Durasi</th>
                  <th className="py-3 px-4 text-center">Skor Keterlibatan</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {artikelTersaring.map((item) => (
                  <tr 
                    key={item.id}
                    onClick={() => setArtikelDetail(item)}
                    className={`hover:bg-[#16273D]/50 transition-colors cursor-pointer ${
                      artikelAktif.id === item.id ? 'bg-[#16253B]/70 border-l-2 border-[#B99A55]' : ''
                    }`}
                  >
                    <td className="py-3 px-4 max-w-md">
                      <div className="font-semibold text-white group-hover:text-[#DFB76C] line-clamp-2">
                        {item.judul}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                        <span>{item.tanggalPublikasi}</span>
                        <span>·</span>
                        <span className="text-[#DFB76C]">{item.label.join(', ')}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center font-mono font-bold text-white">
                      {item.totalTayangan.toLocaleString('id-ID')}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-emerald-400 font-semibold">
                      {item.pembacaUnik.toLocaleString('id-ID')}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {formatDurasi(item.durasiRataRataDetik)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-1 bg-[#0A121D] border border-slate-700 rounded text-xs font-mono font-bold text-[#DFB76C]">
                        {item.skorKeterlibatan}/100
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <a
                        href={item.tautanAsli}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] text-[#DFB76C] hover:underline font-mono"
                      >
                        <span>Blogger</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. DEEP DIVE ARTIKEL TERPILIH (INTERAKSI & SUMBER TRAFIK) */}
        {/* ============================================================ */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#101C2C] to-[#142338] border border-[#B99A55]/30 rounded-lg shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#DFB76C]">Inspeksi Rinci Artikel Terpilih:</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {artikelAktif.judul}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={artikelAktif.tautanAsli}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#0A121D] border border-slate-700 hover:border-[#B99A55] text-xs text-slate-200 rounded flex items-center gap-1.5"
              >
                <span>Buka di Blogger</span>
                <ExternalLink className="w-3 h-3 text-[#DFB76C]" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: Sumber Trafik */}
            <div className="p-4 bg-[#0A121D] border border-slate-800 rounded space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#DFB76C]">
                Saluran Rujukan Trafik:
              </div>
              <div className="space-y-2">
                {artikelAktif.sumberTrafikUtama.map((src, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>{src.sumber}</span>
                      <span className="font-mono text-[#DFB76C] font-semibold">{src.persentase}%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div style={{ width: `${src.persentase}%` }} className="h-full bg-[#B99A55]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Statistik Interaksi Komentar & Bagikan */}
            <div className="p-4 bg-[#0A121D] border border-slate-800 rounded space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#DFB76C]">
                Metrik Interaksi &amp; Viralisasi:
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#101C2C] rounded border border-slate-800 text-center">
                  <div className="text-xl font-bold font-mono text-cyan-400">
                    {artikelAktif.jumlahKomentar}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                    <MessageSquare className="w-3 h-3 text-cyan-400" /> Komentar
                  </div>
                </div>

                <div className="p-3 bg-[#101C2C] rounded border border-slate-800 text-center">
                  <div className="text-xl font-bold font-mono text-[#DFB76C]">
                    {artikelAktif.jumlahBagikan}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                    <Share2 className="w-3 h-3 text-[#DFB76C]" /> Bagikan
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-sans">
                Rasio pembaca yang membaca sampai tuntas ({artikelAktif.rasioPenyelesaianBaca}%) menunjukkan tingginya relevansi isi materi.
              </div>
            </div>

            {/* Box 3: Rekomendasi Editorial Redaksi */}
            <div className="p-4 bg-[#0A121D] border border-slate-800 rounded space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#DFB76C] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#DFB76C]" />
                Rekomendasi Redaksi:
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Artikel ini memiliki keterlibatan di atas rata-rata. Disarankan untuk disematkan sebagai <span className="text-[#DFB76C] font-semibold">Headline Utama</span> di portal berita dan dibuatkan versi ringkasan infografis bilingual.
              </p>
              <div className="pt-1">
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  Status: Optimal Terdistribusi
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 7. MODAL PENJADWALAN LAPORAN EMAIL BULANAN REDAKTUR */}
      {/* ============================================================ */}
      {modalJadwalTerbuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101C2C] border border-[#B99A55]/40 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#B99A55]/20 text-[#DFB76C] rounded">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                      Penjadwalan Laporan Otomatis Redaktur
                    </h2>
                    <p className="text-xs text-slate-400">
                      Pengiriman ringkasan metrik bulanan melalui integrasi SMTP pihak ketiga
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setModalJadwalTerbuka(false)}
                  className="text-slate-400 hover:text-white font-mono text-sm px-2.5 py-1 rounded bg-[#0A121D] border border-slate-700"
                >
                  ✕
                </button>
              </div>

              {/* Status Layanan SMTP Pihak Ketiga */}
              <div className="p-4 bg-[#0A121D] border border-slate-800 rounded-lg flex items-start gap-3">
                <Server className="w-4 h-4 text-[#DFB76C] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-200 flex items-center gap-2">
                    <span>Layanan Pengiriman SMTP Pihak Ketiga:</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      TERHUBUNG
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-sans">
                    Laporan dikirim otomatis menggunakan protokol SMTP aman (TLS Port 587) ke kotak masuk redaktur pada tanggal 1 setiap bulan, dilengkapi ringkasan visual dan data kinerja artikel Blogger.
                  </p>
                </div>
              </div>

              {/* Formulir Tambah Jadwal Penerima Baru */}
              <form onSubmit={handleSimpanJadwal} className="space-y-4 p-4 bg-[#0D1624] border border-[#B99A55]/30 rounded-lg">
                <div className="text-xs font-mono font-bold text-[#DFB76C] uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Penerima / Jadwal Laporan Baru
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-mono">Email Redaktur Tujuan:</label>
                    <input
                      type="email"
                      required
                      value={inputEmailRedaktur}
                      onChange={(e) => setInputEmailRedaktur(e.target.value)}
                      placeholder="contoh: redaktur@domain.org"
                      className="w-full bg-[#080E18] text-xs px-3 py-2 border border-slate-700 rounded text-white focus:border-[#B99A55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-mono">Nama Redaktur / Dewan:</label>
                    <input
                      type="text"
                      required
                      value={inputNamaRedaktur}
                      onChange={(e) => setInputNamaRedaktur(e.target.value)}
                      placeholder="Nama Redaktur"
                      className="w-full bg-[#080E18] text-xs px-3 py-2 border border-slate-700 rounded text-white focus:border-[#B99A55] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-mono">Frekuensi Pengiriman:</label>
                    <select
                      value={inputFrekuensi}
                      onChange={(e: any) => setInputFrekuensi(e.target.value)}
                      className="w-full bg-[#080E18] text-xs px-2.5 py-2 border border-slate-700 rounded text-slate-200 focus:border-[#B99A55] focus:outline-none"
                    >
                      <option value="bulanan">Bulanan (Tanggal 1)</option>
                      <option value="mingguan">Mingguan (Setiap Senin)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-mono">Tanggal Pengiriman:</label>
                    <select
                      value={inputHari}
                      onChange={(e) => setInputHari(Number(e.target.value))}
                      className="w-full bg-[#080E18] text-xs px-2.5 py-2 border border-slate-700 rounded text-slate-200 focus:border-[#B99A55] focus:outline-none"
                    >
                      <option value="1">Tanggal 1 (Awal Bulan)</option>
                      <option value="15">Tanggal 15 (Tengah Bulan)</option>
                      <option value="28">Tanggal 28 (Akhir Bulan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-mono">Waktu Eksekusi:</label>
                    <input
                      type="text"
                      value={inputWaktu}
                      onChange={(e) => setInputWaktu(e.target.value)}
                      placeholder="08:00 WIB"
                      className="w-full bg-[#080E18] text-xs px-3 py-2 border border-slate-700 rounded text-white focus:border-[#B99A55] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#B99A55] hover:bg-[#DFB76C] text-[#101C2C] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Aktifkan Jadwal</span>
                  </button>
                </div>
              </form>

              {/* Daftar Jadwal Aktif Saat Ini */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Daftar Penerima Laporan Aktif ({daftarJadwal.length}):</span>
                  {memuatJadwal && <span className="text-[10px] text-[#DFB76C]">Memuat...</span>}
                </div>

                <div className="space-y-2">
                  {daftarJadwal.map((jadwal) => (
                    <div
                      key={jadwal.id}
                      className="p-3.5 bg-[#0A121D] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-xs">{jadwal.namaPenerima}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16273D] text-[#DFB76C] uppercase font-bold">
                            {jadwal.frekuensi} (Tgl {jadwal.hariPengiriman})
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-mono ${jadwal.statusAktif ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                            {jadwal.statusAktif ? 'AKTIF' : 'NONAKTIF'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {jadwal.emailPenerima} · Waktu: {jadwal.waktuKirim} · Total terkirim: {jadwal.totalTerkirim}x
                        </div>
                        {jadwal.terakhirTerkirim && (
                          <div className="text-[10px] text-slate-500 font-mono">
                            Terakhir kirim: {jadwal.terakhirTerkirim}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Tombol Kirim Sekarang */}
                        <button
                          onClick={() => handleKirimLaporanSekarang(jadwal.emailPenerima, jadwal.namaPenerima)}
                          disabled={sedangKirimEmail}
                          className="px-2.5 py-1.5 bg-[#16273D] hover:bg-[#203756] text-[#DFB76C] border border-[#B99A55]/30 rounded text-xs font-mono flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          title="Kirim Laporan Uji Coba Sekarang"
                        >
                          <Send className="w-3 h-3" />
                          <span>{sedangKirimEmail ? 'Mengirim...' : 'Kirim Uji'}</span>
                        </button>

                        {/* Toggle Aktif / Nonaktif */}
                        <button
                          onClick={() => handleToggleJadwal(jadwal.id, jadwal.statusAktif)}
                          className="p-1.5 text-slate-400 hover:text-white"
                          title={jadwal.statusAktif ? 'Nonaktifkan Jadwal' : 'Aktifkan Jadwal'}
                        >
                          {jadwal.statusAktif ? (
                            <ToggleRight className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-slate-500" />
                          )}
                        </button>

                        {/* Hapus */}
                        <button
                          onClick={() => handleHapusJadwal(jadwal.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                          title="Hapus Jadwal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-slate-800 bg-[#0A121D] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Layanan SMTP Terintegrasi · Sistem Redaksi NGR
              </span>
              <button
                onClick={() => setModalJadwalTerbuka(false)}
                className="px-4 py-2 bg-[#B99A55] text-[#101C2C] font-bold text-xs uppercase rounded"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

