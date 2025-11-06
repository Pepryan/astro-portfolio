import { FiHome, FiUser, FiFolder, FiArchive, FiMail, FiEdit3, FiBookOpen } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { componentConfig } from '../config/components';

const { pages } = componentConfig;

export default function Header() {

  return (
    <header className="fixed top-6 left-4 right-4 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="floating-header rounded-2xl transition-all duration-300">
          <div className="flex items-center justify-between h-14 px-6">
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
                  dark:hover:text-neutral-200 transition-all duration-300 hover:scale-105
                  hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg
                  inline-flex items-center gap-1 group relative overflow-hidden hidden sm:inline-flex"
                title="About Me"
              >
                <FiUser className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="relative z-10">About</span>

                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </a>
            )}

            {pages.projects.enabled && pages.projects.showInNavigation && (
              <a
                href="/projects"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-all duration-300 hover:scale-105
                  hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg
                  inline-flex items-center gap-1 group relative overflow-hidden hidden sm:inline-flex"
                title="My Projects"
              >
                <FiFolder className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="relative z-10">Projects</span>

                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
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

            {pages.series.enabled && pages.series.showInNavigation && (
              <a
                href="/series"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-all duration-300 hover:scale-105
                  hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg
                  inline-flex items-center gap-1 group relative overflow-hidden hidden sm:inline-flex"
                title="Learning Series"
              >
                <FiBookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="relative z-10">Series</span>

                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </a>
            )}

            {pages.contact.enabled && pages.contact.showInNavigation && (
              <a
                href="/contact"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-all duration-300 hover:scale-105
                  hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg
                  inline-flex items-center gap-1 group relative overflow-hidden hidden sm:inline-flex"
                title="Contact Me"
              >
                <FiMail className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="relative z-10">Contact</span>

                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </a>
            )}

            <a
              href="/archive"
              className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                dark:hover:text-neutral-200 transition-all duration-300 hover:scale-105
                hover:bg-slate-50 dark:hover:bg-slate-900/20 rounded-lg
                group relative overflow-hidden"
              aria-label="Archive"
              title="Blog Archive"
            >
              <FiArchive className="w-4 h-4 transition-transform group-hover:scale-110 relative z-10" />

              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-gray-500/10
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </a>

            <ThemeToggle />
          </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
