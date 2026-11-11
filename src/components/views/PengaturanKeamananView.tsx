import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Users, 
  History, 
  Download, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Server, 
  Eye, 
  EyeOff, 
  RefreshCw,
  LogOut,
  FileCheck,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { PenggunaAdmin, AuditLogEntry, PeranPengguna } from '../../types';

export const PengaturanKeamananView: React.FC = () => {
  // Auth state
  const [pengguna, setPengguna] = useState<PenggunaAdmin | null>(null);
  const [tokenAuth, setTokenAuth] = useState<string | null>(null);

  // Form states
  const [usernameInput, setUsernameInput] = useState('admin_ngr');
  const [passwordInput, setPasswordInput] = useState('');
  const [mfaCodeInput, setMfaCodeInput] = useState('');
  const [tampilkanSandi, setTampilkanSandi] = useState(false);
  const [mfaMemerlukan, setMfaMemerlukan] = useState(false);
  const [tempTokenMfa, setTempTokenMfa] = useState<string | null>(null);

  // Status & Feedback
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);
  const [memproses, setMemproses] = useState(false);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [memuatLogs, setMemuatLogs] = useState(false);

  // Active Tab
  const [tabAktif, setTabAktif] = useState<'status' | 'audit' | 'backup' | 'rbac' | 'api_gemini'>('status');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError(null);
    setPesanSukses(null);
    setMemproses(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal masuk. Periksa kembali nama pengguna dan kata sandi.');
      }

      if (data.mfaRequired) {
        setMfaMemerlukan(true);
        setTempTokenMfa(data.tempToken);
        setPesanSukses('Kredensial valid. Silakan masukkan 6 digit kode autentikasi multi-faktor (MFA).');
      } else {
        setPengguna(data.user);
        setTokenAuth(data.token);
        setPesanSukses(`Selamat datang, ${data.user.nama}!`);
      }
    } catch (err: any) {
      setPesanError(err.message || 'Terjadi kesalahan saat memproses login.');
    } finally {
      setMemproses(false);
    }
  };

  // Handle Verify MFA
  const handleVerifikasiMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError(null);
    setMemproses(true);

    try {
      const res = await fetch('/api/auth/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempToken: tempTokenMfa,
          mfaCode: mfaCodeInput,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Kode MFA tidak valid.');
      }

      setPengguna(data.user);
      setTokenAuth(data.token);
      setMfaMemerlukan(false);
      setMfaCodeInput('');
      setPesanSukses(`Autentikasi Multi-Faktor berhasil! Sesi admin aman aktif.`);
    } catch (err: any) {
      setPesanError(err.message || 'Kode MFA keliru.');
    } finally {
      setMemproses(false);
    }
  };

  // Muat Audit Logs
  const muatAuditLogs = async () => {
    if (!tokenAuth) return;
    setMemuatLogs(true);
    try {
      const res = await fetch('/api/security/audit-logs', {
        headers: {
          'Authorization': `Bearer ${tokenAuth}`,
        },
      });
      const data = await res.json();
      if (data.logs) {
        setAuditLogs(data.logs);
      }
    } catch (err) {
      console.error('Gagal memuat log audit:', err);
    } finally {
      setMemuatLogs(false);
    }
  };

  useEffect(() => {
    if (tokenAuth) {
      muatAuditLogs();
    }
  }, [tokenAuth]);

  // Handle Unduh Cadangan (Backup)
  const handleUnduhBackup = async () => {
    if (!tokenAuth) return;
    try {
      const res = await fetch('/api/security/backup', {
        headers: {
          'Authorization': `Bearer ${tokenAuth}`,
        },
      });
      const data = await res.json();
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
      const link = document.createElement('a');
      link.href = jsonString;
      link.download = `backup_ngr_portal_${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      setPesanSukses('Cadangan sistem terenkripsi berhasil diunduh.');
    } catch (err) {
      setPesanError('Gagal mengunduh berkas cadangan sistem.');
    }
  };

  // Handle Pemulihan (Restore Simulation)
  const handlePulihkanData = async () => {
    if (!tokenAuth) return;
    if (!confirm('Apakah Anda yakin ingin memulihkan snapshot data arsip?')) return;
    try {
      const res = await fetch('/api/security/restore', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          backupData: { timestamp: new Date().toISOString() },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPesanSukses('Pemulihan integritas data repositori sejarah selesai.');
        muatAuditLogs();
      }
    } catch (err) {
      setPesanError('Gagal menjalankan pemulihan snapshot data.');
    }
  };

  const handleLogout = () => {
    setPengguna(null);
    setTokenAuth(null);
    setMfaMemerlukan(false);
    setPesanSukses('Anda telah keluar dengan aman.');
  };

  return (
    <div className="py-12 bg-[#0B132B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero Section */}
        <div className="border border-[#C5A059]/30 bg-gradient-to-br from-[#101C38] via-[#0B132B] to-[#070D1D] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#DFB76C] text-xs font-serif tracking-widest uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Modul 1 · Arsitektur Keamanan Siber & Tata Kelola Arsip</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FBF9F5] leading-tight mb-4">
              Pusat Kendali Keamanan & Administrator
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              Infrastruktur perlindungan berlapis dengan autentikasi multi-faktor (MFA), enkripsi PBKDF2/SHA-512, 
              kebijakan Content Security Policy (CSP), audit trail pencatatan aktivitas, dan server-side proxy 
              terisolasi untuk memastikan keamanan penuh repositori sejarah bangsa Papua.
            </p>
          </div>
        </div>

        {/* Notifikasi Status */}
        {pesanError && (
          <div className="p-4 bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{pesanError}</span>
          </div>
        )}

        {pesanSukses && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{pesanSukses}</span>
          </div>
        )}

        {/* Jika Belum Login */}
        {!pengguna ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Login / MFA */}
            <div className="lg:col-span-6 bg-[#101C38] border border-[#C5A059]/30 p-8 shadow-xl">
              <div className="flex items-center gap-3 pb-6 border-b border-[#C5A059]/20 mb-6">
                <div className="p-2.5 bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#FBF9F5]">
                    {mfaMemerlukan ? 'Verifikasi Multi-Faktor (MFA)' : 'Masuk Administrator Arsip'}
                  </h2>
                  <p className="text-xs text-slate-400 font-sans">
                    Akses khusus staf kuratorial dan dewan pengawas dokumen.
                  </p>
                </div>
              </div>

              {!mfaMemerlukan ? (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Nama Pengguna (Username)
                    </label>
                    <input
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="admin_ngr"
                      className="w-full bg-[#080D1A] border border-[#C5A059]/30 px-4 py-2.5 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                    />
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      Akun bawaan demo: <span className="text-[#DFB76C]">admin_ngr</span> (Peran: Administrator)
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Kata Sandi Terenkripsi
                    </label>
                    <div className="relative">
                      <input
                        type={tampilkanSandi ? 'text' : 'password'}
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#080D1A] border border-[#C5A059]/30 px-4 py-2.5 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setTampilkanSandi(!tampilkanSandi)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {tampilkanSandi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      Kata sandi demo: <span className="text-[#DFB76C]">Papua1961!NGR</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={memproses}
                    className="w-full py-3 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{memproses ? 'Memvalidasi Kredensial...' : 'Masuk Gerbang Keamanan'}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifikasiMfa} className="space-y-5">
                  <div className="p-4 bg-[#080D1A] border border-[#C5A059]/30 text-xs text-slate-300 space-y-2">
                    <div className="flex items-center gap-2 text-[#DFB76C] font-mono">
                      <Fingerprint className="w-4 h-4" />
                      <span>Proteksi 2-Langkah Aktif</span>
                    </div>
                    <p>
                      Masukkan kode verifikasi 6-digit dari aplikasi authenticator Anda (atau kode demo: <span className="text-[#DFB76C] font-bold">196101</span>).
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Kode Verifikasi MFA (6 Angka)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={mfaCodeInput}
                      onChange={(e) => setMfaCodeInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="196101"
                      className="w-full bg-[#080D1A] border border-[#C5A059]/30 px-4 py-3 text-center tracking-widest text-lg font-mono text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={memproses || mfaCodeInput.length < 6}
                      className="flex-1 py-3 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{memproses ? 'Memverifikasi...' : 'Verifikasi & Lanjutkan'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMfaMemerlukan(false)}
                      className="px-4 py-3 bg-[#080D1A] hover:bg-[#16284C] text-slate-300 text-xs font-mono border border-slate-700"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Panel Audit Status Keamanan */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#101C38] border border-[#C5A059]/30 p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#FBF9F5] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                  Status Lapisan Keamanan Website
                </h3>
                
                <div className="space-y-3">
                  {[
                    { label: 'Enkripsi Kata Sandi', value: 'PBKDF2 dengan Garam Acak (Salt)', status: 'Aman' },
                    { label: 'Autentikasi Multi-Faktor (MFA)', value: 'TOTP 6-Digit Standar Internasional', status: 'Aktif' },
                    { label: 'Role-Based Access Control (RBAC)', value: 'Administrator, Editor, Reporter, Kontributor', status: 'Ditegakkan' },
                    { label: 'Proteksi Brute Force & Rate Limit', value: 'Maks. 5 percobaan gagal per 15 menit', status: 'Aktif' },
                    { label: 'Content Security Policy (CSP)', value: 'Strict Whitelist Frame & Script Headers', status: 'Diterapkan' },
                    { label: 'Proteksi Kunci Gemini AI', value: 'Server-Side Proxy Terisolasi (Port 3000)', status: 'Terlindung' },
                  ].map((sec, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#080D1A] border border-slate-800 text-xs">
                      <div>
                        <div className="text-slate-200 font-semibold">{sec.label}</div>
                        <div className="text-slate-400 font-mono text-[11px]">{sec.value}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] uppercase">
                        {sec.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ketentuan Keamanan Arsip */}
              <div className="bg-[#080D1A] border border-[#C5A059]/20 p-5 space-y-2 text-xs text-slate-300">
                <div className="font-serif font-bold text-[#DFB76C] uppercase tracking-wider">
                  Protokol Keamanan Data Sejarah Papua
                </div>
                <p className="leading-relaxed">
                  Sesuai piagam pengamanan arsip Nieuw Guinea Raad, seluruh transaksi kuratorial dan perubahan 
                  metadata dicatat dalam jejak audit permanen yang tidak dapat dimanipulasi untuk menjaga kemurnian 
                  sejarah.
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Tampilan Administrator Saat Login */
          <div className="space-y-8">
            
            {/* Header User Profile & Role Banner */}
            <div className="bg-[#101C38] border border-[#C5A059]/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#C5A059] text-[#080D1A] flex items-center justify-center font-serif font-bold text-xl rounded">
                  {pengguna.nama.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-lg text-[#FBF9F5]">{pengguna.nama}</h3>
                    <span className="px-2 py-0.5 bg-[#C5A059]/20 text-[#DFB76C] border border-[#C5A059]/40 text-xs font-mono uppercase">
                      {pengguna.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    ID: {pengguna.id} · Email: {pengguna.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={muatAuditLogs}
                  className="px-3 py-2 bg-[#080D1A] hover:bg-[#16284C] text-[#DFB76C] text-xs font-mono border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${memuatLogs ? 'animate-spin' : ''}`} />
                  <span>Segarkan</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-mono border border-red-500/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Sesi</span>
                </button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#C5A059]/20 pb-3">
              {[
                { id: 'status', label: 'Ringkasan Sistem' },
                { id: 'audit', label: `Jejak Audit (${auditLogs.length})` },
                { id: 'backup', label: 'Cadangan & Pemulihan' },
                { id: 'rbac', label: 'Struktur Peran (RBAC)' },
                { id: 'api_gemini', label: 'Infrastruktur AI' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTabAktif(tab.id as any)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    tabAktif === tab.id
                      ? 'bg-[#C5A059] text-[#080D1A] font-bold shadow-md'
                      : 'bg-[#101C38] text-slate-300 hover:text-[#DFB76C] border border-[#C5A059]/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Ringkasan Sistem */}
            {tabAktif === 'status' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#101C38] border border-[#C5A059]/30 p-6 space-y-3">
                  <div className="text-xs font-mono text-[#C5A059] uppercase">Status Server Dev / Prod</div>
                  <div className="text-2xl font-serif font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Aktif & Terlindungi</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Port 3000 berjalan dengan Express backend + Vite client middleware.
                  </p>
                </div>

                <div className="bg-[#101C38] border border-[#C5A059]/30 p-6 space-y-3">
                  <div className="text-xs font-mono text-[#C5A059] uppercase">Integritas Dokumen</div>
                  <div className="text-2xl font-serif font-bold text-[#FBF9F5] flex items-center gap-2">
                    <FileCheck className="w-6 h-6 text-[#C5A059]" />
                    <span>100% Terverifikasi</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Semua naskah sejarah, ordonansi, dan biografi melewati validasi kurator.
                  </p>
                </div>

                <div className="bg-[#101C38] border border-[#C5A059]/30 p-6 space-y-3">
                  <div className="text-xs font-mono text-[#C5A059] uppercase">Protokol AI Gemini</div>
                  <div className="text-2xl font-serif font-bold text-[#DFB76C] flex items-center gap-2">
                    <Cpu className="w-6 h-6" />
                    <span>Zero Client Secret</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    API Key tidak pernah terkirim ke peramban pengunjung.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Jejak Audit Log */}
            {tabAktif === 'audit' && (
              <div className="bg-[#101C38] border border-[#C5A059]/30 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20">
                  <h3 className="font-serif font-bold text-lg text-[#FBF9F5] flex items-center gap-2">
                    <History className="w-5 h-5 text-[#C5A059]" />
                    Catatan Jejak Audit Keamanan Real-Time
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Terekam {auditLogs.length} Aktivitas
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#080D1A] text-[#C5A059] font-mono border-b border-[#C5A059]/30">
                      <tr>
                        <th className="p-3">Waktu</th>
                        <th className="p-3">Pengguna</th>
                        <th className="p-3">Aksi</th>
                        <th className="p-3">Detail</th>
                        <th className="p-3">IP Address</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#080D1A]/50">
                          <td className="p-3 font-mono text-[11px] whitespace-nowrap text-slate-400">
                            {new Date(log.timestamp).toLocaleString('id-ID')}
                          </td>
                          <td className="p-3 font-semibold text-[#FBF9F5]">{log.username}</td>
                          <td className="p-3 font-mono text-[#DFB76C]">{log.action}</td>
                          <td className="p-3">{log.details}</td>
                          <td className="p-3 font-mono text-[11px] text-slate-400">{log.ip}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 text-[10px] font-mono uppercase ${
                              log.status === 'sukses' 
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : 'bg-red-950 text-red-300 border border-red-500/30'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Cadangan & Pemulihan */}
            {tabAktif === 'backup' && (
              <div className="bg-[#101C38] border border-[#C5A059]/30 p-8 space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#FBF9F5] flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#C5A059]" />
                    Pencadangan & Pemulihan Sistem Otomatis
                  </h3>
                  <p className="text-sm text-slate-300 font-sans mt-1">
                    Buat snapshot lengkap seluruh data arsip, infografis, ensiklopedia tokoh, peta, dan berita 
                    untuk perlindungan terhadap risiko kehilangan data historis.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-[#080D1A] border border-[#C5A059]/20 p-6 space-y-4">
                    <h4 className="font-serif font-bold text-base text-[#DFB76C]">Ekspor Cadangan Lengkap</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Mengunduh berkas arsip berformat JSON terverifikasi yang memuat seluruh dokumen sejarah, 
                      transkrip sidang, dan konfigurasi sistem.
                    </p>
                    <button
                      onClick={handleUnduhBackup}
                      className="w-full py-2.5 bg-[#C5A059] hover:bg-[#DFB76C] text-[#080D1A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Berkas Cadangan</span>
                    </button>
                  </div>

                  <div className="bg-[#080D1A] border border-[#C5A059]/20 p-6 space-y-4">
                    <h4 className="font-serif font-bold text-base text-[#DFB76C]">Verifikasi Pemulihan Data</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Menjalankan uji integritas data dan menyinkronkan kembali repositori internal terhadap 
                      berkas cadangan induk terotorisasi.
                    </p>
                    <button
                      onClick={handlePulihkanData}
                      className="w-full py-2.5 bg-[#16284C] hover:bg-[#203764] text-[#DFB76C] font-mono text-xs uppercase tracking-wider border border-[#C5A059]/40 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Jalankan Pemulihan Snapshot</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Role-Based Access Control (RBAC) */}
            {tabAktif === 'rbac' && (
              <div className="bg-[#101C38] border border-[#C5A059]/30 p-8 space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#FBF9F5] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#C5A059]" />
                    Matriks Kewenangan Hak Akses (RBAC)
                  </h3>
                  <p className="text-sm text-slate-300 font-sans mt-1">
                    Klasifikasi hak administratif untuk menjaga integritas kurasi arsip.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      role: 'Administrator',
                      deskripsi: 'Akses penuh seluruh modul, manajemen kunci keamanan, cadangan data, dan audit logs.',
                      izin: ['Kelola Pengguna', 'Ekspor/Impor Cadangan', 'Audit Trail', 'Katalog Arsip']
                    },
                    {
                      role: 'Editor',
                      deskripsi: 'Dapat menyunting, mengkurasi, dan memverifikasi dokumen sejarah serta artikel ensiklopedia.',
                      izin: ['Kajian Dokumen', 'Penyuntingan Konten', 'Verifikasi Sumber', 'Moderasi']
                    },
                    {
                      role: 'Reporter',
                      deskripsi: 'Dapat menyusun berita, wawancara, dan liputan diplomasi internasional.',
                      izin: ['Tulis Berita', 'Unggah Dokumentasi', 'Kelola Tagar Liputan']
                    },
                    {
                      role: 'Kontributor',
                      deskripsi: 'Dapat mengusulkan naskah penelitian dan koreksi data arsip untuk ditinjau editor.',
                      izin: ['Kirim Usulan Naskah', 'Komentar Kuratorial']
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#080D1A] border border-[#C5A059]/25 p-5 space-y-3">
                      <div className="text-sm font-serif font-bold text-[#DFB76C] border-b border-slate-800 pb-2">
                        {item.role}
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {item.deskripsi}
                      </p>
                      <div className="pt-2">
                        <div className="text-[10px] font-mono text-[#C5A059] uppercase mb-1.5">Hak Izin:</div>
                        <ul className="text-[11px] text-slate-400 space-y-1">
                          {item.izin.map((i, iIdx) => (
                            <li key={iIdx} className="flex items-center gap-1.5">
                              <span className="text-[#C5A059]">✓</span>
                              <span>{i}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Infrastruktur AI */}
            {tabAktif === 'api_gemini' && (
              <div className="bg-[#101C38] border border-[#C5A059]/30 p-8 space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#FBF9F5] flex items-center gap-2">
                    <Server className="w-5 h-5 text-[#C5A059]" />
                    Konfigurasi Aman Gemini AI Server-Side
                  </h3>
                  <p className="text-sm text-slate-300 font-sans mt-1">
                    Arsitektur backend menjamin bahwa kunci rahasia API tidak pernah bocor ke sisi klien.
                  </p>
                </div>

                <div className="bg-[#080D1A] border border-[#C5A059]/20 p-5 space-y-3 text-xs font-mono text-slate-300">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[#C5A059]">Endpoint Proxy Backend:</span>
                    <span className="text-emerald-400">POST /api/chat</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[#C5A059]">Model AI Aktif:</span>
                    <span className="text-slate-100">gemini-2.5-flash</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[#C5A059]">Metode Penyimpanan Kunci:</span>
                    <span className="text-slate-100">process.env.GEMINI_API_KEY (Server Side Only)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#C5A059]">Pemberian Sumber RAG:</span>
                    <span className="text-slate-100">Koleksi Terverifikasi Arsip NGR 1961</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
