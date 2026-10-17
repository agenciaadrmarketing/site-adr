# Relatório técnico — Fase 3 (blog, SEO avançado, GEO/AEO, conversão e auditoria)

Projeto: ADR Marketing · agenciaadrmarketing.com
Branch: `claude/awesome-tesla-9ak8rg` · Build: Astro 7, saída estática em `dist/`
Data: 17/10/2026

Nada foi publicado em produção. A entrega é o código na branch e o pacote de `dist/` para subir no
Hostinger **depois** da aprovação do conteúdo (ver P0 em `docs/informacoes-pendentes.md`).

---

## 1. Auditoria inicial das Fases 1 e 2 (com evidências)

Ferramenta: `npm run audit` (`scripts/audit.mjs`, criado nesta etapa e reutilizável), build de produção,
Lighthouse 13.5 local e inspeção do código.

| # | Verificação | Resultado | Evidência |
|---|---|---|---|
| 1 | Páginas construídas | 14 páginas antes da Fase 3 (7 institucionais, 5 especialidades, termos em rascunho, 404) + 1 legada | Saída do build e do audit |
| 2 | Rotas funcionando | Todas as rotas do build respondem 200 no servidor local; 404 dedicada | Crawler do audit: 0 links quebrados |
| 3 | Conteúdo completo | Todas as páginas publicadas com 288+ palavras no `<main>`; especialidades 830–990 | Coluna "palavras" do audit |
| 4 | Serviços confirmados | 4 confirmados (tráfego pago, posicionamento, captação, comercial); 4 pendentes fora das ofertas | `SERVICES` em `src/data/site.ts` |
| 5 | Especialidades | 5 publicadas (endócrino, gineco, uro, nutro, cardio); 5 planejadas | `src/content/especialidades/` |
| 6 | Templates reutilizáveis | `SpecialtyPage` (JSON por especialidade) e agora `ArticlePage` (Markdown por artigo) | `src/components/` |
| 7 | Links internos | 0 quebrados, 0 âncoras inexistentes, 0 links para páginas pendentes | audit |
| 8 | Canonicals | Todas as indexáveis com canonical = própria URL com barra final. **Corrigido:** `/termos-de-uso/` (noindex) emitia canonical | audit |
| 9 | Redirects | 5 × 301 de `/niches/<x>/` para as rotas novas, 1:1, sem redirect para a Home | `public/.htaccess` |
| 10 | Formulários | Mesma integração Apps Script, honeypot, validação de DDD, trava de 4 s, abertura do WhatsApp | `src/scripts/lead-form.ts` |
| 11 | Analytics | GTM, Google Ads e Clarity uma vez por página (GTM aparece 2× = script + `noscript`) | grep no HTML gerado |
| 12 | Conteúdo duplicado | Similaridade máxima entre especialidades 0,26 (Jaccard, 4-gramas) | audit |
| 13 | Claims não comprovados | Nenhum "90%", "garantimos", "resultado garantido", "cases de sucesso". **Corrigido:** frase "estratégias validadas em diversos cases de sucesso" que restava na página legada de odonto | audit + grep no template decodificado |
| 14 | Páginas finas | Nenhuma publicada abaixo de 250 palavras | audit |
| 15 | Performance/acessibilidade | 95–100 em performance; acessibilidade 100 exceto 2 casos corrigidos nesta fase (abaixo) | Lighthouse |

Problemas encontrados e corrigidos na auditoria:

- **Sitemap sem a página legada**: o filtro do `@astrojs/sitemap` roda depois de `customPages` e descartava
  `/niches/odonto/`. Corrigido em `astro.config.mjs`.
- **Titles e descriptions longos** em `/servicos/`, `/marketing-medico/`, `/metodologia/`, `/sobre/`,
  `/contato/` (até 224 caracteres). Reescritos dentro de 70/175.
- **Contraste**: número dos cards (`.card__num`) com 4,48:1 sobre fundo escuro → cinza um tom mais claro
  (6,6:1). Texto do balão de atendimento capturado no meio do fade-in → entrada só com movimento.
- **Botões vazando a margem** em telas de 360–412 px (rótulo "Solicitar diagnóstico pelo WhatsApp" até
  56 px fora da tela). Botões agora quebram linha abaixo de 480 px. Medido com Playwright em 360/390/412 px
  em 6 páginas: nenhum elemento fora da margem, `scrollWidth` = largura da tela.
