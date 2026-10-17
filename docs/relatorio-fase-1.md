# Relatório técnico — Fase 1 (fundação técnica e institucional)

Projeto: ADR Marketing · agenciaadrmarketing.com
Branch: `claude/awesome-tesla-9ak8rg` · Build: Astro 7 (saída estática em `dist/`)

Este relatório segue a Etapa 7 do Prompt Mestre V2. Nada foi publicado em produção: a
entrega é o código na branch e o pacote `dist/` para subir no Hostinger quando aprovado.

---

## 1. O que foi preservado

- **Identidade visual da LP**: preto `#09090a`/`#0f0f0e`, off-white `#f2f2f3`, cinzas neutros
  extraídos do próprio projeto, Poppins (agora self-hosted), raios, sombras, cards, pílulas do
  rodapé, fitas de marquee, celular com relatório, foto do Caio, logo, imagens dos três pilares,
  fundos do hero/análise/FAQ, animações de revelação, balão de atendimento (Alanys), popup de
  saída, FAQ com altura animada, barra de progresso, trilho do método.
- **Copy factual**: hero, "Tenha o controle nas suas mãos", "A gente não testa com o dinheiro do
  médico", serviços, pilares, comparativo, método em 4 passos, etapas da parceria, Quem somos,
  FAQ (6 perguntas), rodapé — com os ajustes de responsabilidade descritos na seção 3.
- **Formulários e integrações**: os dois formulários (seção Análise gratuita e modal) continuam
  enviando para o mesmo Google Apps Script (planilha + e-mail), com os mesmos campos
  (`nome, email, whatsapp, especialidade, pacientes_mes, origem_form, utm_*, gclid, fbclid,
  pagina, t`), mesma trava anti-duplo-clique (4 s), mesma abertura do WhatsApp após o envio e
  mesma captura first-touch de UTMs em `sessionStorage`. Ganharam honeypot, validação de DDD e
  mensagem de erro acessível.
- **Tags existentes**: GTM `GTM-PDFHMCXG`, Google Ads `AW-18381807679`, Microsoft Clarity
  `yjdxdq034e` — uma única vez por página, sem duplicidade. Nenhuma tag nova foi adicionada.
- **Número de WhatsApp oficial** `+55 48 98880-9542`, e-mail, CNPJ e razão social reais.

## 2. O que foi refatorado

| Antes | Depois |
|---|---|
| 8 arquivos HTML de ~1 MB, conteúdo em base64 renderizado só após JS ("Unpacking…") | HTML pré-renderizado no build (Home 119 KB), conteúdo legível sem JavaScript |
| Estilos inline repetidos em cada página | `src/styles/tokens.css` + `global.css` + estilos escopados por componente |
| Nenhum componente reutilizável | 17 componentes em `src/components/` (Header, Footer, WhatsAppButton, Button, PageHero, ServiceCard, SpecialtyCard, MethodSteps, Faq, Breadcrumbs, LeadForm, LeadModal, FloatingAssistant, CtaFinal, RelatedLinks, SectionLabel, CaseStudy) |
| Poppins via Google Fonts (conexão extra, render-blocking) | Poppins self-hosted (`@fontsource/poppins`), `preload` dos pesos 400/600, `font-display: swap` |
| Verde `#1a9646` em números, badges, gráficos, botões de formulário | Verde `#25D366` **somente** em botões/ícones de WhatsApp (componente único `WhatsAppButton`); demais elementos em preto/branco/cinza |
| Botões de formulário verdes | Botões de formulário e navegação em preto/branco (`Button`) |
| Scroll-jacking "cinema" (seção de 300 vh presa ao scroll) | Removido: a composição do cartão + celular foi mantida como seção estática com revelação — menos JS no thread principal (TBT 760 ms → 30 ms) |
| Tags de terceiros no `<head>` concorrendo com o LCP | GTM no `<head>` (async); gtag Ads e Clarity carregados 2,5 s após `load` |
| Legados no raiz do repositório | Exports antigos movidos para `legacy/` (histórico preservado via `git mv`); páginas de nicho continuam servidas em `public/niches/` até a Fase 2 |

Estrutura do projeto:

