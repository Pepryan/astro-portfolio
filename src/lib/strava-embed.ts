/**
 * /trekking: click-to-load Strava embeds, inline or in a side viewer.
 *
 * Each trek is a <details data-trek> whose body holds a [data-strava] slot.
 * Nothing from Strava loads until a visitor looks at a trek; then we build the
 * same iframe Strava's embed.js would, without running their script here:
 *
 *   https://strava-embeds.com/<type>/<id>?style=…&fromEmbed=false&token=…#ns=…&hostOrigin=…
 *
 * The iframe reports its content height with postMessage as
 * [ns, 'BROADCAST_IFRAME_HEIGHT', px]; we only accept that from Strava's origin
 * and only for a namespace we created.
 *
 * Wide screens get [data-split]: the list stays on the left and the selected
 * trek (newest by default, or the one in the URL hash) shows in a sticky
 * viewer on the right. Its embed loads once the viewer is on screen.
 */
const ORIGIN = 'https://strava-embeds.com';
const SPLIT = '(min-width: 75rem)';
const frames = new Map<string, HTMLIFrameElement>();

function onMessage(event: MessageEvent) {
  if (event.origin !== ORIGIN || !Array.isArray(event.data)) return;
  const [ns, type, height] = event.data as [unknown, unknown, unknown];
  const frame = typeof ns === 'string' ? frames.get(ns) : undefined;
  const px = Number(height);
  if (!frame || type !== 'BROADCAST_IFRAME_HEIGHT' || !Number.isFinite(px)) return;
  frame.style.height = `${Math.min(Math.max(Math.ceil(px), 200), 2000)}px`;
}

function namespace(): string {
  return window.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

function mount(slot: HTMLElement | null) {
  if (!slot || slot.dataset.mounted) return;
  const { type = 'activity', id, token, style = 'standard', label = 'Strava activity' } = slot.dataset;
  if (!id || !token) return;
  slot.dataset.mounted = 'true';

  const ns = namespace();
  const query = new URLSearchParams({ style, fromEmbed: 'false', token });
  const hash = new URLSearchParams({
    ns,
    hostOrigin: window.location.origin,
    hostPath: window.location.pathname,
    hostTitle: document.title,
  });

  const frame = document.createElement('iframe');
  frame.title = label;
  frame.src = `${ORIGIN}/${encodeURIComponent(type)}/${encodeURIComponent(id)}?${query}#${hash}`;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  // Scripts and popups (links to Strava) only; no top-level navigation of this page
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
  frame.addEventListener('load', () => slot.setAttribute('data-loaded', ''), { once: true });

  frames.set(ns, frame);
  slot.append(frame);
  // Hidden in the HTML so visitors without JS only see the "Open on Strava" link
  slot.hidden = false;
}

const slotIn = (el: Element) => el.querySelector<HTMLElement>('[data-strava]');
const summaryOf = (details: HTMLDetailsElement) => details.querySelector<HTMLElement>(':scope > summary');
const isShown = (details: HTMLDetailsElement) => !details.closest('[hidden]');

export function initTrekking(root: HTMLElement) {
  window.addEventListener('message', onMessage);

  const treks = [...root.querySelectorAll<HTMLDetailsElement>('details[data-trek]')];
  const viewer = root.querySelector<HTMLElement>('[data-viewer]');
  const media = window.matchMedia(SPLIT);
  const panels = new Map<string, HTMLElement>();
  let selected: HTMLDetailsElement | null = null;
  let viewerSeen = false;

  const split = () => root.hasAttribute('data-split');

  // Viewer panels are copies of the inline body, made once per trek and kept,
  // so switching back to a trek doesn't reload its iframe.
  const panelFor = (details: HTMLDetailsElement) => {
    let panel = panels.get(details.id);
    if (!panel && viewer) {
      const body = details.querySelector<HTMLElement>('.trek__body');
      if (!body) return null;
      panel = body.cloneNode(true) as HTMLElement;
      const slot = slotIn(panel);
      if (slot) {
        // The inline copy may already hold an iframe; start this one clean
        slot.querySelector('iframe')?.remove();
        delete slot.dataset.mounted;
        slot.removeAttribute('data-loaded');
        slot.hidden = true;
      }
      viewer.append(panel);
      panels.set(details.id, panel);
    }
    return panel ?? null;
  };

  const select = (details: HTMLDetailsElement, fromUser: boolean) => {
    selected = details;
    treks.forEach((trek) => summaryOf(trek)?.setAttribute('aria-current', String(trek === details)));
    panels.forEach((panel) => (panel.hidden = true));
    const panel = panelFor(details);
    if (!panel) return;
    panel.hidden = false;
    if (fromUser || viewerSeen) mount(slotIn(panel));
    if (viewer) viewer.scrollTop = 0;
    if (fromUser) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${details.id}`);
  };

  const fromHash = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    return id ? (treks.find((trek) => trek.id === id) ?? null) : null;
  };

  const applyMode = () => {
    const on = media.matches && Boolean(viewer) && treks.length > 0;
    root.toggleAttribute('data-split', on);
    if (viewer) viewer.hidden = !on;
    if (on) {
      treks.forEach((trek) => (trek.open = false));
      select(selected ?? fromHash() ?? treks.find(isShown) ?? treks[0], false);
    } else {
      treks.forEach((trek) => summaryOf(trek)?.removeAttribute('aria-current'));
    }
  };

  const showHash = () => {
    const target = fromHash();
    if (!target) return;
    if (split()) {
      select(target, false);
      summaryOf(target)?.scrollIntoView({ block: 'nearest' });
    } else {
      target.open = true;
      target.scrollIntoView({ block: 'start' });
    }
  };

  treks.forEach((details) => {
    const summary = summaryOf(details);

    // Small screens: native open/close, load inline on first open
    details.addEventListener('toggle', () => {
      if (details.open && !split()) mount(slotIn(details));
    });

    // Wide screens: a row selects instead of expanding (Enter/Space fire click too)
    summary?.addEventListener('click', (event) => {
      if (!split()) return;
      event.preventDefault();
      select(details, true);
    });

    // ↑/↓ walk the visible rows while one has focus
    summary?.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const visible = treks.filter(isShown);
      const next = visible[visible.indexOf(details) + (event.key === 'ArrowDown' ? 1 : -1)];
      if (!next) return;
      event.preventDefault();
      summaryOf(next)?.focus();
      if (split()) select(next, true);
    });

    // Opened before this script ran (restored state)
    if (details.open) mount(slotIn(details));
  });

  // In split mode the first embed waits until the viewer is actually on screen
  if (viewer && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      viewerSeen = true;
      if (selected && split()) mount(slotIn(panelFor(selected) ?? viewer));
      io.disconnect();
    });
    io.observe(viewer);
  } else {
    viewerSeen = true;
  }

  media.addEventListener('change', applyMode);
  applyMode();
  showHash();
  window.addEventListener('hashchange', showHash);
}