- **Rótulo "Alanys"** no balão (pessoa não confirmada) → "Atendimento · ADR Marketing".

## 2. O que foi implementado (A)

### Blog

- `/blog/`: hero editorial com navegação por tema, "Por onde começar" (3 destaques), uma seção por
  cluster (Captação, Tráfego pago, Comercial, Autoridade) com texto de contexto e link para a página
  comercial do tema, CTA contextual (WhatsApp verde + "Conhecer os serviços"), links para páginas
  comerciais e especialidades. JSON-LD `CollectionPage` + `Blog` com os `BlogPosting`.
- Template de artigo (`ArticlePage.astro`): breadcrumbs, categoria, H1, linha fina, autor (ADR Marketing,
  link para `/sobre/`), data de publicação real, tempo de leitura, **sumário navegável** (fixo no desktop,
  em caixa no mobile), bloco "Em resumo" (resposta direta para AEO), corpo com tabelas/citações/listas,
  fontes externas, caixa do responsável (razão social e CNPJ), FAQ do tema, CTA WhatsApp com mensagem
  específica do artigo, leitura relacionada e páginas comerciais relacionadas.
- Coleção `artigos` com schema validado: title ≤ 70, description ≤ 175, intenção, palavra-chave, termos
  secundários, resumo, data, status (`publicada`/`revisao`), relacionados, links comerciais, fontes, FAQ.
- Sem paginação nem páginas de categoria: com 2–3 artigos por tema seriam páginas finas. Reavaliar com ~8
  artigos por tema.
- Artigos em `revisao` **não entram no build de produção** (`ADR_PREVIEW=1 npm run build` gera a cópia de
  revisão, com `noindex`, sem canonical, fora do sitemap e das listagens).

### Os 12 artigos

| # | URL | Cluster | Palavra-chave | Palavras (corpo) | Status |
|---|---|---|---|---|---|
| 1 | `/blog/como-atrair-pacientes-particulares/` | Captação | como atrair pacientes particulares | ~1.600 | pronto |
| 2 | `/blog/por-que-clinicas-perdem-agendamentos/` | Captação | clínica não converte contatos em agendamentos | ~1.200 | pronto |
| 3 | `/blog/do-anuncio-ao-agendamento/` | Captação | jornada do paciente do anúncio ao agendamento | ~1.200 | pronto |
| 4 | `/blog/google-ads-ou-meta-ads-para-medicos/` | Tráfego | google ads ou meta ads para médicos | ~1.300 | pronto |
| 5 | `/blog/quanto-investir-em-marketing-medico/` | Tráfego | quanto investir em marketing médico | ~1.350 | pronto |
| 6 | `/blog/como-avaliar-campanhas-de-marketing-medico/` | Tráfego | como avaliar campanhas de marketing médico | ~1.100 | pronto |
| 7 | `/blog/atendimento-whatsapp-para-clinicas/` | Comercial | atendimento whatsapp para clínicas | ~1.300 | pronto |
| 8 | `/blog/follow-up-de-pacientes/` | Comercial | follow-up de pacientes | ~1.200 | pronto |
| 9 | `/blog/indicadores-de-marketing-para-clinicas/` | Comercial | indicadores de marketing para clínicas | ~1.100 | pronto |
| 10 | `/blog/autoridade-digital-para-medicos/` | Autoridade | autoridade digital para médicos | ~1.350 | pronto |
| 11 | `/blog/regras-de-publicidade-medica-cfm/` | Autoridade | regras de publicidade médica CFM | ~1.250 | **revisão especializada** (fora do pacote) |
| 12 | `/blog/seo-local-para-clinicas/` | Autoridade | seo local para clínicas | ~1.400 | pronto |

Contagem só do corpo do artigo (sem resumo, FAQ, CTA e blocos do template). "Pronto" = tecnicamente publicável e incluído no pacote; **depende da aprovação do conteúdo pela ADR antes
do deploy** (P0). Palavras-chave são hipóteses de intenção, sem volumes inventados.

Regras editoriais aplicadas: nenhum número de resultado, estatística, estudo, especialista ou depoimento
inventado; exemplos sempre marcados como hipotéticos; copy de resultado condicional (especialidade,
concorrência, investimento, posicionamento, atendimento); publicidade médica tratada com base na Resolução
CFM nº 2.336/2023 (vigência confirmada: publicada em setembro de 2023, em vigor desde março de 2024);
LGPD citada como orientação prática, não jurídica; SEO tratado como tema educativo (não é serviço
confirmado, e o artigo diz isso). Similaridade máxima entre artigos: 0,11.

