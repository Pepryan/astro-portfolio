import { FiBookOpen, FiClock, FiTrendingUp, FiCheck, FiPlay } from 'react-icons/fi';

interface SeriesHeaderProps {
  series: {
    name: string;
    slug: string;
    description: string;
    thumbnail?: string;
    status: 'ongoing' | 'completed' | 'planned';
    difficulty?: string;
    totalParts: number;
    completedParts: number;
  };
  currentPart?: number;
  showProgress?: boolean;
}

export default function SeriesHeader({ series, currentPart, showProgress = true }: SeriesHeaderProps) {
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
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      case 'advanced':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/20';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 
      dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 
      border border-neutral-200/60 dark:border-neutral-700/60 mb-8">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Series Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <FiBookOpen className="w-4 h-4" />
                <span>Blog Series</span>
              </div>
              
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="capitalize">{series.status}</span>
              </div>

              {series.difficulty && (
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
                  <FiTrendingUp className="w-3 h-3" />
                  <span>{series.difficulty}</span>
                </div>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              {series.name}
            </h1>
            
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-4">
              {series.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <FiBookOpen className="w-4 h-4" />
                <span>{series.completedParts} of {series.totalParts} parts</span>
              </div>
              
              {currentPart && (
                <div className="flex items-center gap-2">
                  <FiPlay className="w-4 h-4" />
                  <span>Currently reading part {currentPart}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Section */}
          {showProgress && (
            <div className="lg:w-80">
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-4 border border-neutral-200/60 dark:border-neutral-700/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Series Progress
                  </span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mb-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                  {series.completedParts} of {series.totalParts} parts completed
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
