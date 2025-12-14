import { FiBookOpen, FiClock, FiCheck, FiPlay, FiArrowUpRight, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import type { SeriesInfo } from '../types';

interface SeriesCardProps {
  series: SeriesInfo;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const progressPercentage = (series.completedParts / series.totalParts) * 100;

  const getStatusIcon = () => {
    switch (series.status) {
      case 'completed':
        return <FiCheck className="w-4 h-4" />;
      case 'ongoing':
        return <FiPlay className="w-4 h-4" />;
      case 'planned':
        return <FiClock className="w-4 h-4" />;
      default:
        return <FiBookOpen className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (series.status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'ongoing':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'planned':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      default:
        return 'text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/20';
    }
  };

  const getDifficultyColor = () => {
    switch (series.difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 dark:text-green-400';
      case 'intermediate':
        return 'text-amber-600 dark:text-amber-400';
      case 'advanced':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-neutral-600 dark:text-neutral-400';
    }
  };

  const handleCardClick = () => {
    window.location.href = `/series/${series.slug}`;
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/blog/tags/${tag}`;
  };

  return (
    <article className={`group relative bg-white dark:bg-neutral-800/80 rounded-2xl overflow-hidden
      border border-neutral-200/60 dark:border-neutral-700/60
      hover:border-neutral-300 dark:hover:border-neutral-600
      hover:shadow-xl hover:shadow-neutral-200/20 dark:hover:shadow-neutral-900/20
      transition-all duration-300 ease-out hover:-translate-y-1
      ${series.featured ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''}`}>

      {/* Featured Badge */}
      {series.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Featured
          </div>
        </div>
      )}

      <div
        className="block h-full cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`View series: ${series.name}`}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          {series.thumbnail ? (
            <img
              src={series.thumbnail}
              alt={series.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-700
              flex items-center justify-center">
              <div className="text-center">
                <FiBookOpen className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-3" />
                <div className="text-lg font-semibold text-neutral-600 dark:text-neutral-400">
                  Blog Series
                </div>
              </div>
            </div>
          )}

          {/* Overlay with status */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                  {getStatusIcon()}
                  <span className="capitalize">{series.status}</span>
                </div>
                <div className="text-white text-sm font-medium">
                  {series.completedParts}/{series.totalParts} parts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Category and Difficulty */}
          <div className="flex items-center gap-2 mb-3">
            {series.category && (
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                {series.category}
              </span>
            )}
            {series.difficulty && (
              <div className={`flex items-center gap-1 text-xs font-medium ${getDifficultyColor()}`}>
                <FiTrendingUp className="w-3 h-3" />
                <span>{series.difficulty}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {series.name}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {series.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Tags */}
          {series.tags && series.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {series.tags.slice(0, 3).map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => handleTagClick(tag, e)}
                  className="text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 
                    hover:bg-neutral-200 dark:hover:bg-neutral-600 px-2 py-1 rounded-md transition-colors duration-200"
                >
                  #{tag}
                </button>
              ))}
              {series.tags.length > 3 && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  +{series.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4
            border-t border-neutral-200/60 dark:border-neutral-700/60">
            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              {series.startDate && (
                <time
                  dateTime={series.startDate.toISOString()}
                  className="flex items-center gap-1.5"
                >
                  <FiCalendar className="w-4 h-4" />
                  {series.startDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                  })}
                </time>
              )}

              <div className="flex items-center gap-1.5">
                <FiBookOpen className="w-4 h-4" />
                <span>{series.totalParts} parts</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400
              group-hover:gap-2 transition-all duration-200">
              <span>View series</span>
              <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