Fontes externas citadas (confirmadas por busca; o acesso direto é bloqueado neste ambiente): portal do CFM,
Lei nº 13.709/2018 (Planalto), ANPD, Google Ads — política de Saúde e medicamentos, Meta — Padrões de
Publicidade, Google — Dicas para melhorar a classificação local, Google Search Central — guia de SEO.

### SEO, GEO/AEO, links e conversão

- `/servicos/`: três perguntas novas de contratação respondidas em texto (FAQ visível + `FAQPage`): "Qual
  agência de marketing contratar para uma clínica?", "O que diferencia uma agência especializada em
  marketing médico?", "Quanto investir em tráfego pago para médicos?" — sem preço nem promessa.
- Entidade padronizada: `Organization`/`ProfessionalService` ganhou `founder` (Caio Souza Anderle) e
  `contactPoint` (WhatsApp, e-mail, pt-BR, BR). `Article` com `author`/`publisher` = a própria organização
  (sem pessoa inventada). Sem ratings, reviews, prêmios ou certificações.
- Menu: "Conteúdos" passou a ser item publicado. Home ganhou a seção "Conteúdos" com 3 artigos em destaque.
- Links internos contextuais: cada artigo linka para 2–4 páginas comerciais publicadas e 3 artigos
  relacionados; `/marketing-medico/`, `/metodologia/`, `/servicos/` e as 5 especialidades linkam para os
  artigos do tema. Nenhum link para página não publicada (verificado pelo audit).
- Analytics: novo evento `cta_click` (texto e destino do botão, sem dados digitados) e o campo
  `event_type` em todos os eventos: `interacao` (whatsapp_click, cta_click, lead_modal_open,
  exit_intent_popup, form_start), `envio_formulario` (lead_form_submit) e `erro` (form_submit_error).
- Performance: recorte retrato do hero para mobile (27 KB em vez de 59 KB) com `<picture>` e preload por
  media query.
- `npm run audit` com verificação de hierarquia de títulos, sitemap × arquivos do build, órfãs e
  similaridade do blog.

## 3. SEO técnico (auditoria completa)

| Item | Estado |
|---|---|
| Indexabilidade | 24 páginas indexáveis (`index, follow, max-image-preview:large`); `/termos-de-uso/` e `/404.html` com `noindex` e sem canonical |
| Status HTTP | 200 em todas as rotas locais; 404 dedicada; regras 301 no `.htaccess` (não testáveis sem Apache) |
| robots.txt | Robôs de busca (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, DuckDuckBot) e de treinamento (GPTBot, Google-Extended, ClaudeBot, anthropic-ai, CCBot, Applebot-Extended) separados, todos permitidos; aponta para o sitemap. Sem `llms.txt` |
| Sitemap | `/sitemap.xml` com 25 URLs = 24 publicadas + `/niches/odonto/` (legado), `lastmod` real nos artigos; `/sitemap-index.xml` aponta para ele. Sem rascunhos, sem noindex |
| Canonicals | 100% = própria URL, `https://agenciaadrmarketing.com`, barra final |
| Metadados | Titles e descriptions únicos, dentro de 70/175 caracteres |
| Headings | 1 H1 por página; sem saltos de nível no `<main>` |
| Breadcrumbs | Visíveis + `BreadcrumbList` em todas as internas |
| Dados estruturados | JSON-LD parseável em 100% das páginas: WebSite, Organization/ProfessionalService, WebPage/AboutPage/ContactPage/CollectionPage, BreadcrumbList, FAQPage (só com FAQ visível), Service, Person, Article, Blog |
| Imagens | Todas com `alt` (decorativas com `alt=""`), dimensões declaradas, WebP, lazy abaixo da dobra |
| Duplicidade | Especialidades 0,26 e blog 0,11 de similaridade máxima |
| Órfãs | Nenhuma página publicada sem link interno de entrada |
| Paginação | Não necessária (11 artigos em uma página com âncoras por tema) |
| Conteúdo sem JS | Todo o conteúdo está no HTML pré-renderizado; o único JS (11 KB) cuida de interações |
| Arquitetura | Nenhuma página nova em base64; só `/niches/odonto/` segue no formato antigo |
| Domínio | `trailingSlash: always`, redirect de barra final no Apache, HSTS. Subdomínios antigos: **não verificáveis daqui** |

## 4. GEO/AEO

