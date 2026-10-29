// Baixa as capas do blog (Unsplash) listadas em public/assets/blog/manifest.json.
// As imagens ficam no servidor (public_html/assets/blog/); rode isto numa máquina com
// internet antes de um deploy que substitua a pasta inteira: node scripts/fetch-blog-images.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const dir = new URL('../public/assets/blog/', import.meta.url);
const man = JSON.parse(readFileSync(new URL('manifest.json', dir), 'utf8'));
for (const [slug, m] of Object.entries(man)) {
  const out = new URL(`${slug}.webp`, dir);
  if (existsSync(out)) continue;
  const r = await fetch(m.url);
  if (!r.ok) { console.error('falhou', slug, r.status); continue; }
  writeFileSync(out, Buffer.from(await r.arrayBuffer()));
  console.log('ok', slug);
}
