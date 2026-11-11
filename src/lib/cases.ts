import { getCollection } from 'astro:content';

// Case publicável = publicado + autorização registrada + origem de cada número.
export async function casesVisiveis() {
  const preview = process.env.ADR_PREVIEW === '1';
  const all = await getCollection('cases');
  const ok = (c: (typeof all)[number]) =>
    c.data.status === 'publicada' && c.data.autorizacao.assinada && c.data.indicadores.every((i) => i.evidencia.trim().length >= 5);
  return all
    .filter((c) => ok(c) || preview)
    .map((c) => ({ ...c, publicavel: ok(c) }))
    .sort((a, b) => a.data.ordem - b.data.ordem || b.data.datePublished.localeCompare(a.data.datePublished));
}