- Resposta direta no topo de cada página (hero das especialidades, "Em resumo" dos artigos, primeiro
  parágrafo dos institucionais).
- Perguntas conversacionais respondidas onde fazem sentido, sem páginas artificiais: contratação e
  diferenciação em `/servicos/`; definição, canais, custo e publicidade médica em `/marketing-medico/`;
  captação, conversão, investimento e indicadores nos artigos (FAQ de cada artigo).
- Entidade consistente em todas as páginas: nome, descrição, especialização, serviços confirmados,
  metodologia, contato, CNPJ e liderança — no texto e no JSON-LD.
- Fontes citadas nos artigos que fazem afirmações técnicas.
- Nada promete presença ou citação em IA.

Rastreadores: robots.txt permite busca e treinamento (decisão de negócio pendente, P1). Bloqueio por
hospedagem/CDN/firewall **não pôde ser testado** (a rede deste ambiente bloqueia o domínio). Teste
recomendado após o deploy:

```
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)" https://agenciaadrmarketing.com/
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" https://agenciaadrmarketing.com/blog/
```

Ambos devem responder 200. Um 403 ou desafio de captcha indica firewall bloqueando robôs.

## 5. Conversão e formulários

| Verificação | Estado |
|---|---|
| CTA WhatsApp verde | Em todas as páginas: header, hero, seções, CTA final do rodapé, balão; mensagem pré-preenchida específica por página/artigo |
| Demais botões | Preto/branco (`Button`), sem verde |
| Formulário | Em `/`, `/contato/`, nas 5 especialidades e no modal (todas as páginas). Campos, honeypot, validação de DDD, trava de 4 s, mensagem de erro acessível, tela de sucesso com link de WhatsApp |
| Feedback de envio | Botão muda para "Enviando…"; sucesso substitui o formulário; erro de DDD com foco no campo |
| Blog | Um CTA contextual por artigo + CTA final do rodapé + balão. Sem pop-ups extras |
| Mobile | Menu drawer, CTAs dentro da margem (corrigido), formulário em coluna única |
| Acessibilidade | Lighthouse 100 em todas as páginas testadas; skip link; foco visível |

## 6. Integrações e mensuração (relatório)

| Integração | Identificador | Estado no site | Validação |
|---|---|---|---|
| Google Tag Manager | GTM-PDFHMCXG | 1× por página; carregado na primeira interação ou 4 s após o load (seção 16) + `noscript` | **Sem acesso** ao container. O PageSpeed do site no ar mostra que ele carrega Google Ads e GA4 |
| Google Ads | AW-18381807679 | gtag direto, carregado junto com o GTM; `generate_lead` enviado no envio do formulário. **Duplicado**: o GTM também carrega o Google Ads | **Sem acesso**: conferir no GTM se alguma conversão depende do gtag direto antes de removê-lo |
| Microsoft Clarity | yjdxdq034e | Carregado junto com o GTM | Confirmado no PageSpeed do site no ar (1×) |
| Google Analytics 4 | G-1YXFZQPS7P | Carregado pelo GTM (não há ID no código do site) | Localizado no PageSpeed do site no ar; **sem acesso** à propriedade |
| Google Search Console | — | Nenhuma meta de verificação | Pode estar verificado por DNS: **não confirmado** |
| Bing Webmaster Tools | — | Nenhuma meta de verificação | **Não confirmado** |
| Pixel da Meta | — | Não instalado (código preparado) | Decisão pendente |
| Formulário → Apps Script | endpoint `script.google.com/macros/s/AKfy…/exec` | GET + fetch `no-cors`; campos e UTMs preservados | **Sem acesso** à planilha; envio real bloqueado pela rede deste ambiente |

Eventos no `dataLayer` (sem PII):

| Evento | Tipo (`event_type`) | Quando | Parâmetros |
|---|---|---|---|
| `whatsapp_click` | interacao | Clique em qualquer link de WhatsApp | `cta_id`, `page_path`, UTMs |
| `cta_click` | interacao | Clique em botão interno preto/branco | `cta_text`, `cta_href` |
| `lead_modal_open` | interacao | Abertura do modal de análise | `cta_id` |
| `exit_intent_popup` | interacao | Popup de saída exibido | — |
| `form_start` | interacao | Primeiro foco em um formulário | `form_location` |
| `lead_form_submit` | envio_formulario | Envio válido do formulário | `form_location`, `especialidade`, `pacientes_mes` |
| `form_submit_error` | erro | Falha técnica no envio | `form_location` |
| `generate_lead` (gtag) | — | Junto com `lead_form_submit` | `form_location` |