```
astro.config.mjs          site, trailingSlash, sitemap (só páginas aprovadas + legado)
public/                   .htaccess, robots.txt, assets/, fonts/, niches/ (legado no ar)
src/data/site.ts          contato, navegação, matriz de serviços (confirmado/pendente), especialidades, FAQ
src/data/pages.json       registro de rotas com status (publicada/pendente/legado) → sitemap
src/data/seo.ts           WebPage, BreadcrumbList, FAQPage, Service, Person
src/layouts/BaseLayout    head/SEO/JSON-LD, tags, header, footer, modal, assistente
src/components/           componentes compartilhados
src/scripts/              ui.ts (interações), lead-form.ts (formulário), track.ts (eventos/UTM)
src/pages/                /, sobre, contato, servicos, marketing-medico, metodologia, politica-de-privacidade, termos-de-uso (noindex), 404
docs/                     este relatório + mapa de intenções SEO
legacy/                   exports antigos (referência; não é publicado)
```

## 3. Red flags resolvidas

| # | Red flag | Ação |
|---|---|---|
| 01 | Cases/depoimentos não comprovados (Dra. Karine, Dr. Ricardo, Dr. Diogo; slogans como depoimento) | Carrossel removido da Home **e** das 6 páginas de nicho legadas (seção excluída, nomes neutralizados no código). `/cases/` não existe, não está no menu nem no sitemap. Componente `CaseStudy` criado com guarda: só renderiza com cliente autorizado, período e evidência por indicador. Na Home, o espaço foi ocupado por metodologia, diferenciais, especialidades e o painel de indicadores acompanhados |
| 02 | "90% dos clientes têm resultado até o 3º mês" e badge "90% no 3º mês" | Removidos de todas as páginas (inclusive das 6 de nicho legadas e do gráfico). Copy responsável adotada: "A maturação tende a se estabilizar a partir do terceiro mês" + parágrafo sobre fatores (especialidade, concorrência, investimento, posicionamento, atendimento). Cards de métricas fictícias (+21,7 %, 86 agendamentos…) e percentuais da seção Presença digital removidos; o celular do relatório e a curva de maturação ficaram como **demonstrações identificadas** ("simulação ilustrativa", "curva conceitual") |
| 03 | Canonicals das páginas de nicho apontando para subdomínios (`cardiologia.agenciaadrmarketing.com`) | Canonical, `og:url` e JSON-LD das 6 páginas corrigidos para `https://agenciaadrmarketing.com/niches/<x>/`; `robots.txt` e `sitemap.xml` por pasta removidos; rotas legadas listadas no sitemap principal. Redirects 301 para `/marketing-para-<x>/` deixados **comentados** no `.htaccess` (ativar na Fase 2, quando as páginas existirem) |
| 04 | Arquitetura não escalável (base64 + JS) | Site reconstruído em Astro com HTML estático; ver seção 2 e métricas na seção 6 |
| 05 | Serviços não confirmados (sites, SEO, redes sociais, atendimento como serviço) | Matriz em `src/data/site.ts` com status `confirmado/pendente/educativo`. Só os 4 confirmados aparecem em Home, `/servicos/`, rodapé e JSON-LD `Service`. SEO é tratado como tema educativo em `/marketing-medico/` |

Classificação das 15 seções da LP original:

| Seção | Decisão |
|---|---|
| Hero | Preservar; copy refinada (agência especializada em marketing médico; CTA WhatsApp verde + "Pedir análise gratuita") |
| Fitas cruzadas | Preservar (contraste da fita de fundo ajustado) |
| Controle na mão | Melhorar: cores neutras, legenda de simulação, lista de indicadores acompanhados; coreografia de scroll removida |
| Maturação | Melhorar: sem "90 %", curva marcada como conceitual, copy responsável |
| Base de dados | Reorganizar: cards de números fictícios removidos; mensagem "não testa com o dinheiro do médico" incorporada à seção de Controle (lista de indicadores) |
| Presença digital | Melhorar: percentuais removidos, "sinal acompanhado" |
| Serviços | Preservar (4 confirmados + 2 princípios) |
| Cases | **Remover** (red flag 01) |
| Análise gratuita | Preservar (mesmo formulário e integração) |
| Pilares | Preservar |
| Comparativo | Melhorar: cores neutras, sem "cases de sucesso" |
| Método | Preservar (componente `MethodSteps`) |
| Quem somos | Preservar; link para `/sobre/` |
| Parceria | Preservar |
| Contato + FAQ | Preservar; resposta de ROI sem promessa |
| Rodapé | Melhorar: CTA WhatsApp verde + formulário, navegação institucional, dados legais, políticas |
| Novo | Seção **Dores** (copy já existente nos recados do balão) e seção **Especialidades** |

