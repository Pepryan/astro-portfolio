import { FiChevronDown } from 'react-icons/fi';

interface PostsPerPageSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
  className?: string;
}

export default function PostsPerPageSelector({
  value,
  onChange,
  options = [6, 12, 24, 48],
  className = ''
}: PostsPerPageSelectorProps) {
  return (
    <div className={`group flex items-center gap-3 ${className}`}>
      <label
        htmlFor="posts-per-page"
        className="text-sm font-medium text-neutral-600 dark:text-neutral-400
          transition-colors duration-200 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"
      >
        Show:
      </label>
      <div className="relative">
        <select
          id="posts-per-page"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-200
            dark:border-neutral-700 rounded-lg px-3 py-2.5 pr-9 text-sm font-medium
            text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2
            focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300
            hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm
            hover:scale-105 cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} posts
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4
          text-neutral-500 dark:text-neutral-400 pointer-events-none transition-all duration-300
          group-hover:text-blue-500 group-hover:rotate-180" />
      </div>
    </div>
  );
}
