# Relatório técnico — Fase 2, primeira leva (5 especialidades prioritárias)

Projeto: ADR Marketing · agenciaadrmarketing.com
Branch: `claude/awesome-tesla-9ak8rg` · Build: Astro 7 (saída estática em `dist/`)

Nada foi publicado em produção. A entrega é o código na branch e o pacote `dist/` para subir no
Hostinger quando aprovado (instruções na seção 7).

---

## 1. O que foi construído

| URL | Title | Palavras no `<main>` | Intenção |
|---|---|---|---|
| `/marketing-para-endocrinologistas/` | Marketing para Endocrinologistas \| ADR Marketing | 965 | marketing / captação de pacientes em endocrinologia (acompanhamento contínuo) |
| `/marketing-para-ginecologistas/` | Marketing para Ginecologistas \| ADR Marketing | 891 | marketing para ginecologistas e clínicas de saúde da mulher (primeira consulta → vínculo) |
| `/marketing-para-urologistas/` | Marketing para Urologistas \| ADR Marketing | 837 | captação discreta em urologia (busca ativa por sintoma, tabu) |
| `/marketing-para-nutrologos/` | Marketing para Nutrólogos \| ADR Marketing | 877 | posicionamento médico em nutrologia num mercado de promessas |
| `/marketing-para-cardiologistas/` | Marketing para Cardiologistas \| ADR Marketing | 833 | credibilidade em cardiologia (check-up, prevenção, família) |

Estrutura de cada página (template único `src/components/SpecialtyPage.astro`):

1. Hero com breadcrumbs (Início → Marketing médico → Especialidade), H1 próprio, **resposta direta**
   à intenção no primeiro parágrafo, CTA WhatsApp verde + "Pedir análise gratuita" (modal).
2. **01 Jornada do paciente** — como o paciente daquela especialidade decide (texto + 3–4 pontos).
3. **02 Onde está a demanda** — Google Ads × Meta Ads aplicados à especialidade, com link para a
   comparação geral em `/marketing-medico/`.
4. **03 As quatro frentes** — os 4 serviços confirmados, reescritos para a especialidade.
5. **04 Pontos sensíveis** — o que a publicidade médica (Resolução CFM nº 2.336/2023) e as políticas
   das plataformas restringem naquela especialidade, com link para o portal do CFM.
6. **05 Dúvidas frequentes** — 4 perguntas específicas da especialidade (FAQ visível + `FAQPage`),
   com legenda identificando a empresa responsável pelo conteúdo.
7. **Análise gratuita** — mesmo formulário (`LeadForm`, origem `especialidade_<slug>`), mesma
   integração com o Apps Script, link direto de WhatsApp com mensagem específica da especialidade.
8. **Continue por aqui** — especialidades relacionadas publicadas + Serviços + Metodologia.
9. CTA final do rodapé com mensagem de WhatsApp da especialidade.

Conteúdo: `src/content/especialidades/<slug>.json`, validado por schema (`src/content.config.ts`:
title ≤ 70, description ≤ 175, resposta ≥ 200 caracteres, exatamente 4 frentes, ≥ 3 pontos sensíveis,
≥ 3 perguntas). Rota dinâmica `src/pages/[especialidade].astro` gera só as entradas com
`status: "publicada"`.

Sem números, promessas, cases, depoimentos ou ratings. Texto qualitativo, original por especialidade
(ver similaridade na seção 4).

Outras mudanças:

- `src/data/site.ts`: as 5 especialidades passam a `status: 'publicada'` → cards da Home e do guia
  de marketing médico linkam para as rotas novas (antes apontavam para `/niches/`).
- `src/components/Footer.astro`: nova coluna **Especialidades** no rodapé.
- `src/data/pages.json`: 12 rotas publicadas, 5 especialidades da segunda leva e `/cases/`, `/blog/`,
  `/termos-de-uso/` como pendentes; `/niches/odonto/` como legado.
- `public/niches/`: removidas `cardiologia`, `endocrino`, `ginecologia`, `nutri`, `urologia`
  (1 MB cada, formato antigo). Só `odonto/` permanece.
