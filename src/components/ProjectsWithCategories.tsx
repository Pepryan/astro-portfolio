import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { componentConfig } from '../config/components';

export default function ProjectsWithCategories() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = componentConfig.pages.projects.categories;
  const projects = componentConfig.projects;

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects.items;
    }
    return projects.items.filter(project => {
      const categoryMap: { [key: string]: string } = {
        'cloud': 'Cloud',
        'devops': 'DevOps',
        'automation': 'Automation',
        'open-source': 'Open Source',
        'web': 'Web'
      };
      return project.category === categoryMap[activeCategory];
    });
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              {category.count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                }`}>
                  {category.count}
                </span>
              )}
            </div>
            
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
              layoutId="categoryHover"
            />
          </motion.button>
        ))}
      </div>

      {/* Active Category Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {categories.find(cat => cat.id === activeCategory)?.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
            >
              <ProjectCard
                project={project}
                layout="grid"
                showCategory={true}
                showStatus={true}
                showYear={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            No projects found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            No projects match the selected category yet.
          </p>
        </motion.div>
      )}
    </div>
  );
}
