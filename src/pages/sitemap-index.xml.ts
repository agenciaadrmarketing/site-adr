import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

// Mantém o endereço usado até a Fase 3 (/sitemap-index.xml) funcionando,
// apontando para o sitemap único.
export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE.url}/sitemap.xml</loc>\n  </sitemap>\n</sitemapindex>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
