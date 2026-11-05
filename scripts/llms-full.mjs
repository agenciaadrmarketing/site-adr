// Gera dist/llms-full.txt depois do build: o texto completo das páginas que
// explicam o que a ADR faz (serviços, especialidades, guia, institucionais) e
// dos artigos do blog, em Markdown simples, para leitura por assistentes de IA.
// Complementa /llms.txt (índice). Ficam de fora contato, política, termos e 404.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SITE = 'https://agenciaadrmarketing.com';

const base = ['/', '/servicos/', '/metodologia/', '/sobre/', '/marketing-medico/',
  '/trafego-pago-para-medicos/', '/google-ads-para-medicos/', '/meta-ads-para-medicos/', '/marketing-para-clinicas/'];
const especialidades = readdirSync(DIST).filter((d) => d.startsWith('marketing-para-') && d !== 'marketing-para-clinicas').sort().map((d) => `/${d}/`);
const artigos = readdirSync(join(DIST, 'blog'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => `/blog/${d.name}/`).sort();

const ent = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };
function texto(html) {
  let m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let h = m ? m[1] : html;
  h = h.replace(/<(script|style|svg|noscript|form|figure|nav)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<h1[^>]*>/gi, '\n\n# ').replace(/<h2[^>]*>/gi, '\n\n## ').replace(/<h3[^>]*>/gi, '\n\n### ').replace(/<h4[^>]*>/gi, '\n\n#### ')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n- ').replace(/<(p|div|section|tr|dt|dd|summary|details|header|article|table|ul|ol)[^>]*>/gi, '\n')
    .replace(/<\/(td|th)>/gi, ' | ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, (e) => ent[e] ?? e);
  return h.split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter((l, i, a) => l && !(l === a[i - 1]) && !l.includes('✦') && l !== 'Arraste para baixo').join('\n')
    .replace(/\n(#+ )/g, '\n\n$1').trim();
}

const blocos = [];
for (const path of [...base, ...especialidades, ...artigos]) {
  const f = join(DIST, path, 'index.html');
  if (!existsSync(f)) continue;
  const html = readFileSync(f, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || path;
  blocos.push(`---\nURL: ${SITE}${path}\nTítulo: ${title}\n\n${texto(html)}`);
}

const cab = `# ADR Marketing — texto completo do site\n\n> Versão em texto das páginas de agenciaadrmarketing.com (serviços, especialidades, guia e artigos), gerada a cada publicação. Índice resumido em ${SITE}/llms.txt. Conteúdo educativo; a publicidade médica segue a Resolução CFM nº 2.336/2023.\n\n`;
writeFileSync(join(DIST, 'llms-full.txt'), cab + blocos.join('\n\n') + '\n');
console.log(`llms-full.txt: ${blocos.length} páginas, ${Math.round(Buffer.byteLength(cab + blocos.join('')) / 1024)} KB`);
