import { captureUtms, getUtms, track, UTM_KEYS } from './track';

// Integração existente e funcional: Google Apps Script → planilha + e-mail de aviso.
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzqLdnJWGEY1hYPVpeBH5udSqOPAHf3uYLVxKR8wp86PVsUvDazDPHSPTXJV4DrqgY/exec';
const WA_PHONE = '5548988809542';
const WA_TEXT = 'Olá! Vim pelo site da ADR e gostaria de conversar sobre o marketing da minha clínica.';

let enviando = false;
let tEnvio: number | undefined;

function montarLink(): string {
  const p = new URLSearchParams({ phone: WA_PHONE, text: WA_TEXT });
  const u = getUtms();
  UTM_KEYS.forEach((k) => {
    if (u[k]) p.set(k, u[k]);
  });
  return `https://api.whatsapp.com/send/?${p.toString()}`;
}

// GET disfarçado de imagem (imune ao bloqueio de CORS do Google) + fetch
// no-cors como reforço. Não esperamos resposta: o WhatsApp abre na hora.
function enviarPlanilha(dados: Record<string, string>): void {
  const u = getUtms();
  const campos: Record<string, string> = {
    ...dados,
    utm_source: u.utm_source || '',
    utm_medium: u.utm_medium || '',
    utm_campaign: u.utm_campaign || '',
    utm_term: u.utm_term || '',
    utm_content: u.utm_content || '',
    gclid: u.gclid || '',
    fbclid: u.fbclid || '',
    pagina: window.location.href,
    t: String(Date.now()),
  };
  const qs = Object.keys(campos)
    .map((k) => `${k}=${encodeURIComponent(campos[k] ?? '')}`)
    .join('&');
  const alvo = `${ENDPOINT}?${qs}`;
  try {
    const ping = new Image();
    ping.referrerPolicy = 'no-referrer-when-downgrade';
    ping.src = alvo;
    (window as unknown as { __adrPing?: HTMLImageElement }).__adrPing = ping;
    fetch(alvo, { mode: 'no-cors', keepalive: true }).catch(() =>
      track('form_submit_error', { form_location: dados.origem_form }),
    );
  } catch {
    track('form_submit_error', { form_location: dados.origem_form });
  }
}

// Trava contra clique duplo — evita linha duplicada na planilha.
function travarEnvio(botao: HTMLButtonElement | null): boolean {
  if (enviando) return false;
  enviando = true;
  let rotulo = '';
  if (botao) {
    rotulo = botao.innerHTML;
    botao.disabled = true;
    botao.textContent = 'Enviando…';
  }
  window.clearTimeout(tEnvio);
  tEnvio = window.setTimeout(() => {
    enviando = false;
    if (botao) {
      botao.disabled = false;
      botao.innerHTML = rotulo;
    }
  }, 4000);
  return true;
}

// Link real em vez de window.open: escapa de iframe e de bloqueio de pop-up.
function abrirAba(url: string): void {
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 0);
  } catch {
    try {
      window.open(url, '_blank', 'noopener');
    } catch {
      /* ignore */
    }
  }
}

function valor(form: HTMLFormElement, name: string): string {
  const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
  return el && 'value' in el ? el.value.trim() : '';
}

function bind(form: HTMLFormElement): void {
  const origem = form.dataset.origem || 'secao_analise';
  const wrap = form.closest<HTMLElement>('[data-lead]') || form.parentElement!;
  const sucesso = wrap.querySelector<HTMLElement>('[data-lead-success]');
  const status = form.querySelector<HTMLElement>('[data-lead-status]');
  let iniciou = false;

  form.addEventListener(
    'focusin',
    () => {
      if (iniciou) return;
      iniciou = true;
      track('form_start', { form_location: origem });
    },
    { once: true },
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (valor(form, 'site')) return; // honeypot
    if (!form.reportValidity()) return;
    const fone = valor(form, 'fone').replace(/\D/g, '');
    if (fone.length < 10) {
      if (status) {
        status.textContent = 'Informe um WhatsApp com DDD.';
        status.dataset.tone = 'erro';
      }
      (form.elements.namedItem('fone') as HTMLInputElement)?.focus();
      return;
    }
    const botao = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!travarEnvio(botao)) return;
    if (status) {
      status.textContent = '';
      delete status.dataset.tone;
    }

    const dados = {
      nome: valor(form, 'nome'),
      email: valor(form, 'email'),
      whatsapp: valor(form, 'fone'),
      especialidade: valor(form, 'area'),
      pacientes_mes: valor(form, 'fat'),
      origem_form: origem,
    };
    const url = montarLink();
    enviarPlanilha(dados);
    track('lead_form_submit', { form_location: origem, especialidade: dados.especialidade, pacientes_mes: dados.pacientes_mes });
    try {
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_location: origem });
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { form_location: origem });
    } catch {
      /* ignore */
    }
    abrirAba(url);

    if (sucesso) {
      const link = sucesso.querySelector<HTMLAnchorElement>('[data-lead-wa]');
      if (link) link.href = url;
      form.hidden = true;
      sucesso.hidden = false;
      sucesso.querySelector<HTMLElement>('h3, h2, a')?.focus?.();
    }
  });
}

captureUtms();
document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach(bind);
