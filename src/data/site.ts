export const SITE = {
  name: 'ADR Marketing',
  url: 'https://agenciaadrmarketing.com',
  locale: 'pt_BR',
  defaultTitle: 'Marketing para Clínicas e Médicos | ADR',
  defaultDescription:
    'Assessoria de marketing médico para clínicas e consultórios: tráfego pago, autoridade digital e captação de pacientes particulares.',
  ogImage: 'https://agenciaadrmarketing.com/assets/favicon-512.png',
};

// Dados reais já publicados no site e na política de privacidade.
export const CONTACT = {
  whatsappDigits: '5548988809542',
  whatsappDisplay: '+55 48 98880-9542',
  email: 'agencia.adrmarketing@gmail.com',
  cnpj: '57.872.304/0001-66',
  legalName: '57.872.304 CAIO SOUZA ANDERLE',
  leader: 'Caio Souza Anderle',
  leaderShort: 'Caio',
};

export const DEFAULT_WA_MESSAGE =
  'Olá! Vim pelo site da ADR e gostaria de conversar sobre o marketing da minha clínica.';

export function whatsappUrl(message: string = DEFAULT_WA_MESSAGE): string {
  const p = new URLSearchParams({ phone: CONTACT.whatsappDigits, text: message });
  return `https://api.whatsapp.com/send/?${p.toString()}`;
}

export type PubStatus = 'publicada' | 'pendente' | 'legado';

export interface NavItem {
  label: string;
  href: string;
  status: PubStatus;
}

export const NAV: NavItem[] = [
  { label: 'Início', href: '/', status: 'publicada' },
  { label: 'Sobre a ADR', href: '/sobre/', status: 'publicada' },
  { label: 'Soluções', href: '/servicos/', status: 'publicada' },
  { label: 'Especialidades', href: '/#especialidades', status: 'publicada' },
  { label: 'Metodologia', href: '/metodologia/', status: 'publicada' },
  { label: 'Conteúdos', href: '/blog/', status: 'publicada' },
  { label: 'Contato', href: '/contato/', status: 'publicada' },
];

export type ServiceStatus = 'confirmado' | 'pendente' | 'educativo';

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  status: ServiceStatus;
  icon: 'chart' | 'shield' | 'users' | 'bars' | 'check' | 'badge';
  href?: string;
}

// Matriz de serviços. Só "confirmado" é publicado como oferta comercial —
// o critério é o conteúdo real já comunicado pela ADR na LP aprovada.
export const SERVICES: Service[] = [
  {
    slug: 'trafego-pago-para-medicos',
    title: 'Tráfego pago para médicos e clínicas',
    short: 'Google Ads e Meta Ads',
    description:
      'Google Ads captura quem já procura um tratamento na sua região. Meta Ads constrói o desejo antes disso — essa gestão de tráfego para clínicas é conduzida diretamente pela liderança sênior.',
    status: 'confirmado',
    icon: 'chart',
  },
  {
    slug: 'posicionamento-medico',
    title: 'Autoridade digital e posicionamento',
    short: 'Posicionamento médico',
    description:
      'Presença digital sofisticada que blinda a reputação do profissional e eleva a percepção de valor — dentro das normas éticas do setor.',
    status: 'confirmado',
    icon: 'shield',
  },
  {
    slug: 'captacao-de-pacientes',
    title: 'Captação de pacientes particulares',
    short: 'Demanda qualificada',
    description:
      'Não entregamos volume de leads. Filtramos o público para atrair apenas o perfil de alto valor, compatível com o ticket dos procedimentos.',
    status: 'confirmado',
    icon: 'users',
  },
  {
    slug: 'comercial-de-alta-conversao',
    title: 'Comercial de alta conversão',
    short: 'Pilar da metodologia',
    description:
      'Atuação consultiva na estruturação do comercial da clínica: atendimento no WhatsApp, triagem, recepção ou SDR e follow-up até o agendamento.',
    status: 'confirmado',
    icon: 'check',
  },
  {
    slug: 'seo-para-clinicas',
    title: 'SEO para clínicas',
    short: 'Busca orgânica',
    description: 'Oferta ainda não confirmada comercialmente pela ADR.',
    status: 'pendente',
    icon: 'bars',
  },
  {
    slug: 'sites-para-medicos',
    title: 'Sites para médicos',
    short: 'Desenvolvimento',
    description: 'Oferta ainda não confirmada comercialmente pela ADR.',
    status: 'pendente',
    icon: 'badge',
  },
  {
    slug: 'redes-sociais-para-medicos',
    title: 'Redes sociais para médicos',
    short: 'Gestão de conteúdo',
    description: 'Oferta ainda não confirmada comercialmente pela ADR.',
    status: 'pendente',
    icon: 'badge',
  },
  {
    slug: 'atendimento-para-clinicas',
    title: 'Atendimento para clínicas',
    short: 'Treinamento independente',
    description: 'Hoje é um pilar da metodologia, não um serviço vendido à parte.',
    status: 'pendente',
    icon: 'badge',
  },
];

