#!/usr/bin/env node
// Auditoria estática do build (dist/). Sem dependências externas.
//
//   node scripts/audit.mjs            → relatório resumido + código de saída 1 se houver erro
//   node scripts/audit.mjs --json     → relatório completo em JSON
//
// Verifica: title/description/canonical únicos e consistentes, robots, lang,
// um único H1, JSON-LD parseável, links internos (arquivo existe + âncoras),
// imagens sem alt, páginas órfãs, sitemap x pages.json, strings proibidas e
// similaridade textual entre páginas de um mesmo template.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SITE = 'https://agenciaadrmarketing.com';
const asJson = process.argv.includes('--json');

if (!existsSync(DIST)) {
  console.error('dist/ não existe — rode `npm run build` antes.');
  process.exit(2);
}

// Strings que não podem aparecer no HTML publicado (claims removidos, cores
// fora da identidade, nomes de cases não verificáveis).
const FORBIDDEN = [
  /90\s?%/u,
  /3[ºo°]\s+m[êe]s/iu,
  /no terceiro m[êe]s/iu,
  /resultado(s)? garantido(s)?/iu,
  /garantimos/iu,
  /#0a8f3c|#1a9646|#00a884|#128c7e/iu, // verdes antigos fora do token oficial
  /#2563eb|#7c3aed|#d4af37|#c9a227/iu, // azul / roxo / dourado proibidos
  /base64,/u,
  /__bundler\/template/u,
  /llms\.txt/u,
  /gratuit|grátis|sem custo/iu, // preferência do cliente: nunca "gratuito"
];

const pagesJson = JSON.parse(readFileSync(join(ROOT, 'src/data/pages.json'), 'utf8'));
const published = new Set(pagesJson.filter((p) => p.status === 'publicada').map((p) => p.path));
const legacy = new Set(pagesJson.filter((p) => p.status === 'legado').map((p) => p.path));
const pendente = new Set(pagesJson.filter((p) => p.status === 'pendente').map((p) => p.path));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const fileSet = new Set(files.map((f) => '/' + relative(DIST, f).split('\\').join('/')));

function urlPathOf(file) {
  const rel = '/' + relative(DIST, file).split('\\').join('/');
  if (rel.endsWith('/index.html')) return rel.slice(0, -'index.html'.length);
  return rel;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? decode(m[2] ?? m[3] ?? m[4] ?? '') : undefined;
}

function textOf(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  ).trim();
}

const pages = [];
const errors = [];
const warnings = [];

