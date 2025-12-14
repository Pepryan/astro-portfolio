import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin, FiGitlab } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { componentConfig } from '../config/components';

const { cta } = componentConfig;

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Early return if not enabled
  if (!cta.enabled) return null;

  // Show loading state until mounted
  if (!mounted) {
    return (
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden bg-neutral-200 dark:bg-neutral-700 animate-pulse">
            <div className="relative z-10 text-center">
              <div className="h-16 bg-neutral-300 dark:bg-neutral-600 rounded mb-6"></div>
              <div className="h-8 bg-neutral-300 dark:bg-neutral-600 rounded max-w-3xl mx-auto mb-8"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="h-12 w-32 bg-neutral-300 dark:bg-neutral-600 rounded-2xl"></div>
                <div className="h-12 w-32 bg-neutral-300 dark:bg-neutral-600 rounded-2xl"></div>
              </div>
            </div>
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
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120
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
    <section
      ref={containerRef}
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 relative">
        <motion.div
          className={`relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden ${getBackgroundStyle()} glow-gradient`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Static Background Effects - CSS-based for performance */}
          {cta.backgroundStyle === 'gradient' && (
            <>
              {/* Static decorative elements instead of animated ones */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
              <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl" />
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
              <a
                href={cta.primaryAction.link}
                className="btn-stylized"
              >
                <span>{cta.primaryAction.text}</span>
                <FiArrowRight className="w-5 h-5" />
              </a>

              {/* Secondary Action */}
              <a
                href={cta.secondaryAction.link}
                className="btn-stylized-outline"
              >
                <span>{cta.secondaryAction.text}</span>
                <FiArrowRight className="w-5 h-5" />
              </a>
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

          {/* Static Decorative Elements - CSS only */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
