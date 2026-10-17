# ADR Marketing — Informações Pendentes para Finalização do Site

Levantamento feito em 17/10/2026 sobre o repositório `site-adr` (branch `claude/awesome-tesla-9ak8rg`),
depois da implementação das Fases 1, 2 e 3. Lista **apenas** o que falta ou precisa de confirmação; o que
já está no projeto (WhatsApp +55 48 98880-9542, e-mail agencia.adrmarketing@gmail.com, CNPJ
57.872.304/0001-66, IDs GTM-PDFHMCXG, AW-18381807679 e Clarity yjdxdq034e, endpoint do formulário,
foto e nome do Caio Souza Anderle, logo em WebP) não é pedido de novo.

**Prioridades**

- **P0** — bloqueia publicação ou funcionamento.
- **P1** — importante para credibilidade, SEO ou conversão.
- **P2** — melhoria complementar que pode vir depois.

**Tipo de pendência**

- **Inexistente** — a informação não existe em nenhum lugar do projeto.
- **Não confirmada** — a informação foi localizada (LP antiga, política de privacidade, código), mas ninguém confirmou que está certa ou atual.
- **Sem acesso** — integração existente que não pôde ser validada daqui (rede bloqueada ou falta de acesso à conta).
- **Não produzido** — conteúdo planejado e ainda não feito, ou feito e aguardando aprovação.

Nada aqui exige enviar senha. Acessos devem ser concedidos por convite nas próprias plataformas
(Google Search Console, Google Tag Manager, GA4, Google Ads, Bing, Hostinger) ao e-mail de quem for
operar.

---

## Resumo

| Prioridade | Quantidade | O que destrava |
|---|---|---|
| P0 | 4 | Publicar o pacote com segurança e saber que os leads e as conversões continuam chegando |
| P1 | 32 | Credibilidade institucional, SEO local, medição, páginas comerciais da Fase 2 |
| P2 | 14 | Refinamentos de marca, conteúdo e inteligência de mercado |

---

## A. Informações institucionais

| Prioridade | Informação faltante | Tipo | Por que é necessária | Quem deve fornecer | Página ou recurso afetado | Consequência da ausência |
|---|---|---|---|---|---|---|
| P1 | Cidade-sede, endereço comercial (ou confirmação de que o atendimento é 100% remoto) e abrangência do atendimento (estados/cidades/Brasil) | Inexistente | Buscadores e sistemas de IA usam localização para entender a entidade; sem ela não há Perfil da Empresa no Google nem `address` no JSON-LD | Caio / sócios | `/sobre/`, `/contato/`, JSON-LD `Organization`, futura estratégia de SEO local | A ADR aparece como entidade sem localização; perde buscas com cidade ("agência de marketing médico em …") |
| P1 | História da ADR: ano de início, como surgiu, marcos verificáveis | Inexistente | Base de E-E-A-T (experiência, autoridade, confiança) da página Sobre | Caio | `/sobre/`, `foundingDate` no JSON-LD | Página Sobre fica genérica; menos sinais de confiança para pacientes-clientes e para IA |
| P1 | Trajetória profissional do Caio: formação, tempo de atuação com saúde, cargos anteriores, LinkedIn | Não confirmada (nome e foto existem; o cargo "Fundador e responsável pela estratégia" foi inferido da LP) | Autoria e liderança são o principal diferencial declarado ("liderança sênior") | Caio | `/sobre/`, JSON-LD `Person`, autoria do blog | O diferencial "liderança sênior" fica sem evidência; artigos seguem com autoria institucional |
| P1 | A pessoa da foto "Alanys" existe na equipe e autoriza o uso de nome e imagem? | Não confirmada | A foto aparece no balão de atendimento e em "Quem somos". Por precaução, o rótulo do balão foi trocado para "Atendimento · ADR Marketing" | Caio | Balão de atendimento (todas as páginas), Home "Quem somos" | Se não for pessoa real e autorizada, a imagem precisa ser substituída antes do deploy |
| P1 | Perfis oficiais da ADR (Instagram, LinkedIn da empresa e do Caio, YouTube, outros) | Inexistente | Ligam a entidade aos perfis (`sameAs`) para buscadores e IA; aparecem no rodapé | Caio | Rodapé, JSON-LD `Organization.sameAs` | Entidade fragmentada; IA e Google não conseguem confirmar que os perfis são da mesma empresa |
| P1 | Nome empresarial: confirmar se "57.872.304 CAIO SOUZA ANDERLE" é o nome que deve aparecer e se "ADR Marketing" é nome fantasia registrado | Não confirmada (extraído da política de privacidade) | Coerência jurídica entre rodapé, política, JSON-LD e notas fiscais | Caio / contador | Rodapé, `/politica-de-privacidade/`, `/sobre/`, JSON-LD | Risco de divergência entre o que o site declara e o registro oficial |
| P2 | Texto institucional definitivo de 1–2 frases (descrição oficial) | Não confirmada (usamos a derivada da LP) | Padronizar a mesma descrição no site, perfis sociais e diretórios | Caio | JSON-LD `description`, rodapé, Google, perfis | Pequenas variações de descrição entre canais |
| P2 | Horário exato de atendimento | Não confirmada (site diz "horário comercial") | Informar o paciente-cliente e preencher `openingHours` | Caio | `/contato/`, balão, mensagem automática | Expectativa imprecisa sobre tempo de resposta |
| P2 | Fotos profissionais adicionais (equipe, ambiente de trabalho, bastidores) | Inexistente | Prova visual de que existe operação real | Caio | `/sobre/`, Home, perfis | Site depende de uma única foto institucional |

