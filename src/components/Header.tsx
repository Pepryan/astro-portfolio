import { FiHome, FiUser, FiFolder, FiArchive, FiMail, FiEdit3 } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { componentConfig } from '../config/components';

const { pages } = componentConfig;

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
              dark:hover:text-neutral-200 transition-colors flex items-center gap-2"
            aria-label="Go to homepage - Febryan Ramadhan Portfolio"
            title="Home - Febryan Ramadhan"
          >
            <FiHome className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold hidden sm:inline">FR</span>
            <span className="sr-only">Febryan Ramadhan - Home</span>
          </a>

          <nav className="flex items-center gap-1">
            {/* Navigation Links */}
            {pages.about.enabled && pages.about.showInNavigation && (
              <a
                href="/about"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-colors hidden sm:inline-flex items-center gap-1"
                title="About Me"
              >
                <FiUser className="w-4 h-4" />
                <span>About</span>
              </a>
            )}

            {pages.projects.enabled && pages.projects.showInNavigation && (
              <a
                href="/projects"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-colors hidden sm:inline-flex items-center gap-1"
                title="My Projects"
              >
                <FiFolder className="w-4 h-4" />
                <span>Projects</span>
              </a>
            )}

            <a
              href="/blog"
              className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                dark:hover:text-neutral-200 transition-all duration-300 hover:scale-105
                hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg
                inline-flex items-center gap-1 group relative overflow-hidden"
              title="Read My Blog"
            >
              <FiEdit3 className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span className="relative z-10">Blog</span>

              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </a>

            {pages.contact.enabled && pages.contact.showInNavigation && (
              <a
                href="/contact"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-colors hidden sm:inline-flex items-center gap-1"
                title="Contact Me"
              >
                <FiMail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            )}

            <a
              href="/archive"
              className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                dark:hover:text-neutral-200 transition-colors"
              aria-label="Archive"
              title="Blog Archive"
            >
              <FiArchive className="w-4 h-4" />
            </a>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
