# 🚀 Febryan Portfolio - Astro Version

A cutting-edge, high-performance personal portfolio and blog built with **Astro 5.9**, **React 18**, **TailwindCSS 3.4**, and **MDX**. This project represents a complete architectural migration from Next.js to Astro, delivering superior performance while maintaining all functionality and visual fidelity.

🌐 **Live Demo**: [https://febryan.netlify.app](https://febryan.netlify.app)  
📊 **Performance**: Lighthouse Score 100/100 across all metrics  
⚡ **Build Time**: < 30 seconds  
📦 **Bundle Size**: < 500KB (gzipped)

![Portfolio Preview](public/images/preview.png)

## 🎯 Project Overview

This portfolio showcases modern web development practices with a focus on:
- **Performance-First Architecture**: Static site generation with selective hydration
- **Developer Experience**: TypeScript, hot reload, component-driven development
- **Content Management**: MDX-powered blog with advanced features
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML
- **SEO Optimization**: Structured data, meta tags, and sitemap generation

## ✨ Features

### 🎨 **Design & UX**
- 🌗 Dark/Light mode support with persistent theme
- 📱 Fully responsive design optimized for all devices
- 💅 Styled with TailwindCSS and custom components
- 🚀 Fast page loads with Astro's static site generation
- ✨ Smooth animations with Framer Motion
- 🎯 Floating navigation with active section detection

### 📝 **Blog System**
- 📝 MDX blog support with rich content
- 🎨 Syntax highlighting for code blocks with Shiki
- 🔍 Blog search functionality
- 🏷️ Tag-based blog filtering
- 📖 Reading time estimation
- 📊 Blog statistics and metadata
- 🔗 Social sharing buttons

### 🛠️ **Technical Features**
- ⚡ Built with Astro for optimal performance
- 🔧 TypeScript support for type safety
- 📦 Component-based architecture
- 🎯 SEO optimized with structured data
- 🗺️ Automatic sitemap generation
- 📱 Progressive Web App ready
- 🔒 Security headers configured

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pepryan/portfolio.git
cd portfolio/astro-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
astro-portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── About.tsx
│   │   ├── CareerSection.tsx
│   │   ├── Contact.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ...
│   ├── content/            # MDX content
│   │   ├── config.ts       # Content collections config
│   │   └── posts/          # Blog posts (.mdx files)
│   ├── layouts/            # Astro layouts
│   │   └── Layout.astro
│   ├── pages/              # Astro pages
│   │   ├── index.astro     # Homepage
│   │   ├── 404.astro       # 404 page
│   │   └── blog/           # Blog pages
│   ├── styles/             # Global styles
│   │   └── globals.css
│   └── config/             # Configuration files
│       └── components.ts
├── public/                 # Static assets
│   ├── images/
│   ├── documents/
│   └── favicon.ico
├── netlify.toml           # Netlify deployment config
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # TailwindCSS configuration
└── package.json
```

## 🎨 Customization

### Site Configuration
Edit `src/config/components.ts` to update:
- Hero section content
- Experience and education
- Skills and projects
- Contact information
- Social media links

### Styling
- Global styles: `src/styles/globals.css`
- Component styles: Individual component files using TailwindCSS
- Theme configuration: `tailwind.config.mjs`

### Content
- Blog posts: Add `.mdx` files to `src/content/posts/`
- Static assets: Place in `public/` directory
- Images: Store in `public/images/`

## 📝 Writing Blog Posts

Create new blog posts by adding `.mdx` files to `src/content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2024-01-01"
summary: "Brief description of your post"
tags: ["tag1", "tag2", "tag3"]
category: "Technology"
author: "Your Name"
draft: false
---

# Your Content Here

Write your blog post content using Markdown and MDX syntax.
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Build settings are configured in `netlify.toml`
3. Deploy automatically on push to main branch

### GitHub Pages
```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Manual Deployment
```bash
# Build the project
npm run build

# Upload the `dist/` folder to your hosting provider
```

## 🔧 Configuration

### Astro Configuration
The `astro.config.mjs` file includes:
- MDX support with syntax highlighting
- React integration for interactive components
- TailwindCSS integration
- Sitemap generation
- Static site generation settings

### Content Collections
Blog posts are managed through Astro's content collections system with TypeScript schemas for type safety and validation.

## 📊 Performance

- ⚡ Lighthouse Score: 100/100 (Performance, Accessibility, Best Practices, SEO)
- 🚀 Fast loading times with static generation
- 📱 Optimized for mobile devices
- 🔍 SEO optimized with meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Febryan Ramadhan**
- Website: [https://pepryan.github.io](https://pepryan.github.io)
- GitHub: [@pepryan](https://github.com/pepryan)
- LinkedIn: [febryanramadhan](https://linkedin.com/in/febryanramadhan)

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Syntax highlighting with [Shiki](https://shiki.matsu.io/)

---

⭐ If you found this project helpful, please give it a star!