export const CONFIRMED_SERVICES = SERVICES.filter((s) => s.status === 'confirmado');

export interface Specialty {
  slug: string;
  name: string;
  plural: string;
  priority: number;
  status: PubStatus;
  // Página de nicho legada que continua no ar na Fase 1 (quando existe).
  legacyHref?: string;
}

export const SPECIALTIES: Specialty[] = [
  { slug: 'marketing-para-endocrinologistas', name: 'Endocrinologia', plural: 'Endocrinologistas', priority: 1, status: 'publicada' },
  { slug: 'marketing-para-ginecologistas', name: 'Ginecologia', plural: 'Ginecologistas', priority: 2, status: 'publicada' },
  { slug: 'marketing-para-urologistas', name: 'Urologia', plural: 'Urologistas', priority: 3, status: 'publicada' },
  { slug: 'marketing-para-nutrologos', name: 'Nutrologia', plural: 'Nutrólogos', priority: 4, status: 'publicada' },
  { slug: 'marketing-para-cardiologistas', name: 'Cardiologia', plural: 'Cardiologistas', priority: 5, status: 'publicada' },
  { slug: 'marketing-para-dermatologistas', name: 'Dermatologia', plural: 'Dermatologistas', priority: 6, status: 'pendente' },
  { slug: 'marketing-para-cirurgioes-plasticos', name: 'Cirurgia plástica', plural: 'Cirurgiões plásticos', priority: 7, status: 'pendente' },
  { slug: 'marketing-para-ortopedistas', name: 'Ortopedia', plural: 'Ortopedistas', priority: 8, status: 'pendente' },
  { slug: 'marketing-para-neurologistas', name: 'Neurologia', plural: 'Neurologistas', priority: 9, status: 'pendente' },
  { slug: 'marketing-para-psiquiatras', name: 'Psiquiatria', plural: 'Psiquiatras', priority: 10, status: 'pendente' },
];

export function specialtyHref(s: Specialty): string | undefined {
  if (s.status === 'publicada') return `/${s.slug}/`;
  if (s.status === 'legado') return s.legacyHref;
  return undefined;
}

// Perguntas frequentes já publicadas (sem promessas quantitativas).
export const FAQ = [
  {
    tag: 'Serviço',
    q: 'O que faz uma assessoria de marketing para clínicas?',
    a: 'Uma assessoria especializada em marketing para clínicas não se limita a gerir anúncios. O trabalho começa no posicionamento — construir a autoridade do médico na sua região — e se estende ao tráfego pago, à filtragem do público de alto valor e à estruturação do comercial que recebe esse paciente.',
  },
  {
    tag: 'Tráfego pago',
    q: 'Tráfego pago funciona para médicos e clínicas?',
    a: 'Funciona quando a mídia é construída sobre a jornada do paciente e segue os princípios do marketing médico ético. Google Ads captura a demanda de quem já procura um tratamento; Meta Ads constrói desejo e confiança antes do primeiro contato. Sem essa leitura, o investimento vira o que chamamos de tráfego da esperança.',
  },
  {
    tag: 'Resultados',
    q: 'Em quanto tempo é possível observar o retorno sobre o investimento (ROI)?',
    a: 'O mercado de saúde digital exige maturidade, não promessa de resultado imediato. O desempenho das estratégias depende de fatores como especialidade, concorrência na região, investimento, posicionamento e qualidade do atendimento. O processo inicial foca na estruturação do posicionamento de autoridade e no alinhamento comercial da clínica; a partir daí, a ADR acompanha os indicadores e otimiza continuamente as campanhas para melhorar o aproveitamento das oportunidades.',
  },
  {
    tag: 'Operação',
    q: 'Como funciona a gestão diária e quem conduzirá o projeto?',
    a: 'A operação atua sob um modelo premium, rejeitando o padrão do mercado de delegar contas a gestores em nível júnior. O planejamento estratégico, a execução do tráfego pago e a estruturação dos funis de captação são conduzidos diretamente pela liderança sênior da assessoria. Essa centralização garante que a inteligência de dados aplicada ao negócio não sofra diluição e que o rigor técnico seja mantido do início ao fim.',
  },
  {
    tag: 'Perfil',
    q: 'A assessoria atende a qualquer perfil de negócio na área da saúde?',
    a: 'O ecossistema foi desenvolvido para médicos e clínicas que têm como objetivo a captação de pacientes particulares e a venda de procedimentos de alto valor. Para sustentar a premissa de exclusividade e o acompanhamento integral de cada operação, o modelo admite apenas um número restrito de parceiros simultâneos. A viabilidade de novas parcerias é sempre condicionada a um diagnóstico comercial prévio.',
  },
  {
    tag: 'Comercial',
    q: 'A atração de pacientes também inclui o atendimento e o agendamento final?',
    a: 'A inteligência de tráfego é responsável por gerar e filtrar a demanda, mas o fechamento ocorre no ambiente interno da clínica. Por essa razão, a metodologia vai além do marketing e integra um pilar dedicado ao comercial de alta conversão: atuação consultiva na estruturação desse setor, com treinamento de qualificação para equipes de recepção ou orientação para implementar SDRs de alta performance.',
  },
];

