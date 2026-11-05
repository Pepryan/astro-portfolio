/**
 * Small behaviours for the post page (src/components/blog/PostLayout.astro):
 * TOC highlight, click-to-zoom images, copy link.
 */

function initTocHighlight(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
  const ids = [...new Set(links.map((link) => link.dataset.tocLink!))];
  const headings = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
  const sidebar = document.querySelector<HTMLElement>('.post__toc');
  const article = document.querySelector<HTMLElement>('[data-article-content]');
  if (!headings.length) return;

  let tops: number[] = [];
  let active = '';
  let frame = 0;

  // Absolute heading positions; re-measured when the article reflows (lazy images, fonts)
  const measure = () => {
    tops = headings.map((h) => h.getBoundingClientRect().top + window.scrollY);
  };

  // Keep the active link inside the sidebar's own scroll area, like the old TOC did
  const keepVisible = (id: string) => {
    if (!sidebar || sidebar.scrollHeight <= sidebar.clientHeight) return;
    const link = sidebar.querySelector<HTMLElement>(`[data-toc-link="${CSS.escape(id)}"]`);
    if (!link) return;
    const box = sidebar.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    const pad = Math.min(48, box.height * 0.15);
    if (item.top < box.top + pad) {
      sidebar.scrollBy({ top: item.top - box.top - pad, behavior: 'smooth' });
    } else if (item.bottom > box.bottom - pad) {
      sidebar.scrollBy({ top: item.bottom - box.bottom + pad, behavior: 'smooth' });
    }
  };

  const setActive = (id: string) => {
    if (id === active) return;
    active = id;
    links.forEach((link) => {
      if (link.dataset.tocLink === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (id) keepVisible(id);
  };

  // Active = the last heading above a line 30% down the viewport
  const update = () => {
    frame = 0;
    const line = window.scrollY + window.innerHeight * 0.3;
    let index = -1;
    for (let i = 0; i < tops.length && tops[i] <= line; i += 1) index = i;
    setActive(index >= 0 ? headings[index].id : '');
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  measure();
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    schedule();
  });
  if (article) {
    new ResizeObserver(() => {
      measure();
      schedule();
    }).observe(article);
  }

  // Close the mobile TOC after jumping
  document.querySelectorAll<HTMLDetailsElement>('.post__toc-mobile').forEach((details) =>
    details.addEventListener('click', (event) => {
      if ((event.target as Element).closest('a')) details.open = false;
    })
  );
}

function initLightbox(): void {
  const content = document.querySelector<HTMLElement>('[data-article-content]');
  if (!content) return;

  content.querySelectorAll('img').forEach((img) => {
    img.classList.add('cursor-zoom-in');
    img.tabIndex = 0;
  });

  const open = (img: HTMLImageElement) => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', img.alt || 'Image preview');

    const preview = document.createElement('img');
    preview.src = img.currentSrc || img.src;
    preview.alt = img.alt;
    overlay.append(preview);

    const close = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      img.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.append(overlay);
  };

  const imageFrom = (event: Event) => {
    const target = event.target;
    return target instanceof HTMLImageElement && content.contains(target) ? target : null;
  };
  content.addEventListener('click', (event) => {
    const img = imageFrom(event);
    if (img) open(img);
  });
  content.addEventListener('keydown', (event) => {
    const img = imageFrom(event);
    if (img && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      open(img);
    }
  });
}

function initCopyLink(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy-link]').forEach((button) => {
    const label = button.querySelector<HTMLElement>('[data-copy-label]');
    let timer: number | undefined;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copyLink ?? window.location.href);
        if (label) label.textContent = 'Copied';
      } catch {
        if (label) label.textContent = 'Copy failed';
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => label && (label.textContent = 'Copy link'), 2000);
    });
  });
}

export function initPostPage(): void {
  initTocHighlight();
  initLightbox();
  initCopyLink();
}