## B. Serviços e posicionamento

| Prioridade | Informação faltante | Tipo | Por que é necessária | Quem deve fornecer | Página ou recurso afetado | Consequência da ausência |
|---|---|---|---|---|---|---|
| P1 | Confirmação comercial de SEO para clínicas, sites para médicos, redes sociais e atendimento como serviço independente | Não confirmada | Só serviços confirmados viram oferta (regra do projeto) | Caio | `/servicos/`, rodapé, JSON-LD `Service`, páginas da Fase 2 | Os quatro seguem só como conteúdo educativo; não podem ganhar página comercial |
| P1 | O que é parte da assessoria e o que é vendido à parte (ex.: treinamento de recepção/SDR, produção de criativos, gestão de redes) | Inexistente | Evita prometer no site algo que é cobrado separadamente | Caio | `/servicos/`, `/metodologia/`, FAQs | Risco de expectativa errada na primeira conversa comercial |
| P1 | Aprovação para criar as páginas comerciais planejadas: tráfego pago para médicos, Google Ads para médicos, Meta Ads para médicos, posicionamento médico, captação de pacientes, marketing para clínicas, marketing para médicos | Não produzido | Páginas com intenção de compra que hoje não existem; os artigos do blog já estão prontos para linkar para elas | Caio | Fase 2 (páginas comerciais), links internos do blog | Intenções comerciais de alto valor ficam sem página dedicada |
| P1 | Perfil de cliente ideal: tipo de clínica, porte, ticket mínimo dos procedimentos, verba mínima de mídia, regiões atendidas | Inexistente (o site só diz "pacientes particulares e procedimentos de alto valor") | Qualifica o lead já no formulário e na copy | Caio | `/contato/`, campos do formulário, FAQ "Atende qualquer perfil?" | Leads fora do perfil continuam chegando e consumindo tempo comercial |
| P1 | Especialidades que a ADR realmente atende ou já atendeu (as 10 listadas, odontologia, outras) | Não confirmada (lista veio da LP e das páginas de nicho antigas) | Só publicar páginas de especialidade que a ADR consegue sustentar numa conversa comercial | Caio | 5 páginas publicadas, 5 planejadas, grade da Home | Página de especialidade sem experiência real por trás é um risco de credibilidade |
| P1 | Destino de `/niches/odonto/` (manter, criar página nova de odontologia ou remover com 301 para uma página equivalente) | Não confirmada | É a última página no formato antigo (1 MB, base64); impede adicionar política de segurança CSP | Caio | `/niches/odonto/`, `.htaccess` | Página lenta e fora do padrão continua no ar e no sitemap |
| P1 | Diagnóstico comercial prévio: é gratuito mesmo? Como acontece (vídeo, WhatsApp, reunião)? Quanto tempo leva? | Não confirmada (o site diz "sem custo e sem compromisso") | É a principal oferta de entrada em todas as páginas | Caio | Todas as páginas (CTAs), `/contato/`, `/metodologia/` | Promessa de CTA sem detalhe operacional confirmado |
| P2 | Evidência dos diferenciais declarados: "liderança sênior conduz todas as contas", "número restrito de parceiros simultâneos", "modelo premium" | Não confirmada | São afirmações verificáveis por quem contrata | Caio | Home, `/sobre/`, `/servicos/`, FAQ | Diferencial sem evidência pode ser questionado na venda (não publicar número de vagas sem confirmação) |

