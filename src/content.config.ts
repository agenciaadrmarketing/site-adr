import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Páginas de especialidade (Fase 2). Uma entrada = uma página em /<slug>/.
// Só `status: "publicada"` gera rota; o conteúdo precisa ser próprio da
// especialidade (jornada, demanda, pontos sensíveis, perguntas).
const especialidades = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/especialidades' }),
  schema: z.object({
    slug: z.string().regex(/^marketing-para-[a-z-]+$/),
    nome: z.string(),
    plural: z.string(),
    status: z.enum(['publicada', 'pendente']),
    title: z.string().max(70),
    description: z.string().max(175),
    h1: z.string(),
    h1Accent: z.string(),
    resposta: z.string().min(80),
    wa: z.string(),
    jornada: z.object({ titulo: z.string(), texto: z.string(), pontos: z.array(z.string()).min(3) }),
    demanda: z.object({ google: z.string(), meta: z.string(), conteudo: z.string() }),
    frentes: z.array(z.object({ t: z.string(), d: z.string() })).length(4),
    sensiveis: z.array(z.string()).min(3),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
    relacionadas: z.array(z.string()),
  }),
});

// Artigos do blog (Fase 3). Arquivo = slug da URL (/blog/<arquivo>/).
// `status: "revisao"` gera a página com noindex, fora do sitemap e das
// listagens, para o cliente revisar antes de publicar.
const artigos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string().max(70),
    h1: z.string(),
    description: z.string().max(175),
    categoria: z.enum(['captacao', 'trafego', 'comercial', 'autoridade']),
    intencao: z.string(),
    palavraChave: z.string(),
    termos: z.array(z.string()).min(3),
    resumo: z.string().min(120),
    datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    status: z.enum(['publicada', 'revisao']),
    motivoRevisao: z.string().optional(),
    destaque: z.boolean().default(false),
    ordem: z.number().int(),
    relacionados: z.array(z.string()).default([]),
    comerciais: z.array(z.object({ label: z.string(), href: z.string().regex(/^\/[a-z0-9-]+\/$/), text: z.string() })).min(1),
    fontes: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    wa: z.string(),
    cta: z.object({ title: z.string(), text: z.string() }),
    // Imagem de capa (foto licenciada, salva em /public/assets/blog/). Opcional.
    imagem: z.object({ src: z.string().regex(/^\/assets\/blog\/[a-z0-9-]+\.webp$/), alt: z.string().min(8), credito: z.string(), creditoUrl: z.string().url(), width: z.number().int(), height: z.number().int() }).optional(),
    imagemBusca: z.string().optional(),
    imagemAlt: z.string().optional(),
  }),
});

// Cases de clientes (estrutura criada em 11/11/2026). Um JSON por case em
// src/content/cases/. Só vira página com status "publicada", autorização do
// médico registrada e a origem de cada número (regra 3 do CLAUDE.md: nada
// inventado). Rascunhos só aparecem no build de revisão (ADR_PREVIEW=1), noindex.
const cases = defineCollection({
  loader: glob({ pattern: '[!_]*.json', base: './src/content/cases' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    status: z.enum(['publicada', 'rascunho']),
    medico: z.string(),
    especialidade: z.string(),
    especialidadeHref: z.string().regex(/^\/marketing-para-[a-z-]+\/$/).optional(),
    cidade: z.string(),
    uf: z.string().length(2),
    periodo: z.string(),
    title: z.string().max(70),
    description: z.string().max(175),
    h1: z.string(),
    resumo: z.string().min(80),
    destaque: z.object({ label: z.string(), antes: z.string(), depois: z.string() }),
    pontoDePartida: z.array(z.string()).min(2),
    servicos: z.array(z.string()).min(1),
    linhaDoTempo: z.array(z.object({ quando: z.string(), titulo: z.string(), texto: z.string() })).min(2),
    indicadores: z.array(z.object({ label: z.string(), antes: z.string(), depois: z.string(), evidencia: z.string().min(5) })).min(1),
    aprendizado: z.string().optional(),
    depoimento: z.object({ texto: z.string(), autor: z.string() }).optional(),
    video: z.object({ youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/), titulo: z.string(), descricao: z.string(), dataPublicacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), duracao: z.string().regex(/^PT/) }).optional(),
    autorizacao: z.object({ assinada: z.boolean(), data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), escopo: z.string().optional() }),
    datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    ordem: z.number().int().default(0),
  }),
});

export const collections = { especialidades, artigos, cases };
