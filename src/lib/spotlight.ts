/**
 * Cursor spotlight for any element marked `data-spotlight`.
 *
 * One delegated pointermove listener writes the pointer position (relative to
 * the hovered element) into --mx / --my. CSS decides what to draw with them
 * (see .ds-spot and the hero grid in src/styles/tokens.css). Updates are
 * batched to one per animation frame, and nothing runs on touch-only devices
 * or for visitors who prefer reduced motion.
 */
export function initSpotlight(): void {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  let frame = 0;
  let target: HTMLElement | null = null;
  let x = 0;
  let y = 0;

  const paint = () => {
    frame = 0;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--mx', `${x - rect.left}px`);
    target.style.setProperty('--my', `${y - rect.top}px`);
  };

  document.addEventListener(
    'pointermove',
    (event) => {
      const next = (event.target as Element | null)?.closest<HTMLElement>('[data-spotlight]') ?? null;
      if (target && target !== next) {
        target.style.removeProperty('--mx');
        target.style.removeProperty('--my');
      }
      target = next;
      x = event.clientX;
      y = event.clientY;
      if (target && !frame) frame = requestAnimationFrame(paint);
    },
    { passive: true }
  );
}
