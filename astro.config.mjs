import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const site = 'https://agenciaadrmarketing.com';
const pages = JSON.parse(readFileSync(new URL('./src/data/pages.json', import.meta.url), 'utf8'));

// Só URLs aprovadas entram no sitemap: páginas publicadas e as páginas de
// nicho legadas que continuam no ar até decisão do cliente. O filtro roda
// depois de customPages ser mesclado, por isso precisa aceitar as duas listas.
const published = new Set(pages.filter((p) => p.status === 'publicada').map((p) => site + p.path));
const legacy = pages.filter((p) => p.status === 'legado').map((p) => site + p.path);
const allowed = new Set([...published, ...legacy]);

export default defineConfig({
  site,
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => allowed.has(page),
      customPages: legacy,
      changefreq: 'monthly',
    }),
  ],
});
