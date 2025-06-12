import React from 'react';
import { motion } from 'framer-motion';
import { componentConfig } from '../config/components';

export default function SkillsSection() {
  const skills = componentConfig.skills;

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
    <section className="py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4"
        >
          Technical Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          Technologies and tools I use to build scalable cloud solutions
        </motion.p>
      </div>

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
            className="bg-white/80 dark:bg-neutral-800/80 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
              <span className="text-2xl">
                {category.title.includes('Cloud') ? '☁️' : 
                 category.title.includes('DevOps') ? '⚙️' :
                 category.title.includes('Development') ? '💻' :
                 category.title.includes('Database') ? '🗄️' : '🛠️'}
              </span>
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
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-lg">
                      {skill.focus}
                    </span>
                  </div>
                  
                  {/* Skill progress bar - only show if enabled in config */}
                  {skills.showProgress && (
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
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
    </section>
  );
}
