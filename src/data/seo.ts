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
