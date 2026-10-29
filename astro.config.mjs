import { defineConfig } from 'astro/config';

// O sitemap é gerado por src/pages/sitemap.xml.ts a partir de src/data/pages.json
// (status "publicada" e "legado"); /sitemap-index.xml aponta para ele.
export default defineConfig({
  site: 'https://agenciaadrmarketing.com',
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'always' },
});
