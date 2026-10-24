import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

export interface FilterOption {
  value: string;
  count: number;
}

interface FilterDropdownProps {
  /** Shown in the menu header, e.g. "Filter by topic" */
  title: string;
  icon: ReactNode;
  /** Label when nothing is selected, e.g. "All posts" */
  allLabel: string;
  totalCount: number;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Accessible single-select filter with an "All" option, counts, outside-click
 * and Escape to close. Used for tag and series filters on the blog page.
 */
export default function FilterDropdown({
  title,
  icon,
  allLabel,
  totalCount,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const select = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  const selected = options.find((option) => option.value === value);
  const optionClass = (active: boolean) =>
    `flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700/60'
    }`;
  const countClass = (active: boolean) =>
    `rounded-full px-2 py-0.5 text-xs ${active ? 'bg-white/20' : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400'}`;

  return (
    <div className="relative w-full" ref={rootRef}>
      <div className="flex w-full items-stretch rounded-xl border border-neutral-200 bg-white shadow-sm transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="listbox"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-neutral-700
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-neutral-300"
        >
          <span className="shrink-0 text-neutral-400">{icon}</span>
          <span className="truncate">{selected ? `${selected.value} (${selected.count})` : `${allLabel} (${totalCount})`}</span>
          {!selected && (
            <FiChevronDown className={`ml-auto h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          )}
        </button>
        {selected && (
          <button
            type="button"
            onClick={() => select('')}
            className="mr-2 self-center rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            aria-label={`Clear ${title.toLowerCase()}`}
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div
          id={menuId}
          className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl
            dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
            {icon}
            {title}
            <span className="ml-auto text-xs font-normal text-neutral-500">{options.length}</span>
          </div>
          <ul role="listbox" aria-label={title} className="max-h-80 space-y-1 overflow-y-auto p-2">
            <li role="option" aria-selected={value === ''}>
              <button type="button" onClick={() => select('')} className={optionClass(value === '')}>
                <span>{allLabel}</span>
                <span className={countClass(value === '')}>{totalCount}</span>
              </button>
            </li>
            {options.map((option) => {
              const active = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={active}>
                  <button type="button" onClick={() => select(option.value)} className={optionClass(active)}>
                    <span className="min-w-0 break-words">{option.value}</span>
                    <span className={countClass(active)}>{option.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
