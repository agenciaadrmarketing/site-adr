import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import pages from '../data/pages.json';
import { SITE } from '../data/site';

// Sitemap único com todas as páginas aprovadas: status "publicada" e "legado"
// em src/data/pages.json. Rascunhos, noindex e 404 ficam de fora.
// lastmod só onde existe data real (artigos); nas demais páginas o campo é
// omitido para não informar uma data que não corresponde a uma mudança de conteúdo.
export const GET: APIRoute = async () => {
  const artigos = await getCollection('artigos');
  const datas = new Map(
    artigos
      .filter((a) => a.data.status === 'publicada')
      .map((a) => [`/blog/${a.id}/`, a.data.dateModified ?? a.data.datePublished]),
  );
  const urls = (pages as { path: string; status: string }[])
    .filter((p) => p.status === 'publicada' || p.status === 'legado')
    .map((p) => {
      const lastmod = datas.get(p.path);
      return `  <url>\n    <loc>${SITE.url}${p.path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
    });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
