import { useState, useMemo } from 'react';
import { FiSearch, FiFilter, FiGrid, FiList, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import SeriesCard from './SeriesCard';
import ReadingProgress from './ReadingProgress';

interface SeriesInfo {
  name: string;
  slug: string;
  description: string;
  thumbnail?: string;
  status: 'ongoing' | 'completed' | 'planned';
  tags: string[];
  category?: string;
  difficulty?: string;
  totalParts: number;
  completedParts: number;
  startDate?: Date;
  featured: boolean;
}

interface SeriesPageClientProps {
  series: SeriesInfo[];
}

export default function SeriesPageClient({ series }: SeriesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // featured, name, newest, oldest, progress
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories, statuses, and difficulties
  const categories = useMemo(() => {
    const cats = series.map(s => s.category).filter(Boolean) as string[];
    return [...new Set(cats)].sort();
  }, [series]);

  const difficulties = useMemo(() => {
    const diffs = series.map(s => s.difficulty).filter(Boolean) as string[];
    return [...new Set(diffs)].sort();
  }, [series]);

  // Filter and sort series
  const filteredAndSortedSeries = useMemo(() => {
    let filtered = series.filter(s => {
      const matchesSearch = searchQuery === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
      const matchesDifficulty = selectedDifficulty === 'all' || s.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
    });

    // Sort series
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          const aDate = a.startDate || new Date(0);
          const bDate = b.startDate || new Date(0);
          return bDate.getTime() - aDate.getTime();
        case 'oldest':
          const aDateOld = a.startDate || new Date();
          const bDateOld = b.startDate || new Date();
          return aDateOld.getTime() - bDateOld.getTime();
        case 'progress':
          const aProgress = (a.completedParts / a.totalParts) * 100;
          const bProgress = (b.completedParts / b.totalParts) * 100;
          return bProgress - aProgress;
        default:
          return 0;
      }
    });

    return filtered;
  }, [series, searchQuery, selectedCategory, selectedStatus, selectedDifficulty, sortBy]);

  const featuredSeries = series.filter(s => s.featured);
  const stats = {
    total: series.length,
    ongoing: series.filter(s => s.status === 'ongoing').length,
    completed: series.filter(s => s.status === 'completed').length,
    planned: series.filter(s => s.status === 'planned').length,
  };

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 
            text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
            <FiBookOpen className="w-4 h-4" />
            <span>Blog Series Collection</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Comprehensive Learning Series
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            Dive deep into technology topics through structured, multi-part series covering 
            cloud engineering, DevOps, web development, and modern programming practices.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stats.total}</div>
              <div className="text-neutral-500 dark:text-neutral-400">Total Series</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.ongoing}</div>
              <div className="text-neutral-500 dark:text-neutral-400">Ongoing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
              <div className="text-neutral-500 dark:text-neutral-400">Completed</div>
            </div>
          </div>
        </div>

        {/* Featured Series */}
        {featuredSeries.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-2">
              <FiTrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Featured Series
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSeries.map((s) => (
                <SeriesCard key={s.slug} series={s} />
              ))}
            </div>
          </section>
        )}

        {/* Filters and Search */}
        <div className="bg-white dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 p-6 mb-8">
          {/* Search */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search series by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 
                rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 
                rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 
                rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="planned">Planned</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 
                rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 
                rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured First</option>
              <option value="name">Name A-Z</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="progress">Most Progress</option>
            </select>
          </div>

          {/* View Mode and Results Count */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Showing {filteredAndSortedSeries.length} of {series.length} series
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Series Grid/List */}
        {filteredAndSortedSeries.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {filteredAndSortedSeries.map((s) => (
              <SeriesCard key={s.slug} series={s} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiBookOpen className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              No series found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      <ReadingProgress />
    </main>
  );
}
