export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const;

type Utms = Record<string, string>;
let cache: Utms | null = null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// First-touch: a primeira visita com UTM manda; navegações internas preservam a origem.
export function captureUtms(): Utms {
  if (cache) return cache;
  try {
    const p = new URLSearchParams(window.location.search);
    const atual: Utms = {};
    UTM_KEYS.forEach((k) => {
      const v = p.get(k);
      if (v) atual[k] = v;
    });
    if (Object.keys(atual).length) {
      atual.landing_page = window.location.origin + window.location.pathname;
      if (document.referrer) atual.referrer = document.referrer;
      sessionStorage.setItem('adr_utm', JSON.stringify(atual));
      cache = atual;
    } else {
      cache = JSON.parse(sessionStorage.getItem('adr_utm') || '{}');
    }
  } catch {
    cache = {};
  }
  return cache!;
}

export function getUtms(): Utms {
  return cache || captureUtms();
}

// Eventos sem PII: só metadados de contexto, nunca nome/email/whatsapp.
export function track(event: string, extra: Record<string, unknown> = {}): void {
  try {
    const payload = { event, page_path: window.location.pathname, ...getUtms(), ...extra };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', event, payload);
  } catch {
    /* rastreio nunca deve quebrar o fluxo */
  }
}

// Anexa a origem da visita aos links de WhatsApp e registra o clique uma única vez.
export function bindWhatsAppLinks(): void {
  const utm = getUtms();
  const links = document.querySelectorAll<HTMLAnchorElement>('a[data-wa]');
  links.forEach((a) => {
    if (a.dataset.waBound) return;
    a.dataset.waBound = '1';
    try {
      const u = new URL(a.href);
      UTM_KEYS.forEach((k) => {
        if (utm[k]) u.searchParams.set(k, utm[k]);
      });
      a.href = u.toString();
    } catch {
      /* link inválido: mantém */
    }
    a.addEventListener('click', () => track('whatsapp_click', { cta_id: a.dataset.wa || 'whatsapp' }));
  });
}