## C. Cases e provas sociais

O site **não** publica cases, depoimentos, números de resultado nem avaliações. O componente
`CaseStudy` já existe e só renderiza um case quando todos os campos abaixo estão preenchidos.

| Prioridade | Informação faltante | Tipo | Por que é necessária | Quem deve fornecer | Página ou recurso afetado | Consequência da ausência |
|---|---|---|---|---|---|---|
| P1 | Para cada case: autorização escrita do médico ou clínica (com nome ou anonimizado), especialidade e cidade, contexto inicial, período da campanha, faixa de investimento em mídia, indicadores reais (contatos, agendamentos, custo por agendamento) com a fonte (print do Google Ads/Meta e da planilha), o que a ADR fez, e depoimento com consentimento — sem dados de pacientes e sem promessa de resultado | Inexistente | Prova social legítima é o maior ganho de credibilidade possível; precisa ser verificável e compatível com a publicidade médica (o médico do case também está sujeito à Resolução CFM nº 2.336/2023) | Caio + clientes atuais | `/cases/` (não publicado), Home, páginas de especialidade | Sem prova social; o site se apoia só em método e transparência |

Não é necessário: faturamento do cliente, dados de pacientes, contratos, valores de honorário.

## D. Mídias e identidade visual

| Prioridade | Informação faltante | Tipo | Por que é necessária | Quem deve fornecer | Página ou recurso afetado | Consequência da ausência |
|---|---|---|---|---|---|---|
| P1 | Logo em arquivo vetorial (SVG, AI ou PDF) e versões (horizontal, símbolo, monocromática clara/escura) | Inexistente (só existe `logo-adr.webp`) | Nitidez em qualquer tela e uso no cabeçalho, rodapé, favicon e JSON-LD `logo` | Caio / designer | Header, footer, favicon, `Organization.logo` | Logo raster; versão escura no rodapé dos artigos é feita por filtro |
| P1 | Imagem de compartilhamento institucional (1200 × 630) | Inexistente (hoje usa o favicon 512 px) | É a imagem que aparece quando o link é enviado no WhatsApp, LinkedIn etc. | Designer | Todas as páginas (`og:image`) | Prévia de link fraca justamente no canal principal de conversão |
| P2 | Manual ou guia de marca (cores, tipografia, usos da logo) | Inexistente (tokens extraídos da LP) | Evitar divergência entre site, anúncios e perfis | Designer | Todo o site | Identidade mantida só pelo código |
| P2 | Fotos da equipe e do ambiente de trabalho | Inexistente | Ver seção A | Caio | `/sobre/`, Home | — |
| P2 | Vídeo institucional curto ou do Caio explicando o método | Inexistente | Formato com alta confiança para o público médico | Caio | Home, `/sobre/`, `/metodologia/` | — |
| P2 | Imagens autorizadas de clientes (para cases) | Inexistente | Ver seção C | Clientes | `/cases/` | — |

## E. Conversão e integrações