## 4. URLs

Publicadas (no sitemap): `/`, `/sobre/`, `/contato/`, `/servicos/`, `/marketing-medico/`,
`/metodologia/`, `/politica-de-privacidade/`.

Construídas mas **fora** de sitemap e navegação: `/termos-de-uso/` (rascunho `noindex`,
aguarda revisão jurídica), `/404.html`.

Não construídas por decisão: `/cases/`, `/blog/` (Fase 3), páginas comerciais e de
especialidade (Fase 2).

Legado no ar (mesmas URLs, canonical corrigido): `/niches/cardiologia/`, `/niches/endocrino/`,
`/niches/ginecologia/`, `/niches/nutri/`, `/niches/urologia/`, `/niches/odonto/`. As cinco primeiras
são linkadas pelos cards de especialidade da Home; `odonto` fica acessível só por URL direta.

Mapa de redirects e regras de canibalização: `docs/seo-mapa-de-intencoes.md`.

## 5. SEO · GEO · AEO aplicados

- Title e meta description únicos por página; H1 único; `lang="pt-BR"`; canonical com barra final;
  `robots` `index,follow` (ou `noindex` em termos/404); Open Graph/Twitter.
- JSON-LD válido (parse verificado) em todas as páginas: `WebSite`, `Organization/ProfessionalService`
  (nome, razão social, CNPJ, e-mail, telefone), `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`,
  `BreadcrumbList`, `FAQPage` (só onde a FAQ é visível), `Service` (4 confirmados), `Person` (Caio
  Souza Anderle em `/sobre/`). Sem ratings, reviews ou resultados.
- Resposta direta à intenção nos primeiros parágrafos de cada página; definições objetivas dos
  serviços ("o que inclui / o que não é / para quem"); comparação Google Ads × Meta Ads; seção sobre
  a Resolução CFM nº 2.336/2023 com link para o portal do CFM; identificação da empresa responsável
  no rodapé, em `/sobre/` e no fim do guia.
- `robots.txt` distingue robôs de **busca** (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot,
  DuckDuckBot) de robôs de **treinamento** (GPTBot, Google-Extended, ClaudeBot, CCBot…), todos
  permitidos por padrão com instrução de como bloquear só os de treinamento. Sem `llms.txt`.
- Links internos contextuais em todas as páginas (`RelatedLinks`, breadcrumbs, rodapé); nenhuma
  página órfã; 0 links quebrados.
- Mapa de palavras-chave/intenções e rotina de monitoramento: `docs/seo-mapa-de-intencoes.md`.

## 6. Testes realizados

Ambiente: Lighthouse 13.5 (mesmo motor do PageSpeed Insights), Chromium headless, servidor local
servindo `dist/`. **Não foi possível testar o domínio ao vivo** nem a entrega real das tags
(googletagmanager.com e clarity.ms são bloqueados pela rede deste ambiente) — por isso a
auditoria `errors-in-console` aparece reprovada aqui e **não** deve aparecer em produção.

| Página | Antes (LP bundler) | Depois |
|---|---|---|
| Home — mobile (Perf / A11y / BP / SEO) | **44** / 100 / 96 / 100 · FCP 5,9 s · LCP 6,7 s · TBT 760 ms | **95** / 100 / 96* / 100 · FCP 2,0 s · LCP 2,7 s · TBT 30 ms · CLS 0 |
| Home — desktop | 94 / 100 / 96 / 100 | **100** / 100 / 96* / 100 |
| Serviços — mobile | — (não existia) | 99 / 100 / 96* / 100 |
| Sobre — mobile | — | 99 / 100 / 96* / 100 |
| Contato — mobile | — | 99 / 100 / 96* / 100 |
| Metodologia — desktop | — | 100 / 100 / 96* / 100 |
| Política de privacidade — mobile | 76 / 84→100 / 96 / 100 | 99 / 100 / 96* / 100 |

\* Best Practices 96 = apenas `errors-in-console` causado pelo bloqueio de rede do sandbox.
Categoria "agentic-browsing" (árvore de acessibilidade para agentes de IA): 100 em todas as páginas.

Outros testes:

- Build de produção sem erros (9 páginas).
- Checagem automática em todas as páginas: strings proibidas ausentes ("90%", nomes dos cases,
  "cases de sucesso", verdes antigos, Google Fonts, base64); títulos e descriptions únicos; 1 H1 por
  página; canonical correto; GTM uma vez; JSON-LD parseável.
