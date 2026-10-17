import { bindWhatsAppLinks, bindCtaClicks, track } from './track';

const mq = (q: string) => (window.matchMedia ? window.matchMedia(q).matches : false);
const reduced = mq('(prefers-reduced-motion: reduce)');
const semHover = mq('(hover: none)');

document.documentElement.classList.add('js');
bindWhatsAppLinks();
bindCtaClicks();

/* ── Menu mobile ─────────────────────────────────────────────── */
(() => {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const drawer = document.getElementById('menu-drawer');
  if (!btn || !drawer) return;
  const set = (aberto: boolean) => {
    drawer.hidden = !aberto;
    btn.setAttribute('aria-expanded', String(aberto));
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    btn.classList.toggle('is-open', aberto);
  };
  btn.addEventListener('click', () => set(drawer.hidden));
  drawer.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) set(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 940 && !drawer.hidden) set(false);
  });
})();

/* ── Modal de captação ───────────────────────────────────────── */
const modal = document.querySelector<HTMLElement>('[data-modal]');
let ultimoFoco: HTMLElement | null = null;
export function abrirModal(origem = 'cta'): void {
  if (!modal) return;
  ultimoFoco = document.activeElement as HTMLElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  track('lead_modal_open', { cta_id: origem });
  window.setTimeout(() => modal.querySelector<HTMLElement>('input[name="nome"]')?.focus(), 60);
}
export function fecharModal(): void {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  ultimoFoco?.focus?.();
}
if (modal) {
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const gatilho = t.closest<HTMLElement>('[data-open-modal]');
    if (gatilho) {
      e.preventDefault();
      abrirModal(gatilho.dataset.openModal || gatilho.textContent?.trim().slice(0, 40) || 'cta');
      return;
    }
    if (t.closest('[data-close-modal]')) fecharModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
}

/* ── Barra de progresso + trilho do método (um listener de scroll) ── */
(() => {
  const barra = document.querySelector<HTMLElement>('[data-progress]');
  const tBox = document.querySelector<HTMLElement>('[data-trail]');
  const tFill = tBox?.querySelector<HTMLElement>('[data-trail-fill]');
  if (!barra && !tBox) return;
  let travado = false;
  let vBarra = '';
  let vTrilho = '';
  const pintar = () => {
    travado = false;
    if (barra) {
      const alcance = document.documentElement.scrollHeight - window.innerHeight;
      const v = (alcance > 0 ? (window.scrollY / alcance) * 100 : 0).toFixed(2) + '%';
      if (v !== vBarra) {
        barra.style.width = v;
        vBarra = v;
      }
    }
    if (tBox && tFill) {
      const r = tBox.getBoundingClientRect();
      if (r.bottom > -200 && r.top < window.innerHeight + 200) {
        const p = Math.max(0, Math.min(1, (window.innerHeight * 0.62 - r.top) / Math.max(1, r.height * 0.82)));
        const v = (p * 100).toFixed(1) + '%';
        if (v !== vTrilho) {
          tFill.style.height = v;
          tFill.style.opacity = p > 0.005 ? '1' : '0';
          vTrilho = v;
        }
      }
    }
  };
  const onScroll = () => {
    if (travado) return;
    travado = true;
    requestAnimationFrame(pintar);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();

/* ── Revelação no scroll (só opacity/transform: CLS zero) ────── */
(() => {
  const alvos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!alvos.length) return;
  if (reduced || typeof IntersectionObserver !== 'function') {
    alvos.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const contagem = new Map<Node, number>();
  alvos.forEach((el) => {
    const pai = el.parentNode!;
    const ordem = contagem.get(pai) || 0;
    contagem.set(pai, ordem + 1);
    el.style.transitionDelay = `${Math.min(ordem, 5) * 95}ms`;
  });
  const io = new IntersectionObserver(
    (ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.04 },
  );
  alvos.forEach((el) => io.observe(el));
  // Rede de segurança: nada fica invisível se o observer não disparar.
  window.setTimeout(() => {
    alvos.forEach((el) => {
      if (el.getBoundingClientRect().top <= window.innerHeight) el.classList.add('is-in');
    });
  }, 1800);
})();

/* ── Animações só com a seção na tela (CPU/bateria no mobile) ── */
(() => {
  if (typeof IntersectionObserver !== 'function') return;
  const escopos = Array.from(document.querySelectorAll<HTMLElement>('[data-anim-scope]'));
  if (!escopos.length) return;
  const io = new IntersectionObserver(
    (ents) => {
      ents.forEach((e) => {
        const estado = e.isIntersecting ? 'running' : 'paused';
        e.target.querySelectorAll<HTMLElement>('[data-anim], .marquee').forEach((el) => {
          el.style.animationPlayState = estado;
        });
      });
    },
    { rootMargin: '140px 0px' },
  );
  escopos.forEach((el) => {
    el.querySelectorAll<HTMLElement>('[data-anim], .marquee').forEach((a) => (a.style.animationPlayState = 'paused'));
    io.observe(el);
  });
})();

/* ── FAQ: <details> com altura animada e um aberto por vez ───── */
(() => {
  const itens = Array.from(document.querySelectorAll<HTMLDetailsElement & { _fechar?: () => void }>('details.faq__item'));
  if (!itens.length) return;
  itens.forEach((det) => {
    const sum = det.querySelector<HTMLElement>('summary');
    const corpo = sum?.nextElementSibling as HTMLElement | null;
    if (!sum || !corpo) return;
    const caixa = document.createElement('div');
    caixa.style.cssText = 'overflow:hidden; height:0; opacity:0';
    corpo.parentNode!.insertBefore(caixa, corpo);
    caixa.appendChild(corpo);
    let t: number | undefined;
    const abrir = () => {
      caixa.style.transition = reduced ? 'none' : 'height .52s cubic-bezier(.22,1,.36,1), opacity .42s ease';
      caixa.style.opacity = '1';
      caixa.style.height = corpo.scrollHeight + 'px';
      window.clearTimeout(t);
      t = window.setTimeout(() => { if (det.open) caixa.style.height = 'auto'; }, reduced ? 0 : 540);
    };
    const fechar = () => {
      window.clearTimeout(t);
      caixa.style.transition = 'none';
      caixa.style.height = caixa.scrollHeight + 'px';
      void caixa.offsetHeight;
      caixa.style.transition = reduced ? 'none' : 'height .42s cubic-bezier(.4,0,.2,1), opacity .26s ease';
      caixa.style.height = '0px';
      caixa.style.opacity = '0';
      t = window.setTimeout(() => { det.open = false; }, reduced ? 0 : 430);
    };
    det._fechar = fechar;
    sum.addEventListener('click', (e) => {
      e.preventDefault();
      if (det.open) { fechar(); return; }
      itens.forEach((o) => { if (o !== det && o.open) o._fechar?.(); });
      det.open = true;
      requestAnimationFrame(abrir);
    });
  });
})();

/* ── Luz que segue o cursor (só desktop com hover) ───────────── */
(() => {
  if (semHover) return;
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-luz]'));
  if (!cards.length) return;
  let raf = 0;
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--lx', e.clientX - r.left + 'px');
        card.style.setProperty('--ly', e.clientY - r.top + 'px');
      });
    });
  });
})();

