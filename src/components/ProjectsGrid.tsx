import { motion } from 'framer-motion';
import { componentConfig } from '../config/components';
import ProjectCard from './ProjectCard';

const { projects } = componentConfig;

export default function ProjectsGrid() {
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
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {projects.items.slice(0, 6).map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          layout="grid"
          showCategory={true}
          showStatus={false}
          showYear={false}
        />
      ))}
    </motion.div>
  );
}