- Crawler interno: 0 links/âncoras quebrados nas páginas publicadas.
- Sitemap: 7 URLs aprovadas + 6 legadas; `/termos-de-uso/` e `/404` fora.
- Páginas de nicho legadas: renderizam, sem banner de erro, sem "90 %", sem os nomes dos cases,
  canonical `https://agenciaadrmarketing.com/niches/<x>/`.
- Console do navegador (scripts próprios): 0 erros. UTMs anexadas aos 10 links de WhatsApp da Home;
  modal oculto por padrão; revelação progressiva ativa.
- Responsividade verificada por capturas de tela desktop (1440 px) e emulação mobile (412 px).

**Não testado / não verificável daqui**: envio real ao Apps Script (rede bloqueada — a lógica e o
endpoint são os mesmos da LP), disparo real de GTM/Ads/Clarity, comportamento no domínio e no
Apache do Hostinger (regras do `.htaccess`), existência dos subdomínios de nicho.

## 7. Problemas remanescentes

1. As 6 páginas de nicho continuam no formato antigo (~1 MB, base64) até a Fase 2 — lentas e com
   texto idêntico entre especialidades. Estão limpas das afirmações sem evidência.
2. O `.htaccess` não tem CSP porque essas páginas legadas usam `eval` no runtime; avaliar CSP na Fase 2.
3. `/termos-de-uso/` é rascunho e precisa de revisão jurídica antes de entrar no sitemap/menu.
4. O balão "Alanys" e a foto da equipe seguem como na LP; se Alanys não for pessoa real da equipe,
   o nome deve ser trocado por "Atendimento ADR".
5. Lighthouse mede em laboratório; os dados reais (CrUX/Search Console) só existirão após o deploy.

## 8. Dependências do cliente

- Confirmar se os subdomínios `cardiologia|endocrino|ginecologia|nutri|urologia|odonto.agenciaadrmarketing.com`
  existem. Se sim: 301 no vhost de cada um para a rota do domínio principal.
- Decidir o destino de `/niches/odonto/` (odontologia está fora do posicionamento atual).
- Revisão jurídica dos Termos de Uso.
- Confirmar comercialmente os serviços pendentes (SEO, sites, redes sociais, atendimento) antes da Fase 2.
- Material verificável de cases (autorização do cliente, período, evidências) para ativar `/cases/`.
- Acesso ao Google Search Console, Bing Webmaster Tools (tokens de verificação) e GA4 para a rotina de
  monitoramento; confirmar se GA4 já está dentro do GTM.
- Decisão sobre robôs de treinamento de IA no `robots.txt` (hoje permitidos).

## 9. Como publicar e reverter

1. Rodar `npm ci && npm run build`; o pacote é o conteúdo da pasta `dist/` (zip entregue à parte,
   não versionado no repositório).
2. No Hostinger, fazer backup do `public_html` atual (download do zip) — é o plano de reversão.
3. Enviar e extrair o zip de `dist/` na raiz de `public_html`, sobrescrevendo. **Apagar** do servidor
   os arquivos que não existem mais no pacote (ex.: `site-adr/`, `Landing ADR Marketing*.dc.html`,
   `support.js`, `_ds/`, `uploads/`, `integracao-planilha.md`, `assets/fonts/`, as imagens de
   `assets/` não usadas) para não deixar duplicatas acessíveis.
4. Testar: `/`, `/servicos/`, `/politica-de-privacidade/`, `/niches/cardiologia/`, uma URL inexistente
   (deve cair no `/404.html`), um envio de formulário e um clique de WhatsApp (conferir no GTM/Ads).
5. Reverter: restaurar o backup do passo 2 (ou `git revert` na branch e novo build).

## 10. Próxima etapa (Fase 2)

Páginas comerciais com intenções distintas (`/trafego-pago-para-medicos/`, `/google-ads-para-medicos/`,
`/meta-ads-para-medicos/`, `/posicionamento-medico/`, `/captacao-de-pacientes/`, `/marketing-para-clinicas/`,
`/marketing-para-medicos/` — só com diferenciação clara) e as 5 especialidades prioritárias com conteúdo
original, substituindo as páginas de nicho legadas com 301. Templates `PageHero` (variantes service/specialty),
`ServiceCard`, `SpecialtyCard`, `Faq`, `RelatedLinks` e `CaseStudy` já estão prontos para isso.
