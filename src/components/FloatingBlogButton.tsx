import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit3, FiArrowRight } from 'react-icons/fi';

export default function FloatingBlogButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // Show button after scrolling 300px
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.3 
          }}
        >
          <motion.a
            href="/blog"
            className="group relative inline-flex items-center gap-3 px-6 py-4 
              bg-gradient-to-r from-blue-500 to-purple-500 text-white 
              rounded-full shadow-lg hover:shadow-xl
              transition-all duration-300 overflow-hidden
              hover:from-blue-600 hover:to-purple-600"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Read my blog"
          >
            {/* Background pulse effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Icon */}
            <motion.div
              className="relative z-10"
              whileHover={{ rotate: 12 }}
              transition={{ duration: 0.2 }}
            >
              <FiEdit3 className="w-5 h-5" />
            </motion.div>

            {/* Text - hidden on mobile, shown on desktop */}
            <span className="relative z-10 font-semibold hidden sm:inline">
              Read Blog
            </span>

            {/* Arrow */}
            <motion.div
              className="relative z-10 group-hover:translate-x-1 transition-transform"
              whileHover={{ rotate: -45 }}
            >
              <FiArrowRight className="w-4 h-4" />
            </motion.div>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full rounded-full"
              animate={{ x: ["0%", "200%"] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />

            {/* Notification dot */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full
                border-2 border-white shadow-sm"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.a>

          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-2 
              bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 
              text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100
              transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            Explore my latest articles
            <div className="absolute top-full right-4 w-0 h-0 
              border-l-4 border-r-4 border-t-4 border-transparent 
              border-t-neutral-900 dark:border-t-neutral-100" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