| Prioridade | Informação faltante | Tipo | Por que é necessária | Quem deve fornecer | Página ou recurso afetado | Consequência da ausência |
|---|---|---|---|---|---|---|
| **P0** | Pessoa com acesso à planilha do Google Apps Script para confirmar, logo após o deploy, que um envio de teste chegou com todos os campos (inclusive os novos valores de `origem_form`: `contato`, `especialidade_<slug>`, `hero-form` etc.) | Sem acesso | A integração foi preservada, mas a rede deste ambiente bloqueia o envio real; não houve teste ponta a ponta | Caio / quem gerencia a planilha | Todos os formulários do site | Leads podem se perder sem ninguém perceber |
| **P0** | Acesso de leitura ao Google Tag Manager (GTM-PDFHMCXG) e ao Google Ads (AW-18381807679) para conferir, em modo Preview, que as conversões continuam disparando no site novo | Sem acesso | As conversões do Google Ads provavelmente são configuradas no GTM (o site não envia rótulo de conversão). Se os gatilhos usavam seletores da LP antiga, podem ter parado | Caio / gestor do Ads | Campanhas ativas, otimização por conversão | Campanhas perdem o sinal de conversão e otimizam no escuro |
| P1 | O Apps Script recebe os dados do lead por URL (método GET: nome, e-mail e WhatsApp ficam no endereço da requisição). Decisão: migrar o script para POST | Sem acesso (o script está na conta Google do cliente) | URLs com dados pessoais podem ficar em logs; não é o ideal pela LGPD | Caio + quem mantém o script | `src/scripts/lead-form.ts` e o Apps Script | Risco de exposição de dados pessoais em registros técnicos |
| P1 | Critério de lead qualificado (quem decide e com que informações) | Inexistente | Separar "contato" de "lead qualificado" nos relatórios e no Google Ads | Caio | Relatórios, importação offline de conversões | Campanhas otimizam por contato, não por qualidade |
| P1 | Onde os agendamentos/fechamentos são registrados (planilha, CRM, outro) e se é possível marcar o `gclid` de cada lead | Inexistente | Base para importar conversões offline (lead qualificado, contrato fechado) no Google Ads e GA4 | Caio | Medição de resultado comercial | Não é possível medir resultado real por canal |
| P1 | Acesso de leitura à propriedade do GA4 `G-1YXFZQPS7P` (o ID foi localizado no PageSpeed do site no ar: é carregado pelo GTM) | Sem acesso | Montar os relatórios de tráfego orgânico, blog, origem de IA e conversões | Caio / gestor | Todas as páginas | Os dados são coletados, mas ninguém da operação do site consegue ler |
| P1 | O Google Ads é carregado duas vezes (gtag direto no site + Google tag dentro do GTM). Confirmar no GTM se alguma conversão depende do gtag direto, para removê-lo | Sem acesso | Remover 162 KB de JavaScript duplicado para cada visitante | Gestor do Google Ads / GTM | Todas as páginas | Tag duplicada continua pesando no carregamento |
| P1 | Acompanhar, nas duas semanas após o deploy, se sessões no GA4 e conversões no Google Ads ficaram coerentes com o novo carregamento das tags (na primeira interação ou 4 s após o load) | Sem acesso | O ajuste levou o desempenho de 63 para 100 no laboratório, mas visitas muito curtas sem interação deixam de ser registradas | Gestor do Google Ads / GA4 | Medição | Queda inesperada de dados passaria despercebida |
| P1 | Banner de consentimento de cookies (e Consent Mode do Google): decisão sobre implantar | Inexistente (a política de privacidade informa os cookies, mas não há coleta de consentimento) | Avaliação de LGPD; exige decisão jurídica | Caio + jurídico | Todas as páginas, tags | Risco regulatório; decisão fora do escopo técnico |
| P2 | Pixel da Meta: instalar ou não? (o código já está preparado e a política menciona a possibilidade) | Inexistente | Campanhas de Meta Ads sem pixel otimizam pior | Caio / gestor | Tags | Nenhuma conversão de Meta Ads medida no site |

## F. SEO e domínio

