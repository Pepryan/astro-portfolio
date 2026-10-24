import { FiArrowUpRight, FiBookOpen, FiCalendar, FiClock, FiFileText } from 'react-icons/fi';
import { formatDate } from '../lib/format';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  readingTime?: number;
}

const tagHref = (tag: string) => `/blog/tags/${encodeURIComponent(tag)}`;

/**
 * Post card. The title link is stretched over the whole card (`after:inset-0`),
 * so the card is a real, crawlable link while tag links stay clickable on top.
 */
export default function BlogCard({ post, readingTime }: BlogCardProps) {
  const { title, summary, description, thumbnail, tags = [], series, date, updated } = post.data;
  const minutes = readingTime ?? post.readingTime;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white
        transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-900/5
        focus-within:ring-2 focus-within:ring-blue-500 dark:border-neutral-700/60 dark:bg-neutral-800/60 dark:hover:border-neutral-600"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700">
            <FiFileText className="h-10 w-10 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
          </div>
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-neutral-900/90 dark:text-neutral-300">
          <FiClock className="h-3 w-3" aria-hidden="true" />
          {minutes} min
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {series && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
            <FiBookOpen className="h-3 w-3" aria-hidden="true" />
            <span className="truncate">{series.name}</span>
            <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
              · Part {series.part}
              {series.total ? ` of ${series.total}` : ''}
            </span>
          </p>
        )}

        <h2 className="text-xl font-bold leading-tight text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
          <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus:outline-none">
            {title}
          </a>
        </h2>

        {(summary || description) && (
          <p className="line-clamp-3 leading-relaxed text-neutral-600 dark:text-neutral-400">{summary || description}</p>
        )}

        {tags.length > 0 && (
          <ul className="relative z-10 flex flex-wrap gap-2" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag}>
                <a
                  href={tagHref(tag)}
                  className="inline-block rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600
                    transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-neutral-600 dark:bg-neutral-700/40
                    dark:text-neutral-300 dark:hover:border-blue-500 dark:hover:text-blue-300"
                >
                  #{tag}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/60 pt-4 text-sm dark:border-neutral-700/60">
          <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
            <FiCalendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={date.toISOString()}>{formatDate(date, 'short')}</time>
            {updated && (
              <span className="text-xs">
                · Updated <time dateTime={updated.toISOString()}>{formatDate(updated, 'short')}</time>
              </span>
            )}
          </span>
          <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400" aria-hidden="true">
            Read
            <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
