// SEO Configuration
export const seoConfig = {
  // Site Information
  site: {
    name: "Febryan Portfolio",
    title: "Febryan Portfolio - Cloud Engineer & DevOps Specialist",
    description: "Personal portfolio and technical blog by Febryan Ramadhan. Cloud Engineer specializing in DevOps, Infrastructure, and Automation. Sharing tutorials and insights about modern technology.",
    url: "https://febryan.web.id",
    language: "id",
    locale: "id_ID",
    charset: "UTF-8"
  },

  // Author Information
  author: {
    name: "Febryan Ramadhan",
    email: "febryanramadhan@gmail.com",
    url: "https://febryan.web.id",
    jobTitle: "Cloud Engineer & DevOps Specialist",
    location: "Bogor, Indonesia",
    bio: "Cloud Engineer specializing in DevOps, Infrastructure, and Automation",
    image: "https://febryan.web.id/images/profile.jpg"
  },

  // Social Media
  social: {
    twitter: {
      username: "@pepryan",
      card: "summary_large_image"
    },
    linkedin: "https://linkedin.com/in/febryanramadhan",
    github: "https://github.com/Pepryan",
    gitlab: "https://gitlab.com/Pepryan"
  },

  // Default Images
  images: {
    default: "https://febryan.web.id/images/default-og-image.png",
    logo: "https://febryan.web.id/images/logo.png",
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png"
  },

  // Default Keywords
  keywords: [
    "Cloud Engineer",
    "DevOps",
    "Infrastructure",
    "Automation",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Portfolio",
    "Blog",
    "DevSecOps",
    "Terraform",
    "Ansible",
    "Python",
    "Bash"
  ],

  // Theme and Branding
  theme: {
    color: "#3b82f6",
    backgroundColor: "#ffffff",
    darkBackgroundColor: "#0a0a0a"
  },

  // Analytics and Tracking
  analytics: {
    enabled: false, // Disabled by default for better performance
    googleAnalyticsId: "G-FEVJVQ6XD9", // Replace with actual GA4 ID
    googleTagManagerId: "", // Optional
    microsoftClarityId: "", // Optional
    loadOnlyInProduction: true, // Only load analytics in production
    respectDoNotTrack: true, // Respect user's Do Not Track preference
  },

  // Blog Configuration
  blog: {
    title: "Febryan Blog",
    description: "Technical blog about cloud engineering, DevOps, infrastructure, automation, and modern web development",
    postsPerPage: 6,
    showReadingTime: true,
    showWordCount: true,
    enableComments: true,
    // Blog Page Layout Settings
    layout: {
      showStats: false, // Show post count and topics count - set to false to hide
      showPaginationInfo: false, // Show "Showing 1-6 of 14" and "14 blog posts" info
      compactLayout: true, // Use compact spacing and seamless design
      terminology: "posts", // "posts" or "articles" - affects all labels
      statsLabels: {
        posts: "posts", // Can be changed to "articles", "writings", etc.
        topics: "topics" // Can be changed to "categories", "tags", etc.
      }
    }
  },

  // Organization Schema (for structured data)
  organization: {
    name: "Febryan Portfolio",
    url: "https://febryan.web.id",
    logo: "https://febryan.web.id/images/logo.png",
    sameAs: [
      "https://linkedin.com/in/febryanramadhan",
      "https://github.com/Pepryan",
      "https://gitlab.com/Pepryan",
      "https://x.com/pepryan"
    ]
  }
};

