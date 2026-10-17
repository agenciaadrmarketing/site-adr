# ADR Marketing — site institucional (agenciaadrmarketing.com)

Fonte de verdade das decisões: Prompt Mestre V2 + Decisões Finais + Complemento SEO/GEO/AEO
(resumidos aqui e em `docs/`). Em conflito, vale o que está documentado neste repositório.

## Stack e comandos

- Astro 7, saída estática em `dist/` (`npm ci`, `npm run build`, `npm run preview`).
- Hospedagem: Hostinger (Apache). Deploy = conteúdo de `dist/` extraído na raiz de `public_html`.
  **Nunca publicar direto em produção**: gerar pacote, fazer backup do `public_html`, só então subir.
- Sitemap: `/sitemap.xml` gerado por `src/pages/sitemap.xml.ts` a partir de `src/data/pages.json`
  (publicada + legado); `/sitemap-index.xml` aponta para ele.
- `npm run audit` (depois do build): links, canonicals, sitemap, JSON-LD, títulos, strings proibidas,
  órfãs e similaridade entre páginas do mesmo template. Precisa terminar com "Sem erros".
- `public/niches/odonto/` é a única página legada restante (export antigo, ~1 MB) e segue no ar até
  decisão do cliente; `legacy/` guarda os exports originais só como referência (não é publicado).
- Especialidades: um JSON por especialidade em `src/content/especialidades/` (template
  `SpecialtyPage.astro`). Blog: um `.md` por artigo em `src/content/artigos/` (template
  `ArticlePage.astro`, hub `src/pages/blog/index.astro`, categorias em `src/data/blog.ts`).
- Artigos com `status: revisao` **não entram no build de produção**. Cópia de revisão (noindex):
  `ADR_PREVIEW=1 npm run build`. Ao aprovar: `status: publicada` + rota em `pages.json` como publicada.

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
5. **Status de páginas** em `src/data/pages.json` controla sitemap e menu. `/cases/` não existe até
   haver conteúdo verificável; `/termos-de-uso/` é rascunho `noindex` até revisão jurídica. Artigos
   sobre regulamentação (CFM, LGPD) só são publicados depois de validados por profissional habilitado.
   Autoria dos artigos é institucional (ADR Marketing) até o cliente confirmar quem assina.
6. **Formulários**: manter a integração com o Google Apps Script, campos, UTMs first-touch e abertura
   do WhatsApp (`src/scripts/lead-form.ts`). Sem PII em eventos de analytics. Eventos carregam
   `event_type` (interacao / envio_formulario / erro); lead qualificado e agendamento só por
   importação offline a partir da planilha, nunca disparados pelo navegador.
7. **Tags**: GTM `GTM-PDFHMCXG`, Google Ads `AW-18381807679`, Clarity `yjdxdq034e` — uma vez por
   página, no `BaseLayout`, pelo loader adiado (primeira interação ou 4 s após o `load`). Não voltar o
   GTM para o `<head>`: ele carrega ~640 KB (Ads + GA4 `G-1YXFZQPS7P`) e derrubou o PageSpeed mobile
   para 63. Não adicionar tags sem pedido explícito.
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