- `public/.htaccess`: 301 ativados (tabela abaixo).
- `astro.config.mjs`: correção — o filtro do sitemap roda depois de `customPages`, então as rotas
  legadas estavam sendo excluídas; agora o sitemap tem 12 publicadas + `/niches/odonto/`.
- `src/pages/termos-de-uso.astro`: página `noindex` não emite mais canonical (sinal contraditório).
- `public/niches/odonto/index.html`: removida a frase "estratégias validadas em diversos cases de
  sucesso para garantir previsibilidade" que havia sobrado no comparativo.
- `scripts/audit.mjs` (`npm run audit`): auditoria estática reutilizável do build (seção 4).

## 2. Redirects

| Antiga | Nova | Regra |
|---|---|---|
| `/niches/cardiologia/` (e `/index.html`) | `/marketing-para-cardiologistas/` | 301 |
| `/niches/endocrino/` | `/marketing-para-endocrinologistas/` | 301 |
| `/niches/ginecologia/` | `/marketing-para-ginecologistas/` | 301 |
| `/niches/nutri/` | `/marketing-para-nutrologos/` | 301 |
| `/niches/urologia/` | `/marketing-para-urologistas/` | 301 |
| `/niches/odonto/` | — | continua no ar (sem equivalente aprovado) |

Equivalência 1:1 por especialidade; nenhum redirect em massa para a Home. Subdomínios
`cardiologia.agenciaadrmarketing.com` etc.: **não verificáveis daqui** (rede do ambiente bloqueia o
domínio); se existirem, o 301 precisa ser configurado no painel do Hostinger apontando para a rota
nova do domínio principal.

## 3. SEO · GEO · AEO nas páginas novas

- Title/description únicos e dentro dos limites; H1 único; canonical com barra final; `lang="pt-BR"`;
  Open Graph herdado do layout.
- JSON-LD por página: `WebPage`, `BreadcrumbList`, `FAQPage` (só com a FAQ visível), `Service`
  (`Marketing médico para <Especialidade>`, provider = `Organization` da ADR, `areaServed: BR`,
  `audience`), além de `WebSite` e `Organization/ProfessionalService` do layout. Sem ratings/reviews.
- Resposta direta no topo, uma intenção por página, perguntas da especialidade respondidas em texto
  corrido, identificação da empresa responsável no fim da FAQ e no rodapé, fontes (portal do CFM).
- Links internos: breadcrumbs, pilar `/marketing-medico/`, `/servicos/`, `/metodologia/`,
  especialidades relacionadas, rodapé. Nenhuma página órfã; nenhum link para página pendente.
- `robots.txt` inalterado (busca × treinamento documentados em `docs/diretrizes-seo-geo-aeo.md`).

## 4. Testes realizados

**Build**: 14 páginas, sem erros. Sitemap: 13 URLs (12 publicadas + odonto legado).

**Auditoria estática** (`npm run audit`, 0 erros):

- title/description únicos; 1 H1 por página; canonical = URL da página; `noindex` sem canonical em
  `/termos-de-uso/` e `/404.html`; JSON-LD parseável em todas as páginas; nenhuma `<img>` sem `alt`.
- Strings proibidas ausentes em todas as páginas: "90%", "até o 3º mês", "resultado garantido",
  "garantimos", verdes antigos, azul/roxo/dourado, base64, `llms.txt`. Página legada verificada à parte
  (afirmações removidas não voltaram; canonical no domínio principal).
- Links internos: 0 quebrados, 0 âncoras inexistentes, 0 links para páginas pendentes.
- Sitemap só com URLs aprovadas; nenhuma URL `noindex` no sitemap.
- **Similaridade entre as 5 especialidades**: Jaccard em sequências de 4 palavras, máximo **0,25**
  (cardiologistas × ginecologistas). O que coincide é header, rodapé, legenda da FAQ e CTA; o conteúdo
  das seções é próprio. Limite de alerta do script: 0,45.

