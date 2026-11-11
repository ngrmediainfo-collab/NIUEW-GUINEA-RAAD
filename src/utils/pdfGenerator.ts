import { jsPDF } from 'jspdf';
import { DokumenArsip } from '../types';

/**
 * Membuat dokumen PDF otentik berstandar arsip internasional untuk dokumen sejarah Nieuw Guinea Raad.
 * Menghasilkan Blob URL yang dapat dibuka dan dibaca langsung di browser tanpa perlu mengunduh.
 */
export function generateArchivalPDFBlobUrl(dokumen: DokumenArsip): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // --- HALAMAN 1: SAMPUL DOKUMEN & IKHTISAR RESMI ---
  // Background Tint (Pergamen Halus)
  doc.setFillColor(252, 250, 246);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border Ganda Khas Arsip Resmi
  doc.setDrawColor(197, 160, 89); // Emas Klasik
  doc.setLineWidth(1.2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  doc.setLineWidth(0.3);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Kop Lembaga
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(11, 19, 43); // Midnight Navy
  doc.text('NIEUW GUINEA RAAD – DEWAN PAPUA', pageWidth / 2, 22, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 110, 130);
  doc.text('PUSAT DOKUMENTASI SEJARAH, ARSIP, DAN PENELITIAN HUKUM INTERNASIONAL', pageWidth / 2, 27, { align: 'center' });

  doc.setDrawColor(197, 160, 89);
  doc.setLineWidth(0.5);
  doc.line(margin, 31, pageWidth - margin, 31);

  // Metadata Katalog & Standar
  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(150, 115, 45);
  doc.text(`KODE KATALOG: ${dokumen.nomorKatalog}`, margin, 37);
  doc.text(`TANGGAL RESMI: ${dokumen.tanggal}`, pageWidth - margin, 37, { align: 'right' });

  // Judul Dokumen
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(11, 19, 43);
  const judulLines = doc.splitTextToSize(dokumen.judul.toUpperCase(), contentWidth);
  doc.text(judulLines, margin, 46);

  let currentY = 46 + judulLines.length * 7;

  // Garis Pemisah
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  // Kotak Verifikasi Keaslian & Provenansi
  doc.setFillColor(243, 240, 230);
  doc.setDrawColor(197, 160, 89);
  doc.rect(margin, currentY, contentWidth, 22, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 19, 43);
  doc.text('INFORMASI PROVENANSI & KEABSAHAN ARSIP:', margin + 4, currentY + 5);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 70, 85);
  doc.text(`Sumber Dokumen: ${dokumen.sumber}`, margin + 4, currentY + 10);
  doc.text(`Klasifikasi: Sumber ${dokumen.jenisSumber} (${dokumen.kategori.replace('_', ' ').toUpperCase()})`, margin + 4, currentY + 14);
  doc.text(`Penyimpanan Asli: ${dokumen.lokasiPenyimpananAsli || 'Koleksi Arsip Nasional & Nieuw Guinea Raad'}`, margin + 4, currentY + 18);

  currentY += 28;

  // Bagian 1: Ringkasan Kuratorial
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(11, 19, 43);
  doc.text('I. IKHTISAR SEJARAH & KANDUNGAN NASKAH', margin, currentY);
  currentY += 5;

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 45, 55);
  const ringkasanLines = doc.splitTextToSize(dokumen.ringkasan, contentWidth);
  doc.text(ringkasanLines, margin, currentY);
  currentY += ringkasanLines.length * 4.6 + 6;

  // Bagian 2: Catatan Kuratorial & Hukum Internasional
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(11, 19, 43);
  doc.text('II. CATATAN KURATORIAL & KONTEKS HUKUM INTERNASIONAL', margin, currentY);
  currentY += 5;

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 55, 65);
  const kuratorialLines = doc.splitTextToSize(`"${dokumen.keteranganKuratorial}"`, contentWidth);
  doc.text(kuratorialLines, margin, currentY);
  currentY += kuratorialLines.length * 4.4 + 8;

  // Stempel Digital Verifikasi Lembaga
  doc.setDrawColor(197, 160, 89);
  doc.setLineWidth(0.6);
  doc.circle(pageWidth - 36, currentY + 12, 10, 'S');
  doc.circle(pageWidth - 36, currentY + 12, 8.8, 'S');
  
  doc.setFont('times', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(150, 115, 45);
  doc.text('TERVERIFIKASI RESMI', pageWidth - 36, currentY + 11, { align: 'center' });
  doc.text('N.G.R. ARSIP', pageWidth - 36, currentY + 13.5, { align: 'center' });
  doc.text('5 APRIL 1961', pageWidth - 36, currentY + 15.5, { align: 'center' });

  // Footer Halaman 1
  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(130, 135, 145);
  doc.text('Pusat Dokumentasi Nieuw Guinea Raad – Arsip Sejarah, Identitas Politik & Dekolonisasi Papua', margin, pageHeight - 14);
  doc.text('Halaman 1 dari 2', pageWidth - margin, pageHeight - 14, { align: 'right' });

  // --- HALAMAN 2: TRANSKRIP TEKS LENGKAP & KLAUSUL HISTORIS ---
  doc.addPage();

  // Background Tint Halaman 2
  doc.setFillColor(252, 250, 246);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border Halaman 2
  doc.setDrawColor(197, 160, 89);
  doc.setLineWidth(1.2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  doc.setLineWidth(0.3);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Header Ringkas Halaman 2
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(11, 19, 43);
  doc.text('TRANSKRIP RESMI DOKUMEN HISTORIS', margin, 20);
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(150, 115, 45);
  doc.text(`[Ref: ${dokumen.nomorKatalog}]`, pageWidth - margin, 20, { align: 'right' });

  doc.setDrawColor(197, 160, 89);
  doc.setLineWidth(0.4);
  doc.line(margin, 23, pageWidth - margin, 23);

  let p2Y = 30;

  // Judul Naskah Transkrip
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(11, 19, 43);
  doc.text('III. EKSTRAK TRANSKRIP VERBATIM OTENTIK', margin, p2Y);
  p2Y += 6;

  // Transkrip Teks
  const teksTranskrip = dokumen.transkripLengkap || 
    `Naskah resmi dokumen "${dokumen.judul}" (${dokumen.tanggal}). Sumber arsip primer tersimpan pada ${dokumen.sumber}.\n\n` +
    `Ringkasan Historis:\n${dokumen.ringkasan}\n\n` +
    `Ketentuan dan Implikasi Hukum:\n` +
    `Dokumen ini merupakan bagian integral dari inventaris arsip Nieuw Guinea Raad (Dewan Nugini) yang dibentuk berdasarkan Ordonansi Dewan Nugini 1960 No. 18 dan diresmikan pada 5 April 1961 di Hollandia.\n\n` +
    `Status Pengarsipan:\n` +
    `Dokumen telah diregistrasi dalam repositori digital dengan klasifikasi: ${dokumen.standarKredibilitas.replace('_', ' ').toUpperCase()}.\n` +
    `Tautan referensi: ${dokumen.tautanReferensi || 'https://nieuw-guinea-raad.blogspot.com/'}`;

  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 35, 45);

  const transkripLines = doc.splitTextToSize(teksTranskrip, contentWidth - 4);
  
  // Render transkrip dengan batas halaman
  const maxLinesPerPage = 42;
  const linesToRender = transkripLines.slice(0, maxLinesPerPage);

  // Background kotak transkrip
  doc.setFillColor(248, 246, 239);
  doc.setDrawColor(220, 215, 200);
  const boxHeight = Math.min(linesToRender.length * 4.2 + 8, pageHeight - p2Y - 30);
  doc.rect(margin - 2, p2Y - 2, contentWidth + 4, boxHeight, 'FD');

  doc.text(linesToRender, margin + 1, p2Y + 4);

  // Footer Halaman 2
  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(130, 135, 145);
  doc.text('Dokumen ini dihasilkan secara otomatis oleh Pembaca PDF Terintegrasi Portal Nieuw Guinea Raad', margin, pageHeight - 14);
  doc.text('Halaman 2 dari 2', pageWidth - margin, pageHeight - 14, { align: 'right' });

  // Output as Blob
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}
