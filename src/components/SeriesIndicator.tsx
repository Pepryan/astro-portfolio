import { FiBookOpen, FiChevronRight } from 'react-icons/fi';

interface SeriesIndicatorProps {
  series: {
    name: string;
    slug: string;
    part: number;
    total?: number;
  };
  compact?: boolean;
}

export default function SeriesIndicator({ series, compact = false }: SeriesIndicatorProps) {
  const handleClick = () => {
    window.location.href = `/series/${series.slug}`;
  };

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 
          bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 
          rounded-lg transition-colors duration-200 group"
      >
        <FiBookOpen className="w-4 h-4" />
        <span>Part {series.part}{series.total ? ` of ${series.total}` : ''}</span>
        <FiChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
        rounded-xl p-4 border border-blue-200/60 dark:border-blue-700/60 cursor-pointer
        hover:from-blue-100 dark:hover:from-blue-900/30 hover:to-purple-100 dark:hover:to-purple-900/30
        transition-all duration-200 group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center">
          <FiBookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        
        <div className="flex-1">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
            Blog Series
          </div>
          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {series.name}
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Part {series.part}{series.total ? ` of ${series.total}` : ''}
          </p>
        </div>
        
        <div className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-200">
          <FiChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
