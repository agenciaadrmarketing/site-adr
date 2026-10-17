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
especialidade não é aceitável (era o que as páginas legadas em `/niches/` faziam).

**Status (Fase 2, primeira leva):** as 5 prioritárias estão publicadas com conteúdo próprio
(`src/content/especialidades/*.json`, template `SpecialtyPage.astro`). Similaridade textual máxima
entre pares: 0,25 (Jaccard em sequências de 4 palavras; o que coincide é cabeçalho, rodapé e CTA).
Intenção de cada uma: "marketing para [especialidade]" / "como captar pacientes de [especialidade]" —
jornada do paciente, onde a demanda está (Google × Meta), as quatro frentes aplicadas, pontos sensíveis
de publicidade médica e perguntas da especialidade.

Mapa de redirects — **ativos** no `.htaccess` desde a Fase 2 (páginas legadas removidas do pacote):

| Antiga (legado) | Nova | Status |
|---|---|---|
| `/niches/cardiologia/` | `/marketing-para-cardiologistas/` | 301 ativo |
| `/niches/endocrino/` | `/marketing-para-endocrinologistas/` | 301 ativo |
| `/niches/ginecologia/` | `/marketing-para-ginecologistas/` | 301 ativo |
| `/niches/nutri/` | `/marketing-para-nutrologos/` | 301 ativo |
| `/niches/urologia/` | `/marketing-para-urologistas/` | 301 ativo |
| `/niches/odonto/` | sem equivalente aprovado (odontologia está fora do posicionamento atual) — decisão do cliente | continua no ar, no sitemap, formato antigo |
| `cardiologia.agenciaadrmarketing.com` etc. | **verificar se existem**; se sim, 301 no vhost do subdomínio para a rota do domínio principal |

## Fase 3 — blog (implementado)

Hub `/blog/` (CollectionPage + Blog) com navegação por tema em âncoras (`#captacao`, `#trafego`,
`#comercial`, `#autoridade`). Sem páginas de categoria nem paginação: com 2–3 artigos por tema, seriam
páginas finas. Reavaliar quando um tema passar de ~8 artigos.

Os links comerciais apontam só para páginas **publicadas**. As páginas comerciais planejadas
(`/captacao-de-pacientes/`, `/google-ads-para-medicos/`, `/posicionamento-medico/`…) ainda não existem;
quando forem criadas, atualizar o campo `comerciais` dos artigos correspondentes.

| Artigo | Cluster | Intenção | Palavra-chave (hipótese) | Status | Links comerciais hoje |
|---|---|---|---|---|---|
| `/blog/como-atrair-pacientes-particulares/` | Captação | Informacional → comercial | como atrair pacientes particulares | publicada | `/servicos/`, `/metodologia/`, `/marketing-medico/` |
| `/blog/por-que-clinicas-perdem-agendamentos/` | Captação | Diagnóstico | clínica não converte contatos em agendamentos | publicada | `/metodologia/`, `/servicos/` |
| `/blog/do-anuncio-ao-agendamento/` | Captação | Estrutural | jornada do paciente do anúncio ao agendamento | publicada | `/metodologia/`, `/servicos/` |
| `/blog/google-ads-ou-meta-ads-para-medicos/` | Tráfego | Comparação | google ads ou meta ads para médicos | publicada | `/servicos/`, `/marketing-medico/`, especialidades |
| `/blog/quanto-investir-em-marketing-medico/` | Tráfego | Investimento | quanto investir em marketing médico | publicada | `/servicos/`, `/contato/` |
| `/blog/como-avaliar-campanhas-de-marketing-medico/` | Tráfego | Mensuração | como avaliar campanhas de marketing médico | publicada | `/metodologia/`, `/servicos/` |
| `/blog/atendimento-whatsapp-para-clinicas/` | Comercial | Operacional | atendimento whatsapp para clínicas | publicada | `/metodologia/`, `/servicos/` |
| `/blog/follow-up-de-pacientes/` | Comercial | Processo | follow-up de pacientes | publicada | `/metodologia/`, `/servicos/` |
| `/blog/indicadores-de-marketing-para-clinicas/` | Comercial | Referência | indicadores de marketing para clínicas | publicada | `/metodologia/`, `/servicos/` |
| `/blog/autoridade-digital-para-medicos/` | Autoridade | Posicionamento | autoridade digital para médicos | publicada | `/servicos/`, `/marketing-medico/` |
| `/blog/regras-de-publicidade-medica-cfm/` | Autoridade | Conformidade | regras de publicidade médica CFM | **revisão** (fora do build de produção) | `/marketing-medico/`, `/servicos/` |
| `/blog/seo-local-para-clinicas/` | Autoridade | Educativa (SEO não é oferta) | seo local para clínicas | publicada | `/marketing-medico/`, `/servicos/` |

Separação de intenções para evitar canibalização: "avaliar campanhas" (como decidir se a mídia/agência
funciona) × "indicadores" (quais números montar no painel) — similaridade textual 0,11; "por que perdem
agendamentos" (diagnóstico dos pontos de perda) × "do anúncio ao agendamento" (desenho do processo) ×
"atendimento no WhatsApp" (operação da conversa).

Perguntas de contratação respondidas em `/servicos/` (FAQ visível + FAQPage): qual agência contratar
para uma clínica; o que diferencia uma agência especializada; quanto investir em tráfego pago para médicos.

Autoria: institucional (`Organization`) até o cliente confirmar quem assina; quando houver autor real,
trocar `author` para `Person` com página de autor.

## Rotina de monitoramento (mensal)

1. **Google Search Console**: impressões, cliques e posição média por página; consultas que já trazem tráfego; cobertura/indexação; Core Web Vitals (dados reais).
2. **Bing Webmaster Tools**: indexação e, quando disponível, o relatório *AI Performance* (citações nas experiências de IA da Microsoft).
3. **GA4 / GTM**: `whatsapp_click`, `form_start`, `lead_form_submit`, `generate_lead` por página de origem; taxa de conversão por página; tráfego de referência vindo de ferramentas de IA (chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com) quando identificável.
4. **Consultas estratégicas** (lista acima): checar periodicamente se a ADR é citada em respostas de IA — registrar como observação, nunca como prova de posicionamento constante.
5. **Leads orgânicos**: cruzar origem `utm`/referrer da planilha com as páginas de entrada.

Dependências do cliente: acesso/verificação do Search Console e do Bing Webmaster Tools para o domínio
(tokens de verificação), e definição de quem revisa o relatório mensal.