Avisos restantes (não bloqueiam; serão tratados na auditoria da Fase 3): titles de `/servicos/` (73)
e `/marketing-medico/` (77) acima de 70 caracteres; descriptions de `/contato/`, `/marketing-medico/`,
`/metodologia/`, `/servicos/` e `/sobre/` acima de 175.

**Lighthouse 13.5** (Chromium headless, servidor local servindo `dist/`; Best Practices 96 = só
`errors-in-console` pelo bloqueio de googletagmanager/clarity na rede deste ambiente):

| Página | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/marketing-para-endocrinologistas/` mobile | **99** | 100 | 96 | 100 | 2,0 s | 0 | 0 ms |
| `/marketing-para-endocrinologistas/` desktop | **100** | 100 | 96 | 100 | 0,4 s | 0 | 0 ms |
| `/marketing-para-urologistas/` mobile | **99** | 100 | 96 | 100 | 2,0 s | 0 | 0 ms |
| `/marketing-para-urologistas/` desktop | **100** | 100 | 96 | 100 | 0,4 s | 0 | 0 ms |

As outras três usam o mesmo template e os mesmos assets; o único conteúdo variável é texto.

**Responsividade**: captura de página inteira do Lighthouse (412 px) revisada — hero, seções 01–05,
formulário, relacionadas e rodapé sem sobreposição ou corte.

**Não testável daqui**: regras do `.htaccess` no Apache do Hostinger (301 e barra final), envio real ao
Apps Script, disparo real de GTM/Ads/Clarity, existência dos subdomínios.

## 5. Red flags (estado após esta leva)

| # | Red flag | Estado |
|---|---|---|
| 01 | Cases/depoimentos sem comprovação | Nenhum nas páginas novas; frase residual removida da página legada de odonto |
| 02 | "90% até o 3º mês" | Ausente em todas as páginas (checado automaticamente) |
| 03 | Canonicals para subdomínios | 5 páginas legadas removidas + 301; odonto com canonical no domínio principal |
| 04 | Arquitetura base64/JS | Só `/niches/odonto/` continua no formato antigo (1 MB), por decisão pendente do cliente |
| 05 | Serviços não confirmados | As 4 frentes das especialidades são os 4 serviços confirmados; nenhuma oferta nova |

## 6. O que ainda falta da Fase 2 (não iniciado — depende de autorização)

- Páginas comerciais: `/trafego-pago-para-medicos/`, `/google-ads-para-medicos/`, `/meta-ads-para-medicos/`,
  `/posicionamento-medico/`, `/captacao-de-pacientes/`, `/marketing-para-clinicas/`,
  `/marketing-para-medicos/` (as duas últimas só com diferenciação clara do pilar).
- Segunda leva de especialidades: dermatologistas, cirurgiões plásticos, ortopedistas, neurologistas,
  psiquiatras (mesmo template; basta um JSON por especialidade com conteúdo próprio).
- Destino de `/niches/odonto/` e CSP no `.htaccess` (bloqueada enquanto a página legada usar `eval`).

## 7. Como publicar

1. `npm ci && npm run build && npm run audit` — o pacote é o conteúdo de `dist/`.
2. Backup do `public_html` atual no Hostinger (plano de reversão).
3. Extrair o zip na raiz de `public_html`, sobrescrevendo. **Apagar no servidor** as pastas
   `public_html/niches/cardiologia`, `endocrino`, `ginecologia`, `nutri` e `urologia` (o 301 do
   `.htaccess` raiz já responde por essas URLs; apagar evita duplicatas acessíveis por `index.html`).
4. Testar: `/marketing-para-endocrinologistas/`, `/niches/cardiologia/` (deve cair em
   `/marketing-para-cardiologistas/` com 301), `/niches/odonto/` (continua), `/sitemap-0.xml` (13 URLs),
   um envio de formulário em uma página de especialidade (conferir `origem_form = especialidade_<slug>`
   na planilha) e um clique de WhatsApp (evento `whatsapp_click` no GTM).
5. Depois do deploy: no Google Search Console, inspecionar as 5 URLs novas e pedir indexação; as
   antigas `/niches/<x>/` passam a aparecer como "página com redirecionamento".