const legacyPages = [];
for (const file of htmlFiles) {
  const path = urlPathOf(file);
  const html = readFileSync(file, 'utf8');

  // Páginas legadas (export antigo: HTML serializado em <script type="__bundler/template">).
  // Não seguem o template novo; só se verifica que as afirmações removidas não voltaram
  // e que o canonical aponta para o domínio principal.
  if (legacy.has(path) || html.includes('__bundler/template')) {
    const claims = [/90\s?%\s+(dos|das|de|no|em)\b/iu, /at[ée] o 3[ºo°] m[êe]s/iu, /cases? de sucesso/iu];
    const found = claims.map((re) => html.match(re)?.[0]).filter(Boolean);
    if (found.length) errors.push(`${path} (legado): afirmações removidas voltaram → ${found.join(', ')}`);
    const canon = html.includes(`canonical\\" href=\\"https:\\/\\/agenciaadrmarketing.com${path.replace(/\//g, '\\/')}\\"`) || html.includes(`rel="canonical" href="${SITE}${path}"`);
    if (!canon) errors.push(`${path} (legado): canonical não aponta para ${SITE}${path}`);
    if (!legacy.has(path)) errors.push(`${path}: formato legado fora do pages.json (status "legado")`);
    legacyPages.push({ path, bytes: Buffer.byteLength(html) });
    continue;
  }
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0];
  const title = decode((head.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1].trim());
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const description = metas.map((t) => (attr(t, 'name') === 'description' ? attr(t, 'content') : undefined)).find(Boolean);
  const robots = metas.map((t) => (attr(t, 'name') === 'robots' ? attr(t, 'content') : undefined)).find(Boolean) ?? '';
  const ogTitle = metas.map((t) => (attr(t, 'property') === 'og:title' ? attr(t, 'content') : undefined)).find(Boolean);
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  const canonical = links.map((t) => (attr(t, 'rel') === 'canonical' ? attr(t, 'href') : undefined)).find(Boolean);
  const lang = attr((html.match(/<html\b[^>]*>/i) || [''])[0], 'lang');
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => textOf(m[1]));
  const noindex = /noindex/i.test(robots);
  // Hierarquia de títulos dentro de <main>: nenhum salto (h2 → h4) e nenhum h3 antes do primeiro h2.
  const mainHtml = (html.match(/<main[\s\S]*?<\/main>/i) || [''])[0];
  const levels = [...mainHtml.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  let prev = 1;
  for (const l of levels) {
    if (l > prev + 1) { errors.push(`${path}: salto de título h${prev} → h${l}`); break; }
    prev = l;
  }

  const jsonld = [];
  for (const m of html.matchAll(/<script\b[^>]*type\s*=\s*"application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1]);
      const graph = parsed['@graph'] ?? (Array.isArray(parsed) ? parsed : [parsed]);
      for (const node of graph) jsonld.push(node['@type']);
    } catch (e) {
      errors.push(`${path}: JSON-LD inválido (${e.message})`);
    }
  }

  const body = (html.match(/<body[\s\S]*<\/body>/i) || [html])[0];
  const main = (body.match(/<main[\s\S]*?<\/main>/i) || [body])[0];
  const hrefs = [...body.matchAll(/<a\b[^>]*>/gi)].map((m) => attr(m[0], 'href')).filter(Boolean);
  const internal = hrefs.filter((h) => h.startsWith('/') && !h.startsWith('//'));
  const external = hrefs.filter((h) => /^https?:\/\//i.test(h) && !h.startsWith(SITE));
  const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imgsNoAlt = imgs.filter((t) => attr(t, 'alt') === undefined);
  const ids = new Set([...body.matchAll(/\sid\s*=\s*"([^"]+)"/g)].map((m) => m[1]));

  const forbidden = [];
  // CSS inline (inlineStylesheets: 'always') tem porcentagens como "90%"; regras de texto
  // olham só o HTML sem <style>, regras de cor olham o documento inteiro.
  const textOnly = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  for (const re of FORBIDDEN) {
    const m = (/#[0-9a-f]{6}/i.test(re.source) ? html : textOnly).match(re);
    if (m) forbidden.push(m[0]);
  }

  pages.push({
    path, file, title, description, canonical, robots, noindex, lang, h1s, jsonld,
    internal, external, imgsNoAlt: imgsNoAlt.length, imgs: imgs.length, ids, forbidden,
    words: textOf(main).split(' ').length, text: textOf(main),
  });
}

const byPath = new Map(pages.map((p) => [p.path, p]));

// ---- checagens por página ------------------------------------------------
const seenTitle = new Map();
const seenDesc = new Map();
for (const p of pages) {
  const is404 = p.path === '/404.html';
  if (!p.lang || !/^pt(-BR)?$/i.test(p.lang)) errors.push(`${p.path}: <html lang> ausente ou diferente de pt-BR`);
  if (!p.title) errors.push(`${p.path}: sem <title>`);
  if (p.title.length > 70) warnings.push(`${p.path}: title com ${p.title.length} caracteres (>70)`);
  if (!p.description) errors.push(`${p.path}: sem meta description`);
  else if (p.description.length > 175) warnings.push(`${p.path}: description com ${p.description.length} caracteres (>175)`);
  if (p.h1s.length !== 1) errors.push(`${p.path}: ${p.h1s.length} H1 (esperado 1)`);
  if (p.imgsNoAlt) errors.push(`${p.path}: ${p.imgsNoAlt} <img> sem atributo alt`);
  if (p.forbidden.length) errors.push(`${p.path}: strings proibidas → ${p.forbidden.join(', ')}`);

  if (!is404) {
    if (p.noindex) {
      if (p.canonical) errors.push(`${p.path}: noindex com canonical (${p.canonical})`);
      if (published.has(p.path)) errors.push(`${p.path}: está em pages.json como publicada mas tem noindex`);
    } else {
      if (!p.canonical) errors.push(`${p.path}: sem canonical`);
      else if (p.canonical !== SITE + p.path) errors.push(`${p.path}: canonical divergente (${p.canonical})`);
      if (!published.has(p.path) && !legacy.has(p.path)) errors.push(`${p.path}: indexável mas não consta como publicada em pages.json`);
      if (p.words < 250) warnings.push(`${p.path}: conteúdo curto (${p.words} palavras)`);
    }
    if (seenTitle.has(p.title)) errors.push(`${p.path}: title duplicado de ${seenTitle.get(p.title)}`);
    seenTitle.set(p.title, p.path);
    if (p.description) {
      if (seenDesc.has(p.description)) errors.push(`${p.path}: description duplicada de ${seenDesc.get(p.description)}`);
      seenDesc.set(p.description, p.path);
    }
  } else {
    if (!p.noindex) errors.push('/404.html deve ter noindex');
    if (p.canonical) errors.push('/404.html não deve ter canonical');
  }
}

// ---- links internos ------------------------------------------------------
const inbound = new Map(pages.map((p) => [p.path, new Set()]));
const brokenSeen = new Set();
for (const p of pages) {
  for (const href of p.internal) {
    const [pathPart, hash] = href.split('#');
    let target = pathPart || p.path;
    const clean = target.split('?')[0];
    const key = `${p.path} → ${href}`;
    if (clean.endsWith('/')) {
      if (!fileSet.has(clean + 'index.html')) {
        if (!brokenSeen.has(key)) errors.push(`link quebrado: ${key}`);
        brokenSeen.add(key);
        continue;
      }
    } else if (extname(clean)) {
      if (!fileSet.has(clean)) {
        if (!brokenSeen.has(key)) errors.push(`link quebrado (arquivo): ${key}`);
        brokenSeen.add(key);
        continue;
      }
    } else {
      // sem barra final e sem extensão: o .htaccess redireciona, mas é um salto a mais
      warnings.push(`link sem barra final: ${key}`);
      if (!fileSet.has(clean + '/index.html')) errors.push(`link quebrado: ${key}`);
      continue;
    }
    const t = byPath.get(clean.endsWith('/') ? clean : clean);
    if (t && hash && !t.ids.has(hash)) errors.push(`âncora inexistente: ${key}`);
    if (t && t.path !== p.path) inbound.get(t.path)?.add(p.path);
    if (t && pendente.has(t.path) && !p.noindex) errors.push(`${p.path} linka para página pendente ${t.path}`);
  }
}
for (const p of pages) {
  if (p.path === '/404.html' || p.noindex) continue;
  if (inbound.get(p.path).size === 0) errors.push(`página órfã (sem links internos de entrada): ${p.path}`);
}

// ---- links de WhatsApp com o mesmo texto e destinos diferentes -------------
// (Lighthouse: "links idênticos têm a mesma finalidade")
for (const file of htmlFiles) {
  const path = urlPathOf(file);
  if (legacy.has(path)) continue;
  const html = readFileSync(file, 'utf8');
  const porTexto = new Map();
  for (const m of html.matchAll(/<a\b([^>]*\bdata-wa=[^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = attr(`<a ${m[1]}>`, 'href');
    const texto = textOf(m[2]).toLowerCase();
    if (!texto || !href) continue;
    if (!porTexto.has(texto)) porTexto.set(texto, new Set());
    porTexto.get(texto).add(href);
  }
  for (const [texto, hrefs] of porTexto) {
    if (hrefs.size > 1) errors.push(`${path}: links de WhatsApp "${texto}" com ${hrefs.size} destinos diferentes`);
  }
}

// ---- ids duplicados --------------------------------------------------------
for (const file of htmlFiles) {
  const path = urlPathOf(file);
  if (legacy.has(path)) continue;
  const html = readFileSync(file, 'utf8');
  const vistos = new Map();
  for (const m of html.matchAll(/\sid\s*=\s*"([^"]+)"/g)) vistos.set(m[1], (vistos.get(m[1]) || 0) + 1);
  for (const [id, n] of vistos) if (n > 1) errors.push(`${path}: id duplicado "${id}" (${n}×)`);
}

// ---- sitemap -------------------------------------------------------------
const sitemapFile = join(DIST, 'sitemap.xml');
const sitemapIndex = join(DIST, 'sitemap-index.xml');
let sitemapUrls = [];
if (!existsSync(sitemapIndex) || !readFileSync(sitemapIndex, 'utf8').includes(`<loc>${SITE}/sitemap.xml</loc>`)) {
  errors.push('sitemap-index.xml ausente ou sem apontar para /sitemap.xml');
}
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) errors.push('robots.txt não declara /sitemap.xml');
if (existsSync(sitemapFile)) {
  const xmlText = readFileSync(sitemapFile, 'utf8');
  sitemapUrls = [...xmlText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ''));
  if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap.xml com URLs repetidas');
  for (const m of xmlText.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(m[1])) errors.push(`lastmod inválido no sitemap: ${m[1]}`);
  }
  const expected = new Set([...published, ...legacy]);
  for (const u of sitemapUrls) {
    if (!expected.has(u)) errors.push(`sitemap contém URL não aprovada: ${u}`);
    if (!fileSet.has(u + 'index.html')) errors.push(`sitemap contém URL sem arquivo no build: ${u}`);
    const p = byPath.get(u);
    if (p && p.noindex) errors.push(`sitemap contém página noindex: ${u}`);
  }
  for (const u of expected) if (!sitemapUrls.includes(u)) errors.push(`sitemap não contém ${u}`);
} else {
  errors.push('sitemap.xml não encontrado');
}

// ---- similaridade entre páginas do mesmo template -------------------------
function shingles(text, n = 4) {
  const w = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(' '));
  return s;
}
function jaccard(a, b) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
}
const groups = {
  especialidades: pages.filter((p) => /^\/marketing-para-/.test(p.path)),
  blog: pages.filter((p) => /^\/blog\/[^/]+\/$/.test(p.path)),
};
const similarity = {};
for (const [name, list] of Object.entries(groups)) {
  if (list.length < 2) continue;
  const sh = list.map((p) => shingles(p.text));
  let max = 0, pair = '';
  const rows = [];
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++) {
      const v = jaccard(sh[i], sh[j]);
      rows.push({ a: list[i].path, b: list[j].path, jaccard: +v.toFixed(3) });
      if (v > max) { max = v; pair = `${list[i].path} × ${list[j].path}`; }
    }
  similarity[name] = { max: +max.toFixed(3), pair, rows };
  // Páginas do mesmo template compartilham cabeçalho/rodapé/CTA; acima de
  // 0.45 o texto específico é pequeno demais para justificar a página.
  if (max > 0.45) errors.push(`similaridade alta em ${name}: ${pair} (${max.toFixed(2)})`);
}

