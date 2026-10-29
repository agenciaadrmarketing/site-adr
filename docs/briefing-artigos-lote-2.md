# Briefing — lote 2 do blog (30 artigos)

Leia antes de escrever: `CLAUDE.md`, `docs/diretrizes-seo-geo-aeo.md` e DOIS artigos existentes em
`src/content/artigos/` (ex.: `google-ads-ou-meta-ads-para-medicos.md` e `seo-local-para-clinicas.md`)
para copiar exatamente o formato do frontmatter, o tom e a estrutura.

## Formato (obrigatório)

Arquivo: `src/content/artigos/<slug>.md`. Frontmatter YAML com os campos do schema em
`src/content.config.ts`:

- `title` ≤ 60 caracteres, terminando em ` | ADR Marketing` quando couber (senão ` | ADR`).
- `h1` descritivo (pode ser mais longo que o title), com a palavra-chave principal.
- `description` entre 120 e 155 caracteres, com a palavra-chave no início.
- `categoria`: `captacao` | `trafego` | `comercial` | `autoridade` (a indicada na sua lista).
- `intencao`, `palavraChave` (a indicada), `termos` (6–8 variações/LSI reais).
- `resumo`: 60–90 palavras, resposta direta à pergunta do título (vira o bloco "Em resumo").
- `datePublished: "2026-10-29"`, `status: publicada`, `destaque: false`, `ordem`: o número indicado.
- `relacionados`: 3 slugs de artigos (existentes ou do lote 2 — lista abaixo).
- `comerciais`: 1–2 itens `{ label, href, text }`; `href` só de uma das páginas listadas em "Páginas comerciais".
- `fontes`: 2–4 fontes oficiais e reais (só URLs que você tem certeza que existem: portal.cfm.org.br,
  www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm, support.google.com/..., transparency.meta.com/...,
  developers.google.com/search/..., website.cfo.org.br, www.gov.br/anpd). Na dúvida, use a home do órgão.
- `faq`: exatamente 3 perguntas reais que o médico faria, respostas de 50–90 palavras.
- `wa`: mensagem de WhatsApp em primeira pessoa citando o tema do artigo.
- `cta`: `{ title, text }` levando ao diagnóstico comercial prévio.
- `imagemBusca`: 3–5 palavras EM INGLÊS para buscar uma foto no Unsplash que represente o conteúdo
  (ex.: "doctor smartphone instagram", "clinic reception desk"). Sem pessoas famosas, sem marcas.
- `imagemAlt`: descrição em português da foto ideal (8–15 palavras).

Corpo em Markdown: 1.400–1.900 palavras. Abertura de 2 parágrafos que responde a pergunta já no
primeiro parágrafo; 6–9 seções `##` com títulos que são perguntas ou afirmações buscáveis; listas e,
quando fizer sentido, uma tabela; um "Checklist" ou "Passo a passo" no fim; 3–6 links internos
contextuais para páginas do site (formato `[texto](/caminho/)`), incluindo pelo menos uma página de
especialidade quando o tema permitir.

## Regras invioláveis

1. **Nunca** usar "gratuito", "grátis", "de graça", "sem custo", "free" — nem no frontmatter.
   Use "sem compromisso", "sem pagar por clique", "não exige verba de anúncio".
2. Nada inventado: sem números de resultado, percentuais, estatísticas, cases, clientes, depoimentos,
   prazos garantidos ou "estudos mostram". Exemplos sempre como "por exemplo" e genéricos.
3. Copy condicional: resultado depende de especialidade, região, concorrência, investimento,
   posicionamento e atendimento. Nunca prometer posição, leads ou agenda cheia.
4. Publicidade médica: coerente com a Resolução CFM nº 2.336/2023 (para odontologia, CFO nº 196/2019);
   sem sensacionalismo, sem "antes e depois" fora das regras, sem preço promocional. Quando o artigo
   falar de norma, diga que é conteúdo educativo e que a resolução vigente deve ser consultada.
5. LGPD: nunca sugerir pedir dados clínicos por WhatsApp/formulário.
6. Autoria institucional (ADR Marketing). Não citar o nome de nenhum cliente.
7. A ADR vende: tráfego pago (Google Ads e Meta Ads), posicionamento e autoridade digital, captação de
   pacientes particulares e estruturação do comercial (consultoria/treinamento de recepção e SDR).
   SEO, criação de sites e gestão de redes sociais NÃO são vendidos como serviço: trate como conteúdo
   educativo ("o que cobrar de quem cuida disso").
8. Português do Brasil, frases curtas, tom de quem conhece o dia a dia do consultório. Sem clichês de
   IA ("no mundo de hoje", "em um cenário cada vez mais", "desbloqueie", "jornada transformadora").
