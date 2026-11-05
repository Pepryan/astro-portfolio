/**
 * Client-side filter for post ledgers (src/components/blog/GrepFilter.astro).
 *
 * Rows carry data-text / data-tags / data-series (src/components/blog/PostRow.astro).
 * State lives in the URL (?search=, ?tag=, ?series=) so filtered views are
 * shareable; ?focus=search focuses the input on load.
 */
export function initPostFilter(root: HTMLElement): void {
  const scope = root.closest('main') ?? document;
  const input = root.querySelector<HTMLInputElement>('[data-filter-input]');
  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-filter-tag]')];
  const status = root.querySelector<HTMLElement>('[data-filter-status]');
  const reset = root.querySelector<HTMLButtonElement>('[data-filter-reset]');
  const empty = scope.querySelector<HTMLElement>('[data-filter-empty]');
  const emptyQuery = scope.querySelector<HTMLElement>('[data-filter-query]');
  const rows = [...scope.querySelectorAll<HTMLElement>('[data-post]')];
  const groups = [...scope.querySelectorAll<HTMLElement>('[data-post-group]')];
  if (!input) return;
  const noun = root.dataset.noun ?? 'posts';

  const params = new URLSearchParams(window.location.search);
  const state = {
    query: params.get('search') ?? '',
    tag: (params.get('tag') ?? '').toLowerCase(),
    series: (params.get('series') ?? '').toLowerCase(),
  };

  const apply = () => {
    const terms = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;

    for (const row of rows) {
      const text = row.dataset.text ?? '';
      const tags = (row.dataset.tags ?? '').split('|');
      const series = (row.dataset.series ?? '').split('|');
      const match =
        terms.every((term) => text.includes(term)) &&
        (!state.tag || tags.includes(state.tag)) &&
        (!state.series || series.includes(state.series));
      row.hidden = !match;
      if (match) visible += 1;
    }

    groups.forEach((group) => {
      group.hidden = !group.querySelector('[data-post]:not([hidden])');
    });

    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filterTag === state.tag)));

    const filtered = Boolean(state.query || state.tag || state.series);
    if (status) {
      const scopeLabel = [state.tag && `#${state.tag}`, state.series && `series “${state.series}”`].filter(Boolean).join(', ');
      status.textContent = filtered
        ? `${visible} of ${rows.length} ${noun}${scopeLabel ? ` in ${scopeLabel}` : ''}`
        : `${rows.length} ${noun}`;
    }
    if (reset) reset.hidden = !filtered;
    if (empty) empty.hidden = visible > 0;
    if (emptyQuery) emptyQuery.textContent = `“${[state.query, state.tag && `#${state.tag}`].filter(Boolean).join(' ')}”`;

    const next = new URLSearchParams();
    if (state.query) next.set('search', state.query);
    if (state.tag) next.set('tag', state.tag);
    if (state.series) next.set('series', state.series);
    const query = next.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  };

  input.value = state.query;
  input.addEventListener('input', () => {
    state.query = input.value.trim();
    apply();
  });

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      state.tag = chip.dataset.filterTag ?? '';
      apply();
    })
  );

  reset?.addEventListener('click', () => {
    state.query = '';
    state.tag = '';
    state.series = '';
    input.value = '';
    apply();
    input.focus();
  });

  root.hidden = false;
  apply();
  if (params.get('focus') === 'search') input.focus();
}
