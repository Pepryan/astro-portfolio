import React from 'react';
import { motion } from 'framer-motion';
import { componentConfig } from '../config/components';

const { skills } = componentConfig;

export default function SkillsGrid() {
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
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {skills.categories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          className="bg-white/80 dark:bg-neutral-800/80 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            {category.title}
          </h3>
          
          <div className="space-y-4">
            {category.items.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                className="group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {skill.name}
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {skill.focus}
                  </span>
                </div>
                
                {/* Skill progress bar - only show if enabled in config */}
                {skills.showProgress && (
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level || 85}%` }}
                      transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                      viewport={{ once: true }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
