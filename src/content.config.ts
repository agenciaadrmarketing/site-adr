import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Páginas de especialidade: conteúdo próprio por especialidade, validado no
// build. Texto espelhado entre especialidades é reprovado (ver docs/).
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

export const collections = { especialidades };
