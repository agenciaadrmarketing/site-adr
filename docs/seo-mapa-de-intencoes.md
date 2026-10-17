# Mapa de palavras-chave e intenções — ADR Marketing

Fonte de verdade para a arquitetura SEO/GEO/AEO das três fases. Todos os termos abaixo
são **hipóteses de intenção**, não volumes confirmados: validar em Google Search Console,
Bing Webmaster Tools e ferramentas de pesquisa de palavras-chave quando houver acesso.

Regra de ouro: **uma intenção, uma página**. Páginas que disputarem a mesma intenção
devem ser consolidadas antes de serem publicadas.

## Fase 1 — páginas publicadas

| Rota | Intenção principal | Termos-alvo (hipóteses) | Tipo | Resposta direta no topo |
|---|---|---|---|---|
| `/` | Comercial / marca | assessoria de marketing médico · agência de marketing médico · marketing para clínicas e médicos | Comercial | "Assessoria de Marketing para Clínicas e Médicos" + o que a ADR faz em uma frase |
| `/servicos/` | Comercial (oferta) | serviços de marketing médico · agência de marketing para médicos · tráfego pago para médicos · posicionamento médico | Comercial | As quatro frentes confirmadas, o que incluem, o que não são, para quem |
| `/marketing-medico/` | Informacional → comercial (pilar) | marketing médico · o que é marketing médico · publicidade médica CFM 2.336/2023 · google ads ou meta ads para médicos | Educativo | Definição de marketing médico em duas frases + as três frentes |
| `/metodologia/` | Consideração | como funciona assessoria de marketing médico · metodologia de marketing para clínicas | Educativo/comercial | As quatro etapas em uma frase |
| `/sobre/` | Navegacional / E-E-A-T | ADR Marketing · Caio Souza Anderle · agência de marketing médico [região] | Institucional | Quem é a empresa, CNPJ, quem conduz |
| `/contato/` | Transacional | contratar agência de marketing médico · diagnóstico de marketing para clínica | Transacional | Como o contato acontece e o que vem depois |
| `/politica-de-privacidade/` | Legal | — | Institucional | — |

Perguntas conversacionais já respondidas (FAQ visível + FAQPage JSON-LD):

- Qual a melhor forma de atrair pacientes particulares? → `/marketing-medico/`
- Como escolher uma agência de marketing médico? → `/marketing-medico/`
- Quanto custa contratar marketing para uma clínica? → `/marketing-medico/` (resposta honesta: sem tabela; definido no diagnóstico)
- Vale a pena investir em Google Ads para consultório médico? → `/marketing-medico/`
- Qual a diferença entre tráfego pago e SEO médico? → `/marketing-medico/`
- Como aumentar os agendamentos de uma clínica? → `/marketing-medico/`
- O que avaliar antes de contratar uma agência de marketing médico? → `/marketing-medico/`
- O que faz uma assessoria de marketing para clínicas? / Tráfego pago funciona? / Em quanto tempo há retorno? / Quem conduz? / Atende qualquer perfil? / Inclui atendimento e agendamento? → `/` e `/servicos/`

## Fase 2 — páginas comerciais (construir só o que for confirmado)

### Cluster marketing médico

| Rota | Intenção distinta | Risco de canibalização | Decisão |
|---|---|---|---|
| `/marketing-para-medicos/` | Médico pessoa física / consultório individual: posicionamento pessoal, agenda própria | Alto com `/marketing-medico/` (pilar) | Publicar só com conteúdo centrado no profissional individual; se não houver diferenciação clara, consolidar no pilar |
| `/marketing-para-clinicas/` | Gestor de clínica com vários profissionais: operação, recepção, múltiplas agendas | Médio com a Home | Diferenciar pelo público (gestão) e pelo pilar comercial |
| `/captacao-de-pacientes/` | Problema específico: "como captar pacientes particulares" | Médio com `/marketing-medico/` | Página de problema → solução; linkar para tráfego pago e comercial |

### Cluster serviços

| Rota | Status | Observação |
|---|---|---|
| `/trafego-pago-para-medicos/` | Confirmado | Página-guarda-chuva; canais abaixo são filhos |
| `/google-ads-para-medicos/` | Confirmado | Intenção por canal (busca ativa) |
| `/meta-ads-para-medicos/` | Confirmado | Intenção por canal (construção de demanda) |
| `/posicionamento-medico/` | Confirmado | Autoridade e posicionamento |
| `/seo-para-clinicas/` | **Pendente** | Só como conteúdo educativo até confirmação comercial |
| `/sites-para-medicos/` | **Pendente** | Não publicar como oferta |
| `/redes-sociais-para-medicos/` | **Pendente** | Não publicar como oferta |
| `/atendimento-para-clinicas/` | **Pendente** | Hoje é pilar da metodologia; publicar como educativo ou consolidar em `/metodologia/` |

