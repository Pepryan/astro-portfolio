import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiArrowUpRight, FiTrendingUp } from 'react-icons/fi';
import { componentConfig } from '../config/components';

const { bentoGrid } = componentConfig;

export default function BentoGrid() {
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

  if (!bentoGrid.enabled || !mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: bentoGrid.animationType === 'stagger' ? 0.1 : 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
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

  const getCardSize = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-500/10 to-blue-600/5 dark:from-blue-400/10 dark:to-blue-500/5',
        border: 'border-blue-200/50 dark:border-blue-700/50',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:from-blue-500/20 hover:to-blue-600/10'
      },
      green: {
        bg: 'from-green-500/10 to-green-600/5 dark:from-green-400/10 dark:to-green-500/5',
        border: 'border-green-200/50 dark:border-green-700/50',
        text: 'text-green-600 dark:text-green-400',
        hover: 'hover:from-green-500/20 hover:to-green-600/10'
      },
      purple: {
        bg: 'from-purple-500/10 to-purple-600/5 dark:from-purple-400/10 dark:to-purple-500/5',
        border: 'border-purple-200/50 dark:border-purple-700/50',
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:from-purple-500/20 hover:to-purple-600/10'
      },
      orange: {
        bg: 'from-orange-500/10 to-orange-600/5 dark:from-orange-400/10 dark:to-orange-500/5',
        border: 'border-orange-200/50 dark:border-orange-700/50',
        text: 'text-orange-600 dark:text-orange-400',
        hover: 'hover:from-orange-500/20 hover:to-orange-600/10'
      },
      red: {
        bg: 'from-red-500/10 to-red-600/5 dark:from-red-400/10 dark:to-red-500/5',
        border: 'border-red-200/50 dark:border-red-700/50',
        text: 'text-red-600 dark:text-red-400',
        hover: 'hover:from-red-500/20 hover:to-red-600/10'
      },
      indigo: {
        bg: 'from-indigo-500/10 to-indigo-600/5 dark:from-indigo-400/10 dark:to-indigo-500/5',
        border: 'border-indigo-200/50 dark:border-indigo-700/50',
        text: 'text-indigo-600 dark:text-indigo-400',
        hover: 'hover:from-indigo-500/20 hover:to-indigo-600/10'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 to-transparent
          dark:from-neutral-900/50 dark:to-transparent"
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
            variants={cardVariants}
          >
            {bentoGrid.title}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            variants={cardVariants}
          >
            {bentoGrid.subtitle}
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {bentoGrid.cards.map((card, index) => {
            const colors = getColorClasses(card.color);
            const CardComponent = card.interactive ? motion.a : motion.div;
            
            return (
              <CardComponent
                key={card.id}
                href={card.link || undefined}
                className={`
                  ${getCardSize(card.size)}
                  group relative p-6 rounded-2xl border backdrop-blur-sm
                  bg-gradient-to-br ${colors.bg} ${colors.border}
                  hover:bg-gradient-to-br ${colors.hover}
                  transition-all duration-300 cursor-pointer
                  ${card.interactive ? 'hover:scale-[1.02] hover:shadow-xl' : 'hover:scale-[1.01]'}
                  ${card.size === 'large' ? 'min-h-[300px] md:min-h-[400px]' : 'min-h-[200px]'}
                `}
                variants={cardVariants}
                whileHover={card.interactive ? { 
                  y: -4,
                  transition: { type: "spring", stiffness: 300 }
                } : { scale: 1.01 }}
                whileTap={card.interactive ? { scale: 0.98 } : {}}
              >
                {/* Card Content */}
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`text-3xl ${card.size === 'large' ? 'md:text-4xl' : ''}`}
                      whileHover={card.interactive ? { 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 }
                      } : {}}
                    >
                      {card.icon}
                    </motion.div>
                    
                    {card.interactive && (
                      <motion.div
                        className={`${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${colors.text} ${card.size === 'large' ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                      {card.title}
                    </h3>
                    <p className={`text-neutral-600 dark:text-neutral-400 ${card.size === 'large' ? 'text-base md:text-lg' : 'text-sm'}`}>
                      {card.description}
                    </p>
                  </div>

                  {/* Stats (if available) */}
                  {card.stats && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          {card.stats.label}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`font-bold ${colors.text}`}>
                            {card.stats.value}
                          </span>
                          <FiTrendingUp className={`w-4 h-4 ${colors.text}`} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent
                      dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              </CardComponent>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
