/** Window event that opens the global search dialog (src/components/SearchDialog.tsx). */
export const OPEN_SEARCH_EVENT = 'open-search';

export function openSearch(): void {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}