export const componentConfig = {
  // Animation Configuration
  animations: {
    enabled: true,
    reducedMotion: true, // Respect user's motion preferences by default
    performanceMode: true, // Enable performance optimizations
    staggerDelay: 0.1,
    duration: {
      fast: 0.2, // Reduced for better performance
      medium: 0.4, // Reduced for better performance
      slow: 0.6 // Reduced for better performance
    },
    easing: {
      smooth: [0.25, 0.1, 0.25, 1],
      bounce: [0.68, -0.55, 0.265, 1.55],
      elastic: [0.175, 0.885, 0.32, 1.275]
    }
  },

  // Homepage Configuration (2025 Design)
  homepage: {
    enabled: true,
    layout: '2025', // 'traditional' or '2025'
    sections: {
      hero: { enabled: true },
      story: { enabled: true },
      bentoGrid: { enabled: true },
      featuredWork: { enabled: true },
      cta: { enabled: true }
    }
  },

  // Hero Section Configuration (2025 Storytelling)
  hero: {
    enabled: true,
    title: "Febryan Ramadhan",
    subtitle: "Cloud Engineer | DevSecOps | Web | Automation | AI",
    tagline: "Building the future, one line of code at a time",
    story: {
      intro: "From tinkering with PCs in junior high to architecting cloud solutions",
      journey: "A passionate technologist crafting scalable digital experiences"
    },
    showSocialLinks: true,
    showScrollIndicator: true,
    backgroundAnimation: false, // Disabled for better performance
    titleAnimation: true,
    storytellingMotion: false, // Disabled for better performance - this was causing heavy animations
    socialLinks: [
      { platform: 'github', url: 'https://github.com/Pepryan', enabled: true },
      { platform: 'gitlab', url: 'https://gitlab.com/Pepryan', enabled: true },
      { platform: 'linkedin', url: 'https://linkedin.com/in/febryanramadhan', enabled: true },
      { platform: 'twitter', url: 'https://x.com/pepryan', enabled: true },
      { platform: 'email', url: 'mailto:febryanramadhan@gmail.com', enabled: true }
    ]
  },

  // Story Journey Section (2025)
  storyJourney: {
    enabled: true,
    title: "My Journey",
    subtitle: "From curiosity to expertise",
    milestones: [
      {
        year: "2011",
        title: "The Beginning",
        description: "Started with PC building and hardware optimization",
        icon: "🔧",
        color: "blue"
      },
      {
        year: "2020",
        title: "Web Development",
        description: "Dove into web development and CRM solutions",
        icon: "💻",
        color: "green"
      },
      {
        year: "2022",
        title: "Cloud Engineer",
        description: "Specialized in cloud infrastructure and DevOps",
        icon: "☁️",
        color: "purple"
      },
      {
        year: "2025",
        title: "Innovation",
        description: "Building scalable solutions for the future",
        icon: "🚀",
        color: "orange"
      }
    ],
    animationType: "progressive", // "progressive", "timeline", "floating"
    showConnectors: true
  },

  // Bento Grid Section (2025)
  bentoGrid: {
    enabled: true,
    title: "What I Do",
    subtitle: "Crafting digital experiences with modern technology",
    cards: [
      {
        id: "cloud-architecture",
        title: "Cloud Architecture",
        description: "Designing scalable cloud solutions",
        icon: "☁️",
        size: "large", // large, medium, small
        color: "blue",
        interactive: true,
        link: "/projects#cloud",
        stats: { label: "Projects", value: "15+" }
      },
      {
        id: "devops",
        title: "DevOps",
        description: "Automation & CI/CD",
        icon: "⚙️",
        size: "medium",
        color: "green",
        interactive: true,
        link: "/projects#devops",
        stats: { label: "Deployments", value: "100+" }
      },
      {
        id: "web-dev",
        title: "Web Development",
        description: "Modern web applications",
        icon: "🌐",
        size: "medium",
        color: "purple",
        interactive: true,
        link: "/projects#web",
        stats: { label: "Apps Built", value: "20+" }
      },
      {
        id: "location",
        title: "Based in Bogor",
        description: "Indonesia 🇮🇩",
        icon: "📍",
        size: "small",
        color: "orange",
        interactive: false
      },
      {
        id: "experience",
        title: "4+ Years",
        description: "Professional Experience",
        icon: "⏱️",
        size: "small",
        color: "red",
        interactive: false
      },
      {
        id: "blog",
        title: "Tech Blog",
        description: "Sharing knowledge",
        icon: "✍️",
        size: "medium",
        color: "indigo",
        interactive: true,
        link: "/blog"
      }
    ],
    layout: "masonry", // "masonry", "grid"
    animationType: "stagger" // "stagger", "wave", "cascade"
  },

  // Featured Work Section (2025)
  featuredWork: {
    enabled: true,
    title: "Featured Work",
    subtitle: "Showcasing my best projects and achievements",
    items: [
      {
        id: "astro-portfolio",
        title: "Astro Portfolio 2025",
        description: "Modern portfolio with storytelling motion design and 2025 web standards",
        image: null, // No image, will show default icon
        tags: ["Astro", "React", "TailwindCSS", "Framer Motion"],
        link: "https://github.com/Pepryan/astro-portfolio",
        github: "https://github.com/Pepryan/astro-portfolio",
        demo: "https://febryan.web.id",
        featured: true,
        category: "Web"
      },
      {
        id: "openstack-resource",
        title: "OpenStack Resource Manager",
        description: "Resource management tools and automation scripts for OpenStack cloud infrastructure",
        image: null,
        tags: ["OpenStack", "Python", "Cloud", "Automation"],
        link: "https://github.com/Pepryan/openstack-resource",
        github: "https://github.com/Pepryan/openstack-resource",
        featured: true,
        category: "Cloud"
      },
      {
        id: "gitops-lab",
        title: "GitOps Laboratory",
        description: "GitOps practices and CI/CD pipeline implementations for modern DevOps workflows",
        image: null,
        tags: ["GitOps", "CI/CD", "Kubernetes", "DevOps"],
        link: "https://github.com/Pepryan/gitops-lab",
        github: "https://github.com/Pepryan/gitops-lab",
        featured: true,
        category: "DevOps"
      }
    ],
    layout: "grid", // "carousel", "grid", "masonry"
    showViewAll: true,
    viewAllLink: "/projects"
  },

  // CTA Section (2025)
  cta: {
    enabled: true,
    title: "Let's Build Something Amazing",
    subtitle: "Ready to bring your ideas to life? Let's connect and create something extraordinary together.",
    primaryAction: {
      text: "Get In Touch",
      link: "/contact",
      style: "primary"
    },
    secondaryAction: {
      text: "View My Work",
      link: "/projects",
      style: "secondary"
    },
    backgroundStyle: "minimal", // "gradient", "pattern", "minimal"
    showSocialLinks: true
  },

  // Blog CTA Section (2025)
  blogCta: {
    enabled: true,
    title: "Explore My Thoughts & Insights",
    subtitle: "Discover articles about cloud engineering, DevOps practices, and modern web development. Join me on this journey of continuous learning and sharing knowledge.",
    primaryAction: {
      text: "Read My Blog",
      link: "/blog",
      style: "primary"
    },
    secondaryAction: {
      text: "Latest Articles",
      link: "/blog",
      style: "secondary"
    },
    backgroundStyle: "gradient", // "gradient", "pattern", "minimal"
    showSocialLinks: false,
    placement: "hero" // "hero", "between-sections", "before-cta"
  },

  // Page Configurations (Separate Pages)
  pages: {
    about: {
      enabled: false,
      showInNavigation: true,
      sections: {
        story: true,
        experience: true,
        education: true,
        skills: true,
        interests: true,
        stats: true
      }
    },
    projects: {
      enabled: true,
      showInNavigation: true,
      layout: "grid", // "grid", "masonry", "list"
      showFilters: true,
      categories: ["All", "Cloud", "DevOps", "Web", "Automation"],
      cta: {
        enabled: true,
        title: "Have a Project in Mind?",
        subtitle: "Let's collaborate and bring your ideas to life with modern technology and best practices.",
        backgroundStyle: "minimal", // "gradient", "pattern", "minimal"
        primaryAction: {
          text: "Get In Touch",
          link: "/contact"
        },
        secondaryAction: {
          text: "Read My Blog",
          link: "/blog"
        }
      }
    },
    contact: {
      enabled: true,
      showInNavigation: true,
      title: "Contact",
      description: "Get in touch for collaborations, opportunities, or just to say hello!"
    },
    resume: {
      enabled: false,
      showInNavigation: false, // Hidden by default, accessible via direct link
      format: "traditional",
      downloadable: true,
      pdfPath: "/documents/febryan-resume.pdf"
    }
  },

  // About Section Configuration (For separate /about page)
  about: {
    enabled: true,
    title: "About Me",
    showStats: true,
    showInterests: true,
    showCurrentFocus: true,
    content: {
      introduction: "Hello, and welcome to my blog!\n\nMy name is Ryan a tech enthusiast living in Bogor, Indonesia. My main interest in Information Technology started since I was at junior high school. That time, I had built some PCs, over-clocked them, enjoyed some gaming, and hardware optimization.",
      current: "Now, I work as a Cloud Engineer focusing on DevOps practices, infrastructure automation, and cloud-native applications. I'm passionate about building scalable, reliable systems and sharing knowledge through this blog.",
      personal: "When I'm not coding or managing infrastructure, you'll find me exploring new technologies, contributing to open-source projects, or enjoying the great outdoors. I believe in continuous learning and love sharing what I discover along the way."
    },
    stats: {
      experience: "4+ Years",
      location: "Bogor, ID",
      focus: "Cloud & DevOps"
    },
    currentFocus: [
      "Cloud Architecture",
      "Infrastructure Automation",
      "Web Development",
      "Cloud-Native Apps"
    ],
    interests: [
      "New Technologies",
      "Trekking & Nature",
      "Reading"
    ]
  },
  // Experience Section Configuration
  experience: {
    enabled: true,
    title: "Experience",
    showTimeline: true,
    animateOnScroll: true,
    items: [
      {
        id: 'boer-tech',
        role: 'Cloud Engineer',
        company: 'PT. Boer Technology',
        period: '2022 - Present',
        location: 'Jakarta',
        type: 'Full-time',
        current: true,
        responsibilities: [
          'Managed OpenStack and Kubernetes infrastructure',
          'Implemented monitoring solutions with Grafana & Prometheus',
          'Automated tasks using Python and Bash scripting',
          'Maintained high availability for cloud services'
        ],
        technologies: ['OpenStack', 'Kubernetes', 'Grafana', 'Prometheus', 'Python', 'Bash']
      },
      {
        id: 'ciptadra',
        role: 'Web Developer',
        company: 'PT. Ciptadra Softindo',
        period: '2020 - 2021',
        location: 'Depok',
        type: 'Full-time',
        current: false,
        responsibilities: [
          'Developed CRM solutions using PHP frameworks',
          'Implemented Docker containerization',
          'Managed client support and issue resolution',
          'Collaborated in hybrid work environment'
        ],
        technologies: ['PHP', 'Docker', 'CRM', 'MySQL']
      }
    ]
  },
  // Education Section Configuration
  education: {
    enabled: true,
    title: "Education",
    showTimeline: true,
    animateOnScroll: true,
    items: [
      {
        id: 'gunadarma',
        degree: 'Bachelor of Information Systems',
        institution: 'Gunadarma University',
        period: '2014 - 2021',
        location: 'Depok',
        type: 'Bachelor\'s Degree',
        gpa: null, // Optional
        achievements: []
      },
      {
        id: 'smkn3',
        degree: 'Computer and Network Engineering',
        institution: 'SMKN 3 Bogor',
        period: '2011 - 2014',
        location: 'Bogor',
        type: 'Vocational High School',
        gpa: null,
        achievements: []
      }
    ]
  },

  // Skills Section Configuration
  skills: {
    enabled: true,
    title: "Skills",
    showProgress: false, // Show skill level progress bars
    animateOnScroll: true,
    layout: 'grid', // 'grid' or 'list'
    categories: [
      {
        id: 'cloud-infra',
        title: "Cloud & Infrastructure",
        color: 'blue',
        items: [
          { name: "AWS", focus: "EC2, S3, RDS, Lambda", level: 85 },
          { name: "OpenStack", focus: "Private Cloud Management", level: 90 },
          { name: "Kubernetes", focus: "Container Orchestration", level: 80 },
          { name: "Docker", focus: "Containerization", level: 95 }
        ]
      },
      {
        id: 'devops-automation',
        title: "DevOps & Automation",
        color: 'green',
        items: [
          { name: "CI/CD", focus: "GitLab CI, Jenkins", level: 85 },
          { name: "Infrastructure as Code", focus: "Terraform, Ansible", level: 80 },
          { name: "Monitoring", focus: "Prometheus, Grafana", level: 90 },
          { name: "Scripting", focus: "Python, Bash", level: 95 }
        ]
      }
    ]
  },

  // Projects/Portfolio Section Configuration
  projects: {
    enabled: true,
    title: "Projects & Certifications",
    showFilters: true,
    animateOnScroll: true,
    categories: ['All', 'Cloud', 'DevOps', 'Web', 'Automation'],
    items: [
      {
        id: "astro-portfolio",
        title: "Astro Portfolio 2025",
        description: "Modern portfolio with storytelling motion design and 2025 web standards. Built with Astro, React, and Framer Motion for optimal performance and engaging user experience.",
        image: null,
        tags: ["Astro", "React", "TailwindCSS", "Framer Motion", "TypeScript"],
        link: "https://github.com/Pepryan/astro-portfolio",
        github: "https://github.com/Pepryan/astro-portfolio",
        demo: "https://febryan.web.id",
        featured: true,
        category: "Web",
        status: "Active",
        year: "2025"
      },
      {
        id: "openstack-resource",
        title: "OpenStack Resource Manager",
        description: "Comprehensive resource management tools and automation scripts for OpenStack cloud infrastructure. Includes monitoring, scaling, and optimization utilities.",
        image: null,
        tags: ["OpenStack", "Python", "Cloud", "Automation", "Infrastructure"],
        link: "https://github.com/Pepryan/openstack-resource",
        github: "https://github.com/Pepryan/openstack-resource",
        featured: true,
        category: "Cloud",
        status: "Active",
        year: "2024"
      },
      {
        id: "dzikir-pagi-petang",
        title: "Dzikir Pagi Petang",
        description: "Islamic prayer and dhikr application for daily spiritual practice. Features morning and evening prayers with beautiful UI and offline support.",
        image: null,
        tags: ["Mobile App", "Islamic", "Prayer", "Spiritual", "Offline"],
        link: "https://github.com/Pepryan/dzikir-pagi-petang",
        github: "https://github.com/Pepryan/dzikir-pagi-petang",
        featured: false,
        category: "Web",
        status: "Completed",
        year: "2023"
      },
      {
        id: "portfolio-nextjs",
        title: "Portfolio Next.js 15",
        description: "Previous portfolio version built with Next.js 15 before migration to Astro. Showcases evolution of web development practices and performance optimization.",
        image: null,
        tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Vercel"],
        link: "https://github.com/Pepryan/portfolio",
        github: "https://github.com/Pepryan/portfolio",
        featured: false,
        category: "Web",
        status: "Archived",
        year: "2024"
      },
      {
        id: "gitops-lab",
        title: "GitOps Laboratory",
        description: "Comprehensive GitOps practices and CI/CD pipeline implementations for modern DevOps workflows. Includes Kubernetes deployments, monitoring, and automation.",
        image: null,
        tags: ["GitOps", "CI/CD", "Kubernetes", "DevOps", "Automation"],
        link: "https://github.com/Pepryan/gitops-lab",
        github: "https://github.com/Pepryan/gitops-lab",
        featured: true,
        category: "DevOps",
        status: "Active",
        year: "2024"
      },
      {
        id: "laravel-wpap",
        title: "Laravel WPAP Generator",
        description: "Web application for generating WPAP (Wedha's Pop Art Portrait) style artwork using Laravel framework. Features image processing and artistic filters.",
        image: null,
        tags: ["Laravel", "PHP", "Image Processing", "Art", "Web App"],
        link: "https://github.com/Pepryan/laravel-wpap",
        github: "https://github.com/Pepryan/laravel-wpap",
        featured: false,
        category: "Web",
        status: "Completed",
        year: "2023"
      }
    ]
  },
  // Contact Section Configuration
  contact: {
    enabled: true,
    title: "Get In Touch",
    subtitle: "Let's connect and discuss opportunities",
    showForm: false, // Enable contact form
    animateOnScroll: true,
    email: 'febryanramadhan@gmail.com',
    location: 'Bogor, Indonesia',
    availability: 'Available for freelance and full-time opportunities',
    social: {
      linkedin: {
        url: 'https://linkedin.com/in/febryanramadhan',
        enabled: true,
        label: 'LinkedIn'
      },
      github: {
        url: 'https://github.com/Pepryan',
        enabled: true,
        label: 'GitHub'
      },
      gitlab: {
        url: 'https://gitlab.com/Pepryan',
        enabled: true,
        label: 'GitLab'
      },
      twitter: {
        url: 'https://x.com/pepryan',
        enabled: true,
        label: 'X (Twitter)'
      },
      email: {
        url: 'mailto:febryanramadhan@gmail.com',
        enabled: true,
        label: 'Email'
      }
    }
  },

  // Navigation Configuration
  navigation: {
    floating: {
      enabled: false,
      position: 'bottom', // 'bottom' or 'side'
      showLabels: true,
      animateOnScroll: true
    },
    header: {
      enabled: true,
      sticky: true,
      showLogo: true,
      showThemeToggle: true
    }
  },

  // Layout Configuration
  layout: {
    maxWidth: '7xl', // Tailwind max-width class
    padding: 4, // Tailwind padding class number
    sections: {
      hero: { padding: 'py-16 sm:py-24' },
      about: { padding: 'py-16 sm:py-24' },
      experience: { padding: 'py-16 sm:py-24' },
      skills: { padding: 'py-16 sm:py-24' },
      contact: { padding: 'py-16 sm:py-24' }
    }
  }
};
