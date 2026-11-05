/**
 * Small behaviours for the post page (src/components/blog/PostLayout.astro):
 * TOC highlight, click-to-zoom images, copy link.
 */

function initTocHighlight(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
  const ids = [...new Set(links.map((link) => link.dataset.tocLink!))];
  const headings = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
  if (!headings.length) return;

  const setActive = (id: string) => {
    links.forEach((link) => {
      if (link.dataset.tocLink === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  // Active = the last heading that has crossed the upper third of the viewport
  const visible = new Set<string>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id)));
      const current = headings.find((h) => visible.has(h.id));
      if (current) setActive(current.id);
    },
    { rootMargin: '0px 0px -66% 0px' }
  );
  headings.forEach((heading) => observer.observe(heading));

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
