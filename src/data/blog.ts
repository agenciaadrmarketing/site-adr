// Estrutura editorial do blog (Fase 3). Categorias = clusters de intenção.
// Não há páginas de categoria: com poucos artigos por tema, elas seriam
// páginas finas. A navegação por tópico usa âncoras dentro de /blog/.
export type CategoriaId = 'captacao' | 'trafego' | 'comercial' | 'autoridade';

export interface Categoria {
  id: CategoriaId;
  label: string;
  short: string;
  texto: string;
  // Página comercial que mais se relaciona ao tema.
  comercial: { label: string; href: string };
}

export const CATEGORIAS: Categoria[] = [
  {
    id: 'captacao',
    label: 'Captação de pacientes',
    short: 'Captação',
    texto: 'Como clínicas e consultórios geram demanda de pacientes particulares sem depender só de indicação — e por que parte dos contatos nunca vira agendamento.',
    comercial: { label: 'Serviços da ADR', href: '/servicos/' },
  },
  {
    id: 'trafego',
    label: 'Tráfego pago e investimento',
    short: 'Tráfego pago',
    texto: 'Google Ads, Meta Ads, planejamento de verba e avaliação de campanhas no contexto da medicina, onde o volume de cliques diz pouco.',
    comercial: { label: 'Guia de marketing médico', href: '/marketing-medico/' },
  },
  {
    id: 'comercial',
    label: 'Atendimento e gestão comercial',
    short: 'Comercial',
    texto: 'O que acontece depois do clique: atendimento no WhatsApp, acompanhamento de interessados e os indicadores que mostram onde a clínica perde paciente.',
    comercial: { label: 'Metodologia ADR', href: '/metodologia/' },
  },
  {
    id: 'autoridade',
    label: 'Autoridade, regulamentação e SEO',
    short: 'Autoridade',
    texto: 'Presença digital do médico, limites da publicidade médica e como aparecer nas pesquisas locais sem ferir as normas do setor.',
    comercial: { label: 'Guia de marketing médico', href: '/marketing-medico/' },
  },
];

export function categoria(id: CategoriaId): Categoria {
  return CATEGORIAS.find((c) => c.id === id)!;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

// ~200 palavras por minuto; nunca menos de 1.
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const BLOG_WA = 'Olá! Li um conteúdo no site da ADR e quero conversar sobre o marketing da minha clínica.';

// Autoria: enquanto o cliente não confirmar quem assina cada artigo, a
// autoria é institucional (Organization), nunca uma pessoa inventada.
export const AUTOR = { nome: 'ADR Marketing', href: '/sobre/', texto: 'Assessoria especializada em marketing médico para clínicas e consultórios. Conteúdo educativo produzido a partir da prática da ADR; não substitui orientação jurídica ou contábil.' };
