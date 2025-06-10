import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin, FiGitlab } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { componentConfig } from '../config/components';

const { cta } = componentConfig;

export default function CTASection() {
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

  if (!cta.enabled || !mounted) return null;

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
      y: 30,
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

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Pepryan', label: 'GitHub', color: 'hover:text-gray-600' },
    { icon: FiGitlab, href: 'https://gitlab.com/Pepryan', label: 'GitLab', color: 'hover:text-orange-500' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/febryanramadhan', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaXTwitter, href: 'https://x.com/pepryan', label: 'X (Twitter)', color: 'hover:text-black dark:hover:text-white' },
    { icon: FiMail, href: 'mailto:febryanramadhan@gmail.com', label: 'Email', color: 'hover:text-red-500' }
  ];

  const getBackgroundStyle = () => {
    switch (cta.backgroundStyle) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700';
      case 'pattern':
        return 'bg-neutral-900 dark:bg-neutral-800';
      case 'minimal':
        return 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700';
      default:
        return 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700';
    }
  };

  const getTextColor = () => {
    return cta.backgroundStyle === 'minimal' 
      ? 'text-neutral-900 dark:text-neutral-100'
      : 'text-white';
  };

  const getSubtitleColor = () => {
    return cta.backgroundStyle === 'minimal' 
      ? 'text-neutral-600 dark:text-neutral-400'
      : 'text-white/90';
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ scale }}
    >
      <div className="max-w-4xl mx-auto px-4 relative">
        <motion.div
          className={`relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden ${getBackgroundStyle()}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Background Effects */}
          {cta.backgroundStyle === 'gradient' && (
            <>
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                    "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))",
                    "linear-gradient(225deg, rgba(79, 70, 229, 0.2), rgba(59, 130, 246, 0.2))",
                    "linear-gradient(315deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating Elements */}
              <motion.div
                className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
                variants={floatingVariants}
                animate="animate"
              />
              <motion.div
                className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 2 }}
              />
            </>
          )}

          {/* Pattern Background */}
          {cta.backgroundStyle === 'pattern' && (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }} />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Main Title */}
            <motion.h2
              className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${getTextColor()}`}
              variants={itemVariants}
            >
              {cta.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className={`text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed ${getSubtitleColor()}`}
              variants={itemVariants}
            >
              {cta.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-12"
              variants={itemVariants}
            >
              {/* Primary Action */}
              <motion.a
                href={cta.primaryAction.link}
                className={`
                  inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg
                  transition-all duration-300 group
                  ${cta.backgroundStyle === 'minimal' 
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
                <span>{cta.primaryAction.text}</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform"
                  whileHover={{ rotate: -45 }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>

              {/* Secondary Action */}
              <motion.a
                href={cta.secondaryAction.link}
                className={`
                  inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg
                  border-2 transition-all duration-300 group
                  ${cta.backgroundStyle === 'minimal'
                    ? 'border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500'
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
                <span>{cta.secondaryAction.text}</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform"
                  whileHover={{ rotate: -45 }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            {cta.showSocialLinks && (
              <motion.div
                className="flex justify-center gap-4"
                variants={itemVariants}
              >
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-3 rounded-xl transition-all duration-300 group
                      ${cta.backgroundStyle === 'minimal'
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                      }
                      ${color}
                    `}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -4,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