Lead qualificado e agendamento **não** são disparados pelo navegador: são resultados comerciais que existem
na planilha/CRM. Caminho recomendado: registrar o `gclid` (já enviado à planilha) e importar no Google Ads
como conversões offline ("Lead qualificado", "Agendamento", "Fechamento"); no GA4, via Measurement
Protocol ou importação de dados.

Relatórios recomendados (mensal):

1. **Search Console**: impressões, cliques, CTR e posição por página e por consulta; páginas com mais
   aquisição; cobertura (as 5 URLs `/niches/` devem aparecer como "página com redirecionamento").
2. **GA4**: sessões orgânicas por página de entrada; `lead_form_submit` e `whatsapp_click` por página e
   canal; taxa de conversão = eventos de envio ÷ sessões; referências de IA com o filtro de origem
   `chatgpt.com|perplexity.ai|copilot.microsoft.com|gemini.google.com|claude.ai`.
3. **Planilha de leads**: contatos por `origem_form` e `utm_source`; leads qualificados; agendamentos.
4. **Bing Webmaster Tools**: indexação e, quando disponível, o relatório de desempenho em IA.
5. **Menções em IA**: registrar trimestralmente, com data e captura, se a ADR aparece nas respostas para
   as perguntas-alvo (lista em `docs/seo-mapa-de-intencoes.md`). Isso é observação, não garantia.

## 7. Performance (testada)

Lighthouse 13.5, Chromium headless, `dist/` servido localmente. Best Practices 96 = apenas
`errors-in-console` causado pelo bloqueio de googletagmanager.com/clarity.ms na rede deste ambiente.

Servidor local **sem compressão** (pior caso):

| Página (template) | Mobile Perf / A11y / BP / SEO | LCP | Desktop Perf / A11y / BP / SEO | LCP |
|---|---|---|---|---|
| `/` (Home) | 95 / 100 / 96 / 100 | 2,7 s | 100 / 100 / 96 / 100 | 0,6 s |
| `/blog/` (hub) | 99 / 100 / 96 / 100 | 2,1 s | 100 / 100 / 96 / 100 | 0,4 s |
| `/blog/como-atrair-pacientes-particulares/` (artigo) | 98 / 100 / 96 / 100 | 2,0 s | 100 / 100 / 96 / 100 | 0,5 s |
| `/blog/seo-local-para-clinicas/` (artigo com tabela) | 99 / 100 / 96 / 100 | 2,0 s | 100 / 100 / 96 / 100 | 0,5 s |
| `/marketing-para-ginecologistas/` (especialidade) | 99 / 100 / 96 / 100 | 2,0 s | 100 / 100 / 96 / 100 | 0,4 s |
| `/marketing-medico/` (pilar) | 99 / 100 / 96 / 100 | 2,0 s | 100 / 100 / 96 / 100 | 0,4 s |
| `/servicos/` | 99 / 100 / 96 / 100 | 2,0 s | 100 / 100 / 96 / 100 | 0,5 s |
| `/metodologia/` | 99 / 100 / 96 / 100 | 2,1 s | 100 / 100 / 96 / 100 | 0,4 s |
| `/contato/` | 99 / 100 / 96 / 100 | 2,0 s | 100 / 100 / 96 / 100 | 0,5 s |
| `/sobre/` | 98 / 100 / 96 / 100 | 2,3 s | 100 / 100 / 96 / 100 | 0,7 s |

Com **gzip** (como o `.htaccess` configura no Hostinger), mobile:

| Página | Perf | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| `/` | 99 | 1,4 s | 1,8 s | 10 ms | 0 |
| `/blog/como-atrair-pacientes-particulares/` | 100 | 1,4 s | 1,5 s | 0 ms | 0 |
| `/marketing-para-urologistas/` | 100 | 1,1 s | 1,3 s | 0 ms | 0 |

CLS ≤ 0,002 em todas. INP não é medido em laboratório (TBT ≤ 30 ms é o indicador correlato); LCP/INP/CLS
no percentil 75 só existirão no Search Console/CrUX depois do deploy e de tráfego suficiente.

Peso: HTML 22 KB (Home, gzip), CSS 57 KB sem compressão, JS 11 KB, fontes Poppins self-hosted (2 pesos
pré-carregados), tags de terceiros carregadas na primeira interação ou 4 s após o load (seção 16).

