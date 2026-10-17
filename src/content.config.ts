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
    resposta: z.string().min(200),
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
  }),
});

export const collections = { especialidades, artigos };
