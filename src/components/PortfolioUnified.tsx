import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

// Import our grid components
import SkillsGrid from './SkillsGrid';
import ProjectsGrid from './ProjectsGrid';
import CertificationsGrid from './CertificationsGrid';

// Section divider component
const SectionDivider = ({ title }: { title: string }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center my-12"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
    >
      <div className="flex items-center w-full max-w-md">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neutral-300 dark:to-neutral-600"></div>
        <div className="px-4">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 text-center">
            {title}
          </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neutral-300 dark:to-neutral-600"></div>
      </div>
    </motion.div>
  );
};

// Scroll indicator component
const ScrollIndicator = () => (
  <motion.div
    className="flex justify-center mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    <motion.div
      className="flex flex-col items-center text-neutral-500 dark:text-neutral-400"
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-sm mb-2">Scroll to explore</span>
      <FiArrowDown className="w-4 h-4" />
    </motion.div>
  </motion.div>
);

export default function PortfolioUnified() {
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
        
        <ScrollIndicator />
      </div>
      
      {/* Skills Section */}
      <section>
        <SectionDivider title="Skills" />
        <SkillsGrid />
      </section>

      {/* Projects Section */}
      <section>
        <SectionDivider title="Projects" />
        <ProjectsGrid />
      </section>

      {/* Certifications Section */}
      <section>
        <SectionDivider title="Certifications" />
        <CertificationsGrid />
      </section>
    </div>
  );
}
