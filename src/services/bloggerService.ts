import { ArtikelBlogger } from '../types';
import { initialBloggerPosts } from '../data/initialBloggerPosts';

const BLOGGER_JSON_FEED_URL = 'https://nieuw-guinea-raad.blogspot.com/feeds/posts/default?alt=json';

// Helper to strip HTML tags for summary snippet
function bersihkanHtmlKeTeks(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function formatTanggalIndonesia(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return isoString;
  }
}

export async function ambilArtikelBlogger(): Promise<ArtikelBlogger[]> {
  try {
    // Attempt direct fetch first with a 6-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const respon = await fetch(BLOGGER_JSON_FEED_URL, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!respon.ok) {
      throw new Error(`Gagal memuat feed: status ${respon.status}`);
    }

    const data = await respon.json();
    const entries = data.feed?.entry || [];

    if (entries.length === 0) {
      return initialBloggerPosts;
    }

    const daftarArtikel: ArtikelBlogger[] = entries.map((entry: any, index: number) => {
      const id = entry.id?.$t || `post-${index}`;
      const judul = entry.title?.$t || 'Tanpa Judul';
      const rawTanggal = entry.published?.$t || new Date().toISOString();
      const tanggalPublikasi = formatTanggalIndonesia(rawTanggal);
      const kontenHtml = entry.content?.$t || entry.summary?.$t || '';
      
      const plainText = bersihkanHtmlKeTeks(kontenHtml);
      const ringkasan = plainText.length > 240 ? plainText.substring(0, 240).trim() + '...' : plainText;

      // Extract image: media$thumbnail or search first <img> in content
      let gambarUrl = entry.media$thumbnail?.url;
      if (gambarUrl) {
        // Upgrade thumbnail size from s72-c to high-res s1600
        gambarUrl = gambarUrl.replace(/\/s72(-[^/]+)?\//, '/s1600/');
      } else {
        const match = kontenHtml.match(/<img[^>]+src="([^">]+)"/);
        if (match && match[1]) {
          gambarUrl = match[1];
        }
      }

      // Labels / Categories
      const label = entry.category?.map((c: any) => c.term) || ['ARSIP', 'DOKUMENTASI'];

      // Alternate URL link
      const tautanAsli = entry.link?.find((l: any) => l.rel === 'alternate')?.href || 'https://nieuw-guinea-raad.blogspot.com/';

      // Author
      const penulis = entry.author?.[0]?.name?.$t || 'Nieuw Guinea Raad';

      return {
        id,
        judul,
        tanggalPublikasi,
        ringkasan: ringkasan || 'Dokumentasi arsip dan pernyataan resmi Nieuw Guinea Raad.',
        kontenHtml,
        gambarUrl,
        label,
        tautanAsli,
        penulis
      };
    });

    return daftarArtikel;
  } catch (error) {
    console.warn('Menggunakan data arsip Blogger cadangan lokal:', error);
    return initialBloggerPosts;
  }
}
