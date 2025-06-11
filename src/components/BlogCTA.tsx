import { motion, useScroll, useTransform } from 'framer-motion';
import { FiEdit3, FiArrowRight, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import { componentConfig } from '../config/components';
import { useEffect, useState, useRef } from 'react';

const { blogCta } = componentConfig;

export default function BlogCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  if (!blogCta.enabled || !mounted) return null;

  const getBackgroundStyle = () => {
    switch (blogCta.backgroundStyle) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-indigo-700/90 text-white';
      case 'pattern':
        return 'bg-neutral-900 dark:bg-neutral-800 text-white';
      default:
        return 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100';
    }
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "backOut" }
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-12 sm:py-16 relative overflow-hidden"
      style={{ scale }}
    >
      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.div
          className={`relative rounded-3xl p-6 md:p-10 lg:p-12 overflow-hidden ${getBackgroundStyle()}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Background Effects */}
          {blogCta.backgroundStyle === 'gradient' && (
            <>
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                    "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.2))",
                    "linear-gradient(225deg, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2))",
                    "linear-gradient(315deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl"
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  scale: [1.1, 1, 1.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="flex justify-center mb-6"
              variants={iconVariants}
            >
              <div className={`p-4 rounded-2xl ${
                blogCta.backgroundStyle === 'minimal'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'bg-white/20 text-white'
              }`}>
                <FiEdit3 className="w-8 h-8" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 ${
                blogCta.backgroundStyle === 'minimal'
                  ? 'text-neutral-900 dark:text-neutral-100'
                  : 'text-white'
              }`}
              variants={itemVariants}
            >
              {blogCta.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className={`text-lg md:text-xl text-center mb-8 max-w-3xl mx-auto leading-relaxed ${
                blogCta.backgroundStyle === 'minimal'
                  ? 'text-neutral-600 dark:text-neutral-400'
                  : 'text-white/90'
              }`}
              variants={itemVariants}
            >
              {blogCta.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              {/* Primary Action */}
              <motion.a
                href={blogCta.primaryAction.link}
                className={`
                  inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg
                  transition-all duration-300 group relative overflow-hidden min-w-[200px]
                  ${blogCta.backgroundStyle === 'minimal'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                    : 'bg-white text-neutral-900 hover:bg-neutral-100 shadow-lg hover:shadow-xl'
                  }
                `}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBookOpen className="w-5 h-5" />
                <span>{blogCta.primaryAction.text}</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform"
                  whileHover={{ rotate: -45 }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.div>

                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ x: ["0%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.a>

              {/* Secondary Action */}
              <motion.a
                href={blogCta.secondaryAction.link}
                className={`
                  inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg
                  border-2 transition-all duration-300 group min-w-[200px]
                  ${blogCta.backgroundStyle === 'minimal'
                    ? 'border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    : 'border-white/30 text-white hover:border-white/50 hover:bg-white/10'
                  }
                `}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FiTrendingUp className="w-5 h-5" />
                <span>{blogCta.secondaryAction.text}</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
