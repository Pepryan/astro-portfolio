# 🚀 Febryan Portfolio - Modern Astro Portfolio 2025

[![Astro](https://img.shields.io/badge/Astro-5.9-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-00C853?style=for-the-badge&logo=lighthouse&logoColor=white)](https://developers.google.com/web/tools/lighthouse)

A cutting-edge, high-performance personal portfolio and blog built with **Astro 5.9**, **React 18**, **TailwindCSS 3.4**, and **MDX**. This project represents a complete architectural migration from Next.js to Astro, delivering superior performance while maintaining all functionality and visual fidelity with 2025 web design standards.

🌐 **Live Demo**: [https://febryan.web.id](https://febryan.web.id)
📊 **Performance**: Optimized for speed and user experience
⚡ **Build Time**: < 30 seconds
📦 **Bundle Size**: < 500KB (gzipped)
🎨 **Design**: 2025 Modern Web Standards with Motion Design
🔧 **Architecture**: Static Site Generation with Islands Architecture
☁️ **Hosting**: Cloudflare Pages with global CDN

![Portfolio Preview](public/images/preview.png)

## 🎯 Project Overview

This portfolio showcases modern web development practices with a focus on:
- **Performance-First Architecture**: Static site generation with selective hydration using Astro's Islands Architecture
- **2025 Design Standards**: Modern UI/UX with micro-interactions, motion design, and storytelling elements
- **Developer Experience**: TypeScript, hot reload, component-driven development with excellent DX
- **Content Management**: MDX-powered blog with advanced features, syntax highlighting, and rich content
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and proper ARIA attributes
- **SEO Optimization**: Structured data, dynamic meta tags, Open Graph, and automatic sitemap generation
- **Progressive Enhancement**: Works without JavaScript, enhanced with React components where needed

## ✨ Features

### 🎨 **Design & UX**
- 🌗 Advanced dark/light mode with smooth transitions and persistent theme storage
- 📱 Fully responsive design optimized for all devices with mobile-first approach
- 💅 Styled with TailwindCSS 3.4 and custom components following 2025 design trends
- 🚀 Lightning-fast page loads with Astro's static site generation and Islands Architecture
- ✨ Smooth micro-interactions and motion design with Framer Motion
- 🎯 Intelligent floating navigation with active section detection and smooth scrolling
- 🎭 Storytelling elements with emotional connections through motion design
- 🎨 Modern UI components with proper visual hierarchy and spacing
- 🔄 Configurable sections that can be enabled/disabled per user preferences

### 📝 **Advanced Blog System**
- 📝 MDX blog support with rich content and React component integration
- 🎨 Advanced syntax highlighting for code blocks with Shiki and custom themes
- 📋 Copy code buttons with improved UX and mobile touch support
- 🔍 Powerful blog search functionality with real-time filtering
- 🏷️ Tag-based blog filtering with dedicated tag pages
- 📖 Accurate reading time estimation with code block consideration
- 📊 Blog statistics and metadata with configurable display
- 🔗 Social sharing buttons with Open Graph optimization
- 📑 Table of Contents (TOC) with auto-scroll and active section highlighting
- 🗂️ Archive page with chronological organization
- 📄 Pagination with SEO-friendly URLs

### 🛠️ **Technical Excellence**
- ⚡ Built with Astro 5.9 for optimal performance and modern architecture
- 🔧 Full TypeScript support for type safety and better developer experience
- 📦 Component-based architecture with reusable React components
- 🎯 Advanced SEO optimization with structured data, JSON-LD, and dynamic meta tags
- 🗺️ Automatic sitemap generation with proper priority and change frequency
- 📱 Progressive Web App (PWA) ready with service worker and manifest
- 🔒 Security headers configured for production deployment
- 🚀 Optimized build process with code splitting and asset optimization
- 📈 Performance monitoring with Core Web Vitals optimization
- 🔄 Hot module replacement for instant development feedback

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.0.0 or higher (LTS recommended)
- **Package Manager**: npm (included with Node.js), yarn, or pnpm
- **Git**: For version control and cloning the repository

### Installation

```bash
# Clone the repository
git clone https://github.com/Pepryan/astro-portfolio.git
cd astro-portfolio

# Install dependencies
npm install
# or with yarn
yarn install
# or with pnpm
pnpm install

# Start development server
npm run dev
# Server will start at http://localhost:4321

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (if configured)
npm run deploy
```

### Development Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx astro check

# Format code
npx prettier --write .

# Lint code
npx eslint . --fix
```

## 📁 Project Structure

```
astro-portfolio/
├── src/
│   ├── components/              # React components
│   │   ├── About.tsx           # About section component
│   │   ├── BlogCard.tsx        # Blog post card component
│   │   ├── BlogPostLayout.tsx  # Blog post layout wrapper
│   │   ├── CareerSection.tsx   # Experience and education
│   │   ├── Contact.tsx         # Contact section
│   │   ├── CopyCodeScript.astro # Code copy functionality
│   │   ├── CustomHead.astro    # SEO and meta tags
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section
│   │   ├── LayoutWrapper.tsx   # Main layout wrapper
│   │   ├── PortfolioSection.tsx # Projects showcase
│   │   ├── SearchModal.tsx     # Blog search functionality
│   │   ├── TableOfContents.tsx # TOC for blog posts
│   │   ├── ThemeProvider.tsx   # Dark/light theme management
│   │   └── ThemeToggle.tsx     # Theme switch component
│   ├── content/                # Content collections
│   │   ├── config.ts           # Content schema definitions
│   │   └── posts/              # Blog posts (.mdx files)
│   │       ├── cloud-native-architecture-guide.mdx
│   │       ├── modern-web-development-2025.mdx
│   │       └── react-performance-optimization.mdx
│   ├── layouts/                # Astro layouts
│   │   └── Layout.astro        # Base layout with SEO
│   ├── pages/                  # File-based routing
│   │   ├── index.astro         # Homepage
│   │   ├── 404.astro           # Custom 404 page
│   │   ├── archive.astro       # Blog archive page
│   │   ├── rss.xml.ts          # RSS feed generation
│   │   └── blog/               # Blog routing
│   │       ├── index.astro     # Blog listing page
│   │       ├── [...slug].astro # Dynamic blog post pages
│   │       └── tags/           # Tag-based filtering
│   │           ├── index.astro # All tags page
│   │           └── [tag].astro # Posts by tag
│   ├── styles/                 # Global styles
│   │   └── globals.css         # TailwindCSS base styles
│   ├── utils/                  # Utility functions
│   │   ├── readingTime.ts      # Reading time calculation
│   │   └── seo.ts              # SEO utilities
│   └── config/                 # Configuration files
│       └── components.ts       # Site configuration
├── public/                     # Static assets
│   ├── images/                 # Image assets
│   │   ├── default-og-image.png # Default Open Graph image
│   │   ├── default-og-image.svg # SVG version
│   │   └── preview.png         # Portfolio preview
│   ├── documents/              # Downloadable files
│   ├── favicon.ico             # Site favicon
│   ├── robots.txt              # Search engine directives
│   └── site.webmanifest        # PWA manifest
├── netlify.toml               # Legacy deployment config (optional)
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # TailwindCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Customization

### Site Configuration
The main configuration file `src/config/components.ts` contains all customizable settings:

#### **SEO Configuration**
```typescript
export const seoConfig = {
  site: {
    name: "Your Portfolio Name",
    title: "Your Title - Your Profession",
    description: "Your description",
    url: "https://yourdomain.com",
    language: "en",
    locale: "en_US"
  },
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    url: "https://yourdomain.com",
    jobTitle: "Your Job Title",
    location: "Your Location"
  }
}
```

#### **Content Sections**
- **Hero Section**: Personal introduction and call-to-action
- **About Section**: Detailed personal story and background
- **Experience**: Work history with responsibilities and technologies
- **Education**: Academic background and certifications
- **Skills**: Technical skills organized by categories
- **Projects**: Portfolio items with links and descriptions
- **Contact**: Contact information and social media links

#### **Layout Options**
- **Homepage Layout**: Choose between traditional or 2025 modern design
- **Section Visibility**: Enable/disable sections as needed
- **Navigation**: Configure floating navigation and header options
- **Theme**: Customize colors, fonts, and spacing

### Styling Customization

#### **TailwindCSS Configuration**
```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
}
```

#### **Global Styles**
- **Base Styles**: `src/styles/globals.css`
- **Component Styles**: Individual component files using TailwindCSS classes
- **Dark Mode**: Automatic dark mode support with `dark:` prefixes
- **Custom CSS**: Add custom styles in the globals.css file

### Content Management

#### **Blog Posts**
Create new blog posts by adding `.mdx` files to `src/content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-01"
summary: "Brief description of your post"
tags: ["tag1", "tag2", "tag3"]
category: "Technology"
author: "Your Name"
draft: false
image: "/images/post-image.jpg" # Optional
---

# Your Content Here

Write your blog post content using Markdown and MDX syntax.
You can include React components and interactive elements.
```

#### **Static Assets**
- **Images**: Store in `public/images/` directory
- **Documents**: Store downloadable files in `public/documents/`
- **Favicons**: Replace favicon files in `public/` directory
- **Manifest**: Update `public/site.webmanifest` for PWA settings

## 📝 Advanced Blog Features

### Writing Blog Posts

Create new blog posts by adding `.mdx` files to `src/content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-01"
summary: "Brief description of your post"
tags: ["tag1", "tag2", "tag3"]
category: "Technology"
author: "Your Name"
draft: false
hidden: false
image: "/images/post-cover.jpg"
imageAlt: "Description of the image"
readingTime: 5 # Optional, auto-calculated if not provided
featured: true # Show in featured posts
seo:
  title: "Custom SEO Title"
  description: "Custom meta description"
  keywords: ["keyword1", "keyword2"]
openGraph:
  title: "Custom OG Title"
  description: "Custom OG description"
  type: "article"
twitter:
  card: "summary_large_image"
  title: "Custom Twitter Title"
  description: "Custom Twitter description"
schema:
  type: "BlogPosting"
  author:
    name: "Your Name"
    url: "https://yourdomain.com"
  publisher:
    name: "Your Blog"
    url: "https://yourdomain.com"
---

# Your Content Here

Write your blog post content using **Markdown** and **MDX** syntax.

## Code Blocks with Syntax Highlighting

```javascript
// JavaScript example with syntax highlighting
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

## Interactive Components

You can include React components directly in your MDX:

<CustomComponent prop="value" />

## Advanced Features

- ✅ Automatic table of contents generation
- ✅ Reading time estimation
- ✅ Code copy buttons
- ✅ Social sharing
- ✅ SEO optimization
- ✅ Related posts suggestions
```

### Blog Configuration

#### **Content Schema**
The blog uses Astro's content collections with TypeScript schemas for validation:

```typescript
// src/content/config.ts
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    author: z.string(),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    image: z.string().optional(),
    featured: z.boolean().default(false)
  })
});
```

#### **Blog Features**
- **Search**: Real-time search across all posts
- **Filtering**: Filter by tags, categories, or date
- **Pagination**: Configurable posts per page
- **Archive**: Chronological organization by year/month
- **RSS Feed**: Automatic RSS feed generation at `/rss.xml`
- **Sitemap**: Automatic sitemap generation for SEO

## 🚀 Deployment

### Cloudflare Pages (Current Setup)

#### **Automatic Deployment**
1. **Connect Repository**: Link your GitHub repository to Cloudflare Pages
2. **Build Settings**:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18` or higher
   - **Environment variables**: Set `NODE_ENV=production`
