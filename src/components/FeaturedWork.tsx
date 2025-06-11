import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { componentConfig } from '../config/components';

const { featuredWork } = componentConfig;

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize scroll progress with safe defaults
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Early return if not enabled
  if (!featuredWork.enabled) return null;

  // Show loading state until mounted
  if (!mounted) {
    return (
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded max-w-2xl mx-auto"></div>
          </div>
          <div className="h-96 bg-neutral-200 dark:bg-neutral-700 rounded-2xl animate-pulse"></div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredWork.items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredWork.items.length) % featuredWork.items.length);
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent
          dark:from-blue-900/10 dark:via-purple-900/10 dark:to-transparent"
        style={{ y }}
      />

      <div className="max-w-6xl mx-auto px-4 relative">
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
            variants={itemVariants}
          >
            {featuredWork.title}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {featuredWork.subtitle}
          </motion.p>
        </motion.div>

        {/* Featured Projects */}
        {featuredWork.layout === 'carousel' ? (
          // Carousel Layout
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
              {featuredWork.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="absolute inset-0"
                  custom={index - currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate={index === currentIndex ? "center" : "exit"}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    className="w-full h-full bg-white/80 dark:bg-neutral-800/80 rounded-2xl shadow-xl
                      border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Project Image */}
                    <div className="h-1/2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {/* Dynamic icon based on category */}
                          <div className="text-6xl opacity-50">
                            {item.category === 'Cloud' ? '☁️' :
                             item.category === 'DevOps' ? '⚙️' :
                             item.category === 'Web' ? '🌐' :
                             item.category === 'Automation' ? '🤖' : '🚀'}
                          </div>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Project Content */}
                    <div className="h-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 
                                text-blue-700 dark:text-blue-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4">
                        <motion.a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400
                            hover:text-blue-700 dark:hover:text-blue-300 font-medium group/link"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiGithub className="w-4 h-4" />
                          <span>GitHub</span>
                          <FiExternalLink className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </motion.a>

                        {item.demo && (
                          <motion.a
                            href={item.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 dark:text-green-400
                              hover:text-green-700 dark:hover:text-green-300 font-medium group/link"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Demo</span>
                            <FiExternalLink className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700
                  hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowRight className="w-5 h-5 rotate-180" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {featuredWork.items.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex 
                        ? 'bg-blue-500' 
                        : 'bg-neutral-300 dark:bg-neutral-600'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700
                  hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // Grid Layout
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {featuredWork.items.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.link}
                className="group block"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-white/80 dark:bg-neutral-800/80 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 
                  backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {/* Dynamic icon based on category */}
                        <div className="text-4xl opacity-50">
                          {item.category === 'Cloud' ? '☁️' :
                           item.category === 'DevOps' ? '⚙️' :
                           item.category === 'Web' ? '🌐' :
                           item.category === 'Automation' ? '🤖' : '🚀'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                      {item.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 
                            text-blue-700 dark:text-blue-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                        <FiGithub className="w-4 h-4 mr-1" />
                        <span>GitHub</span>
                        <FiExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                      {item.demo && (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                          <span>Demo</span>
                          <FiExternalLink className="w-3 h-3 ml-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        {featuredWork.showViewAll && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href={featuredWork.viewAllLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500
                text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 
                transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Projects</span>
              <FiArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
