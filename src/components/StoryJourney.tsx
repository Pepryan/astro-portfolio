import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { componentConfig } from '../config/components';

const { storyJourney } = componentConfig;

export default function StoryJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize scroll progress with safe defaults
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform scroll progress to different animations
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Early return if not enabled
  if (!storyJourney.enabled) return null;

  // Show loading state until mounted
  if (!mounted) {
    return (
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded max-w-2xl mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const milestoneVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const connectorVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800',
      green: 'from-green-500 to-green-600 border-green-200 dark:border-green-800',
      purple: 'from-purple-500 to-purple-600 border-purple-200 dark:border-purple-800',
      orange: 'from-orange-500 to-orange-600 border-orange-200 dark:border-orange-800',
      red: 'from-red-500 to-red-600 border-red-200 dark:border-red-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent
          dark:from-blue-900/10 dark:via-purple-900/10 dark:to-transparent"
        style={{ y }}
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent
              bg-gradient-to-r from-neutral-900 to-neutral-600
              dark:from-neutral-100 dark:to-neutral-400 mb-4"
            variants={milestoneVariants}
          >
            {storyJourney.title}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            variants={milestoneVariants}
          >
            {storyJourney.subtitle}
          </motion.p>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-8 relative">
              {/* Connecting Line */}
              {storyJourney.showConnectors && (
                <motion.div
                  className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200
                    dark:from-blue-800 dark:via-purple-800 dark:to-orange-800 z-0"
                  variants={connectorVariants}
                  style={{ originX: 0 }}
                />
              )}

              {storyJourney.milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="relative z-10"
                  variants={milestoneVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {/* Milestone Card */}
                  <motion.div
                    className={`p-6 bg-white/80 dark:bg-neutral-800/80 rounded-2xl shadow-lg
                      border-2 ${getColorClasses(milestone.color)} backdrop-blur-sm
                      hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="text-4xl mb-4 text-center"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {milestone.icon}
                    </motion.div>

                    {/* Year */}
                    <motion.div
                      className={`text-2xl font-bold text-center mb-2 bg-gradient-to-r ${getColorClasses(milestone.color).split(' ')[0]} ${getColorClasses(milestone.color).split(' ')[1]} bg-clip-text text-transparent`}
                    >
                      {milestone.year}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 text-center mb-2">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent
                        dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {storyJourney.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="relative"
                variants={milestoneVariants}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`p-6 bg-white/80 dark:bg-neutral-800/80 rounded-2xl shadow-lg
                    border-2 ${getColorClasses(milestone.color)} backdrop-blur-sm`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="text-3xl"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {milestone.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className={`text-xl font-bold mb-1 bg-gradient-to-r ${getColorClasses(milestone.color).split(' ')[0]} ${getColorClasses(milestone.color).split(' ')[1]} bg-clip-text text-transparent`}>
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Connector */}
                {storyJourney.showConnectors && index < storyJourney.milestones.length - 1 && (
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-neutral-300 to-neutral-200
                      dark:from-neutral-600 dark:to-neutral-700 mt-4"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
