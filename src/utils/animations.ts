/**
 * Modern Animation Utilities for 2025 UI/UX
 * Lightweight and performant animations using Framer Motion
 */

import type { Variants } from 'framer-motion';

// Easing curves for modern feel
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  sharp: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.46, 0.45, 0.94],
} as const;

// Container animations with stagger
export const containerVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: easings.smooth,
    }
  }
};

// Enhanced item animations
export const itemVariants: Variants = {
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
      duration: 0.6,
      ease: easings.smooth,
    }
  }
};

// Slide in from different directions
export const slideVariants = {
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: easings.smooth }
    }
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: easings.smooth }
    }
  },
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: easings.smooth }
    }
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: easings.smooth }
    }
  }
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.bounce,
    }
  }
};

// Hover animations
export const hoverVariants = {
  gentle: {
    scale: 1.02,
    transition: { duration: 0.2, ease: easings.gentle }
  },
  lift: {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2, ease: easings.gentle }
  },
  glow: {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
    transition: { duration: 0.2, ease: easings.gentle }
  }
};

// Tap animations
export const tapVariants = {
  gentle: { scale: 0.98 },
  strong: { scale: 0.95 },
  bounce: { scale: 0.9 }
};

// Page transition animations
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easings.sharp
    }
  }
};

// Floating animations
export const floatingVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.gentle
    }
  }
};

// Pulse animation
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.gentle
    }
  }
};

// Parallax scroll effect
export const parallaxVariants = {
  slow: (offset: number) => ({
    y: offset * 0.5,
    transition: { type: "tween", ease: "linear" }
  }),
  medium: (offset: number) => ({
    y: offset * 0.3,
    transition: { type: "tween", ease: "linear" }
  }),
  fast: (offset: number) => ({
    y: offset * 0.1,
    transition: { type: "tween", ease: "linear" }
  })
};

// Stagger configurations
export const staggerConfig = {
  fast: {
    staggerChildren: 0.05,
    delayChildren: 0.1
  },
  medium: {
    staggerChildren: 0.1,
    delayChildren: 0.2
  },
  slow: {
    staggerChildren: 0.2,
    delayChildren: 0.3
  }
};

// Scroll-triggered animations
export const scrollVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.smooth
    }
  }
};

// Card hover effects
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2, ease: easings.gentle }
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2, ease: easings.gentle }
  }
};

// Button animations
export const buttonVariants = {
  rest: {
    scale: 1,
    transition: { duration: 0.2, ease: easings.gentle }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: easings.gentle }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1, ease: easings.sharp }
  }
};

// Loading animations
export const loadingVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Text reveal animations
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: easings.smooth
    }
  })
};

// Magnetic effect for interactive elements
export const magneticVariants = {
  rest: { x: 0, y: 0 },
  hover: (offset: { x: number; y: number }) => ({
    x: offset.x * 0.3,
    y: offset.y * 0.3,
    transition: { duration: 0.2, ease: easings.gentle }
  })
};
