import { FiTag } from 'react-icons/fi';

interface TagListProps {
  tags?: string[];
  className?: string;
  onTagClick?: (tag: string) => void;
}

export default function TagList({ tags = [], className = '', onTagClick }: TagListProps) {
  // Return null if tags is not an array or empty
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map(tag => (
        onTagClick ? (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 
              text-neutral-700 dark:text-neutral-300 rounded-full hover:bg-neutral-200 
              dark:hover:bg-neutral-700 transition-colors"
          >
            <FiTag className="w-3 h-3" />
            {tag}
          </button>
        ) : (
          <a
            key={tag}
            href={`/blog/tags/${tag}`}
            rel="nofollow"
            aria-label={`View posts tagged with ${tag}`}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800
              text-neutral-700 dark:text-neutral-300 rounded-full hover:bg-neutral-200
              dark:hover:bg-neutral-700 transition-colors"
          >
            <FiTag className="w-3 h-3" aria-hidden="true" />
            {tag}
          </a>
        )
      ))}
    </div>
  );
}