9. Cada artigo precisa ser realmente diferente dos outros (evitar texto de template).

## Páginas comerciais (para `comerciais` e links internos)

`/servicos/`, `/metodologia/`, `/marketing-medico/`, `/contato/`, `/sobre/`,
`/trafego-pago-para-medicos/`, `/google-ads-para-medicos/`, `/meta-ads-para-medicos/`,
`/marketing-para-clinicas/`, e especialidades: `/marketing-para-endocrinologistas/`,
`/marketing-para-ginecologistas/`, `/marketing-para-urologistas/`, `/marketing-para-nutrologos/`,
`/marketing-para-cardiologistas/`, `/marketing-para-dermatologistas/`,
`/marketing-para-cirurgioes-plasticos/`, `/marketing-para-ortopedistas/`,
`/marketing-para-neurologistas/`, `/marketing-para-psiquiatras/`, `/marketing-para-dentistas/`.

## Artigos existentes (slugs)

atendimento-whatsapp-para-clinicas, autoridade-digital-para-medicos, como-atrair-pacientes-particulares,
como-avaliar-campanhas-de-marketing-medico, do-anuncio-ao-agendamento, follow-up-de-pacientes,
google-ads-ou-meta-ads-para-medicos, indicadores-de-marketing-para-clinicas,
por-que-clinicas-perdem-agendamentos, quanto-investir-em-marketing-medico, seo-local-para-clinicas.

## Lote 2 (slug · categoria · palavra-chave · ordem)

1. como-anunciar-no-google-ads-sendo-medico · trafego · "como anunciar no google ads médico" · 13
2. anuncios-no-instagram-para-medicos · trafego · "anúncios no instagram para médicos" · 14
3. palavras-chave-negativas-para-clinicas · trafego · "palavras-chave negativas google ads clínica" · 15
4. remarketing-para-clinicas · trafego · "remarketing para clínicas" · 16
5. landing-page-para-medicos · trafego · "landing page para médicos" · 17
6. politica-de-saude-do-google-ads · trafego · "google ads saúde política" · 18
7. quanto-custa-um-paciente-no-google-ads · trafego · "custo por paciente google ads" · 19
8. trafego-pago-para-clinica-de-estetica · trafego · "tráfego pago para clínica de estética" · 20
9. publicidade-medica-o-que-pode-e-o-que-nao-pode · autoridade · "publicidade médica" · 21
10. instagram-para-medicos · autoridade · "instagram para médicos" · 22
11. o-que-medico-pode-postar-no-instagram · autoridade · "o que médico pode postar no instagram" · 23
12. google-meu-negocio-para-medicos · autoridade · "google meu negócio para médicos" · 24
13. avaliacoes-no-google-para-clinicas · autoridade · "avaliações google clínica" · 25
14. site-para-medicos · autoridade · "site para médicos" · 26
15. branding-medico · autoridade · "branding médico" · 27
16. youtube-para-medicos · autoridade · "youtube para médicos" · 28
17. depoimentos-de-pacientes-na-publicidade-medica · autoridade · "depoimento de paciente publicidade médica" · 29
18. como-deixar-de-depender-do-convenio · captacao · "como sair do convênio médico" · 30
19. como-aumentar-o-valor-da-consulta · captacao · "como aumentar o valor da consulta" · 31
20. captacao-de-pacientes · captacao · "captação de pacientes" · 32
21. marketing-para-consultorio-medico · captacao · "marketing para consultório médico" · 33
22. marketing-para-clinica-odontologica · captacao · "marketing para clínica odontológica" · 34
23. programa-de-indicacao-de-pacientes · captacao · "como conseguir indicação de pacientes" · 35
24. como-escolher-agencia-de-marketing-medico · captacao · "agência de marketing médico" · 36
25. quanto-custa-agencia-de-marketing-medico · captacao · "quanto custa marketing médico" · 37
26. secretaria-de-consultorio-medico · comercial · "secretária de consultório médico" · 38
27. script-de-atendimento-para-clinicas · comercial · "script de atendimento clínica" · 39
28. como-reduzir-faltas-de-pacientes · comercial · "como reduzir faltas de pacientes" · 40
29. crm-para-clinicas · comercial · "crm para clínicas" · 41
30. sdr-para-clinicas · comercial · "sdr para clínicas" · 42

Para o artigo 25: a ADR não publica tabela de preços; explique faixas de modelo de cobrança
(fee mensal + verba de mídia paga à plataforma, setup, contrato) de forma genérica, sem valores da ADR.
Para o 24: critérios de escolha honestos, sem falar mal de concorrentes nem citar nomes.
