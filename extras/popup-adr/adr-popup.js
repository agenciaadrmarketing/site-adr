/*!
 * ADR Marketing — popup de análise gratuita (pacote independente)
 *
 * Instalação: <script src="/adr-popup/adr-popup.js" defer></script> antes de </body>.
 * Qualquer elemento com data-adr-popup abre o popup. Detalhes no LEIA-ME.md.
 *
 * Mesmo comportamento do formulário do site agenciaadrmarketing.com:
 * envio para a planilha (Google Apps Script), UTMs first-touch, trava contra
 * clique duplo, honeypot, validação de DDD, abertura do WhatsApp e eventos no
 * dataLayer sem dados pessoais.
 */
(function () {
  'use strict';
  if (window.ADRPopup) return;

  var script = document.currentScript || document.querySelector('script[src*="adr-popup.js"]');
  var ds = (script && script.dataset) || {};
  var base = script && script.src ? script.src.replace(/[^/]*$/, '') : '';

  var CFG = {
    endpoint: ds.endpoint || 'https://script.google.com/macros/s/AKfycbzqLdnJWGEY1hYPVpeBH5udSqOPAHf3uYLVxKR8wp86PVsUvDazDPHSPTXJV4DrqgY/exec',
    whatsapp: (ds.whatsapp || '5548988809542').replace(/\D/g, ''),
    mensagem: ds.mensagem || 'Olá! Vim pelo site da ADR e gostaria de conversar sobre o marketing da minha clínica.',
    privacidade: ds.privacidade || 'https://agenciaadrmarketing.com/politica-de-privacidade/',
    logo: ds.logo || base + 'logo-adr.webp',
    css: ds.css === 'off' ? '' : ds.css || base + 'adr-popup.css',
    origem: ds.origem || 'modal',
    saida: ds.saida !== 'off',
    teste: ds.modo === 'teste',
  };

  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
  var TIPO = { lead_modal_open: 'interacao', exit_intent_popup: 'interacao', form_start: 'interacao', lead_form_submit: 'envio_formulario', form_submit_error: 'erro' };

  /* ── UTMs (first-touch, mesma chave do site) ─────────────────── */
  var utmCache = null;
  function getUtms() {
    if (utmCache) return utmCache;
    try {
      var p = new URLSearchParams(window.location.search);
      var atual = {};
      UTM_KEYS.forEach(function (k) { var v = p.get(k); if (v) atual[k] = v; });
      if (Object.keys(atual).length) {
        atual.landing_page = window.location.origin + window.location.pathname;
        if (document.referrer) atual.referrer = document.referrer;
        sessionStorage.setItem('adr_utm', JSON.stringify(atual));
        utmCache = atual;
      } else {
        utmCache = JSON.parse(sessionStorage.getItem('adr_utm') || '{}');
      }
    } catch (e) { utmCache = {}; }
    return utmCache;
  }

  /* ── Eventos (sem PII) ─────────────────────────────────────────── */
  function track(event, extra) {
    try {
      var payload = { event: event, event_type: TIPO[event] || 'interacao', page_path: window.location.pathname };
      var u = getUtms();
      Object.keys(u).forEach(function (k) { payload[k] = u[k]; });
      Object.keys(extra || {}).forEach(function (k) { payload[k] = extra[k]; });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
      if (typeof window.gtag === 'function') window.gtag('event', event, payload);
    } catch (e) { /* rastreio nunca quebra o fluxo */ }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  /* ── Estilos ───────────────────────────────────────────────────── */
  function injetarCss() {
    if (!CFG.css || document.querySelector('link[data-adrp-css]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = CFG.css;
    l.setAttribute('data-adrp-css', '');
    document.head.appendChild(l);
  }

  /* ── Marcação ──────────────────────────────────────────────────── */
  var WA_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';

  function marcacao() {
    return (
      '<div class="adrp-bg" data-adrp-close></div>' +
      '<div class="adrp-card" role="dialog" aria-modal="true" aria-labelledby="adrp-title">' +
        '<button type="button" class="adrp-close" data-adrp-close aria-label="Fechar">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
        '</button>' +
        '<img class="adrp-logo" src="' + esc(CFG.logo) + '" alt="ADR Marketing" width="240" height="148" decoding="async">' +
        '<h2 class="adrp-title" id="adrp-title">Receba sua <span class="adrp-silver">análise gratuita</span> de marketing</h2>' +
        '<p class="adrp-text">Preencha seus dados e um especialista te chama no WhatsApp em horário comercial — sem compromisso e sem custo.</p>' +
        '<div class="adrp-body">' +
          '<form class="adrp-form-wrap" novalidate aria-labelledby="adrp-form-title">' +
            '<h3 class="adrp-sr" id="adrp-form-title">Solicite uma análise gratuita</h3>' +
            '<div class="adrp-form">' +
              '<label class="adrp-field"><span class="adrp-label">Nome completo</span><input class="adrp-input" name="nome" type="text" required autocomplete="name" placeholder="Dr. / Dra." maxlength="120"></label>' +
              '<label class="adrp-field"><span class="adrp-label">Email (opcional)</span><input class="adrp-input" name="email" type="email" autocomplete="email" placeholder="Seu melhor email" maxlength="160"></label>' +
              '<label class="adrp-field"><span class="adrp-label">WhatsApp</span><input class="adrp-input" name="fone" type="tel" required autocomplete="tel" inputmode="tel" placeholder="(00) 00000-0000" maxlength="20"></label>' +
              '<div class="adrp-row">' +
                '<label class="adrp-field"><span class="adrp-label">Especialidade</span><select class="adrp-input" name="area" required><option value="">Selecione</option><option>Clínica médica</option><option>Consultório médico</option><option>Outra área da saúde</option></select></label>' +
                '<label class="adrp-field"><span class="adrp-label">Pacientes/mês</span><select class="adrp-input" name="fat" required><option value="">Selecione</option><option>Até 20 pacientes</option><option>20 a 50 pacientes</option><option>50 a 120 pacientes</option><option>Acima de 120 pacientes</option></select></label>' +
              '</div>' +
              '<label class="adrp-hp" aria-hidden="true">Site<input type="text" name="site" tabindex="-1" autocomplete="off"></label>' +
              '<p class="adrp-status" data-adrp-status aria-live="polite"></p>' +
              '<button class="adrp-btn adrp-btn--light" type="submit">Receber minha análise gratuita' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
              '</button>' +
            '</div>' +
            '<p class="adrp-note">' +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
              '<span>Seus dados estão seguros e seguem a <a href="' + esc(CFG.privacidade) + '" target="_blank" rel="noopener">política de privacidade</a>.</span>' +
            '</p>' +
          '</form>' +
          '<div class="adrp-ok" data-adrp-ok hidden>' +
            '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>' +
            '<h3 tabindex="-1">Recebemos seus dados</h3>' +
            '<p>Vamos continuar por WhatsApp. Se a janela não abriu, toque no botão abaixo.</p>' +
            '<a class="adrp-btn adrp-btn--wa" href="#" target="_blank" rel="noopener" data-adrp-wa>' + WA_SVG + 'Abrir o WhatsApp</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Abrir / fechar ────────────────────────────────────────────── */
  var raiz = null;
  var ultimoFoco = null;
  var overflowAntes = '';

  function construir() {
    if (raiz) return raiz;
    raiz = document.createElement('div');
    raiz.className = 'adrp';
    raiz.hidden = true;
    raiz.innerHTML = marcacao();
    document.body.appendChild(raiz);
    raiz.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-adrp-close]')) fechar();
    });
    raiz.addEventListener('keydown', prenderFoco);
    ligarFormulario(raiz.querySelector('form'));
    return raiz;
  }

  function focaveis() {
    return Array.prototype.filter.call(
      raiz.querySelectorAll('a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function prenderFoco(e) {
    if (e.key === 'Escape') { fechar(); return; }
    if (e.key !== 'Tab') return;
    var f = focaveis();
    if (!f.length) return;
    var primeiro = f[0];
    var ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }

  function abrir(origem) {
    construir();
    if (!raiz.hidden) return;
    ultimoFoco = document.activeElement;
    raiz.hidden = false;
    overflowAntes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    track('lead_modal_open', { cta_id: origem || 'cta' });
    window.setTimeout(function () {
      var alvo = raiz.querySelector('[data-adrp-ok]:not([hidden]) h3') || raiz.querySelector('input[name="nome"]');
      if (alvo) alvo.focus();
    }, 60);
  }

  function fechar() {
    if (!raiz || raiz.hidden) return;
    raiz.hidden = true;
    document.body.style.overflow = overflowAntes;
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  /* ── Formulário ────────────────────────────────────────────────── */
  var enviando = false;
  var tEnvio;

  function linkWhatsApp() {
    var p = new URLSearchParams({ phone: CFG.whatsapp, text: CFG.mensagem });
    var u = getUtms();
    UTM_KEYS.forEach(function (k) { if (u[k]) p.set(k, u[k]); });
    return 'https://api.whatsapp.com/send/?' + p.toString();
  }

  // GET disfarçado de imagem (imune a CORS) + fetch no-cors como reforço.
  function enviarPlanilha(dados) {
    var u = getUtms();
    var campos = {
      nome: dados.nome, email: dados.email, whatsapp: dados.whatsapp,
      especialidade: dados.especialidade, pacientes_mes: dados.pacientes_mes, origem_form: dados.origem_form,
      utm_source: u.utm_source || '', utm_medium: u.utm_medium || '', utm_campaign: u.utm_campaign || '',
      utm_term: u.utm_term || '', utm_content: u.utm_content || '', gclid: u.gclid || '', fbclid: u.fbclid || '',
      pagina: window.location.href, t: String(Date.now()),
    };
    var qs = Object.keys(campos).map(function (k) { return k + '=' + encodeURIComponent(campos[k] == null ? '' : campos[k]); }).join('&');
    var alvo = CFG.endpoint + (CFG.endpoint.indexOf('?') === -1 ? '?' : '&') + qs;
    if (CFG.teste) {
      if (window.console) console.info('[ADR popup] modo teste: nada foi enviado à planilha.', { origem_form: campos.origem_form, pagina: campos.pagina });
      return;
    }
    try {
      var ping = new Image();
      ping.referrerPolicy = 'no-referrer-when-downgrade';
      ping.src = alvo;
      window.__adrpPing = ping;
      if (window.fetch) {
        fetch(alvo, { mode: 'no-cors', keepalive: true }).catch(function () { track('form_submit_error', { form_location: dados.origem_form }); });
      }
    } catch (e) {
      track('form_submit_error', { form_location: dados.origem_form });
    }
  }

  function travarEnvio(botao) {
    if (enviando) return false;
    enviando = true;
    var rotulo = botao ? botao.innerHTML : '';
    if (botao) { botao.disabled = true; botao.textContent = 'Enviando…'; }
    window.clearTimeout(tEnvio);
    tEnvio = window.setTimeout(function () {
      enviando = false;
      if (botao) { botao.disabled = false; botao.innerHTML = rotulo; }
    }, 4000);
    return true;
  }

  // Link real em vez de window.open: escapa de bloqueio de pop-up.
  function abrirAba(url) {
    try {
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { a.remove(); }, 0);
    } catch (e) {
      try { window.open(url, '_blank', 'noopener'); } catch (e2) { /* ignore */ }
    }
  }

  function valor(form, nome) {
    var el = form.elements.namedItem(nome);
    return el && 'value' in el ? String(el.value).trim() : '';
  }

  function ligarFormulario(form) {
    var status = form.querySelector('[data-adrp-status]');
    var sucesso = raiz.querySelector('[data-adrp-ok]');
    var iniciou = false;

    form.addEventListener('focusin', function () {
      if (iniciou) return;
      iniciou = true;
      track('form_start', { form_location: CFG.origem });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (valor(form, 'site')) return; // honeypot
      if (!form.reportValidity()) return;
      var fone = valor(form, 'fone').replace(/\D/g, '');
      if (fone.length < 10) {
        status.textContent = 'Informe um WhatsApp com DDD.';
        status.setAttribute('data-tone', 'erro');
        var campo = form.elements.namedItem('fone');
        if (campo) campo.focus();
        return;
      }
      var botao = form.querySelector('button[type="submit"]');
      if (!travarEnvio(botao)) return;
      status.textContent = '';
      status.removeAttribute('data-tone');

      var dados = {
        nome: valor(form, 'nome'),
        email: valor(form, 'email'),
        whatsapp: valor(form, 'fone'),
        especialidade: valor(form, 'area'),
        pacientes_mes: valor(form, 'fat'),
        origem_form: CFG.origem,
      };
      var url = linkWhatsApp();
      enviarPlanilha(dados);
      track('lead_form_submit', { form_location: CFG.origem, especialidade: dados.especialidade, pacientes_mes: dados.pacientes_mes });
      try {
        if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_location: CFG.origem });
        if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { form_location: CFG.origem });
      } catch (err) { /* ignore */ }
      abrirAba(url);

      var link = sucesso.querySelector('[data-adrp-wa]');
      if (link) link.href = url;
      form.hidden = true;
      sucesso.hidden = false;
      var h = sucesso.querySelector('h3');
      if (h) h.focus();
    });
  }

  /* ── Gatilhos ──────────────────────────────────────────────────── */
  function iniciar() {
    getUtms();
    injetarCss();

    // Botões e links com data-adr-popup (o valor vira o cta_id do evento).
    document.addEventListener('click', function (e) {
      var g = e.target.closest && e.target.closest('[data-adr-popup]');
      if (!g) return;
      e.preventDefault();
      abrir(g.getAttribute('data-adr-popup') || (g.textContent || '').trim().slice(0, 40) || 'cta');
    });

    // Popup de saída: só em telas com mouse, uma vez por sessão.
    var temMouse = window.matchMedia ? window.matchMedia('(hover: hover)').matches : false;
    var jaMostrou = false;
    try { jaMostrou = sessionStorage.getItem('adr_saida') === 'on'; } catch (e) { /* ignore */ }
    if (CFG.saida && temMouse && !jaMostrou) {
      var onSaida = function (e) {
        if (e.clientY > 0 || (raiz && !raiz.hidden)) return;
        document.removeEventListener('mouseleave', onSaida);
        try { sessionStorage.setItem('adr_saida', 'on'); } catch (err) { /* ignore */ }
        track('exit_intent_popup');
        abrir('exit_intent');
      };
      document.addEventListener('mouseleave', onSaida);
    }
  }

  window.ADRPopup = { abrir: abrir, fechar: fechar };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
