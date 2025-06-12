import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiBriefcase, FiAward } from 'react-icons/fi';
import { componentConfig } from '../config/components';

export default function FloatingNavigation() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');

  // Check if floating navigation is enabled
  const isEnabled = componentConfig.navigation.floating.enabled;

  // Early return if not enabled
  if (!isEnabled) {
    return null;
  }

  useEffect(() => {
    setMounted(true);

    // Track scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      // Sort entries by their position on the page
      const sortedEntries = entries.sort((a, b) => {
        return a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top;
      });

      // Find the most appropriate section to highlight
      let targetSection = null;

      for (const entry of sortedEntries) {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
          const sectionId = entry.target.id;

          // Special handling for home section
          if (sectionId === 'home') {
            // If scrolling up and home section is visible, always activate it
            if (scrollDirection.current === 'up' && rect.top <= window.innerHeight * 0.5) {
              targetSection = sectionId;
              break;
            }
            // If scrolling down, need higher threshold
            if (scrollDirection.current === 'down' && entry.intersectionRatio > 0.6) {
              targetSection = sectionId;
            }
          } else {
            // For other sections, use standard logic
            if (entry.intersectionRatio > 0.3) {
              targetSection = sectionId;
            }
          }
        }
      }

      // If we found a target section, update active state
      if (targetSection) {
        setActiveSection(targetSection);
      }
    }, {
      threshold: [0.1, 0.3, 0.5, 0.6, 0.8],
      rootMargin: '-10% 0px -10% 0px'
    });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define variables and functions after hooks but before conditional returns
  const navItems = [
    { id: 'home', icon: FiHome, label: 'Home' },
    { id: 'about', icon: FiUser, label: 'About' },
    { id: 'experience', icon: FiBriefcase, label: 'Experience-Education' },
    { id: 'skills', icon: FiAward, label: 'Skills-Project-Cert' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show loading state until mounted
  if (!mounted) {
    return (
      <nav className="fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 px-3 py-3 sm:px-4 sm:py-3
        bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md rounded-full
        shadow-lg border border-neutral-200 dark:border-neutral-700 z-40 opacity-50"
        style={{ willChange: 'transform' }}>
        <div className="flex items-center gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-10 h-10 bg-neutral-200 dark:bg-neutral-600 rounded-full animate-pulse"></div>
          ))}
        </div>
      </nav>
    );
  }

  // Render the actual component
  return (
    <nav className="fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 px-3 py-3 sm:px-4 sm:py-3
      bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md rounded-full
      shadow-lg border border-neutral-200 dark:border-neutral-700 z-40"
      style={{ willChange: 'transform' }}>
      <motion.div
        className="flex items-center gap-3 sm:gap-4"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          return (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative p-2 sm:p-2.5 rounded-full transition-all duration-300 group
                ${isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/70'
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />

              {/* Active indicator dot for mobile */}
              {isActive && (
                <motion.span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full sm:hidden"
                  layoutId="activeIndicator"
                />
              )}

              {/* Tooltip - Hidden on mobile */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1
                bg-neutral-800/90 dark:bg-neutral-700/90 text-white text-xs rounded
                opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                hidden sm:block">
                {label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </nav>
  );
}
