import { motion } from 'framer-motion';
import { FiBriefcase, FiBookOpen, FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import { componentConfig } from '../config/components';

const { experience, education } = componentConfig;

export default function CareerSection() {
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

  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    hover: {
      scale: 1.02,
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.div
      className="py-8 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Section Header */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Professional Journey
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
          My experience and education background in technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Experience Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-8">
            <FiBriefcase className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {experience.title}
            </h3>
          </div>
          
          <div className="space-y-6">
            {experience.items.map((item, index) => (
              <motion.div
                key={item.id || index}
                className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-800 group"
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot with animation */}
                <motion.div
                  className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-neutral-900"
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    boxShadow: item.current ? [
                      "0 0 0 0 rgba(59, 130, 246, 0.7)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)"
                    ] : "none"
                  }}
                  transition={{
                    duration: 2,
                    repeat: item.current ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className="bg-white/80 dark:bg-neutral-800/80 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.role}
                    </h4>
                    {item.current && (
                      <motion.span
                        className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Current
                      </motion.span>
                    )}
                  </div>

                  <div className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {item.company}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    <div className="flex items-center">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      {item.period}
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {item.type}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {item.responsibilities.map((responsibility, idx) => (
                      <motion.li
                        key={idx}
                        className="text-neutral-600 dark:text-neutral-400 flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {responsibility}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIdx) => (
                        <motion.span
                          key={tech}
                          className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIdx * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-8">
            <FiBookOpen className="w-6 h-6 text-green-500 mr-3" />
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {education.title}
            </h3>
          </div>
          
          <div className="space-y-6">
            {education.items.map((item, index) => (
              <motion.div
                key={item.id || index}
                className="relative pl-6 border-l-2 border-green-200 dark:border-green-800 group"
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900"
                  whileHover={{ scale: 1.3 }}
                />

                <motion.div
                  className="bg-white/80 dark:bg-neutral-800/80 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    {item.degree}
                  </h4>
                  <div className="text-green-600 dark:text-green-400 font-medium mb-3">
                    {item.institution}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    <div className="flex items-center">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      {item.period}
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <FiBookOpen className="w-4 h-4 mr-1" />
                      {item.type}
                    </div>
                  </div>

                  {/* Achievements if any */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Achievements:</h5>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, achIdx) => (
                          <motion.li
                            key={achIdx}
                            className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: achIdx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
