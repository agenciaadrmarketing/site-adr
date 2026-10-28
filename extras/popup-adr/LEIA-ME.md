# Popup de análise gratuita — ADR Marketing

Pacote independente do popup "Receba sua análise gratuita de marketing" do site
agenciaadrmarketing.com, para instalar em outra página ou landing page. Não depende de
Astro, WordPress ou qualquer biblioteca.

O comportamento é o mesmo do site:

- mesmos campos (nome, e-mail opcional, WhatsApp, especialidade, pacientes/mês);
- envio para a **mesma planilha** (Google Apps Script), com UTMs, `gclid`, `fbclid` e a página de origem;
- trava contra clique duplo (4 s), campo invisível anti-robô e validação de WhatsApp com DDD;
- depois do envio, abre o WhatsApp da ADR (+55 48 98880-9542) com a mensagem e as UTMs;
- popup de saída no computador (uma vez por sessão);
- eventos no `dataLayer` para o Google Tag Manager, **sem nome, e-mail ou telefone**.

## O que vem no zip

| Arquivo | Para que serve |
|---|---|
| `adr-popup.js` | O popup completo. É o único arquivo que precisa ser chamado na página |
| `adr-popup.css` | Estilos (carregado automaticamente pelo `adr-popup.js`) |
| `logo-adr.webp` | Logo exibido no topo do popup |
| `fonts/` | Fonte Poppins usada pelo popup |
| `demo.html` | Página de teste, em modo que **não envia** nada para a planilha |
| `LEIA-ME.md` | Este arquivo |

## Instalação em 3 passos

1. **Suba a pasta.** Extraia o zip e envie a pasta `adr-popup` inteira para a raiz do site
   (no Gerenciador de Arquivos da Hostinger: dentro de `public_html`). O endereço do script
   fica `https://seusite.com/adr-popup/adr-popup.js`.

2. **Chame o script** uma vez por página, antes de `</body>`:

   ```html
   <script src="/adr-popup/adr-popup.js" defer></script>
   ```

3. **Ligue os botões.** Qualquer botão ou link com `data-adr-popup` abre o popup. O valor
   aparece no evento como `cta_id`, para saber qual botão gerou o contato:

   ```html
   <a href="#" data-adr-popup="hero">Pedir análise gratuita</a>
   <button type="button" data-adr-popup="rodape">Quero minha análise</button>
   ```

   Também dá para abrir por código: `ADRPopup.abrir('nome-do-botao')` e fechar com `ADRPopup.fechar()`.

Para testar antes de publicar, abra `https://seusite.com/adr-popup/demo.html`.

**WordPress:** suba a pasta pela hospedagem e cole a linha do passo 2 com um plugin de
"códigos no rodapé" (por exemplo, WPCode). **Google Tag Manager:** dá para colar a linha do
passo 2 numa tag "HTML personalizado" disparada em todas as páginas.

**Não instale no próprio agenciaadrmarketing.com:** o site já tem esse popup e ficaria duplicado.

## Opções (atributos no `<script>`)

Todas são opcionais. Sem nenhuma, o popup usa os dados da ADR.

| Atributo | Padrão | O que muda |
|---|---|---|
| `data-origem` | `modal` | Valor gravado na coluna `origem_form` da planilha (ex.: `lp-cardiologia`) |
| `data-saida` | ligado | `off` desliga o popup de saída |
| `data-mensagem` | "Olá! Vim pelo site da ADR e gostaria de conversar sobre o marketing da minha clínica." | Mensagem que já vem escrita no WhatsApp |
| `data-whatsapp` | `5548988809542` | Número que recebe o contato (com DDI e DDD) |
| `data-privacidade` | `https://agenciaadrmarketing.com/politica-de-privacidade/` | Link da política de privacidade no rodapé do formulário |
| `data-endpoint` | Apps Script da ADR | Outro destino para os dados (outra planilha) |
| `data-logo` | `logo-adr.webp` da pasta | Outro logo |
| `data-css` | `adr-popup.css` da pasta | Outro arquivo de estilo, ou `off` para não carregar nenhum |
| `data-modo` | — | `teste` preenche e mostra tudo, mas não envia à planilha |

Exemplo para uma landing page de cardiologia, sem popup de saída:

```html
<script src="/adr-popup/adr-popup.js" data-origem="lp-cardiologia" data-saida="off"
  data-mensagem="Olá! Vim pela página de cardiologia e quero uma análise." defer></script>
```

## Eventos enviados ao `dataLayer`

| Evento | Tipo (`event_type`) | Quando |
|---|---|---|
| `lead_modal_open` | interacao | O popup abre (`cta_id` = botão que abriu, ou `exit_intent`) |
| `exit_intent_popup` | interacao | O popup de saída aparece |
| `form_start` | interacao | O visitante clica no primeiro campo |
| `lead_form_submit` | envio_formulario | Envio válido (com `especialidade` e `pacientes_mes`, nunca dados pessoais) |
| `form_submit_error` | erro | Falha técnica no envio |

Se a página tiver `gtag` ou o Pixel da Meta, o popup também envia `generate_lead` e `Lead`.

## Cuidados

- O envio para a planilha é **real** (exceto em `data-modo="teste"`). Faça o primeiro teste
  de verdade com dados seus e confira se a linha chegou.
- A página onde o popup for instalado precisa de uma política de privacidade que cubra o
  formulário e o WhatsApp. O link padrão aponta para a política da ADR.
- Os dados seguem para o Apps Script pela URL (método GET), como no site. É o mesmo
  comportamento atual; a troca para POST depende de alterar o script na conta Google.
- Cada envio chega ao Apps Script duas vezes, com o mesmo valor no campo `t` (uma requisição
  de imagem e um reforço por `fetch`), exatamente como no site. Se a planilha mostrar linhas
  repetidas, o `t` igual identifica que é o mesmo contato.