/* ── Ímãs das pílulas do rodapé ──────────────────────────────── */
(() => {
  if (semHover || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-ima]').forEach((el) => {
    let raf = 0;
    el.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transition = 'transform .25s cubic-bezier(.16,1,.3,1)';
        el.style.transform = `translate3d(${(x * 0.22).toFixed(1)}px,${(y * 0.32).toFixed(1)}px,0) scale(1.04)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      el.style.transition = 'transform .8s cubic-bezier(.16,1.5,.3,1)';
      el.style.transform = 'none';
    });
  });
})();

/* ── Balão de atendimento ────────────────────────────────────── */
(() => {
  const root = document.querySelector<HTMLElement>('[data-assist]');
  if (!root) return;
  const bolha = root.querySelector<HTMLElement>('[data-assist-bubble]');
  const titulo = root.querySelector<HTMLElement>('[data-assist-title]');
  const texto = root.querySelector<HTMLElement>('[data-assist-text]');
  const abrirBtn = root.querySelector<HTMLElement>('[data-assist-open]');
  const fecharBtn = root.querySelector<HTMLElement>('[data-assist-close]');
  let recados: { titulo: string; texto: string; espera: number; pausa: number }[] = [];
  try { recados = JSON.parse(root.dataset.recados || '[]'); } catch { recados = []; }
  if (!bolha || !titulo || !texto || !recados.length) return;
  let i = 0;
  let t: number | undefined;
  let dispensada = false;
  try { dispensada = sessionStorage.getItem('adr_bolha') === 'off'; } catch { /* ignore */ }

  const mostrar = () => {
    const r = recados[i % recados.length];
    titulo.textContent = r.titulo;
    texto.textContent = r.texto;
    bolha.hidden = false;
    bolha.classList.remove('is-out');
  };
  const ciclo = () => {
    if (dispensada) return;
    window.clearTimeout(t);
    const r = recados[i % recados.length];
    mostrar();
    t = window.setTimeout(() => {
      bolha.classList.add('is-out');
      t = window.setTimeout(() => {
        bolha.hidden = true;
        t = window.setTimeout(() => { i += 1; ciclo(); }, r.pausa || 3400);
      }, 380);
    }, r.espera || 7000);
  };
  const iniciar = () => {
    if (dispensada) return;
    const alvo = document.querySelector('[data-assist-trigger]');
    if (mq('(max-width: 900px)') && alvo && typeof IntersectionObserver === 'function') {
      const io = new IntersectionObserver((ents) => {
        if (!ents.some((e) => e.isIntersecting)) return;
        io.disconnect();
        window.setTimeout(ciclo, 400);
      }, { threshold: 0.2 });
      io.observe(alvo);
      return;
    }
    window.setTimeout(ciclo, 2800);
  };
  abrirBtn?.addEventListener('click', () => {
    if (!bolha.hidden) { abrirModal('assistente'); return; }
    dispensada = false;
    ciclo();
  });
  fecharBtn?.addEventListener('click', () => {
    window.clearTimeout(t);
    dispensada = true;
    try { sessionStorage.setItem('adr_bolha', 'off'); } catch { /* ignore */ }
    bolha.classList.add('is-out');
    window.setTimeout(() => { bolha.hidden = true; }, 380);
  });
  iniciar();
})();

/* ── Popup de saída (desktop, uma vez por sessão) ────────────── */
(() => {
  if (!modal || semHover) return;
  try { if (sessionStorage.getItem('adr_saida') === 'on') return; } catch { /* ignore */ }
  const onSaida = (e: MouseEvent) => {
    if (e.clientY > 0 || !modal.hidden) return;
    document.removeEventListener('mouseleave', onSaida);
    try { sessionStorage.setItem('adr_saida', 'on'); } catch { /* ignore */ }
    track('exit_intent_popup');
    abrirModal('exit_intent');
  };
  document.addEventListener('mouseleave', onSaida);
})();

/* ── Voltar ao topo ──────────────────────────────────────────── */
document.querySelector('[data-top]')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
});