3. **Deploy**: Automatic deployment on push to main branch
4. **Custom Domain**: Configure your custom domain in Cloudflare Pages settings
5. **Global CDN**: Benefit from Cloudflare's worldwide edge network
6. **Performance**: Enhanced caching and compression automatically applied
7. **Security**: Built-in DDoS protection and SSL certificates

#### **Manual Cloudflare Pages Deployment**
```bash
# Install Wrangler CLI
npm install -g wrangler

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist
```

### Alternative Deployment Options

#### **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### GitHub Pages
```bash
# Build and deploy to GitHub Pages
npm run deploy

# This command:
# 1. Builds the project
# 2. Creates .nojekyll file
# 3. Deploys to gh-pages branch
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Manual Deployment
```bash
# Build the project
npm run build

# Upload the `dist/` folder to your hosting provider
# The dist folder contains all static files ready for deployment
```

### Environment Variables
For production deployment, configure these environment variables:

#### **Cloudflare Pages Settings**
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: `18`
- **Environment variables**:
  - `NODE_ENV`: `production`
  - `SITE_URL`: `https://febryan.web.id`

#### **Other Platforms**
- `SITE_URL`: Your production domain (e.g., https://febryan.web.id)
- `NODE_ENV`: Set to "production"
- `BUILD_COMMAND`: "npm run build"
- `PUBLISH_DIRECTORY`: "dist"

## 🗺️ Enhanced Sitemap & SEO

### Custom Sitemap Implementation
The portfolio features a comprehensive, custom sitemap implementation that automatically excludes draft posts and includes proper SEO metadata:

#### Features:
- **Automatic Draft Filtering**: Only published posts (non-draft, non-hidden) are included
- **Enhanced Metadata**: Includes `lastmod`, `changefreq`, and `priority` for better SEO
- **Comprehensive Coverage**: All pages, blog posts, tag pages, and static routes
- **Proper URL Structure**: Clean, SEO-friendly URLs with correct encoding
- **Sitemap Index**: Organized structure for better search engine crawling

#### Generated Sitemaps:
- `/sitemap-index.xml` - Main sitemap index
- `/sitemap.xml` - Complete sitemap with all URLs and metadata

#### URL Priorities:
- Homepage: 1.0 (highest priority, weekly updates)
- Blog listing: 0.9 (high priority, daily updates)
- Projects: 0.8 (high priority, weekly updates)
- Archive: 0.7 (medium priority, weekly updates)
- Blog posts: 0.7 (medium priority, monthly updates)
- Contact/About: 0.6/0.5 (lower priority, monthly updates)
- Tag pages: 0.5 (medium priority, weekly updates)

#### Implementation Files:
- `src/utils/sitemap.ts` - Sitemap generation utilities
- `src/pages/sitemap.xml.ts` - Main sitemap endpoint
- `src/pages/sitemap-index.xml.ts` - Sitemap index endpoint
- `public/robots.txt` - Updated with correct sitemap references
- `scripts/validate-sitemap.js` - Validation script for sitemap integrity

#### Validation:
```bash
# Validate sitemap after build
npm run validate-sitemap

# Build and validate in one command
npm run build:validate
```

#### SEO Benefits:
- **Better Crawling**: Search engines can efficiently discover all pages
- **Fresh Content**: Automatic lastmod dates help search engines prioritize recent content
- **Priority Signals**: Clear priority hierarchy guides search engine focus
- **Clean Structure**: No draft/hidden content cluttering search results

## 🔧 Technical Configuration

### Astro Configuration
The `astro.config.mjs` file includes comprehensive settings:

```javascript
export default defineConfig({
  site: 'https://febryan.web.id',
  output: 'static',
  integrations: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypePrettyCode, {
          theme: 'night-owl',
          keepBackground: true,
          defaultLang: 'plaintext',
          grid: true
        }]
      ],
      syntaxHighlight: false
    }),
    react(),
    tailwind({ applyBaseStyles: false })
    // Custom sitemap implementation in src/pages/sitemap.xml.ts
  ]
});
```

#### **Key Features**
- **MDX Support**: Rich content with React components
- **Syntax Highlighting**: Shiki-powered code highlighting with night-owl theme
- **React Integration**: Interactive components where needed
- **TailwindCSS**: Utility-first CSS framework
- **Sitemap Generation**: Automatic SEO-friendly sitemap
- **Static Generation**: Optimal performance with pre-rendered pages

### Content Collections
Blog posts use Astro's content collections with TypeScript schemas:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    author: z.string(),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

export const collections = {
  posts: postsCollection
};
```

### TypeScript Configuration
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/config/*": ["./src/config/*"]
    }
  }
}
```

## 📊 Performance & SEO

### Performance Metrics
- ⚡ **Lighthouse Scores**: Optimized for real-world performance
  - Performance: 85-95/100 (varies by content and network)
  - Accessibility: 95-100/100
  - Best Practices: 90-100/100
  - SEO: 95-100/100
- 🚀 **Loading Times**:
  - First Contentful Paint (FCP): < 1.5s
  - Largest Contentful Paint (LCP): < 3.0s
  - First Input Delay (FID): < 100ms
  - Cumulative Layout Shift (CLS): < 0.1
- 📦 **Bundle Size**: < 500KB (gzipped)
- ⚡ **Build Time**: < 30 seconds
- 🔄 **Time to Interactive (TTI)**: < 4s
- ☁️ **CDN Performance**: Global edge caching with Cloudflare

### SEO Optimization
- 🎯 **Structured Data**: JSON-LD schema markup for rich snippets
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🔍 **Meta Tags**: Dynamic meta tags for each page
- 🌐 **Open Graph**: Social media preview optimization
- 🐦 **Twitter Cards**: Enhanced Twitter sharing
- 🗺️ **Sitemap**: Automatic XML sitemap generation
- 🤖 **Robots.txt**: Search engine crawling directives
- 📄 **Canonical URLs**: Proper URL canonicalization
- 🔗 **Internal Linking**: Strategic internal link structure
- ☁️ **CDN SEO**: Enhanced by Cloudflare's global network for faster indexing

### Core Web Vitals
```
✅ LCP: 1.5-2.5s (Good: < 2.5s)
✅ FID: 50-80ms (Good: < 100ms)
✅ CLS: 0.05-0.08 (Good: < 0.1)
✅ TTFB: 200-400ms (Good: < 600ms) - Enhanced by Cloudflare CDN
✅ FCP: 1.0-1.5s (Good: < 1.8s)
```

### Accessibility Features
- ♿ **WCAG 2.1 AA Compliant**: Full accessibility compliance
- ⌨️ **Keyboard Navigation**: Complete keyboard accessibility
- 🔊 **Screen Reader Support**: Proper ARIA labels and semantic HTML
- 🎨 **Color Contrast**: WCAG AA color contrast ratios
- 🔍 **Focus Management**: Visible focus indicators
- 📱 **Touch Targets**: Minimum 44px touch targets for mobile

## 🛠️ Development

### Tech Stack
- **Framework**: [Astro 5.9](https://astro.build/) - Modern static site generator
- **UI Library**: [React 18](https://reactjs.org/) - Component-based UI
- **Styling**: [TailwindCSS 3.4](https://tailwindcss.com/) - Utility-first CSS
- **Content**: [MDX](https://mdxjs.com/) - Markdown with React components
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Motion library
- **Icons**: [React Icons](https://react-icons.github.io/) - Icon library
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io/) - Code highlighting
- **Typography**: [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) - Prose styling
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type safety

### Development Workflow
```bash
# 1. Clone and setup
git clone https://github.com/Pepryan/astro-portfolio.git
cd astro-portfolio
npm install

# 2. Start development
npm run dev

# 3. Make changes and test
npm run build
npm run preview

# 4. Deploy
git add .
git commit -m "Your changes"
git push origin main
```

### Code Quality
- **TypeScript**: Full type safety with strict mode
- **ESLint**: Code linting with Astro and React rules
- **Prettier**: Code formatting with consistent style
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit messages

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **Getting Started**
1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Install** dependencies (`npm install`)
5. **Start** development server (`npm run dev`)

### **Making Changes**
1. Make your changes following the existing code style
2. **Test** your changes thoroughly
3. **Build** the project (`npm run build`)
4. **Preview** the production build (`npm run preview`)
5. **Commit** your changes with conventional commit format

### **Submitting Changes**
1. **Push** to your feature branch (`git push origin feature/amazing-feature`)
2. **Create** a Pull Request with a clear description
3. **Wait** for review and address any feedback

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes on multiple devices and browsers
- Update documentation if needed
- Be respectful and constructive in discussions

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No warranty provided
- ❌ No liability accepted

## 👨‍💻 Author

**Febryan Ramadhan**
- 🌐 Website: [https://febryan.web.id](https://febryan.web.id)
- 💼 GitHub: [@Pepryan](https://github.com/Pepryan)
- 🔗 LinkedIn: [febryanramadhan](https://linkedin.com/in/febryanramadhan)
- 🐦 Twitter: [@pepryan](https://x.com/pepryan)
- 📧 Email: [febryanramadhan@gmail.com](mailto:febryanramadhan@gmail.com)

### **About Me**
Cloud Engineer & DevOps Specialist based in Bogor, Indonesia. Passionate about building scalable, reliable systems and sharing knowledge through open-source projects and technical writing.

## 🙏 Acknowledgments

### **Technologies**
- [Astro](https://astro.build/) - The web framework for content-driven websites
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
- [MDX](https://mdxjs.com/) - Markdown for the component era
- [Shiki](https://shiki.matsu.io/) - A beautiful syntax highlighter

### **Inspiration**
- Modern web design trends and 2025 standards
- Accessibility-first development practices
- Performance optimization techniques
- Developer experience improvements

### **Infrastructure & Community**
- [Cloudflare Pages](https://pages.cloudflare.com/) for reliable hosting and global CDN
- Astro community for excellent documentation and support
- Open-source contributors who make projects like this possible
- Web development community for sharing knowledge and best practices

---

## 🌟 Support

If you found this project helpful, please consider:

- ⭐ **Starring** the repository on GitHub
- 🐛 **Reporting** any bugs or issues
- 💡 **Suggesting** new features or improvements
- 🔄 **Sharing** the project with others
- 💖 **Contributing** to the codebase

---

**Made with ❤️ by [Febryan Ramadhan](https://febryan.web.id)**