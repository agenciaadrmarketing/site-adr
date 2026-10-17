# Diretrizes SEO · GEO · AEO — complemento obrigatório ao Prompt Mestre V2

Objetivo: tornar a ADR Marketing uma fonte confiável, útil e comercialmente relevante tanto para
quem pesquisa serviços de marketing médico no Google/Bing quanto para quem pede recomendações a
mecanismos de IA. Três frentes simultâneas: **SEO** (visibilidade orgânica com intenção de
contratação), **GEO/AEO** (elegibilidade para descoberta, recuperação e citação em respostas de IA)
e **CRO** (conversão em leads por formulário ou WhatsApp).

Limites: não prometer primeira posição, citação garantida em IA ou quantidade de leads. Nenhuma
estratégia pode depender de manipular respostas de IA, exagerar a autoridade da ADR ou criar
evidências falsas.

## Como a diretriz foi aplicada na Fase 1 (feito)

| Requisito | Onde está |
|---|---|
| Arquitetura HTML estática e indexável | Astro, HTML pré-renderizado, conteúdo legível sem JS |
| Canônicas e redirects | Canonical por página; nichos legados corrigidos para o domínio principal; mapa de 301 documentado e comentado no `.htaccess` |
| Robôs de busca × robôs de treinamento | `public/robots.txt` com blocos separados (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, DuckDuckBot × GPTBot, Google-Extended, ClaudeBot, CCBot…) e instrução de como bloquear só treinamento |
| Identidade institucional consistente | `CONTACT` em `src/data/site.ts` alimenta rodapé, `/sobre/`, política, JSON-LD `Organization` e `Person` |
| Dados estruturados verdadeiros | `src/data/seo.ts`: `WebSite`, `Organization/ProfessionalService`, `WebPage` (+ `AboutPage`, `ContactPage`, `CollectionPage`), `BreadcrumbList`, `FAQPage` só onde a FAQ é visível, `Service` (4 confirmados), `Person` (Caio). Sem ratings/reviews |
| Home otimizada para a intenção comercial principal | Title/description/H1 em "assessoria/agência de marketing médico para clínicas e médicos"; resposta direta no hero |
| Conteúdo preparado para busca com IA | Definição de marketing médico em `/marketing-medico/`, comparação Google Ads × Meta Ads, seção sobre a Resolução CFM nº 2.336/2023 com fonte, FAQ com as perguntas conversacionais do briefing, "o que inclui / o que não é / para quem" em `/servicos/`, identificação da empresa responsável no fim do guia |
| Mapa de palavras-chave e intenções | `docs/seo-mapa-de-intencoes.md` (hipóteses, sem volumes; regras de canibalização) |
| Rotina de monitoramento | Seção final de `docs/seo-mapa-de-intencoes.md` (GSC, Bing Webmaster Tools + AI Performance, GA4, leads orgânicos) |

Pendências que dependem do cliente: verificação do domínio no Google Search Console e no Bing
Webmaster Tools (tokens), confirmar se o Hostinger/Cloudflare não bloqueia os robôs listados
(firewall/bot protection), decisão final sobre robôs de treinamento.

## Checklist por página — Fases 2 e 3

Antes de criar a página:

- [ ] Intenção de busca única e distinta das páginas existentes (conferir o mapa; se duas páginas
      disputarem a mesma intenção, consolidar).
- [ ] Termo-alvo principal e variações registrados no mapa como hipótese; validar com dados reais
      (GSC/Bing) quando houver acesso.
- [ ] Para serviços: status `confirmado` em `src/data/site.ts`. Pendentes só como conteúdo educativo,
      sem CTA de contratação daquele serviço específico.

Conteúdo:

- [ ] Resposta direta à intenção nos dois primeiros parágrafos (o que é, para quem, como a ADR atua).
- [ ] Hierarquia semântica: 1 H1, H2 por tema, H3 por subtema; sem pular níveis.
- [ ] Definições objetivas do serviço e descrição concreta do processo (etapas, entregáveis, o que
      não está incluído).
- [ ] Informações comerciais verificáveis; nada de "líder", "melhor", "garantido", percentuais ou prazos
      sem fonte.
- [ ] Comparações quando ajudam a decisão (canais, abordagens) — em tabela acessível.
- [ ] Exemplos contextualizados sem identificar clientes não autorizados; cenários hipotéticos devem
      estar sinalizados como tal.
- [ ] Fontes para afirmações técnicas (CFM, plataformas de anúncio, legislação), com link.
- [ ] FAQ só com dúvidas reais do público; proibido bloco artificial de perguntas para "pegar" IA.
- [ ] Especialidades: conteúdo próprio (jornada do paciente, ticket, procedimentos eletivos, canal
      adequado, perguntas específicas). Texto espelhado com troca do nome da especialidade é reprovado.
- [ ] Links internos de entrada e saída contextuais (pilar ↔ serviço ↔ especialidade ↔ artigo);
      nenhuma página órfã; sem listas gigantes no rodapé.
- [ ] Identificação da empresa responsável pelo conteúdo (ADR Marketing, CNPJ) e autor real quando
      houver (`Person`).

Técnico (herdado do `BaseLayout`, conferir):

- [ ] Title (≤ 60 caracteres, único) e meta description (≤ 160, única).
- [ ] Canonical com barra final; `index,follow`; Open Graph coerente.
- [ ] Breadcrumbs visíveis + `BreadcrumbList`.
- [ ] JSON-LD: `WebPage` (ou `Article` com `author` `Person`, `datePublished`, `dateModified`),
      `Service` quando for serviço confirmado, `FAQPage` quando houver FAQ visível. Nunca ratings.
- [ ] Imagens com `alt` descritivo, `width`/`height`, `loading="lazy"` abaixo da dobra.
- [ ] CTA contextual: WhatsApp verde com mensagem pré-preenchida da página + formulário/análise.
- [ ] Página adicionada a `src/data/pages.json` com status correto (só `publicada` entra no sitemap/menu).
- [ ] Ao substituir uma página legada de nicho: ativar o 301 correspondente no `.htaccess`.

## Blog (Fase 3)

Tópicos: aquisição de pacientes, marketing médico (canais, campanhas, mensuração), gestão comercial
(atendimento, follow-up), especialidades, comparações (Google Ads, Meta Ads, SEO, consultorias).
Cada artigo: intenção e palavra-chave registradas, introdução que responde à pergunta, conteúdo
aprofundado com exemplos aplicáveis, referências, links para a página comercial relacionada, CTA
contextual, autor identificado (`Person`), datas de publicação e atualização. Afirmações sobre
publicidade médica devem citar a Resolução CFM nº 2.336/2023 e orientações aplicáveis. Não publicar
artigos genéricos ou repetitivos para volume.

## Monitoramento

Rotina mensal descrita em `docs/seo-mapa-de-intencoes.md`: consultas estratégicas, impressões e
cliques no Search Console, páginas com tráfego orgânico, referências de ferramentas de IA quando
identificáveis, citações verificáveis da ADR em respostas de IA (registradas como observação, não como
prova de posicionamento), relatório AI Performance do Bing Webmaster Tools quando disponível, leads
orgânicos e taxa de conversão por página.
