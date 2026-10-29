// Páginas comerciais por intenção de busca (SEO lote 2, 29/10/2026).
// Uma intenção por página; sem números de resultado, sem promessa, conforme CLAUDE.md.

export interface Landing {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  h1Accent: string;
  resposta: string;
  wa: string;
  serviceName: string;
  definicao: { titulo: string; texto: string[]; pontos: string[] };
  quando: { titulo: string; itens: { t: string; d: string }[] };
  como: { titulo: string; passos: { t: string; d: string }[] };
  cuidados: { titulo: string; texto: string; itens: string[] };
  faq: { q: string; a: string }[];
  relacionados: { label: string; href: string; text: string }[];
}

export const LANDINGS: Record<string, Landing> = {
  'trafego-pago-para-medicos': {
    slug: 'trafego-pago-para-medicos',
    title: 'Tráfego Pago para Médicos e Clínicas | ADR Marketing',
    description: 'Tráfego pago para médicos: Google Ads e Meta Ads planejados por especialidade, filtro de pacientes particulares e acompanhamento até o agendamento.',
    kicker: 'Tráfego pago',
    h1: 'Tráfego pago para médicos',
    h1Accent: 'que termina na agenda, não no clique',
    resposta: 'Tráfego pago para médicos é o uso de anúncios no Google e na Meta (Instagram e Facebook) para colocar o consultório diante de quem procura — ou ainda vai procurar — a especialidade. A ADR planeja as campanhas por especialidade, região e ticket, filtra o perfil particular e acompanha o resultado até o agendamento.',
    wa: 'Olá! Vim pela página de tráfego pago para médicos da ADR e quero entender como funcionaria para a minha clínica.',
    serviceName: 'Tráfego pago para médicos e clínicas',
    definicao: {
      titulo: 'O que é tráfego pago na medicina',
      texto: [
        'Tráfego pago é todo visitante que chega ao site, ao WhatsApp ou ao perfil da clínica por meio de um anúncio. Na saúde, ele funciona diferente do varejo: a decisão do paciente envolve confiança, as plataformas têm políticas específicas para temas de saúde e a publicidade médica segue a Resolução CFM nº 2.336/2023.',
        'Por isso a campanha não pode ser medida pelo clique. O que importa é quantos contatos viraram pacientes qualificados, quantos agendaram e quantos compareceram — e quanto custou cada etapa.',
      ],
      pontos: ['Google Ads: captura quem já procura a especialidade, o sintoma ou o procedimento', 'Meta Ads: constrói desejo e confiança em quem ainda não decidiu', 'Remarketing: reencontra quem visitou o site ou o perfil e ainda está pesquisando', 'Página de destino e WhatsApp preparados para receber o contato'],
    },
    quando: {
      titulo: 'Quando o tráfego pago faz sentido para a clínica',
      itens: [
        { t: 'Há capacidade de agenda', d: 'Anunciar com agenda lotada gera contato que não consegue horário. A campanha precisa caber na operação.' },
        { t: 'O ticket justifica o custo do contato', d: 'Consultas e procedimentos particulares sustentam o investimento; campanhas para convênio raramente se pagam.' },
        { t: 'Alguém responde rápido', d: 'O paciente que clica quer resposta enquanto ainda está com o celular na mão. Sem atendimento, a verba vira silêncio.' },
        { t: 'Existe paciência para maturar', d: 'Os primeiros meses ajustam público, termos e mensagens. Decidir com poucos dias de dados costuma levar à conclusão errada.' },
      ],
    },
    como: {
      titulo: 'Como a ADR conduz o tráfego pago',
      passos: [
        { t: 'Diagnóstico comercial prévio', d: 'Especialidade, região, concorrência, ticket e maturidade do atendimento definem se e como anunciar.' },
        { t: 'Estrutura por intenção', d: 'Campanhas separadas por tipo de demanda (consulta, procedimento, acompanhamento) e por canal, com palavras-chave negativas desde o início.' },
        { t: 'Filtro de público', d: 'Mensagens, segmentação e página feitas para atrair o paciente particular com perfil, não o curioso atrás de preço.' },
        { t: 'Acompanhamento até o agendamento', d: 'Investimento, contatos, qualificados e agendados reportados no WhatsApp da clínica, com ajustes contínuos.' },
      ],
    },
    cuidados: {
      titulo: 'Cuidados que a campanha médica exige',
      texto: 'Anúncio de saúde é avaliado duas vezes: pelas regras do CFM e pelas políticas de cada plataforma. A ADR revisa cada peça antes de subir.',
      itens: ['Sem promessa de resultado, preço promocional ou “antes e depois” fora das regras', 'Sem segmentar ou sugerir condições de saúde de quem vê o anúncio', 'Identificação do médico (nome, CRM e RQE quando houver) na comunicação', 'Nenhum dado clínico pedido em formulário ou WhatsApp'],
    },
    faq: [
      { q: 'Quanto investir em tráfego pago sendo médico?', a: 'Depende da especialidade, da concorrência na região, do custo por clique dos termos e da capacidade da agenda. O valor de mídia é pago direto ao Google e à Meta e é definido no diagnóstico, junto com a meta de custo por paciente agendado — não por clique.' },
      { q: 'Em quanto tempo o tráfego pago traz pacientes?', a: 'Os primeiros contatos costumam surgir logo que a campanha é ativada, mas a estabilidade vem depois de algumas semanas de ajuste de termos, público e atendimento. O desempenho varia com especialidade, região, investimento e qualidade do comercial; não existe prazo garantido.' },
      { q: 'Google Ads ou Meta Ads: por onde começar?', a: 'Quando existe busca ativa pela especialidade ou procedimento, o Google costuma ser o primeiro canal. Procedimentos eletivos e decisões longas pedem a Meta para construir confiança. Na maioria das especialidades os dois atuam juntos, em papéis diferentes.' },
      { q: 'A ADR atende clínicas de qualquer cidade?', a: 'Sim. A operação é remota e atende médicos e clínicas em todo o Brasil; as campanhas são segmentadas pela região onde a clínica atende.' },
    ],
    relacionados: [
      { label: 'Google Ads para médicos', href: '/google-ads-para-medicos/', text: 'Campanhas para quem já procura a especialidade.' },
      { label: 'Meta Ads para médicos', href: '/meta-ads-para-medicos/', text: 'Instagram e Facebook dentro das regras do CFM.' },
      { label: 'Quanto investir em marketing médico', href: '/blog/quanto-investir-em-marketing-medico/', text: 'Como planejar a verba de mídia.' },
      { label: 'Metodologia ADR', href: '/metodologia/', text: 'Do diagnóstico ao paciente na cadeira.' },
    ],
  },

  'google-ads-para-medicos': {
    slug: 'google-ads-para-medicos',
    title: 'Google Ads para Médicos e Clínicas | ADR Marketing',
    description: 'Google Ads para médicos: campanhas de pesquisa por especialidade e região, palavras-chave negativas, política de saúde do Google e foco em agendamento.',
    kicker: 'Google Ads',
    h1: 'Google Ads para médicos',
    h1Accent: 'para quem já está procurando você',
    resposta: 'Google Ads para médicos são anúncios que aparecem quando alguém pesquisa a especialidade, o sintoma ou o procedimento na sua região. É o canal de maior intenção: o paciente já reconheceu a necessidade e está escolhendo onde resolver. A ADR monta campanhas de pesquisa por tipo de demanda, filtra termos de convênio e curiosidade e mede o custo por agendamento.',
    wa: 'Olá! Vim pela página de Google Ads para médicos da ADR e quero avaliar campanhas para a minha clínica.',
    serviceName: 'Gestão de Google Ads para médicos e clínicas',
    definicao: {
      titulo: 'Como o Google Ads funciona para consultórios',
      texto: [
        'A clínica escolhe os termos pelos quais quer aparecer (por exemplo, “ginecologista em [cidade]” ou “consulta de endocrinologista particular”), define a região e o orçamento e paga quando alguém clica. A posição depende do lance e da qualidade do anúncio e da página.',
        'O ponto crítico na medicina é a correspondência de termos: sem uma lista de palavras-chave negativas bem cuidada, a verba vai para quem procura convênio, emprego, curso, faculdade ou informação sem intenção de consulta.',
      ],
      pontos: ['Campanhas de pesquisa por especialidade, procedimento e região', 'Palavras-chave negativas para convênio, vagas, cursos e termos sem intenção', 'Anúncios com identificação médica e sem promessa de resultado', 'Conversões medidas no clique do WhatsApp e no formulário, com o agendamento como meta'],
    },
    quando: {
      titulo: 'Para quais especialidades o Google Ads costuma pesar mais',
      itens: [
        { t: 'Busca por sintoma ou procedimento', d: 'Urologia, ortopedia, neurologia e cardiologia têm muita busca ativa por queixa, exame e procedimento.' },
        { t: 'Decisão rápida', d: 'Quem sente dor ou precisa de um exame decide em dias; aparecer na hora da busca faz diferença.' },
        { t: 'Tratamentos pesquisados pelo nome', d: 'Implantes, alinhadores, cirurgias plásticas e procedimentos dermatológicos são buscados pelo nome do tratamento.' },
        { t: 'Consultório com agenda ágil', d: 'O paciente do Google compara opções e agenda com quem responde primeiro.' },
      ],
    },
    como: {
      titulo: 'Como a ADR estrutura o Google Ads da clínica',
      passos: [
        { t: 'Pesquisa de termos e concorrência', d: 'Volume, custo por clique e intenção dos termos da especialidade na região, usando o Planejador de palavras-chave do Google.' },
        { t: 'Grupos por intenção', d: 'Consulta, procedimento e acompanhamento em grupos separados, cada um com anúncio e página coerentes.' },
        { t: 'Higiene da conta', d: 'Revisão semanal dos termos de pesquisa, negativas, horários e dispositivos que convertem.' },
        { t: 'Leitura pelo agendamento', d: 'O relatório mostra investimento, contatos, qualificados e agendados — não só cliques e impressões.' },
      ],
    },
    cuidados: {
      titulo: 'Política de saúde do Google e publicidade médica',
      texto: 'O Google restringe anúncios de medicamentos, alguns procedimentos e certos temas de saúde, e veda segmentação por condição de saúde. A Resolução CFM nº 2.336/2023 vale também para o texto do anúncio.',
      itens: ['Sem superlativos (“o melhor”, “referência”) nem promessa de cura', 'Sem preço promocional como chamariz', 'Sem remarketing baseado em condição de saúde do usuário', 'Página de destino com identificação do médico e política de privacidade'],
    },
    faq: [
      { q: 'Quanto custa o clique no Google Ads para médicos?', a: 'Varia por especialidade, cidade e concorrência. Termos genéricos de especialidade em capitais costumam ser mais caros que termos de procedimento em cidades menores. O número que importa é o custo por paciente agendado, calculado depois que a campanha gera contatos suficientes.' },
      { q: 'Preciso de site para anunciar no Google?', a: 'É necessária uma página de destino: pode ser o site da clínica ou uma landing page específica, rápida no celular, com informação clara, identificação do médico e botão de WhatsApp. Página lenta ou genérica encarece o clique e derruba a conversão.' },
      { q: 'Posso anunciar meu nome e especialidade no Google?', a: 'Pode, informando especialidade, formação e forma de atendimento, sem promessa de resultado e sem sensacionalismo. O texto precisa respeitar a publicidade médica e as políticas de saúde do Google.' },
      { q: 'O Google Ads substitui o Perfil da Empresa no Google?', a: 'Não. O Perfil da Empresa aparece no mapa e não exige verba de anúncio; o Google Ads compra espaço na página de resultados. Os dois se reforçam: quem vê o anúncio e um perfil bem avaliado confia mais.' },
    ],
    relacionados: [
      { label: 'Tráfego pago para médicos', href: '/trafego-pago-para-medicos/', text: 'Como Google e Meta trabalham juntos.' },
      { label: 'Google Ads ou Meta Ads para médicos', href: '/blog/google-ads-ou-meta-ads-para-medicos/', text: 'Artigo: qual canal faz sentido para a sua clínica.' },
      { label: 'SEO local para clínicas', href: '/blog/seo-local-para-clinicas/', text: 'Artigo: presença no mapa sem pagar por clique.' },
      { label: 'Marketing para urologistas', href: '/marketing-para-urologistas/', text: 'Especialidade em que a busca ativa pesa muito.' },
    ],
  },

  'meta-ads-para-medicos': {
    slug: 'meta-ads-para-medicos',
    title: 'Meta Ads para Médicos: Instagram e Facebook | ADR',
    description: 'Meta Ads para médicos: anúncios no Instagram e no Facebook para construir autoridade e gerar contatos particulares, dentro das regras do CFM e da Meta.',
    kicker: 'Meta Ads',
    h1: 'Meta Ads para médicos',
    h1Accent: 'autoridade antes da primeira consulta',
    resposta: 'Meta Ads para médicos são anúncios no Instagram e no Facebook que apresentam o médico a quem ainda não está procurando, mas tem o perfil do paciente ideal. Funcionam para construir confiança, educar sobre o tratamento e reencontrar quem já visitou o perfil. A ADR usa o canal com páginas de destino ou formulários para público novo e reserva o WhatsApp direto para o remarketing.',
    wa: 'Olá! Vim pela página de Meta Ads para médicos da ADR e quero entender como anunciar no Instagram com segurança.',
    serviceName: 'Gestão de Meta Ads para médicos e clínicas',
    definicao: {
      titulo: 'O papel do Instagram e do Facebook na decisão do paciente',
      texto: [
        'Antes de agendar, o paciente quase sempre confere o perfil do médico. Meta Ads coloca esse perfil diante das pessoas certas da região — por idade, localização e interesses permitidos — com conteúdo que explica o tratamento e mostra quem é o profissional.',
        'O canal tem duas restrições importantes: a Meta não permite anúncios que sugiram condições de saúde de quem vê, e a publicidade médica veda promessa de resultado e “antes e depois” fora das regras. A comunicação fala do serviço, nunca do problema da pessoa.',
      ],
      pontos: ['Campanhas de reconhecimento e visita ao perfil para construir autoridade', 'Captação de contatos com página de destino ou formulário da própria Meta', 'Remarketing para quem interagiu com o perfil ou visitou o site', 'Criativos em vídeo com o médico, dentro das normas do CFM'],
    },
    quando: {
      titulo: 'Quando o Meta Ads costuma funcionar melhor',
      itens: [
        { t: 'Procedimentos eletivos', d: 'Dermatologia, cirurgia plástica, odontologia estética e nutrologia têm decisões longas, em que a confiança é construída no feed.' },
        { t: 'Especialidade com pouca busca', d: 'Onde quase ninguém pesquisa no Google, o Instagram cria a demanda que ainda não existe.' },
        { t: 'Médico que aparece', d: 'Vídeos com o próprio profissional explicando o tratamento costumam criar mais conexão que peças genéricas.' },
        { t: 'Recepção preparada', d: 'O contato do Instagram decide mais devagar e exige acompanhamento; sem follow-up ele esfria.' },
      ],
    },
    como: {
      titulo: 'Como a ADR estrutura o Meta Ads da clínica',
      passos: [
        { t: 'Posicionamento e mensagem', d: 'O que o médico quer ser lembrado por fazer, para quem e com qual linguagem permitida.' },
        { t: 'Funil por temperatura', d: 'Público novo vai para página de destino ou formulário; quem já interagiu recebe remarketing com convite para o WhatsApp.' },
        { t: 'Criativos revisados', d: 'Roteiros e peças avaliados contra a Resolução CFM nº 2.336/2023 e as políticas da Meta antes de subir.' },
        { t: 'Leitura pelo agendamento', d: 'Seguidores e engajamento acompanhados junto com contatos, qualificados e agendados — nunca isolados.' },
      ],
    },
    cuidados: {
      titulo: 'Regras da Meta e do CFM para anúncios de saúde',
      texto: 'Anúncios de saúde passam por revisão automática da Meta e podem ser reprovados ou limitados. A conta precisa de histórico limpo e criativos coerentes com as políticas.',
      itens: ['Nada de “você tem…?” ou frases que presumem condição de saúde de quem vê', 'Sem promessa de resultado nem “antes e depois” promocional', 'Imagens que não exponham pacientes nem sensacionalizem o tratamento', 'Formulários sem perguntas clínicas; dados sensíveis ficam para a consulta'],
    },
    faq: [
      { q: 'Vale anunciar no Instagram sendo médico?', a: 'Vale quando o objetivo está claro: construir autoridade, levar contatos qualificados para uma página ou reencontrar quem já conhece o perfil. Para especialidades de busca ativa, o Instagram costuma complementar o Google, não substituí-lo.' },
      { q: 'Posso usar o botão de WhatsApp nos anúncios?', a: 'Pode, mas para público que ainda não conhece o médico a conversa direta tende a trazer muito curioso. A ADR prefere página de destino ou formulário para público novo e o WhatsApp direto para remarketing, onde a intenção já é maior.' },
      { q: 'Impulsionar post é a mesma coisa que Meta Ads?', a: 'O impulsionamento é a forma mais simples de anunciar e oferece pouco controle de objetivo, público e medição. O Gerenciador de Anúncios permite estruturar campanhas por etapa da decisão e medir o que virou contato e agendamento.' },
      { q: 'Por que meu anúncio de saúde foi reprovado?', a: 'Os motivos mais comuns são frases que sugerem condição de saúde de quem vê, imagens de corpo ou de antes e depois e promessas de resultado. Ajustar o texto para falar do serviço e da avaliação médica costuma resolver.' },
    ],
    relacionados: [
      { label: 'Tráfego pago para médicos', href: '/trafego-pago-para-medicos/', text: 'Como Google e Meta trabalham juntos.' },
      { label: 'Autoridade digital para médicos', href: '/blog/autoridade-digital-para-medicos/', text: 'Artigo: presença que sustenta a decisão do paciente.' },
      { label: 'Marketing para dermatologistas', href: '/marketing-para-dermatologistas/', text: 'Especialidade em que o Instagram pesa na escolha.' },
      { label: 'Marketing para cirurgiões plásticos', href: '/marketing-para-cirurgioes-plasticos/', text: 'Remarketing durante meses de pesquisa.' },
    ],
  },

  'marketing-para-clinicas': {
    slug: 'marketing-para-clinicas',
    title: 'Marketing para Clínicas Médicas | ADR Marketing',
    description: 'Marketing para clínicas médicas: posicionamento, Google Ads, Meta Ads e estruturação da recepção para atrair pacientes particulares e reduzir perdas no WhatsApp.',
    kicker: 'Clínicas médicas',
    h1: 'Marketing para clínicas',
    h1Accent: 'do anúncio à recepção',
    resposta: 'Marketing para clínicas médicas é o trabalho integrado de posicionamento, mídia paga e atendimento que leva pacientes particulares do primeiro contato até a consulta. Em clínicas com mais de um médico ou especialidade, ele precisa organizar campanhas por serviço, padronizar o WhatsApp da recepção e medir cada etapa. É assim que a ADR trabalha, dentro das normas do CFM.',
    wa: 'Olá! Vim pela página de marketing para clínicas da ADR e quero um diagnóstico para a minha clínica.',
    serviceName: 'Assessoria de marketing para clínicas médicas',
    definicao: {
      titulo: 'O que muda no marketing de uma clínica',
      texto: [
        'Um consultório individual vende a confiança em um médico. Uma clínica vende a confiança em uma estrutura: várias agendas, especialidades com jornadas diferentes, uma recepção que atende tudo e, muitas vezes, convênio e particular convivendo no mesmo balcão.',
        'Por isso o marketing da clínica precisa ser mais organizado: campanhas separadas por especialidade ou serviço, mensagens coerentes entre os médicos, relatórios que mostram de onde vem cada paciente e um processo de atendimento que não depende de quem está no turno.',
      ],
      pontos: ['Posicionamento da clínica e dos médicos dentro das normas éticas', 'Campanhas por especialidade e serviço no Google e na Meta', 'Recepção e WhatsApp com roteiro, triagem e follow-up', 'Indicadores por origem: anúncio, perfil, indicação e retorno'],
    },
    quando: {
      titulo: 'Sinais de que o marketing da clínica precisa de estrutura',
      itens: [
        { t: 'Agenda irregular', d: 'Semanas cheias e semanas vazias, sem saber de onde vieram os pacientes de cada uma.' },
        { t: 'Dependência de indicação ou de convênio', d: 'O particular existe, mas chega por acaso, não por processo.' },
        { t: 'Contato que se perde', d: 'O WhatsApp recebe mensagens e a recepção não consegue responder, triar e acompanhar todas.' },
        { t: 'Assessorias trocadas', d: 'Campanhas que mudam a cada fornecedor, sem histórico nem indicador comum.' },
      ],
    },
    como: {
      titulo: 'Como a ADR trabalha com clínicas',
      passos: [
        { t: 'Diagnóstico da operação', d: 'Especialidades, ticket, capacidade de agenda, concorrência e maturidade da recepção.' },
        { t: 'Prioridade por serviço', d: 'Definição de quais especialidades e procedimentos recebem verba primeiro, conforme agenda e margem.' },
        { t: 'Mídia e comunicação', d: 'Google Ads, Meta Ads e posicionamento com mensagens próprias para cada serviço.' },
        { t: 'Comercial e relatórios', d: 'Treinamento de qualificação da recepção ou orientação para SDR, com indicadores mês a mês no WhatsApp.' },
      ],
    },
    cuidados: {
      titulo: 'Cuidados éticos e de dados na clínica',
      texto: 'A publicidade da clínica responde ao CFM e precisa identificar o diretor técnico. O atendimento lida com dados pessoais e, às vezes, de saúde, protegidos pela LGPD.',
      itens: ['Identificação do diretor técnico e dos médicos na comunicação', 'Sem promessa de resultado, preço promocional ou comparação com concorrentes', 'WhatsApp da clínica em aparelho e conta da empresa, com acesso restrito', 'Nada de dados clínicos em formulários ou mensagens de triagem'],
    },
    faq: [
      { q: 'O marketing da clínica deve focar na marca da clínica ou nos médicos?', a: 'Nos dois, em papéis diferentes. A marca da clínica dá segurança sobre estrutura e atendimento; os médicos dão o motivo da escolha. Campanhas por especialidade costumam apresentar o profissional, e a clínica sustenta a confiança.' },
      { q: 'Como dividir a verba entre especialidades?', a: 'Pelo cruzamento de ticket, capacidade de agenda e demanda na região. Especialidades com agenda livre e procedimento particular de valor costumam vir primeiro; as que já lotam pelo convênio entram depois.' },
      { q: 'A ADR treina a recepção da clínica?', a: 'A assessoria atua de forma consultiva na estruturação do comercial: roteiro de WhatsApp, triagem, follow-up e treinamento de qualificação para a recepção, ou orientação para implementar um SDR. Não é atendimento terceirizado.' },
      { q: 'Clínica pequena também pode ter esse trabalho?', a: 'Pode, desde que atenda pacientes particulares e tenha capacidade de agenda. O diagnóstico comercial prévio mostra se a parceria faz sentido antes de qualquer proposta.' },
    ],
    relacionados: [
      { label: 'Serviços da ADR', href: '/servicos/', text: 'As quatro frentes e o que cada uma inclui.' },
      { label: 'Atendimento no WhatsApp para clínicas', href: '/blog/atendimento-whatsapp-para-clinicas/', text: 'Artigo: do contato ao agendamento.' },
      { label: 'Por que clínicas perdem agendamentos', href: '/blog/por-que-clinicas-perdem-agendamentos/', text: 'Artigo: os pontos onde o contato se perde.' },
      { label: 'Marketing médico', href: '/marketing-medico/', text: 'O guia da ADR sobre marketing para saúde.' },
    ],
  },
};
