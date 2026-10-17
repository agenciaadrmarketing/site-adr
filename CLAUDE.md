# ADR Marketing — site institucional (agenciaadrmarketing.com)

Fonte de verdade das decisões: Prompt Mestre V2 + Decisões Finais + Complemento SEO/GEO/AEO
(resumidos aqui e em `docs/`). Em conflito, vale o que está documentado neste repositório.

## Stack e comandos

- Astro 7, saída estática em `dist/` (`npm ci`, `npm run build`, `npm run preview`).
- Hospedagem: Hostinger (Apache). Deploy = conteúdo de `dist/` extraído na raiz de `public_html`.
  **Nunca publicar direto em produção**: gerar pacote, fazer backup do `public_html`, só então subir.
- `public/niches/` são as páginas de nicho legadas (export antigo, ~1 MB) que seguem no ar até a
  Fase 2; `legacy/` guarda os exports originais só como referência (não é publicado).

## Regras invioláveis

1. **Identidade**: preto `#09090a`/`#0f0f0e`, off-white `#f2f2f3`, cinzas neutros, Poppins. Sem azul,
   dourado, roxo ou gradientes coloridos. Não redesenhar do zero — evoluir o que existe.
2. **Verde `#25D366` só em WhatsApp** (botões e ícones via `src/components/WhatsAppButton.astro`).
   Botões de formulário e navegação são preto/branco (`Button.astro`).
3. **Nada inventado**: sem cases, depoimentos, avaliações, números, percentuais, prazos, certificações,
   clientes ou serviços não confirmados. Números só como demonstração identificada
   ("simulação ilustrativa"). Copy de resultado é sempre condicional (especialidade, concorrência,
   investimento, posicionamento, atendimento).
4. **Matriz de serviços** em `src/data/site.ts`: só `status: 'confirmado'` vira oferta pública.
   Pendentes (SEO, sites, redes sociais, atendimento como serviço) só como conteúdo educativo.
5. **Status de páginas** em `src/data/pages.json` controla sitemap e menu. `/cases/` e `/blog/`
   não existem até haver conteúdo real; `/termos-de-uso/` é rascunho `noindex` até revisão jurídica.
6. **Formulários**: manter a integração com o Google Apps Script, campos, UTMs first-touch e abertura
   do WhatsApp (`src/scripts/lead-form.ts`). Sem PII em eventos de analytics.
7. **Tags**: GTM `GTM-PDFHMCXG`, Google Ads `AW-18381807679`, Clarity `yjdxdq034e` — uma vez por
   página, no `BaseLayout`. Não adicionar tags sem pedido explícito.
8. **Dados da empresa** (`CONTACT` em `site.ts`): WhatsApp +55 48 98880-9542,
   agencia.adrmarketing@gmail.com, CNPJ 57.872.304/0001-66, razão social
   57.872.304 CAIO SOUZA ANDERLE, liderança Caio Souza Anderle. Manter coerente em todas as páginas.

## SEO · GEO · AEO (obrigatório em toda página nova)

Checklist completo em `docs/diretrizes-seo-geo-aeo.md`; mapa de intenções e redirects em
`docs/seo-mapa-de-intencoes.md`. Em resumo: uma intenção por página, resposta direta nos primeiros
parágrafos, títulos semânticos, definições objetivas, fontes para afirmações técnicas, FAQ útil (não
artificial), links internos contextuais, identificação da ADR como responsável, JSON-LD verdadeiro
(`WebPage`, `BreadcrumbList`, `Service`, `FAQPage`, `Article`/`Person` só com autor real), canonical
com barra final, título e description únicos. Sem `llms.txt` ou marcações experimentais no lugar de
SEO convencional. Nunca prometer posição, citação em IA ou volume de leads.

## Antes de entregar

`npm run build` sem erros; Lighthouse local (mobile e desktop) com meta 90+ em todas as categorias
(sem tratar como garantia); checar strings proibidas ("90%", nomes de cases, "cases de sucesso",
verdes antigos `#1a9646`), links internos, sitemap só com URLs aprovadas, JSON-LD parseável.
Relatórios de fase em `docs/`.