// ---- saída ---------------------------------------------------------------
const report = {
  pages: pages.map((p) => ({
    path: p.path, title: p.title, titleLen: p.title.length, descriptionLen: p.description?.length ?? 0,
    canonical: p.canonical ?? null, robots: p.robots || null, h1: p.h1s[0] ?? null, words: p.words,
    jsonld: p.jsonld, internalLinks: p.internal.length, externalLinks: [...new Set(p.external)], inbound: inbound.get(p.path).size,
    status: published.has(p.path) ? 'publicada' : legacy.has(p.path) ? 'legado' : pendente.has(p.path) ? 'pendente' : p.path === '/404.html' ? '404' : 'fora do pages.json',
  })),
  sitemap: sitemapUrls,
  legacy: legacyPages,
  similarity,
  warnings,
  errors,
};

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Páginas no build: ${pages.length} | sitemap: ${sitemapUrls.length} URLs`);
  console.log('');
  for (const p of report.pages) {
    console.log(`${p.status.padEnd(16)} ${p.path.padEnd(42)} ${String(p.words).padStart(5)} palavras  in:${String(p.inbound).padStart(2)}  ${p.jsonld.flat().join(',')}`);
  }
  for (const l of legacyPages) console.log(`${'legado (antigo)'.padEnd(16)} ${l.path.padEnd(42)} ${Math.round(l.bytes / 1024)} KB, formato bundler — não auditado como template`);
  for (const [name, s] of Object.entries(similarity)) console.log(`\nSimilaridade máxima (${name}): ${s.max} em ${s.pair}`);
  if (warnings.length) { console.log(`\nAvisos (${warnings.length}):`); for (const w of warnings) console.log('  - ' + w); }
  if (errors.length) { console.log(`\nErros (${errors.length}):`); for (const e of errors) console.log('  ✗ ' + e); }
  else console.log('\nSem erros.');
}
process.exit(errors.length ? 1 : 0);