## 8. Segurança e LGPD

| Item | Estado |
|---|---|
| Validação de campos | Obrigatórios + tipo e-mail + DDD (10+ dígitos) no cliente |
| Spam | Honeypot `site` + trava de 4 s. **Recomendação:** validar também no Apps Script (honeypot, tamanho dos campos, limite por IP/tempo) — o endpoint é público |
| Erros | Mensagem acessível; falha técnica registrada como `form_submit_error` |
| Credenciais | Nenhuma chave, token ou segredo no frontend. O endpoint do Apps Script e os IDs de tags são públicos por natureza |
| Chamada da API | Os dados do lead vão **na URL (GET)** para o Apps Script (comportamento herdado da LP). Recomendado migrar para POST no script — depende de acesso (P1) |
| Cabeçalhos | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS. **CSP ausente** enquanto `/niches/odonto/` usar `eval` |
| Política de privacidade | Publicada; cita cookies, Google Ads, Clarity, possível GA4/Pixel, WhatsApp e direitos do titular. Revisão jurídica não registrada (P1) |
| Cookies/consentimento | Sem banner de consentimento; decisão jurídica pendente (P1) |
| Dados a terceiros | Eventos sem nome, e-mail ou telefone; UTMs e página apenas |
| Arquivos estáticos | Nenhum dado privado em `public/` ou `dist/` (verificado: só assets, fontes, robots, .htaccess e a página legada) |

## 9. Red flags — verificação final

| # | Red flag | Status | Evidência |
|---|---|---|---|
| 01 | Cases sem comprovação | **Resolvida** | Nenhum case no site; `/cases/` não existe; `CaseStudy` só renderiza com cliente autorizado + período + evidência; frase residual removida do legado |
| 02 | Slogans como depoimentos | **Resolvida** | Nenhum depoimento; mensagens do balão são perguntas da ADR, não falas de pacientes |
| 03 | Números ilustrativos como resultado | **Resolvida** | Demonstrações rotuladas ("simulação ilustrativa", "curva conceitual"); artigos sem estatísticas; exemplos marcados como hipotéticos |
| 04 | "90% dos clientes em 3 meses" | **Resolvida** | Audit automático: nenhuma ocorrência de "90%", "3º mês", "terceiro mês" em nenhuma página, inclusive a legada |
| 05 | Subdomínios / URLs antigas | **Parcial** | 5 páginas de nicho → 301 para as rotas novas; odonto mantida (decisão do cliente); existência dos subdomínios não verificável daqui |
| 06 | Serviços não confirmados | **Resolvida** | Só 4 confirmados como oferta; SEO tratado como educativo (o artigo declara que não é serviço) |
| 07 | Páginas gigantes em base64 | **Resolvida no site novo** | 0 páginas novas em base64 (checado pelo audit); só a legada `/niches/odonto/` (1 MB) aguarda decisão |

## 10. Relatório de páginas e URLs

| URL | Tipo | Status | No sitemap | No menu/rodapé |
|---|---|---|---|---|
| `/` | Home | publicada | sim | sim |
| `/sobre/` | Institucional | publicada | sim | sim |
| `/servicos/` | Comercial (serviços) | publicada | sim | sim ("Soluções") |
| `/metodologia/` | Institucional | publicada | sim | sim |
| `/marketing-medico/` | Pilar educativo | publicada | sim | links internos |
| `/contato/` | Conversão | publicada | sim | sim |
| `/politica-de-privacidade/` | Legal | publicada | sim | rodapé |
| `/marketing-para-endocrinologistas/` | Especialidade | publicada | sim | rodapé + Home |
| `/marketing-para-ginecologistas/` | Especialidade | publicada | sim | rodapé + Home |
| `/marketing-para-urologistas/` | Especialidade | publicada | sim | rodapé + Home |
| `/marketing-para-nutrologos/` | Especialidade | publicada | sim | rodapé + Home |
| `/marketing-para-cardiologistas/` | Especialidade | publicada | sim | rodapé + Home |
| `/blog/` | Hub editorial | publicada | sim | sim ("Conteúdos") |
| 11 artigos `/blog/<slug>/` | Artigo | publicada (aguarda aprovação do conteúdo) | sim | blog, Home, páginas relacionadas |
| `/blog/regras-de-publicidade-medica-cfm/` | Artigo | revisão especializada — **fora do pacote** | não | não |
| `/termos-de-uso/` | Legal | rascunho `noindex` (no pacote, sem links) | não | não |
| `/404.html` | Erro | `noindex` | não | — |
| `/niches/odonto/` | Legado | no ar, aguarda decisão | sim | não |
| `/niches/cardiologia|endocrino|ginecologia|nutri|urologia/` | Antigas | 301 para as especialidades | não | — |
| `/cases/` | — | não existe (sem cases verificáveis) | não | não |
| Especialidades da 2ª leva (dermato, plástica, orto, neuro, psiquiatria) | — | planejadas, não construídas | não | Home mostra como "sem página" |
| Páginas comerciais (tráfego pago, Google Ads, Meta Ads, posicionamento, captação, clínicas, médicos) | — | planejadas, não construídas | não | não |

