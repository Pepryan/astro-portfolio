import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiGitlab, FiArrowDown, FiEdit3, FiArrowRight } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { componentConfig } from '../config/components';
import { useEffect, useState } from 'react';

const { hero } = componentConfig;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Story progression animation - only if enabled and user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hero.storytellingMotion && !prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % 2);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, []);

  // Simplified animation variants - removed heavy scroll transforms
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

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Pepryan', label: 'GitHub' },
    { icon: FiGitlab, href: 'https://gitlab.com/Pepryan', label: 'GitLab' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/febryanramadhan', label: 'LinkedIn' },
    { icon: FaXTwitter, href: 'https://x.com/pepryan', label: 'X (Twitter)' },
    { icon: FiMail, href: 'mailto:febryanramadhan@gmail.com', label: 'Email' }
  ];

  const scrollToTech = () => {
    const techSection = document.getElementById('tech');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const storyTexts = [
    hero.story?.intro || hero.subtitle,
    hero.story?.journey || "Crafting digital experiences with passion and precision"
  ];

  if (!mounted) {
    return (
      <div className="text-center py-8 space-y-8 min-h-[80vh] flex flex-col justify-center">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
        </div>
        <div className="h-16 bg-neutral-200 dark:bg-neutral-700 rounded-lg max-w-md mx-auto animate-pulse" />
        <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded max-w-lg mx-auto animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.div
        className="text-center py-8 space-y-8 relative overflow-visible min-h-[80vh] flex flex-col justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Floating Story Elements - CSS-based for better performance */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float pointer-events-none select-none">
          💻
        </div>
        <div className="absolute top-32 right-16 text-6xl opacity-20 animate-float-delayed pointer-events-none select-none">
          ☁️
        </div>
        <div className="absolute bottom-16 left-20 text-5xl opacity-20 animate-float-delayed-2 pointer-events-none select-none">
          🚀
        </div>

        {/* Main Content */}
        <motion.div className="space-y-8 mt-10 relative z-10" variants={itemVariants}>
          {/* Profile Photo */}
          <motion.div className="flex justify-center mb-8" variants={itemVariants}>
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient ring around photo - simplified */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-opacity duration-300" />

              {/* Photo container */}
              <motion.div
                className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-white dark:bg-neutral-800 p-1 glow-gradient"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="/images/photo-web-febryan.webp"
                  alt="Febryan Ramadhan"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
                {/* Subtle inner shadow for depth */}
                <div className="absolute inset-0 rounded-full shadow-inner opacity-20" />
              </motion.div>

              {/* Decorative particles - CSS-based */}
              <div className="absolute top-4 -right-2 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse-glow" />
              <div className="absolute -bottom-2 -left-4 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </motion.div>
          </motion.div>

          {/* Title with Enhanced Gradient + Animation */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold px-4 pb-2 hero-title-gradient"
            variants={titleVariants}
          >
            {hero.title}
          </motion.h1>

          {/* Tagline */}
          {hero.tagline && (
            <motion.p
              className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto px-4 font-medium"
              variants={itemVariants}
            >
              {hero.tagline}
            </motion.p>
          )}

          {/* Dynamic Story Text - Simplified */}
          <motion.div className="h-16 flex items-center justify-center" variants={itemVariants}>
            {hero.storytellingMotion ? (
              <motion.p
                key={currentStoryIndex}
                className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4 leading-relaxed text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {storyTexts[currentStoryIndex]}
              </motion.p>
            ) : (
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4 leading-relaxed text-center">
                {storyTexts[0]}
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-4 max-w-md mx-auto"
          variants={itemVariants}
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-3 sm:p-4 text-neutral-600 dark:text-neutral-400
                hover:text-blue-600 dark:hover:text-blue-400
                hover:bg-blue-50 dark:hover:bg-blue-900/20
                rounded-full transition-all duration-300 group hover-glow
                min-w-[48px] min-h-[48px] flex items-center justify-center"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 flex-shrink-0" />
            </motion.a>
          ))}
        </motion.div>

        {/* Blog CTA Button */}
        <motion.div className="flex justify-center pt-8" variants={itemVariants}>
          <a
            href="/blog"
            className="btn-stylized"
          >
            <FiEdit3 className="w-5 h-5" />
            <span>Explore My Blog</span>
            <FiArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div className="flex justify-center pt-8" variants={itemVariants}>
          <motion.button
            onClick={scrollToTech}
            className="flex flex-col items-center gap-3 text-neutral-500 dark:text-neutral-400
              hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors group"
            whileHover={{ y: -4 }}
            whileTap={{ y: -2 }}
            aria-label="Scroll to about section"
          >
            <div className="relative animate-float-slow">
              <FiArrowDown className="w-6 h-6 group-hover:text-blue-500 transition-colors" />
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
