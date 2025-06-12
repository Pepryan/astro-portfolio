import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCalendar, FiTag, FiStar, FiActivity } from 'react-icons/fi';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image?: string | null;
    tags: string[];
    link: string;
    github?: string;
    demo?: string;
    category: string;
    status?: string;
    year?: string;
    featured?: boolean;
  };
  layout?: 'grid' | 'list' | 'featured';
  showCategory?: boolean;
  showStatus?: boolean;
  showYear?: boolean;
}

export default function ProjectCard({ 
  project, 
  layout = 'grid',
  showCategory = true,
  showStatus = false,
  showYear = false
}: ProjectCardProps) {
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cloud': return '☁️';
      case 'DevOps': return '⚙️';
      case 'Web': return '🌐';
      case 'Automation': return '🤖';
      case 'Open Source': return '🌟';
      default: return '🚀';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Completed': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'Archived': return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/30';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  if (layout === 'list') {
    return (
      <motion.div
        className="group"
        variants={cardVariants}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="bg-white/80 dark:bg-neutral-800/80 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 
          backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 p-6">
          
          <div className="flex items-start gap-6">
            {/* Icon/Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 
                rounded-xl flex items-center justify-center">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-2xl">
                    {getCategoryIcon(project.category)}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                {/* Status & Year */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {showStatus && project.status && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  )}
                  {showYear && project.year && (
                    <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                      <FiCalendar className="w-3 h-3" />
                      {project.year}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 
                      text-blue-700 dark:text-blue-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-400">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <motion.a
                  href={project.github || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300"
                  whileHover={{ x: 2 }}
                >
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub</span>
                  <FiExternalLink className="w-3 h-3" />
                </motion.a>
                
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium hover:text-green-700 dark:hover:text-green-300"
                    whileHover={{ x: 2 }}
                  >
                    <span>Demo</span>
                    <FiExternalLink className="w-3 h-3" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid layout (default)
  return (
    <motion.div
      className="group"
      variants={cardVariants}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      data-category={project.category.toLowerCase()}
    >
      <div className="bg-white/80 dark:bg-neutral-800/80 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 
        backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        
        {/* Image/Icon */}
        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl opacity-50">
                {getCategoryIcon(project.category)}
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          {showCategory && (
            <div className="absolute top-3 left-3">
              <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-white/90 dark:bg-neutral-800/90 
                text-neutral-700 dark:text-neutral-300 rounded-full backdrop-blur-sm">
                <FiTag className="w-3 h-3" />
                {project.category}
              </span>
            </div>
          )}

          {/* Status Badge */}
          {showStatus && project.status && (
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            {showYear && project.year && (
              <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 flex-shrink-0">
                <FiCalendar className="w-3 h-3" />
                {project.year}
              </span>
            )}
          </div>
          
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-1">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 
                  text-blue-700 dark:text-blue-300 rounded"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <motion.a
              href={project.github || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300"
              whileHover={{ x: 2 }}
            >
              <FiGithub className="w-4 h-4" />
              <span>GitHub</span>
              <FiExternalLink className="w-3 h-3" />
            </motion.a>
            
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium hover:text-green-700 dark:hover:text-green-300"
                whileHover={{ x: 2 }}
              >
                <span>Demo</span>
                <FiExternalLink className="w-3 h-3" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