## 11. O que foi testado (B)

- Build de produção (26 páginas) e de revisão (27, com o rascunho) sem erros; schemas das coleções
  validados no build.
- `npm run audit`: 0 erros (links, âncoras, canonicals, noindex, sitemap, títulos, descriptions, H1,
  hierarquia de títulos, JSON-LD, `alt`, strings proibidas, órfãs, similaridade).
- Lighthouse mobile e desktop em 10 páginas de 6 templates, mais 3 com gzip (tabelas acima).
- Medição de overflow com Playwright em 360/390/412 px em 6 páginas.
- Capturas de página inteira (412 px e 1350 px) revisadas: hub do blog, artigo, especialidade, Home.
- Conteúdo presente no HTML sem JavaScript (verificado por grep nos arquivos gerados).
- Tags: GTM, Ads e Clarity uma vez por página.

**Não testado (bloqueado):** envio real ao Apps Script, disparo real de GTM/Ads/Clarity, regras do
`.htaccess` no Apache do Hostinger, domínio ao vivo, subdomínios, acesso de robôs pela hospedagem/CDN,
PageSpeed Insights (API com cota esgotada e domínio bloqueado neste ambiente).

## 12. O que continua pendente (C)

- Aprovação do conteúdo novo (P0) e revisão especializada do artigo do CFM (P0).
- Validação ponta a ponta de formulário e conversões após o deploy (P0, depende de acesso).
- Páginas comerciais da Fase 2 e 2ª leva de especialidades (dependem de confirmação comercial).
- `/niches/odonto/`, CSP, Termos de Uso, banner de consentimento, migração do Apps Script para POST.
- Autoria real dos artigos, cases verificáveis, logo vetorial, imagem de compartilhamento.

Lista completa e priorizada: `docs/informacoes-pendentes.md`.

## 13. Manutenção e monitoramento

**A cada alteração:** `npm run build && npm run audit` (precisa terminar em "Sem erros"); Lighthouse mobile
na página alterada.

**A cada deploy:** backup do `public_html`; subir o conteúdo de `dist/`; testar uma URL de cada template,
um 301 de `/niches/`, uma URL inexistente (404), um envio de formulário (conferir na planilha) e um clique de
WhatsApp (GTM em modo Preview).

**Mensal:** relatórios da seção 6; revisar consultas novas no Search Console e transformar perguntas
recorrentes em seções de FAQ ou pautas.

**Trimestral:** checar menções em respostas de IA para as perguntas-alvo (registro com data e captura);
revisar artigos que citam políticas de plataformas e normas (Google Ads, Meta, CFM, LGPD).

**Semestral:** revisão completa dos artigos (datas de atualização reais em `dateModified`); reavaliar
paginação/categorias se algum tema passar de ~8 artigos.

## 14. Próxima prioridade recomendada (E)

1. Obter as 4 respostas P0 e publicar o pacote (com backup e o roteiro de testes acima).
2. No mesmo dia do deploy: Search Console (pedir indexação do blog e das especialidades) e validação das
   conversões no GTM/Google Ads.
3. Confirmar serviços e construir as páginas comerciais de maior intenção: `/trafego-pago-para-medicos/`
   e `/google-ads-para-medicos/` (os artigos já estão prontos para linkar para elas).
4. Implantar a importação offline de "lead qualificado" a partir da planilha (o `gclid` já é coletado).

## 15. Como publicar

1. `npm ci && npm run build && npm run audit`.
2. Backup do `public_html` atual no Hostinger.
3. Extrair o zip na raiz de `public_html`, sobrescrevendo. Se a Fase 2 ainda não foi publicada, apagar no
   servidor as pastas `niches/cardiologia`, `niches/endocrino`, `niches/ginecologia`, `niches/nutri` e
   `niches/urologia`.
