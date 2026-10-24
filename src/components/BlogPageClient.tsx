import { useEffect, useMemo, useState } from 'react';
import { FiArchive, FiBookOpen, FiLayers, FiRss, FiTag } from 'react-icons/fi';
import BlogList from './BlogList';
import BlogSearch from './BlogSearch';
import FilterDropdown, { type FilterOption } from './FilterDropdown';
import PostsPerPageSelector from './PostsPerPageSelector';
import ReadingProgress from './ReadingProgress';
import { seoConfig } from '../config/components';
import type { BlogPost } from '../types';

interface BlogPageClientProps {
  posts: BlogPost[];
}

const PER_PAGE_OPTIONS = [6, 9, 12, 18];

function countBy(values: string[]): FilterOption[] {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));
}

const quickLinks = [
  { href: '/blog/tags', label: 'Tags', icon: FiTag },
  { href: '/series', label: 'Series', icon: FiBookOpen },
  { href: '/archive', label: 'Archive', icon: FiArchive },
  { href: '/rss.xml', label: 'RSS', icon: FiRss },
];

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const { postsPerPage: defaultPerPage, layout } = seoConfig.blog;
  const labels = layout.statsLabels;

  const [searchQuery, setSearchQuery] = useState('');
  const [initialQuery, setInitialQuery] = useState('');
  const [focusSearch, setFocusSearch] = useState(false);
  const [urlReady, setUrlReady] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [postsPerPage, setPostsPerPage] = useState(
    PER_PAGE_OPTIONS.includes(defaultPerPage) ? defaultPerPage : PER_PAGE_OPTIONS[0]
  );

  const tagOptions = useMemo(() => countBy(posts.flatMap((post) => post.data.tags ?? [])), [posts]);
  const seriesOptions = useMemo(
    () => countBy(posts.flatMap((post) => (post.data.series ? [post.data.series.name] : []))),
    [posts]
  );

  // Read filters from the URL once after hydration (?search=, ?tag=, ?series=, ?focus=search)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') ?? '';
    setInitialQuery(search);
    setSearchQuery(search);
    setSelectedTag(params.get('tag') ?? '');
    setSelectedSeries(params.get('series') ?? '');
    setFocusSearch(params.get('focus') === 'search');
    setUrlReady(true);
  }, []);

  // Keep the URL shareable as filters change
  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedTag) params.set('tag', selectedTag);
    if (selectedSeries) params.set('series', selectedSeries);
    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  }, [urlReady, searchQuery, selectedTag, selectedSeries]);

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl">Blog</h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{seoConfig.blog.description}.</p>
          </div>
          {layout.showStats && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {posts.length} {labels.posts} · {tagOptions.length} {labels.topics}
            </p>
          )}
        </header>

        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {tagOptions.length > 0 && (
              <FilterDropdown
                title="Filter by topic"
                icon={<FiTag className="h-4 w-4" />}
                allLabel={`All ${labels.posts}`}
                totalCount={posts.length}
                options={tagOptions}
                value={selectedTag}
                onChange={setSelectedTag}
              />
            )}
            {seriesOptions.length > 0 && (
              <FilterDropdown
                title="Filter by series"
                icon={<FiLayers className="h-4 w-4" />}
                allLabel="All series"
                totalCount={posts.length}
                options={seriesOptions}
                value={selectedSeries}
                onChange={setSelectedSeries}
              />
            )}
            <BlogSearch onSearch={setSearchQuery} initialQuery={initialQuery} autoFocus={focusSearch} />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Blog sections" className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {quickLinks.map(({ href, label, icon: LinkIcon }) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium
                    text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900
                    dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                  <LinkIcon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex justify-center sm:justify-end">
              <PostsPerPageSelector value={postsPerPage} onChange={setPostsPerPage} options={PER_PAGE_OPTIONS} />
            </div>
          </div>
        </div>

        <BlogList
          posts={posts}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          selectedSeries={selectedSeries}
          postsPerPage={postsPerPage}
          showPaginationInfo={layout.showPaginationInfo}
          compactLayout={layout.compactLayout}
        />
      </main>

      <ReadingProgress />
    </>
  );
}
