import { SITE, CONTACT, CONFIRMED_SERVICES } from './site';

type Json = Record<string, unknown>;

export function webPage(opts: { path: string; title: string; description: string; type?: string; datePublished?: string; dateModified?: string }): Json {
  const url = `${SITE.url}${opts.path}`;
  return {
    '@type': opts.type || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#org` },
    publisher: { '@id': `${SITE.url}/#org` },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function breadcrumbList(items: { label: string; href?: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${SITE.url}${it.href}` } : {}),
    })),
  };
}

export function faqPage(items: { q: string; a: string }[], path: string): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE.url}${path}#faq`,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

// Serviços confirmados como entidades Service, sem preço, nota ou avaliação.
export function servicesJsonLd(): Json[] {
  return CONFIRMED_SERVICES.map((s) => ({
    '@type': 'Service',
    '@id': `${SITE.url}/servicos/#${s.slug}`,
    name: s.title,
    description: s.description,
    serviceType: s.title,
    provider: { '@id': `${SITE.url}/#org` },
    areaServed: 'BR',
    audience: { '@type': 'Audience', audienceType: 'Médicos, clínicas e consultórios' },
    url: `${SITE.url}/servicos/`,
  }));
}

// Artigo do blog. Autor institucional (Organization) até que o cliente confirme
// quem assina cada texto; sem ratings, sem imagem inventada.
export function articleJsonLd(a: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  section: string;
  keywords: string[];
  wordCount: number;
  image?: string;
}): Json {
  const url = `${SITE.url}${a.path}`;
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: a.headline,
    description: a.description,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: { '@id': `${SITE.url}/blog/#blog` },
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: 'pt-BR',
    articleSection: a.section,
    keywords: a.keywords.join(', '),
    wordCount: a.wordCount,
    image: a.image ?? SITE.ogImage,
    author: { '@id': `${SITE.url}/#org` },
    publisher: { '@id': `${SITE.url}/#org` },
  };
}

export function blogJsonLd(posts: { path: string; headline: string; datePublished: string; description: string }[]): Json {
  return {
    '@type': 'Blog',
    '@id': `${SITE.url}/blog/#blog`,
    url: `${SITE.url}/blog/`,
    name: 'Conteúdos ADR Marketing',
    description: 'Artigos sobre captação de pacientes, tráfego pago, gestão comercial e publicidade médica para clínicas e consultórios.',
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE.url}/#org` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      '@id': `${SITE.url}${p.path}#article`,
      headline: p.headline,
      description: p.description,
      url: `${SITE.url}${p.path}`,
      datePublished: p.datePublished,
      author: { '@id': `${SITE.url}/#org` },
    })),
  };
}

export function personLeader(): Json {
  return {
    '@type': 'Person',
    '@id': `${SITE.url}/sobre/#caio`,
    name: CONTACT.leader,
    jobTitle: 'Fundador e responsável pela estratégia',
    worksFor: { '@id': `${SITE.url}/#org` },
    email: CONTACT.email,
    image: `${SITE.url}/assets/caio.webp`,
    url: `${SITE.url}/sobre/`,
  };
}
