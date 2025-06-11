import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiGitlab, FiArrowDown, FiEdit3, FiArrowRight } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { componentConfig } from '../config/components';
import { useEffect, useState, useRef } from 'react';

const { hero } = componentConfig;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setMounted(true);

    // Story progression animation
    if (hero.storytellingMotion) {
      const interval = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % 2);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, []);

  // Enhanced animation variants for storytelling
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

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const storyVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('story');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const storyTexts = [
    hero.story?.intro || hero.subtitle,
    hero.story?.journey || "Crafting digital experiences with passion and precision"
  ];

  // Instead of conditional return, render conditionally
  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: mounted ? opacity : 0, y }}
      className="relative"
    >
      {mounted && (
        <motion.div
          className="text-center py-8 space-y-8 relative overflow-hidden min-h-[80vh] flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Enhanced Background with Storytelling Elements */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent
              dark:from-blue-900/10 dark:via-purple-900/10 dark:to-transparent -z-10"
          />

          {/* Floating Story Elements */}
          <motion.div
            className="absolute top-20 left-10 text-6xl opacity-20"
            variants={floatingVariants}
            animate="animate"
          >
            💻
          </motion.div>
          <motion.div
            className="absolute top-32 right-16 text-4xl opacity-20"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
          >
            ☁️
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-20 text-5xl opacity-20"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
          >
            🚀
          </motion.div>

          {/* Main Content with Storytelling */}
          <motion.div
            className="space-y-8 mt-10 relative z-10"
            variants={itemVariants}
          >
            {/* Title with Enhanced Animation */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-100 px-4"
              variants={titleVariants}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {hero.title}
            </motion.h1>

            {/* Tagline */}
            {hero.tagline && (
              <motion.p
                className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400
                  max-w-2xl mx-auto px-4 font-medium"
                variants={storyVariants}
                initial="hidden"
                animate="visible"
              >
                {hero.tagline}
              </motion.p>
            )}

            {/* Dynamic Story Text */}
            <motion.div
              className="h-16 flex items-center justify-center"
              variants={storyVariants}
            >
              <motion.p
                key={currentStoryIndex}
                className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400
                  max-w-3xl mx-auto px-4 leading-relaxed text-center"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {storyTexts[currentStoryIndex]}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6 px-4"
            variants={itemVariants}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 text-neutral-600 dark:text-neutral-400
                  hover:text-blue-600 dark:hover:text-blue-400
                  hover:bg-blue-50 dark:hover:bg-blue-900/20
                  rounded-full transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="w-6 h-6 relative z-10" />

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Blog CTA Button */}
          <motion.div
            className="flex justify-center pt-8"
            variants={itemVariants}
          >
            <motion.a
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg
                bg-gradient-to-r from-blue-500 to-purple-500 text-white
                hover:from-blue-600 hover:to-purple-600
                shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-600/30
                transition-all duration-300 group relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEdit3 className="w-5 h-5" />
              <span>Explore My Blog</span>
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
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.a>
          </motion.div>

          <motion.div
            className="flex justify-center pt-8"
            variants={itemVariants}
          >
            <motion.button
              onClick={scrollToAbout}
              className="flex flex-col items-center gap-3 text-neutral-500 dark:text-neutral-400
                hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors group"
              whileHover={{ y: -4 }}
              whileTap={{ y: -2 }}
              aria-label="Scroll to about section"
            >
              {/* <span className="text-sm font-medium tracking-wide">Learn More</span> */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative"
              >
                <FiArrowDown className="w-6 h-6 group-hover:text-blue-500 transition-colors" />

                {/* Animated circle around arrow */}
                <motion.div
                  className="absolute inset-0 border-2 border-current rounded-full opacity-30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