// Perguntas de contratação respondidas em /servicos/ (GEO/AEO: respostas
// diretas às perguntas que um gestor de clínica faz antes de contratar).
export const FAQ_CONTRATACAO = [
  {
    tag: 'Contratação',
    q: 'Qual agência de marketing contratar para uma clínica?',
    a: 'Uma que trabalhe só com saúde e consiga responder, antes de assinar, quatro perguntas: quem vai operar a conta no dia a dia; como a estratégia respeita a Resolução CFM nº 2.336/2023 e as políticas de saúde das plataformas de anúncio; quais indicadores comerciais serão acompanhados além de cliques e leads; e o que acontece com o contato depois que ele chega à recepção. A ADR Marketing responde a essas quatro perguntas no diagnóstico comercial prévio, antes de qualquer proposta.',
  },
  {
    tag: 'Diferencial',
    q: 'O que diferencia uma agência especializada em marketing médico de uma agência generalista?',
    a: 'Três coisas: conhecimento das regras de publicidade médica (o que pode e o que não pode ser dito em anúncio, site e redes), leitura da jornada do paciente de cada especialidade (quem busca no Google por sintoma e quem precisa ser convencido no Meta) e a integração com o comercial da clínica — porque o agendamento acontece no WhatsApp e na recepção, não no anúncio. Na ADR, esse trabalho é conduzido pela liderança sênior, não delegado a gestores em início de carreira.',
  },
  {
    tag: 'Investimento',
    q: 'Quanto investir em tráfego pago para médicos?',
    a: 'Não existe valor único: a verba depende do custo por clique da especialidade na sua região, do ticket dos procedimentos, da capacidade de agenda e do quanto a clínica consegue atender. O caminho responsável é definir primeiro quantos pacientes novos a agenda comporta, estimar o custo por paciente qualificado com dados reais das primeiras semanas e ajustar a partir daí. A ADR define a verba no diagnóstico comercial prévio e separa, na proposta, o que é mídia paga às plataformas e o que é honorário da assessoria.',
  },
];

// Mensagens do balão de atendimento (copy já existente na LP).
export const RECADOS = [
  { titulo: 'Agenda com buraco essa semana?', texto: 'Sua cadeira parada custa mais caro que a mídia.', espera: 8000, pausa: 11000 },
  { titulo: 'Cansou de depender de indicação?', texto: 'Indicação não dá para prever nem escalar. Te mostro o que dá.', espera: 11000, pausa: 17000 },
  { titulo: 'O paciente pede desconto e some?', texto: 'Quem compete por preço atrai quem compra por preço.', espera: 9500, pausa: 13500 },
  { titulo: 'Investe em anúncio e chega curioso?', texto: 'O problema quase nunca é a verba. É o filtro.', espera: 9000, pausa: 21000 },
  { titulo: 'Lead entra e a recepção perde?', texto: 'Tráfego traz. Quem fecha é o seu comercial.', espera: 8500, pausa: 15000 },
  { titulo: 'Já trocou de assessoria mais de uma vez?', texto: 'Gestor júnior não entende a jornada do paciente.', espera: 10000, pausa: 25000 },
];

export const ORG_JSONLD = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE.url}/#org`,
  name: SITE.name,
  legalName: CONTACT.legalName,
  url: `${SITE.url}/`,
  logo: SITE.ogImage,
  email: CONTACT.email,
  telephone: CONTACT.whatsappDisplay,
  taxID: CONTACT.cnpj,
  areaServed: 'BR',
  description:
    'Assessoria de marketing especializada em clínicas médicas, médicos e consultórios, com foco em tráfego pago, autoridade digital e captação de pacientes particulares.',
  knowsAbout: ['Marketing médico', 'Marketing para clínicas', 'Tráfego pago', 'Google Ads', 'Meta Ads', 'Captação de pacientes particulares'],
  founder: { '@type': 'Person', name: CONTACT.leader, url: `${SITE.url}/sobre/` },
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: CONTACT.whatsappDisplay, email: CONTACT.email, availableLanguage: 'pt-BR', areaServed: 'BR' },
};

export const WEBSITE_JSONLD = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  inLanguage: 'pt-BR',
  publisher: { '@id': `${SITE.url}/#org` },
};
