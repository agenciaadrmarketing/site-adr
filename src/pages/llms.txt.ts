import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, CONTACT, SPECIALTIES, FAQ, FAQ_CONTRATACAO, ORG_JSONLD } from '../data/site';
import { LANDINGS } from '../data/landings';

// Resumo legível por sistemas de IA (complemento ao SEO convencional, não substituto).
export const GET: APIRoute = async () => {
  const artigos = (await getCollection('artigos')).filter((a) => a.data.status === 'publicada').sort((a, b) => a.data.ordem - b.data.ordem);
  const esp = (await getCollection('especialidades')).filter((e) => e.data.status === 'publicada');
  const order = new Map(SPECIALTIES.map((s) => [s.slug, s.priority]));
  esp.sort((a, b) => (order.get(a.data.slug) ?? 99) - (order.get(b.data.slug) ?? 99));
  const L = (t: string, p: string, d: string) => `- [${t}](${SITE.url}${p}): ${d}`;
  const txt = `# ADR Marketing

> Assessoria de marketing médico para médicos, clínicas e consultórios em todo o Brasil (atendimento remoto): posicionamento e autoridade digital, tráfego pago (Google Ads e Meta Ads), captação de pacientes particulares e estruturação do comercial da clínica (atendimento no WhatsApp, triagem, recepção ou SDR e follow-up). Conduzida diretamente por ${CONTACT.leader}.

Comunicação dentro das regras de publicidade médica (Resolução CFM nº 2.336/2023). A ADR não promete resultado, posição ou volume de pacientes: o desempenho depende de especialidade, concorrência, investimento, posicionamento e atendimento. Toda parceria começa por um diagnóstico comercial prévio, sem compromisso.

## Empresa

- Nome: ADR Marketing (razão social ${CONTACT.legalName}, CNPJ ${CONTACT.cnpj})
- WhatsApp: ${CONTACT.whatsappDisplay}
- E-mail: ${CONTACT.email}
- Atendimento: remoto, para todo o Brasil, em horário comercial (segunda a sexta)
- Redes: ${(ORG_JSONLD.sameAs as string[]).join(' · ')}
- [Sobre a ADR](${SITE.url}/sobre/) · [Metodologia](${SITE.url}/metodologia/) · [Contato](${SITE.url}/contato/)

## Serviços

${L('Serviços de marketing médico', '/servicos/', 'as quatro frentes integradas e o que cada uma inclui.')}
${Object.values(LANDINGS).map((l) => L(l.h1, `/${l.slug}/`, l.description)).join('\n')}
${L('Guia de marketing médico', '/marketing-medico/', 'o que é marketing médico, canais e regras da publicidade médica.')}

## Marketing por especialidade

${esp.map((e) => L(e.data.h1, `/${e.data.slug}/`, e.data.description)).join('\n')}

## Perguntas frequentes

${[...FAQ, ...FAQ_CONTRATACAO].map((f: { q: string; a: string }) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Artigos

${artigos.map((a) => L(a.data.h1, `/blog/${a.id}/`, a.data.description)).join('\n')}

## Texto completo

- [llms-full.txt](${SITE.url}/llms-full.txt): texto integral das páginas de serviço, especialidades, guia e artigos.
`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
