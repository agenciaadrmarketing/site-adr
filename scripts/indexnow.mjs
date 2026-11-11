// Avisa o Bing (e os buscadores do IndexNow) das URLs novas ou alteradas.
// Rodar DEPOIS de subir o dist/ na Hostinger:
//   node scripts/indexnow.mjs                 -> todas as URLs do dist/sitemap.xml
//   node scripts/indexnow.mjs /blog/x/ /cases/ -> só as URLs indicadas
// A chave fica em public/<chave>.txt (publicada na raiz do site).
import { readFileSync } from 'node:fs';
const KEY = '3cef9e3d9d17079c1a76cc17f9cb4ab0';
const HOST = 'agenciaadrmarketing.com';
const args = process.argv.slice(2);
const urls = args.length
  ? args.map((p) => `https://${HOST}${p.startsWith('/') ? p : '/' + p}`)
  : [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs -> HTTP ${res.status}`);
