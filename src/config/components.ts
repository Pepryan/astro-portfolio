// SEO Configuration
export const seoConfig = {
  // Site Information
  site: {
    name: "Febryan Portfolio",
    title: "Febryan Web - Linux Sysadmin | Tinkering with AI",
    description: "Personal site and technical blog of Febryan Ramadhan, system administrator at Odoo. Notes on Linux, AI tooling, and the cloud and DevOps work behind them, mostly in Bahasa Indonesia.",
    url: "https://febryan.web.id",
    language: "id",
    locale: "id_ID",
    charset: "UTF-8"
  },

  // Author Information
  author: {
    name: "Febryan Ramadhan",
    // Public contact alias (Cloudflare Email Routing → personal inbox)
    email: "hi@febryan.web.id",
    url: "https://febryan.web.id",
    jobTitle: "System Administrator at Odoo",
    location: "Indonesia",
    bio: "Linux sysadmin at Odoo, tinkering with AI. Background in cloud, DevOps and CI/CD.",
    image: "https://febryan.web.id/images/photo-web-febryan.webp"
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
    default: "https://febryan.web.id/images/default-og-image.webp",
    logo: "https://febryan.web.id/images/logo.png",
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png"
  },

  // Default Keywords
  keywords: [
    "Linux",
    "System Administrator",
    "Sysadmin",
    "AI",
    "Claude",
    "Python",
    "Bash",
    "DevOps",
    "CI/CD",
    "Cloud",
    "Docker",
    "Kubernetes",
    "Ansible",
    "Portfolio",
    "Blog"
  ],

  // Theme and Branding
  theme: {
    color: "#3b82f6",
    backgroundColor: "#ffffff",
    darkBackgroundColor: "#171717"
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
    description: "Long-form notes on Linux, networking, AI tooling and the infrastructure around them",
    showReadingTime: true,
    showWordCount: true,
    enableComments: true,
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
  // Homepage sections (order is fixed in src/pages/index.astro)
  homepage: {
    enabled: true,
    sections: {
      writing: { enabled: true, count: 5 },
      stack: { enabled: true },
      work: { enabled: true },
      journey: { enabled: true },
      contact: { enabled: true }
    }
  },

  // Hero
  hero: {
    enabled: true,
    title: "Febryan Ramadhan",
    role: "System Administrator at Odoo",
    headline: "Keeping Linux reliable, making AI useful, sharing what I learn.",
    lede: "I keep Linux systems running at Odoo and experiment with Claude and LLM APIs in Python. Years of cloud, DevOps and CI/CD work still shape how I approach both.",
    // Interactive terminal in the hero (fastfetch-style). Visitors are "guest".
    terminal: {
      user: "guest",
      owner: "feram",
      host: "web",
      shell: "bash",
      focus: "Linux, AI tooling",
      stack: ["Linux", "Claude Code", "Python"],
      timezone: "Asia/Jakarta",
      utcOffset: "UTC+7"
    },
    showSocialLinks: true,
    socialLinks: [
      { platform: 'github', url: 'https://github.com/Pepryan', enabled: true },
      { platform: 'gitlab', url: 'https://gitlab.com/Pepryan', enabled: true },
      { platform: 'linkedin', url: 'https://linkedin.com/in/febryanramadhan', enabled: true },
      { platform: 'twitter', url: 'https://x.com/pepryan', enabled: true },
      // Address comes from author.email and is revealed client-side (src/lib/email.ts)
      { platform: 'email', url: '/contact', enabled: true }
    ]
  },

  // Journey (homepage changelog)
  storyJourney: {
    enabled: true,
    title: "How I got here",
    subtitle: "From overclocking PCs in junior high to running Linux systems at Odoo.",
    // Oldest first; the homepage renders newest first.
    milestones: [
      { year: "2011", title: "Building PCs", description: "Started with PC building, overclocking and hardware optimization." },
      { year: "2012–2014", title: "Networking at vocational school", description: "Computer and network engineering, with networking fundamentals from Cisco Academy." },
      { year: "2014", title: "Linux & PHP", description: "First serious time on Linux systems, PHP development and troubleshooting." },
      { year: "2014–2021", title: "Information Systems degree", description: "SDLC, algorithms and business IT at university." },
      { year: "2020", title: "Web developer", description: "CRM solutions in PHP, Docker containerization and client support at PT. Ciptadra Softindo." },
      { year: "2022", title: "Cloud engineer", description: "OpenStack and Kubernetes infrastructure, Grafana and Prometheus monitoring, Python and Bash automation at PT. Boer Technology." },
      { year: "2026", title: "Sysadmin at Odoo", description: "Linux systems day to day, with AI tooling on the side." }
    ]
  },

  // Featured work (homepage)
  featuredWork: {
    enabled: true,
    title: "Things I've built",
    // Project ids from `projects.items`, in display order.
    projectIds: ["openstack-resource", "n8n-finance-tracker", "gitops-lab"],
    viewAllLink: "/projects"
  },

  // Contact band (homepage)
  cta: {
    enabled: true,
    title: "Questions about Linux, AI or something I wrote?",
    subtitle: "Email is the best way to reach me. Every post also has a comment section if you'd rather ask in public.",
    // link is the no-JS fallback; the button becomes a mailto: for author.email
    primaryAction: { text: "Send an email", link: "/contact", revealEmail: true },
    secondaryAction: { text: "Contact page", link: "/contact" }
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
      showInNavigation: true
    },
    contact: {
      enabled: true,
      showInNavigation: true,
      title: "Contact",
      description: "Questions about Linux, AI tooling or something I wrote"
    },
    series: {
      enabled: true,
      showInNavigation: true,
      title: "Series",
      description: "Comprehensive learning series and tutorials"
    },
    resume: {
      enabled: false,
      showInNavigation: false, // Hidden by default, accessible via direct link
      format: "traditional",
      downloadable: true,
      pdfPath: "/documents/febryan-resume.pdf"
    }
  },

  // Experience Section Configuration
  experience: {
    enabled: true,
    title: "Experience",
    showTimeline: true,
    animateOnScroll: true,
    items: [
      {
        id: 'odoo',
        role: 'System Administrator',
        company: 'Odoo',
        period: '2026 - Present',
        type: 'Full-time',
        current: true,
        responsibilities: [],
        technologies: ['Linux']
      },
      {
        id: 'boer-tech',
        role: 'Cloud Engineer',
        company: 'PT. Boer Technology',
        period: '2022 - 2026',
        type: 'Full-time',
        current: false,
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
  // Skills Section Configuration
  // Skills table on /projects. "now" = daily work, "experience" = earlier roles that still hold.
  skills: {
    enabled: true,
    categories: [
      { title: "Linux & systems", status: "now", items: ["Linux", "Bash", "KVM", "Btrfs"] },
      { title: "AI", status: "now", items: ["Claude", "Claude Code", "Python + LLM APIs", "n8n"] },
      { title: "Cloud & containers", status: "experience", items: ["OpenStack", "Kubernetes", "Docker / Podman", "OpenShift / OKD", "AWS", "GCP"] },
      { title: "Monitoring", status: "experience", items: ["Grafana", "Prometheus", "VictoriaMetrics", "Uptime Kuma"] },
      { title: "Automation & CI/CD", status: "experience", items: ["Ansible", "Terraform", "GitLab CI", "Jenkins", "Git"] },
      { title: "Development", status: "experience", items: ["Python", "HTML, CSS, JavaScript", "PHP"] }
    ]
  },

  // Certifications on /projects, newest first
  certifications: [
    { title: "AWS Academy Cloud Architecting", issuer: "AWS", year: "2023", active: true, url: "https://www.credly.com/badges/576f0a39-1615-4d94-860b-d8fc2316de44/public_url" },
    { title: "Certified DevOps Professional", issuer: "GitLab", year: "2023", active: true, url: "https://www.credly.com/badges/f3a13b0d-f6ef-41d8-884e-52060edc9e75/public_url" },
    { title: "Certified Security Specialist", issuer: "GitLab", year: "2022", active: true, url: "https://www.credly.com/badges/fe4d83d0-b1b4-469c-8c41-953254e07476/public_url" },
    { title: "Certified CI/CD Associate", issuer: "GitLab", year: "2022", active: true, url: "https://www.credly.com/badges/f9b78922-688e-4729-91de-9e90bd5cef1d/public_url" },
    { title: "Certified Git Associate", issuer: "GitLab", year: "2022", active: true, url: "https://www.credly.com/badges/cef73c89-298d-44d5-8885-29d4eb6f3990/public_url" },
    { title: "Certified Project Management Associate", issuer: "GitLab", year: "2022", active: true, url: "https://www.credly.com/badges/2063b57e-5d5e-4917-8199-edbcb766f635/public_url" },
    { title: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", year: "2013", active: false, url: null as string | null }
  ],

  // Projects/Portfolio Section Configuration
  projects: {
    enabled: true,
    title: "Featured Projects",
    showFilters: true,
    animateOnScroll: true,
    categories: ['All', 'Cloud', 'DevOps', 'Web', 'Automation', 'Open Source'],
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
        category: "Open Source",
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
        demo: "https://dzikirapp.my.id",
        featured: true,
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
        demo: "https://pepryan.github.io/portfolio",
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
      },
      {
        id: "n8n-finance-tracker",
        title: "Finance Tracker with n8n + Telegram + Gemini + Notion",
        description: "Built automation backend for finance tracker with n8n, Telegram, Gemini, and Notion. n8n is used for workflow automation, while Telegram and Gemini are used for financial data collection and analysis, and Notion is used for financial data storage.",
        image: null,
        tags: ["n8n", "Telegram", "Gemini", "Notion"],
        link: "https://febryan.web.id/blog/automated-finance-tracker-with-ai/",
        github: "",
        featured: false,
        category: "Automation",
        status: "Active",
        year: "2025"
      }
      // {
      //   id: "aws-serverless-api",
      //   title: "AWS Serverless REST API",
      //   description: "Scalable serverless REST API using AWS Lambda, API Gateway, and DynamoDB. Includes authentication, CRUD operations, and automated deployment with CloudFormation.",
      //   image: null,
      //   tags: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFormation", "Serverless"],
      //   link: "https://github.com/Pepryan/aws-serverless-api",
      //   github: "https://github.com/Pepryan/aws-serverless-api",
      //   featured: true,
      //   category: "Cloud",
      //   status: "Active",
      //   year: "2024"
      // },
      // {
      //   id: "terraform-aws-infrastructure",
      //   title: "Terraform AWS Infrastructure",
      //   description: "Infrastructure as Code for AWS multi-tier architecture. Includes VPC, EC2, RDS, Load Balancer, and Auto Scaling with best practices for security and monitoring.",
      //   image: null,
      //   tags: ["Terraform", "AWS", "VPC", "EC2", "RDS", "Infrastructure as Code"],
      //   link: "https://github.com/Pepryan/terraform-aws-infrastructure",
      //   github: "https://github.com/Pepryan/terraform-aws-infrastructure",
      //   featured: true,
      //   category: "Cloud",
      //   status: "Active",
      //   year: "2024"
      // },
      // {
      //   id: "kubernetes-microservices",
      //   title: "Kubernetes Microservices Platform",
      //   description: "Complete microservices platform on Kubernetes with service mesh, monitoring, logging, and CI/CD pipeline. Includes Istio, Prometheus, Grafana, and ArgoCD.",
      //   image: null,
      //   tags: ["Kubernetes", "Istio", "Prometheus", "Grafana", "ArgoCD", "Microservices"],
      //   link: "https://github.com/Pepryan/kubernetes-microservices",
      //   github: "https://github.com/Pepryan/kubernetes-microservices",
      //   featured: true,
      //   category: "Cloud",
      //   status: "Active",
      //   year: "2024"
      // }
    ]
  },
  // Contact Section Configuration
  contact: {
    enabled: true,
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