| Prioridade | Informação faltante | Tipo | Por que é necessária | Quem deve fornecer | Página ou recurso afetado | Consequência da ausência |
|---|---|---|---|---|---|---|
| P1 | Acesso (convite) ao Google Search Console do domínio | Sem acesso (nenhuma tag de verificação no site; pode existir por DNS) | Pedir indexação das 23 páginas novas, acompanhar os 301 de `/niches/`, consultas e Core Web Vitals reais | Caio | Todo o site | Indexação mais lenta; nenhum dado real de consultas e cliques orgânicos |
| P1 | Acesso ao Bing Webmaster Tools | Sem acesso | Indexação no Bing/Copilot e relatório de presença em respostas de IA da Microsoft | Caio | Todo o site | Sem visibilidade sobre Bing e Copilot |
| P1 | Os subdomínios `cardiologia`, `endocrino`, `ginecologia`, `nutri`, `urologia`, `odonto`.agenciaadrmarketing.com existem? Se sim, acesso ao DNS/Hostinger para configurar 301 | Sem acesso | As páginas antigas declaravam canonicals nesses subdomínios | Caio | `.htaccess` / painel Hostinger | Possível conteúdo duplicado ou páginas antigas no ar fora do controle do site |
| P1 | Lista de URLs antigas com tráfego ou backlinks (do Search Console ou de ferramenta de SEO) | Sem acesso | Garantir que nenhuma URL com tráfego ficou sem redirecionamento equivalente | Caio | `.htaccess` | Perda de tráfego e links acumulados |
| P1 | Hospedagem: há CDN ou firewall (Cloudflare, CDN/WAF da Hostinger) na frente do site? Bloqueia algum robô? | Sem acesso | Robôs de busca e de IA (Googlebot, Bingbot, OAI-SearchBot) precisam acessar as páginas públicas | Caio / Hostinger | Rastreamento | Bloqueio silencioso reduz indexação e citação em IA |
| P1 | Decisão sobre robôs de treinamento de IA (GPTBot, Google-Extended, ClaudeBot, CCBot): permitir ou bloquear | Não confirmada (hoje permitidos por padrão) | Decisão de negócio; não afeta a busca | Caio | `robots.txt` | Nenhuma imediata; fica registrada a escolha padrão |
| P1 | Mercados geográficos prioritários (cidades/estados onde a ADR quer clientes) | Inexistente | Orienta conteúdo local, páginas e campanhas | Caio | Mapa de intenções, conteúdo futuro | Conteúdo segue nacional e genérico |
| P2 | Relatórios de palavras-chave e volumes de busca | Inexistente (o mapa de intenções usa hipóteses, sem volumes) | Priorizar páginas e artigos pelo potencial real | Gestor / ferramenta | `docs/seo-mapa-de-intencoes.md` | Priorização por julgamento, não por dado |
| P2 | Concorrentes comerciais diretos (3 a 5 agências que disputam os mesmos clientes) | Inexistente | Benchmark de conteúdo e posicionamento | Caio | Estratégia de conteúdo | Sem referência competitiva |

## G. Blog e conteúdo

| Prioridade | Informação faltante | Tipo | Por que é necessária | Quem deve fornecer | Página ou recurso afetado | Consequência da ausência |
|---|---|---|---|---|---|---|
| **P0** | Aprovação do conteúdo novo antes do deploy: 11 artigos do blog, 5 páginas de especialidade, perguntas de contratação em `/servicos/` | Não produzido (produzido, aguardando aprovação) | O conteúdo é original e sem números inventados, mas fala em nome da ADR | Caio | `/blog/` e artigos, `/marketing-para-*/`, `/servicos/` | Não publicar até aprovar (regra do projeto: nada sem conteúdo aprovado) |
| **P0** | Revisão do artigo sobre regras de publicidade médica (Resolução CFM nº 2.336/2023) por profissional habilitado (advogado da área de saúde ou assessoria do CRM) | Não produzido (produzido, aguardando revisão especializada) | Conteúdo regulatório não pode ser publicado sem validação | Caio contrata/indica o revisor | `/blog/regras-de-publicidade-medica-cfm/` (fora do pacote de produção) | O artigo continua fora do site |
| P1 | Quem assina os artigos (Caio? com quais credenciais?) | Inexistente | Autoria real com página de autor fortalece E-E-A-T | Caio | Todos os artigos, JSON-LD `Article.author` | Autoria segue institucional (ADR Marketing) |
| P1 | Revisão jurídica dos Termos de Uso e da Política de Privacidade (cookies, Clarity, WhatsApp, retenção de dados) | Não produzido (Termos em rascunho `noindex`; política publicada sem revisão jurídica registrada) | Documentos legais | Jurídico | `/termos-de-uso/`, `/politica-de-privacidade/` | Termos fora do site; política sem validação formal |
| P2 | Responsável e periodicidade de atualização dos artigos (sugestão: revisão a cada 6–12 meses) | Inexistente | Conteúdo sobre plataformas e normas envelhece rápido | Caio | Blog | Artigos desatualizados com o tempo |
| P2 | Diretrizes de conteúdo da ADR: tom, temas que não quer abordar, termos proibidos, fontes preferidas (sociedades médicas) | Inexistente | Consistência editorial nas próximas pautas | Caio | Blog e páginas futuras | Cada artigo novo depende de revisão caso a caso |
| P2 | Imagens de capa dos artigos (próprias ou produzidas) | Inexistente (artigos publicados sem imagem, por decisão, para não usar banco genérico) | Compartilhamento e apelo visual | Designer | Cards e páginas de artigo | Cards apenas tipográficos (coerentes com a identidade) |

