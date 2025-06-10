import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsGrid from './SkillsGrid';
import ProjectsGrid from './ProjectsGrid';
import CertificationsGrid from './CertificationsGrid';
import PortfolioUnified from './PortfolioUnified';

export default function PortfolioSection() {
  const [activeSection, setActiveSection] = useState('skills');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    { id: 'skills', label: 'Skills', component: <SkillsGrid /> },
    { id: 'projects', label: 'Projects', component: <ProjectsGrid /> },
    { id: 'certifications', label: 'Certifications', component: <CertificationsGrid /> }
  ];

  // For mobile, we'll show the unified view
  // For desktop, we'll show the tabbed view
  if (isMobile) {
    return <PortfolioUnified />;
  }

  return (
    <div className="py-8 md:py-16">
      {/* Main Header */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
        >
          My Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg"
        >
          A showcase of my skills, projects, and professional certifications
        </motion.p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id)}
              className={`px-5 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-medium transition-all duration-300
                ${activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                }`}
            >
              {section.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {sections.find(section => section.id === activeSection)?.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