4. Testes do item 13 ("A cada deploy").
5. Reverter: restaurar o backup (ou `git revert` e novo build).

## 16. Ajuste pós-deploy: PageSpeed do site no ar (17/10/2026)

O PageSpeed Insights do domínio publicado (relatório enviado pelo cliente, mobile) deu **63** em
desempenho e 100 em acessibilidade, práticas recomendadas e SEO: FCP 3,5 s, LCP 6,3 s, TBT 200 ms,
Speed Index 5,7 s, CLS 0.

**Causa:** o GTM no `<head>` baixava ~640 KB de JavaScript logo no início (gtm.js 151 KB; Google Ads
2 × 162 KB, uma pelo GTM e outra pelo gtag direto do site; GA4 `G-1YXFZQPS7P` 163 KB), disputando banda e
processador com o HTML, o CSS e a imagem do topo. O LCP gastava 1,9 s em atraso de renderização. Os testes
locais anteriores não viam isso porque a rede deste ambiente bloqueia os servidores do Google.

**Reprodução:** a Home foi servida localmente com scripts substitutos do mesmo tamanho nos lugares do GTM,
do gtag e do Clarity (mobile, gzip):

| Carregamento das tags | Desempenho | LCP | TBT |
|---|---|---|---|
| Antes: GTM no head, Ads e Clarity 2,5 s após o load | 62 e 87 (duas rodadas) | 4,9 s e 2,7 s | 820 ms e 390 ms |
| Depois: tudo na 1ª interação ou 4 s após o load | 100 e 100 | 1,7 s | 0 ms |

**O que mudou:**

- GTM, Google Ads e Clarity carregam juntos na primeira interação (toque, rolagem, tecla, movimento do mouse)
  ou 4 s após o `load`, o que vier primeiro. `dataLayer` existe desde o início do HTML; eventos anteriores
  ao GTM ficam na fila. Testado: sem interação as tags chegam em ~4,1 s; com rolagem, na hora; um clique no
  WhatsApp antes do GTM dispara o carregamento e o evento `whatsapp_click` entra na fila logo depois do
  `gtm.js`.
- **Custo:** visitas de menos de ~4 s sem nenhuma interação não são registradas no GA4, no Google Ads
  (remarketing) e no Clarity. Acompanhar sessões e conversões nas duas semanas após o deploy.
- O texto já visível ao carregar não pisca mais (o script de animação ocultava e reexibia o hero).
- Logo 240 px (6,9 KB em vez de 14 KB) sem prioridade alta, para não competir com a imagem do topo;
  avatar do atendimento em 160 px.
- ID duplicado no formulário do modal corrigido; na Home, os dois botões "Solicitar diagnóstico pelo
  WhatsApp" agora têm o mesmo destino. O `npm run audit` passou a checar as duas coisas.
- Cabeçalho `Cross-Origin-Opener-Policy: same-origin-allow-popups`.
- Sitemap: `/sitemap.xml` único gerado de `src/data/pages.json`, com `lastmod` real nos artigos;
  `/sitemap-index.xml` continua respondendo e aponta para ele; `robots.txt` declara `/sitemap.xml`.

**Resultado local depois do ajuste** (gzip, Lighthouse 13.5), em desempenho / acessibilidade /
práticas / SEO:

| Página | Mobile | LCP mobile | Desktop |
|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1,7 s | 100 / 100 / 100 / 100 |
| `/blog/` | 100 / 100 / 100 / 100 | 1,2 s | 100 / 100 / 100 / 100 |
| `/blog/google-ads-ou-meta-ads-para-medicos/` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 |
| `/marketing-para-endocrinologistas/` | 100 / 100 / 100 / 100 | 1,2 s | 100 / 100 / 100 / 100 |
| `/servicos/`, `/marketing-medico/`, `/contato/`, `/metodologia/` | 100 / 100 / 100 / 100 | 1,2 s | 100 / 100 / 100 / 100 |
| `/sobre/` | 100 / 100 / 100 / 100 | 1,7 s | 100 / 100 / 100 / 100 |

O PageSpeed do site no ar varia de uma rodada para outra e depende do servidor do Google; estes números
são do laboratório local e não são garantia. Os dados reais (Core Web Vitals no Search Console) dependem
de tráfego depois do deploy.

**Pendente:** remover o gtag direto do Google Ads depois de confirmar no GTM que nenhuma conversão depende
dele (economiza mais 162 KB para o visitante).