### Cluster especialidades (ordem de prioridade do cliente)

`/marketing-para-endocrinologistas/` → `/marketing-para-ginecologistas/` → `/marketing-para-urologistas/` →
`/marketing-para-nutrologos/` → `/marketing-para-cardiologistas/` → depois dermatologistas, cirurgiões
plásticos, ortopedistas, neurologistas, psiquiatras.

Cada página precisa de conteúdo próprio: jornada do paciente daquela especialidade, ticket típico,
procedimentos eletivos, canal mais adequado, perguntas específicas. Texto idêntico com troca de
especialidade não é aceitável (hoje é o que as páginas legadas em `/niches/` fazem — por isso serão
substituídas e redirecionadas 301 quando as novas existirem).

Mapa de redirects (ativar só quando a página nova existir):

| Antiga (legado, no ar) | Nova |
|---|---|
| `/niches/cardiologia/` | `/marketing-para-cardiologistas/` |
| `/niches/endocrino/` | `/marketing-para-endocrinologistas/` |
| `/niches/ginecologia/` | `/marketing-para-ginecologistas/` |
| `/niches/nutri/` | `/marketing-para-nutrologos/` |
| `/niches/urologia/` | `/marketing-para-urologistas/` |
| `/niches/odonto/` | sem equivalente aprovado (odontologia está fora do posicionamento atual) — decisão do cliente |
| `cardiologia.agenciaadrmarketing.com` etc. | **verificar se existem**; se sim, 301 no vhost do subdomínio para a rota do domínio principal |

## Fase 3 — blog (publicar só artigos originais)

| Artigo | Intenção | Página comercial relacionada |
|---|---|---|
| `/blog/como-atrair-pacientes-particulares/` | Aquisição | `/captacao-de-pacientes/`, `/servicos/` |
| `/blog/por-que-clinicas-perdem-agendamentos/` | Gestão comercial | `/metodologia/` |
| `/blog/google-ads-ou-meta-ads-para-medicos/` | Comparação | `/google-ads-para-medicos/`, `/meta-ads-para-medicos/` |
| `/blog/quanto-investir-em-marketing-medico/` | Investimento | `/contato/` |
| `/blog/como-avaliar-campanhas-de-marketing-medico/` | Mensuração | `/metodologia/` |
| `/blog/atendimento-whatsapp-para-clinicas/` | Gestão comercial | `/metodologia/` |
| `/blog/follow-up-de-pacientes/` | Gestão comercial | `/metodologia/` |
| `/blog/indicadores-de-marketing-para-clinicas/` | Mensuração | `/metodologia/` |
| `/blog/autoridade-digital-para-medicos/` | Posicionamento | `/posicionamento-medico/` |
| `/blog/regras-de-publicidade-medica-cfm/` | Conformidade | `/marketing-medico/` |
| `/blog/seo-local-para-clinicas/` | Comparação / educativo | `/marketing-medico/` (SEO não é oferta confirmada) |
| `/blog/do-anuncio-ao-agendamento/` | Jornada | `/metodologia/`, `/servicos/` |

Autoria: identificar o autor real (Caio Souza Anderle) com `Person` JSON-LD quando ele assinar o texto.
Afirmações técnicas sobre publicidade médica devem citar a Resolução CFM nº 2.336/2023.

## Rotina de monitoramento (mensal)

1. **Google Search Console**: impressões, cliques e posição média por página; consultas que já trazem tráfego; cobertura/indexação; Core Web Vitals (dados reais).
2. **Bing Webmaster Tools**: indexação e, quando disponível, o relatório *AI Performance* (citações nas experiências de IA da Microsoft).
3. **GA4 / GTM**: `whatsapp_click`, `form_start`, `lead_form_submit`, `generate_lead` por página de origem; taxa de conversão por página; tráfego de referência vindo de ferramentas de IA (chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com) quando identificável.
4. **Consultas estratégicas** (lista acima): checar periodicamente se a ADR é citada em respostas de IA — registrar como observação, nunca como prova de posicionamento constante.
5. **Leads orgânicos**: cruzar origem `utm`/referrer da planilha com as páginas de entrada.

Dependências do cliente: acesso/verificação do Search Console e do Bing Webmaster Tools para o domínio
(tokens de verificação), e definição de quem revisa o relatório mensal.
