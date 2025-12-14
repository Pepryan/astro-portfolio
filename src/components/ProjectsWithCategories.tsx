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
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`project-tab ${activeCategory === category.id ? 'project-tab-active' : ''}`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
            {category.count > 0 && (
              <span className={`project-tab-count ${activeCategory === category.id ? 'project-tab-count-active' : ''}`}>
                {category.count}
              </span>
            )}
          </button>
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