---

## Checklist para enviar ao cliente

Copie e envie. Itens marcados com ⚠️ bloqueiam a publicação.

**Antes de publicar**

- [ ] ⚠️ Ler e aprovar os 11 artigos do blog, as 5 páginas de especialidade e as novas perguntas da página de Serviços.
- [ ] ⚠️ Indicar quem pode conferir a planilha de leads logo depois do deploy (faremos um envio de teste).
- [ ] ⚠️ Dar acesso de leitura ao Google Tag Manager e ao Google Ads para conferir as conversões no site novo.
- [ ] ⚠️ Indicar advogado ou assessoria para revisar o artigo sobre regras de publicidade médica (fica fora do site até lá).
- [ ] Confirmar se a pessoa da foto "Alanys" é da equipe e autoriza o uso da imagem.

**Sobre a empresa**

- [ ] Cidade-sede, endereço (ou "atendimento 100% remoto") e regiões atendidas.
- [ ] Ano de início e breve história da ADR.
- [ ] Trajetória do Caio (formação, experiência com saúde, LinkedIn).
- [ ] Links oficiais: Instagram, LinkedIn (empresa e Caio), YouTube, outros.
- [ ] Confirmar o nome empresarial que deve aparecer no site e se "ADR Marketing" é nome fantasia registrado.
- [ ] Horário de atendimento.

**Serviços**

- [ ] SEO, sites, redes sociais e atendimento: são vendidos? Dentro da assessoria ou à parte?
- [ ] Autorizar (ou não) as páginas comerciais: tráfego pago, Google Ads, Meta Ads, posicionamento, captação, marketing para clínicas, marketing para médicos.
- [ ] Perfil de cliente ideal (tipo de clínica, ticket, verba mínima de mídia, regiões).
- [ ] Especialidades que a ADR atende de fato; decidir o destino da página de odontologia.
- [ ] Como funciona o diagnóstico comercial prévio (gratuito? formato? duração?).

**Prova social (quando houver)**

- [ ] Para cada case: autorização do cliente, especialidade, cidade, período, faixa de investimento, indicadores com print da fonte, depoimento com consentimento.

**Marca e mídia**

- [ ] Logo em vetor (SVG/AI/PDF) e versões.
- [ ] Imagem de compartilhamento 1200 × 630.
- [ ] Fotos da equipe e do ambiente (opcional), vídeo curto (opcional).

**Medição e domínio** (por convite, nunca por senha)

- [ ] Convite no Google Search Console e no Bing Webmaster Tools.
- [ ] Acesso de leitura ao GA4 `G-1YXFZQPS7P` (já localizado dentro do GTM).
- [ ] Conferir no GTM se a conversão do Google Ads depende do gtag direto do site (ele está duplicado).
- [ ] Comparar sessões e conversões das duas semanas após o deploy com as anteriores.
- [ ] Onde os leads qualificados e os fechamentos são registrados; critério de lead qualificado.
- [ ] Decisão sobre banner de cookies (com o jurídico) e sobre o Pixel da Meta.
- [ ] Os subdomínios de especialidade existem? Há CDN/firewall na Hostinger?
- [ ] Permitir ou bloquear robôs de treinamento de IA.
- [ ] Cidades/estados prioritários e 3 a 5 concorrentes diretos.

**Conteúdo**

- [ ] Quem assina os artigos.
- [ ] Revisão jurídica dos Termos de Uso e da Política de Privacidade.
- [ ] Quem revisa e atualiza os artigos, e com que frequência.
