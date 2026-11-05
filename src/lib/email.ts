/**
 * Keep the contact address out of the static HTML, where scrapers harvest it.
 *
 * At build time pages render `data-email={encodeEmail(address)}` (reversed +
 * base64); `revealEmails()` runs in the browser and turns those into mailto
 * links / visible text. Without JS the links fall back to /contact.
 * The single source of truth is `seoConfig.author.email`.
 */

export function encodeEmail(address: string): string {
  return btoa([...address].reverse().join(''));
}

export function decodeEmail(encoded: string): string {
  return [...atob(encoded)].reverse().join('');
}

/**
 * <a data-email="…">            → href becomes mailto:address
 * <x data-email="…" data-email-text> → text becomes the address
 */
export function revealEmails(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-email]').forEach((el) => {
    const address = decodeEmail(el.dataset.email ?? '');
    if (!address.includes('@')) return;
    if (el instanceof HTMLAnchorElement) el.href = `mailto:${address}`;
    if ('emailText' in el.dataset) el.textContent = address;
  });
}
